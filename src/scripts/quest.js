import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './site.js'

gsap.registerPlugin(ScrollTrigger)

const quest = document.querySelector('[data-quest]')
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
if (quest && !calm) init()

function init() {
  const data = JSON.parse(document.getElementById('quest-data').textContent)
  const stage = quest.querySelector('[data-stage]')
  const track = quest.querySelector('[data-track]')
  const hero = quest.querySelector('[data-hero]')
  const stations = [...quest.querySelectorAll('[data-station]')]
  const worldEls = [...quest.querySelectorAll('[data-world]')]
  const dialog = quest.querySelector('[data-dialog]')
  const dTitle = quest.querySelector('[data-dialog-title]')
  const dLoot = quest.querySelector('[data-dialog-loot]')
  const dText = quest.querySelector('[data-dialog-text]')
  const banner = quest.querySelector('[data-banner]')
  const inv = quest.querySelector('.q-inv')
  const invLabel = quest.querySelector('[data-inv-label]')
  const hudWorld = quest.querySelector('[data-hud-world]')
  const hudName = quest.querySelector('[data-hud-name]')
  const hudYear = quest.querySelector('[data-hud-year]')
  const hudXp = quest.querySelector('[data-hud-xp]')
  const levelBtns = [...quest.querySelectorAll('[data-level]')]
  const soundBtn = quest.querySelector('[data-sound]')
  const scan = quest.querySelector('.q-scan')
  const countDown = quest.querySelector('[data-count-down]')

  quest.classList.add('q--game')

  const years = stations.map((s) => parseInt(s.dataset.year, 10))
  const scanByWorld = [0.55, 0.35, 0.18, 0.1, 0.06, 0.03, 0]
  let travel = 0, heroCenter = 0, triggers = [], worldStarts = []
  const hit = new Set()

  function setSizes() {
    const vw = innerWidth, vh = innerHeight
    const mobile = vw < 720
    const u = Math.max(3, Math.min(6, vh * 0.0058, vw * (mobile ? 0.0115 : 0.006)))
    const ground = Math.max(76, vh * 0.16)
    const s = stage.style
    s.setProperty('--u', `${u}px`)
    s.setProperty('--ground', `${ground}px`)
    s.setProperty('--gap', `${mobile ? vw * 0.95 : Math.max(500, vw * 0.52)}px`)
    s.setProperty('--gate', `${mobile ? vw * 0.95 : Math.max(440, vw * 0.42)}px`)
    s.setProperty('--intro', `${mobile ? vw * 0.4 : vw * 0.36}px`)
    s.setProperty('--hx', `${mobile ? vw * 0.1 : vw * 0.22}px`)
  }

  function measure() {
    const trackRect = track.getBoundingClientRect()
    const heroRect = hero.getBoundingClientRect()
    const stageRect = stage.getBoundingClientRect()
    heroCenter = heroRect.left - stageRect.left + heroRect.width / 2
    triggers = stations.map((st) => { const r = st.querySelector('.q-st__block').getBoundingClientRect(); return r.left - trackRect.left + r.width / 2 })
    worldStarts = worldEls.map((w) => w.getBoundingClientRect().left - trackRect.left)
    travel = Math.max(0, track.scrollWidth - innerWidth)
  }

  setSizes()
  ScrollTrigger.addEventListener('refreshInit', () => { gsap.set(track, { x: 0 }); setSizes() })

  const tween = gsap.to(track, {
    x: () => -travel,
    ease: 'none',
    scrollTrigger: {
      trigger: quest,
      start: 'top top',
      end: () => `+=${travel * 1.05}`,
      pin: stage,
      scrub: 0.6,
      invalidateOnRefresh: true,
      onRefreshInit: measure,
      onRefresh: measure,
      onToggle: (self) => document.body.classList.toggle('in-quest', self.isActive),
    },
  })
  const st = tween.scrollTrigger
  measure()
  ScrollTrigger.refresh()

  // ---------- Sound (standardmäßig aus) ----------
  let audio = null, soundOn = false
  function beep(freqs, dur = 0.07, type = 'square', gain = 0.05) {
    if (!soundOn) return
    audio ||= new (window.AudioContext || window.webkitAudioContext)()
    let t = audio.currentTime
    freqs.forEach((f) => {
      const o = audio.createOscillator(), g = audio.createGain()
      o.type = type; o.frequency.value = f
      g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
      o.connect(g).connect(audio.destination); o.start(t); o.stop(t + dur)
      t += dur * 0.9
    })
  }
  soundBtn.addEventListener('click', () => { soundOn = !soundOn; soundBtn.textContent = `♪ sound: ${soundOn ? 'an' : 'aus'}`; beep([660, 990]) })

  // ---------- Dialog ----------
  let typer = null
  function showDialog(index) {
    clearInterval(typer)
    if (index < 0) {
      dialog.classList.remove('is-empty')
      dTitle.textContent = 'READY?'
      dLoot.textContent = 'PLAYER 1'
      dText.textContent = 'Scroll zum Laufen oder nutz die Pfeiltasten. Oben rechts kannst Du jede Welt direkt anwählen.'
      return
    }
    const s = stations[index]
    dialog.classList.remove('is-empty')
    dTitle.textContent = `${s.dataset.year} · ${s.dataset.title}`
    dLoot.textContent = `+ ${s.dataset.loot}`
    const full = s.querySelector('.q-st__text p').textContent
    let i = 0
    dText.textContent = ''
    typer = setInterval(() => {
      i += 2
      dText.textContent = full.slice(0, i)
      if (i >= full.length) clearInterval(typer)
    }, 14)
  }

  // ---------- Inventar & Loot ----------
  function collect(index, animate) {
    if (hit.has(index)) return
    hit.add(index)
    const s = stations[index]
    s.classList.add('is-hit')
    const worldStyle = s.closest('[data-world]').getAttribute('style')
    const slot = document.createElement('span')
    slot.className = 'q-inv__slot'
    slot.title = s.dataset.loot
    slot.setAttribute('style', worldStyle)
    slot.innerHTML = data.props[s.dataset.prop]
    inv.append(slot)
    invLabel.textContent = `Items ${hit.size}/${stations.length}`
    if (!animate) return
    slot.style.visibility = 'hidden'
    s.classList.remove('is-bump'); void s.offsetWidth; s.classList.add('is-bump')
    setTimeout(() => s.classList.remove('is-bump'), 360)
    const from = s.querySelector('.q-st__block').getBoundingClientRect()
    const to = slot.getBoundingClientRect()
    const pop = document.createElement('div')
    pop.className = 'q-pop'
    pop.setAttribute('style', worldStyle)
    pop.innerHTML = data.props[s.dataset.prop]
    Object.assign(pop.style, { left: `${from.left}px`, top: `${from.top - from.height}px` })
    quest.append(pop)
    const dx = to.left - from.left, dy = to.top - (from.top - from.height)
    pop.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: 'translate(0, -60px) scale(1.25)', opacity: 1, offset: 0.35 },
      { transform: `translate(${dx}px, ${dy}px) scale(.45)`, opacity: 0.9 },
    ], { duration: 900, easing: 'cubic-bezier(.3,.7,.3,1)' }).onfinish = () => {
      pop.remove(); slot.style.visibility = ''; slot.classList.add('is-new')
      setTimeout(() => slot.classList.remove('is-new'), 1500)
    }
    beep([988, 1319], 0.08)
  }
  // ---------- Welt ----------
  let currentWorld = -1
  function setWorld(w, announce) {
    if (w === currentWorld) return
    currentWorld = w
    const info = data.worlds[w]
    Object.entries(info.figure).forEach(([k, v]) => stage.style.setProperty(`--f-${k}`, v))
    hero.dataset.sprite = info.sprite
    hudWorld.textContent = `World ${info.index}`
    hudName.textContent = `${info.name} · ${info.years}`
    scan.style.setProperty('--scan', scanByWorld[w] ?? 0)
    levelBtns.forEach((b, i) => b.classList.toggle('is-on', i === w))
    if (announce) {
      banner.querySelector('[data-banner-title]').textContent = `World ${info.index}`
      banner.querySelector('[data-banner-sub]').textContent = info.name
      banner.classList.remove('is-on'); void banner.offsetWidth; banner.classList.add('is-on')
      beep([523, 659, 784, 1047], 0.09)
    }
  }

  // ---------- Spielschleife ----------
  let lastX = 0, walked = 0, lastMove = 0, frame = 'stand', jumping = false, currentIndex = -2
  function setFrame(f) { if (f !== frame) { frame = f; hero.dataset.frame = f } }
  function jump() {
    jumping = true
    setFrame('jump')
    hero.classList.remove('is-jumping'); void hero.offsetWidth; hero.classList.add('is-jumping')
    beep([392, 523], 0.06)
    setTimeout(() => { jumping = false; hero.classList.remove('is-jumping') }, 460)
  }

  gsap.ticker.add(() => {
    const x = -gsap.getProperty(track, 'x')
    const delta = x - lastX
    const now = performance.now()
    if (Math.abs(delta) > 0.4) {
      hero.classList.toggle('is-left', delta < 0)
      walked += Math.abs(delta)
      lastMove = now
      if (!jumping) setFrame(Math.floor(walked / 22) % 2 ? 'walkA' : 'walkB')
    } else if (!jumping && now - lastMove > 140) setFrame('stand')
    lastX = x

    worldEls.forEach((w) => w.style.setProperty('--par', (x * 0.5).toFixed(1)))

    const pos = x + heroCenter
    let index = -1
    for (let i = 0; i < triggers.length; i++) if (triggers[i] <= pos) index = i
    if (index !== currentIndex) {
      const forward = index > currentIndex
      if (forward && currentIndex > -2) {
        for (let i = Math.max(0, currentIndex + 1); i <= index; i++) collect(i, i === index && index - currentIndex < 3)
        if (index - currentIndex < 3 && index >= 0) jump()
      } else if (currentIndex === -2) {
        for (let i = 0; i <= index; i++) collect(i, false)
      }
      currentIndex = index
      showDialog(index)
    }

    dialog.classList.toggle('is-gone', triggers.length > 0 && pos > triggers[triggers.length - 1] + innerWidth * 0.35)

    let w = 0
    for (let i = 0; i < worldStarts.length; i++) if (worldStarts[i] <= pos) w = i
    setWorld(w, currentWorld !== -1)

    let year = years[0]
    if (index >= 0 && index < years.length - 1) {
      const f = Math.min(1, Math.max(0, (pos - triggers[index]) / (triggers[index + 1] - triggers[index])))
      year = Math.floor(years[index] + (years[index + 1] - years[index]) * f)
    } else if (index >= years.length - 1) year = years[years.length - 1]
    if (hudYear.textContent !== String(year)) hudYear.textContent = year
    hudXp.style.setProperty('--xp', travel ? (x / travel).toFixed(3) : 0)
  })

  // ---------- Steuerung ----------
  function scrollToX(targetX) {
    const clamped = Math.max(0, Math.min(travel, targetX))
    const y = st.start + (clamped / travel) * (st.end - st.start)
    const lenis = window.e28?.lenis
    lenis ? lenis.scrollTo(y, { duration: 1.6 }) : window.scrollTo({ top: y })
  }
  levelBtns.forEach((btn, i) => btn.addEventListener('click', () => scrollToX(worldStarts[i] - heroCenter + innerWidth * 0.05)))
  addEventListener('keydown', (e) => {
    if (!st.isActive || !['ArrowRight', 'ArrowLeft'].includes(e.key)) return
    e.preventDefault()
    const target = e.key === 'ArrowRight' ? Math.min(currentIndex + 1, triggers.length - 1) : Math.max(currentIndex - 1, 0)
    scrollToX(triggers[target] - heroCenter + 4)
  })
  document.querySelectorAll('[data-quest-start]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault()
    const lenis = window.e28?.lenis
    lenis ? lenis.scrollTo(st.start + 2, { duration: 1.4 }) : window.scrollTo({ top: st.start + 2 })
  }))
  quest.querySelector('[data-restart]')?.addEventListener('click', (e) => {
    e.preventDefault()
    const lenis = window.e28?.lenis
    lenis ? lenis.scrollTo(st.start + 2, { duration: 2.2 }) : window.scrollTo({ top: st.start + 2 })
  })

  // ---------- Continue-Countdown ----------
  let n = 9
  setInterval(() => {
    if (-gsap.getProperty(track, 'x') < travel - innerWidth * 0.3) { n = 9; countDown.textContent = '9'; return }
    n = n <= 0 ? 9 : n - 1
    countDown.textContent = String(n)
  }, 900)

  showDialog(-1)
  setWorld(0, false)
  addEventListener('load', () => ScrollTrigger.refresh())
}
