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
demoNote: "Simplified illustration, not real flight data."

cautionaryTale:
  title: "Lion Air Flight 610"
  date: "October 29, 2018"
  place: "Java Sea, off Jakarta"
  story: >-
    Minutes after takeoff from Jakarta, the crew of a new Boeing 737 MAX 8 had
    a stick shaker (the stall warning that shakes the controls) rattling in
    their hands, airspeed and altitude readings that disagreed, and trim that
    kept pushing the nose down. The cause was a single faulty angle-of-attack
    sensor, but the alert designed to name it, AOA DISAGREE, wasn't working on
    that aircraft. The crew fought the nose-down trim again and again without
    ever learning what was causing it. About 12 minutes after takeoff, the
    airplane crashed into the Java Sea, killing all 189 people on board.
  sourceId: [airlineratings-knkt, leeham-jt610]

therefore: >-
  Name the fault itself, not just its symptoms, and record it so it reaches
  the people who can fix it.

without:
  steps: ["Fault occurs", "Symptoms only", "Wrong diagnosis"]
  caption: |
    The crew had symptoms but no diagnosis. A stick shaker, disagreeing
    instruments and runaway trim all pointed in different directions, and the
    one alert that could have tied them together was silent. The captain on
    the previous day's flight had blamed the same behavior on the speed trim
    system, a different system entirely.[cite:leeham-jt610] When effects
    arrive without their cause, people reach for whatever system best explains
    what they can see.

    The silence cost more than one flight. Without the alert, the crew
    couldn't document the faulty sensor, so it never reached
    maintenance.[cite:airlineratings-knkt] A fault that can't be named can't
    be reported, a fault that can't be reported can't be fixed, and the next
    crew meets it too.

with:
  steps: ["Fault occurs", "Cause named", "Response to hand", "Fault recorded"]
  caption: "The alert names the condition in terms the operator recognizes and carries the procedure with it, so the diagnosis isn't left to inference. Because the fault has a name, it's logged and reaches maintenance before the next flight."

related:
  - slug: graceful-degradation
    type: complements
    note: "Degradation is the step down; this is the part that says which fault caused it. A fallback nobody can name is hard to work with."
  - slug: learning-loop
    type: complements
    note: "An unnamed fault cannot feed back. Without the alert, the JT610 crew could not document the faulty sensor, so it was not available to help maintenance."

review:
  - "Story rests on secondary sources; cite the KNKT final report when available. Every JT610 claim on this page comes from the AirlineRatings write-up of that report or from Leeham's analysis, not from the report itself."
  - "Tale, two details neither cited source carries. “About 12 minutes after takeoff” and “Java Sea, off Jakarta” are not in the AirlineRatings or Leeham pieces — AirlineRatings gives the date and the 189 dead but no timeline or crash site, and the Leeham article is about the flight-deck sequence. Both are almost certainly right and will be in the KNKT report; they are unsourced on this page until it is pulled. “A new Boeing 737 MAX 8” is likewise not in either source, which say only “Boeing 737 MAX.” Text left as supplied."
  - "Anti-pattern, one claim a cited source contradicts. “The speed trim system, a different system entirely” is not how the sources describe it: AirlineRatings says “MCAS was an extension of the existing speed trim system,” and Leeham says MCAS's “intermittent trimming, similar to Speed Trim, caused the crew of JT043 to think it was the cause,” since “the only system they know with this behavior was Speed Trim.” The captain's guess was closer to right than “a different system entirely” allows — which arguably strengthens the pattern, because it shows a competent diagnosis still failing without the alert. Text left as supplied."
  - "Demo: the checklist line reads “CHECKLIST  AOA DISAGREE” — the checklist named for the condition, which is the pattern's own logic. No source here names a real 737 checklist for this alert, so the label is drafted, not sourced. The demo now carries “Simplified illustration, not real flight data.” above it, which DEMOS.md previously argued against as a class; the exception is noted there."
  - "Mechanism steps: drafted. The research has definition, incident and interface example but no mechanism; the two step notes are sourced, the titles and details are not."
  - "Verified against the cited sources this pass. AirlineRatings on the KNKT final report: “the October 29, 2018 tragedy that killed 189 people”; “an alert telling pilots that the plane's two angle-of-attack sensors were giving different readings was not working”; “the lack of an angle-of-attack disagree alert meant a miscalibrated AOA sensor could not be documented by the flight crew and was therefore not available to help maintenance identify the miscalibrated AOA sensor”; and that MCAS's “reliance on a single sensor was deemed appropriate.” Leeham: the stick shaker at rotation on the captain's side, IAS DISAGREE and ALT DISAGREE on his PFD, the captain fighting MCAS, and the previous flight's captain writing “Speed Trim trimmed in the wrong direction.” MIT 16.422: “The icon is displayed next to an EICAS message whenever there is an ECL checklist that needs to be completed,” and “When an alert message is displayed, the pilot simply pushes the CHKL button and the correct non-normal checklist is displayed.” Amershi guideline 11 is “Make clear why the system did what it did.”"

openQuestions:
  - "How specific should the named cause be when the system can't tell which of several faults it's seeing? Naming the wrong cause confidently is worse than showing the symptoms, and the honest middle ground, a short list of candidates, is harder to act on under time pressure."

sources:
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

**Observed · Aviation.** [Lion Air 610](#tale): the crew had the stick shaker, the disagreeing instruments and the runaway trim, and no alert naming the sensor behind them.[cite:airlineratings-knkt][cite:leeham-jt610]

**Observed · Aviation.** The 777's crew alerting pairs each message with a checklist indicator: the icon sits beside the message while its checklist is outstanding and clears once it is done, so the alert carries its response rather than just its name.[cite:mit-16422]

## Notes

Symptoms are not a diagnosis. That's why the last step of this pattern is recording rather than displaying: naming the condition is what makes it travel, from the crew to maintenance to the next flight.
