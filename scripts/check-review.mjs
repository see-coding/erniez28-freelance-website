import { readdirSync, readFileSync, existsSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import assert from 'node:assert/strict'

const root = 'website-output/review/site', origin = 'http://127.0.0.1:4325'
function walk(path) { return readdirSync(path, { withFileTypes:true }).flatMap(entry => entry.isDirectory() ? walk(join(path, entry.name)) : [join(path, entry.name)]) }
const files = walk(root), pages = files.filter(path => path.endsWith('.html'))
const routes = pages.map(path => '/' + relative(root, path).replace(/index\.html$/, ''))
const report = { version: '28.09.2026-R2', checkedAt: new Date().toISOString(), routes: [], api: [] }
for (const [index, path] of pages.entries()) {
  const html = readFileSync(path, 'utf8')
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, path + ': genau eine H1')
  assert.match(html, /name="description"/, path + ': Beschreibung')
  assert.match(html, /name="robots" content="noindex,nofollow"/, path + ': Abnahme nicht indexieren')
  assert.match(html, /id="site-privacy-notice"/, path + ': Datenschutzauswahl')
  assert.doesNotMatch(html, /<(?:script|iframe)[^>]+src=["'](?:https?:)?\/\//i, path + ': keine externen Skripte/Embeds')
  for (const match of html.matchAll(/<(?:a|script|link|img)\b[^>]*?\b(?:href|src)="(\/(?!\/)[^"?#]*)/g)) {
    if (match[1] === '/__review/') continue
    const target = join(root, match[1])
    assert(existsSync(target) || existsSync(join(target, 'index.html')), path + ': fehlender Link/Asset ' + match[1])
  }
  for (const match of html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)) JSON.parse(match[1])
  const response = await fetch(origin + routes[index])
  assert.equal(response.status, 200, routes[index])
  assert.equal(response.headers.get('cache-control'), 'no-store')
  report.routes.push({ path: routes[index], status:response.status })
}
assert(!files.some(path => /(?:\.env|\.sqlite|__qa__)/.test(path)))
const missing = await fetch(origin + '/nicht-vorhanden-abnahme/')
assert.equal(missing.status, 404)

// All these requests are designed to be rejected or ignored; no additional mail.
const base = { name:'Automatischer Negativtest', email:'test@example.invalid', audience:'Anderer Kontext', topic:'Noch nicht sicher', timeframe:'Termin noch offen', contactMethod:'email', contactRequest:false }
// Isolated limiter bucket in the local review proxy, never the visitor's bucket.
const testSource = `review-check-${Date.now()}`
async function check(name, status, body, headers = {}) {
  const response = await fetch(origin + '/api/anfrage', {method:'POST',headers:{Origin:origin,'Content-Type':'application/json','X-Forwarded-For':testSource,...headers},body:JSON.stringify(body)})
  assert.equal(response.status,status,name)
  report.api.push({name,status:response.status})
}
await check('Fremde Origin',403,base,{Origin:'https://example.invalid'})
await check('Falscher Inhaltstyp',415,base,{'Content-Type':'text/plain'})
await check('Keine Rückmeldebitte',400,base)
await check('Ungültige E-Mail',400,{...base,contactRequest:true,email:'ungueltig'})
await check('Ungültige Rückrufnummer',400,{...base,contactRequest:true,contactMethod:'phone',phone:'123'})
await check('Honeypot ignoriert',202,{...base,website:'spam'})
await check('Fünfter ungültiger Versuch',400,base)
await check('Rate-Limit',429,base)
writeFileSync('website-output/review/checks.json',JSON.stringify(report,null,2))
console.log(JSON.stringify({pages:report.routes.length,assetsAndInternalLinks:'ok',jsonLd:'ok',negativeApiTests:report.api,missingRoute:404,secretsInSite:false}))
