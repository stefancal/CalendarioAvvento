export type Route = { view: 'calendario' | 'diario' } | { view: 'giorno'; day: number | null }
export function parseRoute(hash: string): Route {
  if (hash === '#/diario') return {view:'diario'}
  if (hash === '#/giorno') return {view:'giorno',day:null}
  const match = /^#\/day\/(0[1-9]|1[0-9]|2[0-4])$/.exec(hash)
  return match ? {view:'giorno',day:Number(match[1])} : {view:'calendario'}
}
export function routeHash(route: Route): string {
  if (route.view !== 'giorno') return `#/${route.view}`
  return route.day === null ? '#/giorno' : `#/day/${String(route.day).padStart(2,'0')}`
}
