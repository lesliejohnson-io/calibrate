# What remains before the library is finished

Checked against the working tree on 2026-11-22. Item numbers refer to
`review/AUDIT.md`. Struck-through entries are resolved and stay here as the
record.

**Current state:** all sixteen patterns are published in every build. Nine have
`status: reviewed` and seven have `status: draft`. Each draft page carries a
notice saying what is unverified, and `review/DRAFTS.md` is the worklist. The
site-wide `noindex` has been removed in the working tree. None of this is live
until it is committed and deployed.

---

## 1. Holds a page at `draft`

To move a page to `reviewed`, finish its list and change its `status`.

### `content/patterns/01-handoff.md`: no source has been located

| Item | What has to happen |
|---|---|
| 1.1, 1.4 | **The CIAF report is now in `review/sources/IF_240713_200514_CIAF.pdf`.** Its public address is in `review/sources/README.md`, but the page's source entry has no `url` yet. Only pages 7 and 25 have been read. The 2024 ruling is still not in `review/`. The opening story and anti-pattern cannot be cleared until both are read. |
| 1.17 | Read CIAF for the signalling layout, the exact "useless signal" wording, its injured figure, and why the final kilometres were ASFA-only. CIAF wins wherever its wording differs. See the Shultz coverage map below. |
| ~~1.2 follow-up~~ | ~~Confirm the figure CIAF prints.~~ Closed on 2026-11-22: the page now says 80, from CIAF p. 25. |
| No audit item | `irj-etcs-santiago` has no URL. The ETCS entry's acknowledgement window needs the figure from SUBSET-026, per the VERIFY comment that sat beside it (see `3608cd0`). |
| ~~1.7, 8.12~~ | ~~`about 40 mph`.~~ The sentence left the page when the Tempe tale was replaced. Provenance Log's 44.1 mph is correct. |
| ~~1.8, 1.9, 1.11~~ | ~~The alert claim in the Tempe entry and source note.~~ Corrected. |
| ~~1.2~~ | ~~Death toll and footnote.~~ Closed as directed: the ruling's note no longer claims the figure. See the follow-up above. |

#### ~~Death-toll conflict (1.2, 1.17)~~: closed on 2026-11-22 at 80

**Resolution, CIAF p. 25:** "Posteriormente, Renfe Operadora informó del
fallecimiento de una persona, por lo que el número de víctimas mortales es 80".
The figure rose from 79 because a further person died. The explanation previously
recorded for 79 was wrong and has been withdrawn from the page and the review
documents. The evidence stays below as the record.

| Source | What it says | Where |
|---|---|---|
| CIAF final report, 2014 | "Se producen 80 fallecidos y numerosos heridos de distinta gravedad." | p. 7 |
| CIAF final report, 2014 | "a finales de agosto, el Juzgado de Instrucción nº 3 de Santiago de Compostela cifraba en 226 las personas afectadas por el accidente, de las que 79 eran víctimas mortales y 147 heridos. Posteriormente, Renfe Operadora informó del fallecimiento de una persona, por lo que el número de víctimas mortales es 80 (dos pertenecientes al personal del tren) y 152 los afectados por el accidente." | p. 25, section 2.3.1 |
| Shultz et al. 2016, on the October 6, 2015 ruling | "a judge charged the driver with 80 counts of reckless manslaughter, one charge for each death, and 144 counts of reckless injury." | p. 14 |
| Shultz et al. 2016, occupants | "There were 218 passengers and six railway staff onboard at the time of derailment." "All of these 224 occupants can be considered to be direct victims, including the 80 who were killed (78 passengers and the two cafeteria/service staff). All 144 survivors of the crash (140 passengers, two drivers, controller, and security officer) were physically injured with 140 of the injured requiring medical or surgical treatment." | p. 22 |
| Shultz et al. 2016, reference 20 | A July 28, 2013 Reuters headline: "Spanish train driver Francisco Garzon charged with 79 counts of homicide." | p. 29 |
| 2024 ruling | Audit 1.2 records the original brief attributing 79 to it. **It is not in `review/`, so what it prints is unconfirmed.** | Not read |

- CIAF records 79 as the earlier figure and 80 as the later one, after a further death.
- ~~To settle it, read the 2024 ruling.~~ CIAF settles the figure. When the ruling is read for 1.1 and 1.4, check what it prints, and reopen this only if it gives a different count with a reason.
- Keep the denominators apart: CIAF's 226 is people affected, and Shultz's 224 is occupants.
- CIAF's "152 los afectados" does not follow from its own 226, and CIAF counts 227 people plus an unknown number of young children aboard, against Shultz's 224.

#### What Shultz et al. 2016 does and does not support

Attribution check: the page cites `shultz-2016` once, and the claim holds.

| Claim on the page | Shultz | Result |
|---|---|---|
| The recorder put the train at 195 km/h, 250 metres before the curve | "250 m before the curve: 195 km/h (121 mph): black box confirmed" (Table 2, p. 19) | Holds |
| 179 km/h when it derailed | "179 km/h (111 mph) at moment of derailment" (Table 2, p. 19; also pp. 13, 21) | Holds |
| More than twice the limit | "more than twice the posted speed" (p. 11; Table 1, p. 14). Posted speed 80 km/h (pp. 12, 19) | Holds |

Coverage of the four items in 1.17's VERIFY list. Nothing here has been promoted to the page.

| 1.17 item | Does Shultz touch it? | What still has to come from CIAF |
|---|---|---|
| ERTMS coverage boundary at the A Grandeira curve | **Partly.** ERTMS "was not available along the curve" (p. 12), and "the section of track at the accident site did not have ERTMS installed and activated" (p. 22). It gives no location for where coverage ended. | The boundary itself |
| "Useless signal" wording | **No.** The word and the signal do not appear. | All of it |
| CIAF's own injured figure | **No.** It gives 144 injured but cites the ruling and press report (refs 2, 3), not CIAF. | The figure. CIAF p. 25 carries 147 as the court's August count, and "152 los afectados", which needs reading in context |
| Whether CIAF addresses the ASFA-only final kilometres | **No.** It never names ASFA. It says only that "the older-generation signaling system" warned the driver but "could not 'commandeer' the speed controls" (p. 22). | All of it |

One further difference: the page says the call came from the train's conductor, citing CIAF. Shultz calls the caller "the railway's inspector" (p. 13), "the track agent" and "railway controller" (p. 14). Check this against CIAF.

### `content/patterns/03-graceful-degradation.md`: source linked, not read

| Item | What has to happen |
|---|---|
| 3.1 | **Read NTSB/MAR-97/01** (Royal Majesty). Check every figure in the VERIFY comments on the tale and anti-pattern (see `3608cd0`). |
| 3.5 | No sentence on the page now carries these wordings. Strike after confirming against the BEA report. |
| 3.7 | Read UN R157 section 5.4 to learn whether the manoeuvre is mandatory after a severe failure. |
| No audit item | The `bea-af447` note still ends "The 'says so' half of the pattern failed", which conflicts with the ECAM callout. Recommend cutting it. |
| ~~No audit item~~ | ~~The VERIFY comment above the AF447 entry quotes the old sentence.~~ Removed on 2026-11-22. |
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

### `content/patterns/11-readiness-check.md`: opening read, In the field not read

| Item | What has to happen |
|---|---|
| No audit item | **This is what holds the page at `draft`.** No read is on record for the Super Cruise claims (`gmc-super-cruise`, `seeing-machines`) or for the Tempe camera claim. |
| No audit item | **The Tempe camera claim looks too strong.** The page says Uber "didn't check" what its cameras showed, in In the field, Design considerations and Notes. Its own `ntsb-har-19-03` note says ATG used the cameras "as a spot-check" and that spot-checks were infrequent. Read HAR-19/03 and correct the wording. |
| ~~No audit item~~ | ~~Neither coroner document has a public URL on the page.~~ Both URLs added on 2026-11-22. |
| No audit item | **The coroner and the RCS differ on the proctors.** The report says they were engaged "to advise and assist throughout the operation". The RCS understands they attended for the aortic balloon. The anti-pattern carries both, attributed. Do not collapse them. |
| 11.5 | Open as craft work. **Drafted mechanisms do not block `reviewed`** (decided 2026-11-22, with 8.22 as the precedent). The steps remain the library's synthesis: neither coroner document describes a machine checking a person's attention. |
| No audit item | The `examples` draft flag stays until the two items above are read. ~~The `tale` and `antiPattern` flags.~~ Cleared on 2026-11-22. |
| ~~11.1~~ | ~~No citable source for the opening.~~ Tale and anti-pattern rewritten from the Regulation 28 report and the RCS response on 2026-11-22. |
| ~~11.2~~ | ~~Month-only dateline.~~ Now February 23, 2015, from the report. |

### `content/patterns/12-return-of-control.md`: source linked, not read

| Item | What has to happen |
|---|---|
| 12.1 | **Read Washington State FACE Report 71-171-2018.** Above all, confirm the auto-resume behaviour the whole pattern rests on. |
| 12.2 | Naming decision. See section 5. |
| 12.8 | Replace `wikipedia-mcas`. See section 2. |
| ~~No audit item~~ | ~~The VERIFY comment above China Airlines 140 says "Nothing new to check".~~ Removed on 2026-11-22. |
| ~~12.4, 12.5~~ | ~~China Airlines 140 compression and "nothing showed the contest".~~ Corrected to cause 2 and cause 5. |

### `content/patterns/16-mode-awareness.md`: tale read, page unfinished

| Item | What has to happen |
|---|---|
| ~~16.11~~ | ~~The demo does not exist.~~ Built on 2026-11-22 as an invented forklift scene, recorded in `DEMOS.md`. Its `demo` draft flag stays until you review it. |
| 16.8 | Review the drafted risk, reversibility, autonomy, mechanism steps, With side and `cardIntent`. |
| 16.12 | Decide whether the pattern survives. See section 5. |
| No audit item | No item names what holds the `tale`, `antiPattern` and `considerations` flags. 16.2 and 16.3 record the tale as read against the French report, so clear these once you have reviewed them. |

---

## 2. Needs a document pulled

### Group E

| Item | File | Status | What has to happen |
|---|---|---|---|
| 2.5 | `02-glass-box.md` | reviewed | The rubber-stamping claim has no source. Read Chen et al. 2014 or restate it as the library's position. |
| 2.6 | `02-glass-box.md` | reviewed | Chen 2014 and Boyce 2015 are unread. The audit says to confirm them before this page leaves draft, and it now has. |
| 14.4 | `14-alert-triage.md` | reviewed | "Used for nothing else" is stronger than CS 25.1322(f). Soften it to the rule's scope. |
| 14.5 | `14-alert-triage.md` | reviewed | "Act soon" drops the immediate-awareness requirement CS 25.1322(b) sets for both levels. |
| 15.4 | `15-stop-anywhere.md` | reviewed | Decide whether IEC 60204-1 or NFPA 79 carries "and nothing else". |
| 15.5 | `15-stop-anywhere.md` | reviewed | Read ISO 13850 on whether reset must be local. |
| 12.8 | `12-return-of-control.md` | draft | Replace `wikipedia-mcas` with the FAA airworthiness directive or Boeing's description. |
| 1.4 | `01-handoff.md` | draft | CIAF is now in `review/sources/`, unread except pp. 7 and 25. The 2024 ruling and the IRJ article were supplied by title only. |
| ~~11.1~~ | `11-readiness-check.md` | draft | ~~The coroner's report.~~ Now in `review/sources/` and read. |
| 10.3 | `10-explainable-fault.md` | draft | The KNKT final report. |

### Found in the repo, not in Group E

| Item | File | Status | What has to happen |
|---|---|---|---|
| No audit item | `14-alert-triage.md` | reviewed | The `nrc-tmi-backgrounder` note says the emergency-cooling and worst-accident claims were attached without reading the page. 14.3 verifies both in the Commission's report, so read the backgrounder or re-cite them there. |
| 13.1 | `13-operator-to-operator-handover.md` | reviewed | Read the Cullen Report. `btw-piper-alpha` and `fsa-cullen` remain in the tale's sources but are secondary. |
| 5.5 | `05-shared-mental-model.md` | reviewed | The machine's-model-of-the-operator claim is argued, not sourced. |
| 8.15 | `08-provenance-log.md` | reviewed | Replace or supplement the Washington Post story with Benavides v. Tesla filings. |
| 8.20 | `08-provenance-log.md` | reviewed | Check the EU AI Act wording against EUR-Lex or the AI Act Service Desk. |
| 6.2 | `06-intent-preview.md` | reviewed | Confirm 160 of 164 is the figure you want. FSF gives 159 at the scene plus one later death. |
| 12.6 | `12-return-of-control.md` | draft | The AAIC report was read in translation. Only the Japanese version is authentic. |
| 12.12 | `12-return-of-control.md` | draft | The KNKT final report for the repeated-activation claims. |
| 16.5, 16.6 | `16-mode-awareness.md` | draft | Check the English translation and the report's exact date. |
| 16.9 | `16-mode-awareness.md` | draft | NTSB AAR-14/01 for the Asiana wake-up finding, if it is wanted. |
| ~~14.1, 14.2, 14.8~~ | `14-alert-triage.md` | | ~~Alarm count, core melt and printer source.~~ Settled. The `nrc-printer` attribution is corrected. |

---

## 3. Mechanism steps still drafted

| Pattern | File | Item | What is drafted |
|---|---|---|---|
| Provenance Log | `08-provenance-log.md` | 8.22 | Titles and details. Notes are sourced. |
| Learning Loop | `09-learning-loop.md` | 9.5 | Titles and details. The two notes are sourced. |
| Explainable Fault | `10-explainable-fault.md` | 10.7 | Titles and details. The two notes are sourced. |
| Readiness Check | `11-readiness-check.md` | 11.5 | Titles, details and step 5. Steps 3 and 4 come from Super Cruise. Craft work, not a publishing blocker. |
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
| ~~`01-handoff.md`~~ | rail, driving, aviation | ~~Railway. `rail` is not in the schema's `DOMAINS`.~~ Added to the schema and this page. | ~~1.6~~ |
| ~~`03-graceful-degradation.md`~~ | maritime, aviation, driving | ~~Cruise ship (`maritime`)~~ Now matches. | Not in audit |
| ~~`09-learning-loop.md`~~ | maritime, aviation | ~~Ferry (`maritime`)~~ Now matches. | Not in audit |
| ~~`10-explainable-fault.md`~~ | drone, aviation | ~~Drone (`drone`)~~ Now matches. | Not in audit |
| ~~`11-readiness-check.md`~~ | surgical, driving | ~~Cardiac surgery (`surgical`)~~ Now matches, and `driving` covers the three In the field entries. | ~~11.4~~ |
| ~~`12-return-of-control.md`~~ | warehouse, aviation, driving, industrial | ~~Bottling-plant forklift.~~ Carries both `warehouse` and `industrial`. | ~~12.3~~ |

One In the field label still strays from the vocabulary: `01` and `15` use
Automotive, where the value is `driving`.

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

- **`reviewed` overstates some of the nine.** It now means every claim on the page has been read against the source it cites. The open items in section 2 mean Glass Box, Provenance Log, Operator-to-Operator Handover, Alert Triage and Stop Anywhere do not yet meet that. 5.5 and 6.2 may also count. Close those items or move the pages to `draft`.
- ~~**8.7, 8.14:** Provenance Log's Draft tag on the In the field section.~~ Cleared by your decision on 2026-11-22. ~~The Key Largo example still renders as text with no figure.~~ Example deleted on 2026-11-22, so no figure needs restoring.
- ~~**The Failure moment is empty in production.**~~ Closed: all sixteen are published, so it holds 03 and 10, and the backlog copy is gone.
- ~~**The changelog names held patterns in old commit subjects.**~~ Closed: no pattern is held, and the changelog links all sixteen.
- **No sitemap or robots file exists.** Add them if you want to submit the site to search engines.

### Other

- **1.13:** Add the citations available for three of the Handoff's design considerations?
- **9.6:** The Learning Loop closing line has no slot between the demo and the mechanism. Add a field, or leave it in Notes?
- **15.3:** Should Stop Anywhere say more about the deployment permit versus the driverless testing permit?
