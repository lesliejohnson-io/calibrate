---
number: 12
name: "Return of Control"
intent: "When the machine takes control back from the human, it does so visibly and only once conditions are right, and it does not keep re-asserting itself against what the human is doing."
# The index card's line (redesign-handoff.md §2). Drafted on the redesign
# canvas, 2026-11-05 — not yet reviewed.
cardIntent: "The machine takes control back visibly, only when conditions are right, and doesn't fight the human."

moment: transition
trustJobs: [intervene, predict]
risk: critical
reversibility: irreversible
autonomy: [1, 4]
domains: [aviation, automotive, industrial]

status: draft
updated: "2026-10-30"

steps:
  - title: "Human has control"
    detail: "They have taken over, or never left"
  - title: "Machine stands back"
    detail: "Visibly, and without arguing"
    note: "When the driver steers, Super Cruise pulses the light bar blue and stands back. Standing back is a state the human can see, not an internal flag."
  - title: "Conditions are met"
    detail: "The state the machine needs to resume"
  - title: "Human confirms"
    detail: "A deliberate act, not a timeout"
    key: true
    note: "ISO 13850 is the strict version: a stop is maintained until reset, and reset requires an intentional human action at the place the stop was triggered."
  - title: "Machine resumes"
    detail: "Announced, once — not repeatedly"

antiPattern: "The Tug-of-War"

without:
  steps: ["Human corrects", "Machine re-asserts", "They fight"]
  caption: "The Tug-of-War: the machine takes control back silently, over and over. On JT610 the trim moved more than thirty times, the pilots trimming back against it each time; using electric trim paused MCAS, which then reset and commanded nose-down again."

with:
  steps: ["Human corrects", "Machine stands back", "Resumes on confirmation"]
  caption: "Yielding is visible and resuming needs a deliberate human act, so the two are never commanding the same axis with different intentions."

related:
  - slug: handoff
    type: complements
    note: "The Handoff covers the machine giving control up. This is the same transfer in the other direction, where the failure mode is not a cold takeover but a contest neither side acknowledges."
  - slug: readiness-check
    type: complements
    note: "Both treat the human's state as something to verify rather than assume — one before engaging, one before resuming."

sources:
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

review:
  - "Mechanism steps: drafted. Steps 2 and 4 carry sourced notes; the titles, details and the five-step shape are mine."
  - "Primary source to pull: the KNKT final report (JT610). NTSB ASR-19-01 has been pulled and added as a source — it carries Boeing's four pilot-response assumptions and the fatality figures, but not the repeated-activation or post-crash design-change claims, which stay on secondary sources."

openQuestions:
  - "What resuming should require when there is no obvious confirming act. Centring the car in a lane is a legible condition; most machines have no equivalent, and a timeout is exactly the thing this pattern exists to rule out."
  - "Whether a machine should ever resume a function the human has overridden without being asked to. The industrial answer is no — reset is manual, at the point of the stop. Driving assistance says yes, on a visible condition. The gap between those two answers is probably about how often the human wants the function back."
---

MCAS is the clearest case of this pattern's absence because the contest was invisible to the people in it. The pilots were not refusing a handover; they were correcting an attitude, repeatedly, against a system that treated each of their corrections as an event to pause for rather than an instruction to stop.[cite:satcom-guru][cite:claims-journal] The design change afterwards was to give one input per elevated-angle-of-attack event,[cite:wikipedia-mcas] which is really a decision about who gets the last word. All 189 people on board JT610 died, and all 157 on ET302.[cite:ntsb-asr-19-01]

The two interface examples sit at opposite ends and are worth holding together. Super Cruise resumes on its own once a visible condition is met, and tells the driver what that condition is through the light bar.[cite:gm-techlink] ISO 13850 refuses to resume at all until a person acts, at the spot where they acted before.[cite:iso-13850] Neither is simply right. What they share is that the human can always tell which of the two is in command, which is the part MCAS did not provide — and the part that makes a disagreement a decision instead of a fight.
