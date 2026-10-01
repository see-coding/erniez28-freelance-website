// Reproducible local review: no credentials or development tools are served.
import { createServer, request as httpRequest } from 'node:http'
import { spawn } from 'node:child_process'
import { existsSync, readFileSync, statSync, createReadStream, mkdirSync, writeFileSync } from 'node:fs'
import { resolve, join, extname, sep } from 'node:path'
import { parseEnv } from 'node:util'
import { fileURLToPath } from 'node:url'

const project = resolve(fileURLToPath(new URL('..', import.meta.url)))
const port = 4325, apiPort = 8789
const origin = `http://127.0.0.1:${port}`
const directory = join(project, 'website-output/review')
const site = join(directory, 'site')
const version = '29.09.2026-R3'
const config = parseEnv(readFileSync(join(project, 'services/lead-api/.env'), 'utf8'))
if (!config.SMTP_PASS || config.SMTP_PASS.includes('REPLACE_WITH')) throw new Error('Bitte das cal-date SMTP-Passwort lokal in services/lead-api/.env eintragen.')
mkdirSync(directory, { recursive: true })
const build = spawn(process.execPath, ['node_modules/.bin/astro', 'build', '--outDir', site], {
  cwd: project, stdio: 'inherit',
  env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1', PUBLIC_LEAD_API_URL: '/api/anfrage', PUBLIC_LEAD_API_ENABLED: 'true', PUBLIC_REVIEW_VERSION: version },
})
const code = await new Promise(resolve => build.once('exit', resolve))
if (code !== 0) process.exit(Number(code) || 1)
if (process.argv.includes('--build-only')) process.exit(0)

// Solely local review UI, outside Astro's deployable output.
const reviewPage = `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex,nofollow"><title>Abnahme ${version} · erniez28</title><style>body{margin:0;padding:clamp(1.2rem,6vw,5rem);max-width:900px;font:17px/1.7 system-ui;background:#171716;color:#eeeae3}h1{font-family:monospace;line-height:1.2}a{color:#f39579}button{font:inherit;padding:.8rem 1rem;margin:.5rem 0;cursor:pointer;border:1px solid #f39579;border-radius:7px;background:#25211d;color:#eeeae3}li{margin:.6rem 0}small{color:#b6b2aa}</style></head><body><p>erniez28 · lokaler Prüfstand</p><h1>Abnahmeversion ${version}</h1><p><a href="/">Aktuelle Startseite öffnen →</a></p><ul><li>Neuaufbau mit Terminal-Hero und Ernies Quest unter /whoami/.</li><li>Kontakt-API lokal aktiv. Ausdrücklich abgesendete Anfragen werden über netcup an <strong>kontakt@erniez28.de</strong> geschickt.</li><li>Die öffentliche Domain ist unverändert. Impressum und Datenschutz benötigen noch die endgültigen Betreiber-/Betriebsangaben.</li></ul><p><a href="/projekt-besprechen/">Projektbrief testen →</a> · <a href="/whoami/">WHOAMI ansehen →</a></p><small>Neustart im Projektverzeichnis: npm run review · nur auf diesem Rechner erreichbar.</small></body></html>`

const api = spawn(process.execPath, ['services/lead-api/src/index.js'], {
  cwd: project, stdio: ['ignore', 'inherit', 'inherit'],
  env: { ...process.env, ...config, HOST: '127.0.0.1', PORT: String(apiPort), PUBLIC_ORIGIN: origin, LEAD_TO: 'kontakt@erniez28.de', DB_PATH: join(directory, 'leads.sqlite') },
})
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json', '.woff2': 'font/woff2', '.ico': 'image/x-icon' }
const server = createServer((req, res) => {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Robots-Tag', 'noindex, nofollow')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  const url = new URL(req.url, origin)
  if (url.pathname === '/api/anfrage') {
    const proxy = httpRequest({ host: '127.0.0.1', port: apiPort, method: req.method, path: '/api/anfrage', headers: { ...req.headers, host: `127.0.0.1:${apiPort}` } }, response => { res.writeHead(response.statusCode, response.headers); response.pipe(res) })
    proxy.on('error', () => { if (!res.headersSent) {res.writeHead(503, {'Content-Type':'application/json'});res.end(JSON.stringify({error:'Lokaler Kontakt-Dienst ist noch nicht bereit.'}))} else res.end() })
    req.pipe(proxy); return
  }
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405).end(); return }
  if (url.pathname === '/__review/') {res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});res.end(req.method === 'HEAD' ? undefined : reviewPage);return}
  let pathname
  try { pathname = decodeURIComponent(url.pathname) } catch { res.writeHead(400).end(); return }
  let file = resolve(site, '.' + pathname)
  if (!file.startsWith(site + sep) && file !== site) { res.writeHead(403).end(); return }
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html')
  let status = 200
  if (!existsSync(file) || !statSync(file).isFile()) { file = join(site, '404.html'); status = 404 }
  res.writeHead(status, { 'Content-Type': types[extname(file)] || 'application/octet-stream' })
  if (req.method === 'HEAD') res.end(); else createReadStream(file).pipe(res)
})
server.on('error', error => { console.error(`Prüfstand konnte nicht starten: ${error.code}`); api.kill('SIGTERM');process.exitCode=1 })
server.listen(port, '127.0.0.1', () => {
  writeFileSync(join(directory, 'version.json'), JSON.stringify({ version, origin, builtAt: new Date().toISOString() }, null, 2))
  console.log(`ABNAHME ${version}: ${origin}/__review/\nMail-Empfänger im lokalen Prüfstand: kontakt@erniez28.de`)
})
let stopping = false
function stop() {if(stopping)return;stopping=true;api.kill('SIGTERM');server.close();setTimeout(()=>process.exit(),1200).unref()}
api.once('exit', () => { if (!stopping) {console.error('Kontakt-Dienst beendet; Prüfstand wird gestoppt.');stop()} })
process.on('SIGTERM', stop);process.on('SIGINT', stop)
