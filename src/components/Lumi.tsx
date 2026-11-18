import { useEffect, useRef, useState } from 'react'
import { assetManifest } from '../content/assets'
import { revealHint } from '../game/engine'
import type { Progress } from '../game/progress'
import type { DayDefinition } from '../game/types'

export function Lumi({day, progress, update}: {day: DayDefinition; progress: Progress; update: (progress: Progress) => void}) {
  const [open, setOpen] = useState(false)
  const [listening, setListening] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const hint = day.status === 'ready' ? day.hint : undefined
  const title = day.status === 'ready' ? day.hintTitle : undefined

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    const triggerButton = trigger.current
    document.body.style.overflow = 'hidden'
    dialog.current?.showModal()
    return () => { document.body.style.overflow = previousOverflow; triggerButton?.focus() }
  }, [open])

  const close = () => dialog.current?.close()
  return <>
    <button ref={trigger} className="lumi-button" type="button" aria-label="Parla con Lumi" title="Parla con Lumi" onClick={() => { setListening(false); setOpen(true) }}>
      {assetManifest.lumi && !imageFailed ? <img src={assetManifest.lumi} alt="" onError={() => setImageFailed(true)}/> : <svg className="lumi-fallback" viewBox="0 0 64 80" aria-hidden="true"><path d="M23 17v-5a9 9 0 0 1 18 0v5M18 20h28l-4 8H22zm4 8h20l5 33H17zm-6 33h32v6H16z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/><path d="M32 33c-7 8-6 18 0 22 6-4 7-14 0-22z" fill="currentColor"/></svg>}
    </button>
    {open && <dialog ref={dialog} className="lumi-dialog" aria-labelledby="lumi-title" onClose={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) close() }}>
      <div className="lumi-header"><div className="lumi-portrait" aria-hidden="true">{assetManifest.lumi && !imageFailed ? <img src={assetManifest.lumi} alt="" onError={() => setImageFailed(true)}/> : <span>✦</span>}</div><div className="lumi-heading"><p>La lanterna della Linea 24</p><h2 id="lumi-title">Lumi</h2></div><button className="close" type="button" aria-label="Chiudi Lumi" onClick={close}>×</button></div>
      <div className="lumi-body">
        {!listening ? <><p className="lumi-verse">{'Son Lumi, lanterna del vecchio binario,\nla Linea 24 rischiaro nel mio diario.'}</p>{hint ? <><p className="lumi-verse">{'Se un piccolo aiuto vorrai ascoltare,\nuna rima segreta potrò sussurrare.'}</p><div className="actions"><button className="primary" type="button" onClick={() => { update(revealHint(progress, day)); setListening(true) }}>Sì, ascolto</button><button className="secondary" type="button" onClick={close}>Non ancora</button></div></> : <p className="lumi-verse">{'Non ho una rima per questa stazione,\nprosegui il viaggio con attenzione.'}</p>}</> : <>{title && <h3>{title}</h3>}<p className="lumi-verse lumi-hint">{hint}</p></>}
      </div>
    </dialog>}
  </>
}
