import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

const SCRIPT = [
  { type: 'cmd', prompt: 'erniez28@hagen ~ %', text: 'whoami' },
  { type: 'out', text: 'Sascha „Ernie" Ernst', cls: 'accent' },
  { type: 'out', text: 'Freelance Shopware 6 Developer · Vollstack seit 10+ Jahren', cls: 'dim' },
  { type: 'cmd', prompt: 'erniez28@hagen ~ %', text: './status --now' },
  { type: 'out', text: '● open_for_projects = true · remote · Hagen, DE', cls: 'green' },
]

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const fn = (e) => setReduced(e.matches)
    mq.addEventListener?.('change', fn)
    return () => mq.removeEventListener?.('change', fn)
  }, [])
  return reduced
}

export default function Hero({ started }) {
  const reduced = useReducedMotion()
  const [lines, setLines] = useState([])
  const [typing, setTyping] = useState(null)

  // Terminal-Typing, startet wenn der Preloader fertig ist
  useEffect(() => {
    if (!started) return
    if (reduced) {
      setLines(SCRIPT)
      return
    }
    let cancelled = false
    const timers = []

    const runLine = (idx) => {
      if (cancelled) return
      if (idx >= SCRIPT.length) {
        setTyping({ prompt: 'erniez28@hagen ~ %', text: '' })
        return
      }
      const item = SCRIPT[idx]
      if (item.type === 'cmd') {
        let j = 0
        const typeChar = () => {
          if (cancelled) return
          setTyping({ prompt: item.prompt, text: item.text.slice(0, j) })
          if (j < item.text.length) {
            j++
            timers.push(setTimeout(typeChar, 48))
          } else {
            timers.push(setTimeout(() => {
              setTyping(null)
              setLines((prev) => [...prev, item])
              runLine(idx + 1)
            }, 180))
          }
        }
        typeChar()
      } else {
        setLines((prev) => [...prev, item])
        timers.push(setTimeout(() => runLine(idx + 1), 220))
      }
    }
    runLine(0)
    return () => { cancelled = true; timers.forEach(clearTimeout) }
  }, [started, reduced])

  return (
    <section className="hero" id="top">
      {/* Hintergrund: Video später — Placeholder mit ruhigem Gradient-Glow */}
      <div className="hero__bg" aria-hidden="true">
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          poster="./assets/hero-poster.jpg"
        >
          <source src="./assets/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero__glow" />
        <div className="hero__shade" />
      </div>

      <div className="hero__content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          className="hero__badge"
        >
          <span className="hero__badge-dot" />
          open_for_projects&nbsp;=&nbsp;true
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.2, 0.7, 0.2, 1] }}
        >
          Freelance <span className="accent">Shopware&nbsp;6</span> Developer für Agenturen.
        </motion.h1>

        <motion.p
          className="hero__lede"
          initial={{ opacity: 0, y: 24 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.2, 0.7, 0.2, 1] }}
        >
          Sauberer, wartbarer Code im Subcontracting — von individuellen Erweiterungen
          über Middleware bis zum stabilen Live-Betrieb.
        </motion.p>

        <motion.div
          className="terminal"
          initial={{ opacity: 0, y: 24 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <div className="terminal__bar">
            <span className="terminal__dot terminal__dot--r" />
            <span className="terminal__dot terminal__dot--y" />
            <span className="terminal__dot terminal__dot--g" />
            <span className="terminal__title">zsh — erniez28</span>
          </div>
          <div className="terminal__body">
            {lines.map((line, i) => (
              <div key={i} className="terminal__line">
                {line.prompt && <span className="terminal__prompt">{line.prompt} </span>}
                <span className={`terminal__out${line.cls ? ` terminal__out--${line.cls}` : ''}`}>
                  {line.text}
                </span>
              </div>
            ))}
            {typing && (
              <div className="terminal__line">
                <span className="terminal__prompt">{typing.prompt} </span>
                <span className="terminal__out">{typing.text}</span>
                <span className="cursor-blink" />
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          className="hero__cta"
          initial={{ opacity: 0, y: 24 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.32, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <a href="#contact" className="btn btn--primary">kontakt aufnehmen →</a>
          <a href="#changelog" className="btn btn--ghost">changelog ansehen</a>
        </motion.div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>scroll</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  )
}
