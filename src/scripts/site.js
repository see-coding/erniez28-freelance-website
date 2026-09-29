import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches
const root = document.documentElement

// Weiches Scrollen, gekoppelt an GSAP, damit ScrollTrigger synchron bleibt.
let lenis = null
if (!calm) {
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
}
window.e28 = { lenis, gsap, ScrollTrigger, calm }

export function scrollToTarget(target, offset = -72) {
  if (lenis) lenis.scrollTo(target, { offset, duration: 1.4 })
  else (typeof target === 'number' ? window.scrollTo({ top: target }) : target.scrollIntoView())
}
window.e28.scrollTo = scrollToTarget

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#"]')
  if (!link) return
  const id = link.getAttribute('href').slice(1)
  const target = id && document.getElementById(id)
  if (!target) return
  event.preventDefault()
  scrollToTarget(target)
  history.replaceState(null, '', `#${id}`)
})

// Header: nach dem Hero mit Hintergrund, beim Runterscrollen ausblenden.
const header = document.querySelector('[data-header]')
const progress = document.querySelector('.progress')
let lastY = window.scrollY
function onScroll() {
  const y = window.scrollY
  const max = document.documentElement.scrollHeight - innerHeight
  progress?.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0)
  header?.classList.toggle('is-scrolled', y > 30)
  const menuOpen = document.querySelector('[data-menu]')?.classList.contains('is-open')
  header?.classList.toggle('is-hidden', !menuOpen && y > 400 && y > lastY + 2)
  if (y < lastY - 2) header?.classList.remove('is-hidden')
  lastY = y
}
addEventListener('scroll', onScroll, { passive: true })
onScroll()

// Mobiles Menü
const menuBtn = document.querySelector('[data-menu-btn]')
const menu = document.querySelector('[data-menu]')
menuBtn?.addEventListener('click', () => {
  const open = !menu.classList.contains('is-open')
  menu.classList.toggle('is-open', open)
  menuBtn.setAttribute('aria-expanded', String(open))
  menuBtn.textContent = open ? 'close' : 'menu'
  open ? lenis?.stop() : lenis?.start()
})
menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => { menu.classList.remove('is-open'); lenis?.start() }))
addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu?.classList.contains('is-open')) menuBtn.click() })

// Überschriften wortweise aufbauen
document.querySelectorAll('[data-split]').forEach((el) => {
  let i = 0
  const walk = (node) => {
    ;[...node.childNodes].forEach((child) => {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment()
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return
          if (/^\s+$/.test(part)) { frag.append(part); return }
          const w = document.createElement('span'); w.className = 'w'
          const inner = document.createElement('span'); inner.textContent = part; inner.style.setProperty('--i', i++)
          w.append(inner); frag.append(w)
        })
        child.replaceWith(frag)
      } else if (child.nodeType === 1 && child.tagName !== 'BR') walk(child)
    })
  }
  walk(el)
})

const revealTargets = document.querySelectorAll('[data-reveal], [data-split]')
if (calm || !('IntersectionObserver' in window)) revealTargets.forEach((el) => el.classList.add('is-in'))
else {
  const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return
    entry.target.classList.add('is-in')
    io.unobserve(entry.target)
  }), { threshold: 0.15, rootMargin: '0px 0px -8% 0px' })
  revealTargets.forEach((el) => io.observe(el))
}

// Zahlen hochzählen
document.querySelectorAll('[data-count]').forEach((el) => {
  const end = parseFloat(el.dataset.count)
  const decimals = parseInt(el.dataset.decimals || '0', 10)
  const out = el.querySelector('[data-count-value]') || el
  const render = (v) => { out.textContent = decimals ? v.toFixed(decimals) : Math.round(v).toString() }
  if (calm) { render(end); return }
  render(0)
  ScrollTrigger.create({
    trigger: el, start: 'top 92%', once: true,
    onEnter: () => { const o = { v: 0 }; gsap.to(o, { v: end, duration: 1.8, ease: 'power3.out', onUpdate: () => render(o.v) }) },
  })
})

// Lichtschein unter dem Mauszeiger und magnetische Buttons
if (finePointer && !calm) {
  document.addEventListener('pointermove', (e) => {
    const card = e.target.closest('.card')
    if (card) {
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - r.left}px`)
      card.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
  }, { passive: true })

  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect()
      const x = e.clientX - r.left, y = e.clientY - r.top
      btn.style.setProperty('--bx', `${x}px`); btn.style.setProperty('--by', `${y}px`)
      btn.style.transform = `translate(${(x - r.width / 2) * 0.18}px, ${(y - r.height / 2) * 0.25}px)`
    })
    btn.addEventListener('pointerleave', () => { btn.style.transform = '' })
  })
}

// E-Mail kopieren
document.querySelectorAll('[data-copy]').forEach((btn) => btn.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(btn.dataset.copy); btn.textContent = 'kopiert ✓' } catch { btn.textContent = 'strg+c' }
  setTimeout(() => { btn.textContent = 'kopieren' }, 1800)
}))

// ---------- Diff-Fenster ----------
document.querySelectorAll('[data-code]').forEach((code) => {
  if (calm) { code.classList.add('is-typing'); return }
  new IntersectionObserver(([entry], obs) => { if (entry.isIntersecting) { setTimeout(() => code.classList.add('is-typing'), 250); obs.disconnect() } }, { threshold: 0.35 }).observe(code)
  if (finePointer && !calm) {
    code.addEventListener('pointermove', (e) => {
      const r = code.getBoundingClientRect()
      code.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 6}deg`)
      code.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - 0.5) * -5}deg`)
    })
    code.addEventListener('pointerleave', () => { code.style.setProperty('--ry', '0deg'); code.style.setProperty('--rx', '0deg') })
  }
})

addEventListener('load', () => ScrollTrigger.refresh())
