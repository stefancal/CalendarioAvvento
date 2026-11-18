# Guida pratica ai contenuti

Questa guida descrive l'implementazione attuale. **Tutti i giorni canonici sono ancora draft**: non usare i segnaposto di questa guida come contenuto, soluzione o validatore. La fixture in `src/dev/Fixture.tsx` è separata, non canonica e non viene inclusa nella build di produzione.

## 1. Registrare una giornata

In `src/content/days.ts`, aggiungere una definizione all'array `authoredDays`, con `day` univoco da 1 a 24. Il calendario costruisce sempre 24 voci; ogni giorno senza definizione resta automaticamente `{ day, status: 'draft' }`. Il tipo discriminato `DayDefinition` è in `src/game/types.ts`: una voce `draft` contiene solo `day` e `status`, non è giocabile e non può essere completata dal motore, anche se un backup contiene il suo numero.

Preparare testi e dati separatamente finché non sono verificati. Solo allora inserire una definizione `status: 'ready'` completa. Non cambiare `App.tsx`, calendario o storage per aggiungere un giorno. I test controllano l'unicità e l'intervallo dei numeri registrati.

## 2. Testi, dialoghi e diario

Una definizione `ready` richiede `title`, `intro`, `documents`, `puzzle`, `success` e `diary`. `intro` è l'apertura; `success` e l'array opzionale `dialogue: [{ speaker, text }]` appaiono solo dopo la soluzione corretta. `diary` deve contenere il testo narrativo completo autorizzato, non un riassunto generato. Se il testo approvato contiene dialoghi da distinguere visivamente, l'autore può aggiungere `diarySections`, un array ordinato di `{ type: 'narration', text }` e `{ type: 'dialogue', speaker, text }`: quando presente e non vuoto, sostituisce la visualizzazione di `diary` e deve quindi contenere l'intera voce, non soltanto i dialoghi. Il diario mostra soltanto le voci `ready` completate e sbloccate per data. Scrivere e verificare personalmente tutti i testi prima della pubblicazione.

## 3. Documenti e immagini

In `documents` inserire oggetti `DocumentDefinition` con `id` univoco nella giornata, `title` e `text` come trascrizione accessibile; si possono aggiungere `image` e `imageAlt`. Il pulsante apre il visualizzatore con zoom e trascrizione. Il manifest `src/content/assets.ts` può associare il percorso tramite `documents[numeroGiorno][idDocumento]`; questo prevale su `image`. Sfondi e documenti sono separati: configurare `chapters` o `days` nel manifest, con precedenza alla giornata. Percorsi, formato, dimensioni e fallback sono in [ASSET-GUIDE.md](ASSET-GUIDE.md). Non inserire indizi indispensabili solo in uno sfondo decorativo.

## 4. Risposta e annotazioni

`puzzle` usa l'unione tipizzata `Puzzle` in `src/game/types.ts`. In ogni caso `prompt` contiene la consegna e `validate` è una funzione che restituisce `true` solo per la risposta effettivamente corretta e verificata:

- `type: 'text'`: `label`, `validate(answer: string)` e opzionalmente `inputMode: 'text' | 'numeric'`. Stabilire esplicitamente nel validatore normalizzazione, spazi, maiuscole e zeri iniziali.
- `type: 'fields'`: `fields: [{ id, label }]` con ID distinti e `validate(answer: Record<string, string>)`. Controllare tutti i campi richiesti.
- `type: 'switches'`: `labels` è una tupla di esattamente otto etichette; `validate(answer: boolean[])` riceve otto valori nell'ordine delle etichette.

Per una griglia di appunti facoltativa aggiungere al puzzle `notes: { rows: string[], columns: string[], title?: string }`; per più confronti usare un array di griglie. Per annotazioni libere, ad esempio corrispondenze simbolo-lettera, si può indicare `notesTextLabel`. Gli appunti non sono la risposta, non sono salvati dopo il refresh e non completano l'enigma. Non esistono widget di selezione o ordinamento: aggiungerli solo quando il contenuto approvato ne dimostra la necessità. I tentativi sono illimitati; non aggiungere auto-completamento. Il codice e le risposte in un sito statico sono ispezionabili.

## 5. Un suggerimento

Inserire al massimo una stringa facoltativa `hint` nella definizione `ready`. Il motore registra se è stata rivelata, non fornisce automaticamente soluzioni e non pone limiti ai tentativi. La stringa deve essere sottile e approvata.

## 6. Assegnare un oggetto

In `src/content/items.ts` aggiungere un `InventoryItem` con `id` stabile e univoco, `title`, `description` e `acquiredByDay` uguale al numero della giornata che lo assegna. L'associazione della ricompensa è nel registro oggetti, non in un array nella giornata. `image` e `silhouette` sono facoltativi e sostituibili tramite `assetManifest.items[id]`: la sagoma deve essere generica e non rivelare il contenuto. Il sacchetto deriva l'acquisizione dal completamento del giorno; non assegnare oggetti in base alla data. La schermata di successo mostra i nomi delle ricompense registrate per quel giorno.

## 7. Riutilizzare un oggetto

Quando l'ultima giornata in cui l'oggetto serve è stata narrativamente approvata, impostare `lastNeededByDay` nel suo `InventoryItem`. Se è sconosciuta, omettere il campo: l'oggetto rimane disponibile. Il completamento dell'ultima giornata lo rende desaturato, ma consultabile; completarla prima del giorno di acquisizione non crea l'oggetto.

Una giornata `ready` può dichiarare `requiredItems: [{ itemId, missingMessage }]`. Se l'oggetto non è stato acquisito, compare il messaggio scritto dall'autore senza mostrarne il titolo o concederlo. Questa indicazione **non blocca né la pagina né l'invio**: è il contenuto approvato a dover rendere ragionevole la soluzione con le prove disponibili. Usare un `itemId` presente nel registro e non inserire rivelazioni nel messaggio. L'apertura resta sempre basata sulla data.

## 8. Marcare READY

Solo quando il contenuto è approvato e completo, inserire in `authoredDays` un oggetto conforme al ramo `ready` di `DayDefinition`: numero, titolo, apertura, documenti, puzzle e validatore verificato, eventuale unico indizio, narrazione finale, eventuali dialoghi e diario. Registrare separatamente gli oggetti e i percorsi grafici approvati. `ready` è una dichiarazione dell'autore, non una verifica automatica di qualità o unicità: non usare validatori che accettano qualunque risposta o dati provvisori. Le bozze restano `draft` finché manca anche un solo elemento necessario.

## 9. Verificare la giornata

1. Scrivere test indipendenti per il validatore con risposta corretta, risposte errate e casi limite; verificare che il set di indizi produca una soluzione unica e che le dipendenze non creino vicoli ciechi.
2. Eseguire `npm run lint`, `npm run typecheck`, `npm run test` e `npm run build`. Controllare il risultato di ciascun comando.
3. Testare la giornata nel browser con una data locale che la sblocchi, anche senza completare i giorni precedenti: apertura, documenti/zoom, errori ripetuti, indizio, soluzione, diario, ricompense, riapertura e backup. Non modificare la logica di produzione per saltare la data.
4. Testare l'ordine inverso delle giornate collegate e il caso senza oggetto; verificare acquisizione, stato disponibile e ultimo utilizzo. Testare su iPad Safari in entrambi gli orientamenti e verificare immagini, accessibilità e trascrizioni. La fixture di sviluppo non è prova che il contenuto canonico sia pronto.
