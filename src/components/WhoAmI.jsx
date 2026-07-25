import Reveal from './Reveal.jsx'
import './WhoAmI.css'

export default function WhoAmI() {
  return (
    <section id="bio" className="whoami">
      <div className="container">
        <Reveal>
          <div className="section-label">// whoami</div>
        </Reveal>
        <div className="whoami__grid">
          <Reveal className="whoami__text" delay={0.05}>
            <p className="whoami__lead">
              Ich bin <span className="whoami__name">Sascha „Ernie" Ernst</span> —
              Vollstack-Entwickler aus Hagen, seit über 10 Jahren in Web und IT unterwegs,
              heute spezialisiert auf Shopware&nbsp;6.
            </p>
            <p>
              Vom Bäckerhandwerk über den autodidaktischen Quereinstieg bis zur eigenen
              Firma: Ich baue Systeme, die im Live-Betrieb halten — individuelle Plugins,
              sichere Middleware und performante Shops. Zuletzt habe ich meine Basis mit
              den Google-Zertifikaten in IT-Support und Cybersecurity verbreitert.
            </p>
            <p>
              Als Freelancer arbeite ich 100&nbsp;% remote und gehe Projekte penibel und
              verlässlich an — vom ersten Ticket bis zum letzten Merge.
            </p>
          </Reveal>

          <Reveal className="whoami__card-wrap" delay={0.12}>
            <aside className="whoami__card" aria-label="Profil-Karte">
              <div className="whoami__photo" role="img" aria-label="Foto von Sascha Ernst — folgt">
                <span className="whoami__photo-mono">~/avatar.jpg</span>
              </div>
              <div className="whoami__card-body">
                <div className="whoami__card-name">Sascha Ernst</div>
                <div className="whoami__card-role">Freelance Shopware 6 Developer</div>
                <dl className="whoami__skills">
                  <div className="whoami__skill">
                    <dt>shopware 6</dt>
                    <dd><span style={{ width: '96%' }} /></dd>
                  </div>
                  <div className="whoami__skill">
                    <dt>php / twig</dt>
                    <dd><span style={{ width: '92%' }} /></dd>
                  </div>
                  <div className="whoami__skill">
                    <dt>middleware / apis</dt>
                    <dd><span style={{ width: '85%' }} /></dd>
                  </div>
                  <div className="whoami__skill">
                    <dt>devops / docker</dt>
                    <dd><span style={{ width: '78%' }} /></dd>
                  </div>
                </dl>
                <div className="whoami__card-meta">
                  <span className="whoami__status" /> Hagen, DE · remote
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
