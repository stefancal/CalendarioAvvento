export type DocumentDefinition = { id: string; title: string; text: string; image?: string; imageAlt?: string }
export type PuzzleAnswer = string | Record<string, string> | boolean[]
export type LogicGrid = { title?: string; rows: string[]; columns: string[] }
type PuzzleBase = { prompt: string; notes?: LogicGrid | LogicGrid[]; notesTextLabel?: string }
export type Puzzle = PuzzleBase & (
  | { type: 'text'; label: string; inputMode?: 'text' | 'numeric'; validate: (answer: string) => boolean }
  | { type: 'fields'; fields: { id: string; label: string }[]; validate: (answer: Record<string, string>) => boolean }
  | { type: 'switches'; labels: [string, string, string, string, string, string, string, string]; validate: (answer: boolean[]) => boolean }
)
export type PuzzlePreview = Omit<Extract<Puzzle, {type: 'text'}>, 'validate'> | Omit<Extract<Puzzle, {type: 'fields'}>, 'validate'> | Omit<Extract<Puzzle, {type: 'switches'}>, 'validate'>
export type DiarySection = { type: 'narration'; text: string } | { type: 'dialogue'; speaker: string; text: string }
export type DayDefinition = { day: number; status: 'draft' } | {
  day: number; status: 'ready'; title: string; intro: string; documents: DocumentDefinition[];
  puzzle: Puzzle; hint?: string; success: string; dialogue?: { speaker: string; text: string }[]; diary: string; diarySections?: DiarySection[];
  requiredItems?: { itemId: string; missingMessage: string }[]
}
export type InventoryItem = { id: string; title: string; description: string; acquiredByDay: number; lastNeededByDay?: number; image?: string; silhouette?: string }
export type ItemState = 'undiscovered' | 'active' | 'exhausted'
