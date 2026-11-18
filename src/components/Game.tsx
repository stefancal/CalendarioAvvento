import { useRef, useEffect, useState } from 'react'
import { PuzzleForm } from '../puzzles/PuzzleForm'
import { assetManifest } from '../content/assets'
import { completeDay, itemState, revealHint } from '../game/engine'
import type { Progress } from '../game/progress'
import type { DayDefinition, DocumentDefinition, InventoryItem } from '../game/types'

function ImageFallback({src, alt, className}: {src?: string; alt: string; className?: string}) {
  const [failed, setFailed] = useState(false)
  return src && !failed ? <img className={className} src={src} alt={alt} loading="lazy" onError={() => setFailed(true)}/> : <span className="image-fallback" aria-hidden="true">◇</span>
}
export function DocumentViewer({document, close}: {document: DocumentDefinition; close: () => void}) {
  const ref = useRef<HTMLDialogElement>(null)
  const [zoom, setZoom] = useState(1)
  useEffect(() => { ref.current?.showModal() }, [])
  return <dialog className="viewer" ref={ref} onClose={close} aria-labelledby="document-title"><div className="dialog-header"><h2 id="document-title">{document.title}</h2><button className="close" onClick={() => ref.current?.close()} aria-label="Chiudi documento">×</button></div><div className="dialog-body"><div className="actions"><button className="secondary" onClick={() => setZoom(z => Math.max(1, z - .25))}>Riduci</button><button className="secondary" onClick={() => setZoom(z => Math.min(3, z + .25))}>Ingrandisci</button><span aria-live="polite">{Math.round(zoom * 100)}%</span></div><div className="document-scroll"><div style={{fontSize: `${zoom}em`, width: `${zoom * 100}%`}}>{document.image && <ImageFallback src={document.image} alt={document.imageAlt ?? document.title} className="document-image"/>}<p>{document.text}</p></div></div></div></dialog>
}
export function DayPanel({day, progress, update, inventory = [], completedDays = []}: {day: DayDefinition; progress: Progress; update: (p: Progress) => void; inventory?: InventoryItem[]; completedDays?: number[]}) {
  const [message, setMessage] = useState('')
  const [document, setDocument] = useState<DocumentDefinition | null>(null)
  if (day.status === 'draft') return <div className="paper"><span className="paper-label">TAPPA IN PREPARAZIONE</span><h2>Questa tappa non è ancora disponibile</h2><p>Il contenuto e l’enigma sono ancora in preparazione.</p>{import.meta.env.DEV && <p className="dev-note">Segnaposto di sviluppo: nessun enigma o ricompensa è configurato.</p>}</div>
  const done = progress.completedDayIds.includes(day.day)
  const missingItems = day.requiredItems?.filter(required => {
    const item = inventory.find(candidate => candidate.id === required.itemId)
    return !item || itemState(item, completedDays) === 'undiscovered'
  }) ?? []
  const rewards = inventory.filter(item => item.acquiredByDay === day.day)
  return <><h2>{day.title}</h2><p className="lead narrative">{day.intro}</p><div className="day-columns"><section className="paper archive-panel archive-documents"><h3>Documenti di viaggio</h3>{day.documents.length ? day.documents.map(d => <button key={d.id} className="document-card" onClick={() => setDocument({ ...d, image: assetManifest.documents[day.day]?.[d.id] ?? d.image })}>{d.title} <span aria-hidden="true">↗</span></button>) : <p>Nessun documento disponibile.</p>}</section><section className="paper archive-panel archive-puzzle"><h3>Il caso da risolvere</h3>{done ? <div className="narrative" role="status"><strong>Tappa completata</strong><p>{day.success}</p>{day.dialogue?.map((line, index) => <p key={index}><strong>{line.speaker}:</strong> {line.text}</p>)}{rewards.length > 0 && <p><strong>Oggetti ottenuti:</strong> {rewards.map(item => item.title).join(', ')}</p>}</div> : <>{missingItems.map(required => <p key={required.itemId} className="missing-item">{required.missingMessage}</p>)}<PuzzleForm puzzle={day.puzzle} submit={answer => { const next = completeDay(progress, day, answer); if (next === progress) setMessage('Risposta non corretta. Puoi riprovare.'); else { update(next); setMessage('') } }}/><p role="status">{message}</p>{day.hint && (progress.revealedHintDayIds.includes(day.day) ? <p><strong>Indizio:</strong> {day.hint}</p> : <button className="secondary" onClick={() => update(revealHint(progress, day))}>Mostra indizio</button>)}</>}</section></div>{document && <DocumentViewer document={document} close={() => setDocument(null)}/>}</>
}
export function Inventory({items, completed}: {items: InventoryItem[]; completed: number[]}) {
  const [selected, setSelected] = useState<InventoryItem | null>(null)
  const [zoomed, setZoomed] = useState(false)
  if (!items.length) return <p>Gli oggetti del viaggio sono ancora in preparazione.</p>
  return <><div className="inventory-grid">{items.map(item => { const state = itemState(item, completed); return state === 'undiscovered' ? <div className="inventory-card" key={item.id} aria-label="Oggetto ancora da scoprire"><ImageFallback key={assetManifest.items[item.id]?.silhouette ?? item.silhouette} src={assetManifest.items[item.id]?.silhouette ?? item.silhouette} alt=""/><span>Da scoprire</span></div> : <button key={item.id} className={`inventory-card ${state}`} onClick={() => { setZoomed(false); setSelected(item) }}><ImageFallback key={assetManifest.items[item.id]?.image ?? item.image} src={assetManifest.items[item.id]?.image ?? item.image} alt=""/><span>{item.title}</span><small>{state === 'exhausted' ? 'Utilizzato' : 'Disponibile'}</small></button> })}</div>{selected && <div className={`item-detail ${itemState(selected, completed)}`}><button className="text-button" onClick={() => setSelected(null)}>← Torna agli oggetti</button><h3>{selected.title}</h3><div className={`item-image-scroll${zoomed ? ' zoomed' : ''}`}><ImageFallback key={assetManifest.items[selected.id]?.image ?? selected.image} src={assetManifest.items[selected.id]?.image ?? selected.image} alt={selected.title}/></div>{(assetManifest.items[selected.id]?.image ?? selected.image) && <button className="secondary" onClick={() => setZoomed(!zoomed)}>{zoomed ? 'Riduci immagine' : 'Ingrandisci immagine'}</button>}<p>{selected.description}</p></div>}</>
}
