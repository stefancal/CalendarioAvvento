# Checklist finale — La Linea 24

Audit del 18 novembre 2026. **Esito:** base tecnica pronta per iniziare l'inserimento e la verifica dei contenuti definitivi; il regalo non è pronto per la pubblicazione. I controlli sotto non sostituiscono una prova su iPad Safari.

## Funzionalità operative nella base attuale

- [x] Calendario a 24 date e navigazione Calendario/Giorno/Diario con URL hash; collegamenti futuri bloccati secondo il calendario di Roma.
- [x] Sacchetto e impostazioni disponibili come pannelli; salvataggio locale versione 1 e strumenti JSON di backup previsti.
- [x] Motore generico con tentativi, indizio, validatori, documenti e inventario derivato dai completamenti; i giorni draft non sono giocabili.
- [x] Manifest per immagini sostituibili e fallback; anteprime di sviluppo isolate, non incluse nella produzione.

Questi elementi sono verificati dal codice e dai test elencati sotto, non da un collaudo su dispositivo reale. Non esiste ancora un flusso canonico completo perché non ci sono giorni pronti né oggetti registrati.

## Test automatici eseguiti

- [x] `npm run lint`, `npm run typecheck`, `npm run test` (30 test in 6 file) e `npm run build`.
- [x] Date di sblocco, indipendenza dai giorni precedenti, URL diretti e cronologia, blocco dei giorni futuri e filtro del diario.
- [x] In DOM simulato, con contenuto di test: risposta errata senza oggetto, risposta corretta, stato completato e ripristino di calendario, diario e sacchetto dopo un nuovo montaggio; stati dell'oggetto anche fuori ordine.
- [x] Parser e storage, dati malformati, importazione valida/invalida, esportazione simulata, input e sacchetto, immagini mancanti e zoom documento. L'esportazione e il ricaricamento non sono stati collaudati nel browser reale.
- [x] Giorni 1–6 draft non completabili e anteprime non persistenti. La build non contiene le anteprime di sviluppo.
- [x] Anteprima HTTP locale: HTML e asset JavaScript rispondono 200. `npm audit --omit=dev --audit-level=high`: nessuna vulnerabilità segnalata nelle dipendenze di produzione.

## Ancora da verificare manualmente

- [ ] Il servizio browser disponibile all'agente non era raggiungibile: nessun test reale di interfaccia o touch è stato eseguito durante questo audit.
- [ ] Su iPad Safari, in orizzontale e verticale: leggibilità, contrasto e ritaglio, dimensioni touch, scorrimento, tastiera, VoiceOver, focus e chiusura dei pannelli.
- [ ] In browser reale: aprire un URL hash, ricaricarlo, verificare giorni futuri e precedenti, completamento, diario e sacchetto con contenuti approvati; esportare e importare un backup anche dopo refresh.
- [ ] Con gli asset reali: verificare immagini mancanti, documenti e zoom, sagome, oggetti disponibili e desaturati. Verificare anche il comportamento senza connessione: non esiste un service worker e la cache non garantisce l'uso offline.
- [ ] Verificare configurazione e URL pubblicato su Cloudflare Pages dopo una richiesta esplicita di deployment. Il progetto documenta `NODE_VERSION=22.17.0`, `npm run build` e directory `dist`; la compatibilità del servizio remoto non è stata collaudata.

## Stato contenuti e asset

- **Giornate canoniche giocabili:** nessuna.
- **Giornate draft:** tutte, dalla 1 alla 24. Le 1–6 hanno strutture di anteprima soltanto in sviluppo, senza soluzione o ricompensa assegnabile.
- **Asset mancanti:** logo, favicon, sfondi, documenti grafici, immagini degli oggetti e sagome approvate. Il treno del calendario e l'icona del sacchetto forniti dall'utente sono collegati; gli altri slot usano i fallback.

## Prima della pubblicazione

- [ ] Scrivere, approvare e verificare tutti i 24 enigmi, testi, dialoghi, documenti, suggerimenti, soluzioni e ricompense; verificare unicità e dipendenze fra oggetti.
- [ ] Inserire gli asset approvati e completare il collaudo manuale su iPad e browser, compresi backup, refresh e percorso completo.
- [ ] Riesaminare le vulnerabilità delle dipendenze di sviluppo segnalate nell'audit precedente e verificare eventuali aggiornamenti compatibili.
- [ ] Eseguire nuovamente lint, typecheck, test e build; richiedere esplicitamente il deployment e poi controllare l'URL pubblicato.

Il blocco per data e i backup locali non sono protezioni antimanomissione: un backup JSON valido viene accettato dopo conferma e un utente tecnico può modificarlo. Le ricompense derivano dai completamenti registrati; il test di risposta corretta riguarda il normale flusso applicativo, non l'autenticità crittografica del backup.
