---
number: 11
name: "Readiness Check"
intent: "The system confirms the human is actually able to supervise — looking, present, hands available — and escalates when they are not, instead of treating a body in the seat as a human in the loop."
# The index card's line (redesign-handoff.md §2). Drafted on the redesign
# canvas, 2026-11-05 — not yet reviewed.
cardIntent: "The system confirms the human can actually supervise, and escalates when they cannot."

moment: before
trustJobs: [intervene]
risk: critical
reversibility: irreversible
autonomy: [2, 3]
domains: [automotive]

status: draft
updated: "2026-10-30"

steps:
  - title: "Supervision assumed"
    detail: "A human is nominally responsible"
  - title: "Check it"
    detail: "Eyes, head position, hands, presence"
    note: "Super Cruise watches with an infrared camera on the steering column, tracking head position and eye movement rather than asking for a periodic wheel tug."
  - title: "Escalate when it fails"
    detail: "Quietly, then insistently"
    key: true
    note: "The ladder runs light bar flashing green, then flashing red with chimes and seat vibration, then a voice prompt to take control."
  - title: "Act if nobody answers"
    detail: "Slow to a stop rather than continue"
  - title: "Re-check while running"
    detail: "Attention lapses mid-task, not before it"

antiPattern: "Body in the Seat"

without:
  steps: ["Human in the seat", "Attention elsewhere", "Nobody supervising"]
  caption: "Body in the Seat: presence is treated as attention. At Tempe the NTSB found the probable cause was the operator's failure to monitor the road and the automation because she was visually distracted by her phone; Uber had cameras watching operators but did not spot-check that they were paying attention."

with:
  steps: ["Attention checked", "Escalating prompts", "Stop if unanswered"]
  caption: "The machine verifies the thing it is relying on, and stops relying on it when the check fails rather than continuing on an assumption."

related:
  - slug: capability-disclosure
    type: complements
    note: "Disclosure says where the machine will run; this says whether the human it is counting on is actually there. Both are preconditions checked before engagement rather than claims made in a manual."
  - slug: handoff
    type: precedes
    note: "A takeover request assumes someone is ready to receive it. This is the check that assumption rests on, and the reason the escalation ends in a stop rather than a handover."

sources:
  - id: ntsb-har-19-03
    title: "Collision Between Vehicle Controlled by Developmental Automated Driving System and Pedestrian, Tempe, Arizona"
    author: "National Transportation Safety Board"
    year: 2019
    url: "https://www.ntsb.gov/investigations/accidentreports/reports/har1903.pdf"
    type: incident-report
    note: "Observed. NTSB/HAR-19/03. The probable cause is the vehicle operator's failure to monitor the driving environment and the operation of the automated driving system because she was visually distracted throughout the trip by her personal cell phone. Contributing were Uber ATG's inadequate safety risk assessment procedures, ineffective oversight of vehicle operators, and lack of adequate mechanisms for addressing operators' automation complacency, all of a piece with an inadequate safety culture. On the monitoring itself: ATG used inward-facing cameras as a spot-check on operators' adherence to policy, but could not document how often spot-checks happened — only infractions were recorded — and said they were infrequent."
  - id: gmc-super-cruise
    title: "Super Cruise"
    author: "GMC"
    url: "https://www.gmc.com/supercruise"
    type: article
    note: "Observed. The Driver Attention System and its escalation: light bar flashing green, then flashing red with chimes and seat vibration, then a voice prompt, and a slowdown to a stop if the driver still does not respond."
  - id: seeing-machines
    title: "Seeing Machines technology enables GM Super Cruise driver assistance system"
    year: 2019
    url: "https://internationalfinance.com/company/seeing-machines-technology-enables-gm-super-cruise-driver-assistance-system/"
    type: article
    note: "Secondary. The infrared camera on the steering column tracking head position and eye movement."
  - id: lee-see-2004
    title: "Trust in Automation: Designing for Appropriate Reliance"
    author: "John D. Lee and Katrina A. See"
    year: 2004
    url: "https://journals.sagepub.com/doi/10.1518/hfes.46.1.50_30392"
    type: paper
    note: "The calibration argument behind the pattern: reliance has to match capability, and a supervisor who has stopped supervising is the clearest case of it not doing so."

review:
  - "Mechanism steps: drafted. The escalation ladder in steps 3 and 4 is sourced from Super Cruise; the step titles, details and the fifth step are not."
  - "Unsourced claim: “The NTSB's framing after Williston was that humans are very poor at monitoring automated systems”. It comes from the research notes, but the Williston report (NTSB/HAR-17/02) is not among this entry's sources — it is cited on capability-disclosure. Either add it here or drop the sentence's attribution."

openQuestions:
  - "The research leaves this pattern's moment unsettled: it is written as Before but continues During, and the notes ask whether it belongs in Before, During, or a new Setup bucket. It sits in Before here because the check gates engagement, but the re-check step is squarely During."
  - "Whether attention monitoring earns its keep at level 2, or whether it mostly makes a fundamentally unsupervisable task look supervised. Tempe suggests the monitoring was not the missing piece so much as the expectation that a person could watch an automated system for hours."
---

The NTSB's framing after Williston was that humans are very poor at monitoring automated systems, and this pattern is the uncomfortable consequence of taking that seriously. If supervision is the safety case, then supervision is a system component, and an unverified component is a guess. Uber had cameras pointed at its operators and did not check what they showed.[cite:ntsb-har-19-03] The cameras were not the control; looking at them would have been.

What makes the Super Cruise version work is that the ladder ends somewhere.[cite:gmc-super-cruise] Flashing, chiming and speaking are all ways of asking, and a system that only asks has no answer for the case where nobody replies — which is precisely the case the check exists for. Slowing to a stop is the part that makes the rest honest. The harder question is the one the research leaves open: if a person cannot reliably watch an automated system for an hour, a check that catches them not watching has established something true without making the arrangement sound.
