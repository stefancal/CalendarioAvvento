import type { DayDefinition } from '../game/types'

const intro = `Dalla finestra della sala elettrica osservi la luce appena riapparsa oltre la neve. Appartiene a una bottega addossata alla vecchia stazione. Sopra la vetrina, un'insegna alterna lettere e simboli che non riesci a interpretare. La radio alle tue spalle è tornata silenziosa, ma il nome di Elia Vetro continua a risuonarti nella mente.

Risalendo la scala, senti sotto i piedi il lieve tremito della linea appena riattivata. Attraversi il corridoio e raggiungi l'uscita: l'aria gelida ti punge il viso, mentre la neve attenua ogni rumore. La porta della bottega è socchiusa. Sulle assi e sui vetri si è accumulata la polvere di molti anni, eppure una striscia di luce calda attraversa la soglia.

Prima ancora di entrare distingui una musica lontana, sottile come il tintinnio di un carillon. Appena spingi la porta, la melodia si interrompe. Rimani in ascolto, ma non senti passi né voci. Solo il piccolo campanello sopra l'ingresso continua a oscillare.

La stanza è gremita di giocattoli meccanici. Un cavallo di latta è fermo accanto a modellini ferroviari, rotaie in miniatura e scatole decorate con paesaggi invernali. Ingranaggi di tutte le dimensioni riposano su un panno, fra nastri sbiaditi e decorazioni natalizie. Un treno minuscolo sembra attendere il segnale di partenza su un binario circolare, interrotto proprio davanti al banco.

Lì trovi un foglio coperto da lettere che non formano parole riconoscibili. Poco distante, un manuale consunto spiega il metodo con cui il proprietario proteggeva i suoi messaggi. Fra le pagine è stato infilato un biglietto augurale: la carta è ingiallita, ma l'inchiostro dei versi è ancora nitido. Non sembra diverso da tanti auguri dimenticati in fondo a una scatola.

Sotto il banco, una fila di cassetti è chiusa. Le loro maniglie d'ottone sono fredde e sulle serrature rimangono tracce di dita nella polvere. Ripensi alla voce della radio e alla firma sul biglietto ferroviario. Forse Elia ha affidato a questa bottega qualcosa che non voleva lasciare in vista.

Avvicini i tre fogli alla lampada. Sul ripiano, il carillon resta immobile; fuori, oltre il vetro appannato, la neve continua a cadere senza fretta.`

const success = `Le lettere del messaggio trovano finalmente il loro posto. L'istruzione è chiara: aprire il terzo cassetto. Ti inginocchi davanti al banco e conti le maniglie, lasciando scorrere le dita sull'ottone freddo. Il terzo cassetto oppone una breve resistenza, poi si apre con un rumore secco.

All'interno, su un ritaglio di velluto ormai scolorito, riposa una piccola chiave d'ottone. Sulla testa è inciso il numero 24. Accanto trovi un frammento di carta piegato più volte; riconosci la calligrafia di Elia Vetro dalla firma sul biglietto ferroviario.

La nota è incompleta, ma alcune parole sono ancora leggibili: «C'era un modo per impedire che il treno scomparisse. Non potevo lasciarlo scritto dove altri avrebbero cercato». Il resto è stato strappato. Non sai se Elia sia riuscito a mettere in pratica quel piano, né a chi fosse destinato il messaggio. Le sue parole, però, aggiungono un'altra domanda a quelle rimaste senza risposta: il Controllore potrebbe averti nascosto informazioni importanti.

Riponi con cura la chiave nel sacchetto. Mentre richiudi il cassetto, il carillon ricomincia a suonare. Segui la melodia fino a una scatola sullo scaffale e la sollevi. Sotto la base è fissato un cartellino che indica un antico laboratorio di orologeria, poco distante dalla stazione. La musica prosegue alle tue spalle mentre ti prepari a cercarlo.`

export const day05: DayDefinition = {
  day: 5, status: 'ready', title: 'La bottega dei simboli', intro,
  documents: [
    {id: 'card', title: 'Biglietto augurale', fallbackText: true, text: `AUGURI DALLA BOTTEGA\n\nNella neve tace il sentiero,\nAnche il buio nasconde un mistero.\nTra gli abeti riposa una stella,\nAspetta la notte più bella.\nLungo i binari ritorna la luce,\nE il Natale ogni cuore conduce.\n\nIl vecchio bottegaio`},
    {id: 'manual', title: 'Manuale dei messaggi riservati', fallbackText: true, text: `BOTTEGA FERROVIARIA — MANUALE DEI MESSAGGI RISERVATI\nMetodo dell'alfabeto a chiave\n\n«Per proteggere un messaggio, si utilizza un secondo alfabeto, costruito a partire da una parola segreta.»\n\n«Scrivere per prima la parola chiave, conservando soltanto la prima comparsa di ogni lettera.»\n\n«Aggiungere poi, in ordine alfabetico, tutte le lettere non ancora utilizzate.»\n\n«Allineare il nuovo alfabeto a quello ordinario. Ogni lettera del messaggio viene sostituita dalla corrispondente lettera del nuovo alfabeto.»\n\n«Per leggere un messaggio protetto, percorrere la corrispondenza in senso inverso.»\n\nALFABETO ORDINARIO\nABCDEFGHIJKLMNOPQRSTUVWXYZ\n\nALFABETO A CHIAVE\n□ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □ □`},
    {id: 'message', title: 'Messaggio cifrato', fallbackText: true, text: `MESSAGGIO RISERVATO — LINEA 24\n\nNOQF FI SEQZM TNRRESSM\n\n«Soltanto chi conosce la chiave saprà dove cercare.»`},
  ],
  puzzle: {type:'text', label:'Istruzione decifrata', subtitle:'Quale istruzione è nascosta nel messaggio cifrato?', prompt:'Scrivi la frase completa.', normalization:{trim:true, caseInsensitive:true}, errorMessage:'Le lettere sembrano ricomporsi, ma il messaggio continua a sfuggirti. Forse la chiave non è ancora completa.', validate: value => value.replace(/\s+/g, ' ') === 'apri il terzo cassetto'},
  hintTitle: 'Le lettere del Natale',
  hint: `Sei parole aprono il cammino,
ma guarda dove nasce ogni righino.

Una chiave torna e si ripete,
tieni la prima, le altre son discrete.

Poi le lettere, in fila ordinata,
completan la strada già iniziata.

Se un segno indietro vuoi riportare,
dall'altro alfabeto devi tornare.`,
  success, diary:'', diarySections:[{type:'narration', text:intro}, {type:'narration', text:success}],
}
