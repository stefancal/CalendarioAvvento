# Game mechanics and invariants
Status: APPROVED.

1. The experience has exactly 24 dates, Dec 1–24, 2026. Each unlocks on its date (Europe/Rome calendar), independent of all prior puzzle completions. Reopen any previously unlocked day, including unfinished ones. Dates do not solve puzzles or grant items.
2. One puzzle per day; unlimited attempts, no penalty. Exactly one optional subtle hint at most per day; no automatic solution. Target ~15 min expert, 4/5 typical.
3. Completing a puzzle requires its validator to accept the actual answer. Only then set day completed, reveal its authored success story, and award its configured items. Idempotent: reopening/completing again cannot duplicate objects.
4. An item is undiscovered until its awarding day is completed, active thereafter, and exhausted/gray only after the final day that uses it is completed. It remains inspectable forever. If player completes day 17 before day 2, do not fabricate the day-2 ticket; later solving day 2 yields the item, and its exhausted status can be derived from day-17 completion. Content authors must avoid impossible dependency deadlocks: an unsolved earlier item may be required to solve a later puzzle, but later day remains open and explains what evidence is missing without giving it away.
5. Diary is chronological, authored, and spoiler-safe. Record only earned discoveries, not speculative future revelations.
6. Content and state are separate. Reset progress only via deliberate confirmed action. Export/import backup JSON is optional convenience, no account/cloud sync.
7. Date lock is UX, not security; client time can be altered and bundled content inspected. This is acceptable for private gift, not a hardened anti-cheat system.
8. Every finished puzzle must have unique tested solution, accurate clues and narrative reward. If content is missing, mark as draft, never invent placeholder answer or make a dummy puzzle completable.

**Cross-day inventory (provisional until story/puzzle finalized):** day 1 brass token 24 (future use TBD); day 2 forged ticket/signature (revisited day 17); day 3 engraved metal disc (used day 7 and 13); day 4 safety module schematic (days 15 and 22); day 6 unusual watch (days 18 and 24); day 9 radio signal (days 12 and 23). Do not mark any item exhausted before its true final use is approved.
