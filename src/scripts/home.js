import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollToTarget } from './site.js'

const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
const root = document.documentElement
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const hero = document.querySelector('[data-hero-section]')

// ---------- Boot-Loader (nur beim ersten Aufruf von außen) ----------
function runLoader() {
  const loader = document.querySelector('[data-loader]')
  if (!loader || !root.classList.contains('booting')) return Promise.resolve()
  const lines = [...loader.querySelectorAll('.loader__log div')]
  const pct = loader.querySelector('.loader__pct')
  const bar = loader.querySelector('.loader__center')
  return new Promise((resolve) => {
    let done = false
    const start = performance.now()
    const duration = 1500
    const finish = () => {
      if (done) return
      done = true
      loader.style.setProperty('--p', 1)
      pct.textContent = '100%'
      lines.forEach((l) => l.classList.add('on'))
      setTimeout(() => loader.classList.add('is-done'), 120)
      setTimeout(() => { root.classList.remove('booting'); resolve() }, 700)
    }
    const tick = (now) => {
      if (done) return
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 2.4)
      bar.style.setProperty('--p', eased.toFixed(3))
      pct.textContent = `${Math.round(eased * 100)}%`
      lines.forEach((l, i) => l.classList.toggle('on', i < Math.ceil(eased * lines.length)))
      t < 1 ? requestAnimationFrame(tick) : finish()
    }
    requestAnimationFrame(tick)
    loader.addEventListener('click', finish, { once: true })
    addEventListener('keydown', finish, { once: true })
    addEventListener('touchstart', finish, { once: true, passive: true })
  })
}

// ---------- Text-Scramble ----------
function scramble(el) {
  const target = el.textContent
  const glyphs = '!<>-_\\/[]{}=+*^?#$%&01'
  const total = 26
  let frame = 0
  const step = () => {
    let out = ''
    for (let i = 0; i < target.length; i++) {
      const revealAt = (i / target.length) * total * 0.8 + 6
      if (target[i] === ' ' || target[i] === ' ' || frame >= revealAt) out += target[i]
      else out += glyphs[Math.floor(Math.random() * glyphs.length)]
    }
    el.textContent = out
    if (frame++ < total) setTimeout(step, 38)
    else el.textContent = target
  }
  step()
}

// ---------- Lichtkegel über dem Code-Hintergrund ----------
function spotlight() {
  const layers = hero.querySelectorAll('.hero__code')
  const lit = hero.querySelector('.hero__code--lit')
  if (!lit) return
  let tx = innerWidth * 0.5, ty = innerHeight * 0.45, x = tx, y = ty
  let active = false
  hero.addEventListener('pointermove', (e) => { const r = lit.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top; active = true }, { passive: true })
  hero.addEventListener('pointerleave', () => { active = false })
  const t0 = performance.now()
  const loop = (now) => {
    if (!active) {
      const t = (now - t0) / 1000
      const r = lit.getBoundingClientRect()
      tx = r.width * (0.5 + Math.sin(t * 0.35) * 0.32)
      ty = r.height * (0.45 + Math.sin(t * 0.52 + 1) * 0.25)
    }
    x += (tx - x) * 0.08; y += (ty - y) * 0.08
    lit.style.setProperty('--mx', `${x}px`); lit.style.setProperty('--my', `${y}px`)
    requestAnimationFrame(loop)
  }
  requestAnimationFrame(loop)
  if (gsap && !calm) layers.forEach((layer, i) => gsap.to(layer, { yPercent: 12 + i * 2, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } }))
}

// ---------- Terminal ----------
const term = document.querySelector('[data-term-body]')
const hint = document.querySelector('[data-term-hint]')
const prompt = '<span class="term__prompt"><b>erniez28</b>@hagen ~ %</span>'
const capacity = document.querySelector('.badge')?.textContent.split('·').pop().trim() || 'freie Kapazität ab sofort'

function line(html, cls = '') {
  const div = document.createElement('div')
  div.className = `term__line ${cls}`.trim()
  div.innerHTML = html
  term.append(div)
  while (term.children.length > 14) term.firstElementChild.remove()
  return div
}
async function typeCommand(cmd) {
  const div = line(`${prompt} <span class="typed"></span><span class="cursor"></span>`)
  const typed = div.querySelector('.typed')
  for (const ch of cmd) { typed.textContent += ch; await wait(calm ? 0 : 42 + Math.random() * 40) }
  await wait(calm ? 0 : 180)
  div.querySelector('.cursor').remove()
}
async function introScript() {
  term.innerHTML = ''
  await typeCommand('whoami')
  line('<img class="term__avatar" src="/images/ernie-card.jpg" alt="" width="24" height="24"><span class="t-accent">Sascha „Ernie“ Ernst</span>')
  await wait(140)
  line('<span class="t-dim">Shopware 6 · PHP 8 / Symfony · 10+ Jahre E-Commerce</span>')
  await wait(260)
  await typeCommand('./status --now')
  line('<span class="t-green">● open_for_projects = true</span><span class="t-dim">· remote · Hagen, DE</span>')
  await wait(200)
  await typeCommand('./stack --core')
  line('<span class="t-dim">shopware 6.7 · symfony · twig · vue-admin · mysql · docker</span>')
  await wait(200)
  await typeCommand('./kapazitaet')
  line(`<span class="t-amber">→ ${capacity}</span>`)
  await wait(200)
  interactive()
}

const sections = { leistungen: '#leistungen', werkstatt: '#werkstatt', projekte: '#werkstatt', changelog: '#momentum', momentum: '#momentum', whoami: '#about', about: '#about', ablauf: '#ablauf', faq: '#faq', kontakt: '#kontakt' }
const history = []
let historyIndex = 0
function interactive() {
  const div = line(`${prompt} <input class="term__input" type="text" aria-label="Terminal-Befehl eingeben" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="help">`)
  const input = div.querySelector('input')
  hint.hidden = false
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') { e.preventDefault(); if (historyIndex > 0) input.value = history[--historyIndex] }
    if (e.key === 'ArrowDown') { e.preventDefault(); input.value = history[++historyIndex] ?? '' ; historyIndex = Math.min(historyIndex, history.length) }
    if (e.key !== 'Enter') return
    const raw = input.value.trim()
    div.innerHTML = `${prompt} <span>${raw.replace(/[<>&]/g, '')}</span>`
    if (raw) { history.push(raw); historyIndex = history.length }
    run(raw)
    if (raw !== 'clear') interactive()
    term.querySelector('input')?.focus({ preventScroll: true })
  })
  return input
}
function go(selector) { const el = document.querySelector(selector); if (el) scrollToTarget(el) }
function run(raw) {
  const [cmd, ...args] = raw.toLowerCase().split(/\s+/)
  const out = (html, cls) => line(html, cls)
  switch (cmd) {
    case '': return
    case 'help':
      out('<span class="t-dim">whoami · ls · cd &lt;ordner&gt; · leistungen · kontakt · termin · quest · clear</span>')
      return
    case 'whoami': out('<span class="t-accent">Sascha „Ernie“ Ernst</span><span class="t-dim">· gelernter Bäcker, heute Shopware-Entwickler</span>'); return
    case 'ls': out('<span class="t-amber">leistungen/  werkstatt/  changelog/  whoami/  ablauf/  faq/  kontakt/</span>'); return
    case 'cd': {
      const target = sections[(args[0] || '').replace(/[/.]/g, '')]
      target ? (out(`<span class="t-dim">→ ${args[0]}</span>`), go(target)) : out(`<span class="t-dim">cd: no such file or directory: ${(args[0] || '').replace(/[<>&]/g, '')}</span>`)
      return
    }
    case 'leistungen': out('<span class="t-dim">plugins · storefront & updates · schnittstellen · wartung & notfall</span>'); go('#leistungen'); return
    case 'projekte': case 'werkstatt': go('#werkstatt'); return
    case 'kontakt': case 'hire': case 'hire-me': out('<span class="t-green">→ öffne Projektbrief …</span>'); setTimeout(() => { location.href = '/projekt-besprechen/' }, 500); return
    case 'termin': case 'cal': out('<span class="t-green">→ öffne Kalender …</span>'); window.open(document.querySelector('.header-book')?.href, '_blank', 'noopener'); return
    case 'quest': case 'play': case 'start': out('<span class="t-green">→ lade Ernies Quest …</span>'); setTimeout(() => { location.href = '/whoami/' }, 500); return
    case 'clear': term.innerHTML = ''; interactive().focus({ preventScroll: true }); return
    case 'sudo': out('<span class="t-accent">Netter Versuch. Dieser Vorfall wird gemeldet.</span>'); return
    case 'rm': out('<span class="t-dim">Nö.</span>'); return
    case 'exit': out('<span class="t-dim">Du kommst hier nicht raus. Aber Du kannst mir schreiben: kontakt</span>'); return
    case 'brot': case 'bake': out('<span class="t-amber">Backofen auf 230 °C … fertig. Leider nur ein virtuelles Brötchen.</span>'); return
    case 'coffee': case 'kaffee': out('<span class="t-dim">Kaffee ist die einzige Abhängigkeit, die composer nicht auflösen kann.</span>'); return
    case 'shopware': out('<span class="t-dim">6.7 · Symfony 7 · PHP 8.2+ · Vue-Admin · läuft.</span>'); return
    default: out(`<span class="t-dim">zsh: command not found: ${cmd.replace(/[<>&]/g, '')} · tipp help</span>`)
  }
}

// ---------- Start ----------
async function startHero() {
  hero.classList.add('is-live')
  const s = hero.querySelector('[data-scramble]')
  if (s && !calm) setTimeout(() => scramble(s), 350)
  await wait(calm ? 0 : 650)
  if (term) introScript()
  const promo = document.querySelector('[data-promo]')
  if (promo) {
    setTimeout(() => promo.showModal(), calm ? 0 : 900)
    promo.querySelectorAll('[data-promo-close]').forEach((b) => b.addEventListener('click', () => promo.close()))
    promo.addEventListener('click', (e) => { if (e.target === promo) promo.close() })
  }
}
if (hero) {
  spotlight()
  runLoader().then(startHero)
}

// ---------- Leistungen: Befehl tippt sich neu ----------
document.querySelectorAll('[data-cmd]').forEach((el) => {
  const full = el.dataset.cmd
  let timer
  const retype = () => {
    clearInterval(timer)
    let i = 0
    el.textContent = ''
    timer = setInterval(() => { el.textContent = full.slice(0, ++i); if (i >= full.length) clearInterval(timer) }, 28)
  }
  const card = el.closest('.card')
  if (!calm) {
    card.addEventListener('pointerenter', retype)
    new IntersectionObserver(([entry], obs) => { if (entry.isIntersecting) { retype(); obs.disconnect() } }, { threshold: 0.6 }).observe(card)
  }
})

// ---------- Momentum-Log ----------
document.querySelectorAll('[data-entry]').forEach((entry) => {
  const btn = entry.querySelector('.entry__head')
  btn.addEventListener('click', () => {
    const open = !entry.classList.contains('is-open')
    entry.classList.toggle('is-open', open)
    btn.setAttribute('aria-expanded', String(open))
  })
})

// ---------- Profilkarte kippt mit ----------
const profile = document.querySelector('[data-tilt]')
if (profile && finePointer && !calm) {
  profile.addEventListener('pointermove', (e) => {
    const r = profile.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height
    profile.style.setProperty('--ry', `${(px - 0.5) * 10}deg`)
    profile.style.setProperty('--rx', `${(py - 0.5) * -10}deg`)
    profile.style.setProperty('--gx', `${px * 100}%`)
    profile.style.setProperty('--gy', `${py * 100}%`)
  })
  profile.addEventListener('pointerleave', () => { profile.style.setProperty('--rx', '0deg'); profile.style.setProperty('--ry', '0deg') })
}

// ---------- Pixel-Teaser läuft ----------
const teaserHero = document.querySelector('[data-teaser-hero]')
if (teaserHero && !calm) {
  let on = false, timer
  new IntersectionObserver(([entry]) => {
    clearInterval(timer)
    if (entry.isIntersecting) timer = setInterval(() => teaserHero.classList.toggle('alt', (on = !on)), 180)
  }).observe(teaserHero)
}

// ---------- Ablauf: Linie füllt sich beim Scrollen ----------
const steps = document.querySelector('[data-steps]')
if (steps && ScrollTrigger) {
  const items = [...steps.querySelectorAll('[data-step]')]
  const line = steps.querySelector('.steps__line i')
  ScrollTrigger.create({
    trigger: steps, start: 'top 75%', end: 'bottom 45%', scrub: calm ? false : 0.6,
    onUpdate: (self) => {
      line?.style.setProperty('--p', self.progress.toFixed(3))
      items.forEach((item, i) => item.classList.toggle('is-lit', self.progress >= i / (items.length - 1) - 0.02))
    },
  })
  if (calm) items.forEach((item) => item.classList.add('is-lit'))
}
