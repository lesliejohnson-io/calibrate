---
number: 9
name: "Learning Loop"
intent: "What operators notice in the field — oddities, near-misses, workarounds — is easy to report, reaches the people who can change the machine, and visibly leads to changes. This is how After feeds back into Before."
# The index card's line (redesign-handoff.md §2). Drafted on the redesign
# canvas, 2026-11-05 — not yet reviewed.
cardIntent: "What operators notice in the field reaches the people who can change the machine, and visibly does."

moment: after
trustJobs: [recover]
risk: critical
reversibility: irreversible
autonomy: [1, 4]
domains: [aviation]

status: draft
updated: "2026-10-30"

steps:
  - title: "Operator notices"
    detail: "An oddity, a near-miss, a workaround"
  - title: "Reporting is easy"
    detail: "Low effort, and no blame attached"
  - title: "It reaches who can change it"
    detail: "Engineering and training, not just the file"
    key: true
  - title: "Something changes"
    detail: "The machine, the procedure or the training"
  - title: "The loop closes visibly"
    detail: "Reporters can see what their report changed"

antiPattern: "Reported and Forgotten"

without:
  steps: ["Crew learns something", "It goes in a log", "Next crew starts blind"]
  caption: "Reported and Forgotten: the knowledge stops at the record. The crew on the flight before JT610 met the same nose-down trim, cut out the stabilizer trim and landed — but that action was not entered in the maintenance log, and the next crew took off without it."

with:
  steps: ["Crew reports", "It reaches the engineers", "The machine or procedure changes"]
  caption: "The report travels, something changes because of it, and the people who file reports can see that it did."

related:
  - slug: provenance-log
    type: complements
    note: "The log is the record of what the machine did; the loop is what carries what the operator noticed. Neither substitutes for the other, and an investigation usually needs both."
  - slug: glass-box
    type: complements
    note: "Logged overrides are the richest input this loop has: repeated disagreement in the same situation is the clearest sign the machine is wrong."

sources:
  - id: bea-af447
    title: "BEA Final Report — Air France Flight AF447, Rio de Janeiro to Paris"
    year: 2012
    url: "https://www.faa.gov/sites/faa.gov/files/f-cp090601.en_.pdf"
    type: incident-report
    note: "Observed. Section 1.17.1.5.3.1 records nine incidents in the Air France A330/A340 fleet's air safety reports associated with unreliable indicated airspeeds between May 2008 and March 2009, all in cruise between FL310 and FL380, seven of which mentioned stall-warning activation. A note adds that after the accident Air France analysed recorded flight parameters and identified six further incidents that had never been raised in a report at all, whose maintenance write-ups described the characteristic symptoms only partially or not at all. Section 2.4 concludes that feedback from in-service events made it impossible to analyse the repeated failure to apply the unreliable-airspeed procedure in advance, and the causal factors name the feedback mechanisms that made it impossible to identify that repeated non-application and remedy it."
  - id: leeham-jt610
    title: "Bjorn's Corner: Analysing the Lion Air JT610 crash, Part 3"
    author: "Leeham News"
    year: 2019
    url: "https://leehamnews.com/2019/11/15/bjorns-corner-analysing-the-lion-air-jt610-crash-part-3/"
    type: article
    note: "The flight before the accident met the same nose-down trim; that crew used the stabilizer trim cutout switches and landed. The captain reported an airspeed disagreement, but the use of the cutout switches was not recorded in the maintenance log. Secondary reporting on the KNKT material."
  - id: ain-knkt
    title: "Report on Lion Air Flight 610 raises more questions"
    author: "AIN"
    year: 2018
    url: "https://oldain.ainonline.com/aviation-news/air-transport/2018-11-28/report-lion-air-flight-610-raises-more-questions"
    type: article
    note: "Secondary reporting on the KNKT preliminary report. Carried in the research as the source for the previous flight's handling and what reached the next crew."
  - id: asrs-briefing
    title: "ASRS Program Briefing"
    author: "NASA Aviation Safety Reporting System"
    url: "https://asrs.arc.nasa.gov/docs/ASRS_ProgramBriefing.pdf"
    type: talk
    note: "Observed. NASA and the FAA established the ASRS in 1975 and report intake began in 1976: voluntary, confidential and non-punitive, held by NASA rather than the authority that enforces. Intake runs at about 2,329 reports a week on data through December 2025. Reports come back out as safety alerts and CALLBACK, published monthly since 1979 — the visible far end of the loop, and the reason pilots keep filing."
  - id: amershi-2019
    title: "Guidelines for Human-AI Interaction"
    author: "Saleema Amershi et al."
    year: 2019
    url: "https://www.microsoft.com/research/blog/guidelines-for-human-ai-interaction-design/"
    type: paper
    note: "CHI 2019. Guideline 15 is to encourage granular feedback during regular interaction — the intake half of this pattern, stated for software."

review:
  - "Needs demo (see DEMOS.md)"
  - "Needs a cautionary tale"
  - "Mechanism steps: drafted. The research has definition, incidents and an interface example but no mechanism; the two step notes are sourced, the titles and details are not."
  - "Lion Air detail rests on two secondary reports (Leeham, AIN). The KNKT preliminary and final reports are the primary sources and have not been pulled."

openQuestions:
  - "The research files this as After → Before, which is the whole point of it, but a pattern carries exactly one moment in this library. It sits under After and over time, and the Before half shows up only in the prose."
  - "What closing the loop visibly actually takes. The ASRS publishes back to the whole profession rather than to the individual reporter, which may be why it works — but it is not obvious that per-reporter feedback would scale, or that it is what reporters want."
---

What stands out about both accidents is that the knowledge already existed. The crew on the flight before JT610 met the same nose-down trim, cut out the stabilizer trim and landed; what did not survive was the record of what they had done, so the next crew met it cold.[cite:leeham-jt610] Air France's A330/A340 fleet filed nine unreliable-airspeed reports between May 2008 and March 2009, and after AF447 the airline went back through recorded flight parameters and found six more incidents that had never been reported at all.[cite:bea-af447] The BEA's causal factors name the feedback mechanisms directly: they made it impossible to identify that crews were repeatedly not applying the procedure, and to remedy it.[cite:bea-af447]

So the hard part is not intake, it is the two ends. At the front, reporting has to cost less than silence, which is why the ASRS is confidential, non-punitive and sits with NASA rather than with the authority that could act on what it reads.[cite:asrs-briefing] At the back, something has to visibly change, and the people filing reports have to be able to see that it did. A loop whose far end is invisible is indistinguishable from a suggestion box, and it gets used like one.
