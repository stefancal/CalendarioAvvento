// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useMusic, playlist } from './music'
import { MusicButton, MusicPlayer, MusicSettings } from './components/Music'
function Harness() { const music = useMusic(); return <><MusicButton music={music}/><MusicPlayer music={music}/><MusicSettings music={music}/></> }
beforeEach(() => {
  localStorage.clear()
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: function(this: HTMLDialogElement) { this.setAttribute('open', '') } })
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: function(this: HTMLDialogElement) { this.removeAttribute('open') } })
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined)
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {})
})
afterEach(() => { cleanup(); vi.restoreAllMocks(); Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal'); Reflect.deleteProperty(HTMLDialogElement.prototype, 'close') })
it('asks once, plays on consent, saves volume and pauses without replacing the audio', async () => {
  const view = render(<Harness/>)
  const audio = view.container.querySelector('audio')!
  expect(screen.getByText('La melodia del viaggio')).toBeTruthy()
  expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled()
  fireEvent.click(screen.getByText('Attiva la musica'))
  await waitFor(() => expect(screen.getByRole('button', { name: 'Disattiva la musica' })).toBeTruthy())
  expect(audio.volume).toBe(0.2)
  fireEvent.change(screen.getByLabelText(/Volume/), { target: { value: '40' } })
  expect(audio.volume).toBe(0.4)
  fireEvent.click(screen.getByRole('button', { name: 'Disattiva la musica' }))
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled()
  expect(view.container.querySelector('audio')).toBe(audio)
  expect(JSON.parse(localStorage.getItem('linea24-music-v1')!)).toEqual({ chosen: true, enabled: false, volume: 0.4 })
  view.unmount()
  render(<Harness/>)
  expect(screen.queryByRole('dialog')).toBeNull()
})
it('supports silence, looping and sequential tracks without a second audio element', async () => {
  const view = render(<Harness/>)
  fireEvent.click(screen.getByRole('button', { name: 'Viaggia in silenzio' }))
  expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled()
  fireEvent.click(screen.getByRole('button', { name: 'Attiva la musica' }))
  const audio = view.container.querySelector('audio')!
  await waitFor(() => expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1))
  fireEvent.ended(audio)
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2)
  playlist.push('/audio/music2.mp3')
  fireEvent.ended(audio)
  expect(audio.getAttribute('src')).toBe('/audio/music2.mp3')
  expect(view.container.querySelectorAll('audio')).toHaveLength(1)
  playlist.pop()
})
it('offers a manual retry when autoplay is blocked', async () => {
  localStorage.setItem('linea24-music-v1', JSON.stringify({ chosen: true, enabled: true, volume: 0.2 }))
  vi.mocked(HTMLMediaElement.prototype.play).mockRejectedValueOnce(new DOMException('blocked', 'NotAllowedError'))
  render(<Harness/>)
  await waitFor(() => expect(screen.getByRole('button', { name: 'Premi per avviare la musica' })).toBeTruthy())
  fireEvent.click(screen.getByRole('button', { name: 'Premi per avviare la musica' }))
  await waitFor(() => expect(screen.getByRole('button', { name: 'Disattiva la musica' })).toBeTruthy())
})
