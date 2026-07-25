import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Preloader.css'

const BOOT_LINES = [
  '$ boot erniez28.de --env=production',
  '  > resolving modules .......... ok',
  '  > mounting design tokens ..... ok',
  '  > hydrating components ....... ok',
  '  > compiling shopware stack ... ok',
  '  > verifying certificates ..... ok',
  '$ whoami -> sascha ernst',
  '  > role: freelance sw6 developer',
  '$ render --start',
]

/**
 * Preloader: dunkler Screen, zentraler Ladebalken, dahinter
 * transparentes Terminal-Log. Wird nur einmal pro Sitzung gezeigt
 * (sessionStorage), also First Load & Hard-Reset.
 */
export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [lines, setLines] = useState(0)
  const [hidden, setHidden] = useState(false)
  const rafRef = useRef(null)

  useEffect(() => {
    const start = performance.now()
    const DURATION = 2200

    const tick = (now) => {
      const t = Math.min((now - start) / DURATION, 1)
      // sanftes Ease-Out, damit der Balken "echt" wirkt
      const eased = 1 - Math.pow(1 - t, 2.2)
      setProgress(Math.round(eased * 100))
      setLines(Math.floor(eased * BOOT_LINES.length))
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setHidden(true)
          sessionStorage.setItem('erniez28-booted', '1')
          onDone?.()
        }, 350)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [onDone])

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          aria-hidden="true"
        >
          {/* Terminal-Log im Hintergrund, oben/unten ausgeblendet */}
          <div className="preloader__terminal">
            {BOOT_LINES.slice(0, lines).map((line, i) => (
              <div key={i} className="preloader__line">{line}</div>
            ))}
          </div>

          {/* Zentraler Ladebalken */}
          <div className="preloader__center">
            <div className="preloader__logo">erniez28<span className="cursor-blink" /></div>
            <div className="preloader__bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
              <div className="preloader__fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="preloader__pct">{progress}%</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
