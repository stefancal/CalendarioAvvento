/** Asset facoltativi: percorsi pubblici a partire da /assets/. Nessun contenuto è pronto finché non viene approvato. */
export type AssetManifest = {
  logo: string | null
  logoBanner?: string | null
  sackIcon?: string | null
  favicon: string | null
  calendar: string | null
  calendarIllustration?: string | null
  diary: string | null
  diaryIllustrations?: Partial<Record<number, { src: string; alt: string }>>
  chapters: Partial<Record<number, string>>
  days: Partial<Record<number, string>>
  documents: Partial<Record<number, Record<string, string>>>
  items: Record<string, { silhouette?: string; image?: string }>
}
export const assetManifest: AssetManifest = {
  logo: '/assets/ui/logo.png', logoBanner: '/assets/ui/logoBanner.png', sackIcon: '/assets/ui/sack.png', favicon: '/assets/ui/logo.png', calendar: null,
  calendarIllustration: '/assets/ui/24train.png', diary: null, diaryIllustrations: {},
  chapters: {}, days: {}, documents: {}, items: {},
}
/** Le sei fasce di quattro giornate sono provvisorie; le immagini del giorno hanno precedenza. */
export function dayBackground(day: number, manifest: AssetManifest = assetManifest): string | null {
  if (!Number.isInteger(day) || day < 1 || day > 24) return null
  return manifest.days[day] ?? manifest.chapters[Math.ceil(day / 4)] ?? null
}
