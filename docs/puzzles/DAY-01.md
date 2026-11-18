# Giorno 1 — La convocazione impossibile

**Prototipo da approvare, non ancora canonico.** Il registro e la sua difficoltà richiedono una prova con la giocatrice; la sola coerenza degli esempi non dimostra l'unicità di ogni possibile regola matematica.

La sera del 1° dicembre 2026 il Controllore convoca la protagonista alla stazione abbandonata. Un treno vuoto attende nella nebbia. Dopo l'apertura una voce la accoglie e viene trovata la tessera 24.

Documenti: lettera con sei anomalie, biglietto del 2026 timbrato il 24 dicembre 1976, registro con quattro esempi storici. La lettera produce BINARI; il biglietto suggerisce le posizioni alfabetiche: 2, 9, 14, 1, 18, 9.

## Regola del registro — soluzione per sviluppatori

Per sei valori a,b,c,d,e,f si calcolano, nell'ordine: |a−b| (scarto testa), c+d (somma centro), |e−f| (scarto coda), a+b+c+d+e+f (totale). Si conserva la cifra delle unità di ciascun risultato. Per BINARI i risultati sono 7, 15, 9, 53; le unità formano **7593**. Gli esempi nell'app sono verificati automaticamente, incluse differenze maggiori di nove. I titoli delle colonne e gli esempi forniscono gli indizi senza esplicitare le operazioni. La scelta di questi quattro indicatori è una convenzione proposta del registro, non una regola ferroviaria storica.

Indizio: osservare le lettere stampate diversamente e confrontarle con biglietto e registro. Ricompensa: tessera metallica 24; ultimo utilizzo ancora da definire, quindi non viene esaurita.

Asset: `public/assets/giorni/giorno-01/letter.png`, `ticket.png`, `railway-register.png`, `metal-token.png`, e `public/assets/ui/sack.png`. Stazione innevata assente: sfondo CSS. Testi HTML sopra gli asset, con fallback CSS.

Da approvare: regola e dataset del registro, chiarezza e difficoltà attraverso playtest, testo narrativo e resa grafica. Verificare su iPad Safari reale in entrambi gli orientamenti, inclusi zoom e VoiceOver.
