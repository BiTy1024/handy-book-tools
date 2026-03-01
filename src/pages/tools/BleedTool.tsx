import { useState, useCallback, useRef } from 'react'
import { PDFDocument } from 'pdf-lib'
import './BleedTool.css'

const MM_TO_PT = 2.8346

interface BleedValues {
  top: number
  right: number
  bottom: number
  left: number
}

interface PageBleed {
  pageIndex: number
  bleed: BleedValues
}

function defaultBleed(): BleedValues {
  return { top: 3, right: 3, bottom: 3, left: 3 }
}

function BleedInput({
  values,
  onChange,
  linked,
  onToggleLink,
}: {
  values: BleedValues
  onChange: (v: BleedValues) => void
  linked: boolean
  onToggleLink: () => void
}) {
  const handleChange = (side: keyof BleedValues, raw: string) => {
    const val = parseFloat(raw) || 0
    if (linked) {
      onChange({ top: val, right: val, bottom: val, left: val })
    } else {
      onChange({ ...values, [side]: val })
    }
  }

  const sides: { key: keyof BleedValues; label: string }[] = [
    { key: 'top', label: 'Oben' },
    { key: 'right', label: 'Rechts' },
    { key: 'bottom', label: 'Unten' },
    { key: 'left', label: 'Links' },
  ]

  return (
    <div className="bleed-input-group">
      {sides.map(({ key, label }) => (
        <label key={key} className="bleed-field">
          <span>{label}</span>
          <div className="bleed-field-input">
            <input
              type="number"
              min="0"
              step="0.5"
              value={linked ? values.top : values[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              disabled={linked && key !== 'top'}
            />
            <span className="unit">mm</span>
          </div>
        </label>
      ))}
      <button
        type="button"
        className={`link-btn ${linked ? 'linked' : ''}`}
        onClick={onToggleLink}
        title={linked ? 'Seiten trennen' : 'Alle Seiten koppeln'}
      >
        {linked ? '🔒 Gekoppelt' : '🔓 Getrennt'}
      </button>
    </div>
  )
}

export default function BleedTool() {
  const [file, setFile] = useState<File | null>(null)
  const [pageCount, setPageCount] = useState<number>(0)
  const [globalBleed, setGlobalBleed] = useState<BleedValues>(defaultBleed())
  const [globalLinked, setGlobalLinked] = useState(true)
  const [perPage, setPerPage] = useState(false)
  const [pageBleeds, setPageBleeds] = useState<PageBleed[]>([])
  const [pageLinked, setPageLinked] = useState<boolean[]>([])
  const [processing, setProcessing] = useState(false)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const loadFile = useCallback(async (f: File) => {
    if (!f.type.includes('pdf')) return
    setFile(f)
    const bytes = await f.arrayBuffer()
    const pdf = await PDFDocument.load(bytes)
    const count = pdf.getPageCount()
    setPageCount(count)
    setPageBleeds(
      Array.from({ length: count }, (_, i) => ({
        pageIndex: i,
        bleed: defaultBleed(),
      }))
    )
    setPageLinked(Array(count).fill(true))
  }, [])

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      const f = e.dataTransfer.files[0]
      if (f) loadFile(f)
    },
    [loadFile]
  )

  const togglePerPage = () => {
    setPerPage((v) => {
      if (!v && pageCount > 0) {
        // copy global bleed to all pages when switching on
        setPageBleeds((prev) =>
          prev.map((pb) => ({ ...pb, bleed: { ...globalBleed } }))
        )
      }
      return !v
    })
  }

  const updatePageBleed = (idx: number, values: BleedValues) => {
    setPageBleeds((prev) =>
      prev.map((pb) => (pb.pageIndex === idx ? { ...pb, bleed: values } : pb))
    )
  }

  const togglePageLink = (idx: number) => {
    setPageLinked((prev) => prev.map((v, i) => (i === idx ? !v : v)))
  }

  const processAndDownload = async () => {
    if (!file) return
    setProcessing(true)
    try {
      const bytes = await file.arrayBuffer()
      const pdf = await PDFDocument.load(bytes)
      const pages = pdf.getPages()

      pages.forEach((page, i) => {
        const bleed = perPage ? pageBleeds[i].bleed : globalBleed
        const { x, y, width, height } = page.getMediaBox()

        const topPt = bleed.top * MM_TO_PT
        const rightPt = bleed.right * MM_TO_PT
        const bottomPt = bleed.bottom * MM_TO_PT
        const leftPt = bleed.left * MM_TO_PT

        // Expand MediaBox: move lower-left corner by bleed, increase size
        page.setMediaBox(
          x - leftPt,
          y - bottomPt,
          width + leftPt + rightPt,
          height + topPt + bottomPt
        )
      })

      const outBytes = await pdf.save()
      const blob = new Blob([outBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = file.name.replace('.pdf', '_anschnitt.pdf')
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <main className="bleed-tool">
      <div className="bleed-tool-header">
        <h1>PDF Anschnitt</h1>
        <p>Füge Anschnitt (Bleed) zu jeder Seite deines PDFs hinzu — vollständig lokal in deinem Browser.</p>
      </div>

      {/* Upload Zone */}
      <div
        className={`drop-zone ${dragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          style={{ display: 'none' }}
          onChange={(e) => { if (e.target.files?.[0]) loadFile(e.target.files[0]) }}
        />
        {file ? (
          <div className="file-info">
            <span className="file-icon">📄</span>
            <strong>{file.name}</strong>
            <span className="file-meta">{pageCount} {pageCount === 1 ? 'Seite' : 'Seiten'} · {(file.size / 1024).toFixed(0)} KB</span>
            <span className="change-hint">Klicken zum Ändern</span>
          </div>
        ) : (
          <div className="drop-hint">
            <span className="drop-icon">📂</span>
            <strong>PDF hier ablegen</strong>
            <span>oder klicken zum Auswählen</span>
          </div>
        )}
      </div>

      {/* Global Bleed Settings */}
      <section className="settings-section">
        <h2>Anschnitt</h2>
        <BleedInput
          values={globalBleed}
          onChange={setGlobalBleed}
          linked={globalLinked}
          onToggleLink={() => setGlobalLinked((v) => !v)}
        />
      </section>

      {/* Per-Page Toggle */}
      {file && pageCount > 0 && (
        <section className="settings-section">
          <label className="toggle-label">
            <div className={`toggle ${perPage ? 'on' : ''}`} onClick={togglePerPage}>
              <div className="toggle-thumb" />
            </div>
            <span>Anderen Anschnitt pro Seite</span>
          </label>

          {perPage && (
            <div className="per-page-list">
              {pageBleeds.map((pb, i) => (
                <details key={i} className="page-detail">
                  <summary>Seite {i + 1}</summary>
                  <BleedInput
                    values={pb.bleed}
                    onChange={(v) => updatePageBleed(i, v)}
                    linked={pageLinked[i]}
                    onToggleLink={() => togglePageLink(i)}
                  />
                </details>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Process Button */}
      <div className="action-row">
        <button
          className="btn-process"
          disabled={!file || processing}
          onClick={processAndDownload}
        >
          {processing ? 'Wird verarbeitet…' : '⬇ Anschnitt hinzufügen & herunterladen'}
        </button>
        {file && (
          <p className="local-note">✓ Dein PDF verlässt deinen Computer nicht.</p>
        )}
      </div>
    </main>
  )
}
