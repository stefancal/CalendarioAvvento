export function circuitConditions(states: boolean[]): boolean[] {
  if (states.length !== 8 || !states.every(value => typeof value === 'boolean')) return []
  const [a, b, c, d, e, f, g, h] = states
  return [states.filter(Boolean).length === 4, a !== b, c === a, d !== c, e === b, f !== e, g === (a && f), h !== g, !(b && h)]
}
export const validateCircuit = (states: boolean[]) => {
  const conditions = circuitConditions(states)
  return conditions.length === 9 && conditions.every(Boolean)
}
