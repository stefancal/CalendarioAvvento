// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PuzzleForm } from './PuzzleForm'
import { validateAnswer } from '../game/engine'
import type { Puzzle } from '../game/types'

afterEach(cleanup)
describe('universal answers', () => {
  it('accepts paste, keyboard deletion and leading zero while excluding non-digits', async () => {
    const user = userEvent.setup()
    const submit = vi.fn()
    const puzzle: Puzzle = {type:'numeric', digits:4, label:'Codice', prompt:'', validate: v => v === '0079'}
    render(<PuzzleForm puzzle={puzzle} submit={submit}/>)
    await user.tab()
    const input = screen.getByLabelText('Codice') as HTMLInputElement
    expect(document.activeElement).toBe(input)
    await user.keyboard('a00b')
    expect(input.value).toBe('00')
    await user.paste('79')
    expect(input.value).toBe('0079')
    await user.keyboard('{Backspace}9{Enter}')
    expect(submit).toHaveBeenCalledWith('0079')
    expect(validateAnswer(puzzle, '0079')).toBe(true)
    expect(validateAnswer(puzzle, '079')).toBe(false)
    expect(validateAnswer(puzzle, '00a79')).toBe(false)
  })
  it('normalizes text only when configured and checks choice membership', () => {
    const exact: Puzzle = {type:'text',label:'Testo',prompt:'',validate:v => v === 'citta'}
    const normalized: Puzzle = {...exact, normalization:{trim:true,caseInsensitive:true,removeAccents:true}}
    expect(validateAnswer(exact, ' Citt\u00e0 ')).toBe(false)
    expect(validateAnswer(normalized, ' Citt\u00e0 ')).toBe(true)
    expect(validateAnswer({...exact,normalization:{trim:true,caseInsensitive:true}}, ' Citt\u00e0 ')).toBe(false)
    const choice: Puzzle = {type:'choice',label:'Scelta',prompt:'',options:[{id:'a',label:'A'}],validate:() => true}
    expect(validateAnswer(choice,'a')).toBe(true)
    expect(validateAnswer(choice,'b')).toBe(false)
  })
  it('selects a choice with the keyboard', async () => {
    const user = userEvent.setup(); const submit = vi.fn()
    const puzzle: Puzzle = {type:'choice',label:'Scelta',prompt:'',options:[{id:'a',label:'Prima'},{id:'b',label:'Seconda'}],validate:v => v === 'a'}
    render(<PuzzleForm puzzle={puzzle} submit={submit}/>)
    await user.tab(); await user.keyboard(' '); await user.tab(); await user.keyboard('{Enter}')
    expect(submit).toHaveBeenCalledWith('a')
  })
})
