# L’ultimo treno per Natale — La Linea 24

Shell della Fase A: calendario, navigazione, diario e sacchetto, con sblocco per data nel fuso Europe/Rome e progressi locali. Tutti i 24 giorni sono bozze non giocabili: non ci sono enigmi, storie o ricompense completati. La veste grafica è temporanea.

## Avvio e verifiche

Richiede Node.js 22.13 o successivo della serie 22; per Cloudflare Pages configurare `NODE_VERSION=22.17.0`.

```sh
npm install
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
```

## Cloudflare Pages

Collegare il repository a Cloudflare Pages come sito statico. Comando di build: `npm run build`; directory di output: `dist`. Nessun servizio esterno è necessario a runtime.

I progressi sono salvati nel browser, se localStorage è disponibile. Esporta un backup JSON dalle impostazioni; l’importazione sostituisce i progressi dopo conferma. Non c’è sincronizzazione tra dispositivi. Il blocco per data usa l?orologio del dispositivo e non protegge contenuti o risposte da utenti tecnici.

## Da completare

Restano da realizzare contenuti verificati e immagini approvate per tutti i giorni; nessun giorno è pronto per la consegna.

## Motore e fixture di sviluppo

Le definizioni tipizzate di giorni e oggetti sono separate dalla logica. Tutti i giorni canonici sono bozze: nessuno è giocabile. In `npm run dev` compare un laboratorio non canonico con tre prove e un oggetto, utile per verificare completamenti fuori ordine, indizio, diario e stati dell’inventario. I suoi progressi sono temporanei e separati dal salvataggio canonico; il modulo è escluso dalla build di produzione. I contenuti, le immagini e i puzzle finali restano da realizzare.

## Componenti degli enigmi

Le definizioni pronte possono configurare un input testo/codice, più campi o otto interruttori, con un validatore tipizzato. Una griglia di appunti facoltativa è indipendente dalla risposta e non viene salvata. Il laboratorio di sviluppo mostra esempi non canonici; nessuno dei 24 giorni è pronto. Verificare il layout e il comportamento dei dialoghi su iPad Safari prima della consegna.

L’app non installa service worker: senza connessione, dopo il primo caricamento, il funzionamento e il refresh dipendono dalla cache del browser e non sono garantiti. I collegamenti alle tappe usano indirizzi come `#/day/01`; il refresh riapre la tappa se già sbloccata. Gli input non inviati si conservano durante la navigazione nella pagina, ma non dopo il refresh; i progressi salvati rimangono disponibili.
