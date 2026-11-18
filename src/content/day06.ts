import type { DayDefinition } from '../game/types'

const entrance = `La porta è chiusa. Nella serratura riconosci il piccolo numero 24 e provi la chiave d'ottone trovata nella bottega. Gira con una resistenza lieve, poi un clic attraversa il legno. Spingi la porta ed entri.`
const alternativeEntrance = `La porta è chiusa. Nella serratura riconosci il piccolo numero 24: forse nella bottega c'è qualcosa che potrebbe aprirla. Mentre la esamini, la porta cede appena e scopri che la serratura non era scattata. La spingi ed entri.`
const intro = `Lasci la bottega seguendo l'indicazione nascosta sotto il carillon. La neve cade silenziosamente sulla stazione, velando le impronte che hai lasciato poco prima. Il cartellino ti guida lungo un passaggio riparato, fino a una finestra illuminata e a una targa di ottone: laboratorio di orologeria ferroviaria.

${entrance}

L'aria sa di olio, metallo e legno vecchio. Centinaia di orologi occupano le pareti, gli scaffali e ogni angolo libero: pendoli, sveglie, piccole casse smaltate. Fra loro riposano ingranaggi, lenti e strumenti di precisione, disposti con la cura di chi intendeva tornare al lavoro dopo una breve pausa. Nessun pendolo oscilla. Tutti gli orologi a parete sono fermi sulle 23:24.

Una luce calda cade sul banco. Vi sono allineati cinque orologi da tasca, ciascuno contrassegnato da un numero. Le casse hanno forme diverse e mostrano i segni di mani che le hanno portate a lungo. Non c'è nulla, a prima vista, che distingua uno degli esemplari dagli altri; le lancette sembrano custodire soltanto il silenzio della stanza.

Accanto agli strumenti trovi un registro delle visite del 24 dicembre 1976. Cinque clienti passarono dal laboratorio quella sera, in momenti diversi. Ognuno consegnò un oggetto e l'orologiaio associò ciascun oggetto a uno degli orologi numerati. Le righe del registro sono incomplete, ma un foglio di annotazioni conserva frammenti del lavoro svolto.

In fondo al fascicolo una nota attira la tua attenzione: uno degli oggetti era una lettera affidata all'orologiaio da Elia Vetro. Non dice quale orologio le sia stato associato. Passi lo sguardo dalle cinque casse ai fogli, cercando un ordine fra nomi, orari e oggetti.

Dietro i vetri la neve continua a cadere. Sul banco una molla si contrae con un suono quasi impercettibile; nessuno degli orologi alle pareti si muove. Avvicini il registro alla lampada e inizi a leggere.`

const success = `Il numero 37 occupa finalmente il suo posto nel registro, accanto alla visita in cui fu consegnata la lettera. Prendi l'orologio dal banco: è più pesante di quanto sembri e il metallo conserva un poco del calore della lampada. Quando lo volti, una sottile scanalatura compare vicino al bordo della cassa.

La sfiori con l'unghia. Un piccolo meccanismo nascosto si sblocca con uno scatto e il fondo si solleva appena. All'interno, ripiegata con estrema cura, trovi una minuscola fotografia. La apri senza forzare la carta: mostra Elia Vetro accanto a un'altra figura. Il volto di quest'ultima è stato cancellato con tanta precisione da lasciare intatto tutto ciò che lo circonda.

Sul retro, una frase scritta a mano termina a metà: «Sapevamo che il treno sarebbe scomparso, ma se riusciremo a…». Non c'è una firma. Qualcuno conosceva dunque in anticipo ciò che sarebbe accaduto, o almeno temeva che potesse accadere. Ti chiedi quanto il Controllore sappia di quella fotografia e perché la sua versione abbia lasciato fuori dettagli tanto importanti.

Un rumore interrompe la lettura. Proviene dal fondo del laboratorio, dietro una parete di scaffali. Un pannello si sposta lentamente, liberando un passaggio stretto. Al di là intravedi un archivio ferroviario: file di fascicoli, fotografie e vecchie registrazioni si perdono nell'ombra.

Ripieghi la fotografia e la rimetti al sicuro nell'orologio. Poi ti avvicini all'apertura, mentre gli orologi alle pareti continuano a segnare la stessa ora immobile.`

export const day06: DayDefinition = {
  day:6, status:'ready', title:'Il segreto delle cinque lancette', intro,
  introWithoutRequiredItems: intro.replace(entrance, alternativeEntrance),
  requiredItems:[{itemId:'key-24', missingMessage:'La serratura porta il numero 24. Nella bottega potrebbe esserci una chiave da recuperare.'}],
  documents:[
    {id:'clocks', title:'I cinque orologi', fallbackText:true, text:`LABORATORIO DI OROLOGERIA — REGISTRO DEI SEGNATEMPO\nCinque esemplari custoditi · 24 dicembre 1976\n\nNumeri identificativi: 11 · 23 · 37 · 42 · 58\n\nI numeri identificano gli orologi e non rappresentano gli orari delle visite.`},
    {id:'register', title:'Registro delle visite', fallbackText:true, text:`REGISTRO DELLE VISITE — 24 DICEMBRE 1976\n\nOrario | Cliente | Oggetto | Orologio\n20:00 | — | — | —\n20:15 | — | — | —\n20:30 | — | — | —\n20:45 | — | — | —\n21:00 | — | — | —\n\nClienti: Ada, Bruno, Clara, Dario, Ester.\nOggetti: Bussola, Chiave, Lettera, Fotografia, Carillon.\nOrologi: 11, 23, 37, 42, 58.\n\nOgni cliente consegnò un solo oggetto e ricevette un solo orologio. Nessun nome, oggetto o numero compare due volte. «Prima» e «dopo» indicano una precedenza; «immediatamente dopo» indica la visita successiva.`},
    {id:'note1', title:'Appunti dell’orologiaio — pagina 1', fallbackText:true, text:`APPUNTI DELL'OROLOGIAIO\nAnnotazioni recuperate dal laboratorio\n\nLE VISITE\n\n1. Clara arrivò dopo Ester.\n2. Dario era già passato quando Ester varcò la soglia.\n3. Bruno entrò immediatamente dopo Clara: si incrociarono sulla porta.\n4. Ada arrivò più tardi di Ester.\n\nGLI OGGETTI\n\n5. La lettera fu consegnata da Clara.\n6. La chiave arrivò nella visita immediatamente successiva a quella della bussola.\n7. La fotografia fu consegnata immediatamente dopo la lettera.\n8. Il carillon arrivò dopo la fotografia.`},
    {id:'note2', title:'Appunti dell’orologiaio — pagina 2', fallbackText:true, text:`APPUNTI DELL'OROLOGIAIO\nAnnotazioni recuperate dal laboratorio\n\nI SEGNATEMPO\n\n9. L'orologio numero 11 fu assegnato nella visita immediatamente successiva a quella del numero 42.\n\n10. Il numero 58 fu assegnato immediatamente dopo il numero 37.\n\n11. Il numero 23 venne assegnato dopo il numero 58.\n\n12. L'orologio numero 37 fu assegnato a uno dei clienti che arrivò dopo Dario, ma prima di Ada.`},
  ],
  puzzle:{type:'numeric', label:'Numero dell’orologio a due cifre', digits:2, subtitle:'Qual è il numero dell’orologio associato alla lettera affidata da Elia Vetro?', prompt:'Inserisci il numero identificativo.', errorMessage:'Le lancette restano immobili. Qualche dettaglio del registro non coincide ancora.', successMessage:'Un lieve scatto rompe il silenzio. Il meccanismo dell’orologio si è finalmente sbloccato.', validate: value => value === '37'},
  hintTitle:'Il valzer delle lancette', hint:`Cinque visite, cinque ore,
ogni tic nasconde un nome.

Chi vien prima lascia un segno,
chi lo segue trova il pegno.

Se due passi son vicini,
non dividerne i destini.

Ogni cosa ha un solo posto,
anche ciò che resta nascosto.

Tra le righe cerca il filo,
e il mistero sarà meno sottile.`,
  success, diary:'', diarySections:[{type:'narration',text:intro.replace(entrance, 'La porta del laboratorio porta il numero 24. La oltrepassi e osservi la stanza.')}, {type:'narration',text:success}],
}
