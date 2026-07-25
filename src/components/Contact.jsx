import Reveal from './Reveal.jsx'
import './Contact.css'

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <Reveal>
          <div className="contact__banner">
            <div className="contact__text">
              <div className="section-label">// kontakt</div>
              <h2 className="contact__title">
                Lass uns dein nächstes Shopware-Projekt besprechen.
              </h2>
              <div className="contact__links">
                <a href="https://github.com/see-coding" target="_blank" rel="noopener">
                  github/see-coding
                </a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener">
                  linkedin/sascha-ernst
                </a>
                <span>Hagen, DE · 100% remote</span>
              </div>
            </div>
            <div className="contact__actions">
              <a href="mailto:kontakt@erniez28.de" className="btn btn--primary">
                kontakt@erniez28.de
              </a>
              <a href="#" className="btn btn--ghost">
                termin buchen
                <span className="contact__cta-note">cal.com folgt</span>
              </a>
            </div>
          </div>
          <p className="contact__note">
            Hosting &amp; Betrieb für Bestandskunden ebenfalls möglich.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
