import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">📚 HandyBookTools</span>
          <p>Werkzeuge für Buchliebhaber.</p>
        </div>

        <div className="footer-col">
          <h4>Produkt</h4>
          <Link to="/tools">Tools</Link>
          <Link to="/">Startseite</Link>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <Link to="/kontakt">Kontakt</Link>
        </div>

        <div className="footer-col">
          <h4>Rechtliches</h4>
          <Link to="/impressum">Impressum</Link>
          <Link to="/datenschutz">Datenschutz</Link>
          <Link to="/agb">AGB</Link>
          <Link to="/cookies">Cookie-Richtlinie</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} HandyBookTools. Alle Rechte vorbehalten.</span>
      </div>
    </footer>
  )
}
