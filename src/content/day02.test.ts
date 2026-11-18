import { describe, expect, it } from 'vitest'
import { day02 } from './day02'
import { completeDay, itemState, revealHint } from '../game/engine'
import { emptyProgress, parseProgress } from '../game/progress'
import { items } from './items'

const stations = ['Valbruna', 'Pontebianco', 'Selvaria', 'Capolinea Nord']
const offsets = [0, 12, 5, 23]
const minima = [18, 24, 16]
const minutes = (time: string) => { const [hours, mins] = time.split(':').map(Number); return hours * 60 + mins }
describe('Giorno 2', () => {
  it('verifica i dati pubblicati e individua un solo viaggio impossibile', () => {
    if (day02.status !== 'ready') throw Error('draft')
    const text = day02.documents.find(d => d.id === 'tickets')!.text
    const rows = [...text.matchAll(/(04\d) {2}(Valbruna|Pontebianco|Selvaria|Capolinea Nord) (\d\d:\d\d) → (Valbruna|Pontebianco|Selvaria|Capolinea Nord) (\d\d:\d\d)/g)]
    const result = rows.map(([, id, from, departure, to, arrival]) => {
      const start = stations.indexOf(from), end = stations.indexOf(to)
      const duration = minutes(arrival) - offsets[end] - minutes(departure) + offsets[start]
      return { id, duration, minimum: minima.slice(start, end).reduce((sum, n) => sum + n, 0) }
    })
    expect(result.map(row => row.duration)).toEqual([22,32,21,43,42,39])
    expect(result.map(row => row.minimum)).toEqual([18,24,16,42,40,58])
    expect(result.filter(row => row.duration < row.minimum).map(row => row.id)).toEqual(['046'])
    expect(day02.documents[0].text).toContain('21:12')
    expect(day02.documents[0].text).toContain('21:53')
    expect(day02.documents[0].text).toContain('23:18')
  })
  it('conserva lo zero iniziale, indizio, progresso e ricompensa', () => {
    let progress = emptyProgress()
    progress = completeDay(progress, day02, '46')
    expect(progress.completedDayIds).toEqual([])
    progress = revealHint(progress, day02)
    progress = completeDay(progress, day02, '046')
    expect(parseProgress(JSON.stringify(progress))?.completedDayIds).toEqual([2])
    expect(progress.revealedHintDayIds).toEqual([2])
    expect(itemState(items.find(item => item.id === 'ticket-046')!, progress.completedDayIds)).toBe('active')
  })
})
