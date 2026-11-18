import type { DayDefinition } from '../game/types'

export const day02: DayDefinition = {
  day: 2, status: 'ready', title: 'Il biglietto del passeggero inesistente',
  intro: `La porta del primo vagone si richiude alle tue spalle con un sospiro sommesso. Per un istante resti immobile, la mano ancora vicina alla maniglia d'ottone, mentre gli occhi si abituano alla luce.

Il corridoio sembra abbandonato da anni. Una sottile polvere vela le cornici e le tendine ricamate sono ferme contro i finestrini neri. Eppure l'aria è calda: sa di legno lucidato, carbone e scorza d'arancia. Sopra di te, piccole lampade color miele oscillano appena, come se il treno avesse già preso velocità. Guardi fuori. La banchina e i suoi lampioni non si sono mossi.

Sul pavimento, una fila di impronte di neve attraversa il tappeto. Le segui fino a una porta chiusa; prima di raggiungerla, però, le tracce s'interrompono. Non c'è neve sciolta oltre l'ultima impronta, né un'altra strada da cui il viaggiatore avrebbe potuto allontanarsi.

Un tavolino apparecchiato per una persona occupa l'angolo del vagone. Accanto a una tazza vuota trovi un registro degli orologi, un prospetto delle tratte e alcuni biglietti ferroviari. Le carte sono disposte con cura, come se qualcuno avesse previsto esattamente dove avresti posato lo sguardo. Una candela consumata getta sulle pagine un'ombra sottile, benché lo stoppino sia spento.

Sotto il registro sporge una nota: «Uno dei nostri passeggeri ha percorso una tratta impossibile». Nessuna firma, soltanto il segno di un guanto scuro sul bordo. Il Controllore deve aver lasciato i documenti apposta per te; non riesci a decidere se sia un invito o un avvertimento.

Dal fondo del vagone giunge un lieve tintinnio, simile a quello di una decorazione natalizia urtata dal vento. Ti volti, ma non vedi nessuno. Le lampade continuano a dondolare sopra il tavolino. Prendi posto e avvicini il primo foglio alla luce.`,
  documents: [
    { id: 'clocks', title: 'Registro degli orologi', fallbackText: true, description: 'Per le rilevazioni fanno fede gli orari scritti; le lancette illustrate sono decorative.', text: `LINEA 24 · REGISTRO DEGLI OROLOGI\nAnnotazioni di servizio\n\nAl segnale delle 21:00 a Valbruna, il quadrante di Pontebianco segna le 21:12.\n\nAl segnale delle 22:00 a Pontebianco, il quadrante di Selvaria segna le 21:53.\n\nAl segnale delle 23:00 a Selvaria, il quadrante di Capolinea Nord segna le 23:18.\n\nGli orari dei biglietti sono registrati secondo il quadrante locale di ciascuna stazione.` },
    { id: 'routes', title: 'Prospetto delle tratte', fallbackText: true, text: `LINEA 24 · PROSPETTO DELLE TRATTE\nTempi minimi di percorrenza\n\nValbruna → Pontebianco: 18 minuti\nPontebianco → Selvaria: 24 minuti\nSelvaria → Capolinea Nord: 16 minuti\n\nLe soste possono prolungare il viaggio. Nessuna tratta può essere percorsa in meno del tempo indicato; per attraversare più tratte si sommano i rispettivi tempi minimi.` },
    { id: 'tickets', title: 'Biglietti ritrovati', fallbackText: true, text: `LINEA 24 · BIGLIETTI RITROVATI\nOrari indicati dai quadranti locali\n\n041  Valbruna 21:00 → Pontebianco 21:34\n042  Pontebianco 21:40 → Selvaria 22:05\n043  Selvaria 22:10 → Capolinea Nord 22:49\n044  Valbruna 21:20 → Selvaria 22:08\n045  Pontebianco 22:00 → Capolinea Nord 22:53\n046  Valbruna 22:15 → Capolinea Nord 23:17` },
  ],
  puzzle: { type: 'numeric', label: 'Numero del biglietto a tre cifre', digits: 3, subtitle: 'Quale biglietto racconta un viaggio che non può essere avvenuto?', prompt: 'Inserisci il numero del biglietto.', validate: value => value === '046' },
  hintTitle: 'La filastrocca degli orologi',
  hint: `Quattro orologi, quattro stazioni,
segnano il tempo in mille direzioni.

Se due rintocchi insieme son nati,
non è detto che sian segnati uguali.

Rimetti ogni lancetta al suo posto,
poi conta il viaggio, qualunque sia il costo.

Ma se un treno corre più del possibile,
tra quei biglietti c'è un viaggio impossibile.`,
  success: `Il biglietto 046 rimane fra le tue dita. Gli altri viaggi concedono al treno il tempo necessario; questo no. Lo rigiri piano, aspettandoti di trovare il retro bianco come quello degli altri.

Una firma affiora sotto la luce: Elia Vetro.

Il nome ti sembra familiare, come una parola ascoltata tanto tempo fa e rimasta nascosta ai margini della memoria. Il Controllore non lo aveva mai menzionato. Ripieghi il biglietto con cautela e lo custodisci nel sacchetto, senza sapere ancora a chi appartenesse o perché qualcuno abbia voluto lasciarlo qui.

In fondo al vagone si accende una luce. La sua striscia dorata attraversa il corridoio e si ferma sulle impronte interrotte. Poi un altoparlante gracchia sopra la tua testa. Per alcuni secondi senti soltanto un fruscio; quindi una voce distante tenta un annuncio: «Attenzione… partenza… cancellata…».

Le ultime parole si dissolvono in un crepitio. Oltre la porta illuminata intravedi il bordo di un manifesto ferroviario. Ti alzi, mentre le lampade riprendono a oscillare sul treno immobile.`,
  diary: '',
}
if (day02.status === 'ready') day02.diarySections = [
  { type: 'narration', text: day02.intro },
  { type: 'narration', text: day02.success },
]
