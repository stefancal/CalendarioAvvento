import { useEffect, useRef, useState } from 'react'
import { DayPanel, Inventory } from './components/Game'
import { Diary } from './components/Diary'
import { items } from './content/items'
import { assetManifest, dayBackground } from './content/assets'
import { earnedDays } from './game/engine'
import { days } from './content/days'
import { currentDay, isUnlocked } from './game/date'
import { parseRoute, routeHash, type Route } from './game/routes'
import { emptyProgress, loadProgress, parseProgress, saveProgress, type Progress } from './game/progress'

type View = 'calendario' | 'diario' | 'giorno'
type Overlay = 'sack' | 'settings' | null
// Inserire il nome dell'autore quando sarà disponibile.
const creator = ''
export default function App() {
  const [progress, setProgress] = useState<Progress>(loadProgress)
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.hash))
  const view = route.view
  const [selected, setSelected] = useState<number | null>(() => { const r = parseRoute(window.location.hash); const p = loadProgress(); return r.view === 'giorno' && r.day && isUnlocked(r.day) ? r.day : p.lastVisitedDay && isUnlocked(p.lastVisitedDay) ? p.lastVisitedDay : currentDay() })
  const [overlay, setOverlay] = useState<Overlay>(null)
  const [notice, setNotice] = useState('')
  const [logoFailed, setLogoFailed] = useState(false)
  const [bannerFailed, setBannerFailed] = useState(false)
  const [sackIconFailed, setSackIconFailed] = useState(false)
  const [trainFailed, setTrainFailed] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [now, setNow] = useState(() => new Date())
  const [previewDays, setPreviewDays] = useState(false)
  const canOpen = (day: number) => (import.meta.env.DEV && previewDays) || isUnlocked(day, now)
  useEffect(() => { const timer = window.setInterval(() => setNow(new Date()), 60000); return () => window.clearInterval(timer) }, [])
  const updateProgress = (next: Progress) => { setProgress(next); const saved = saveProgress(next); if (!saved) setNotice('Impossibile salvare nel browser. I progressi potrebbero andare persi.'); return saved }
  useEffect(() => { const dialog = dialogRef.current; if (!dialog) return; if (overlay && !dialog.open) dialog.showModal(); if (!overlay && dialog.open) dialog.close() }, [overlay])
  const applyRoute = (next: Route) => {
    setRoute(next)
    if (next.view === 'giorno' && next.day !== null && canOpen(next.day)) {
      setSelected(next.day)
    }
  }
  useEffect(() => {
    const sync = () => { const next = parseRoute(window.location.hash); setRoute(next); if (next.view === 'giorno' && next.day !== null && ((import.meta.env.DEV && previewDays) || isUnlocked(next.day))) setSelected(next.day) }
    window.addEventListener('popstate', sync)
    window.addEventListener('hashchange', sync)
    return () => { window.removeEventListener('popstate', sync); window.removeEventListener('hashchange', sync) }
  }, [previewDays])
  const navigate = (next: Route) => {
    const hash = routeHash(next)
    if (window.location.hash !== hash) window.history.pushState(null, '', hash)
    applyRoute(next)
  }
  const setView = (view: View) => navigate(view === 'giorno' ? {view, day: selected && canOpen(selected) ? selected : currentDay(now)} : {view})
  const openDay = (day: number) => { if (!canOpen(day)) return; if (isUnlocked(day, now)) updateProgress({ ...progress, lastVisitedDay: day }); navigate({view:'giorno', day}) }
  const exportProgress = () => { const url = URL.createObjectURL(new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' })); const a = document.createElement('a'); a.href = url; a.download = 'linea24-progressi.json'; a.click(); URL.revokeObjectURL(url) }
  const importProgress = async (file: File | undefined) => {
    if (!file) return
    try { const parsed = parseProgress(await file.text()); if (!parsed) { setNotice('Backup non valido: nessun progresso è stato modificato.'); return } if (window.confirm('Sostituire i progressi attuali con quelli del backup?')) { const saved = updateProgress(parsed); setSelected(parsed.lastVisitedDay && isUnlocked(parsed.lastVisitedDay, now) ? parsed.lastVisitedDay : currentDay(now)); if (saved) setNotice('Backup importato.') } } catch { setNotice('Impossibile leggere il backup.') }
    finally { if (fileRef.current) fileRef.current.value = '' }
  }
  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>('link[rel=icon]')
    if (!link || !assetManifest.favicon) return
    link.href = assetManifest.favicon
    const fallback = () => { link.href = 'data:,' }
    link.addEventListener('error', fallback)
    return () => { link.removeEventListener('error', fallback); link.href = 'data:,' }
  }, [])
  const today = currentDay(now)
  const earned = earnedDays(days, progress).filter(day => isUnlocked(day.day, now))
  const completed = earned.map(day => day.day)
  const routeDay = route.view === 'giorno' ? route.day ?? selected ?? today : selected ?? today
  const selectedDay = days.find(day => day.day === routeDay)
  const background = view === 'calendario' ? assetManifest.calendar : view === 'diario' ? assetManifest.diary : selectedDay && canOpen(selectedDay.day) ? dayBackground(selectedDay.day) : null
  return <div className={background ? 'app has-backdrop' : 'app'} style={background ? { backgroundImage: `linear-gradient(var(--backdrop-veil), var(--backdrop-veil)), url(${JSON.stringify(background)})` } : undefined}>
    <header className="topbar"><div className="brand">{assetManifest.logoBanner && !bannerFailed ? <img className="brand-banner" src={assetManifest.logoBanner} alt="L’ultimo treno per Natale — La Linea 24" onError={() => setBannerFailed(true)}/> : <>{assetManifest.logo && !logoFailed ? <img className="brand-logo" src={assetManifest.logo} alt="" onError={() => setLogoFailed(true)}/> : <span className="brand-mark" aria-hidden="true">24</span>}<div><span className="eyebrow">L’ultimo treno per Natale</span><strong>La Linea 24</strong></div></>}</div><nav aria-label="Navigazione principale">{(['calendario', 'diario', 'giorno'] as View[]).map(item => <button key={item} className={view === item ? 'nav-active' : ''} aria-current={view === item ? 'page' : undefined} onClick={() => setView(item)}>{item[0].toUpperCase() + item.slice(1)}</button>)}</nav></header>
    <main>
      {view === 'calendario' && <>{import.meta.env.DEV && <div className="preview-toggle"><button type="button" aria-pressed={previewDays} onClick={() => setPreviewDays(!previewDays)}>{previewDays ? 'Disattiva prova calendario' : 'Prova: apri tutte le giornate'}</button><span>Solo sviluppo: le giornate in preparazione non sono giocabili.</span></div>}<div className="page-heading"><div><p className="eyebrow">Dicembre 2026 · 24 tappe</p><h1>Calendario</h1><p>Una porta al giorno, dal 1° al 24 dicembre. Le tappe già aperte restano accessibili.</p></div><div className="heading-note">Il viaggio prende forma<br/><strong>un giorno alla volta</strong></div></div>{assetManifest.calendarIllustration && !trainFailed && <img className="calendar-illustration" src={assetManifest.calendarIllustration} alt="Un treno d'inverno illuminato, con la scritta Linea 24" onError={() => setTrainFailed(true)}/>}<div className="calendar-grid">{days.map(({ day }) => { const unlocked = canOpen(day); const done = completed.includes(day); return <button className={'door ' + (done ? 'done' : unlocked ? 'open' : 'locked')} key={day} onClick={() => openDay(day)} disabled={!unlocked} aria-label={`${day} dicembre, ${done ? 'completato' : unlocked ? 'disponibile' : 'si apre il ' + day + ' dicembre 2026'}${today === day ? ', giorno corrente' : ''}`}><span className="door-top">{today === day ? 'GIORNO CORRENTE' : 'DICEMBRE'}</span><span className="door-number">{String(day).padStart(2, '0')}</span><span className="door-bottom">{done ? 'Completato' : unlocked ? 'Apri la tappa →' : `Dal ${day} dicembre`}</span></button> })}</div></>}
      {days.map(day => { const id = day.day; return canOpen(id) ? <section key={id} className="content-page" hidden={view !== 'giorno' || routeDay !== id}><p className="eyebrow">La Linea 24 &#183; Tappa</p><h1>Giorno {String(id).padStart(2, '0')}</h1><p className="lead">{id} dicembre 2026</p><DayPanel day={day} progress={progress} update={updateProgress} inventory={items} completedDays={completed}/><button className="secondary light-button" onClick={() => setView('calendario')}>Torna al calendario</button></section> : null })}
      {view === 'giorno' && (!selectedDay || !canOpen(selectedDay.day)) && <section className="content-page"><h1>Il tuo viaggio</h1><div className="paper"><h2>{selectedDay && !isUnlocked(selectedDay.day, now) ? `Questa tappa si apre il ${selectedDay.day} dicembre 2026` : 'La prima tappa si apre il 1\u00b0 dicembre 2026'}</h2><p>Puoi tornare al calendario per consultare le tappe disponibili.</p><button className="primary" onClick={() => setView('calendario')}>Vai al calendario</button></div></section>}
      {view === 'diario' && <Diary earned={earned} openDay={openDay}/>}
    </main>
    <footer className="site-footer">
      <div className="footer-brand">{assetManifest.logo && !logoFailed && <img src={assetManifest.logo} alt="" onError={() => setLogoFailed(true)}/>}<div><strong>La Linea 24</strong><p>L’ultimo treno per Natale</p>{creator && <p>Realizzato da {creator}</p>}</div></div>
      <button className="settings footer-settings" onClick={() => setOverlay('settings')}>Aiuto e backup</button>
    </footer>
    <button className="sack-button" onClick={() => setOverlay('sack')} aria-label="Apri sacchetto degli indizi">{assetManifest.sackIcon && !sackIconFailed ? <img className="sack-icon" src={assetManifest.sackIcon} alt="" onError={() => setSackIconFailed(true)}/> : <span className="sack-symbol" aria-hidden="true">◇</span>}</button>
    <dialog ref={dialogRef} className={overlay === 'sack' ? 'inventory-drawer' : undefined} aria-labelledby="overlay-title" onClose={() => setOverlay(null)} onClick={e => { if (e.target === e.currentTarget) setOverlay(null) }}><div className="dialog-header"><div><p className="eyebrow">La Linea 24</p><h2 id="overlay-title">{overlay === 'sack' ? 'Sacchetto degli indizi' : 'Aiuto e backup'}</h2></div><button className="close" onClick={() => setOverlay(null)} aria-label="Chiudi">×</button></div>{overlay === 'sack' ? <div className="dialog-body"><Inventory items={items} completed={completed}/></div> : <div className="dialog-body"><h3>Conserva i tuoi progressi</h3><p>I progressi sono salvati su questo browser. Puoi esportare un backup e importarlo su un altro dispositivo.</p><div className="actions"><button className="primary" onClick={exportProgress}>Esporta JSON</button><button className="secondary" onClick={() => fileRef.current?.click()}>Importa JSON</button><input ref={fileRef} hidden type="file" accept="application/json,.json" onChange={e => void importProgress(e.target.files?.[0])}/></div><p className="small">Le date seguono il calendario di Roma e l’orologio del dispositivo.</p><button className="text-button" onClick={() => { if (window.confirm('Cancellare tutti i progressi su questo browser?')) { const saved = updateProgress(emptyProgress()); setSelected(currentDay(now)); if (saved) setNotice('Progressi cancellati.') } }}>Cancella progressi</button></div>}{notice && <p className="notice" role="status">{notice}</p>}</dialog>
    {notice && !overlay && <p className="floating-notice" role="status">{notice}</p>}
  </div>
}
