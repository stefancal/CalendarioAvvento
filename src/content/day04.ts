import type { DayDefinition } from '../game/types'
import { validateCircuit } from './day04Circuit'

const intro = `Il buio inghiotte l'ufficio del capostazione. Per un istante resti ferma accanto al manifesto, con la frase di Elia ancora davanti agli occhi e la lampada ormai spenta. Dietro la porta di servizio un rumore metallico si ripete: uno scatto, una pausa, poi altri due, più lontani.

Accendi una piccola luce e la tieni davanti a te. Il fascio attraversa la polvere sospesa, trova la maniglia e scopre un corridoio stretto, rivestito di legno scuro. L'aria è più fredda qui. Oltre un vetro appannato, la neve cade lenta sulla banchina deserta; il treno non sembra essersi mosso.

Il rumore proviene dal fondo. Una scala di ferro scende verso un locale sottostante e ogni gradino risponde al tuo passo con un gemito leggero. Sulla ringhiera qualcuno ha legato, molto tempo fa, una piccola stella natalizia. La vernice dorata è consumata, ma un angolo cattura ancora la luce.

In fondo alla scala trovi la sala elettrica. Fasci di cavi corrono lungo le pareti; vecchi strumenti, coperti di polvere, aspettano sopra mensole di rame ossidato. L'odore è quello del metallo freddo e della carta rimasta chiusa troppo a lungo. Dal soffitto pende una lampadina spenta.

Un quadro domina la parete opposta. Otto interruttori, segnati dalla A alla H, emergono da una piastra scura. Una targhetta di ottone reca poche parole: «Alimentazione della linea ferroviaria». Alcuni fili sono stati rimossi e rimessi in posizioni diverse; vicino ai morsetti riconosci il segno di un guanto scuro. Il Controllore sembra aver manomesso i collegamenti, anche se non riesci a capire quando o perché.

Su uno sgabello sono rimasti un registro di manutenzione e una scheda tecnica. Qualcuno li ha lasciati aperti, lontano dalla polvere più fitta. Le annotazioni descrivono il funzionamento dei contatti originali: senza ricostruire quella configurazione, il quadro non potrà alimentare la linea.

Posi la luce accanto ai fogli. Dall'alto non arriva più l'annuncio; nel silenzio senti soltanto il vento contro la finestra e il lieve ticchettio di un relè in attesa.`

const success = `Abbassi l'ultima leva e attivi il circuito. Per un momento non accade nulla; poi un relè risponde con uno scatto netto. Le spie prendono luce una dopo l'altra e un chiarore caldo attraversa la sala elettrica. La lampadina sul soffitto si accende, rivelando il rame ossidato e la stella dimenticata sulla scala.

Il treno emette un lungo rumore metallico, come se qualcosa di immenso avesse ripreso a respirare. Sopra uno scaffale, una vecchia radio ferroviaria si accende all'improvviso. La manopola vibra e dall'altoparlante esce un fruscio, seguito da una registrazione frammentata.

Una voce maschile emerge tra le scariche: «Elia Vetro… stava cercando di impedirlo… non lasciate che…». Il resto si perde in un'interferenza. Resti in ascolto, ma la frase non si ripete; non sai ancora chi abbia parlato né che cosa Elia volesse fermare. È abbastanza, però, per mettere in dubbio l'idea che cercasse soltanto di provocare la scomparsa del treno.

Una luce si accende oltre la finestra. Attraverso i fiocchi distingui l'insegna di un'antica bottega ferroviaria: alcune lettere si alternano a simboli che non riconosci. La radio tace. Prendi la tua piccola luce e torni verso la scala, mentre l'insegna continua a brillare nella neve.`

export const day04: DayDefinition = {
  day: 4, status: 'ready', title: 'La stanza degli otto interruttori', intro,
  documents: [
    {id: 'circuit', title: 'Scheda tecnica del circuito', fallbackText: true, text: `LINEA 24 — SCHEMA DI ALIMENTAZIONE\nQuadro ausiliario · Modello VIII\n\nBilanciamento generale\n«Il circuito richiede quattro contatti attivi su otto.»\n\nAlimentazione principale\n«A e B non possono condividere lo stesso stato.»\n\nRelè gemello\n«C segue sempre A.»\n\nCircuito di riserva\n«D lavora in opposizione a C.»\n\nDerivazione secondaria\n«E ripete lo stato di B.»`},
    {id: 'maintenance', title: 'Registro di manutenzione', fallbackText: true, description: 'Precisazione del registro: quando A e F sono entrambi alimentati, anche G si attiva.', text: `REGISTRO DI MANUTENZIONE — LINEA 24\n24 dicembre 1976\n\nAnnotazione 21\n«Il contatto F compensa sempre la derivazione E: quando uno è attivo, l'altro deve riposare.»\n\nAnnotazione 22\n«Il contatto di sicurezza G si attiva soltanto quando A e F sono entrambi alimentati; se uno dei due è spento, G deve restare spento.» Quando A e F sono entrambi alimentati, G si attiva.\n\nAnnotazione 23\n«La spia H lavora sempre in opposizione al contatto G.»\n\nAnnotazione 24\n«Per evitare il surriscaldamento, B e H non devono mai risultare alimentati contemporaneamente.»`},
  ],
  puzzle: {type: 'switches', labels: ['A','B','C','D','E','F','G','H'], subtitle: 'Ricostruisci il circuito originale e riporta la corrente sulla Linea 24.', prompt: 'Regola le leve seguendo i documenti.', errorMessage: 'Un relè scatta nel buio, ma la corrente non raggiunge il quadro principale. La configurazione non è ancora corretta.', validate: validateCircuit},
  hintTitle: 'La danza dei relè',
  hint: `Otto leve nella notte,
quattro accese, quattro interrotte.

Se una segue la compagna,
l'altra il passo non guadagna.

C'è chi vive per contrasto,
chi ripete il gesto esatto.

Due correnti fan la guardia,
una terza non ritarda.

Ma se il calore sale ancora,
due luci insieme restan fuori allora.`,
  success, diary: '', diarySections: [{type:'narration', text:intro}, {type:'narration', text:success}],
}
