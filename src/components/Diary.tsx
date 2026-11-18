import { useState } from 'react'
import { assetManifest } from '../content/assets'
import type { DayDefinition } from '../game/types'

type ReadyDay = Extract<DayDefinition, {status:'ready'}>
function ChapterIllustration({day}: {day:number}) {
  const [failed, setFailed] = useState(false)
  const illustration = assetManifest.diaryIllustrations?.[day]
  if (!illustration || failed) return null
  return <figure className="diary-illustration"><img src={illustration.src} alt={illustration.alt} loading="lazy" onError={() => setFailed(true)}/></figure>
}
function Chapter({day, openDay}: {day:ReadyDay; openDay:(day:number) => void}) {
  const date = String(day.day).padStart(2, '0')
  return <article className="diary-page diary-chapter"><header className="diary-page-header"><div><span className="diary-kicker">Diario di viaggio</span><p className="diary-date"><time dateTime={`2026-12-${date}`}>{date} dicembre 2026</time></p></div><span className="diary-page-number" aria-hidden="true">{date}</span></header><h2>{day.title}</h2><div className="diary-rule" aria-hidden="true"/><ChapterIllustration day={day.day}/><div className="diary-prose">{day.diarySections?.length ? day.diarySections.map((section,index) => section.type === 'narration' ? <p key={index}>{section.text}</p> : <blockquote className="diary-dialogue" key={index}><p>{section.text}</p><cite>{section.speaker}</cite></blockquote>) : <p>{day.diary}</p>}</div><button className="diary-return" onClick={() => openDay(day.day)}>Riapri la tappa <span aria-hidden="true">→</span></button></article>
}
export function Diary({earned, openDay}: {earned:DayDefinition[]; openDay:(day:number) => void}) {
  return <section className="diary-view"><div className="diary-heading"><p className="eyebrow">Le pagine del viaggio</p><h1>Diario</h1><p>Le storie delle tappe completate, custodite in ordine di viaggio.</p></div><div className="diary-book"><div className="diary-book-edge" aria-hidden="true"/><div className="diary-pages">{earned.length ? earned.map(day => day.status === 'ready' && <Chapter key={day.day} day={day} openDay={openDay}/>) : <article className="diary-page diary-empty"><div className="diary-empty-top"><span className="diary-kicker">La Linea 24</span><span className="diary-empty-mark" aria-hidden="true">24</span></div><div className="diary-empty-body"><p className="diary-empty-label">Diario di viaggio</p><h2>Le pagine sono ancora vuote</h2><p>Le storie delle tappe completate troveranno posto qui.</p></div><div className="diary-empty-lines" aria-hidden="true"/></article>}</div></div></section>
}
