import Reveal from './Reveal.jsx'
import './Services.css'

const SERVICES = [
  {
    title: 'Shopware 6 Entwicklung',
    body: [
      'Individuelle Plugins, Theme-Anpassungen und Backend-Erweiterungen für Shopware 6 — sauber implementiert, dokumentiert und update-sicher gebaut.',
      'Von der ersten Migration bis zur letzten Custom-Field-Konfiguration: Entwicklung, die im Live-Betrieb hält.',
    ],
    caption: 'plugins · themes · migrations',
  },
  {
    title: 'Middleware & Integrationen',
    body: [
      'Verbindungen, die halten: REST-APIs mit Token-Auth, ERP- und PIM-Anbindungen, Payment- und Versand-Integrationen.',
      'Python, PostgreSQL und n8n als Werkzeuge — gebaut auf Stabilität und Skalierbarkeit statt auf schnelle Hacks.',
    ],
    caption: 'apis · erp · automation',
  },
  {
    title: 'Performance & Betrieb',
    body: [
      'Shops, die schnell laden und stabil laufen: Performance-Audits, Caching-Strategien, Upgrade-Pfade und Monitoring im laufenden Betrieb.',
      'Auch nach dem Go-Live verlässlich erreichbar — vom Ticket bis zum Patch.',
    ],
    caption: 'audits · uptime · upgrades',
  },
]

export default function Services() {
  return (
    <section id="service" className="services">
      <div className="container">
        <Reveal>
          <div className="section-label">// leistungen</div>
        </Reveal>

        <div className="services__rows">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.06}>
              <div className={`services__row ${i % 2 === 1 ? 'services__row--flip' : ''}`}>
                <div className="services__media" aria-hidden="true">
                  <span className="services__media-mono">fig. 0{i + 1}</span>
                </div>
                <div className="services__content">
                  <h3>{service.title}</h3>
                  {service.body.map((p, pi) => (
                    <p key={pi}>{p}</p>
                  ))}
                  <div className="services__caption">{service.caption}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* TEXT + BILD (schmal) + TEXT */}
        <Reveal delay={0.1}>
          <div className="services__strip">
            <p className="services__strip-text">
              Kein Blindflug: Jedes Projekt startet mit einem klaren technischen Konzept —
              Aufgaben, Schnittstellen und Ergebnisse sind von Anfang an dokumentiert.
            </p>
            <div className="services__strip-media" aria-hidden="true">
              <span className="services__media-mono">process.yml</span>
            </div>
            <p className="services__strip-text">
              Du bekommst keine Blackbox, sondern Code, den dein Team versteht und
              weiterführen kann — mit Übergabe, Doku und sauberem Git-Verlauf.
            </p>
          </div>
        </Reveal>

        {/* CV-Download */}
        <Reveal delay={0.14}>
          <div className="services__cv">
            <span className="services__cv-mono">$ curl -O cv.pdf</span>
            <a href="./assets/cv-sascha-ernst.pdf" className="btn btn--ghost" download>
              lebenslauf als pdf ↓
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
