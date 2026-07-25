import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { stackGroups } from '../data/stack.js'
import './TechStack.css'

function LevelDots({ level }) {
  return (
    <span className="stack__dots" aria-label={`Level ${level} von 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`stack__dot ${i < level ? 'stack__dot--on' : ''}`} />
      ))}
    </span>
  )
}

export default function TechStack() {
  return (
    <section id="stack" className="stack">
      <div className="container">
        <Reveal>
          <div className="section-label">// tech-stack</div>
        </Reveal>

        <div className="stack__groups">
          {stackGroups.map((group, gi) => (
            <Reveal key={group.group} delay={gi * 0.08}>
              <div className="stack__group">
                <div className="stack__group-label">{group.group}</div>
                <div className="stack__items">
                  {group.items.map((item, ii) => (
                    <motion.div
                      key={item.name}
                      className="stack__item"
                      whileHover={{ y: -4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                    >
                      <div className="stack__item-top">
                        <span className="stack__name">
                          <span className="stack__prefix">$</span> {item.name}
                        </span>
                        <LevelDots level={item.level} />
                      </div>
                      <div className="stack__note">{item.note}</div>
                      <motion.span
                        className="stack__scan"
                        initial={{ x: '-100%' }}
                        whileInView={{ x: '100%' }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.4,
                          delay: gi * 0.08 + ii * 0.12 + 0.3,
                          ease: 'easeInOut',
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
