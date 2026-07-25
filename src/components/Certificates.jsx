import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { certificates } from '../data/certificates.js'
import './Certificates.css'

function CertImage({ cert, className }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className={`cert-placeholder ${className || ''}`}>
        <span className="cert-placeholder__mono">~/certs/{cert.id}.jpg</span>
        <span className="cert-placeholder__hint">scan folgt</span>
      </div>
    )
  }
  return (
    <img
      src={cert.image}
      alt={`Zertifikat: ${cert.name}`}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

export default function Certificates() {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setActive(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [active])

  return (
    <section id="certs" className="certs">
      <div className="container">
        <Reveal>
          <div className="section-label">// zertifikate --verified</div>
        </Reveal>

        <div className="certs__grid">
          {certificates.map((cert, i) => (
            <Reveal key={cert.id} delay={i * 0.08}>
              <button
                className="cert-card"
                onClick={() => setActive(cert)}
                aria-haspopup="dialog"
                aria-label={`${cert.name} anzeigen`}
              >
                <div className="cert-card__badge">
                  <span className="cert-card__dot" />
                  <span className="cert-card__verified">verified · coursera</span>
                </div>
                <div className="cert-card__name">{cert.name}</div>
                <div className="cert-card__issuer">{cert.issuer}</div>
                <div className="cert-card__id">anzeigen › {cert.verifyId}</div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox-Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="cert-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Zertifikat ${active.name}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.figure
              className="cert-modal__box"
              initial={{ y: 24, scale: 0.97, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 24, scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="cert-modal__close"
                onClick={() => setActive(null)}
                aria-label="Schließen"
              >×</button>
              <CertImage cert={active} className="cert-modal__img" />
              <figcaption className="cert-modal__caption">
                <span className="cert-modal__name">{active.name}</span>
                <span className="cert-modal__issuer">{active.issuer}</span>
                <a
                  href={active.verifyUrl}
                  target="_blank"
                  rel="noopener"
                  className="cert-modal__link"
                >
                  verify › {active.verifyId} ↗
                </a>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
