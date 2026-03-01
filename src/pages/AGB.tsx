import './Legal.css'

export default function AGB() {
  return (
    <main className="legal-page">
      <h1>Allgemeine Geschäftsbedingungen</h1>
      <p className="subtitle">Stand: {new Date().getFullYear()}</p>

      <h2>§ 1 Geltungsbereich</h2>
      <p>
        Diese AGB gelten für die Nutzung der Website HandyBookTools (nachfolgend „Dienst"). Mit
        der Nutzung des Dienstes erklärst du dich mit diesen Bedingungen einverstanden.
      </p>

      <h2>§ 2 Leistungsbeschreibung</h2>
      <p>
        HandyBookTools stellt kostenlose Werkzeuge zur Verwaltung und Organisation von Büchern
        bereit. Ein Anspruch auf bestimmte Funktionen oder Verfügbarkeiten besteht nicht.
      </p>

      <h2>§ 3 Nutzungsbedingungen</h2>
      <p>Du verpflichtest dich, den Dienst nicht:</p>
      <ul>
        <li>für rechtswidrige Zwecke zu nutzen,</li>
        <li>automatisiert oder missbräuchlich abzurufen,</li>
        <li>in einer Weise zu nutzen, die den Betrieb beeinträchtigt.</li>
      </ul>

      <h2>§ 4 Haftungsbeschränkung</h2>
      <p>
        Der Betreiber haftet nicht für Schäden, die durch die Nutzung oder Nichtnutzung des
        Dienstes entstehen, sofern kein Vorsatz oder grobe Fahrlässigkeit vorliegt.
      </p>

      <h2>§ 5 Änderungen</h2>
      <p>
        Der Betreiber behält sich das Recht vor, diese AGB jederzeit zu ändern. Änderungen
        werden auf der Website bekannt gegeben.
      </p>

      <h2>§ 6 Anwendbares Recht</h2>
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist der Sitz des
        Betreibers, sofern gesetzlich zulässig.
      </p>
    </main>
  )
}
