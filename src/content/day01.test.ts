import { describe, expect, it } from 'vitest'
import { day01 } from './day01'
import { completeDay, itemState, revealHint } from '../game/engine'
import { emptyProgress } from '../game/progress'
import { items } from './items'

const calc = ([a,b,c,d,e,f]: number[]) => [Math.abs(a-b), c+d, Math.abs(e-f), a+b+c+d+e+f]
const seal = (numbers: number[]) => calc(numbers).map(n => n % 10).join('')
describe('Giorno 1', () => {
  it('verifica ogni riga del registro e la soluzione', () => {
    expect(day01.status).toBe('ready')
    if (day01.status !== 'ready') return
    const lines = day01.documents.find(d => d.id === 'register')!.text.split('\n').slice(2)
    for (const line of lines) {
      const [sequence, ...columns] = line.split(' | ')
      const values = sequence.split(' · ').map(Number)
      expect(calc(values)).toEqual(columns.slice(0,4).map(Number))
      expect(seal(values)).toBe(columns[4])
    }
    expect(calc([2,9,14,1,18,9])).toEqual([7,15,9,53])
    expect(seal([2,9,14,1,18,9])).toBe('7593')
  })
  it('conserva i paragrafi narrativi e i caratteri dei documenti', () => {
    if (day01.status !== 'ready') throw Error('draft')
    expect(day01.intro.split('\n\n')).toHaveLength(15)
    expect([day01.intro, day01.diary, day01.hint, ...day01.documents.map(document => document.text)].join('')).not.toMatch(/[?\uFFFD]/)
  })
  it('contiene sei anomalie ordinate', () => {
    if (day01.status !== 'ready') throw Error('draft')
    const lines = day01.documents[0].text.split('\n').slice(1,7)
    expect(lines.map(line => [...line].filter((c,i) => i > 0 && /[A-Z]/.test(c)).join('')).join('')).toBe('BINARI')
  })
  it('consente tentativi e un indizio, assegna soltanto alla soluzione', () => {
    let progress = emptyProgress()
    for (let i=0;i<20;i++) progress = completeDay(progress,day01,'0000')
    expect(itemState(items[0],progress.completedDayIds)).toBe('undiscovered')
    progress = revealHint(progress,day01)
    expect(revealHint(progress,day01)).toBe(progress)
    progress = completeDay(progress,day01,'7593')
    expect(progress.completedDayIds).toEqual([1])
    expect(itemState(items[0],progress.completedDayIds)).toBe('active')
  })
})
