import { useState, useMemo } from 'react'
import './SpineCalculator.css'

const GRAMMATUR_PRESETS = [
  { label: '60 g/m² – Leichtes Papier', value: 60 },
  { label: '70 g/m² – Standard Taschenbuch', value: 70 },
  { label: '80 g/m² – Standard Plus', value: 80 },
  { label: '90 g/m² – Schweres Papier', value: 90 },
  { label: '115 g/m² – Bildband / Kunstdruck', value: 115 },
]

const VOLUMEN_PRESETS = [
  { label: '0.8 – Kunstdruckpapier', value: 0.8 },
  { label: '1.0 – Standard Offset', value: 1.0 },
  { label: '1.1 – Leicht voluminös', value: 1.1 },
  { label: '1.2 – Voluminös', value: 1.2 },
  { label: '1.5 – Romanpapier', value: 1.5 },
  { label: '1.8 – Sehr voluminös', value: 1.8 },
]

const BUCHFORMAT_PRESETS = [
  { label: 'A5 (148 × 210 mm)', w: 148, h: 210 },
  { label: 'A4 (210 × 297 mm)', w: 210, h: 297 },
  { label: '12,5 × 19 cm – Taschenbuch', w: 125, h: 190 },
  { label: '15 × 21 cm – Belletristik', w: 150, h: 210 },
  { label: '17 × 24 cm – Sachbuch', w: 170, h: 240 },
  { label: '21 × 29,7 cm – Großformat', w: 210, h: 297 },
]

const BINDUNG_OPTIONS = [
  { label: 'Klebebindung (Softcover)', extra: 0 },
  { label: 'Hardcover', extra: 3 },
  { label: 'Fadenheftung (Softcover)', extra: 0 },
  { label: 'Fadenheftung (Hardcover)', extra: 5 },
]

const BESCHNITT_DEFAULT = 3

function round2(n: number) {
  return Math.round(n * 100) / 100
}

export default function SpineCalculator() {
  const [seiten, setSeiten] = useState<number>(200)
  const [grammatur, setGrammatur] = useState<number>(80)
  const [volumen, setVolumen] = useState<number>(1.0)
  const [bindungIdx, setBindungIdx] = useState<number>(0)
  const [beschnitt, setBeschnitt] = useState<number>(BESCHNITT_DEFAULT)
  const [formatW, setFormatW] = useState<number>(148)
  const [formatH, setFormatH] = useState<number>(210)
  const [showFormat, setShowFormat] = useState(false)

  const result = useMemo(() => {
    const blaetter = seiten / 2
    const blattdicke = (grammatur * volumen) / 1000 // mm per leaf
    const blockRuecken = blaetter * blattdicke
    const bindungsExtra = BINDUNG_OPTIONS[bindungIdx].extra
    const ruecken = blockRuecken + bindungsExtra

    const gesamtbreite = showFormat
      ? formatW * 2 + ruecken + beschnitt * 2
      : null

    return {
      blattdicke: round2(blattdicke),
      blockRuecken: round2(blockRuecken),
      ruecken: round2(ruecken),
      gesamtbreite: gesamtbreite ? round2(gesamtbreite) : null,
      tooThin: ruecken < 6,
      veryThin: ruecken < 3,
    }
  }, [seiten, grammatur, volumen, bindungIdx, beschnitt, formatW, formatH, showFormat])

  // Visual: proportional spine preview (max 600px wide total)
  const previewWidth = 560
  const spineVisualPx = Math.max(
    8,
    Math.min(120, (result.ruecken / (formatW * 2 + result.ruecken)) * previewWidth)
  )
  const coverVisualPx = (previewWidth - spineVisualPx) / 2

  return (
    <main className="spine-calc">
      <div className="spine-calc-header">
        <h1>Buchcover-Rückenrechner</h1>
        <p>Berechne die exakte Rückenbreite deines Buches — lokal und sofort.</p>
      </div>

      <div className="spine-layout">
        {/* ── INPUTS ── */}
        <div className="spine-inputs">

          <section className="input-section">
            <label className="input-label">
              Seitenanzahl
              <div className="input-row">
                <input
                  type="number"
                  min="2"
                  step="2"
                  value={seiten}
                  onChange={(e) => setSeiten(Math.max(2, parseInt(e.target.value) || 2))}
                  className="text-input"
                />
                <span className="unit-tag">Seiten</span>
              </div>
              {seiten % 2 !== 0 && (
                <span className="hint warn">Seitenanzahl sollte gerade sein.</span>
              )}
            </label>
          </section>

          <section className="input-section">
            <label className="input-label">Papiergrammatur</label>
            <div className="preset-grid">
              {GRAMMATUR_PRESETS.map((p) => (
                <button
                  key={p.value}
                  className={`preset-btn ${grammatur === p.value ? 'active' : ''}`}
                  onClick={() => setGrammatur(p.value)}
                >
                  {p.value} g/m²
                </button>
              ))}
            </div>
            <div className="input-row" style={{ marginTop: '0.5rem' }}>
              <input
                type="number"
                min="40"
                max="300"
                step="1"
                value={grammatur}
                onChange={(e) => setGrammatur(parseFloat(e.target.value) || 80)}
                className="text-input small"
              />
              <span className="unit-tag">g/m² (eigener Wert)</span>
            </div>
          </section>

          <section className="input-section">
            <label className="input-label">Papiervolumen</label>
            <div className="preset-grid">
              {VOLUMEN_PRESETS.map((p) => (
                <button
                  key={p.value}
                  className={`preset-btn ${volumen === p.value ? 'active' : ''}`}
                  onClick={() => setVolumen(p.value)}
                >
                  {p.value}
                </button>
              ))}
            </div>
            <div className="input-row" style={{ marginTop: '0.5rem' }}>
              <input
                type="number"
                min="0.5"
                max="3"
                step="0.1"
                value={volumen}
                onChange={(e) => setVolumen(parseFloat(e.target.value) || 1.0)}
                className="text-input small"
              />
              <span className="unit-tag">eigener Wert</span>
            </div>
          </section>

          <section className="input-section">
            <label className="input-label">Bindungsart</label>
            <div className="radio-group">
              {BINDUNG_OPTIONS.map((b, i) => (
                <label key={i} className={`radio-btn ${bindungIdx === i ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="bindung"
                    checked={bindungIdx === i}
                    onChange={() => setBindungIdx(i)}
                  />
                  {b.label}
                  {b.extra > 0 && <span className="extra-tag">+{b.extra} mm</span>}
                </label>
              ))}
            </div>
          </section>

          {/* Format section */}
          <section className="input-section">
            <label className="toggle-label">
              <div className={`toggle ${showFormat ? 'on' : ''}`} onClick={() => setShowFormat(v => !v)}>
                <div className="toggle-thumb" />
              </div>
              <span>Gesamtbreite berechnen (inkl. Format & Beschnitt)</span>
            </label>

            {showFormat && (
              <div className="format-inputs">
                <label className="input-label" style={{ marginTop: '1rem' }}>Buchformat</label>
                <div className="preset-grid">
                  {BUCHFORMAT_PRESETS.map((f) => (
                    <button
                      key={f.label}
                      className={`preset-btn ${formatW === f.w && formatH === f.h ? 'active' : ''}`}
                      onClick={() => { setFormatW(f.w); setFormatH(f.h) }}
                    >
                      {f.w}×{f.h}
                    </button>
                  ))}
                </div>
                <div className="format-row">
                  <label className="input-label small">Breite
                    <div className="input-row">
                      <input type="number" value={formatW} min="50" step="1"
                        onChange={(e) => setFormatW(parseInt(e.target.value) || 148)}
                        className="text-input small" />
                      <span className="unit-tag">mm</span>
                    </div>
                  </label>
                  <label className="input-label small">Höhe
                    <div className="input-row">
                      <input type="number" value={formatH} min="50" step="1"
                        onChange={(e) => setFormatH(parseInt(e.target.value) || 210)}
                        className="text-input small" />
                      <span className="unit-tag">mm</span>
                    </div>
                  </label>
                  <label className="input-label small">Beschnitt
                    <div className="input-row">
                      <input type="number" value={beschnitt} min="0" step="0.5"
                        onChange={(e) => setBeschnitt(parseFloat(e.target.value) || 3)}
                        className="text-input small" />
                      <span className="unit-tag">mm</span>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* ── RESULT ── */}
        <div className="spine-result">
          <div className="result-card">
            <div className="result-main">
              <span className="result-label">Rückenbreite</span>
              <span className={`result-value ${result.veryThin ? 'warn' : result.tooThin ? 'caution' : 'good'}`}>
                {result.ruecken} mm
              </span>
              {result.veryThin && (
                <span className="result-hint warn">⚠ Zu schmal für Beschriftung</span>
              )}
              {!result.veryThin && result.tooThin && (
                <span className="result-hint caution">~ Rückentext knapp möglich</span>
              )}
              {!result.tooThin && (
                <span className="result-hint good">✓ Rückentext gut möglich</span>
              )}
            </div>

            <div className="result-details">
              <div className="detail-row">
                <span>Blattdicke</span>
                <strong>{result.blattdicke} mm/Blatt</strong>
              </div>
              <div className="detail-row">
                <span>Papierblock</span>
                <strong>{result.blockRuecken} mm</strong>
              </div>
              {BINDUNG_OPTIONS[bindungIdx].extra > 0 && (
                <div className="detail-row">
                  <span>Bindungszusatz</span>
                  <strong>+{BINDUNG_OPTIONS[bindungIdx].extra} mm</strong>
                </div>
              )}
              {result.gesamtbreite && (
                <div className="detail-row total">
                  <span>Gesamtbreite Cover</span>
                  <strong>{result.gesamtbreite} mm</strong>
                </div>
              )}
            </div>
          </div>

          {/* Visual preview */}
          <div className="cover-preview">
            <div className="cover-preview-label">Vorschau (proportional)</div>
            <div className="cover-strip">
              <div className="cover-panel back" style={{ width: coverVisualPx }}>
                <span>Rückseite</span>
              </div>
              <div className="cover-panel spine" style={{ width: spineVisualPx }}>
                <span className="spine-label">{result.ruecken} mm</span>
              </div>
              <div className="cover-panel front" style={{ width: coverVisualPx }}>
                <span>Vorderseite</span>
              </div>
            </div>
            {showFormat && (
              <div className="cover-dimensions">
                {formatW} mm + {round2(result.ruecken)} mm + {formatW} mm
                {beschnitt > 0 && ` + ${beschnitt * 2} mm Beschnitt`}
                {' = '}<strong>{result.gesamtbreite} mm</strong>
              </div>
            )}
          </div>

          <div className="formula-box">
            <strong>Formel:</strong><br />
            ({seiten} Seiten ÷ 2) × ({grammatur} g/m² × {volumen} Vol ÷ 1000)
            {BINDUNG_OPTIONS[bindungIdx].extra > 0 && ` + ${BINDUNG_OPTIONS[bindungIdx].extra} mm`}
            {' = '}<strong>{result.ruecken} mm</strong>
          </div>
        </div>
      </div>
    </main>
  )
}
