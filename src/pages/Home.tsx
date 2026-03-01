import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <h1>Deine Werkzeuge<br />für Bücher.</h1>
        <p>Organisiere, entdecke und verwalte deine Bibliothek — einfach, schnell und kostenlos.</p>
        <div className="hero-actions">
          <Link to="/tools" className="btn-primary">Tools entdecken</Link>
          <Link to="/kontakt" className="btn-ghost">Kontakt</Link>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <span className="feature-icon">📖</span>
          <h3>Bücher verwalten</h3>
          <p>Behalte den Überblick über deine gesamte Sammlung.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🔍</span>
          <h3>Schnell finden</h3>
          <p>Such und filter nach Autor, Genre oder Jahr.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">⭐</span>
          <h3>Bewerten & merken</h3>
          <p>Merklisten und persönliche Bewertungen für dich.</p>
        </div>
      </section>
    </main>
  )
}
