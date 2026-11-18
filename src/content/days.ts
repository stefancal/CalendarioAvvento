import type { DayDefinition } from '../game/types'
// Add authored definitions here. Any day without a definition remains a draft.
export const authoredDays: DayDefinition[] = [1, 2, 3, 4, 5, 6].map(day => ({ day, status: 'draft' }))
export const days: DayDefinition[] = Array.from({ length: 24 }, (_, index) =>
  authoredDays.find(definition => definition.day === index + 1) ?? { day: index + 1, status: 'draft' },
)
