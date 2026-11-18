// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import DraftPreviews from './DraftPreviews'
import { draftPlans } from './dayPlans'
import { days } from '../content/days'
import { emptyProgress } from '../game/progress'
import { completeDay } from '../game/engine'

afterEach(() => {cleanup(); localStorage.clear()})
describe('anteprime isolate', () => {
  it('keeps unfinished days draft and rejects completion for every answer', () => {
    for (let day=3; day<=6; day++) {
      const definition = days[day-1]
      expect(definition.status).toBe('draft')
      const progress = emptyProgress()
      expect(completeDay(progress,definition,'qualsiasi')).toBe(progress)
    }
    expect(draftPlans[1].documents[0].id).toBe('orologi')
  })
  it('navigates all six plans without persisting or allowing verification', () => {
    const stored = JSON.stringify({...emptyProgress(),lastVisitedDay:2})
    localStorage.setItem('linea24.progress.v1',stored)
    render(<DraftPreviews/>)
    const nav = screen.getByRole('navigation',{name:'Seleziona anteprima'})
    for (let day=1; day<=6; day++) {
      fireEvent.click(within(nav).getByRole('button',{name:`Giorno ${String(day).padStart(2,'0')}`}))
      expect((screen.getByRole('button',{name:'Verifica non disponibile'}) as HTMLButtonElement).disabled).toBe(true)
    }
    expect(screen.getByText('Griglia: Clienti e orologio')).toBeTruthy()
    expect(screen.getByText('Griglia: Clienti e simbolo')).toBeTruthy()
    expect(localStorage.getItem('linea24.progress.v1')).toBe(stored)
  })
  it('exposes day 4 switches and day 5 substitution notes without a solution', () => {
    render(<DraftPreviews/>)
    const nav = screen.getByRole('navigation',{name:'Seleziona anteprima'})
    fireEvent.click(within(nav).getByRole('button',{name:'Giorno 04'}))
    expect(screen.getAllByRole('checkbox')).toHaveLength(8)
    fireEvent.click(within(nav).getByRole('button',{name:'Giorno 05'}))
    expect(screen.getByLabelText('Appunti: corrispondenze simbolo–lettera')).toBeTruthy()
  })
})
