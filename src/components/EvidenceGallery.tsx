import { useEffect, useRef, useState } from 'react'
import { assetManifest } from '../content/assets'
import type { DocumentDefinition } from '../game/types'

type Evidence = { id: string; title: string; src?: string; alt: string; description?: string; fallbackText?: string }

function EvidenceCard({item, open}: {item: Evidence; open: () => void}) {
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    if (!item.src && import.meta.env.DEV) console.warn(`Immagine non configurata per il reperto: ${item.title}`)
  }, [item.src, item.title])
  return <button type="button" className="evidence-card" onClick={open} aria-label={`Esamina ${item.title}`}>
    <span className="evidence-thumbnail">{item.src && !failed ? <img src={item.src} alt="" loading="lazy" onError={() => { setFailed(true); if (import.meta.env.DEV) console.warn(`Immagine non disponibile per il reperto: ${item.title}`, item.src) }}/> : <span className="evidence-placeholder">{item.title}<small>{item.fallbackText ? 'Apri il documento' : 'Immagine non disponibile'}</small></span>}</span>
    <span className="evidence-title">{item.title}</span>
  </button>
}

function EvidenceViewer({items, initialIndex, close}: {items: Evidence[]; initialIndex: number; close: () => void}) {
  const [index, setIndex] = useState(initialIndex)
  const item = items[index]
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.showModal()
    closeRef.current?.focus()
    return () => { document.body.style.overflow = oldOverflow; previous?.focus() }
  }, [])
  const navigate = (next: number) => { setIndex(next); setFailed(false); setZoom(1); scrollRef.current?.scrollTo?.({left: 0, top: 0}) }
  const reset = () => { setZoom(1); scrollRef.current?.scrollTo({left: 0, top: 0}) }
  return <dialog className="evidence-viewer" ref={dialogRef} onClose={close} aria-labelledby="evidence-viewer-title">
    <div className="evidence-viewer-header"><h2 id="evidence-viewer-title">{item.title}</h2><button ref={closeRef} type="button" className="evidence-close" onClick={() => dialogRef.current?.close()} aria-label="Chiudi documento">×</button></div>
    {items.length > 1 && <nav className="evidence-navigation" aria-label="Navigazione tra i reperti"><button type="button" disabled={index === 0} onClick={() => navigate(index - 1)}><span aria-hidden="true">←</span> Precedente</button><span className="evidence-count">{index + 1} / {items.length}</span><button type="button" disabled={index === items.length - 1} onClick={() => navigate(index + 1)}>Successivo <span aria-hidden="true">→</span></button></nav>}
    <div className="evidence-scroll" ref={scrollRef} tabIndex={0} aria-label="Immagine del reperto, scorri per esplorare">
      {item.description && <p className="evidence-description">{item.description}</p>}
      {item.src && !failed ? <div className="evidence-full" style={{width: `${zoom * 100}%`}}><img src={item.src} alt={item.alt} onError={() => { setFailed(true); if (import.meta.env.DEV) console.warn(`Immagine non disponibile per il reperto: ${item.title}`, item.src) }}/></div> : item.fallbackText ? <article className="evidence-transcript" style={{width: `${zoom * 100}%`}}><p>{item.fallbackText}</p></article> : <p className="evidence-missing">{item.title} — immagine non disponibile.</p>}
      {item.src && !failed && item.fallbackText && <details className="evidence-accessible-text"><summary>Leggi la trascrizione</summary><p>{item.fallbackText}</p></details>}
    </div>
    <div className="evidence-zoom" role="group" aria-label="Zoom del reperto">
      <svg className="evidence-zoom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m14.5 14.5 5 5"/></svg>
      <button type="button" aria-label="Riduci −" title="Riduci" onClick={() => setZoom(z => Math.max(1, z - .25))} disabled={zoom <= 1}>−</button>
      <button className="evidence-zoom-reset" type="button" aria-label="Ripristina zoom" title="Ripristina zoom" onClick={reset}><span aria-live="polite">{Math.round(zoom * 100)}%</span></button>
      <button type="button" aria-label="Ingrandisci +" title="Ingrandisci" onClick={() => setZoom(z => Math.min(4, z + .25))} disabled={zoom >= 4}>+</button>
    </div>
  </dialog>
}

export function EvidenceGallery({day, documents}: {day: number; documents: DocumentDefinition[]}) {
  const [selected, setSelected] = useState<Evidence | null>(null)
  const items: Evidence[] = documents.map(d => ({id: d.id, title: d.title, src: assetManifest.documents[day]?.[d.id] ?? d.src ?? d.image, alt: d.alt ?? d.imageAlt ?? d.title, description: d.description, fallbackText: d.fallbackText ? d.text : undefined}))
  return <section className="evidence-gallery" aria-labelledby={`evidence-heading-${day}`}><div className="evidence-heading"><p className="eyebrow">Le tracce del viaggio</p><h2 id={`evidence-heading-${day}`}>Indizi e reperti</h2><p>Esamina i reperti per risolvere l’enigma.</p></div>{items.length ? <div className="evidence-grid">{items.map(item => <EvidenceCard key={item.id} item={item} open={() => setSelected(item)}/>)}</div> : <p>Nessun reperto disponibile.</p>}{selected && <EvidenceViewer items={items} initialIndex={items.findIndex(item => item.id === selected.id)} close={() => setSelected(null)}/>}</section>
}

/** Anteprime di sviluppo: mostra anche la descrizione del segnaposto. */
export function DocumentViewer({document, close}: {document: DocumentDefinition; close: () => void}) {
  return <EvidenceViewer items={[{id: document.id, title: document.title, src: document.src ?? document.image, alt: document.alt ?? document.imageAlt ?? document.title, description: document.description ?? document.text}]} initialIndex={0} close={close}/>
}
