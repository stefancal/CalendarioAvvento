// @vitest-environment jsdom
import { afterEach, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { EvidenceGallery } from './EvidenceGallery'
import { day02 } from '../content/day02'
afterEach(() => { cleanup(); Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal'); Reflect.deleteProperty(HTMLDialogElement.prototype, 'close') })
it('mostra i reperti testuali e permette di passare al successivo', () => {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {configurable:true, value: function(this: HTMLDialogElement) { this.setAttribute('open', '') }})
  if (day02.status !== 'ready') throw Error('draft')
  render(<EvidenceGallery day={2} documents={day02.documents}/>)
  fireEvent.click(screen.getByRole('button', {name:'Esamina Registro degli orologi'}))
  fireEvent.error(screen.getByAltText('Registro degli orologi'))
  expect(screen.getByText(/Al segnale delle 21:00/)).toBeTruthy()
  fireEvent.click(screen.getByRole('button', {name:'Successivo'}))
  fireEvent.error(screen.getByAltText('Prospetto delle tratte'))
  expect(screen.getByText(/Tempi minimi di percorrenza/)).toBeTruthy()
})
