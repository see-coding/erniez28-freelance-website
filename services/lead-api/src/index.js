import { createHmac, createCipheriv, createDecipheriv, randomBytes, randomUUID } from 'node:crypto'
import { createServer } from 'node:http'
import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import Database from 'better-sqlite3'
import nodemailer from 'nodemailer'

const PORT = Number(process.env.PORT || 8788)
const HOST = process.env.HOST || '0.0.0.0'
const ORIGIN = new URL(process.env.PUBLIC_ORIGIN || 'https://erniez28.de').origin
const DB_PATH = process.env.DB_PATH || './data/leads.sqlite'
const key = Buffer.from(process.env.LEAD_ENCRYPTION_KEY || '', 'base64')
const smtpReady = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'MAIL_FROM', 'LEAD_TO'].every(name => process.env[name])

if (key.length !== 32) throw new Error('LEAD_ENCRYPTION_KEY must decode to exactly 32 bytes')
mkdirSync(dirname(DB_PATH), { recursive: true })

const db = new Database(DB_PATH)
db.pragma('journal_mode = WAL')
db.pragma('synchronous = FULL')
db.pragma('busy_timeout = 5000')
db.exec(`
  CREATE TABLE IF NOT EXISTS lead_outbox (
    id TEXT PRIMARY KEY,
    fingerprint TEXT NOT NULL,
    payload TEXT,
    created_at INTEGER NOT NULL,
    next_attempt_at INTEGER NOT NULL,
    attempts INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'pending',
    last_error_code TEXT
  );
  CREATE INDEX IF NOT EXISTS lead_outbox_due ON lead_outbox(status, next_attempt_at);
  CREATE TABLE IF NOT EXISTS lead_dedup (
    fingerprint TEXT PRIMARY KEY,
    expires_at INTEGER NOT NULL
  );
`)

const transporter = smtpReady ? nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: String(process.env.SMTP_SECURE || 'true') === 'true',
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 20_000,
}) : null

function encrypt(payload) {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const ciphertext = Buffer.concat([cipher.update(JSON.stringify(payload), 'utf8'), cipher.final()])
  return JSON.stringify({ iv: iv.toString('base64'), tag: cipher.getAuthTag().toString('base64'), data: ciphertext.toString('base64') })
}

function decrypt(value) {
  const envelope = JSON.parse(value)
  const decipher = createDecipheriv('aes-256-gcm', key, Buffer.from(envelope.iv, 'base64'))
  decipher.setAuthTag(Buffer.from(envelope.tag, 'base64'))
  return JSON.parse(Buffer.concat([decipher.update(Buffer.from(envelope.data, 'base64')), decipher.final()]).toString('utf8'))
}

const limitBuckets = new Map()
function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  return typeof forwarded === 'string' ? forwarded.split(',').at(-1).trim() : req.socket.remoteAddress || 'unknown'
}
function limited(ip) {
  const now = Date.now()
  const bucket = limitBuckets.get(ip)
  if (!bucket || now - bucket.start > 15 * 60_000) {
    limitBuckets.set(ip, { start: now, count: 1 })
    return false
  }
  bucket.count += 1
  return bucket.count > 5
}
setInterval(() => {
  const now = Date.now()
  for (const [ip, bucket] of limitBuckets) if (now - bucket.start > 30 * 60_000) limitBuckets.delete(ip)
}, 10 * 60_000).unref()

function send(res, status, body, origin) {
  const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }
  if (origin === ORIGIN) {
    headers['Access-Control-Allow-Origin'] = ORIGIN
    headers.Vary = 'Origin'
  }
  res.writeHead(status, headers)
  res.end(JSON.stringify(body))
}

function clean(value, limit) {
  if (typeof value !== 'string') return ''
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, limit)
}

function validate(input) {
  const allowed = {
    audience: ['Für eine Agentur', 'Für meinen Shop', 'Anderer Kontext'],
    topic: ['Individuelles Plugin', 'Storefront oder Theme', 'Schnittstelle / Integration', 'Wartung / Notfall-Hilfe', 'Fehleranalyse / Update', 'Noch nicht sicher'],
    timeframe: ['So bald wie möglich', 'In den nächsten Monaten', 'Termin noch offen'],
    contactMethod: ['email', 'phone'],
  }
  const payload = {
    name: clean(input.name, 100),
    email: clean(input.email, 254).toLowerCase(),
    phone: clean(input.phone, 40),
    contactMethod: input.contactMethod,
    audience: input.audience,
    topic: input.topic,
    timeframe: input.timeframe,
    details: clean(input.details, 1200),
  }
  if (input.contactRequest !== true) return { error: 'Bitte bestätige, dass du zu dieser Anfrage kontaktiert werden möchtest.' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) return { error: 'Bitte gib eine gültige E-Mail-Adresse an.' }
  if (!allowed.contactMethod.includes(payload.contactMethod)) return { error: 'Bitte wähle einen Kontaktweg.' }
  if (payload.contactMethod === 'phone' && !/^[0-9]{6,15}$/.test(payload.phone.replace(/\D/g, ''))) return { error: 'Für einen Rückruf gib bitte eine erreichbare Telefonnummer an.' }
  for (const field of ['audience', 'topic', 'timeframe']) if (!allowed[field].includes(payload[field])) return { error: 'Bitte prüfe deine Auswahl im Projektbrief.' }
  return { payload }
}

async function readBody(req) {
  let body = ''
  for await (const chunk of req) {
    body += chunk
    if (body.length > 16_384) throw new Error('body_too_large')
  }
  return JSON.parse(body)
}

const insertLead = db.prepare('INSERT INTO lead_outbox (id, fingerprint, payload, created_at, next_attempt_at) VALUES (?, ?, ?, ?, ?)')
const lookupDedup = db.prepare('SELECT fingerprint FROM lead_dedup WHERE fingerprint = ? AND expires_at > ?')
const insertDedup = db.prepare('INSERT OR REPLACE INTO lead_dedup (fingerprint, expires_at) VALUES (?, ?)')
const enqueue = db.transaction((id, fingerprint, payload, now) => {
  db.prepare('DELETE FROM lead_dedup WHERE expires_at <= ?').run(now)
  insertLead.run(id, fingerprint, encrypt(payload), now, now)
  insertDedup.run(fingerprint, now + 60 * 60_000)
})

let deliveryRunning = false
async function deliverNext() {
  if (!transporter || deliveryRunning) return
  deliveryRunning = true
  try {
    const now = Date.now()
    const row = db.prepare("SELECT * FROM lead_outbox WHERE status = 'pending' AND next_attempt_at <= ? ORDER BY created_at LIMIT 1").get(now)
    if (!row) return
    const payload = decrypt(row.payload)
    const ref = row.id.slice(0, 8).toUpperCase()
    const summary = [
      `Kontaktweg: ${payload.contactMethod === 'phone' ? 'Rückruf' : 'E-Mail'}`,
      `Projektkontext: ${payload.audience}`,
      `Thema: ${payload.topic}`,
      `Zeitrahmen: ${payload.timeframe}`,
      payload.name ? `Name: ${payload.name}` : null,
      `E-Mail: ${payload.email}`,
      payload.phone ? `Telefon: ${payload.phone}` : null,
      payload.details ? `\nBeschreibung:\n${payload.details}` : null,
      `\nReferenz: ${ref}`,
    ].filter(Boolean).join('\n')
    try {
      await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: process.env.LEAD_TO,
        replyTo: payload.email,
        subject: `[Website] Shopware-Anfrage ${ref}`,
        text: summary,
      })
      db.prepare("UPDATE lead_outbox SET status = 'sent', payload = NULL, fingerprint = '', last_error_code = NULL WHERE id = ?").run(row.id)
      console.info(JSON.stringify({ event: 'lead_delivered', id: ref }))
    } catch (error) {
      const attempts = row.attempts + 1
      const terminal = attempts >= 8
      const delay = Math.min(60 * 60_000, 30_000 * (2 ** Math.min(attempts - 1, 7)))
      db.prepare('UPDATE lead_outbox SET attempts = ?, status = ?, payload = ?, fingerprint = ?, next_attempt_at = ?, last_error_code = ? WHERE id = ?')
        .run(attempts, terminal ? 'failed' : 'pending', terminal ? null : row.payload, terminal ? '' : row.fingerprint, now + delay, String(error.code || 'delivery_error').slice(0, 40), row.id)
      console.error(JSON.stringify({ event: terminal ? 'lead_delivery_failed' : 'lead_delivery_retry', id: ref, attempt: attempts, code: String(error.code || 'delivery_error').slice(0, 40) }))
    }
  } finally {
    deliveryRunning = false
  }
}
setInterval(deliverNext, 5_000).unref()
void deliverNext()

const server = createServer(async (req, res) => {
  const origin = req.headers.origin || ''
  if (req.url === '/healthz' && req.method === 'GET') {
    const check = db.prepare('PRAGMA quick_check').get()
    return send(res, check?.quick_check === 'ok' ? 200 : 503, { ok: check?.quick_check === 'ok' }, origin)
  }
  if (req.url !== '/api/anfrage') return send(res, 404, { error: 'Nicht gefunden.' }, origin)
  if (req.method === 'OPTIONS') {
    if (origin !== ORIGIN) return send(res, 403, { error: 'Origin nicht erlaubt.' }, '')
    res.writeHead(204, { 'Access-Control-Allow-Origin': ORIGIN, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '600', Vary: 'Origin' })
    return res.end()
  }
  if (req.method !== 'POST') return send(res, 405, { error: 'Methode nicht erlaubt.' }, origin)
  if (origin !== ORIGIN) return send(res, 403, { error: 'Origin nicht erlaubt.' }, '')
  if (!transporter) return send(res, 503, { error: 'Der Kontakt-Dienst ist noch nicht eingerichtet.' }, origin)
  if (!String(req.headers['content-type'] || '').toLowerCase().startsWith('application/json')) return send(res, 415, { error: 'Bitte sende ein JSON-Formular.' }, origin)
  if (limited(clientIp(req))) return send(res, 429, { error: 'Zu viele Versuche. Bitte probiere es später noch einmal.' }, origin)
  try {
    const input = await readBody(req)
    if (clean(input.website, 200)) return send(res, 202, { accepted: true }, origin)
    const checked = validate(input)
    if (checked.error) return send(res, 400, { error: checked.error }, origin)
    const fingerprint = createHmac('sha256', key).update(JSON.stringify(checked.payload)).digest('hex')
    const now = Date.now()
    const repeated = lookupDedup.get(fingerprint, now)
    if (repeated) return send(res, 202, { accepted: true, duplicate: true }, origin)
    const id = randomUUID()
    enqueue(id, fingerprint, checked.payload, now)
    console.info(JSON.stringify({ event: 'lead_accepted', id: id.slice(0, 8).toUpperCase() }))
    return send(res, 202, { accepted: true, reference: id.slice(0, 8).toUpperCase() }, origin)
  } catch (error) {
    const status = error.message === 'body_too_large' ? 413 : 400
    if (status === 400) console.warn(JSON.stringify({ event: 'lead_bad_request' }))
    return send(res, status, { error: status === 413 ? 'Die Nachricht ist zu lang.' : 'Die Anfrage konnte nicht gelesen werden.' }, origin)
  }
})

server.requestTimeout = 10_000
server.headersTimeout = 12_000
server.listen(PORT, HOST, () => console.info(JSON.stringify({ event: 'lead_api_started', port: PORT, mailConfigured: Boolean(transporter) })))

function shutdown() {
  server.close(() => { db.close(); process.exit(0) })
  setTimeout(() => process.exit(1), 10_000).unref()
}
process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
