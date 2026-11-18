// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { DayPanel, Inventory } from './Game'
import { emptyProgress } from '../game/progress'
import { assetManifest } from '../content/assets'
import type { DayDefinition, InventoryItem } from '../game/types'
const textDay: DayDefinition = { day:1, status:'ready', title:'Prova', intro:'Apertura', documents:[], puzzle:{type:'text',label:'Codice',prompt:'Prova',validate: value => value === '123'}, hint:'Indizio di prova', success:'Risolto', dialogue:[{speaker:'Voce',text:'Fine'}], diary:'Diario' }
const fieldDay: DayDefinition = { ...textDay, day:2, puzzle:{type:'fields',prompt:'Due campi',fields:[{id:'a',label:'Primo'},{id:'b',label:'Secondo'}],validate: value => value.a === 'a' && value.b === 'b',notes:{rows:['Riga'],columns:['Colonna']}} }
const switchDay: DayDefinition = { ...textDay, day:3, puzzle:{type:'switches',prompt:'Seleziona',labels:['A','B','C','D','E','F','G','H'],validate: value => value[0] && value.slice(1).every(v => !v)} }
const item: InventoryItem = {id:'i',title:'Oggetto',description:'Dettaglio',acquiredByDay:1,lastNeededByDay:2}
function Harness({day}: {day: DayDefinition}) { const [progress,setProgress]=useState(emptyProgress); const [visible,setVisible]=useState(true); return <><button onClick={() => setVisible(!visible)}>Cambia vista</button>{visible && <DayPanel day={day} progress={progress} update={setProgress}/>}<Inventory items={[item]} completed={progress.completedDayIds}/></> }
afterEach(() => { cleanup(); assetManifest.items = {}; assetManifest.documents = {} })
describe('interactive puzzle flow', () => {
  it('allows retries, reveals a hint, completes and awards only after the correct answer', async () => {
    const user=userEvent.setup(); const view=render(<Harness day={textDay}/>);
    expect(screen.getByLabelText('Oggetto ancora da scoprire')).toBeTruthy()
    await user.click(screen.getByText('Mostra indizio')); expect(screen.getByText(/Indizio di prova/)).toBeTruthy()
    await user.type(screen.getByLabelText('Codice'),'bad'); await user.click(screen.getByText('Verifica'))
    expect(screen.getByText(/Risposta non corretta/)).toBeTruthy(); expect(screen.getByLabelText('Oggetto ancora da scoprire')).toBeTruthy()
    await user.clear(screen.getByLabelText('Codice')); await user.type(screen.getByLabelText('Codice'),'123'); await user.click(screen.getByText('Verifica'))
    expect(screen.getByText('Tappa completata')).toBeTruthy(); expect(screen.getByText('Fine')).toBeTruthy(); expect(screen.getByText('Oggetto')).toBeTruthy()
    await user.click(screen.getByText('Cambia vista')); await user.click(screen.getByText('Cambia vista')); expect(screen.getByText('Risolto')).toBeTruthy(); view.unmount()
  })
  it('validates each response field and keeps notes independent from the answer', async () => {
    const user=userEvent.setup(); render(<Harness day={fieldDay}/>); await user.click(screen.getByText('Griglia di appunti facoltativa'))
    await user.click(screen.getByRole('button',{name:/Riga, Colonna: vuoto/})); expect(screen.getByRole('button',{name:/Riga, Colonna: sì/})).toBeTruthy()
    await user.type(screen.getByLabelText('Primo'),'a'); await user.click(screen.getByText('Verifica')); expect(screen.getByText(/Risposta non corretta/)).toBeTruthy()
    await user.type(screen.getByLabelText('Secondo'),'b'); await user.click(screen.getByText('Verifica')); expect(screen.getByText('Tappa completata')).toBeTruthy()
  })
  it('shows the authored missing-item message without awarding the item or blocking the day', async () => {
    const user = userEvent.setup()
    const day: DayDefinition = {...fieldDay, requiredItems:[{itemId:'i',missingMessage:'Serve una prova precedente.'}]}
    const view = render(<DayPanel day={day} progress={emptyProgress()} update={() => {}} inventory={[item]} completedDays={[]}/> )
    expect(screen.getByText('Serve una prova precedente.')).toBeTruthy()
    expect(screen.getByLabelText('Primo')).toBeTruthy()
    await user.type(screen.getByLabelText('Primo'),'a')
    view.rerender(<DayPanel day={day} progress={{...emptyProgress(),completedDayIds:[1]}} update={() => {}} inventory={[item]} completedDays={[1]}/> )
    expect(screen.queryByText('Serve una prova precedente.')).toBeNull()
    expect((screen.getByLabelText('Primo') as HTMLInputElement).value).toBe('a')
  })
  it('shows configured rewards only after completing the awarding day', () => {
    const view = render(<DayPanel day={textDay} progress={emptyProgress()} update={() => {}} inventory={[item]} completedDays={[]}/> )
    expect(screen.queryByText(/Oggetti ottenuti/)).toBeNull()
    view.rerender(<DayPanel day={textDay} progress={{...emptyProgress(),completedDayIds:[1]}} update={() => {}} inventory={[item]} completedDays={[1]}/> )
    expect(screen.getByText(/Oggetti ottenuti/).parentElement?.textContent).toContain('Oggetto')
  })
  it('opens, zooms and closes the document dialog', async () => {
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {configurable:true, value: function (this: HTMLDialogElement) { this.setAttribute('open', '') }})
    Object.defineProperty(HTMLDialogElement.prototype, 'close', {configurable:true, value: function (this: HTMLDialogElement) { this.removeAttribute('open'); this.dispatchEvent(new Event('close')) }})
    const user = userEvent.setup(); render(<Harness day={{...textDay, documents:[{id:'d',title:'Scheda',text:'Testo leggibile'}]}}/>)
    await user.click(screen.getByText('Scheda')); expect(screen.getByText('Testo leggibile')).toBeTruthy(); await user.click(screen.getByText('Ingrandisci')); expect(screen.getByText('125%')).toBeTruthy()
    await user.click(screen.getByLabelText('Chiudi documento')); expect(screen.queryByText('Testo leggibile')).toBeNull(); Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal'); Reflect.deleteProperty(HTMLDialogElement.prototype, 'close')
  })
  it('keeps document text available when the image fails', async () => {
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {configurable:true, value: function (this: HTMLDialogElement) { this.setAttribute('open', '') }})
    const user = userEvent.setup()
    render(<Harness day={{...textDay, documents:[{id:'d',title:'Scheda',text:'Trascrizione',image:'/missing.png',imageAlt:'Illustrazione'}]}}/>)
    await user.click(screen.getByText('Scheda'))
    const image = screen.getByAltText('Illustrazione')
    fireEvent.error(image)
    expect(screen.getByText('Trascrizione')).toBeTruthy()
    expect(screen.queryByAltText('Illustrazione')).toBeNull()
    Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal')
  })
  it('uses manifest images for documents and inventory without changing their definitions', async () => {
    assetManifest.items = {i:{silhouette:'/assets/items/sagoma.webp',image:'/assets/items/oggetto.webp'}}
    assetManifest.documents = {1:{d:'/assets/documents/scheda.webp'}}
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {configurable:true, value: function (this: HTMLDialogElement) { this.setAttribute('open', '') }})
    const user = userEvent.setup()
    const view = render(<><DayPanel day={{...textDay, documents:[{id:'d',title:'Scheda',text:'Trascrizione'}]}} progress={emptyProgress()} update={() => {}}/><Inventory items={[item]} completed={[]}/></>)
    expect(view.container.querySelector('.inventory-card img')?.getAttribute('src')).toBe('/assets/items/sagoma.webp')
    await user.click(screen.getByText('Scheda'))
    expect(screen.getByAltText('Scheda').getAttribute('src')).toBe('/assets/documents/scheda.webp')
    view.rerender(<Inventory items={[item]} completed={[1,2]}/>)
    expect(view.container.querySelector('.inventory-card.exhausted img')?.getAttribute('src')).toBe('/assets/items/oggetto.webp')
    await user.click(screen.getByRole('button',{name:/Oggetto/}))
    expect(view.container.querySelector('.item-detail.exhausted img')?.getAttribute('src')).toBe('/assets/items/oggetto.webp')
    await user.click(screen.getByRole('button',{name:'Ingrandisci immagine'}))
    expect(view.container.querySelector('.item-image-scroll.zoomed')).not.toBeNull()
    await user.click(screen.getByRole('button',{name:'Riduci immagine'}))
    expect(view.container.querySelector('.item-image-scroll.zoomed')).toBeNull()
    Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal')
  })
  it('submits all eight switch states', async () => {
    const user=userEvent.setup(); render(<Harness day={switchDay}/>); expect(screen.getAllByRole('checkbox')).toHaveLength(8)
    await user.click(screen.getByText('Verifica')); expect(screen.getByText(/Risposta non corretta/)).toBeTruthy()
    await user.click(screen.getByLabelText('A')); await user.click(screen.getByText('Verifica')); expect(screen.getByText('Tappa completata')).toBeTruthy()
  })
})
