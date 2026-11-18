export type DocumentDefinition = { id: string; title: string; text: string; fallbackText?: boolean; src?: string; alt?: string; description?: string; image?: string; imageAlt?: string; format?: 'anomalies' | 'ticket' | 'register'; discoveries?: DiarySection[] }
export type PuzzleAnswer = string | Record<string, string> | boolean[]
export type LogicGrid = { title?: string; rows: string[]; columns: string[] }
type PuzzleBase = { prompt: string; subtitle?: string; errorMessage?: string; successMessage?: string; notes?: LogicGrid | LogicGrid[]; notesTextLabel?: string }
export type Puzzle = PuzzleBase & (
  | { type: 'numeric'; label: string; digits: number; validate: (answer: string) => boolean }
  | { type: 'text'; label: string; inputMode?: 'text' | 'numeric'; maxLength?: number; normalization?: { trim?: boolean; caseInsensitive?: boolean; removeAccents?: boolean }; validate: (answer: string) => boolean }
  | { type: 'choice'; label: string; options: { id: string; label: string }[]; validate: (answer: string) => boolean }
  | { type: 'fields'; fields: { id: string; label: string }[]; validate: (answer: Record<string, string>) => boolean }
  | { type: 'switches'; labels: [string, string, string, string, string, string, string, string]; validate: (answer: boolean[]) => boolean }
)
type WithoutValidator<T> = T extends unknown ? Omit<T, 'validate'> : never
export type PuzzlePreview = WithoutValidator<Puzzle>
export type DiarySection = { type: 'narration'; text: string } | { type: 'dialogue'; speaker: string; text: string }
export type DayDefinition = { day: number; status: 'draft' } | {
  day: number; status: 'ready'; title: string; intro: string; introWithoutRequiredItems?: string; documents: DocumentDefinition[];
  puzzle: Puzzle; hint?: string; hintTitle?: string; success: string; dialogue?: { speaker: string; text: string }[]; diary: string; diarySections?: DiarySection[];
  requiredItems?: { itemId: string; missingMessage: string }[]
}
export type InventoryItem = { id: string; title: string; description: string; acquiredByDay: number; lastNeededByDay?: number; image?: string; silhouette?: string }
export type ItemState = 'undiscovered' | 'active' | 'exhausted'
