import type { DayDefinition } from '../game/types'

const intro = `«Attenzione… partenza… cancellata…»

L'annuncio torna a incrinare il silenzio del vagone. Ogni volta si interrompe nello stesso punto, come un disco che non riesce a oltrepassare un graffio. Lasci il tavolino e segui la striscia di luce fino alla porta in fondo al corridoio. Si apre con una lieve resistenza, lasciando entrare un odore di carta vecchia e ferro freddo.

Oltre la soglia trovi un piccolo ufficio ferroviario. Una lampada verde arde sulla scrivania, benché il resto della stanza sembri abbandonato da decenni. La polvere ricopre uno scaffale di timbri, i vetri sono appannati e una ghirlanda secca pende da un chiodo. Sotto la finestra, la neve ha disegnato un bordo sottile: non capisci da dove possa essere entrata.

Un grande orologio è fermo sopra l'archivio. Il pendolo non oscilla e le sue lancette sembrano trattenere un'ora che nessuno ha più voluto attraversare. Eppure, accanto al calamaio incrostato, una matita appena temperata ha lasciato sul legno riccioli chiari e fragranti. Qualcuno è stato qui molto più di recente di quanto il resto della stanza lasci credere.

Sul tavolo sono raccolti documenti relativi a cinque partenze. Il più grande è un manifesto del 24 dicembre 1976: le posizioni sono ancora visibili, ma i nomi sono stati cancellati con tanta cura da consumare la carta. Una legenda ne conserva le sigle. Nel registro del personale, alcune annotazioni sopravvissute sembrano custodire frammenti di quella stessa sera.

Fra le pagine trovi anche un foglio di servizio e una comunicazione attribuita al Controllore. Le prime registrazioni portano i segni del lavoro compiuto durante le partenze; una rettifica, aggiunta in seguito con inchiostro diverso, sembra contraddirle. Non è uno strappo casuale, né una macchia lasciata dal tempo: qualcuno potrebbe aver cambiato deliberatamente ciò che il manifesto raccontava.

L'altoparlante ripete ancora la parola «cancellata». Ti siedi sotto la lampada e avvicini i fogli, mentre alle tue spalle la neve preme contro il vetro scuro.`

const success = `Rimetti in ordine le cinque sigle: Vesper, Aurora, Brina, Cometa, Stella. Le annotazioni raccolte quella notte trovano finalmente posto una accanto all'altra. Anche la prima comunicazione conferma la successione degli ultimi due convogli; la rettifica attribuita al Controllore, invece, racconta qualcosa che non può essere accaduto insieme alle registrazioni originali.

Sollevando con cautela il bordo del manifesto, scopri sotto la carta una riga sbiadita. La grafia è inclinata e la firma, quasi svanita, sembra appartenere a Elia Vetro: «Alcune partenze dovevano essere cancellate per proteggerli». Non sai chi fossero le persone da proteggere, né perché quella frase sia stata nascosta proprio lì.

Ripensi al biglietto trovato nel vagone e alla rettifica. Il Controllore ha preparato per te una pista, ma ora almeno una delle sue parole non coincide con ciò che è stato registrato quella notte. Prima di decidere cosa significhi, cerchi di leggere il resto dell'annotazione.

La lampada si spegne di colpo. Nel buio senti il legno contrarsi e, subito dopo, una serie di scatti metallici provenire da dietro una porta chiusa. Sembrano interruttori azionati uno dopo l'altro. L'altoparlante tace. Ti avvicini alla porta, guidata soltanto da un filo di luce sotto la soglia.`

export const day03: DayDefinition = {
  day: 3, status: 'ready', title: 'La partenza cancellata', intro,
  documents: [
    { id: 'board', title: 'Manifesto delle partenze', fallbackText: true, text: `LINEA 24 — MANIFESTO DELLE PARTENZE\n24 dicembre 1976\n\nOrdine delle partenze\nI     — cancellato —\nII    — cancellato —\nIII   — cancellato —\nIV    — cancellato —\nV     — cancellato —\n\nLegenda dei convogli\nV · Vesper\nA · Aurora\nB · Brina\nC · Cometa\nS · Stella\n\nLa sequenza originale è andata perduta.` },
    { id: 'register', title: 'Registro del personale', fallbackText: true, text: `REGISTRO DI SERVIZIO — ANNOTAZIONI\nRegistrazioni compilate durante il servizio del 24 dicembre 1976\n\nAnnotazione 17\n«Il Vesper lasciò la linea prima che l'Aurora ricevesse il segnale di partenza.»\n\nAnnotazione 18\n«Aurora e Brina partirono consecutivamente, senza altri convogli fra loro. L'Aurora precedette il Brina.»\n\nAnnotazione 19\n«Quando il Brina aveva già lasciato la stazione, il Cometa attendeva ancora il proprio turno.»` },
    { id: 'notice', title: 'Comunicazioni del Controllore', fallbackText: true, text: `LINEA 24 — COMUNICAZIONI\n\nComunicazione di servizio · registrazione originale del 24 dicembre 1976\n«Il convoglio Cometa fu seguito immediatamente dallo Stella. Nessun'altra partenza ebbe luogo fra i due.»\n\nRettifica successiva · aggiunta dopo il servizio\n«Per ordine del Controllore, si certifica che il convoglio Stella precedette Cometa nell'ordine delle partenze.»` },
  ],
  puzzle: { type: 'text', label: 'Sigle delle cinque partenze', maxLength: 5, normalization: { caseInsensitive: true }, subtitle: 'Qual era l’ordine originale delle cinque partenze?', prompt: 'Inserisci le sigle dei convogli dalla prima all’ultima.', errorMessage: 'Il manifesto resta immobile. Qualcosa, nell’ordine delle partenze, non coincide ancora.', validate: value => value === 'vabcs' },
  hintTitle: 'La filastrocca delle partenze',
  hint: `Cinque treni nella notte,
cinque partenze ormai interrotte.

C'è chi precede e chi vien dopo,
ma non ogni parola è al suo posto.

Se due convogli son vicini,
non separarne i destini.

Una voce ha cambiato versione,
ma il passato non cambia direzione.

Segui le tracce lasciate allora,
non chi riscrive la storia ancora.`,
  success, diary: '', diarySections: [{ type: 'narration', text: intro }, { type: 'narration', text: success }],
}
