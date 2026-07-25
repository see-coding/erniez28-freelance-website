import { useRef, useState, useEffect } from 'react'
import Reveal from './Reveal.jsx'
import { projects } from '../data/projects.js'
import './Portfolio.css'

function ProjectImage({ project }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className="project-card__placeholder" aria-hidden="true">
        <span className="project-card__placeholder-mono">~/refs/{project.id}.jpg</span>
      </div>
    )
  }
  return (
    <img
      src={project.image}
      alt={`Projekt: ${project.title}`}
      className="project-card__img"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

export default function Portfolio() {
  const trackRef = useRef(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateArrows = () => {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 8)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }

  useEffect(() => {
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
  }, [])

  const scrollBy = (dir) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('.project-card')
    const w = card ? card.getBoundingClientRect().width + 16 : 360
    el.scrollBy({ left: dir * w, behavior: 'smooth' })
  }

  return (
    <section id="referenzen" className="portfolio">
      <div className="container">
        <Reveal>
          <div className="portfolio__head">
            <div className="section-label" style={{ marginBottom: 0 }}>
              // referenzen-portfolio
            </div>
            <div className="portfolio__nav">
              <button
                className="portfolio__arrow"
                onClick={() => scrollBy(-1)}
                disabled={!canPrev}
                aria-label="Vorheriges Projekt"
              >←</button>
              <button
                className="portfolio__arrow"
                onClick={() => scrollBy(1)}
                disabled={!canNext}
                aria-label="Nächstes Projekt"
              >→</button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div
            className="portfolio__track"
            ref={trackRef}
            onScroll={updateArrows}
            aria-label="Projektliste, horizontal scrollbar"
          >
            {projects.map((project) => (
              <article key={project.id} className="project-card">
                <div className="project-card__media">
                  <ProjectImage project={project} />
                </div>
                <div className="project-card__body">
                  <div className="project-card__kind">{project.kind}</div>
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__desc">{project.description}</p>
                  <div className="project-card__tech">
                    {project.tech.map((t) => (
                      <span key={t} className="project-card__badge">{t}</span>
                    ))}
                  </div>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener" className="project-card__link">
                      {project.linkLabel} ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          <div className="portfolio__hint" aria-hidden="true">
            <span>← →</span> für weitere referenzen sliden
          </div>
        </Reveal>
      </div>
    </section>
  )
}
