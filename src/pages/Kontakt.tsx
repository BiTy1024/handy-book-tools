import './Legal.css'

export default function Kontakt() {
  return (
    <main className="legal-page">
      <h1>Kontakt</h1>
      <p className="subtitle">Wir freuen uns auf deine Nachricht.</p>

      <h2>E-Mail</h2>
      <p>
        <a href="mailto:info@example.de">info@example.de</a>
      </p>

      <h2>Postanschrift</h2>
      <p>
        Vorname Nachname<br />
        Musterstraße 1<br />
        12345 Musterstadt<br />
        Deutschland
      </p>
    </main>
  )
}
