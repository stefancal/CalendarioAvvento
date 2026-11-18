import { describe, expect, it } from 'vitest'
import { day06 } from './day06'
import { completeDay, earnedDays, itemState, revealHint } from '../game/engine'
import { emptyProgress, parseProgress } from '../game/progress'
import { items } from './items'

function permutations<T>(values: T[]): T[][] {
  return values.length === 0 ? [[]] : values.flatMap((value, i) => permutations([...values.slice(0, i), ...values.slice(i + 1)]).map(rest => [value, ...rest]))
}
describe('Day 6 logic', () => {
  it('enumerates all twelve constraints and finds exactly one full table', () => {
    const customers = permutations(['Ada','Bruno','Clara','Dario','Ester'])
    const objects = permutations(['Bussola','Chiave','Lettera','Fotografia','Carillon'])
    const watches = permutations(['11','23','37','42','58'])
    expect([customers.length, objects.length, watches.length]).toEqual([120,120,120])
    const c = customers.filter(x => x.indexOf('Clara') > x.indexOf('Ester') && x.indexOf('Dario') < x.indexOf('Ester') && x.indexOf('Bruno') === x.indexOf('Clara') + 1 && x.indexOf('Ada') > x.indexOf('Ester'))
    const o = objects.filter(x => x.indexOf('Chiave') === x.indexOf('Bussola') + 1 && x.indexOf('Fotografia') === x.indexOf('Lettera') + 1 && x.indexOf('Carillon') > x.indexOf('Fotografia'))
    const w = watches.filter(x => x.indexOf('11') === x.indexOf('42') + 1 && x.indexOf('58') === x.indexOf('37') + 1 && x.indexOf('23') > x.indexOf('58'))
    const tables = c.flatMap(customer => o.flatMap(object => w.filter(watch => object.indexOf('Lettera') === customer.indexOf('Clara') && watch.indexOf('37') > customer.indexOf('Dario') && watch.indexOf('37') < customer.indexOf('Ada')).map(watch => ({customer, object, watch}))))
    expect(tables).toEqual([{customer:['Dario','Ester','Clara','Bruno','Ada'], object:['Bussola','Chiave','Lettera','Fotografia','Carillon'], watch:['42','11','37','58','23']}])
    expect(tables[0].watch[tables[0].object.indexOf('Lettera')]).toBe('37')
    if (day06.status !== 'ready') throw Error('Day 6 is not ready')
    expect(day06.documents.find(doc => doc.id === 'note1')?.text).toContain('La lettera fu consegnata da Clara.')
    expect(day06.documents.find(doc => doc.id === 'note2')?.text).toContain('dopo Dario, ma prima di Ada.')
  })
  it('persists the completed day, hint, diary and watch without changing earlier items', () => {
    const key = items.find(item => item.id === 'key-24')!
    const watch = items.find(item => item.id === 'watch-37')!
    const start = {...emptyProgress(), completedDayIds:[5]}
    expect(itemState(watch, start.completedDayIds)).toBe('undiscovered')
    expect(completeDay(start, day06, '7')).toBe(start)
    const done = completeDay(revealHint(start, day06), day06, '37')
    expect(completeDay(done, day06, '37')).toBe(done)
    const restored = parseProgress(JSON.stringify(done))!
    expect(restored.revealedHintDayIds).toEqual([6])
    expect(itemState(key, restored.completedDayIds)).toBe('active')
    expect(itemState(watch, restored.completedDayIds)).toBe('active')
    expect(earnedDays([day06], restored)).toEqual([day06])
  })
})
