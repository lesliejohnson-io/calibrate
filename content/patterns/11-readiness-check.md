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
domains: [automotive]

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

# VERIFY, and note that the date is incomplete. The brief gave "February 2015"
# and asked for the exact day in Month D, YYYY form; no day could be
# established without the coroner's report, so the dateline is the month alone
# and breaks the site's own format until the day is filled in. Also to check
# against the inquest findings and the Regulation 28 report: that the patient
# was the first in the UK to have a mitral valve repaired with robotic
# assistance; the lead surgeon's training (simulator practice alone,
# observation abroad, no hands-on training on the robot); that the two outside
# proctors left the theatre partway through without telling the team; the
# console-and-speaker communication problems; the misaligned sutures and the
# camera obscured by blood; that no conversion-to-open criteria had been
# agreed beforehand; the cross-clamp time (reported as 6 h 12 min - the text
# says "more than six hours"); that the patient died days later; and the
# coroner's own wording on robotic assistance contributing to the death.
cautionaryTale:
  title: "Robotic heart surgery at the Freeman Hospital"
  date: "February 2015"
  place: "Newcastle upon Tyne, England"
  story: >-
    A patient became the first person in the UK to have his mitral valve
    repaired with the help of a surgical robot. The lead surgeon had practiced
    alone on a simulator and watched the procedure abroad, but had no hands-on
    training with the robot. The two outside experts brought in to support the
    team left the theater partway through without telling anyone. With the
    surgeon's head in the console and his voice coming through a tinny
    speaker, the team struggled to hear him. Stitches went in misaligned, the
    camera was blinded by blood, and no one had agreed when to stop and
    convert to open surgery. The heart stayed clamped for more than six hours,
    and the patient died days later. The coroner found that the death was due
    in part to the operation being done with robotic assistance.
  sourceId: newcastle-coroner-2018

# Which of the sections above the fold are freshly written and unchecked.
drafts:
  tale: true
  antiPattern: true
  examples: true

therefore: >-
  Check that the person can actually supervise (looking, present, hands
  ready), escalate when they can't, and stop safely if nobody answers.

without:
  steps: ["Human in the seat", "Attention elsewhere", "Nobody supervising"]
  # VERIFY against the inquest findings and the Regulation 28 report: that no
  # check was made of the lead surgeon's hands-on training on the robot, that
  # the proctors' continued presence was assumed rather than agreed, and that
  # no conversion criteria were settled before the operation began. The three
  # things this sentence says nobody checked have to be three things the
  # coroner found were not checked, not three things the page inferred from
  # the fact that they went wrong.
  caption: "Everyone the procedure depended on was assumed ready because they were in the room or on the schedule. Nobody checked that the surgeon was trained on the robot, that the experts would stay, or that the team had agreed when to stop."

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

review:
  - "Opening story replaced this pass: the Freeman Hospital robotic mitral valve repair in, Mountain View out. Nothing in the new tale or the new anti-pattern has been read against a source, because no source could be linked - see the `newcastle-coroner-2018` note below. Both carry `drafts:` flags and VERIFY comments."
  - "The new dateline breaks the site's format. Every other opening reads Month D, YYYY; this one reads “February 2015”, because the brief supplied the month and asked for the day to be verified, and no day could be established without the coroner's report. Fill the day in from the report, or decide a month-only dateline is allowed and say so in the template."
  - "Mountain View is now an In the field entry rather than the opening, cut to one sentence. The flags below about its tale and anti-pattern wording - the five seconds of distraction versus the clear view, and the warnings being absent rather than late - describe text that has been removed. They are kept as the record of what was checked against HAR-20/01, which is still cited three times on this page."
  - "This pattern's `domains` is still `[automotive]`, and its opening story is now a cardiac operating theatre. The schema has `surgical` and `medical`; the facet was left alone because the brief did not ask, but the page now opens in a domain it does not claim, so the index card and the filters will not surface it for anyone browsing surgical patterns."
  - "Mechanism steps: drafted. The escalation ladder in steps 3 and 4 is sourced from Super Cruise; the step titles, details and the fifth step are not."
  - "Tale verified against NTSB/HAR-20/01 this pass: 9:27 a.m. on March 23, 2018, a 2017 Tesla Model X P100D travelling south on US-101 in Mountain View; “the vehicle moved to the left and entered the gore” dividing the main lanes from the left exit ramp to SR-85; “During the 5 seconds leading up to the crash, the Tesla SUV accelerated from about 63 mph to nearly 71 mph at impact”; “The crash attenuator was positioned at the end of a concrete median barrier”, “in a damaged and nonoperational condition … due to the California Highway Patrol's failure to report the damage following a previous crash and systemic problems with the California Department of Transportation's maintenance division”; the probable cause's “distraction likely from a cell phone game application”; “About 6 seconds before the crash, no driver-applied steering wheel torque was detected by Autosteer”, continuing “until the impact”; and “he died from blunt-force trauma injuries”. Finding 15: “Because monitoring of driver-applied steering wheel torque is an ineffective surrogate measure of driver engagement, performance standards should be developed…”."
  - "Tale corrected: the five seconds are the distraction, not the view. The draft read “had about five seconds of clear view of the barrier and did nothing.” The report has two separate figures — “The Tesla driver was likely distracted for at least 5 seconds, as shown by his lack of evasive action”, and “During the final 4 seconds of travel prior to impact, the Tesla accelerated toward the crash attenuator and the driver took no evasive braking or steering action” — and locates the unobstructed view at 375 feet out: “the vehicle was centered between the two lines delineating the gore with no vehicles ahead to impede the driver's view of the approaching hazard.” No duration is given for the clear view. Rewritten as the five-second acceleration plus the unobstructed view, without putting a number on the view."
  - "Anti-pattern corrected: the warnings were not late, they were absent. The draft read “Its warnings came too late to prompt a response.” The report: “during the final 15 minutes before the crash, the system did not provide any visual or audible alerts warning the driver to put his hands on the steering wheel even though his hands came off the steering wheel on multiple occasions for time periods exceeding 10 seconds”, and “During the last 60 seconds before the crash, the system did not detect driver-applied steering wheel torque 43 percent of the time and provided no warnings to the driver.” It also allowed hands off “for up to 3 minutes under certain highway driving conditions”. Silence is a stronger version of the point, and the anti-pattern now says that instead."
  - "The “very poor at monitoring automated systems” claim is now sourced, and no longer attributed to Williston. HAR-20/01 §2.3.1: “drivers are poor at monitoring automation and do not perform well on tasks requiring passive vigilance”, citing Parasuraman and Riley 1997, Moray and Inagaki 2000 and others. The report says drivers, not people, and is relaying the human-factors literature rather than making a finding, so the Notes say “drivers” and credit the report with repeating it."
  - "Demo invents its panel. Nothing in it is a reading from the report: the toggles, the ten seconds to the hazard, the four rungs and their wording are written for this page. What is taken from the report is the failure — engagement assessed from the steering wheel, no hands detected for the final six seconds, and nothing raised. The ladder's shape is Super Cruise's, ending in a slowdown to a stop."

openQuestions:
  - "Which moment does this belong to? It's filed under Before because the check decides whether the system can engage, but re-checking is squarely During."
  - "Is attention monitoring worth it at partial automation, or does it mostly make an unsupervisable task look supervised? Tempe suggests the real problem wasn't missing monitoring but expecting a person to watch an automated system for hours."

sources:
  - id: newcastle-coroner-2018
    title: "Inquest findings and Regulation 28 Report to Prevent Future Deaths, robotic mitral valve repair at the Freeman Hospital, Newcastle upon Tyne"
    author: "HM Coroner for Newcastle upon Tyne"
    year: 2018
    type: incident-report
    note: "Observed, and the source for the opening story. The inquest concluded in November 2018 and the coroner issued a Regulation 28 report. FLAGGED, and the reason this entry has no `url`: no public copy of the Regulation 28 report was located, so nothing could be linked without inventing a citation. Until a link is added - either the Reg. 28 report from the Chief Coroner's Prevention of Future Deaths index, or named inquest coverage standing in for it - the opening story rests on a source a reader cannot follow, which is the strongest reason it carries a DRAFT tag. Every figure in the tale and the anti-pattern is drafted from the rewrite brief; the VERIFY comments in this frontmatter list what to check, including the surgery date, which is currently a month rather than a day."
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
**Observed · Automotive.** Tesla, Mountain View. The car checked for hands on the wheel, and hadn't detected them for the last six seconds before it struck a barrier.[cite:ntsb-har-20-01]

**Observed · Automotive.** Uber, Tempe. The NTSB found the operator was visually distracted by her phone, and that Uber had cameras watching operators but didn't check that they were paying attention.[cite:ntsb-har-19-03] Tempe is the opening story on [Provenance Log](/patterns/provenance-log).

**Observed · Automotive.** Super Cruise checks attention with an infrared camera on the steering column that tracks head position and eye movement,[cite:seeing-machines] and escalates through a flashing light bar, chimes and seat vibration, then a voice prompt, to a slowdown to a stop if the driver still doesn't respond.[cite:gmc-super-cruise]

## Notes

The NTSB has relayed the human-factors finding that drivers are poor at monitoring automation and do not perform well on tasks requiring passive vigilance,[cite:ntsb-har-20-01] and this pattern is the uncomfortable consequence of taking that seriously. The cameras weren't the safeguard; looking at what they showed would have been.[cite:ntsb-har-19-03] And even a check that reliably catches someone not watching only proves something true; it doesn't make the arrangement sound.
