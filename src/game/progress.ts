export const STORAGE_KEY = 'linea24.progress.v1'
export type Progress = { version: 1; completedDayIds: number[]; revealedHintDayIds: number[]; lastVisitedDay: number | null; switchStates?: Record<string, boolean[]> }
export const emptyProgress = (): Progress => ({ version: 1, completedDayIds: [], revealedHintDayIds: [], lastVisitedDay: null })
const validDay = (n: unknown): n is number => Number.isInteger(n) && (n as number) >= 1 && (n as number) <= 24
export function parseProgress(raw: string): Progress | null {
  try {
    const value: unknown = JSON.parse(raw)
    if (!value || typeof value !== 'object') return null
    const p = value as Record<string, unknown>
    if (p.version !== 1 || !Array.isArray(p.completedDayIds) || !p.completedDayIds.every(validDay) || !Array.isArray(p.revealedHintDayIds) || !p.revealedHintDayIds.every(validDay) || !(p.lastVisitedDay === null || validDay(p.lastVisitedDay))) return null
    let switchStates: Record<string, boolean[]> | undefined
    if (p.switchStates !== undefined) {
      if (!p.switchStates || typeof p.switchStates !== 'object' || Array.isArray(p.switchStates)) return null
      const entries = Object.entries(p.switchStates)
      if (!entries.every(([key, states]) => /^(?:[1-9]|1[0-9]|2[0-4])$/.test(key) && Array.isArray(states) && states.length === 8 && states.every(value => typeof value === 'boolean'))) return null
      switchStates = Object.fromEntries(entries.map(([key, states]) => [key, [...states as boolean[]]]))
    }
    return { version: 1, completedDayIds: [...new Set(p.completedDayIds as number[])], revealedHintDayIds: [...new Set(p.revealedHintDayIds as number[])], lastVisitedDay: p.lastVisitedDay as number | null, ...(switchStates ? {switchStates} : {}) }
  } catch { return null }
}
export function loadProgress(): Progress {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? parseProgress(raw) ?? emptyProgress() : emptyProgress() } catch { return emptyProgress() }
}
export function saveProgress(progress: Progress): boolean {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); return true } catch { return false }
}
