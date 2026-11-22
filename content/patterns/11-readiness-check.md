---
number: 11
name: "Readiness Check"
intent: "The system confirms the person can actually supervise (looking, present, hands ready) and escalates when they can't, instead of treating a body in the seat as a person in the loop."
# The index card's line (redesign-handoff.md §2). Drafted on the redesign
# canvas, 2026-11-05 — not yet reviewed.
cardIntent: "The system confirms the human can actually supervise, and escalates when they cannot."

moment: before
trustJobs: [intervene]
risk: critical
reversibility: irreversible
autonomy: [2, 3]
domains: [surgical]

status: draft
updated: "2026-11-09"

steps:
  - title: "Supervision assumed"
    detail: "A human is nominally responsible"
  - title: "Check it"
    detail: "Eyes, head position, hands, presence"
  - title: "Escalate when it fails"
    detail: "Quietly, then insistently"
    key: true
  - title: "Act if nobody answers"
    detail: "Slow to a stop rather than continue"
  - title: "Re-check while running"
    detail: "Attention lapses mid-task, not before it"

antiPattern: "Body in the Seat"

interface:
  component: "readiness-check"

demoNote: "Simplified illustration."

# Read against the Regulation 28 report. The report spells "inderterminate";
# the story uses the word unquoted so the misprint is not carried. No person is
# named and the surgeon carries no pronoun.
cautionaryTale:
  title: "Robotic heart surgery at the Freeman Hospital"
  date: "February 23, 2015"
  place: "Newcastle upon Tyne, England"
  story: >-
    A patient with severe mitral valve disease was offered a robotically
    assisted repair and told it would be the first at the Freeman Hospital. It
    was also the first the Consultant Surgeon had performed. The surgeon had
    some experience of minimally invasive repair and had observed four robotic
    repairs in the USA. Before the operation, the surgeon spent what the
    coroner called an indeterminate period on the robotic equipment, and was
    “not supervised or guided when doing so.”[cite:newcastle-coroner-2019]

    The Consultant Surgeon personally arranged for proctors to attend. The
    evidence “clearly established the absence of any local or national
    guidelines” on the minimum training for a new procedure, on recruiting and
    using proctors, on what proctors were for, or on what patients should be
    told before consenting. “No plan was in place setting out maximum cross
    clamp time and/or circumstances in which conversion to a conventional
    operation should occur, prior to the
    operation.”[cite:newcastle-coroner-2019]

    Complications included misaligned sutures, inability to sight the
    annuloplasty ring, bleeding, and “the unplanned and unexpected departure of
    the Proctors” before the operation ended. The cross clamp time ran past six
    hours. The patient died, and the coroner's narrative conclusion gave the
    cause as complications of the operation “and in part because the operation
    was undertaken with Robotic Assistance.”[cite:newcastle-coroner-2019]
  sourceId: newcastle-coroner-2019

# Which of the sections above the fold are freshly written and unchecked.
# `examples` stays: no read of the Tempe camera claim or the Super Cruise
# sources is on record.
drafts:
  examples: true

therefore: >-
  Check that the person can actually supervise (looking, present, hands
  ready), escalate when they can't, and stop safely if nobody answers.

without:
  steps: ["Human in the seat", "Attention elsewhere", "Nobody supervising"]
  # The coroner and the RCS differ on what the proctors were there for. Both
  # accounts stay, each attributed. The RCS account is secondhand and must not
  # be restated as fact. The last sentence is the page's reading of the two.
  caption: >-
    The coroner recorded that a surgical and an anesthetic proctor, experienced
    in robotic heart surgery, “were engaged to attend to advise and assist
    throughout the operation.”[cite:newcastle-coroner-2019] The Royal College
    of Surgeons told the coroner it understood something else. It wrote that it
    “understands from surgical colleagues” that the proctors “attended in
    relation to the placement of an aortic balloon, rather than the robotic
    procedure”, and left once the balloon was working, so that there was “no
    mentor attending with expertise in robotics who would have been able to
    intervene”. That is the College's secondhand understanding, not a finding.
    The same letter says the terms “proctor, mentor, trainer, supervisor and
    coach, are often used interchangeably”.[cite:rcs-response-2019] On either
    account, the operation relied on a person in the room, and no guideline
    said what that person was there to do.[cite:newcastle-coroner-2019]

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

openQuestions:
  - "Which moment does this belong to? It's filed under Before because the check decides whether the system can engage, but re-checking is squarely During."
  - "Is attention monitoring worth it at partial automation, or does it mostly make an unsupervisable task look supervised? Tempe suggests the real problem wasn't missing monitoring but expecting a person to watch an automated system for hours."

sources:
  - id: newcastle-coroner-2019
    title: "Regulation 28 Report to Prevent Future Deaths, ref. 2019-0037"
    author: "Karen Dilks, HM Senior Coroner for the City of Newcastle upon Tyne"
    year: 2019
    url: "https://www.judiciary.uk/wp-content/uploads/2019/05/Stephen-Pettitt-2019-0037_Redacted.pdf"
    type: incident-report
    note: "Observed, and the source for the opening story. Dated 25 January 2019, after an inquest held from 5 to 8 November 2018, and published by the Courts and Tribunals Judiciary. Section 3 gives the narrative conclusion and section 4 the circumstances: the surgeon's preparation, the absence of local or national guidelines, including on the role of proctors, the absence of a plan for cross clamp time or conversion, the proctors' engagement and departure, and a cross clamp time in excess of 6 hours."
  - id: rcs-response-2019
    title: "Response to the Regulation 28 Report, ref. 2019-0037"
    author: "Andrew Reed, Chief Executive, Royal College of Surgeons of England"
    year: 2019
    url: "https://www.judiciary.uk/wp-content/uploads/2019/05/2019-0037-Response-by-Royal-College-of-Surgeons.pdf"
    note: "A letter to the coroner dated 20 March 2019, published by the Courts and Tribunals Judiciary, and the source for the second account of the proctors in the anti-pattern. The College states what it “understands from surgical colleagues” and says it is “not aware of the exact circumstances” of the death, so its account is secondhand and is not a coroner's finding. It differs from the report, which records the proctors as engaged to advise and assist throughout."
  - id: ntsb-har-20-01
    title: "Collision Between a Sport Utility Vehicle Operating With Partial Driving Automation and a Crash Attenuator, Mountain View, California"
    author: "National Transportation Safety Board"
    year: 2020
    url: "https://www.ntsb.gov/investigations/AccidentReports/Reports/HAR2001.pdf"
    type: incident-report
    note: "Observed. NTSB/HAR-20/01, adopted February 25, 2020. The probable cause names the Autopilot system steering into the gore area, the driver's lack of response due to distraction likely from a cell phone game application and overreliance on the system, and contributing to it “the Tesla vehicle's ineffective monitoring of driver engagement, which facilitated the driver's complacency and inattentiveness.” Finding 15 is the one this pattern rests on: monitoring driver-applied steering wheel torque is “an ineffective surrogate measure of driver engagement.” Section 2.2.4.5 sets out how the system assessed engagement and what it did not do with the result: no hands-on alert in the final fifteen minutes, hands off permitted for up to three minutes, and no alert when the system lost lane line prediction and steered left. Section 2.3.1 is the vigilance argument, that “drivers are poor at monitoring automation and do not perform well on tasks requiring passive vigilance”, relayed from the human-factors literature."
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
---

## Design considerations

- **Measure attention, not presence.** Hands on the wheel or a body in the seat doesn't mean someone is watching.[cite:ntsb-har-20-01]
- **Treat supervision as part of the system.** If a person watching is the safety plan, it has to be verified like any other component. Uber had cameras pointed at its operators and didn't check what they showed.[cite:ntsb-har-19-03]
- **Escalate in steps.** Start quietly, then insist.[cite:gmc-super-cruise]
- **End the ladder somewhere.** Flashing, chiming and speaking are all ways of asking. A system that only asks has no answer for when nobody replies, which is the very case the check exists for. Slowing to a stop is what makes the rest honest.[cite:gmc-super-cruise]
- **Keep checking while running.** Attention lapses during the task, not just before it.

## In the field

<!-- VERIFY: the Mountain View entry below is this page's displaced opening
     story, cut to one sentence and keeping its NTSB source. Both figures in it
     are already verified against NTSB/HAR-20/01 in this file's review list -
     engagement assessed from steering wheel torque, and no driver-applied
     torque detected from about 6 seconds before impact until the impact.
     Nothing new to check: the sentence is a cut, not a claim. -->
**Observed · Driving.** Tesla, Mountain View. The car checked for hands on the wheel, and hadn't detected them for the last six seconds before it struck a barrier.[cite:ntsb-har-20-01]

**Observed · Driving.** Uber, Tempe. The NTSB found the operator was visually distracted by her phone, and that Uber had cameras watching operators but didn't check that they were paying attention.[cite:ntsb-har-19-03] Tempe is the opening story on [Provenance Log](/patterns/provenance-log).

**Observed · Driving.** Super Cruise checks attention with an infrared camera on the steering column that tracks head position and eye movement,[cite:seeing-machines] and escalates through a flashing light bar, chimes and seat vibration, then a voice prompt, to a slowdown to a stop if the driver still doesn't respond.[cite:gmc-super-cruise]

## Notes

The NTSB has relayed the human-factors finding that drivers are poor at monitoring automation and do not perform well on tasks requiring passive vigilance,[cite:ntsb-har-20-01] and this pattern is the uncomfortable consequence of taking that seriously. The cameras weren't the safeguard; looking at what they showed would have been.[cite:ntsb-har-19-03] And even a check that reliably catches someone not watching only proves something true; it doesn't make the arrangement sound.
