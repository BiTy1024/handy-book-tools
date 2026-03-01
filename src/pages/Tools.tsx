import './Home.css'
import './Tools.css'

export default function Tools() {
  return (
    <main className="tools-page">
      <div className="tools-header">
        <h1>Tools</h1>
        <p>Hier findest du alle verfügbaren Werkzeuge.</p>
      </div>
      <div className="tools-grid">
        <div className="feature-card">
          <span className="feature-icon">🔜</span>
          <h3>Kommt bald</h3>
          <p>Wir arbeiten gerade an tollen neuen Tools für dich.</p>
        </div>
      </div>
    </main>
  )
}
