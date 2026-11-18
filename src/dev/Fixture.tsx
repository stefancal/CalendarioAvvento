import { useState } from 'react'
import { DayPanel, Inventory } from '../components/Game'
import { earnedDays } from '../game/engine'
import { emptyProgress } from '../game/progress'
import type { DayDefinition, InventoryItem } from '../game/types'
// Noncanonical test data. This module is imported only in development.
const fixtureDays: DayDefinition[] = [
  { day: 1, status: 'ready', title: 'Prova A', intro: 'Fixture non canonica per verificare il motore.', documents: [{id:'test', title:'Scheda di prova', text:'Un triangolo ha tre lati.'}], puzzle: {type:'text', label:'Risposta', prompt:'Quanti lati ha un triangolo?', validate: answer => answer.trim() === '3'}, hint:'Conta i lati.', success:'Prova A completata.', dialogue:[{speaker:'Voce di prova',text:'Questa è una riga di dialogo non canonica.'}], diary:'Annotazione della prova A.' },
  { day: 2, status: 'ready', title: 'Prova B', intro: 'Seconda tappa della catena di prova.', documents: [], puzzle: {type:'fields', fields:[{id:'ruote',label:'Ruote'},{id:'pedali',label:'Pedali'}], prompt:'Quante ruote e quanti pedali ha una bicicletta?', validate: answer => answer.ruote.trim() === '2' && answer.pedali.trim() === '2', notes:{rows:['Prima','Seconda'],columns:['Uno','Due']}}, success:'Prova B completata.', diary:'Annotazione della prova B.' },
  { day: 3, status: 'ready', title: 'Prova C', intro: 'Prova degli interruttori non canonica.', documents: [], puzzle: {type:'switches', labels:['A','B','C','D','E','F','G','H'], prompt:'Attiva soltanto A.', validate: answer => answer[0] && answer.slice(1).every(value => !value)}, success:'Prova C completata.', diary:'Annotazione della prova C.' },
]
const fixtureItems: InventoryItem[] = [{id:'fixture', title:'Oggetto di prova', description:'Oggetto non canonico per verificare gli stati.', acquiredByDay:1, lastNeededByDay:2}]
export default function Fixture() {
  const [progress, setProgress] = useState(emptyProgress)
  const [day, setDay] = useState(1)
  return <section className="fixture"><h2>Laboratorio di sviluppo — contenuto non canonico</h2><p>Progressi separati, temporanei e mai esportati. Prova B può essere completata prima di A.</p><div className="actions"><button className="secondary" onClick={() => setDay(1)}>Prova A</button><button className="secondary" onClick={() => setDay(2)}>Prova B</button><button className="secondary" onClick={() => setDay(3)}>Prova C</button><button className="secondary" onClick={() => setProgress(emptyProgress())}>Azzera prova</button></div><DayPanel key={day} day={fixtureDays[day-1]} progress={progress} update={setProgress} inventory={fixtureItems} completedDays={progress.completedDayIds}/><h3>Sacchetto di prova</h3><Inventory items={fixtureItems} completed={progress.completedDayIds}/><h3>Diario di prova</h3>{earnedDays(fixtureDays, progress).map(d => d.status === 'ready' && <p key={d.day}>{d.diary}</p>)}</section>
}
