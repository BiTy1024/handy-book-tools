import { Link } from 'react-router-dom'
import './Tools.css'

const tools = [
  {
    icon: '✂️',
    title: 'PDF Anschnitt',
    description: 'Füge Anschnitt (Bleed) zu deinem PDF hinzu. Einstellbar pro Seite.',
    href: '/tools/pdf-anschnitt',
    local: true,
  },
]

export default function Tools() {
  return (
    <main className="tools-page">
      <div className="tools-header">
        <h1>Tools</h1>
        <p>Werkzeuge für Autoren — alles lokal in deinem Browser.</p>
      </div>
      <div className="tools-grid">
        {tools.map((tool) => (
          <Link to={tool.href} key={tool.href} className="tool-card">
            <span className="feature-icon">{tool.icon}</span>
            <h3>{tool.title}</h3>
            <p>{tool.description}</p>
            {tool.local && <span className="local-badge">🔒 Lokal</span>}
          </Link>
        ))}
      </div>
    </main>
  )
}
