# Pre-index fix list

Derived from `docs/review-audit-2026-11-21.md`. Scope: every FACTUAL item still live on a
published page. Nothing here needs new research except where Group E says so.

Working rule: the audit's phrase **"Text left as supplied"** means the error is live.
**"Rewritten"** or **"corrected"** means it is already fixed — those are not on this list.

Close-out order: A → B → C. Group D needs no work. Group E can wait, but see the note.

---

## Group A — word swaps

Exact replacements. The audit gives the source wording for each.

### A1 · `content/patterns/01-handoff.md` — audit 1.7 (also closes 8.12)

Tale. The speed is attached to the wrong moment.

- **Find:** `about 40 mph`
- **Replace:** `about 45 mph`

HAR-19/03 has the SUV approaching the site at 45 mph, and 44.1 mph recorded 5.6 seconds
before impact. 40.5 mph is its speed 0.2 seconds before impact, and 39 mph is the impact
speed — so the drafted figure is roughly the impact speed sitting in a sentence about
detection.

Item 8.12 on Provenance Log flags this same sentence from the other side. Fixing it here
closes both.

### A2 · `content/patterns/02-glass-box.md` — audit 2.1

Tale heading. Neither source puts the engagement on the border.

- **Find:** `Iraq–Kuwait border`
- **Replace:** `Kuwait`

The MoD summary gives `LOCATION: Kuwait` and has ZG710 returning to Ali Al Salem Air Base
in Kuwait, struck at 17,938 ft as it began its descent. Hansard says only that it was shot
down during Operation TELIC.

### A3 · `content/patterns/02-glass-box.md` — audit 2.2

Tale. Neither source gives the crew's sex.

- **Find:** `both men`
- **Replace:** `both crew`

The MoD summary says "CREW: Two – pilot and navigator" and "Both members of the crew were
killed instantly."

### A4 · `content/patterns/13-operator-to-operator-handover.md` — audit 13.3

Tale. Both sources say condensate, not gas.

- **Find:** `Gas escaped through the temporary cover`
- **Replace:** `Condensate escaped through the temporary cover`

JESIP calls it "a massive leakage of gas condensate." LPB 261: "condensate leaked from the
blind flange … The escaping condensate ignited."

### A5 · `content/patterns/13-operator-to-operator-handover.md` — audit 13.2

Anti-pattern. A procedure existed; it wasn't followed.

- **Find:** `no clear procedure for shift handovers at all`
- **Replace:** `a shift-handover procedure that was routinely not followed`

LPB 261 describes the Occidental procedure — maintenance and operations were to meet,
inspect the work site and sign off permits together — and records that "the practice
developed where maintenance would" leave the paperwork instead. "Routinely not followed" is
well supported by the bulletin. "No clear procedure at all" would need the Cullen Report
itself, which the page does not cite.

---

## Group B — rewrites

The audit says what the source does support. Wording below is a starting draft, not a
replacement for your voice — the constraint is the claim, not the phrasing.

### B1 · `content/patterns/01-handoff.md` — audit 1.8 · **do this one first**

Tale. This is the page's load-bearing claim and the report contradicts it.

- **Current:** `it wasn't designed to alert her`

The ADS *was* designed to alert: "If a collision could not be avoided with the application
of maximum allowed braking, the system was designed to send an auditory alert to the vehicle
operator while simultaneously initiating gradual vehicle slowdown." It sent that alert 0.2
seconds before impact.

What the report supports is narrower and still damning — the system had no way to *request a
takeover*, and it said nothing at the moment it recognised the emergency: "No alert was
given to the operator when action suppression was initiated."

- **Draft replacement:** `it had no way to ask her to take over. When it recognised the
  emergency, 1.2 seconds before impact, it told her nothing; the one alert it was built to
  send announced its own braking, and that arrived 0.2 seconds before the collision.`

The narrower claim is the better one for the pattern anyway: a system that can speak but
cannot ask is a sharper illustration than a system that cannot speak.

### B2 · `content/patterns/01-handoff.md` — audit 1.9

Anti-pattern. Same ambiguity, smaller.

- **Current:** `it had no way to ask her`
- **Draft replacement:** `it had no way to ask her to take over`

Accurate as drafted if "ask" means "request a takeover"; wrong if a reader hears "no alert
of any kind." Three words close it.

### B3 · `content/patterns/03-graceful-degradation.md` — audit 3.4

Anti-pattern. Contradicted narrowly — the ECAM did announce the reconfiguration.

- **Current:** `Nothing told them what it could still be trusted with`

What the BEA report supports is that no message identified the *origin* of the failure: "No
failure message is provided that identifies the origin of these other failures: in
particular, the rejection of the ADR's and of the speed measurements."

- **Draft replacement:** `Nothing told them why the protections had gone, or which failure
  had taken them.`

### B4 · `content/patterns/03-graceful-degradation.md` — audit 3.3

AF447 is now a one-sentence `In the field` entry (per 3.2), so this is a single sentence.

- **Current claim:** the crew `never worked out which protections were gone`

The PNF called out "alternate law protections" at 2 h 10 min 16 and read the reconfiguration
off the ECAM between 2 h 10 min 18 and 2 h 10 min 25. The BEA's own conclusion is hedged:
"it is possible that the PF was not fully aware of this reconfiguration and of what it
implied."

- **Draft replacement:** `the reconfiguration was announced and read aloud, and still did
  not register as a change in what the aircraft would protect them from.`

Shown and not registered — the same construction already used on Shared Mental Model (5.2),
which makes it a consistency win as well as a correction.

### B5 · `content/patterns/12-return-of-control.md` — audit 12.4

Tale. Two steps compressed into one, and the crew's own action dropped.

- **Current:** `the automation began working to climb`

The AAIC report has the GO lever cause a thrust increase that pushed the aircraft above the
glide path; the crew *then* engaged the autopilots with GO AROUND still active — cause 2 of
12 — and that is when the stabilizer began working against the control wheel.

- **Draft replacement:** `the thrust increase pushed them above the glide path, and when the
  crew engaged the autopilots with go-around still active, the stabilizer began working
  against the control wheel.`

Worth fixing carefully: the compressed version reads as the automation acting alone, which
makes the pattern's point more cheaply than the record allows.

### B6 · `content/patterns/12-return-of-control.md` — audit 12.5

Anti-pattern. Right about warnings, slightly strong about feel.

- **Current:** `quietly`, and `nothing told the pilots`

Cause 5 supports the warning claim exactly: "there was no warning and recognition function
to alert the crew directly and actively to the onset of the abnormal out-of-trim condition."
But cause 3 records the first officer pushing the control wheel "despite its strong
resistive force" — so the contest was felt in the hands, just never announced.

- **Draft fix:** replace `quietly` with `unannounced`, and let the sentence say the
  resistance was in the control wheel but nowhere on the instruments.

### B7 · `content/patterns/02-glass-box.md` — audit 2.4

Anti-pattern. The page presents the pattern's reading as a finding.

- **Current:** `The system gave the battery's crew an answer… but not the evidence behind it`

The Board's findings do not describe what the Patriot console displayed, so this sentence is
an inference. Everything it rests on *is* supported: the broad engagement criteria, the
absent IFF response, the one-minute decision, and crews "trained to react quickly, engage
early and to trust the Patriot system."

Two honest options:

1. Rebuild the sentence from the supported facts and let the reader draw the conclusion.
2. Keep the reading and mark it as the library's inference rather than the Board's finding.

Option 1 is stronger for a library whose currency is provenance. Option 2 is faster. Either
beats the current state, which asserts something no source carries.

---

## Group C — citation fixes, text stays

The sentence on the page is fine. The thing pointing at it is wrong.

### C1 · `content/patterns/01-handoff.md` — audit 1.11

Source note on `ntsb-har-19-03` still reads "The system never alerted the safety operator."
Wrong on the same point as B1, and it will outlive the tale fix if you don't change both
together.

- **Draft replacement:** `The system had no way to request a takeover. The one auditory
  alert it was designed to send announced its own slowdown, 0.2 seconds before impact.`

Also note audit 1.12: "safety operator" is not the report's term — HAR-19/03 says "vehicle
operator" throughout. The audit kept it for site consistency. Fine to leave, but if you ever
normalise it, do it library-wide in one pass.

### C2 · `content/patterns/01-handoff.md` — audit 1.2, superseded by 1.17

The death toll is **80** (corrected 2026-11-22). CIAF p. 25 gives 79, then a further death
reported by Renfe Operadora. The explanation first given here was wrong and is withdrawn.
The remaining work is the footnote, not the number —
the paragraph currently points at the CIAF report for a figure the audit's own footnote table
also assigns to `ciaf-santiago-2014`, so confirm the marker sits on the right sentence and
close 1.2.

Do not re-flag this one.

### C3 · `content/patterns/14-alert-triage.md` — audit 14.1, superseded by 14.8

Both halves are resolved in the text's favour; only the sources need attention.

- `more than a hundred` is **supported** — the Kemeny Commission's Overview has "more than
  100 alarms went off" in the first few minutes. But the linked copy of the report does not
  contain the Overview, so the footnote currently points at a document that does not carry
  the claim. Fix the link or the source note.
- `about half the core melted` is **supported** by the NRC backgrounder, and the footnote
  table already assigns it to `nrc-tmi-backgrounder`. Nothing to do.

Also from 14.8, and worth doing while you're in this file: the `nrc-printer` source's title
and its "Observed" note overstate where the two-and-a-half-hour figure comes from. The words
are from an intervenor's contention (ECNP No. 1(a)) quoted inside the licensee's testimony —
Metropolitan Edison's, not the NRC's — which the NRC merely hosts. The figure is real and
the response concedes it. The attribution is what's off.

---

## Group D — already closed, do not rework

Listed so you can strike them without re-reading the file.

| Audit item | Why it's closed |
|---|---|
| 10.5 | The anti-pattern sentence calling the speed trim system "a different system entirely" was removed with the rewrite. Per 10.2, "the claim is gone with it." |
| 10.4, part | The `about 12 minutes after takeoff` and `Java Sea, off Jakarta` details no longer appear on the page — JT610 is now a one-sentence `In the field` entry. Per 10.2, those flags "no longer describe anything on the page." |
| 4.1–4.4 | All four Therac-25 items say **Rewritten** or **corrected**. Done. |
| 7.2, 7.3 | Both say **Rewritten** / **Narrowed**. Done. |
| 8.17–8.20 | All say **corrected** / **narrowed**. Done. |
| 11.7–11.9 | All say **Rewritten** or now-sourced. Done. |
| 6.1 | **corrected** — the page, tale and demo all say miles. Done. |
| 15.1 | **changed against the DMV order.** Done. |

One survivor from 10.4 worth checking by eye: the sources say only "Boeing 737 MAX," not
"a new Boeing 737 MAX 8." If that phrase is still in the surviving sentence, trim it to
match. If the rewrite already dropped it, strike 10.4 entirely.

---

## Group E — needs a document pulled

Not word fixes. Each is a sentence standing on a source nobody has read, or on no source at
all. These do not block indexing the way Group A–C do, but they are the items that matter
most to a reader who follows footnotes — which is the reader this library is for.

| Audit | File | What's needed |
|---|---|---|
| 2.5 | `02-glass-box.md` | The rubber-stamping claim has no source. Chen et al. 2014 couldn't be checked — DTIC returns 403 to automated requests. Read the PDF, or restate the claim as the library's own position. |
| 2.6 | `02-glass-box.md` | Chen 2014 and Boyce 2015 both unread; the confidence consideration is cited on the strength of this file's own prior note. Confirm before the page leaves draft. |
| 14.4 | `14-alert-triage.md` | "Used for nothing else" is the practice CS 25.1322 protects, not its words — 25.1322(f) says other red/amber/yellow uses "must be limited," and the AMC allows weather radar and terrain displays. Soften to the rule's actual scope. |
| 14.5 | `14-alert-triage.md` | CS 25.1322(b) separates Warning from Caution by response — immediate vs subsequent — but requires immediate crew awareness for **both**. "Act soon" keeps the response and drops the awareness. |
| 15.4 | `15-stop-anywhere.md` | Design consideration 1's "and nothing else" leans on NFPA 79 via In Compliance, not on the IEC 60204-1 extract cited beside it. Decide which carries the sentence. |
| 15.5 | `15-stop-anywhere.md` | Design consideration 3 says the reset is local. ISO 13850 4.1.1.2 as quoted by IDEC requires intentional human action and reset by disengagement — related to, but not the same as, the standard's separate point-of-actuation requirement. Read the standard. |
| 12.8 | `12-return-of-control.md` | The post-737 MAX change rests on `wikipedia-mcas`, which the source note already marks as not a source. Replace with the FAA airworthiness directive or Boeing's own description. |
| 1.4 | `01-handoff.md` | The CIAF report, the 2024 ruling and the IRJ article were supplied by title only. The opening story rests on two sources a reader cannot follow. |
| 11.1 | `11-readiness-check.md` | The Freeman Hospital opening has **no citable source at all** — the coroner's report could not be linked. Also blocks the month-only dateline (11.2), which needs the day from that report. |
| 10.3 | `10-explainable-fault.md` | Every JT610 claim comes from the AirlineRatings write-up or Leeham's analysis. Cite the KNKT final report. |

---

## Not on this list, but decide before indexing

Neither is an error. Both are things a knowledgeable reader would catch, and they cost more
credibility than a speed figure, because the library's claim is that these patterns are
distinct.

**1.3 — does The Handoff cover one failure or two?** The anti-pattern was renamed from "The
Handoff That Never Came" to "The Unannounced Handoff." Those are different failures: the
first is Tempe, the second is Santiago. The rest of the page still argues the first — the
opening design consideration is "Never depend on someone you can't alert," and the `with`
caption turns on acknowledgement.

**12.2 — same question for Return of Control.** Renamed from "The Tug-of-War" to "Resumes on
Its Own," while the mechanism's "Machine stands back / without arguing," the "Give the person
the last word" consideration, the Lion Air entry and the `with` caption all still argue the
contest.

And further out, **16.12**: whether Mode Awareness survives as its own pattern now that it
and Shared Mental Model both open on vertical-mode error in aviation. Fifteen patterns with
clean edges beats sixteen with a seam.

---

## Suggested commits

Keep them separable so the record reads cleanly later:

```
fix(handoff): correct the alert claim against NTSB HAR-19/03
fix(content): correct place, crew and substance details against sources
fix(content): narrow three claims to what the reports support
fix(sources): correct source notes and footnote targets
```

Group A and B1–B2 are the set that has to be true before `noindex` comes off.
