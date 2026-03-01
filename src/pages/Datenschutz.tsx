import './Legal.css'

export default function Datenschutz() {
  return (
    <main className="legal-page">
      <h1>Datenschutzerklärung</h1>
      <p className="subtitle">Gemäß DSGVO (EU) 2016/679</p>

      <h2>1. Verantwortlicher</h2>
      <p>
        Vorname Nachname, Musterstraße 1, 12345 Musterstadt<br />
        E-Mail: <a href="mailto:info@example.de">info@example.de</a>
      </p>

      <h2>2. Erhobene Daten</h2>
      <p>
        Beim Besuch dieser Website werden automatisch technische Daten erfasst (Server-Logfiles),
        wie IP-Adresse, Browsertyp, Betriebssystem, Referrer-URL sowie Datum und Uhrzeit des
        Zugriffs. Diese Daten dienen ausschließlich der technischen Bereitstellung der Website.
      </p>

      <h2>3. Rechtsgrundlage</h2>
      <p>
        Die Verarbeitung erfolgt auf Basis von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
        an der technisch fehlerfreien Bereitstellung der Website).
      </p>

      <h2>4. Cookies</h2>
      <p>
        Diese Website verwendet technisch notwendige Cookies. Weitere Informationen findest du
        in unserer <a href="/cookies">Cookie-Richtlinie</a>.
      </p>

      <h2>5. Deine Rechte</h2>
      <p>Du hast gemäß DSGVO das Recht auf:</p>
      <ul>
        <li>Auskunft (Art. 15 DSGVO)</li>
        <li>Berichtigung (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch (Art. 21 DSGVO)</li>
      </ul>
      <p>
        Zur Ausübung deiner Rechte wende dich an: <a href="mailto:info@example.de">info@example.de</a>
      </p>

      <h2>6. Beschwerderecht</h2>
      <p>
        Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Die
        zuständige Behörde richtet sich nach deinem Wohnsitz.
      </p>
    </main>
  )
}
