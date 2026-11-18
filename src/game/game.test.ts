import { describe, it, expect, vi, afterEach } from 'vitest'
import { isUnlocked, currentDay } from './date'
import { completeDay, revealHint, itemState, earnedDays } from './engine'
import { emptyProgress, loadProgress, parseProgress, saveProgress, STORAGE_KEY } from './progress'
import type { DayDefinition, InventoryItem } from './types'
import { authoredDays, days } from '../content/days'
import { items } from '../content/items'
const ready: DayDefinition = {day:1,status:'ready',title:'test',intro:'',documents:[],puzzle:{type:'text',label:'Risposta',prompt:'',validate: a => a === 'ok'},hint:'hint',success:'success',diary:'entry'}
const draft: DayDefinition = {day:2,status:'draft'}
const item: InventoryItem = {id:'test',title:'test',description:'',acquiredByDay:1,lastNeededByDay:2}
afterEach(() => vi.unstubAllGlobals())
describe('content registry', () => {
  it('has exactly 24 unique calendar slots and valid unique authored days and item IDs', () => {
    expect(days.map(day => day.day)).toEqual(Array.from({length:24},(_, index) => index + 1))
    expect(new Set(authoredDays.map(day => day.day)).size).toBe(authoredDays.length)
    expect(authoredDays.every(day => Number.isInteger(day.day) && day.day >= 1 && day.day <= 24)).toBe(true)
    expect(new Set(items.map(item => item.id)).size).toBe(items.length)
    expect(items.every(item => Number.isInteger(item.acquiredByDay) && item.acquiredByDay >= 1 && item.acquiredByDay <= 24 && (item.lastNeededByDay === undefined || (Number.isInteger(item.lastNeededByDay) && item.lastNeededByDay >= 1 && item.lastNeededByDay <= 24)))).toBe(true)
  })
})
describe('calendar in Rome', () => {
  it('unlocks at Rome midnight, independently of completion and remains open after launch', () => {
    expect(isUnlocked(1, new Date('2026-11-30T22:59:59Z'))).toBe(false)
    expect(isUnlocked(1, new Date('2026-11-30T23:00:00Z'))).toBe(true)
    expect(isUnlocked(2, new Date('2026-11-30T23:00:00Z'))).toBe(false)
    expect(isUnlocked(17, new Date('2026-12-17T12:00:00Z'))).toBe(true)
    expect(currentDay(new Date('2027-01-01T00:00:00Z'))).toBe(24)
  })
  it('opens each of the 24 dates at midnight in Rome and leaves earlier dates open', () => {
    for (let day = 1; day <= 24; day++) {
      const midnight = new Date(Date.UTC(2026, 11, day - 1, 23))
      expect(isUnlocked(day, new Date(midnight.getTime() - 1))).toBe(false)
      expect(isUnlocked(day, midnight)).toBe(true)
      if (day > 1) expect(isUnlocked(day - 1, midnight)).toBe(true)
    }
    expect(isUnlocked(0, new Date('2027-01-01'))).toBe(false)
    expect(isUnlocked(25, new Date('2027-01-01'))).toBe(false)
  })
})
describe('completion and hints', () => {
  it('rejects drafts and wrong answers; accepts correct answers once after unlimited attempts', () => {
    let p = emptyProgress()
    expect(completeDay(p,draft,'ok')).toBe(p)
    for (let i=0;i<20;i++) expect(completeDay(p,ready,'wrong')).toBe(p)
    p = completeDay(p,ready,'ok')
    expect(p.completedDayIds).toEqual([1])
    expect(completeDay(p,ready,'ok')).toBe(p)
    expect(earnedDays([draft,ready], {...p,completedDayIds:[2,1]})).toEqual([ready])
  })
  it('reveals only configured hints once', () => {
    const p = emptyProgress()
    expect(revealHint(p,draft)).toBe(p)
    const next = revealHint(p,ready)
    expect(next.revealedHintDayIds).toEqual([1])
    expect(revealHint(next,ready)).toBe(next)
  })
})
describe('inventory', () => {
  it('requires acquisition and derives exhaustion from the last completed use, including out of order', () => {
    expect(itemState(item,[])).toBe('undiscovered')
    expect(itemState(item,[2])).toBe('undiscovered')
    expect(itemState(item,[1])).toBe('active')
    expect(itemState(item,[2,1])).toBe('exhausted')
    expect(itemState({...item,lastNeededByDay:undefined},[1,2])).toBe('active')
  })
})
describe('persistence and backup', () => {
  it('rejects malformed data and invalid schema', () => {
    expect(parseProgress('{')).toBeNull()
    expect(parseProgress(JSON.stringify({ version: 2, completedDayIds: [], revealedHintDayIds: [], lastVisitedDay: null }))).toBeNull()
    expect(parseProgress(JSON.stringify({ version: 1, completedDayIds: [25], revealedHintDayIds: [], lastVisitedDay: null }))).toBeNull()
  })
  it('round-trips exported JSON and deduplicates days', () => {
    const p = {...emptyProgress(),completedDayIds:[1,1], lastVisitedDay:1}
    expect(parseProgress(JSON.stringify(p))).toEqual({...p,completedDayIds:[1]})
  })
  it('recovers from corrupt or unavailable localStorage and reports write failures', () => {
    vi.stubGlobal('localStorage', {getItem: () => '{', setItem: () => {throw Error('quota')}})
    expect(loadProgress()).toEqual(emptyProgress())
    expect(saveProgress(emptyProgress())).toBe(false)
    vi.stubGlobal('localStorage', {getItem: () => {throw Error('blocked')}})
    expect(loadProgress()).toEqual(emptyProgress())
  })
  it('saves the same versioned JSON used for backup', () => {
    let saved = ''
    vi.stubGlobal('localStorage', {getItem: () => saved, setItem: (key:string,value:string) => {expect(key).toBe(STORAGE_KEY); saved=value}})
    const p = {...emptyProgress(),lastVisitedDay:1}
    expect(saveProgress(p)).toBe(true)
    expect(loadProgress()).toEqual(p)
  })
})
