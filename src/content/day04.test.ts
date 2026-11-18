import { describe, expect, it } from 'vitest'
import { circuitConditions, validateCircuit } from './day04Circuit'
import { day04 } from './day04'
import { completeDay, earnedDays, revealHint } from '../game/engine'
import { emptyProgress, parseProgress } from '../game/progress'

describe('Day 4 circuit', () => {
  it('checks all nine conditions and all 256 configurations', () => {
    const configs = Array.from({length: 256}, (_, value) => Array.from({length: 8}, (_, bit) => Boolean(value & (1 << (7 - bit)))))
    const expected = [true, false, true, false, false, true, true, false]
    expect(circuitConditions(expected)).toEqual(Array(9).fill(true))
    expect(configs.filter(validateCircuit)).toEqual([expected])
    expect(validateCircuit([true])).toBe(false)
  })
  it('saves progress, hints, switches and the diary entry', () => {
    const start = {...emptyProgress(), switchStates: {'4': [true, false, true, false, false, true, true, false]}}
    expect(completeDay(start, day04, Array(8).fill(false))).toBe(start)
    const completed = completeDay(revealHint(start, day04), day04, start.switchStates['4'])
    const restored = parseProgress(JSON.stringify(completed))!
    expect(restored.switchStates?.['4']).toEqual(start.switchStates['4'])
    expect(restored.completedDayIds).toEqual([4])
    expect(restored.revealedHintDayIds).toEqual([4])
    expect(earnedDays([day04], restored)).toEqual([day04])
  })
})
