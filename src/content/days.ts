import type { DayDefinition } from '../game/types'
import { day01 } from './day01'
import { day02 } from './day02'
export const authoredDays: DayDefinition[] = [day01, day02, ...[3, 4, 5, 6].map(day => ({ day, status: 'draft' as const }))]
export const days: DayDefinition[] = Array.from({ length: 24 }, (_, index) => authoredDays.find(definition => definition.day === index + 1) ?? { day: index + 1, status: 'draft' })
