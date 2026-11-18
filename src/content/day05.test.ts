import { describe, expect, it } from 'vitest'
import { day05 } from './day05'
import { completeDay, earnedDays, itemState, revealHint, validateAnswer } from '../game/engine'
import { emptyProgress, parseProgress } from '../game/progress'
import { items } from './items'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const keywordAlphabet = (key: string) => [...new Set(key + alphabet)].join('')
const substitute = (text: string, from: string, to: string) => [...text].map(letter => {
  const index = from.indexOf(letter)
  return index < 0 ? letter : to[index]
}).join('')

describe('Day 5 cipher', () => {
  if (day05.status !== 'ready') throw Error('Day 5 is not ready')
  const day = day05
  it('checks the acrostic, keyed alphabet and complete round trip', () => {
    const verses = day.documents[0].text.split('\n').slice(2, 8)
    const key = verses.map(verse => verse[0]).join('')
    expect(key).toBe('NATALE')
    expect([...new Set(key)].join('')).toBe('NATLE')
    const cipher = keywordAlphabet(key)
    expect(cipher).toBe('NATLEBCDFGHIJKMOPQRSUVWXYZ')
    const message = day.documents[2].text.split('\n')[2]
    expect(substitute('APRI IL TERZO CASSETTO', alphabet, cipher)).toBe(message)
    expect(substitute(message, cipher, alphabet)).toBe('APRI IL TERZO CASSETTO')
    expect(day.documents[1].text).not.toContain(cipher)
    expect(day.intro).not.toContain('APRI IL TERZO CASSETTO')
  })
  it('normalizes complete answers, rejects partial ones and awards the key once', () => {
    expect(validateAnswer(day.puzzle, '  aPrI   iL  tErZo cAsSeTtO  ')).toBe(true)
    expect(validateAnswer(day.puzzle, 'TERZO CASSETTO')).toBe(false)
    const start = emptyProgress()
    const key = items.find(item => item.id === 'key-24')!
    expect(itemState(key, start.completedDayIds)).toBe('undiscovered')
    expect(completeDay(start, day, 'TERZO CASSETTO')).toBe(start)
    const done = completeDay(revealHint(start, day), day, 'APRI IL TERZO CASSETTO')
    expect(completeDay(done, day, 'APRI IL TERZO CASSETTO')).toBe(done)
    const restored = parseProgress(JSON.stringify(done))!
    expect(restored.revealedHintDayIds).toEqual([5])
    expect(itemState(key, restored.completedDayIds)).toBe('active')
    expect(earnedDays([day], restored)).toEqual([day])
  })
})
