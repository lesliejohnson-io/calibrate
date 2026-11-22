---
number: 12
name: "Return of Control"
intent: "When the machine takes control back, it does so visibly and only when the person agrees, and it never quietly fights what the person is doing."
# The index card's line (redesign-handoff.md §2). Drafted on the redesign
# canvas, 2026-11-05 — not yet reviewed.
cardIntent: "The machine takes control back visibly, only when conditions are right, and doesn't fight the human."

moment: transition
trustJobs: [intervene, predict]
risk: critical
reversibility: irreversible
autonomy: [1, 4]
domains: [warehouse, aviation, driving, industrial]

status: draft
updated: "2026-11-07"

steps:
  - title: "Human has control"
    detail: "They have taken over, or never left"
  - title: "Machine stands back"
    detail: "Visibly, and without arguing"
  - title: "Conditions are met"
    detail: "The state the machine needs to resume"
  - title: "Human confirms"
    detail: "A deliberate act, not a timeout"
    key: true
  - title: "Machine resumes"
    detail: "Announced, once, not repeatedly"

antiPattern: "Resumes on Its Own"

interface:
  component: return-of-control

# The demo is now an invented top-down aisle rather than an invented pitch
# display: the forklift, the aisle, the two-second auto-resume and the hold
# wording are written for this page.
demoNote: "Simplified illustration."

cautionaryTale:
  title: "Driverless forklift at a bottling plant"
  date: "December 9, 2015"
  place: "Washington State"
  story: >-
    A water bottling plant moved pallets with driverless forklifts that
    navigated by laser. When a forklift sensed something in its way it
    stopped, and as soon as the obstruction was gone it started again on its
    own, unless someone had pressed an emergency stop. A dock coordinator went
    into the warehouse after a forklift alarm went off. A coworker who heard
    noises over the radio found him slumped against one of the vehicles, and
    then the forklift started moving again. The 45-year-old died after its
    raised forks came down on him.
  sourceId: wa-face-71-171-2018

# Which of the sections above the fold are freshly written and unchecked.
drafts:
  tale: true
  antiPattern: true
  demo: true
  examples: true

# The notice above the opening story.
unverified:
  - text: "The opening story, the anti-pattern and the demo on this page have not yet been checked against {document}, the report that would settle them. Treat their details as unconfirmed until then."
    document: "FACE Report 71-171-2018"
    sourceId: wa-face-71-171-2018
  - text: "The Lion Air entry under In the field has not yet been checked against {document}, the report that would settle it."
    document: "the KNKT final report"
  - text: "The Super Cruise entry under In the field has not yet been checked against {document}, the source it cites."
    document: "GM TechLink"
    sourceId: gm-techlink
  - text: "The ISO 13850 entry under In the field was read from a manufacturer's datasheet and has not yet been checked against {document}."
    document: "the standard itself"

therefore: >-
  When a person takes control, the machine stops acting and says so, and it
  resumes only when the person deliberately hands control back.

without:
  steps: ["Human corrects", "Machine re-asserts", "They fight"]
  caption: >-
    The forklift treated a stop as a pause. Once its sensors cleared, it took
    control back by itself, with no one choosing to hand it back and no one
    confirming the space was safe.

with:
  steps: ["Human corrects", "Machine stands back", "Resumes on confirmation"]
  caption: "Stopping is visible and resuming needs a deliberate human act, so the machine never takes control back on its own."

related:
  - slug: handoff
    type: complements
    note: "The Handoff covers the machine giving control up. This is the same transfer in the other direction, where the failure mode is not a cold takeover but a contest neither side acknowledges."
  - slug: readiness-check
    type: complements
    note: "Both treat the human's state as something to verify rather than assume — one before engaging, one before resuming."

openQuestions:
  - "What should resuming require when there's no obvious confirming act? Centering the car in a lane is a visible condition; most machines have no equivalent, and a timeout is exactly what this pattern exists to rule out."
  - "Should a machine ever resume a function the person has overridden without being asked? The industrial answer is no: reset is manual, at the machine. Driving assistance says yes, on a visible condition. The difference probably comes down to how often people want the function back."

sources:
  - id: wa-face-71-171-2018
    title: "Warehouse Worker Crushed by Forks of Laser Guided Vehicle (FACE Report 71-171-2018)"
    author: "Washington State Department of Labor & Industries"
    year: 2018
    url: "https://www.lni.wa.gov/safety-health/safety-research/files/2018/71_171_2018_LaserGuidedVehicle.pdf"
    type: incident-report
    note: "Observed, and the source for the opening story. Washington State FACE program, report 71-171-2018. Not yet read against this page: every figure in the tale, the anti-pattern and the rethemed demo is drafted from the rewrite brief, and review/DRAFTS.md lists what to check. The reason this incident replaced a flight-deck one is that it is the pattern's failure in its purest form - the machine was not fighting anyone, it simply decided on its own that the interruption was over."
  - id: aaic-b1816
    title: "Aircraft Accident Investigation Report — China Airlines Airbus Industrie A300B4-622R B1816, Nagoya Airport, April 26, 1994"
    author: "Aircraft Accident Investigation Commission, Ministry of Transport, Japan"
    year: 1996
    url: "https://www.faa.gov/sites/faa.gov/files/2022-11/Nagoya_Accident_Report.pdf"
    type: incident-report
    note: "Observed. The AAIC's final report, 19 July 1996, read in the English translation the FAA hosts. The source for the whole tale: the first officer “inadvertently activated the GO lever”, the crew engaged the autopilots with GO AROUND still engaged, the first officer “continued pushing the control wheel … despite its strong resistive force”, “the THS moved to its full nose-up position”, “the crew continued approach, unaware of the abnormal situation”, and “there was no warning and recognition function to alert the crew directly and actively to the onset of the abnormal out-of-trim condition”. It also gives the toll: 264 of 271 on board killed."
  - id: ntsb-asr-19-01
    title: "Assumptions Used in the Safety Assessment Process and the Effects of Multiple Alerts and Indications on Pilot Performance"
    author: "National Transportation Safety Board"
    year: 2019
    url: "https://www.ntsb.gov/investigations/AccidentReports/Reports/ASR1901.pdf"
    type: incident-report
    note: "Observed. NTSB/ASR-19-01, covering both accidents. Boeing told the NTSB it used four assumptions when assessing MCAS hazards, among them that uncommanded system inputs are readily recognizable and can be countered by moving the flight controls in the normal sense without a specific procedure, and that the pilot will act immediately to reduce control forces by re-trimming. The NTSB's concern is that the accident pilots' responses were not consistent with those assumptions. A design that expects the human to simply trim back is the tug-of-war written into the safety case. It also records the fatalities: 189 on JT610, 157 on ET302."
  - id: wikipedia-mcas
    title: "Maneuvering Characteristics Augmentation System"
    author: "Wikipedia"
    url: "https://en.wikipedia.org/wiki/Maneuvering_Characteristics_Augmentation_System"
    type: article
    note: "Secondary, and an encyclopedia summary rather than a source. Carried in the research for the post-crash design change: MCAS no longer activates repeatedly, giving one input per elevated-angle-of-attack event."
  - id: claims-journal
    title: "Lion Air jet's flight data show 'tug of war' over control"
    author: "Claims Journal"
    year: 2018
    url: "https://www.claimsjournal.com/news/international/2018/11/27/288002.htm"
    type: article
    note: "Secondary reporting on the JT610 flight data: the stabilizer trim moved more than thirty times, with the pilots trimming back against it."
  - id: satcom-guru
    title: "Taking the next steps while awaiting the MAX return"
    author: "Satcom Guru"
    year: 2019
    url: "https://www.satcom.guru/2019/03/taking-next-steps-while-awaiting-on.html"
    type: article
    note: "Secondary technical commentary on MCAS reset behaviour: a pilot's electric trim input paused the system, which then reset and commanded nose-down again."
  - id: gm-techlink
    title: "Super Cruise escalation and resumption"
    author: "GM TechLink"
    url: "https://gm-techlink.com/?p=15965"
    type: article
    note: "Observed. The light bar pulses blue while the driver steers; to let the system steer again the driver centres the car in the lane and waits for green. Resumption is gated on a visible, confirmed state."
  - id: iso-13850
    title: "ISO 13850 emergency stop reset"
    author: "IDEC, via Farnell"
    url: "https://www.farnell.com/datasheets/4129338.pdf"
    type: standard
    note: "A stop is maintained until reset, and reset requires an intentional human action at the location where the stop was triggered. The same principle as a requirement: the machine does not decide on its own when the human is finished. Read from a manufacturer datasheet, not the standard itself."

---

## Design considerations

- **Stand back the moment the person acts.** One correction from the operator should stop the machine, not pause it until the next cycle. After the 737 MAX accidents, the fix was to let the system act only once per event.[cite:wikipedia-mcas]
- **Make it obvious who's in command.** At any moment, the operator should be able to tell whether the machine or they are flying.
- **Resume only on a deliberate act.** Industrial emergency stops require a manual reset at the point where the stop happened.[cite:iso-13850]
- **If the machine resumes on its own, show the condition.** Super Cruise resumes when a visible condition is met, and its light bar tells the driver what that condition is.[cite:gm-techlink]
- **Give the person the last word.** A disagreement between a person and a machine should end in a decision, not a fight.

## In the field

**Observed · Aviation.** China Airlines 140. The crew engaged the autopilots with go-around still active. The automation kept trimming nose-up against the pilots' nose-down inputs, and no warning function announced the out-of-trim condition as it developed.[cite:aaic-b1816]

**Observed · Aviation.** Lion Air 610 and Ethiopian Airlines 302. On Lion Air 610 the trim moved more than thirty times, the pilots trimming back against it each time; using the electric trim paused the automated system, which then reset and pushed the nose down again.[cite:claims-journal][cite:satcom-guru] All 189 people on board Lion Air 610 died, and all 157 on Ethiopian 302.[cite:ntsb-asr-19-01]

**Observed · Driving.** Super Cruise's light bar shows when it will resume: it pulses blue while the driver is steering, and the driver centres the car in the lane and waits for green before the system takes the wheel again.[cite:gm-techlink]

**Observed · Industrial.** ISO 13850 keeps an emergency stop in force until someone resets it by hand, at the place where the stop was triggered.[cite:iso-13850]

## Notes

The two interface examples sit at opposite ends. Super Cruise resumes on its own once a visible condition is met;[cite:gm-techlink] an industrial emergency stop won't resume at all until someone acts at the machine.[cite:iso-13850] Neither is simply right. What they share is that the person can always tell which of the two is in command, and that's what turns a disagreement into a decision instead of a fight.
