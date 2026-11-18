import { describe, expect, it } from 'vitest'
import { day03 } from './day03'
import { completeDay, earnedDays, revealHint } from '../game/engine'
import { emptyProgress, parseProgress } from '../game/progress'

function permutations(values: string): string[] {
  return values.length <= 1 ? [values] : [...values].flatMap((value, index) => permutations(values.slice(0, index) + values.slice(index + 1)).map(rest => value + rest))
}

describe('Giorno 3', () => {
  it('ha una sola sequenza compatibile con le registrazioni originali', () => {
    const orders = permutations('VABCS')
    expect(orders).toHaveLength(120)
    const official = orders.filter(order => order.indexOf('V') < order.indexOf('A') && order.indexOf('B') === order.indexOf('A') + 1 && order.indexOf('B') < order.indexOf('C') && order.indexOf('S') === order.indexOf('C') + 1)
    expect(official).toEqual(['VABCS'])
    expect(official.filter(order => order.indexOf('S') < order.indexOf('C'))).toEqual([])
  })
  it('accetta la sequenza con entrambe le grafie e conserva completamento e indizio', () => {
    const start = emptyProgress()
    expect(completeDay(start, day03, 'VABSC')).toBe(start)
    expect(completeDay(start, day03, 'VABCS').completedDayIds).toEqual([3])
    const completed = completeDay(revealHint(start, day03), day03, 'vabcs')
    const restored = parseProgress(JSON.stringify(completed))!
    expect(restored.completedDayIds).toEqual([3])
    expect(restored.revealedHintDayIds).toEqual([3])
    expect(earnedDays([day03], restored)).toEqual([day03])
  })
  it('mantiene separati i vincoli originali, la rettifica e la soluzione', () => {
    if (day03.status !== 'ready') throw Error('draft')
    const [board, register, notice] = day03.documents
    expect(board.text).not.toContain('VABCS')
    expect(register.text).toContain("Il Vesper lasciò la linea prima che l'Aurora")
    expect(register.text).toContain("L'Aurora precedette il Brina")
    expect(register.text).toContain('il Cometa attendeva ancora')
    expect(notice.text).toContain('Cometa fu seguito immediatamente dallo Stella')
    expect(notice.text).toContain('Stella precedette Cometa')
    expect(day03.intro).not.toContain('VABCS')
    expect(day03.hint).not.toContain('VABCS')
  })
})
