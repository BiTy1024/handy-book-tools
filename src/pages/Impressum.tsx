import './Legal.css'

export default function Impressum() {
  return (
    <main className="legal-page">
      <h1>Impressum</h1>
      <p className="subtitle">Angaben gemäß § 5 TMG</p>

      <h2>Verantwortlich</h2>
      <p>
        Vorname Nachname<br />
        Musterstraße 1<br />
        12345 Musterstadt<br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href="mailto:info@example.de">info@example.de</a>
      </p>

      <h2>Haftungsausschluss</h2>
      <p>
        Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
        Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
        dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
        der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen
        Zustimmung des jeweiligen Autors bzw. Erstellers.
      </p>
    </main>
  )
}
