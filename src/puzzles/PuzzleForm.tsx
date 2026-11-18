import { useId, useState } from 'react'
import type { LogicGrid, Puzzle, PuzzleAnswer, PuzzlePreview } from '../game/types'

function Notes({grid}: {grid: LogicGrid}) {
  const [cells, setCells] = useState<Record<string, number>>({})
  const labels = ['vuoto', 'sì', 'no']
  return <details className="notes"><summary>{grid.title ? `Griglia: ${grid.title}` : 'Griglia di appunti facoltativa'}</summary><p>Usa ogni casella per segnare sì, no o lasciare vuoto. Gli appunti non vengono salvati.</p><div className="grid-scroll"><table><thead><tr><th scope="col">Riga</th>{grid.columns.map((column, c) => <th scope="col" key={c}>{column}</th>)}</tr></thead><tbody>{grid.rows.map((row, r) => <tr key={r}><th scope="row">{row}</th>{grid.columns.map((column, c) => { const key = `${r}-${c}`; const state = cells[key] ?? 0; return <td key={c}><button type="button" className="note-cell" aria-label={`${row}, ${column}: ${labels[state]}. Cambia stato`} onClick={() => setCells({...cells, [key]:(state + 1) % 3})}>{['–', '✓', '×'][state]}</button></td> })}</tr>)}</tbody></table></div></details>
}
export function PuzzleForm({puzzle, submit, preview = false}: {puzzle: Puzzle; submit: (answer: PuzzleAnswer) => void; preview?: false} | {puzzle: PuzzlePreview; preview: true; submit?: never}) {
  const id = useId()
  const [text, setText] = useState('')
  const [fields, setFields] = useState<Record<string, string>>({})
  const [switches, setSwitches] = useState<boolean[]>(() => Array(8).fill(false))
  const answer = puzzle.type === 'text' ? text : puzzle.type === 'fields' ? Object.fromEntries(puzzle.fields.map(field => [field.id, fields[field.id] ?? ''])) : switches
  return <><p>{puzzle.prompt}</p><form onSubmit={event => {event.preventDefault(); if (!preview) submit?.(answer)}}>
    {puzzle.type === 'text' && <><label htmlFor={`${id}-text`}>{puzzle.label}</label><input id={`${id}-text`} inputMode={puzzle.inputMode ?? 'text'} value={text} onChange={event => setText(event.target.value)} autoComplete="off"/></>}
    {puzzle.type === 'fields' && puzzle.fields.map(field => <div key={field.id}><label htmlFor={`${id}-${field.id}`}>{field.label}</label><input id={`${id}-${field.id}`} value={fields[field.id] ?? ''} onChange={event => setFields({...fields, [field.id]:event.target.value})} autoComplete="off"/></div>)}
    {puzzle.type === 'switches' && <fieldset className="switch-bank"><legend>Interruttori</legend>{puzzle.labels.map((label,index) => <label className="switch-control" key={index}><input type="checkbox" aria-label={label} checked={switches[index]} onChange={event => setSwitches(switches.map((value,i) => i === index ? event.target.checked : value))}/><span>{label}</span><span aria-hidden="true">{switches[index] ? 'Acceso' : 'Spento'}</span></label>)}</fieldset>}
    <button className="primary" type="submit" disabled={preview}>{preview ? 'Verifica non disponibile' : 'Verifica'}</button></form>{puzzle.notesTextLabel && <label className="notes-text">{puzzle.notesTextLabel}<textarea rows={5} aria-label={puzzle.notesTextLabel}/><small>Appunti temporanei, non salvati.</small></label>}{puzzle.notes && (Array.isArray(puzzle.notes) ? puzzle.notes : [puzzle.notes]).map((grid, index) => <Notes key={index} grid={grid}/>)}</>
}
