import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__row">
          <a href="#top" className="footer__logo">
            erniez28<span className="footer__accent">_</span>
          </a>
          <div className="footer__attrs">
            <span>Freelance Shopware 6 Developer</span>
            <span>Hagen, Deutschland</span>
            <a href="mailto:kontakt@erniez28.de">kontakt@erniez28.de</a>
            <a href="https://github.com/see-coding" target="_blank" rel="noopener">github</a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener">linkedin</a>
          </div>
        </div>
        <div className="footer__legal">
          &copy; 2026 Sascha Ernst · Alle Inhalte unterliegen dem deutschen Urheberrecht.
        </div>
      </div>
    </footer>
  )
}
