---
number: 10
name: "Explainable Fault"
intent: "When something goes wrong, the system names the actual fault in the operator's terms and points to what to do about it."
# The index card's line (redesign-handoff.md §2). Drafted on the redesign
# canvas, 2026-11-05 — not yet reviewed.
cardIntent: "The system names the actual fault in the operator's terms and points at what to do."

moment: failure
trustJobs: [know, recover]
risk: critical
reversibility: irreversible
autonomy: [1, 4]
domains: [aviation]

status: draft
updated: "2026-11-07"

steps:
  - title: "Fault occurs"
    detail: "A sensor, link or subsystem fails"
  - title: "Diagnose it"
    detail: "Find the cause behind the symptoms"
  - title: "Name it in the operator's terms"
    detail: "The condition, not an error code"
    key: true
  - title: "Point at the response"
    detail: "The procedure that goes with it"
  - title: "Record it"
    detail: "So maintenance inherits the diagnosis"

antiPattern: "Symptoms Without a Cause"

interface:
  component: explainable-fault

# Shown above the demo. This one stages a real accident with invented
# readouts, so it says so rather than leaving the reader to assume the lines
# are from the recorder.
# VERIFY: the demo now stages the Nogales ground control station rather than a
# flight deck. Nothing in it is a reading from CHI06MA121 — the ALT and
# AIRSPEED behaviour, the "ENGINE —" placeholder and the wording of the named
# alert are written for this page. What has to be checked is the one claim the
# demo rests on: that the condition lever on the payload operator's console
# becomes the engine fuel control when that console is flying, and that its
# cutoff position produced no annunciation.
demoNote: "Simplified illustration, not real ground station data."

# VERIFY against NTSB brief CHI06MA121 and Safety Recommendations A-07-70
# through -86 before this leaves draft: the time of day ("before dawn") and
# that this was a border patrol flight; that it was the pilot's console in the
# ground control station that locked up, and that he transferred control to
# the payload operator's console rather than to a spare; that on each console
# the same lever is the camera iris control under the payload operator and the
# engine condition lever under the pilot; that the position the lever was
# sitting in corresponded to fuel cutoff; that nothing in the station
# annunciated the cutoff, so the pilot saw the descent without its cause;
# "about 10 miles northwest of Nogales International Airport" for the crash
# site; and that nobody on the ground was hurt.
cautionaryTale:
  title: "CBP Predator B drone"
  date: "April 25, 2006"
  place: "Nogales, Arizona"
  story: >-
    Before dawn on a border patrol flight, the pilot's console in the ground
    control station locked up. He switched control to the identical console
    beside it, the one the camera operator used. On that console, the lever
    that adjusts the camera's iris becomes the engine's fuel control when the
    console is flying the aircraft, and it was sitting in the position that
    meant fuel cutoff. The engine stopped. The pilot saw the
    drone losing altitude, but nothing told him why. The Predator B came down
    in the desert about 10 miles northwest of Nogales International Airport.
    No one was hurt.
  sourceId: ntsb-chi06ma121

# Which of the sections above the fold are freshly written and unchecked.
drafts:
  tale: true
  antiPattern: true
  demo: true
  examples: true

therefore: >-
  Name the fault itself, not just its symptoms, and record it so it reaches
  the people who can fix it.

without:
  steps: ["Fault occurs", "Symptoms only", "Wrong diagnosis"]
  # VERIFY against NTSB brief CHI06MA121 and A-07-70 through -86: that the
  # ground control station presented altitude and airspeed but annunciated
  # nothing about the fuel condition lever or the cutoff; and that the pilot
  # did not identify the lever as the cause during the descent. "Falling
  # altitude, decaying speed" is this page's own shorthand for what the
  # station showed, not a quotation from the brief.
  caption: "The ground station showed every symptom of an engine failure (falling altitude, decaying speed) but never named the cause: one lever, on one console, in the cutoff position. The pilot had to infer it, and didn't."

with:
  steps: ["Fault occurs", "Cause named", "Response to hand", "Fault recorded"]
  caption: "The alert names the condition in terms the operator recognizes and carries the procedure with it, so the diagnosis isn't left to inference. Because the fault has a name, it's logged and reaches maintenance before the next flight."

related:
  - slug: graceful-degradation
    type: complements
    note: "Degradation is the step down; this is the part that says which fault caused it. A fallback nobody can name is hard to work with."
  - slug: learning-loop
    type: complements
    note: "An unnamed fault cannot feed back. Without the alert, the JT610 crew could not document the faulty sensor, so it was not available to help maintenance. JT610 is now an In the field entry on this page rather than its opening."

review:
  - "Opening story replaced this pass: the CBP Predator B at Nogales in, Lion Air 610 out. Nothing in the new tale, the new anti-pattern or the rethemed demo has been read against CHI06MA121 or the A-07-70/-86 recommendation letter — all three are drafted from the brief, all three carry `drafts:` flags, and the VERIFY comments in this frontmatter list what to check."
  - "JT610 is now an In the field entry rather than the opening, cut to one sentence and keeping both secondary sources. The flags below were written about it as the tale and the anti-pattern. The ones about the tale's timeline and crash site no longer describe anything on the page; the one about “a different system entirely” described a sentence the new anti-pattern removed, and the claim is gone with it. They are kept as the record of what was checked, not as live flags."
  - "Story rests on secondary sources; cite the KNKT final report when available. Every JT610 claim on this page comes from the AirlineRatings write-up of that report or from Leeham's analysis, not from the report itself."
  - "Tale, two details neither cited source carries. “About 12 minutes after takeoff” and “Java Sea, off Jakarta” are not in the AirlineRatings or Leeham pieces — AirlineRatings gives the date and the 189 dead but no timeline or crash site, and the Leeham article is about the flight-deck sequence. Both are almost certainly right and will be in the KNKT report; they are unsourced on this page until it is pulled. “A new Boeing 737 MAX 8” is likewise not in either source, which say only “Boeing 737 MAX.” Text left as supplied."
  - "Anti-pattern, one claim a cited source contradicts. “The speed trim system, a different system entirely” is not how the sources describe it: AirlineRatings says “MCAS was an extension of the existing speed trim system,” and Leeham says MCAS's “intermittent trimming, similar to Speed Trim, caused the crew of JT043 to think it was the cause,” since “the only system they know with this behavior was Speed Trim.” The captain's guess was closer to right than “a different system entirely” allows — which arguably strengthens the pattern, because it shows a competent diagnosis still failing without the alert. Text left as supplied."
  - "Demo: the checklist line reads “CHECKLIST  AOA DISAGREE” — the checklist named for the condition, which is the pattern's own logic. No source here names a real 737 checklist for this alert, so the label is drafted, not sourced. The demo now carries “Simplified illustration, not real flight data.” above it, which DEMOS.md previously argued against as a class; the exception is noted there."
  - "Mechanism steps: drafted. The research has definition, incident and interface example but no mechanism; the two step notes are sourced, the titles and details are not."
  - "Verified against the cited sources this pass. AirlineRatings on the KNKT final report: “the October 29, 2018 tragedy that killed 189 people”; “an alert telling pilots that the plane's two angle-of-attack sensors were giving different readings was not working”; “the lack of an angle-of-attack disagree alert meant a miscalibrated AOA sensor could not be documented by the flight crew and was therefore not available to help maintenance identify the miscalibrated AOA sensor”; and that MCAS's “reliance on a single sensor was deemed appropriate.” Leeham: the stick shaker at rotation on the captain's side, IAS DISAGREE and ALT DISAGREE on his PFD, the captain fighting MCAS, and the previous flight's captain writing “Speed Trim trimmed in the wrong direction.” MIT 16.422: “The icon is displayed next to an EICAS message whenever there is an ECL checklist that needs to be completed,” and “When an alert message is displayed, the pilot simply pushes the CHKL button and the correct non-normal checklist is displayed.” Amershi guideline 11 is “Make clear why the system did what it did.”"

openQuestions:
  - "How specific should the named cause be when the system can't tell which of several faults it's seeing? Naming the wrong cause confidently is worse than showing the symptoms, and the honest middle ground, a short list of candidates, is harder to act on under time pressure."

sources:
  - id: ntsb-chi06ma121
    title: "Brief of Accident CHI06MA121 (Predator B, Nogales, Arizona, April 25, 2006), and Safety Recommendations A-07-70 through A-07-86"
    author: "National Transportation Safety Board"
    year: 2007
    url: "https://www.ntsb.gov/safety/safety-recs/RecLetters/A07_70_86.pdf"
    type: incident-report
    note: "Observed, and the source for the opening story. The brief was adopted October 31, 2007; the recommendation letter covering unmanned aircraft ground control stations was issued alongside it. Not yet read against this page: every figure in the tale and the anti-pattern above is drafted from the brief supplied with the rewrite, and the VERIFY comments in this file's frontmatter list what has to be checked. The reason this incident replaced a flight-deck one is that the cause here was a control's meaning changing underneath the operator — the strongest possible case of symptoms arriving without a nameable cause."
  - id: airlineratings-knkt
    title: "Lion Air MAX report finds Boeing, airline, pilots contributed to tragedy"
    author: "AirlineRatings"
    year: 2019
    url: "https://www.airlineratings.com/articles/lion-air-max-report-finds-boeing-airline-pilots-contributed-tragedy"
    type: article
    note: "Secondary reporting on the KNKT final report. The source for the miscalibrated angle-of-attack sensor, the inoperative AOA DISAGREE alert, and the finding that without the alert the sensor could not be documented by the crew and so never reached maintenance."
  - id: leeham-jt610
    title: "Bjorn's Corner: Analysing the Lion Air JT610 crash, Part 3"
    author: "Leeham News"
    year: 2019
    url: "https://leehamnews.com/2019/11/15/bjorns-corner-analysing-the-lion-air-jt610-crash-part-3/"
    type: article
    note: "Secondary. The symptoms the crew actually saw — stick shaker at rotation, IAS DISAGREE and ALT DISAGREE on the captain's display — and the previous flight's captain logging the trim behaviour as “Speed Trim trimmed in the wrong direction”. Also records that MCAS was built on the speed trim system and behaved like it."
  - id: mit-16422
    title: "16.422 Human Supervisory Control of Automated Systems — alerting systems"
    author: "MIT OpenCourseWare"
    year: 2004
    url: "https://ocw.mit.edu/courses/16-422-human-supervisory-control-of-automated-systems-spring-2004/8d934ba66f80b2ca1f6f82cb0ee3e4bf_040804alertsys_1.pdf"
    type: talk
    note: "Observed. Course material on the 777 EICAS: alerts are defined as operational or system conditions, a checklist icon appears beside a message whenever an electronic checklist needs completing and clears when it is done, and pressing CHKL brings up the right non-normal checklist rather than leaving the crew to find it."
  - id: amershi-2019
    title: "Guidelines for Human-AI Interaction"
    author: "Saleema Amershi et al."
    year: 2019
    url: "https://www.microsoft.com/research/blog/guidelines-for-human-ai-interaction-design/"
    type: paper
    note: "CHI 2019. Guideline 11 is “Make clear why the system did what it did” — “Enable the user to access an explanation of why the AI system behaved as it did.” The same requirement stated for software."
  - id: pair-guidebook
    title: "People + AI Guidebook — Errors + Graceful Failure"
    author: "Google PAIR"
    url: "https://pair.withgoogle.com/chapter/errors-failing/"
    type: article
    note: "“Don't miss an opportunity to explain your AI system.” The chapter treats an unexplained action as itself a kind of error — the system is “working as intended,” but the actions “aren't well-explained” — and asks products to “explain why a certain result couldn't be given and provide alternative paths forward”. It also names the cost of ungrouped symptoms: “Signal crashes increase the user's mental load because the user has to parse multiple information sources to figure out what happened, and what action they need to take.”"
---

## Design considerations

- **Name the condition, not the code.** The operator should recognize what failed without looking anything up.
- **Group symptoms under their cause.** A stick shaker, two disagree alerts and moving trim are one fault, not four. Leaving them ungrouped makes the operator "parse multiple information sources to figure out what happened, and what action they need to take" — which is [Alert Triage](/patterns/alert-triage)'s problem, met here from the other side.[cite:pair-guidebook]
- **Point to the response.** On the 777, the message names the condition and an icon beside it shows there's a checklist to run; pressing CHKL brings up that checklist rather than leaving the crew to pick one.[cite:mit-16422]
- **Record what you name.** Naming the fault is what makes it reportable, so it reaches maintenance before the next flight.[cite:airlineratings-knkt]
- **Explain what the system did and why.** Stated for software as Amershi's eleventh guideline, "Make clear why the system did what it did", and by PAIR as an error in its own right when a system's actions aren't well explained.[cite:amershi-2019][cite:pair-guidebook]

## In the field

<!-- VERIFY: the Lion Air 610 entry below is this page's displaced opening
     story, cut to one sentence and keeping both of its sources. What to check
     against the KNKT final report, when it is pulled, is what this file's
     review list already records: that the AOA DISAGREE alert was inoperative
     on that airframe, and that the stick shaker, the IAS/ALT disagreement and
     the nose-down trim were all present with no alert naming the sensor. -->
**Observed · Aviation.** Lion Air 610. The crew had the stick shaker, disagreeing instruments and runaway trim, but no alert named the faulty sensor behind them.[cite:airlineratings-knkt][cite:leeham-jt610]

**Observed · Aviation.** The 777's crew alerting pairs each message with a checklist indicator: the icon sits beside the message while its checklist is outstanding and clears once it is done, so the alert carries its response rather than just its name.[cite:mit-16422]

## Notes

Symptoms are not a diagnosis. That's why the last step of this pattern is recording rather than displaying: naming the condition is what makes it travel, from the crew to maintenance to the next flight.
