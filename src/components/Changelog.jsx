import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { changelogEntries, TAGS } from '../data/changelog.js'
import './Changelog.css'

function ChangelogRow({ entry, index }) {
  const [open, setOpen] = useState(false)
  const tag = TAGS[entry.tag] || TAGS.insight

  return (
    <div className={`cl-row ${open ? 'cl-row--open' : ''}`}>
      <div
        className="cl-head"
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setOpen(!open)
          }
        }}
      >
        <span className="cl-date">{entry.date}</span>
        <span className="cl-tag" style={{ color: tag.color, background: tag.bg }}>
          {entry.tag}
        </span>
        <span className="cl-title">{entry.title}</span>
        <span className="cl-caret">▸</span>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="cl-diff"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className="cl-diff__inner">
              {entry.diff.map(([type, text], i) => (
                <div key={i} className={`diff-line diff-line--${type}`}>
                  <span className="diff-line__sign">
                    {type === 'add' ? '+' : type === 'del' ? '-' : ' '}
                  </span>{' '}
                  {text}
                </div>
              ))}
              {entry.link && (
                <a href={entry.link} target="_blank" rel="noopener" className="cl-link">
                  {entry.linkLabel} ↗
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Changelog() {
  return (
    <section id="changelog" className="changelog">
      <div className="container">
        <Reveal>
          <div className="changelog__meta">
            <div className="section-label" style={{ marginBottom: 0 }}>// changelog</div>
            <div className="changelog__cmd">git log --oneline · tail -f</div>
          </div>
          <h2 className="changelog__title">Referenzen &amp; Momentum</h2>
          <p className="changelog__desc">
            Ein lebendiges Log aus Projekten, Plugins und Zertifikaten.
            Zeile anklicken für den Diff.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="changelog__box">
            <div className="changelog__bar">
              <span className="changelog__dot changelog__dot--r" />
              <span className="changelog__dot changelog__dot--y" />
              <span className="changelog__dot changelog__dot--g" />
              <span className="changelog__path">~/erniez28/changelog.log</span>
            </div>
            <div>
              {changelogEntries.map((entry, i) => (
                <ChangelogRow key={i} entry={entry} index={i} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
