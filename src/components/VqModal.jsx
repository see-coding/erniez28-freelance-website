import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './VqModal.css'

/**
 * ViveQode-Werbemodal.
 * Öffnet sich nur auf der Route /vq-link, einmal pro Sitzung.
 * Gekapselt als eigene Komponente, damit sie später in die
 * WebOS-Desktop-Metapher (Poster über dem Monitor) portierbar ist.
 */
export default function VqModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const isVqLink =
      window.location.pathname === '/vq-link' ||
      window.location.pathname === '/vq-link/'
    if (isVqLink && !sessionStorage.getItem('vq-modal-shown')) {
      const t = setTimeout(() => setOpen(true), 900)
      return () => clearTimeout(t)
    }
  }, [])

  const close = () => {
    setOpen(false)
    sessionStorage.setItem('vq-modal-shown', '1')
  }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="vq-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="vq-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            className="vq-modal__box"
            initial={{ y: 16, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 16, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="vq-modal__close" onClick={close} aria-label="Schließen">×</button>
            <div className="vq-modal__eyebrow">Empfehlung</div>
            <h3 className="vq-modal__title" id="vq-title">ViveQode</h3>
            <p className="vq-modal__text">
              Dynamische QR-Codes und Smart Links für dein Business. Erstelle, verwalte
              und tracke QR-Codes in Echtzeit — mit Analytics, Team-Features und API-Zugang.
            </p>
            <a href="https://viveqode.com" target="_blank" rel="noopener" className="btn btn--primary">
              viveqode.com entdecken ↗
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
