import type { DayDefinition, InventoryItem, ItemState, Puzzle, PuzzleAnswer } from './types'
import type { Progress } from './progress'
export function validateAnswer(puzzle: Puzzle, answer: PuzzleAnswer): boolean {
  if (puzzle.type === 'numeric') return typeof answer === 'string' && /^[0-9]+$/.test(answer) && answer.length === puzzle.digits && puzzle.validate(answer)
  if (puzzle.type === 'choice') return typeof answer === 'string' && puzzle.options.some(option => option.id === answer) && puzzle.validate(answer)
  if (puzzle.type === 'text') {
    if (typeof answer !== 'string') return false
    let value = answer
    if (puzzle.normalization?.trim) value = value.trim()
    if (puzzle.normalization?.caseInsensitive) value = value.toLocaleLowerCase('it')
    if (puzzle.normalization?.removeAccents) value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    return puzzle.validate(value)
  }
  if (puzzle.type === 'switches') return Array.isArray(answer) && answer.length === 8 && answer.every(value => typeof value === 'boolean') && puzzle.validate(answer)
  if (!answer || typeof answer !== 'object' || Array.isArray(answer)) return false
  return puzzle.fields.every(field => typeof answer[field.id] === 'string') && puzzle.validate(answer)
}
export function completeDay(progress: Progress, day: DayDefinition, answer: PuzzleAnswer): Progress {
  if (day.status !== 'ready' || !validateAnswer(day.puzzle, answer) || progress.completedDayIds.includes(day.day)) return progress
  return { ...progress, completedDayIds: [...progress.completedDayIds, day.day] }
}
export function revealHint(progress: Progress, day: DayDefinition): Progress {
  if (day.status !== 'ready' || !day.hint || progress.revealedHintDayIds.includes(day.day)) return progress
  return { ...progress, revealedHintDayIds: [...progress.revealedHintDayIds, day.day] }
}
export function itemState(item: InventoryItem, completed: number[]): ItemState {
  if (!completed.includes(item.acquiredByDay)) return 'undiscovered'
  return item.lastNeededByDay !== undefined && completed.includes(item.lastNeededByDay) ? 'exhausted' : 'active'
}
export function earnedDays(days: DayDefinition[], progress: Progress): DayDefinition[] {
  return days.filter(day => day.status === 'ready' && progress.completedDayIds.includes(day.day)).sort((a,b) => a.day - b.day)
}
