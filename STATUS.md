# Aggiornamento — prototipo giorno 1

Il giorno 1 è giocabile nel calendario con tre documenti, codice, indizio, diario e tessera persistenti. In sviluppo il pulsante «Prova: apri tutte le giornate» consente l’accesso prima della data; in produzione resta il normale sblocco. Il registro è una proposta da sottoporre ad approvazione, non ancora canonica: regola e limiti sono in `docs/puzzles/DAY-01.md`. Gli altri giorni rimangono draft. La stazione innevata non è disponibile. È necessaria una prova su iPad Safari e un playtest della deducibilità.

# Stato del progetto — 18 novembre 2026

La base tecnica è disponibile per l'inserimento dei contenuti; **il regalo non è pronto**. Tutti i 24 giorni canonici sono `draft` e non giocabili.

## Funzionalità implementate

- Calendario con 24 date in `Europe/Rome`, giorni precedenti accessibili e giorni futuri disabilitati; nessun requisito di completamento delle tappe precedenti.
- Navigazione Calendario/Giorno/Diario, sacchetto e pannello di backup. Il diario mostra solo contenuti pronti, completati e sbloccati per data.
- Collegamenti stabili alle tappe `#/day/01` … `#/day/24`, compatibili con hosting statico, con controllo della data anche all'apertura diretta e nella cronologia. Gli input in corso restano in memoria passando tra viste e aprendo il sacchetto; non sono salvati dopo il refresh.
- Stato locale versione 1 con validazione, recupero da dati corrotti, esportazione/importazione JSON con conferma e segnalazione dei fallimenti di scrittura.
- Validatori e widget per testo, più campi e otto interruttori; tentativi illimitati, un indizio facoltativo, visualizzatore documenti e griglia di appunti temporanea.
- Registro `authoredDays` per definizioni tipizzate: le 24 voci restano draft quando non è presente contenuto pronto. I requisiti di oggetti possono mostrare messaggi configurati senza bloccare la giornata o concedere ricompense; la schermata di successo mostra gli oggetti assegnati dal registro. Procedura di authoring in `docs/CONTENT-AUTHORING.md`.
- Inventario derivato dai completamenti: non trovato, disponibile e utilizzato. Il registro canonico degli oggetti è ancora vuoto.
- Fixture non canonica solo in sviluppo, con progressi temporanei separati; assente dalla build di produzione.
- Manifest grafico centralizzato in `src/content/assets.ts`: logo, icona del sacchetto, favicon, illustrazione e sfondi del calendario, sfondi del diario, dei capitoli e dei singoli giorni, documenti e immagini degli oggetti. Sono collegate le immagini del treno e del sacchetto fornite dall'utente; gli altri slot restano vuoti. Percorsi e formati sono descritti in `docs/ASSET-GUIDE.md`. L'interfaccia usa token CSS provvisori coerenti con la direzione vintage indicata.
- L'interfaccia usa finiture CSS ispirate a carta, legno e ottone, con porte ad arco e fallback senza immagini. La stazione innevata non è presente nella repository: lo sfondo del primo capitolo è configurabile nel manifest quando il file sarà disponibile.

## Verifiche eseguite

- Audit finale: `npm run lint`, `npm run typecheck`, `npm run test` e `npm run build` superati; 30 test in 6 file. La checklist completa, con limiti e attività residue, è in `CHECKLIST-FINALE.md`.
- Test automatici: confini di mezzanotte per tutte le date, validatori, completamento, indizio, inventario anche fuori ordine, errori di storage, importazione, esportazione, ricaricamento dello stato, blocco futuro, diario, widget e fallback immagine. Un test di integrazione verifica risposta errata, acquisizione dopo risposta corretta e ripristino di stato, diario e sacchetto dopo un nuovo montaggio. I test di interfaccia usano DOM simulato, non un browser reale.
- Anteprima HTTP locale della build: pagina principale e asset JavaScript rispondono 200. Ricerca nella build: fixture di sviluppo assente.
- Dipendenze dirette esaminate; `npm audit --omit=dev` non segnala vulnerabilità. L'audit completo segnala 12 vulnerabilità alte nella catena di sviluppo; la correzione proposta coinvolge anche cambi di versione principali e richiede valutazione e nuove verifiche.

## Problemi corretti

- Diario e stato visibile dell'inventario non mostrano completamenti con data futura quando l'orologio del dispositivo è precedente.
- Il pulsante Giorno usa il giorno corrente quando l'app è rimasta aperta fino allo sblocco e non è stata ancora selezionata una tappa; date fuori dall'intervallo 1–24 vengono rifiutate.
- Aggiunti nomi accessibili ai dialoghi, indicatore di focus per campi e sezioni espandibili e disposizione a una colonna in orientamento verticale.
- Ripristinati alcuni caratteri danneggiati nell'interfaccia e nel README; precisati versione Node e limiti di cache/refresh.
- Sfondi separati dai documenti e protetti da un velo scuro; fallback per risorse assenti e desaturazione CSS dell'oggetto usato anche nel dettaglio.

## Problemi aperti e funzionalità mancanti

- Non è stato possibile eseguire una verifica in un browser reale: il servizio browser dell'ambiente non era disponibile. Focus, dimensioni effettive, scorrimento, export/import e responsive restano da verificare su iPad Safari.
- Tutti i 24 enigmi, documenti, testi, dialoghi, indizi e ricompense devono essere scritti, approvati e verificati; mancano anche le immagini e l'identità visiva definitiva. I dati provvisori non sono contenuti pronti.
- Dopo l'inserimento delle immagini definitive, controllare sul dispositivo il contrasto effettivo e il ritaglio degli sfondi nei due orientamenti; non è stata effettuata una verifica visiva con asset reali.
- L'app non installa service worker. Dopo un primo caricamento, eventuale funzionamento senza rete e refresh dipendono dalla cache del browser e non sono garantiti; nessuna prova offline reale è stata eseguita.
- Il refresh mantiene il collegamento alla schermata, ma non gli input non inviati. Il blocco per data usa l'orologio del dispositivo e non è una protezione tecnica dei contenuti statici.
- Nessuna pubblicazione Cloudflare Pages o verifica di un URL pubblico è stata eseguita.

## Strutture draft delle giornate 1–6

Tutte le sei voci canoniche sono `draft`. Con `npm run dev`, il pannello **Anteprime di sviluppo** permette di selezionarle indipendentemente dalla data e provare gli input; è isolato dal calendario e dai progressi, senza validatori o ricompense assegnabili. La build di produzione non include il pannello e mostra lo stato non giocabile. I documenti sono segnaposto, non narrativa approvata; i percorsi sono sostituibili nel manifest `src/content/assets.ts`.

| Giorno | Struttura disponibile nell'anteprima | Mancante per essere giocabile |
|---|---|---|
| 1 | Slot lettera, registro e biglietto; codice numerico; ricompensa prevista indicata solo all'autore. | Lettera con anomalie, registro di esempi approvato e verificato, testi, indizio, validatore e ricompensa canonica. Le operazioni non sono mostrate. |
| 2 | Registro degli orologi per primo, slot biglietti e quattro posizioni vuote; risposta testuale. | Dataset definitivo coerente, distrattori verificati, testi, indizio, validatore e biglietto canonico. |
| 3 | Slot tabellone con otto righe vuote, precedenze e rapporto; campi orari, binari e affermazione. | Vincoli unici e verificati, documenti, soluzione, indizio, narrazione e disco canonico. |
| 4 | Slot per i vincoli del circuito e otto interruttori A–H. | Vincoli e configurazione unica, documenti, indizio, validatore, narrazione e schema canonico. |
| 5 | Sei posizioni vuote per insegne, slot descrizioni, campo negozio e appunti liberi simbolo-lettera. | Cifrario e relazioni verificati, documenti, indizio, validatore, narrazione e registro canonico. |
| 6 | Campi orologio, ora e simbolo; quattro griglie 5×5 temporanee che confrontano i cinque clienti con le altre quattro categorie. | Dataset e indizi con soluzione unica, documenti, indizio opzionale, validatore, narrazione e orologio canonico. |

## Checklist manuale iPad Safari

1. In orizzontale e verticale verificare leggibilità, scorrimento, due colonne/una colonna, bersagli touch e assenza di contenuti tagliati.
2. Verificare tastiera e VoiceOver: nomi dei controlli, focus visibile, apertura/chiusura di sacchetto e documenti, ritorno del focus e zoom.
3. In ambiente di prova verificare apertura delle date precedenti, blocco delle future, tentativi, indizio e tre stati del sacchetto; controllare che il diario non mostri tappe future.
4. Esportare, importare e rifiutare un JSON invalido; ricaricare la pagina e verificare i progressi. Controllare cosa succede con rete disattivata senza aspettarsi funzionalità offline garantita.

## Prima del deployment

1. Completare e verificare tutti i 24 giorni e le dipendenze tra oggetti, approvare e inserire gli asset, eseguire la checklist e testare l'intero percorso.
2. Valutare e correggere gli avvisi delle dipendenze di sviluppo senza aggiornamenti incompatibili non verificati; rieseguire tutti i controlli.
3. Configurare Cloudflare Pages con `NODE_VERSION=22.17.0`, comando `npm run build` e output `dist`; pubblicare solo dopo approvazione e verificare l'URL pubblico e il refresh.
