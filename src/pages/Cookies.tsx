import './Legal.css'

export default function Cookies() {
  return (
    <main className="legal-page">
      <h1>Cookie-Richtlinie</h1>
      <p className="subtitle">Gemäß ePrivacy-Richtlinie und DSGVO</p>

      <h2>Was sind Cookies?</h2>
      <p>
        Cookies sind kleine Textdateien, die beim Besuch einer Website auf deinem Gerät
        gespeichert werden. Sie ermöglichen es, bestimmte Informationen zu erinnern.
      </p>

      <h2>Welche Cookies verwenden wir?</h2>

      <h2>Technisch notwendige Cookies</h2>
      <p>
        Diese Cookies sind für den Betrieb der Website erforderlich und können nicht
        deaktiviert werden. Sie speichern keine personenbezogenen Daten.
      </p>
      <ul>
        <li><strong>Session-Cookie</strong>: Speichert die aktuelle Sitzung (Laufzeit: Sitzungsende)</li>
      </ul>

      <h2>Analyse-Cookies</h2>
      <p>
        Derzeit verwenden wir keine Analyse- oder Tracking-Cookies.
      </p>

      <h2>Cookies verwalten</h2>
      <p>
        Du kannst Cookies jederzeit in den Einstellungen deines Browsers deaktivieren oder
        löschen. Bitte beachte, dass dies die Funktionalität der Website einschränken kann.
      </p>

      <h2>Rechtsgrundlage</h2>
      <p>
        Technisch notwendige Cookies werden auf Basis von Art. 6 Abs. 1 lit. f DSGVO verarbeitet.
        Für alle anderen Cookies holen wir deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) ein.
      </p>
    </main>
  )
}
