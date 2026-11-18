import { useState } from 'react'
import { assetManifest } from '../content/assets'
import { DocumentViewer } from '../components/EvidenceGallery'
import { PuzzleForm } from '../puzzles/PuzzleForm'
import type { DocumentDefinition } from '../game/types'
import { draftPlans } from './dayPlans'

/** Development only: no validator, progress, rewards, date override or storage. */
export default function DraftPreviews() {
  const [day, setDay] = useState(1)
  const [document, setDocument] = useState<DocumentDefinition | null>(null)
  const plan = draftPlans[day - 1]
  return <section className="fixture" aria-label="Anteprime di sviluppo giorni 1–6"><h2>Anteprime di sviluppo · Giorni 1–6</h2><p>DRAFT · Strutture non giocabili, indipendenti dalla data. I dati e le risposte devono ancora essere approvati; gli appunti sono temporanei e separati dai progressi.</p><nav className="actions" aria-label="Seleziona anteprima">{draftPlans.map(item => <button className="secondary" key={item.day} aria-current={item.day === day ? 'page' : undefined} onClick={() => {setDay(item.day); setDocument(null)}}>Giorno {String(item.day).padStart(2,'0')}</button>)}</nav><div key={day}><h3>Giorno {String(day).padStart(2,'0')} · {plan.title}</h3><p>Ricompensa prevista (non assegnabile): {plan.reward}</p><div className="day-columns"><section className="paper"><h3>Documenti · da preparare</h3>{plan.documents.map(entry => <button className="document-card" key={entry.id} onClick={() => setDocument({id:entry.id,title:entry.title,text:'Segnaposto di sviluppo: documento non ancora redatto o approvato.',image:assetManifest.documents[day]?.[entry.id]})}>{entry.title} ↗</button>)}{plan.slots && <><p>Struttura vuota: {plan.slots.count} {plan.slots.label.toLowerCase()}.</p><ol>{Array.from({length:plan.slots.count},(_, index) => <li key={index}>{plan.slots!.label} {index + 1} — dati da definire</li>)}</ol></>}</section><section className="paper"><h3>Interazione · DRAFT</h3><PuzzleForm puzzle={plan.puzzle} preview/><p>Indizio e soluzione: non ancora disponibili.</p></section></div></div>{document && <DocumentViewer document={document} close={() => setDocument(null)}/>}</section>
}
