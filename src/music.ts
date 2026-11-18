import { useEffect, useRef, useState } from 'react'

// Aggiungere qui solo i file effettivamente presenti in public/audio.
export const playlist = [`${import.meta.env.BASE_URL}audio/music1.mp3`]
const storageKey = 'linea24-music-v1'
type Preferences = { chosen: boolean; enabled: boolean; volume: number }
function loadPreferences(): Preferences {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(storageKey) ?? 'null')
    if (value && typeof value === 'object') {
      const p = value as Partial<Preferences>
      if (typeof p.chosen === 'boolean' && typeof p.enabled === 'boolean' && typeof p.volume === 'number' && Number.isFinite(p.volume) && p.volume >= 0 && p.volume <= 1) return { chosen: p.chosen, enabled: p.enabled, volume: p.volume }
    }
  } catch { /* Storage non disponibile o dati non validi. */ }
  return { chosen: false, enabled: false, volume: 0.2 }
}

export function useMusic() {
  const [preferences, setPreferences] = useState(loadPreferences)
  const [status, setStatus] = useState<'idle' | 'playing' | 'blocked' | 'error'>('idle')
  const audio = useRef<HTMLAudioElement>(null)
  const initialAttempt = useRef(false)
  const track = useRef(0)
  const request = useRef(0)
  useEffect(() => { try { localStorage.setItem(storageKey, JSON.stringify(preferences)) } catch { /* La musica resta utilizzabile nella sessione. */ } }, [preferences])
  useEffect(() => { if (audio.current) audio.current.volume = preferences.volume }, [preferences.volume])
  const play = () => {
    const player = audio.current
    if (!player || !playlist.length) { setStatus('error'); return }
    const attempt = ++request.current
    try {
      void player.play().then(() => { if (attempt === request.current) setStatus('playing') }).catch((error: unknown) => {
        if (attempt === request.current) setStatus(error instanceof DOMException && error.name === 'NotAllowedError' ? 'blocked' : 'error')
      })
    } catch { if (attempt === request.current) setStatus('error') }
  }
  useEffect(() => {
    if (!initialAttempt.current) {
      initialAttempt.current = true
      if (preferences.chosen && preferences.enabled) play()
    }
    // Un solo tentativo automatico all'avvio, anche in StrictMode.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const choose = (enabled: boolean) => {
    setPreferences(p => ({ ...p, chosen: true, enabled }))
    if (enabled) play()
    else { request.current++; audio.current?.pause(); setStatus('idle') }
  }
  const toggle = () => choose(status === 'blocked' || status === 'error' ? true : !preferences.enabled)
  const next = () => {
    const player = audio.current
    if (!player || !preferences.enabled) return
    if (playlist.length > 1) { track.current = (track.current + 1) % playlist.length; player.src = playlist[track.current] }
    else player.currentTime = 0
    play()
  }
  return { attachAudio: (element: HTMLAudioElement | null) => { audio.current = element }, reportError: () => setStatus('error'), preferences, status, choose, toggle, next, setVolume: (volume: number) => setPreferences(p => ({ ...p, volume })) }
}
