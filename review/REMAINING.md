# What remains before the library is finished

Checked against the working tree on 2026-11-22. Item numbers refer to
`review/AUDIT.md`. Struck-through entries are resolved and stay here as the
record.

**Current state:** nine patterns have `status: reviewed` and are served. Seven
have `status: draft`, return 404 in a production build, and remain readable
under `npm run dev`. The site-wide `noindex` has been removed in the working
tree. None of this is live until it is committed and deployed.

---

## 1. Blocks publishing a held page

To publish a page, finish its list and change its `status` to `reviewed`.

### `content/patterns/01-handoff.md`: no source has been located

| Item | What has to happen |
|---|---|
| 1.1, 1.4 | **The CIAF report and the 2024 ruling have not been located at any stable address.** The opening story and anti-pattern cannot be checked until both are found and read. |
| 1.17 | Read CIAF for the signalling layout, the exact "useless signal" wording, its injured figure, and why the final kilometres were ASFA-only. CIAF wins wherever its wording differs. |
| 1.2 follow-up | Confirm CIAF itself prints 79. The toll is settled, but 1.2 records the brief saying CIAF carries 80, and the footnote on "79 people died" cites CIAF. If CIAF prints 80, the marker has to move to the source that carries 79. |
| No audit item | `irj-etcs-santiago` has no URL. The ETCS entry's acknowledgement window needs the figure from SUBSET-026, per the VERIFY comment beside it. |
| ~~1.7, 8.12~~ | ~~`about 40 mph`.~~ The sentence left the page when the Tempe tale was replaced. Provenance Log's 44.1 mph is correct. |
| ~~1.8, 1.9, 1.11~~ | ~~The alert claim in the Tempe entry and source note.~~ Corrected. |
| ~~1.2~~ | ~~Death toll and footnote.~~ Closed as directed: the ruling's note no longer claims the figure. See the follow-up above. |

### `content/patterns/03-graceful-degradation.md`: source linked, not read

| Item | What has to happen |
|---|---|
| 3.1 | **Read NTSB/MAR-97/01** (Royal Majesty). Check every figure in the VERIFY comments on the tale and anti-pattern. |
| 3.5 | No sentence on the page now carries these wordings. Strike after confirming against the BEA report. |
| 3.7 | Read UN R157 section 5.4 to learn whether the manoeuvre is mandatory after a severe failure. |
| No audit item | The `bea-af447` note still ends "The 'says so' half of the pattern failed", which conflicts with the ECAM callout. Recommend cutting it. |
| No audit item | The VERIFY comment above the AF447 entry quotes the old sentence. Remove it. |
| ~~3.3, 3.4~~ | ~~AF447 protections claims.~~ Corrected with the BEA's hedge. |

### `content/patterns/09-learning-loop.md`: source linked, not read

| Item | What has to happen |
|---|---|
| 9.1 | **Read the Sheen Report** (Court No. 8074, Formal Investigation). The tale, anti-pattern, considerations and demo are all drafted from the brief. |
| 9.4 | Source or restate "count repeats, not just reports" and "treat workarounds as reports". |

### `content/patterns/10-explainable-fault.md`: source linked, not read

| Item | What has to happen |
|---|---|
| 10.1 | **Read NTSB brief CHI06MA121 and Safety Recommendations A-07-70 through A-07-86.** The source entry names both but links only the recommendation letter, so confirm the brief is reachable. |
| 10.3 | The JT610 entry still rests on secondary sources. See section 2. |
| ~~10.4, 10.5~~ | ~~JT610 details, "a new Boeing 737 MAX 8", and the speed trim claim.~~ No longer on the page. |

### `content/patterns/11-readiness-check.md`: no source has been located

| Item | What has to happen |
|---|---|
| 11.1 | **No citable source exists for the Freeman Hospital opening.** `newcastle-coroner-2018` has no URL. Find the coroner's report or replace the story. |
| 11.2 | The month-only dateline needs the day from that report, or a decision to allow it. |

### `content/patterns/12-return-of-control.md`: source linked, not read

| Item | What has to happen |
|---|---|
| 12.1 | **Read Washington State FACE Report 71-171-2018.** Above all, confirm the auto-resume behaviour the whole pattern rests on. |
| 12.2 | Naming decision. See section 5. |
| 12.8 | Replace `wikipedia-mcas`. See section 2. |
| No audit item | The VERIFY comment above China Airlines 140 says "Nothing new to check", which is no longer true. Remove or update it. |
| ~~12.4, 12.5~~ | ~~China Airlines 140 compression and "nothing showed the contest".~~ Corrected to cause 2 and cause 5. |

### `content/patterns/16-mode-awareness.md`: tale read, page unfinished

| Item | What has to happen |
|---|---|
| 16.11 | **The demo does not exist.** The file has no `interface` component, and DEMOS.md holds the concept. |
| 16.8 | Review the drafted risk, reversibility, autonomy, mechanism steps, With side and `cardIntent`. |
| 16.12 | Decide whether the pattern survives. See section 5. |
| No audit item | No item names what holds the `tale`, `antiPattern` and `considerations` flags. 16.2 and 16.3 record the tale as read against the French report, so clear these once you have reviewed them. |

---

## 2. Needs a document pulled

### Group E

| Item | File | Published? | What has to happen |
|---|---|---|---|
| 2.5 | `02-glass-box.md` | **Yes** | The rubber-stamping claim has no source. Read Chen et al. 2014 or restate it as the library's position. |
| 2.6 | `02-glass-box.md` | **Yes** | Chen 2014 and Boyce 2015 are unread. The audit says to confirm them before this page leaves draft, and it now has. |
| 14.4 | `14-alert-triage.md` | **Yes** | "Used for nothing else" is stronger than CS 25.1322(f). Soften it to the rule's scope. |
| 14.5 | `14-alert-triage.md` | **Yes** | "Act soon" drops the immediate-awareness requirement CS 25.1322(b) sets for both levels. |
| 15.4 | `15-stop-anywhere.md` | **Yes** | Decide whether IEC 60204-1 or NFPA 79 carries "and nothing else". |
| 15.5 | `15-stop-anywhere.md` | **Yes** | Read ISO 13850 on whether reset must be local. |
| 12.8 | `12-return-of-control.md` | Held | Replace `wikipedia-mcas` with the FAA airworthiness directive or Boeing's description. |
| 1.4 | `01-handoff.md` | Held | CIAF, the 2024 ruling and the IRJ article were supplied by title only. |
| 11.1 | `11-readiness-check.md` | Held | The coroner's report. |
| 10.3 | `10-explainable-fault.md` | Held | The KNKT final report. |

### Found in the repo, not in Group E

| Item | File | Published? | What has to happen |
|---|---|---|---|
| No audit item | `14-alert-triage.md` | **Yes** | The `nrc-tmi-backgrounder` note says the emergency-cooling and worst-accident claims were attached without reading the page. 14.3 verifies both in the Commission's report, so read the backgrounder or re-cite them there. |
| 13.1 | `13-operator-to-operator-handover.md` | **Yes** | Read the Cullen Report. `btw-piper-alpha` and `fsa-cullen` remain in the tale's sources but are secondary. |
| 5.5 | `05-shared-mental-model.md` | **Yes** | The machine's-model-of-the-operator claim is argued, not sourced. |
| 8.15 | `08-provenance-log.md` | **Yes** | Replace or supplement the Washington Post story with Benavides v. Tesla filings. |
| 8.20 | `08-provenance-log.md` | **Yes** | Check the EU AI Act wording against EUR-Lex or the AI Act Service Desk. |
| 6.2 | `06-intent-preview.md` | **Yes** | Confirm 160 of 164 is the figure you want. FSF gives 159 at the scene plus one later death. |
| 12.6 | `12-return-of-control.md` | Held | The AAIC report was read in translation. Only the Japanese version is authentic. |
| 12.12 | `12-return-of-control.md` | Held | The KNKT final report for the repeated-activation claims. |
| 16.5, 16.6 | `16-mode-awareness.md` | Held | Check the English translation and the report's exact date. |
| 16.9 | `16-mode-awareness.md` | Held | NTSB AAR-14/01 for the Asiana wake-up finding, if it is wanted. |
| ~~14.1, 14.2, 14.8~~ | `14-alert-triage.md` | | ~~Alarm count, core melt and printer source.~~ Settled. The `nrc-printer` attribution is corrected. |

---

## 3. Mechanism steps still drafted

| Pattern | File | Item | What is drafted |
|---|---|---|---|
| Provenance Log | `08-provenance-log.md` | 8.22 | Titles and details. Notes are sourced. |
| Learning Loop | `09-learning-loop.md` | 9.5 | Titles and details. The two notes are sourced. |
| Explainable Fault | `10-explainable-fault.md` | 10.7 | Titles and details. The two notes are sourced. |
| Readiness Check | `11-readiness-check.md` | 11.5 | Titles, details and step 5. Steps 3 and 4 come from Super Cruise. |
| Return of Control | `12-return-of-control.md` | 12.11 | Titles, details and five-step shape. Steps 2 and 4 carry notes. |
| Operator-to-Operator Handover | `13-operator-to-operator-handover.md` | 13.13 | Titles, details and five-step shape. Steps 2 and 4 carry notes. |
| Alert Triage | `14-alert-triage.md` | 14.6 | Titles, details, and steps 4 and 5. |
| Stop Anywhere | `15-stop-anywhere.md` | 15.7 | Titles, details and five-step shape. Steps 3 and 4 carry notes. |
| Mode Awareness | `16-mode-awareness.md` | 16.8 | All five steps. |

---

## 4. Format and consistency

### In the field format (1.5, 9.3)

- `01-handoff.md` mixes both formats: two verdict entries and two `**Observed · Domain.**` entries.
- `09-learning-loop.md` uses verdict entries only.
- Every other page with entries uses `**Observed · Domain.**`.
- `05-shared-mental-model.md` and `06-intent-preview.md` have no In the field section at all.

### Domains that do not match the page's opening

| File | `domains` | Opening story | Item |
|---|---|---|---|
| `01-handoff.md` | driving, surgical, drone | Railway. `rail` is not in the schema's `DOMAINS`. | 1.6 |
| `03-graceful-degradation.md` | driving, drone, industrial | Cruise ship (`maritime`) | Not in audit |
| `09-learning-loop.md` | aviation | Ferry (`maritime`) | Not in audit |
| `10-explainable-fault.md` | aviation | Drone (`drone`) | Not in audit |
| `11-readiness-check.md` | driving | Cardiac surgery (`surgical`) | 11.4 |
| `12-return-of-control.md` | aviation, driving, industrial | Bottling-plant forklift. Covered, though `warehouse` may fit better. | 12.3 |

In the field labels also stray from the vocabulary or the page's facets:
`01` uses Automotive and Rail, and Aviation is not in its domains. `03` uses
Aviation. `08` uses Software. `09` uses Maritime.

### Quote style

- 2.7: `02-glass-box.md` mechanism step 03 uses straight quotes and `with.steps` uses curly.
- The body of `03-graceful-degradation.md` uses straight quotes around the BEA wording, and its source note uses curly.

### Spellings

| Term | Where |
|---|---|
| centring / centering (12.9) | `12` uses both |
| manoeuvre / maneuver | `03` uses both; `08` has manoeuvre; `12` and `15` have maneuver |
| colour / color | `14` and `15` use both |
| defence / defense | `02` uses both. Some of this is quoted UK source text, so check before normalising. |
| recognised / recognized | `01` has "recognised"; `03`, `07`, `10`, `12` and `15` use -ize |
| safety operator / vehicle operator (1.12) | HAR-19/03 says "vehicle operator". If normalised, do it library-wide in one pass. |

---

## 5. Open decisions

### Naming and structure

- **1.3:** Does The Handoff cover one failure or two? "The Unannounced Handoff" is Santiago, while the first design consideration and the `with` caption still argue Tempe.
- **12.2:** Same question for Return of Control. "Resumes on Its Own" is narrower than the contest most of the page still argues.
- **16.12:** Does Mode Awareness survive as its own pattern, given how close it sits to Shared Mental Model?

### Wording awaiting your sign-off

- **2.4 / B7:** The rebuilt Glass Box anti-pattern is applied but not signed off. The next sentence, "An answer without reasons…", still implies the console gave no reasons, and the documents do not say which source carries the "trained to" quote.
- **B1:** "announced its own braking" in `01-handoff.md`. The report and the source note say "slowdown". Recommend "slowdown".
- **A5:** "to meet at the work site" in `13-operator-to-operator-handover.md`. LPB 261 says "meet, inspect the work site and sign off".

### Publishing

- **`reviewed` overstates some of the nine.** The schema defines it as every section filled, at least three sources and at least one observed example. Shared Mental Model and Intent Preview have no Design considerations or In the field section. Only The Handoff has a When to use section. Either fill those sections, loosen the definition, or add a status for "opening verified".
- ~~**8.7, 8.14:** Provenance Log's Draft tag on the In the field section.~~ Cleared by your decision on 2026-11-22. ~~The Key Largo example still renders as text with no figure.~~ Example deleted on 2026-11-22, so no figure needs restoring.
- **The Failure moment is empty in production.** Both its patterns (03, 10) are held, so `/moments/failure` says "No patterns yet… Candidates are listed in the backlog", and there is no public backlog.
- **The changelog names held patterns in old commit subjects**, for example "Updated Handoff pattern…". They are not links. Decide whether that history stays visible.
- **No sitemap or robots file exists.** Neither is needed to exclude held pages. Add them if you want to submit the site to search engines.

### Other

- **1.13:** Add the citations available for three of the Handoff's design considerations?
- **9.6:** The Learning Loop closing line has no slot between the demo and the mechanism. Add a field, or leave it in Notes?
- **15.3:** Should Stop Anywhere say more about the deployment permit versus the driverless testing permit?
