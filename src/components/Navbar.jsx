import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const MENU = [
  { href: '#bio', label: 'whoami' },
  { href: '#stack', label: 'stack' },
  { href: '#certs', label: 'zertifikate' },
  { href: '#changelog', label: 'changelog' },
  { href: '#referenzen', label: 'referenzen' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        {/* Desktop: Menü links */}
        <nav className="nav__menu" aria-label="Hauptnavigation">
          {MENU.map((item) => (
            <a key={item.href} href={item.href} className="nav__link">{item.label}</a>
          ))}
        </nav>

        {/* Logo mittig */}
        <a href="#top" className="nav__logo" aria-label="Zum Seitenanfang">
          erniez28<span className="cursor-blink cursor-blink--green" />
        </a>

        {/* Mobile: Menü-Button */}
        <button
          className="nav__burger"
          onClick={() => setMenuOpen(true)}
          aria-label="Menü öffnen"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>

        {/* Termin-Button rechts */}
        <a href="#contact" className="nav__cta">termin buchen</a>
      </header>

      {/* Mobile Overlay-Menü */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              className="mobile-menu__close"
              onClick={() => setMenuOpen(false)}
              aria-label="Menü schließen"
            >×</button>
            <nav className="mobile-menu__nav" aria-label="Mobile Navigation">
              {MENU.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="mobile-menu__link"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="mobile-menu__prefix">0{i + 1} /</span> {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                className="btn btn--primary mobile-menu__cta"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * MENU.length + 0.15 }}
                onClick={() => setMenuOpen(false)}
              >
                termin buchen →
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
