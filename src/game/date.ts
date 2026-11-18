export function romeDate(now = new Date()): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(now)
  const get = (type: string) => Number(parts.find(part => part.type === type)?.value)
  return { year: get('year'), month: get('month'), day: get('day') }
}
export function isUnlocked(day: number, now = new Date()): boolean {
  if (!Number.isInteger(day) || day < 1 || day > 24) return false
  const date = romeDate(now)
  return date.year > 2026 || (date.year === 2026 && date.month === 12 && date.day >= day)
}
export function currentDay(now = new Date()): number | null {
  const date = romeDate(now)
  if (date.year < 2026 || (date.year === 2026 && date.month < 12)) return null
  return date.year > 2026 ? 24 : Math.min(date.day, 24)
}
