import type { DayDefinition } from '../game/types'

export const day01: DayDefinition = {
  day: 1, status: 'ready', title: 'La convocazione impossibile',
  intro: `La lettera è arrivata questa mattina.

Nessun mittente. Nessun indirizzo di ritorno. Soltanto il tuo nome, scritto a mano su una busta ingiallita, e un sigillo di ceralacca rossa che raffigura una locomotiva.

All'interno, un invito tanto preciso quanto assurdo: presentarti alla vecchia stazione prima di mezzanotte.

La Linea 24.

Ricordi di averne sentito parlare, molti anni fa. Una ferrovia scomparsa nella notte della vigilia di Natale del 1976. Nessun annuncio ufficiale, nessuna spiegazione convincente. Soltanto un treno svanito nel nulla, insieme al suo macchinista.

Eppure, adesso sei qui.

La neve scricchiola sotto i tuoi passi. L'orologio sopra l'ingresso della stazione è fermo, ma dalla banchina arriva un rumore sommesso, regolare. Come il respiro di una macchina addormentata.

Oltre la nebbia, intravedi una locomotiva.

Le finestre dei vagoni emanano una luce calda. Non si scorge nessuno all'interno. E sulla fiancata, appena visibile sotto uno strato di ghiaccio, compare un numero dorato.

24.

Ti avvicini alla porta del primo vagone.

È chiusa.

Accanto alla maniglia, un piccolo tastierino di ottone attende quattro cifre.

Poi, dall'interno del treno, risuona un colpo secco.

Qualcuno — o qualcosa — sa che sei arrivata.`,
  documents: [
    { id: 'letter', title: 'Lettera del Controllore', text: 'Gentile viaggiatrice,\nla neBbia custodisce ancora ciò che la notte ha nascosto.\nIl tuo vIaggio comincia dove i vecchi orologi si fermarono.\nNessuNo ti attenderà sulla banchina.\nPortA con te il biglietto che troverai accluso.\nOsseRva con cura ogni traccia lasciata sulla carta.\nLa lInea ricorda chi sa ascoltare.\nIl Controllore', format: 'anomalies' },
    { id: 'ticket', title: 'Biglietto ferroviario', text: 'LINEA 24\nViaggio: 1 dicembre 2026\nDestinazione: ultimo treno per Natale\nBinario: —\nSerie: L24-0612\nTimbro originale: 24 dicembre 1976\nOgni lettera prende posto secondo il suo ordine nell’alfabeto.', format: 'ticket' },
    { id: 'register', title: 'Registro ferroviario del 1976', text: 'Trascrizioni di servizio · Sei posizioni per ogni parola. Le quattro caselle del sigillo riportano soltanto la cifra delle unità.\nSequenza | Scarto testa | Somma centro | Scarto coda | Totale | Sigillo\n3 · 8 · 4 · 7 · 12 · 2 | 5 | 11 | 10 | 36 | 5106\n9 · 2 · 11 · 6 · 3 · 8 | 7 | 17 | 5 | 39 | 7759\n4 · 15 · 2 · 9 · 19 · 5 | 11 | 11 | 14 | 54 | 1144\n12 · 1 · 8 · 4 · 7 · 20 | 11 | 12 | 13 | 52 | 1232', format: 'register' },
  ],
  puzzle: { type: 'numeric', label: 'Codice a quattro cifre', digits: 4, subtitle: 'Il tastierino del primo vagone', prompt: 'Inserisci il codice del tastierino.', validate: value => /^7593$/.test(value) },
  hintTitle: 'La conta del capostazione',
  hint: `Sei compagni lungo il binario,
quattro sigilli nel vecchio diario.

I primi due si guardan da lontano,
conta i passi che li separano.

Nel mezzo, due viaggiano vicini,
metti insieme i loro destini.

Gli ultimi due, prima del confine,
misura il tratto fra le loro linee.

Poi tutti e sei, senza lasciarne uno,
portano il peso del viaggio comune.

Ma il sigillo non vuole il numero intero:
tiene l'ultima cifra, e il resto è mistero.`,
  success: 'Il tastierino scatta e la porta si apre. Un fremito attraversa il treno; le luci pulsano come se si fosse appena svegliato. Sul gradino trovi una piccola tessera metallica incisa con il numero 24.',
  dialogue: [{ speaker: 'Il Controllore', text: 'Benvenuta a bordo. Ti stavamo aspettando.' }],
  diary: 'La sera del 1° dicembre una convocazione del Controllore mi ha condotta alla stazione abbandonata. Il mio biglietto, datato 2026, portava un timbro del 1976. Nella nebbia mi attendeva un treno illuminato e apparentemente vuoto. Ho esaminato la lettera e il registro, aperto il tastierino e trovato una tessera metallica con il numero 24. Il treno si è risvegliato e la voce del Controllore mi ha dato il benvenuto.',
}
