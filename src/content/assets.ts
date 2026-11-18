/** Asset facoltativi: percorsi pubblici a partire da /assets/. Nessun contenuto è pronto finché non viene approvato. */
export type AssetManifest = {
  logo: string | null
  logoBanner?: string | null
  sackIcon?: string | null
  lumi?: string | null
  favicon: string | null
  calendar: string | null
  calendarIllustration?: string | null
  diary: string | null
  diaryIllustrations?: Partial<Record<number, { src: string; alt: string }>>
  chapters: Partial<Record<number, string>>
  days: Partial<Record<number, string>>
  scenes?: Partial<Record<number, string>>
  documents: Partial<Record<number, Record<string, string>>>
  items: Record<string, { silhouette?: string; image?: string }>
}
export const assetManifest: AssetManifest = {
  logo: '/assets/ui/logo.png', logoBanner: '/assets/ui/logoBanner.png', sackIcon: '/assets/ui/sack.png', lumi: '/assets/ui/lumi.png', favicon: '/assets/ui/logo.png', calendar: null,
  calendarIllustration: '/assets/ui/24train.png', diary: null, diaryIllustrations: {},
  chapters: {}, days: {}, scenes: { 1: `${import.meta.env.BASE_URL}assets/days/day-01/day1.png`, 2: `${import.meta.env.BASE_URL}assets/days/day-02/day2.png`, 3: `${import.meta.env.BASE_URL}assets/days/day-03/day3.png`, 4: `${import.meta.env.BASE_URL}assets/days/day-04/day4.png`, 5: `${import.meta.env.BASE_URL}assets/days/day-05/day5.png`, 6: `${import.meta.env.BASE_URL}assets/days/day-06/day6.png` }, documents: { 1: { letter: '/assets/days/day-01/letter.png', ticket: '/assets/days/day-01/ticket.png', register: '/assets/days/day-01/railway-register.png' }, 2: Object.fromEntries(['clocks', 'routes', 'tickets'].map(id => [id, `${import.meta.env.BASE_URL}assets/days/day-02/${id}.png`])), 3: Object.fromEntries(['board', 'register', 'notice'].map(id => [id, `${import.meta.env.BASE_URL}assets/days/day-03/${id}.png`])), 4: Object.fromEntries(['circuit', 'maintenance'].map(id => [id, `${import.meta.env.BASE_URL}assets/days/day-04/${id}.png`])), 5: Object.fromEntries(['card', 'manual', 'message'].map(id => [id, `${import.meta.env.BASE_URL}assets/days/day-05/${id}.png`])), 6: Object.fromEntries(['clocks', 'register', 'note1', 'note2'].map(id => [id, `${import.meta.env.BASE_URL}assets/days/day-06/${id}.png`])) }, items: { 'token-24': { image: `${import.meta.env.BASE_URL}assets/days/day-01/metal-token.png` }, 'ticket-046': { image: `${import.meta.env.BASE_URL}assets/days/day-02/sign.png` }, 'key-24': { image: `${import.meta.env.BASE_URL}assets/days/day-05/key.png` }, 'watch-37': { image: `${import.meta.env.BASE_URL}assets/days/day-06/watch.png` } },
}
/** Le sei fasce di quattro giornate sono provvisorie; le immagini del giorno hanno precedenza. */
export function dayBackground(day: number, manifest: AssetManifest = assetManifest): string | null {
  if (!Number.isInteger(day) || day < 1 || day > 24) return null
  return manifest.days[day] ?? manifest.chapters[Math.ceil(day / 4)] ?? null
}
