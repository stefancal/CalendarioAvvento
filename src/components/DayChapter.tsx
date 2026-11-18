import { useState } from 'react'

import { assetManifest } from '../content/assets'

export function ChapterHeader({day, title}: {day: number; title?: string}) {
  const number = String(day).padStart(2, '0')
  return <header className="day-header"><p className="day-kicker">La Linea 24 · Tappa {number}</p><h1>Giorno {number}</h1><div className="day-ornament" aria-hidden="true"><span>◇</span></div>{title && <h2>{title}</h2>}<p className="day-date"><time dateTime={`2026-12-${number}`}>{day} dicembre 2026</time></p></header>
}

export function DayScene({day}: {day: number}) {
  const [failed, setFailed] = useState(false)
  const number = String(day).padStart(2, '0')
  const src = assetManifest.scenes?.[day] ?? `${import.meta.env.BASE_URL}assets/days/day-${number}/scene.png`
  return <div className="day-scene" aria-hidden="true">{!failed && <img src={src} alt="" loading="lazy" onError={() => setFailed(true)}/>}</div>
}

export function StoryChapter({text}: {text: string}) {
  return <div className="story-chapter">{text.split(/\n\s*\n/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
}
