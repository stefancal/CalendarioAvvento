import type { DayDefinition } from '../game/types'
import { day01 } from './day01'
import { day02 } from './day02'
import { day03 } from './day03'
import { day04 } from './day04'
import { day05 } from './day05'
import { day06 } from './day06'
export const authoredDays: DayDefinition[] = [day01, day02, day03, day04, day05, day06]
export const days: DayDefinition[] = Array.from({ length: 24 }, (_, index) => authoredDays.find(definition => definition.day === index + 1) ?? { day: index + 1, status: 'draft' })
