# Review audit

Recovered review items for every pattern, grouped by pattern. This is a
working record, not a list of fixes: nothing here has been resolved, re-checked
or changed on any page.

## Where this came from

On 2026-11-21 the `review:` lists were removed from patterns 01–15 in the
working copy, leaving only Mode Awareness. The item text below is verbatim:

- Patterns 01–15: from each file's `review:` list as committed at
  `ec08b5a` (the last commit before the removal).
- Pattern 16, Mode Awareness: from its current file, where the list is still
  live.

All 152 items were checked against the session's saved dump of the queue
(which truncated long items at 230 characters); every one matches.

## Severity

Assigned from the item's own text only. Nothing was looked up.

- **FACTUAL**: the item records a claim that contradicts, or is unsupported
  by, its cited source, or a dead source link.
- **EDITORIAL**: wording, structure, consistency.
- **UNCLEAR**: can't tell from the item text alone.

Conventions used where an item didn't fit cleanly:

- An item that records a correction **already made** ("Tale corrected: …
  Rewritten") is FACTUAL, because it records a claim that contradicted its
  source. Its text says whether the page was changed.
- A **"Verified against … this pass"** record with no discrepancy in it is
  UNCLEAR: it records no problem of either kind.
- **Drafted** values (mechanism steps, ratings) and sources **not yet read**
  or read only second-hand are UNCLEAR: the item doesn't say the claim is
  wrong, only that it hasn't been checked.
- Notes that a **demo invents its data** are EDITORIAL: they describe what
  the demo is, not a claim the page makes about the incident.

## Totals

| Severity | Items |
|---|---|
| FACTUAL | 45 |
| EDITORIAL | 59 |
| UNCLEAR | 48 |
| **Total** | **152** |

Plus 3 items added after recovery (1.17 UNCLEAR, 14.8 UNCLEAR, 15.8 EDITORIAL), not counted above.

| # | Pattern | Items | FACTUAL | EDITORIAL | UNCLEAR |
|---|---|---|---|---|---|
| 01 | The Handoff | 16 | 5 | 8 | 3 |
| 02 | The Glass Box | 8 | 4 | 2 | 2 |
| 03 | Graceful Degradation | 9 | 3 | 2 | 4 |
| 04 | Appropriate Friction | 7 | 4 | 2 | 1 |
| 05 | Shared Mental Model | 5 | 2 | 3 | 0 |
| 06 | Intent Preview | 2 | 1 | 1 | 0 |
| 07 | Capability Disclosure | 6 | 2 | 3 | 1 |
| 08 | Provenance Log | 23 | 6 | 13 | 4 |
| 09 | Learning Loop | 6 | 1 | 3 | 2 |
| 10 | Explainable Fault | 8 | 2 | 2 | 4 |
| 11 | Readiness Check | 10 | 3 | 4 | 3 |
| 12 | Return of Control | 12 | 3 | 4 | 5 |
| 13 | Operator-to-Operator Handover | 14 | 2 | 6 | 6 |
| 14 | Alert Triage | 7 | 3 | 1 | 3 |
| 15 | Stop Anywhere | 7 | 4 | 1 | 2 |
| 16 | Mode Awareness | 12 | 0 | 4 | 8 |

## 01 · The Handoff

`content/patterns/01-handoff.md`

| # | Severity | Item |
|---|---|---|
| 1.1 | UNCLEAR | Opening story replaced this pass: the Alvia derailment at Santiago de Compostela in, Tempe out. Nothing in the new tale or the new anti-pattern has been read against the CIAF report or the 2024 ruling, neither of which could be linked - see their source notes. Both carry `drafts:` flags and VERIFY comments. |
| 1.2 | FACTUAL | The death toll is unsettled on the page. The tale says 79, which the brief attributes to the 2024 ruling, and the footnote at the end of the paragraph points at the CIAF report, which the brief says carries 80. As written, the opening cites a source for a number that source does not give. Reconcile before the DRAFT tag comes off: either change the figure or change the footnote. |
| 1.3 | EDITORIAL | The anti-pattern was renamed from “The Handoff That Never Came” to “The Unannounced Handoff”, which is a different failure. The old name is a handoff the design never made at all, which is Tempe; the new one is a handoff that happened without being announced, which is Santiago. The rest of the page still argues the old name in places - the first design consideration is “Never depend on someone you can't alert”, and the `with` caption turns on acknowledgement. Both failures are real; decide which one this pattern is about. |
| 1.4 | UNCLEAR | Three new sources carry no `url`. The CIAF report, the 2024 ruling and the IRJ article were all supplied by title only, and none was located at a stable public address, so the opening story on this page rests on two sources a reader cannot follow. This is the strongest reason the tale keeps its DRAFT tag. |
| 1.5 | EDITORIAL | In the field now mixes two formats. The two new entries use the verdict shapes — `■ Without it`, `● Applies the pattern` — as the brief asked; the two existing entries below them still use `**Observed · Domain.**`, which is what the other fourteen patterns use. The same mismatch was introduced on Learning Loop in the same pass. Pick one format and convert the library. |
| 1.6 | EDITORIAL | `domains` is still `[automotive, surgical, drone]` and the opening story is now a railway. Add `rail` to `DOMAINS` in the schema and to this pattern, or accept that the page opens in a domain the vocabulary does not have. There is no `rail` value at present, which is why nothing was changed here. |
| 1.7 | FACTUAL | Tale, the speed does not match the report. The story has the SUV “driving itself at about 40 mph” at the moment it detected her. NTSB HAR-19/03 has it approaching the site “at a speed of 45 mph” and recorded at 44.1 mph 5.6 seconds before impact; 40.5 mph is its speed 0.2 seconds before impact, and 39 mph is the impact speed. “About 45 mph” is what the source carries for the moment the sentence describes. Text left as supplied. |
| 1.8 | FACTUAL | Tale, “it wasn't designed to alert her” is contradicted by the report, and this is the page's load-bearing claim. The ADS was designed to alert: “If a collision could not be avoided with the application of maximum allowed braking, the system was designed to send an auditory alert to the vehicle operator while simultaneously initiating gradual vehicle slowdown.” It did so, 0.2 seconds before impact. What the report supports is narrower and still damning: no alert was given when the system first recognised the emergency at 1.2 seconds (“No alert was given to the operator when action suppression was initiated”), and the alert it was designed to send announced the vehicle's own slowdown rather than asking her to take over. The system had no way to ask for a takeover; it is not true that it had no way to alert her. Text left as supplied. |
| 1.9 | FACTUAL | Anti-pattern, “it had no way to ask her” carries the same problem as the tale's last clause, for the same reason. Accurate as written if “ask” means “request a takeover”; wrong if a reader takes it as “no alert of any kind”. Text left as supplied. |
| 1.10 | UNCLEAR | Tale, “about a second before impact” is 1.2 seconds in the report: “Only when the ADS determined that the pedestrian's detected location was in the path of the SUV, 1.2 seconds before impact, did the system recognize an emergency situation.” Rounding down is defensible; the figure is recorded here so the next editor does not have to look it up. |
| 1.11 | FACTUAL | The `ntsb-har-19-03` source note still reads “The system never alerted the safety operator.” The same report shows an auditory alert 0.2 seconds before impact. The note was not in the brief's scope, so it was left alone, but it is wrong on the same point as the tale and should change with it. |
| 1.12 | EDITORIAL | “Safety operator” is not the report's term. NTSB HAR-19/03 says “vehicle operator” throughout; Uber ATG renamed the role “mission specialist” after the crash. The site has used “safety operator” on this page already, so it was kept for consistency rather than changed here. |
| 1.13 | EDITORIAL | The five existing design considerations were kept verbatim, per the brief, and so remain uncited. Three have direct support among the sources already on the page: window sizing in Eriksson & Stanton and Gold et al., the three-level briefing in Endsley & Jones, and clearing the channel in UN R157, which the source note says “requires non-driving displays to suspend once a handoff starts”. Say the word and the citations go on. |
| 1.14 | EDITORIAL | The AF447 entry was reworded by three words. It used to end “as a few lines of text in this zone”, pointing at a BEA figure that was never added to /public and that the move to prose entries removes; it now reads “on the message display”. Nothing else about the entry changed. |
| 1.15 | EDITORIAL | Demo invents its data. The pattern's source describes a 2018 crash in Tempe; the motorway, the construction zone, the 62 mph and both countdowns are written for this page. What is taken from the source is the shape of the failure: a design that depends on a person taking over, with no useful warning before the moment it needs them. |
| 1.16 | EDITORIAL | Check Bainbridge citation placement. Bainbridge supports why a late or cold takeover fails — the operator has been monitoring for rare failures with skills gone rusty from disuse — not the "hand off early, at a designed boundary" claim the sentence leads with. There is no sentence in the body making that point on its own, so the citation was removed rather than moved. |

### Added 2026-11-21, after the opening story was replaced

| # | Severity | Item |
|---|---|---|
| 1.17 | UNCLEAR | VERIFY against the CIAF report directly. See below. |

> VERIFY against the CIAF report directly, not secondary sources:
> 1. The signalling layout: where ERTMS coverage ended relative to the
>    A Grandeira curve, and that the joined conventional track was ASFA only.
> 2. The exact wording of the "useless signal" finding, currently taken
>    from IRJ's reporting rather than the report itself.
> 3. CIAF's own injured figure, if it gives one.
> 4. Whether CIAF addresses why the final kilometres were built ASFA-only.
> If CIAF's wording differs from the text above, CIAF wins.
>
> SETTLED: the death toll is 80. CIAF p. 25: "cifraba en 226 las personas
> afectadas por el accidente, de las que 79 eran víctimas mortales y 147
> heridos. Posteriormente, Renfe Operadora informó del fallecimiento de una
> persona, por lo que el número de víctimas mortales es 80". Corrected on
> 2026-11-22. The explanation this note gave before was wrong and is withdrawn.

Item 1.2 above (death toll unsettled) is kept as recovered text; the
SETTLED note supersedes it.

Footnotes per claim, as placed in the story (one marker per claim, at the
end of the sentence that completes it):

| Claim in the story | Source |
|---|---|
| ERTMS on the high-speed stretch; the curve is the first bend after it; the conventional track carried only ASFA | ciaf-santiago-2014 |
| Onboard ERTMS disconnected June 2012 for compatibility faults; the alert at the last balise four kilometres out | irj-santiago-2014 |
| The speed reduction sign 200 metres out described as useless | irj-santiago-2014 |
| 195 km/h at 250 metres; 179 km/h at derailment | shultz-2016 |
| The call from the conductor about the route ahead | ciaf-santiago-2014 |
| 80 dead | ciaf-santiago-2014 |
| Driver inattention the only cause; missing onboard system not contributory | irj-santiago-2014 |

## 02 · The Glass Box

`content/patterns/02-glass-box.md`

| # | Severity | Item |
|---|---|---|
| 2.1 | FACTUAL | Tale, the place does not match either source. The heading says “Iraq–Kuwait border”; the MoD summary gives “LOCATION: Kuwait” and has ZG710 “returning to Ali Al Salem Air Base in Kuwait”, struck at 17,938 ft as it began its descent. Hansard says only that it was shot down during Operation TELIC. Neither document puts the engagement on the border. “Kuwait” is what both support. Text left as supplied. |
| 2.2 | FACTUAL | Tale, “both men” is not in either source. The MoD summary says “CREW: Two – pilot and navigator”, “Two fatalities” and “Both members of the crew were killed instantly”; it does not give the crew's sex. “Both crew” would be carried by the source as written. Text left as supplied. |
| 2.3 | UNCLEAR | Tale, a date that is right but worth knowing about. The MoD gives the accident as 22 March 2003 at 2348 hrs — “0248 hrs on 23 Mar 03 local time”. The heading date matches the official date; locally it was already the 23rd. |
| 2.4 | FACTUAL | Anti-pattern, one sentence that is the pattern's reading rather than a finding. “The system gave the battery's crew an answer… but not the evidence behind it” is not stated anywhere in the Board's findings, which do not describe what the Patriot console displayed. What the sources do support is everything the sentence rests on: the broad criteria, the absent IFF response, the one-minute decision, and crews “trained to react quickly, engage early and to trust the Patriot system”. Flagged because the page presents it as what happened. Text left as supplied. |
| 2.5 | FACTUAL | Design considerations, one citation deliberately omitted. “Dumping everything into the interface produces the same rubber-stamping as showing nothing” still has no source behind it — the brief asked for Chen et al. 2014 only if it supports the claim, and it could not be checked this pass (see below), so no citation was attached. This repeats the flag the page already carried. |
| 2.6 | UNCLEAR | Chen 2014 and Boyce 2015 could not be re-verified this pass. Both are hosted on apps.dtic.mil, which returns HTTP 403 to automated requests; getting around that would have meant impersonating a browser, which was not done. The confidence consideration is cited to Chen on the strength of this file's own existing source note — “level 3 is what it projects will happen and how uncertain it is” — which matches independent secondary descriptions of the SAT model, but neither paper was read directly. Confirm against the PDFs before this leaves draft. |
| 2.7 | EDITORIAL | Mechanism step 03 now uses straight quotes — '"X, because of A, B and C"' — per the brief. The neighbouring `with.steps` entry still uses curly quotes (“X, because…”), as does the rest of the content corpus, so the two now differ. Say which you want and both can match. |
| 2.8 | EDITORIAL | Demo invents its data. The pattern's sources describe a Patriot battery; the forklift, aisle 7, the two sensors and the 40 seconds are written for this page. What is taken from the sources is the shape of the failure — a confident classification whose basis the operator cannot inspect. |

## 03 · Graceful Degradation

`content/patterns/03-graceful-degradation.md`

| # | Severity | Item |
|---|---|---|
| 3.1 | UNCLEAR | Opening story replaced this pass: Royal Majesty in, AF447 out. Nothing in the new tale or the new anti-pattern has been read against NTSB/MAR-97/01 — both are drafted from the brief, both carry `drafts:` flags, and the VERIFY comments in the frontmatter list every figure to check. Pull the report before either loses its DRAFT tag. |
| 3.2 | UNCLEAR | AF447 is now an In the field entry rather than the opening, cut to one sentence. The three flags below were written about it as the tale and the anti-pattern; they still apply to the surviving sentence, which makes the same claim in shorter form, and are kept because the claim is the one worth knowing about. |
| 3.3 | FACTUAL | Tale, one claim the BEA report does not carry as written. “Never worked out which protections were gone”: the report records the PNF calling out “alternate law protections” at 2 h 10 min 16 and reading the reconfiguration to alternate law off the ECAM between 2 h 10 min 18 and 2 h 10 min 25. The BEA's own conclusion is hedged — “although the PNF had called out the reconfiguration to alternate law when reading the ECAM, and even though the indicators of the loss of protection should have been displayed on the PFD (SPD LIM and an amber cross in roll and yaw), it is possible that the PF was not fully aware of this reconfiguration and of what it implied”. Text left as supplied. |
| 3.4 | FACTUAL | Anti-pattern, same point in stronger form. “Nothing told them what it could still be trusted with” is contradicted in the narrow sense: the ECAM announced the reconfiguration and the PFD should have shown the loss of protection. What the report does support is that no message identified the origin of the failure — “No failure message is provided that identifies the origin of these other failures: in particular, the rejection of the ADR's and of the speed measurements” — and that it is possible the pilot flying did not grasp what the new law implied. Shown and not registered, as on Shared Mental Model. Text left as supplied. |
| 3.5 | FACTUAL | Tale, two smaller hedges in the source. The report says the speed indications were incorrect “likely following the obstruction of the Pitot probes by ice crystals”; the tale states it flatly. And “handed control without warning” is the crew's experience rather than the report's wording: the autopilot disconnection was itself annunciated, and the report says the crew “detected a problem with this disconnection”. |
| 3.6 | UNCLEAR | Verified against the BEA final report this pass: the A330-203 on AF 447, Rio de Janeiro Galeão to Paris Charles de Gaulle; autopilot disconnection and “a reconfiguration to alternate law”; “In alternate or direct law, the angle-of-attack protections are no longer available but a stall warning is triggered”; a maximum altitude of “about 38,000 ft”; impact at 2 h 14 min 28, more than three minutes after the apogee; and 228 fatalities (12 crew, 216 passengers). Note that the stall warning itself kept sounding — what was lost was the protection, not the warning. |
| 3.7 | UNCLEAR | Verified against UN R157 this pass: 5.1.5, “If the driver fails to resume control of the DDT during the transition phase, the system shall perform a minimum risk manoeuvre”, and the 2.7 definition, “a procedure aimed at minimising risks in traffic, which is automatically performed by the system after a transition demand without driver response or in the case of a severe ALKS or vehicle failure”. Whether a separate operative paragraph makes the manoeuvre mandatory for a severe failure, rather than permitted, was not read: section 5.4 could not be pulled verbatim. |
| 3.8 | EDITORIAL | Demo is a simplified illustration. The fault codes, the mode labels and the four-rung ladder are written for this page, not taken from any aircraft. The spec put “Landing in place. No operator response needed.” at the bottom rung; it prints on LAND IN PLACE, because the bottom rung is STOP, which is where the drone sits once it is down. |
| 3.9 | EDITORIAL | Mechanism steps: unchanged apart from the two notes, which were rewritten to read as sentences. |

## 04 · Appropriate Friction

`content/patterns/04-appropriate-friction.md`

| # | Severity | Item |
|---|---|---|
| 4.1 | FACTUAL | Tale corrected against Leveson & Turner: the console did not show only Malfunction 54. The draft read “The console showed only ‘MALFUNCTION 54.’” The report: “the console displayed the message ‘Malfunction 54.’ The machine also displayed a ‘treatment pause,’ indicating a problem of low priority… The machine showed a substantial underdose on its dose monitor display: 6 monitor units delivered, whereas the operator had requested 202 monitor units.” The display told her the patient had been under-treated, which is why pressing P was a reasonable act rather than a careless one — a stronger version of the point the page is making. Rewritten to say so, with the 6-against-202 figure. |
| 4.2 | FACTUAL | Tale and design consideration corrected: the frequency belonged to malfunction messages at large, not to Malfunction 54. Malfunction 54 itself was rare — AECL engineers “spent a day running the machine through tests but could not reproduce a Malfunction 54,” and the Tyler physicist needed “a great deal of effort” to elicit it. What was commonplace: “Malfunction messages were commonplace - most did not involve patient safety,” and at another clinic “an average of 40 dose-rate malfunctions, attributed to underdoses, occurred on some days.” Both now say malfunction messages, and “Treat frequent warnings as a defect” carries the 40-a-day figure. |
| 4.3 | FACTUAL | Tale corrected: the cry for help belongs to the April 11 patient. The draft read “nobody heard him cry out.” For March 21 the report has the patient feeling “an electric shock or that someone had poured hot coffee on his back” and beginning “to get up from the treatment table to go for help. It was at this moment that the operator hit the ‘P’ key”; he pounded on the door after the second exposure. The patient moaning for help over a working intercom is three weeks later. The monitors were right as drafted: “the video display was unplugged and the audio monitor was broken.” Rewritten to the March 21 sequence. |
| 4.4 | FACTUAL | Anti-pattern and design consideration corrected: software was not the only safeguard. The draft read “on the Therac-25, software was the only safeguard.” The report says AECL “decided not to duplicate all the existing hardware safety mechanisms and interlocks” and that “the Therac-25 relies largely on software.” The predecessor half is solid and is now stated concretely instead: on the Therac-20 the same bug was “just a nuisance… because this machine has independent hardware protective circuits for monitoring the electron-beam scanning. The protective circuits do not allow the beam to turn on, so there is no danger of radiation exposure to a patient” — the symptom there was tripped fuses and breakers. |
| 4.5 | UNCLEAR | Verified against Leveson & Turner this pass: March 21, 1986 at the East Texas Cancer Center in Tyler, Texas; the patient face down on the treatment table while the operator “left the treatment room, closed the door, and sat at the control terminal”; the mode typed as “x” for X ray instead of “e” for electron and fixed with the cursor up key; the editing window — the Tyler error occurred when the operator “made an entry indicating the mode/energy, went to the command line, then moved the cursor up to change the mode/energy, and returned to the command line all within 8 seconds”; 16,500 to 25,000 rads against the 180 prescribed; “He died from complications of the overdose five months after the accident”; and “Between June 1985 and January 1987, six known accidents involved massive overdoses by the Therac-25.” The draft's “months later” is now “five months later”, and “one of six patients… between 1985 and 1987” is accurate as written. |
| 4.6 | EDITORIAL | Demo invents its data. The drone, zone B and the 120 m altitude are written for this page: the pattern's sources describe a radiation therapy console, not an aircraft, and staging the real accident as a playable overdose was not the intent. What is taken from the sources is the behaviour — an irreversible action one keystroke deep, and a machine whose pauses the operator had learned to clear. |
| 4.7 | EDITORIAL | Demo uses no red. The brief allowed a red danger state only if the other console demos use the same red for warnings. They do not: the printed displays carry a fault as brighter green (#b9ffc6) with added weight and a ⚠, and red on yellow is reserved for the emergency stop controls in Stop Anywhere, where the CSS notes that reserving those colours “only works if nothing else wears them.” This demo follows the printed displays. |

## 05 · Shared Mental Model

`content/patterns/05-shared-mental-model.md`

| # | Severity | Item |
|---|---|---|
| 5.1 | EDITORIAL | Dateline reformatted this pass, from “6 July 2013” to “July 6, 2013”, so it matches every other opening on the site. The tale's footnote also appears for the first time: the NTSB report was always named in `cautionaryTale.sourceId`, but tale citations were only numbered when some other sentence on the page happened to cite the same source, and nothing else here cited it. That is now fixed in `lib/patterns.ts` rather than by adding a `[cite:]` somewhere, so every tale on the site carries its footnote because the tale names the source. |
| 5.2 | FACTUAL | Tale, one sentence changed. The supplied copy said “nothing on the flight deck made that obvious”. NTSB/AAR-14/01 1.6.3.3 says the A/T mode is annunciated on the FMA at the top of each PFD, in green and boxed for ten seconds when it becomes active; 1.1 says none of the three crewmembers recalled seeing it. It was shown and not registered, which is the sharper version of this pattern. Rewritten to say so. |
| 5.3 | EDITORIAL | Anti-pattern name “Divergent Models” is drafted. This pattern has no research entry, so nothing named its failure. Note research/during.md reserves “Silent Mode Switch” for a separate, unwritten Mode Awareness pattern. |
| 5.4 | EDITORIAL | Asiana 214 is earmarked in research/during.md as the incident for that unwritten Mode Awareness pattern. Using it here spends it; decide whether Mode Awareness still gets written and what it opens with. |
| 5.5 | FACTUAL | Unsourced claim: “a machine with no model of what the operator expects it to do cannot tell when that expectation has gone wrong”. The two-way sync is argued, not sourced: Sarter and Woods cover the operator's model diverging from the system's mode, not the reverse. |

## 06 · Intent Preview

`content/patterns/06-intent-preview.md`

| # | Severity | Item |
|---|---|---|
| 6.1 | FACTUAL | Distance unit corrected. The research notes and an earlier draft said Romeo was “132 nm” away. The Flight Safety Foundation, quoting the official report, says 212 km / 132 statute miles — about 114 nautical miles. The page, the tale and the demo now all say miles. |
| 6.2 | EDITORIAL | Tale casualty figure: the FSF report gives 159 killed at the scene (two flight crew, six cabin crew, 151 passengers) with five survivors, one of whom later died. The tale says 160 of 164, counting the later death. Confirm that is the figure you want. |

## 07 · Capability Disclosure

`content/patterns/07-capability-disclosure.md`

| # | Severity | Item |
|---|---|---|
| 7.1 | UNCLEAR | Tale verified against NTSB/HAR-17/02 this pass: the 2015 Tesla Model S 70D, eastbound on US-27A west of Williston, 4:36 p.m. on May 7, 2016; “vehicle speed just before impact with the semitrailer was 74 mph. The highway has a posted speed limit of 65 mph”; US-27A at the crash site is “a four-lane divided highway” and “is not a limited-access roadway because it has” at-grade crossings; the manual's “Warning: Autosteer is intended for use only on highways and limited-access roads with a fully attentive driver”; the truck “making a left turn from westbound US-27A across the two eastbound travel lanes”; “The car struck the right side of the semitrailer, crossed underneath it”; and the forward collision warning and automatic emergency braking “did not activate”, with “no record in the … braking or steering input immediately before the crash”. |
| 7.2 | FACTUAL | Tale corrected: the 37 minutes are not the last 37 minutes. The draft read “For the last 37 minutes of the drive, the system steered while the driver's hands were on the wheel for just 25 seconds.” The report: “for the 41-minute trip from Cedar Key, Autopilot was active for 37 minutes. During the trip, while Autopilot was in use, the system detected driver-applied torque on the steering wheel on seven different occasions for a total of 25 seconds.” Autopilot was on for 37 of 41 minutes, not for the final 37. Rewritten to say so; the 25 seconds is accurate as drafted. |
| 7.3 | FACTUAL | Anti-pattern corrected: the car recognized speed signs, not signs generally. The draft read “from GPS, map data and sign recognition.” Footnote 61 (p. 43): “Tesla's Autopilot system uses vehicle GPS data, commercially available road data, and camera recognition of speed signs to determine the type of road and the speed limit of the roadway.” Narrowed to “speed-sign recognition”. |
| 7.4 | EDITORIAL | Demo invents one road. US-27A is the report's road. I-75 does not appear anywhere in NTSB/HAR-17/02 — it is a real limited-access highway written in for the contrast, which is the one place this demo names a place its source does not. Everything else it turns on is sourced in substance: road class is what the report says the firmware could determine and placed no restriction on. |
| 7.5 | EDITORIAL | Demo's ten-second handback is not in the report. The brief specified the “Autosteer ending in 10 seconds, take the wheel” line; the AUTOSTEER OFF line that follows it is written here, so a countdown the reader starts actually resolves. The report describes no such behaviour either way — Tesla's hands-off escalation at the time ran to alerts, and “nor did the system initiate the Autosteer deactivation protocol” on this trip. |
| 7.6 | EDITORIAL | Design considerations moved from frontmatter into the body so they can carry citations and a link, and the whole list is now four items rather than one. Only the first is carried over from the previous version. |

## 08 · Provenance Log

`content/patterns/08-provenance-log.md`

| # | Severity | Item |
|---|---|---|
| 8.1 | EDITORIAL | Readability pass, 2026-11-10. The six entries below this one are from it; everything under them is from the pass before, where “this pass” means that one. |
| 8.2 | EDITORIAL | Opening story cut to its first and last moves, with the sequence lifted out of the paragraph into `cautionaryTale.timeline` and the closing line into `cautionaryTale.kicker`. No reading changed and none was added: −5.6 s first detection at 44.1 mph, the classification alternating between vehicle, bicycle and other, and action suppression beginning at −1.2 s and ending at −0.2 s one second later, are the same figures from NTSB/HAR-19/03 §1.5.6.1 and its table of selected ADS parameters that the prose carried. The timeline states them as a countdown instead of a sentence. “None of that is testimony. It is a readout.” is the paragraph's own last line, moved. |
| 8.3 | EDITORIAL | Anti-pattern caption shortened. Key Largo, the uploaded collision snapshot and the Washington Post citation stay; “it was the most important evidence in the case: what the car detected, and when”, “entirely”, and “Whatever the reasons, the effect was the same” are gone. |
| 8.4 | EDITORIAL | Demo caption cut to its first sentence, which makes the cut flagged below as “the obvious next cut”. The Tempe sentence it named is gone; the timeline in the opening now carries those readings, so the caption was stating them a second time two screens down. |
| 8.5 | EDITORIAL | `## Notes` moved, unchanged, into the new top-level `insight` field, so it reads under Therefore rather than above the Sources list. The Sources section no longer has a notes paragraph. |
| 8.6 | EDITORIAL | In the field no longer tells Tempe or Key Largo a second time. Both are already on this page — one as the opening, one as the anti-pattern — so their two entries are replaced by a pointer at the end of the section, and the sentence sending readers to The Handoff for the same crash went with the Uber entry. UN R157 and Horizon are untouched. |
| 8.7 | EDITORIAL | Example: no figure until the drawing exists. `image` is out and `placeholder: false` is set, so the example renders as a credit line, verdict and caption rather than a broken image or an empty box, and the credit is “The Washington Post” linking out to the story — the source, since there is no drawing yet to credit. The `alt` text still describes the drawing to come: when /illustrations/examples/key-largo-snapshot.svg lands, restore `image`, drop `placeholder`, set the credit back to “Drawing: Leslie Johnson, after The Washington Post, 2025” and clear `drafts.examples`. |
| 8.8 | UNCLEAR | Opening story replaced this pass: Tempe in, Key Largo out. The new tale is verified against NTSB/HAR-19/03. §1.5.6.1: “The ADS data included the time the system detected the pedestrian, how the system classified and assigned predicted paths to the pedestrian, various vehicle dynamics, and the ADS's planned and executed actions. At the request of NTSB investigators, ATG provided a playback of sensor and vehicle dynamics information showing the events leading up to the crash. Investigators examined the output from the sensor systems to create a timeline of the events.” The table of selected ADS parameters carries first detection at −5.6 seconds, “Classification: Vehicle--by radar”, and at −1.2 seconds “Classification: Bicycle--by lidar … situation becomes hazardous (emergency situation) … Action suppression begins”, ending at −0.2 seconds “1 second after it begins”. §1.5.6.1 again: the ADS “changed the pedestrian's classification several times, alternating between vehicle, bicycle, and other”, and at 1.2 seconds “preventing the collision would have required braking beyond the ADS braking design specifications”. The 911 call came in at 10:00 p.m., which is where “just before 10 p.m.” comes from — the report gives no clock time for the impact itself. |
| 8.9 | EDITORIAL | Tempe opens only this pattern now. It used to be the cautionary tale on The Handoff as well; that page's opening was replaced with the Santiago de Compostela derailment, and Tempe is an In the field entry there. The cross-reference in this page's In the field entry was reworded to match, and so was the one on Readiness Check. |
| 8.10 | EDITORIAL | Anti-pattern caption changed, not silently. It read “The record existed, and it was the most important evidence in the case…”, where “the case” meant Key Largo because Key Largo was the opening. With Tempe at the top, “the case” would now be read as Tempe — and at Tempe the data was handed over, so the sentence would have become false. It now names the 2019 Key Largo crash and carries the Washington Post citation. Nothing else in it changed. |
| 8.11 | EDITORIAL | Left alone and flagged: the `with` caption still opens “At Tempe the ADS data held the detection times, the successive classifications and the suppressed brake command.” Every word of it is accurate, but it now restates the opening story two screens below it. Not changed, because the brief did not ask and the sentence is not wrong — but it is the obvious next cut. |
| 8.12 | FACTUAL | Flagged in another file, not changed: The Handoff's Tempe tale says the SUV was “driving itself at about 40 mph” when it detected her. HAR-19/03 records 44.1 mph at 5.6 seconds and 45 mph on the approach; 39 mph is the speed when the operator took the wheel, 0.02 seconds before impact. The figure is close to the impact speed and wrong for the detection it is attached to. Outside this brief's scope, so it stands. |
| 8.13 | EDITORIAL | The Key Largo verification below — the Washington Post quotations, and the corrections to “forensic expert”, “seriously injured”, the 9:14 p.m. time and the Autopilot attribution — now covers the anti-pattern caption, the In the field entry and the example rather than the opening tale. The text itself was moved, not rewritten. |
| 8.14 | EDITORIAL | The example carries no figure. The Washington Post story is a news article with nothing cleared for reuse, so the example renders the placeholder box with its alt text, and `drafts.examples` is set — the section keeps its DRAFT tag until a figure or a court exhibit replaces it. |
| 8.15 | UNCLEAR | Replace or supplement with court filings from Benavides v. Tesla (S.D. Fla.) when available. The present source is a Washington Post story, and it never names the case caption: it says only “a trial that began last month in Miami federal court”, “the Florida lawsuit” and “U.S. District Judge Beth Bloom”. Miami federal court is consistent with the Southern District of Florida, but the district, the caption and the docket number are all inference from the article rather than statements in it, so none of them appear on the page. |
| 8.16 | UNCLEAR | Tale verified against the Washington Post story this pass: “Immediately after the wreck at 9:14 p.m. on April 25, 2019, the crucial data … was automatically uploaded to the company's servers”; the snapshot “internally referred to as a collision snapshot”; “Moments later … the data was just as automatically ‘unlinked’ from the 2019 Tesla Model S at the scene, meaning the local copy was marked for deletion”; “Tesla's headquarters soon sent an automated message back to the car confirming that it had received the collision snapshot”; “a crash that killed 22-year-old Naibel Benavides Leon”; “the company said it didn't have the data”; “Within minutes, he found key data that was marked for deletion — along with confirmation that Tesla had received the collision snapshot”; “Tesla later said in court that it had the data on its own servers all along”; and Judge Beth Bloom “said in an order that she did not find ‘sufficient evidence’ that Tesla's failure to initially produce the data was intentional.” |
| 8.17 | FACTUAL | Tale corrected: not a forensic expert, and not the car's own hardware. The draft read “a forensic expert hired by the victims' lawyers recovered it from the car's own hardware.” The article describes “a self-described hacker, enlisted by the plaintiffs to decode the contents of a chip they recovered from the vehicle”, working from “a flash drive containing a forensic copy of the Autopilot unit's contents” under terms agreed with Tesla, and says he “did not testify”. The forensic engineer who did testify, Alan Moore, is a different person and did not recover the data. Rewritten as a hacker working from a forensic copy. |
| 8.18 | FACTUAL | Tale corrected: “seriously injured” understates the article, which says Angulo was “catastrophically injured”. Changed to the article's word. “A little after 9 p.m.” is likewise replaced with the article's own 9:14 p.m. |
| 8.19 | FACTUAL | Tale narrowed: the article does not flatly state the car was on Autopilot. It says the driver, George McGee, “said he was using Autopilot”, so the page attributes it to him rather than asserting it. |
| 8.20 | FACTUAL | EU AI Act citation corrected: the six-month retention is Article 19(1), not Article 12. Article 12(1) is the requirement that high-risk systems “technically allow for the automatic recording of events (logs) over the lifetime of the system”; the retention duty sits with providers in Article 19(1), “of at least six months, unless provided otherwise in the applicable Union or national law”. Still the artificialintelligenceact.eu rendering rather than the Official Journal text, and the site appears to show a consolidated version, so the wording wants checking against EUR-Lex or the European Commission's AI Act Service Desk. |
| 8.21 | FACTUAL | Horizon claims cut back to the Inquiry's own evidence. The remote-access, Gareth Jenkins and Ernst & Young claims and their three news sources are removed: none of them was found in the Inquiry's published record, and the volumes that would carry them are unpublished. What is left is Volume 1's own figure, approximately 1,000 people prosecuted and convicted. |
| 8.22 | UNCLEAR | Mechanism steps: drafted. The research has a definition and evidence but no mechanism; the step notes are sourced, the titles and details are not. |
| 8.23 | EDITORIAL | Demo invents its panel. Nothing in it is a reading from the sources, which describe a Tesla, a Tempe crash and a UK accounting system rather than a warehouse: the robot, the speeds, the 09:14–09:21 clock and the sw 4.21.3 version string are written for this page. What is taken from the sources is the shape of the entry — actor, timestamp and software version, which is what UN R157 paragraph 8.3 requires — and the property that makes it worth keeping, that the party to a dispute cannot revise it. |

## 09 · Learning Loop

`content/patterns/09-learning-loop.md`

| # | Severity | Item |
|---|---|---|
| 9.1 | UNCLEAR | Opening story added this pass, along with everything else this page was missing: a solution sentence, design considerations and a demo. Nothing in the tale, the anti-pattern, the considerations or the demo has been read against the Sheen Report - all of it is drafted from the brief, all of it carries `drafts:` flags, and the VERIFY comments in this frontmatter list what to check. |
| 9.2 | EDITORIAL | JT610 is gone from this page, and so are the two secondary sources that carried it (Leeham and AIN). Nothing on the page cited AIN at all; Leeham was cited by the old anti-pattern caption and by the first body paragraph, both of which have been rewritten. The maintenance-log point JT610 was making here is still made on Explainable Fault, where JT610 is now an In the field entry. |
| 9.3 | EDITORIAL | In the field is written in a different format from the other fourteen patterns. Every other page uses `**Observed · Domain.**`, the evidence-and-domain pair; the brief for this page asked for `■ Without it` / `● Applies the pattern`, the verdict shapes from `VERDICTS` in the schema. The verdict format says something the other one does not - whether the example is the pattern working or the cost of its absence - but the library now spells the same section two ways. Pick one and convert the rest. |
| 9.4 | FACTUAL | Design considerations are drafted and uncited. All five are written as instructions from the brief; the ASRS briefing supports the first and the last (confidential, non-punitive intake; CALLBACK as the visible far end), and nothing on the page supports “count repeats, not just reports” or “treat workarounds as reports”, which are the two that most want a source. |
| 9.5 | UNCLEAR | Mechanism steps: drafted. The research has definition, incidents and an interface example but no mechanism; the two step notes are sourced, the titles and details are not. |
| 9.6 | EDITORIAL | The brief asked for a closing line under the demo — “An indicator light was never the hard part. The hard part was getting the request to someone who could install one, and showing the masters it had happened.” There is no slot for prose between the demo and the mechanism: the page component goes demo, mechanism, then the body sections. The line is the last paragraph of Notes instead, which renders in the Sources section at the foot of the page. Add a post-demo field to the schema if that line is meant to sit where the brief put it. |

## 10 · Explainable Fault

`content/patterns/10-explainable-fault.md`

| # | Severity | Item |
|---|---|---|
| 10.1 | UNCLEAR | Opening story replaced this pass: the CBP Predator B at Nogales in, Lion Air 610 out. Nothing in the new tale, the new anti-pattern or the rethemed demo has been read against CHI06MA121 or the A-07-70/-86 recommendation letter — all three are drafted from the brief, all three carry `drafts:` flags, and the VERIFY comments in this frontmatter list what to check. |
| 10.2 | EDITORIAL | JT610 is now an In the field entry rather than the opening, cut to one sentence and keeping both secondary sources. The flags below were written about it as the tale and the anti-pattern. The ones about the tale's timeline and crash site no longer describe anything on the page; the one about “a different system entirely” described a sentence the new anti-pattern removed, and the claim is gone with it. They are kept as the record of what was checked, not as live flags. |
| 10.3 | UNCLEAR | Story rests on secondary sources; cite the KNKT final report when available. Every JT610 claim on this page comes from the AirlineRatings write-up of that report or from Leeham's analysis, not from the report itself. |
| 10.4 | FACTUAL | Tale, two details neither cited source carries. “About 12 minutes after takeoff” and “Java Sea, off Jakarta” are not in the AirlineRatings or Leeham pieces — AirlineRatings gives the date and the 189 dead but no timeline or crash site, and the Leeham article is about the flight-deck sequence. Both are almost certainly right and will be in the KNKT report; they are unsourced on this page until it is pulled. “A new Boeing 737 MAX 8” is likewise not in either source, which say only “Boeing 737 MAX.” Text left as supplied. |
| 10.5 | FACTUAL | Anti-pattern, one claim a cited source contradicts. “The speed trim system, a different system entirely” is not how the sources describe it: AirlineRatings says “MCAS was an extension of the existing speed trim system,” and Leeham says MCAS's “intermittent trimming, similar to Speed Trim, caused the crew of JT043 to think it was the cause,” since “the only system they know with this behavior was Speed Trim.” The captain's guess was closer to right than “a different system entirely” allows — which arguably strengthens the pattern, because it shows a competent diagnosis still failing without the alert. Text left as supplied. |
| 10.6 | EDITORIAL | Demo: the checklist line reads “CHECKLIST  AOA DISAGREE” — the checklist named for the condition, which is the pattern's own logic. No source here names a real 737 checklist for this alert, so the label is drafted, not sourced. The demo now carries “Simplified illustration, not real flight data.” above it, which DEMOS.md previously argued against as a class; the exception is noted there. |
| 10.7 | UNCLEAR | Mechanism steps: drafted. The research has definition, incident and interface example but no mechanism; the two step notes are sourced, the titles and details are not. |
| 10.8 | UNCLEAR | Verified against the cited sources this pass. AirlineRatings on the KNKT final report: “the October 29, 2018 tragedy that killed 189 people”; “an alert telling pilots that the plane's two angle-of-attack sensors were giving different readings was not working”; “the lack of an angle-of-attack disagree alert meant a miscalibrated AOA sensor could not be documented by the flight crew and was therefore not available to help maintenance identify the miscalibrated AOA sensor”; and that MCAS's “reliance on a single sensor was deemed appropriate.” Leeham: the stick shaker at rotation on the captain's side, IAS DISAGREE and ALT DISAGREE on his PFD, the captain fighting MCAS, and the previous flight's captain writing “Speed Trim trimmed in the wrong direction.” MIT 16.422: “The icon is displayed next to an EICAS message whenever there is an ECL checklist that needs to be completed,” and “When an alert message is displayed, the pilot simply pushes the CHKL button and the correct non-normal checklist is displayed.” Amershi guideline 11 is “Make clear why the system did what it did.” |

## 11 · Readiness Check

`content/patterns/11-readiness-check.md`

| # | Severity | Item |
|---|---|---|
| 11.1 | UNCLEAR | Opening story replaced this pass: the Freeman Hospital robotic mitral valve repair in, Mountain View out. Nothing in the new tale or the new anti-pattern has been read against a source, because no source could be linked - see the `newcastle-coroner-2018` note below. Both carry `drafts:` flags and VERIFY comments. |
| 11.2 | EDITORIAL | The new dateline breaks the site's format. Every other opening reads Month D, YYYY; this one reads “February 2015”, because the brief supplied the month and asked for the day to be verified, and no day could be established without the coroner's report. Fill the day in from the report, or decide a month-only dateline is allowed and say so in the template. |
| 11.3 | EDITORIAL | Mountain View is now an In the field entry rather than the opening, cut to one sentence. The flags below about its tale and anti-pattern wording - the five seconds of distraction versus the clear view, and the warnings being absent rather than late - describe text that has been removed. They are kept as the record of what was checked against HAR-20/01, which is still cited three times on this page. |
| 11.4 | EDITORIAL | This pattern's `domains` is still `[automotive]`, and its opening story is now a cardiac operating theatre. The schema has `surgical` and `medical`; the facet was left alone because the brief did not ask, but the page now opens in a domain it does not claim, so the index card and the filters will not surface it for anyone browsing surgical patterns. |
| 11.5 | UNCLEAR | Mechanism steps: drafted. The escalation ladder in steps 3 and 4 is sourced from Super Cruise; the step titles, details and the fifth step are not. |
| 11.6 | UNCLEAR | Tale verified against NTSB/HAR-20/01 this pass: 9:27 a.m. on March 23, 2018, a 2017 Tesla Model X P100D travelling south on US-101 in Mountain View; “the vehicle moved to the left and entered the gore” dividing the main lanes from the left exit ramp to SR-85; “During the 5 seconds leading up to the crash, the Tesla SUV accelerated from about 63 mph to nearly 71 mph at impact”; “The crash attenuator was positioned at the end of a concrete median barrier”, “in a damaged and nonoperational condition … due to the California Highway Patrol's failure to report the damage following a previous crash and systemic problems with the California Department of Transportation's maintenance division”; the probable cause's “distraction likely from a cell phone game application”; “About 6 seconds before the crash, no driver-applied steering wheel torque was detected by Autosteer”, continuing “until the impact”; and “he died from blunt-force trauma injuries”. Finding 15: “Because monitoring of driver-applied steering wheel torque is an ineffective surrogate measure of driver engagement, performance standards should be developed…”. |
| 11.7 | FACTUAL | Tale corrected: the five seconds are the distraction, not the view. The draft read “had about five seconds of clear view of the barrier and did nothing.” The report has two separate figures — “The Tesla driver was likely distracted for at least 5 seconds, as shown by his lack of evasive action”, and “During the final 4 seconds of travel prior to impact, the Tesla accelerated toward the crash attenuator and the driver took no evasive braking or steering action” — and locates the unobstructed view at 375 feet out: “the vehicle was centered between the two lines delineating the gore with no vehicles ahead to impede the driver's view of the approaching hazard.” No duration is given for the clear view. Rewritten as the five-second acceleration plus the unobstructed view, without putting a number on the view. |
| 11.8 | FACTUAL | Anti-pattern corrected: the warnings were not late, they were absent. The draft read “Its warnings came too late to prompt a response.” The report: “during the final 15 minutes before the crash, the system did not provide any visual or audible alerts warning the driver to put his hands on the steering wheel even though his hands came off the steering wheel on multiple occasions for time periods exceeding 10 seconds”, and “During the last 60 seconds before the crash, the system did not detect driver-applied steering wheel torque 43 percent of the time and provided no warnings to the driver.” It also allowed hands off “for up to 3 minutes under certain highway driving conditions”. Silence is a stronger version of the point, and the anti-pattern now says that instead. |
| 11.9 | FACTUAL | The “very poor at monitoring automated systems” claim is now sourced, and no longer attributed to Williston. HAR-20/01 §2.3.1: “drivers are poor at monitoring automation and do not perform well on tasks requiring passive vigilance”, citing Parasuraman and Riley 1997, Moray and Inagaki 2000 and others. The report says drivers, not people, and is relaying the human-factors literature rather than making a finding, so the Notes say “drivers” and credit the report with repeating it. |
| 11.10 | EDITORIAL | Demo invents its panel. Nothing in it is a reading from the report: the toggles, the ten seconds to the hazard, the four rungs and their wording are written for this page. What is taken from the report is the failure — engagement assessed from the steering wheel, no hands detected for the final six seconds, and nothing raised. The ladder's shape is Super Cruise's, ending in a slowdown to a stop. |

## 12 · Return of Control

`content/patterns/12-return-of-control.md`

| # | Severity | Item |
|---|---|---|
| 12.1 | UNCLEAR | Opening story replaced this pass: the Washington State driverless forklift in, China Airlines 140 out. Nothing in the new tale, the new anti-pattern or the rethemed demo has been read against FACE Report 71-171-2018 - all three are drafted from the brief, all three carry `drafts:` flags, and the VERIFY comments in this frontmatter list what to check. |
| 12.2 | EDITORIAL | The anti-pattern was renamed from “The Tug-of-War” to “Resumes on Its Own”, which changes what this pattern is about. The old name is the contest: two parties commanding one axis, which is the Nagoya and 737 MAX failure, and most of this page still argues it - the mechanism's “Machine stands back / without arguing”, the design consideration “Give the person the last word”, the Lion Air In the field entry, and the `with` caption's “never commanding the same axis with different intentions”. The new name is unilateral resumption, which is a narrower thing. Both failures are real and this pattern now carries both; decide whether that is one pattern or two before it leaves draft. |
| 12.3 | EDITORIAL | `domains` is still `[aviation, automotive, industrial]`, which still covers the page: the new opening is industrial. Worth noting `warehouse` exists in the schema and is arguably the better fit for a bottling plant. |
| 12.4 | FACTUAL | Tale, verified against the AAIC report, with one simplification worth knowing about. The report has the GO lever cause a thrust increase that pushed the aircraft above the glide path, and the crew then engaged the autopilots with GO AROUND still active — that is cause 2 of 12 — which is when the stabilizer began working against the control wheel. The story's “the automation began working to climb” compresses those two steps into one and leaves out that the crew engaged the autopilots themselves. Everything else matches. Text left as supplied. |
| 12.5 | FACTUAL | Anti-pattern, “quietly” and “nothing told the pilots” are right about warnings and slightly strong about feel. The report's cause 5 is that “there was no warning and recognition function to alert the crew directly and actively to the onset of the abnormal out-of-trim condition”, which supports the claim exactly. But cause 3 records that the first officer kept pushing the control wheel “despite its strong resistive force”, so the contest was not silent in the hands, only unannounced. Text left as supplied. |
| 12.6 | UNCLEAR | Tale source is a translation. The AAIC report was read in the English version the FAA hosts, which carries the notice: “Although efforts are made to translate as accurate as possible, only the Japanese version is authentic.” Every figure quoted here appears in that translation; the Japanese original was not consulted. |
| 12.7 | UNCLEAR | Tale, the captain did notice the GO lever itself. The CVR has him telling the first officer “you triggered the GO lever” about five seconds after it happened. What the crew did not recognise, per causes 5 and 6, was the out-of-trim condition and the autopilot override behaviour — which is what the story's “still following its own plan” refers to, so the sentence holds as written. |
| 12.8 | FACTUAL | Design considerations, the once-per-event citation is still Wikipedia. The first consideration's claim about the post-737 MAX change rests on `wikipedia-mcas`, an encyclopedia summary the source note already marks as not a source. Replace it with the FAA airworthiness directive or Boeing's own description of the change before this leaves draft. The brief asked for this flag. |
| 12.9 | EDITORIAL | “Centering” in the first open question is US spelling; the page it replaced used “centring”, and the `gm-techlink` note below uses “centres”. Left as supplied, so the page now spells it both ways. |
| 12.10 | EDITORIAL | Demo invents its data. The pattern's tale is a 1994 approach to Nagoya; the pitch scale, the degree values, the 15-second window and the counter are written for this page. What is taken from the sources is the shape of the failure — a correction that is reversed without being announced. |
| 12.11 | UNCLEAR | Mechanism steps: drafted. Steps 2 and 4 carry sourced notes; the titles, details and the five-step shape are mine. |
| 12.12 | UNCLEAR | Primary source to pull: the KNKT final report (JT610). NTSB ASR-19-01 has been pulled and added as a source — it carries Boeing's four pilot-response assumptions and the fatality figures, but not the repeated-activation or post-crash design-change claims, which stay on secondary sources. |

## 13 · Operator-to-Operator Handover

`content/patterns/13-operator-to-operator-handover.md`

| # | Severity | Item |
|---|---|---|
| 13.1 | UNCLEAR | Cite the Cullen Report (1990) itself when available. |
| 13.2 | FACTUAL | Anti-pattern, “no clear procedure for shift handovers at all” is in tension with the IChemE bulletin. That sentence is cited to a trade-news summary of Cullen. LPB 261 describes a procedure that did exist and was not kept to: “The Occidental procedure required maintenance and operations to meet, inspect the work site and sign off permits together. However, the operators were busy with their own handovers at the same time, and the practice developed where maintenance would” leave the paperwork instead. “Routinely not followed” is well supported; “no clear procedure at all” needs the Cullen Report itself to stand. Text left as supplied. |
| 13.3 | FACTUAL | Tale, the sources say condensate, not gas. JESIP calls it “a massive leakage of gas condensate”; LPB 261 has “condensate leaked from the blind flange … The escaping condensate ignited.” The story says “Gas escaped through the temporary cover”. Text left as supplied. |
| 13.4 | UNCLEAR | Tale, two details the sources add that the story leaves out, neither contradicting it. The blind flange “was not, however, leak-tested or pressure-tested” and was “not fully tightened up” — which is why it leaked. And LPB 261 notes the restart was not unreasonable on what the night shift knew: maintenance on pump A “had not yet started and the problem with pump A was not especially serious”. |
| 13.5 | UNCLEAR | Tale, “that day” is the day shift reading, which the sources support indirectly. LPB 261 dates the isolation to “the evening of 06 July 1988” and records that the associated permits “had been suspended overnight”. The valve work being done and left unfinished before the night shift came on is the sense both sources carry. |
| 13.6 | UNCLEAR | I-PASS, “no increase in handoff duration” is slightly stronger than the paper. Starmer et al. report “no significant changes … in the duration of oral handoffs (2.4 and 2.5 minutes per patient, respectively; P=0.55)”. The mean rose a tenth of a minute and the difference was not significant, so “no significant change” is the exact claim. The In the field entry avoids the phrase; the source note states the figures. |
| 13.7 | UNCLEAR | Starmer et al. was read from a mirror. The URL in the brief, the Washington University Digital Commons deposit, serves HTML rather than the PDF to a non-browser client; the same deposited document was read in full from the Lehigh Valley Health Network repository copy. The citation points at the Washington University record, which is the canonical deposit. Europe PMC confirms the paper is not open access there (PMID 25372088), so there is no PMC copy to prefer. |
| 13.8 | EDITORIAL | Tale heading reordered into the page’s own shape. The brief gives one line, “July 6, 1988 · Piper Alpha oil platform · North Sea”; the CautionaryTale component takes a title and renders “date · place” beneath it, so the page shows “Piper Alpha oil platform” with “July 6, 1988 · North Sea” under it, the same as every other converted page. No words changed. |
| 13.9 | EDITORIAL | Design considerations, six words added to the last item. The brief’s text ends “is exactly the question asked afterwards” and then asks for a link to Provenance Log; a bare trailing link reads badly, so the sentence now ends “… asked afterwards, which is what Provenance Log is for”, with the link on the pattern name. Nothing else in the item changed. |
| 13.10 | EDITORIAL | Two source notes rewritten outside the brief, both to replace a paraphrase with the verified wording. `icheme-lpb261` said “carried in the research for the sequence” and now quotes the bulletin; `starmer-2014` said “cited here via the AHRQ PSNet record rather than the NEJM paper itself”, which stopped being true when the URL changed, and now quotes the paper and gives the duration figures. Neither note is body text. |
| 13.11 | EDITORIAL | Front matter, two fields changed outside the brief. `domains` gained `medical`, because In the field now carries the I-PASS entry and the filters read that list; `updated` moved to 2026-11-07. |
| 13.12 | EDITORIAL | Demo prints an arrow glyph. “day shift → night shift” is the brief’s wording and the only arrow inside a printed display anywhere on the site; `.fc-line` is a fixed monospace stack, so if a font in it lacks U+2192 that one character falls back. Checked in Chrome on Windows and it renders; worth a second look on another platform. |
| 13.13 | UNCLEAR | Mechanism steps: drafted. Steps 2 and 4 carry sourced notes; the five-step shape, the titles and details are mine. |
| 13.14 | EDITORIAL | Demo invents its data. The sources describe a platform control room in 1988; the two-pump console, the field names and the equipment list are written for this page. What is taken from them is the shape of the failure — two true facts held apart, and a handover that relied on someone joining them up. |

## 14 · Alert Triage

`content/patterns/14-alert-triage.md`

| # | Severity | Item |
|---|---|---|
| 14.1 | FACTUAL | Tale, two claims that its sources do not carry. The Commission's report says “a cascade of alarms that numbered 100 within minutes”, not more than a hundred; the tale says “more than a hundred”. And the 1979 report nowhere states how much of the core melted — it describes melting as the risk, and records that core damage was “far more substantial than either had anticipated”. The “about half the core melted” figure comes from the later core examinations, via the NRC, which is not a source on this page. Both sentences are as supplied; neither has been changed. |
| 14.2 | UNCLEAR | Tale, the printer sentence rests on nrc-printer, which could not be re-read this pass: nrc.gov returns 403 to an automated fetch. The claim stands on the source note already in this file, not on a reading of the document. |
| 14.3 | UNCLEAR | Verified against the Commission's report this pass: the 4 a.m. start (“36 seconds after the hour of 4:00 a.m.”), the stuck-open PORV draining coolant for 2 hours 22 minutes, the operators shutting one high pressure injection pump down and throttling the second to under 100 gallons a minute, Faust's remark, and “the worst accident in the history of commercial nuclear power generation”. |
| 14.4 | FACTUAL | Design consideration 2 is stronger than CS 25.1322. The rule assigns red to Warnings and amber or yellow to Cautions, but 25.1322(f) says other flight-deck uses of red, amber and yellow “must be limited and must not adversely affect flight crew alerting” — and the AMC allows weather radar and terrain displays. “Used for nothing else” is the practice the rule protects, not the rule's own words. |
| 14.5 | FACTUAL | Design consideration 1 compresses the rule's definitions. CS 25.1322(b) distinguishes Warning and Caution by the response (“immediate” versus “subsequent”), but requires immediate flight crew awareness for both. “Act soon” carries the response and drops the awareness. |
| 14.6 | UNCLEAR | Mechanism steps: drafted. Steps 2 and 3 carry sourced notes; the titles, details, and steps 4 and 5 are mine. Step 4 in particular — grouping consequential alarms under their cause — is standard alarm-management practice but is not in the research. |
| 14.7 | EDITORIAL | Demo is a simplified illustration in the shape of the TMI sequence, not plant data, and says so on both panels. The thirty alarm texts are plausible rather than drawn from the record: the Commission's report names some of them, but the list, the arrival order and the split between cautions and consequences are mine. |

### Added 2026-11-21, when the opening story was given per-claim footnotes

| # | Severity | Item |
|---|---|---|
| 14.8 | UNCLEAR | VERIFY the alarm printer claim against nrc-printer. See below. |

> VERIFY: the claim that the alarm printer fell more than two and a half
> hours behind. Confirm it appears in the source currently cited
> (source 3). It is widely repeated in secondary writing. If the cited
> source does not state it, remove the sentence rather than re-cite it.
>
> SETTLED: "about half the core melted" is supported by the NRC
> backgrounder. Do not re-flag.

Checked the same day, from the text layer of the PDF at the nrc-printer URL
(ML19337A432). The figure is there: "the alarm printer on the similar
computer at Unit 2 had a delay time of over two and one-half hours at one
point, and ran more than an hour behind events for over seven hours." The
sentence stays. Two things about the source are worth knowing, and neither
has been changed:

- The words are from ECNP Contention No. 1(a), an intervenor's contention in
  the TMI-1 restart proceeding. The document quotes it in order to answer
  it. The document itself is the licensee's testimony (William P. Hamilton
  and Robert W. Keaten, for Metropolitan Edison, before the Atomic Safety
  and Licensing Board, dated 9/15/80), not NRC testimony. It is hosted on
  the NRC's document system. The response doesn't dispute the figure, and
  it concedes that "the printed record will always be lagging". The
  source's title and its "Observed" note overstate where the figure comes
  from.
- The Kemeny Commission's Overview has "more than 100 alarms went off" in
  the first few minutes. That supports the tale's "more than a hundred",
  which item 14.1 flagged against the Account's "numbered 100". The linked
  copy of the report doesn't contain the Overview. See the tmi-commission
  source note.

Footnotes per claim, as placed in the story:

| Claim in the story | Source |
|---|---|
| More than a hundred alarms, each looking as urgent as the next | tmi-commission |
| The printer fell more than two and a half hours behind | nrc-printer |
| Operators cut back the emergency cooling; about half the core melted | nrc-tmi-backgrounder |
| Worst accident in the history of US commercial nuclear power | nrc-tmi-backgrounder |

## 15 · Stop Anywhere

`content/patterns/15-stop-anywhere.md`

| # | Severity | Item |
|---|---|---|
| 15.1 | FACTUAL | Tale, three wordings changed against the DMV order. The supplied copy said “a hit-and-run driver”; the order says “an unknown third-party vehicle” and never uses the words hit-and-run, so the text says “an unidentified car”. The supplied copy said “her”; the order says only “a pedestrian” and gives no gender, so the text carries no pronoun. The supplied copy said the car was “following a routine to pull over after a collision”; the order says only that it “attempted to perform a pullover maneuver”, so that characterisation has moved out of the tale and into the anti-pattern sentence, where it reads as the argument it is. |
| 15.2 | EDITORIAL | Tale, one word kept that is worth a look: “dragging”. The order does not use it. It says the AV “traveled approximately 20 feet and reached a speed of 7 mph” and that “the pedestrian remained under the vehicle”, which amounts to the same thing, but the word is ours. |
| 15.3 | UNCLEAR | Permit nuance the tale flattens. The car in this incident was operating under Cruise’s *deployment* permit; the order cited here suspends the *driverless testing* permit, reasoning that the behaviour raises the same concern about the test fleet. The DMV suspended the deployment permit as well, but that is a separate document not cited here. “Cruise’s driverless testing permit” is accurate for this source; decide whether the page should say more. |
| 15.4 | FACTUAL | Design consideration 1 is a shade stronger than its standards source. Schneider’s IEC 60204-1 extract reserves red-on-yellow for “emergency operation devices”, which includes emergency switching off. The “and nothing else” reading comes from NFPA 79 via In Compliance: “reserved exclusively for emergency stop applications”. Both are cited; the sentence leans on the second. |
| 15.5 | FACTUAL | Design consideration 3 says the reset is local. ISO 13850 4.1.1.2 as quoted by IDEC requires “intentional human action” and reset “by disengagement of an emergency stop device”, which puts a hand on the device but is not the same as the standard’s separate requirement that reset only be possible at the point of actuation. Read the standard itself before this sentence is treated as settled. |
| 15.6 | FACTUAL | Source ipd-estop has rotted: its URL now serves a different article. Kept without a link because the research carried it, but nothing on this page cites it and it could be dropped. |
| 15.7 | UNCLEAR | Mechanism steps: drafted. Steps 3 and 4 carry sourced notes; the titles, details and the five-step shape are mine. |

### Added 2026-11-21, after source 6 (ipd-estop) was deleted

| # | Severity | Item |
|---|---|---|
| 15.8 | EDITORIAL | CHECK the source list for other entries with no incoming footnote reference. Source 6 was an orphan. Report any others rather than deleting them. |

Item 15.6 above (ipd-estop rotted) is kept as recovered text. The source it
describes has been deleted.

Checked the same day. Every remaining source has at least one incoming
reference, so there are no other orphans:

| # | Source | Referenced from |
|---|---|---|
| 1 | iso-13850 | Design considerations 2 and 3 |
| 2 | iec-60204-colours | Design consideration 1 |
| 3 | dmv-cruise-suspension | `cautionaryTale.sourceId`; In the field, Cruise entry |
| 4 | ai-business-waymo | In the field, Waymo entry |
| 5 | incompliance-colours | Design consideration 1 |

Footnote numbers are not stored in the file. `lib/citations.ts` derives them
from each source's position in the Sources list, grouped by type, and every
reference is a `[cite:id]`. Deleting the last entry renumbered nothing, and
no reference changed.

## 16 · Mode Awareness

`content/patterns/16-mode-awareness.md` (list still live in the file)

| # | Severity | Item |
|---|---|---|
| 16.1 | EDITORIAL | Incident changed from the research's first choice. research/during.md named Asiana 214, but Shared Mental Model (05) already opens with it, its Therefore and its autothrottle demo. Air Inter 148 was added to research/during.md on 2026-11-21 by your call and read from the BEA report itself; Asiana stays as a second In the field example. |
| 16.2 | UNCLEAR | Tale rests on the commission's hypotheses, not an established cause. Report 32.4: the reason for the high descent rate could not be determined with certainty; the vertical mode confusion and the setting error are both rated “assez probables”, and a FCU failure “très peu probable”. The tale says the investigators could not say for certain and gives the outcome the probable hypotheses share (3.3 entered in VS mode), not one of them as fact. |
| 16.3 | UNCLEAR | Verified against the French report this pass (translations are mine): 20 January 1992, 18:20 UTC (synopsis); Lieu-dit “La Bloss”, Commune de Barr (Bas-Rhin), near Mont Sainte-Odile (synopsis); descent begun at the published 11 NM; 3300 ft/mn against about 800 ft/mn; reference “presque sûrement” HDG-VS (ch. 3.1); vertical speed about four times the reference, not perceived (32.5); impact 10.5 NM from the runway 05 threshold (ch. 3.1); 2 flight crew, 4 cabin crew and 90 passengers on board, 5 crew and 82 passengers killed, nine survivors (synopsis, ch. 1.2, ch. 3.1). 2 + 4 + 90 = 96 and 5 + 82 = 87. |
| 16.4 | EDITORIAL | Tale: “a ridge near Mont Sainte-Odile” is my wording for Mont La Bloss (826 m). The title uses Mont Sainte-Odile because that is the name the accident is known by and the one the report's own title uses. |
| 16.5 | UNCLEAR | Source is the French original. An English translation is hosted at faa.gov (sites/faa.gov/files/2022-11/Accident_Report_Eng.pdf) but returned 403 to an automated fetch and was not read. Swap the URL if you would rather link the English, after checking it says the same. |
| 16.6 | UNCLEAR | Source year: 1993 from the report's own account of its schedule (final meetings and the consultation in 1993). A search result gives 26 November 1993 as the date; not confirmed in the text. |
| 16.7 | UNCLEAR | Without caption, “about three times taller”: 22.335 says the selected values are “beaucoup plus lisible (hauteur triple)” than the mode indication. |
| 16.8 | UNCLEAR | Drafted, needs your review: risk, reversibility, autonomy [1, 4], the five mechanism steps, the With side, and the cardIntent. None is from research. |
| 16.9 | UNCLEAR | Not carried over from research: the Asiana “wake-up” finding (that an automatic wake-up in HOLD would likely have added power about 20 seconds before impact). Research has it from Swissinfo/Reuters only; the primary, NTSB AAR-14/01, still needs pulling for that finding. AIN and Business & Commercial Aviation articles also left out: not read this pass. |
| 16.10 | UNCLEAR | What Airbus changed on the FCU after the accident is not stated in the report text read here, so the page does not claim it. |
| 16.11 | EDITORIAL | Needs demo (see DEMOS.md). It must not repeat the autothrottle demo Shared Mental Model already uses; the concept in DEMOS.md is built on the shared knob and window instead. |
| 16.12 | EDITORIAL | Worth settling: whether Mode Awareness stands apart from Shared Mental Model. Both now open on vertical-mode error in aviation; Shared Mental Model's Therefore is close to this pattern's intent. |
