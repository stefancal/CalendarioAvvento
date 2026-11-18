// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { Diary } from './Diary'
import { assetManifest } from '../content/assets'
import type { DayDefinition } from '../game/types'
const day: DayDefinition = {day: 1, status: 'ready', title:'Capitolo di prova', intro:'', documents:[], puzzle:{type:'text', label:'', prompt:'', validate: () => false}, success:'', diary:'Testo di prova', diarySections:[{type:'narration',text:'Narrazione di prova'},{type:'dialogue',speaker:'Voce di prova',text:'Dialogo di prova'}]}
afterEach(() => {cleanup(); assetManifest.diaryIllustrations = {}})
describe('diario', () => {
  it('presents an empty page without invented stories', () => {
    render(<Diary earned={[]} openDay={() => {}}/>)
    expect(screen.getByText('Le pagine sono ancora vuote')).toBeTruthy()
    expect(screen.queryByRole('button',{name:/Riapri/})).toBeNull()
  })
  it('shows dated authored sections and tolerates an illustration error', () => {
    const open = vi.fn()
    assetManifest.diaryIllustrations = {1:{src:'/missing.webp', alt:'Immagine di prova'}}
    render(<Diary earned={[day]} openDay={open}/>)
    expect(screen.getByText('01 dicembre 2026')).toBeTruthy()
    expect(screen.getByText('Narrazione di prova')).toBeTruthy()
    expect(screen.getByText('Dialogo di prova').closest('blockquote')).not.toBeNull()
    fireEvent.error(screen.getByAltText('Immagine di prova'))
    expect(screen.queryByAltText('Immagine di prova')).toBeNull()
    fireEvent.click(screen.getByRole('button',{name:/Riapri la tappa/}))
    expect(open).toHaveBeenCalledWith(1)
  })
})
