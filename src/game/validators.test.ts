import { describe, expect, it } from 'vitest'
import { validateAnswer } from './engine'
import type { Puzzle } from './types'
describe('typed answer validation', () => {
  it('rejects missing or wrongly shaped multi-field and switch answers', () => {
    const fields: Puzzle = {type:'fields',prompt:'',fields:[{id:'one',label:'one'},{id:'two',label:'two'}],validate:a => a.one === 'x' && a.two === 'y'}
    const switches: Puzzle = {type:'switches',prompt:'',labels:['A','B','C','D','E','F','G','H'],validate:a => a.every(Boolean)}
    expect(validateAnswer(fields,{one:'x'})).toBe(false)
    expect(validateAnswer(fields,{one:'x',two:'y'})).toBe(true)
    expect(validateAnswer(switches,[true])).toBe(false)
    expect(validateAnswer(switches,Array(8).fill(true))).toBe(true)
    expect(validateAnswer(switches,'true')).toBe(false)
  })
})
