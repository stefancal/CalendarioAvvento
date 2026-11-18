import { useEffect, useRef } from 'react'
import { playlist, type useMusic } from '../music'

type Music = ReturnType<typeof useMusic>
export function MusicPlayer({ music }: { music: Music }) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const element = dialog.current
    if (!element) return
    if (!music.preferences.chosen && !element.open) element.showModal()
    if (music.preferences.chosen && element.open) element.close()
  }, [music.preferences.chosen])
  return <>
    {/* I riferimenti sono usati soltanto dai callback di React, non letti durante il rendering. */}
    {/* eslint-disable-next-line react-hooks/refs */}
    <audio ref={music.attachAudio} src={playlist[0]} preload="none" onEnded={music.next} onError={music.reportError}/>
    <dialog ref={dialog} className="music-dialog" aria-labelledby="music-title" onCancel={event => { event.preventDefault(); music.choose(false) }}>
      <div className="music-emblem" aria-hidden="true">&#9835;</div>
      <p className="music-kicker">La Linea 24 &middot; Un invito al viaggio</p><h2 id="music-title">La melodia del viaggio</h2>
      <p>«Tra i binari dimenticati risuona ancora una vecchia melodia. Vuoi lasciarti accompagnare dalla musica della Linea 24?»</p>
      <div className="actions"><button className="primary" onClick={() => music.choose(true)}>Attiva la musica</button><button className="secondary" onClick={() => music.choose(false)}>Viaggia in silenzio</button></div>
    </dialog>
  </>
}
export function MusicButton({ music }: { music: Music }) {
  const playing = music.preferences.enabled && music.status === 'playing'
  const label = music.status === 'blocked' ? 'Premi per avviare la musica' : music.status === 'error' ? 'Musica non disponibile, riprova' : playing ? 'Disattiva la musica' : 'Attiva la musica'
  const waiting = music.status === 'blocked' || music.status === 'error'
  return <button type="button" className="music-button" onClick={music.toggle} aria-label={label} title={label} aria-pressed={playing}>
    <svg className="music-note" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {waiting ? <path d="M8 4.5v15l12-7.5z"/> : <><path d="M9 18V5l10-2v13"/><ellipse cx="6.5" cy="18.5" rx="2.5" ry="1.8"/><ellipse cx="16.5" cy="16.5" rx="2.5" ry="1.8"/>{!playing && <path d="M3 3l18 18"/>}</>}
    </svg>
    {music.status === 'blocked' && <span className="music-status">Premi play</span>}{music.status === 'error' && <span className="music-status">Riprova</span>}
  </button>
}
export function MusicSettings({ music }: { music: Music }) {
  return <section className="music-settings"><p className="settings-section-label">Atmosfera</p><h3>Musica</h3><div className="settings-volume"><label htmlFor="music-volume">Volume</label><span>{Math.round(music.preferences.volume * 100)}%</span></div><input id="music-volume" type="range" min="0" max="100" value={Math.round(music.preferences.volume * 100)} onChange={event => music.setVolume(Number(event.target.value) / 100)}/></section>
}
