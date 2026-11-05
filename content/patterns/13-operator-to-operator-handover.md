---
number: 13
name: "Operator-to-Operator Handover"
intent: "When responsibility for a machine passes between people — shift change, remote operator to local — the system carries its true state across, including work in progress and anything disabled, rather than relying on memory and paper."
# The index card's line (redesign-handoff.md §2). Drafted on the redesign
# canvas, 2026-11-05 — not yet reviewed.
cardIntent: "When responsibility passes between people, the system carries its true state across."

moment: transition
trustJobs: [know]
risk: critical
reversibility: irreversible
autonomy: [1, 4]
domains: [industrial]

status: draft
updated: "2026-10-30"

steps:
  - title: "Shift ends"
    detail: "Responsibility is about to move"
  - title: "Machine states its own condition"
    detail: "Mode, work in progress, what is disabled"
    note: "The disabled things are the dangerous ones. At Piper Alpha a pressure safety valve had been removed from condensate pump A and a blind flange fitted in its place, with the work unfinished at shift end."
  - title: "Structured, not freeform"
    detail: "The same fields every time"
  - title: "Receiver restates it"
    detail: "In their own words, back to the sender"
    key: true
    note: "I-PASS ends with synthesis by the receiver. In a nine-hospital study of 10,740 admissions, medical errors fell 23% and preventable adverse events 30%, without handoffs taking longer."
  - title: "Responsibility moves"
    detail: "Recorded, with both parties named"

antiPattern: "Lost at Shift Change"

without:
  steps: ["Work unfinished", "Handover by memory", "Next shift acts blind"]
  caption: "Lost at Shift Change: the permits for the pump work and the valve work were separate and not cross-referenced. That night the other pump failed, and the night shift restarted pump A without knowing its safety valve was missing."

with:
  steps: ["State assembled", "Receiver restates it", "Responsibility recorded"]
  caption: "The machine's real condition travels with the responsibility, and the receiver has to say it back before it is theirs."

related:
  - slug: handoff
    type: complements
    note: "The Handoff moves control between a machine and a human. This moves it between two humans, where the state has to survive a gap in which nobody is watching."
  - slug: provenance-log
    type: complements
    note: "A handover is a state change with two actors, and worth recording as one. Who accepted the machine, and in what condition, is exactly the question asked afterwards."

sources:
  - id: btw-piper-alpha
    title: "Piper Alpha: permit to work, shift handover, accountability"
    url: "https://btw.media/en/articles/piper-alpha-permit-to-work-shift-handover-accountability"
    type: article
    note: "Secondary. Carried in the research for Lord Cullen's findings: no clear procedure for shift handovers, and a permit-to-work system that was inadequate and habitually departed from."
  - id: icheme-lpb261
    title: "Loss Prevention Bulletin 261"
    author: "Institution of Chemical Engineers"
    url: "https://www.icheme.org/media/1982/lpb261_pg03.pdf"
    type: article
    note: "Carried in the research for the sequence: the pressure safety valve removed from condensate pump A, the blind flange fitted, the work unfinished at shift end, and the night restart."
  - id: fsa-cullen
    title: "Lord Cullen on the Piper Alpha handover"
    author: "Flight Safety Australia"
    url: "https://www.flightsafetyaustralia.com/?p=207044"
    type: article
    note: "Secondary, quoting the Cullen report. Used here for the handover finding rather than for any aviation content."
  - id: starmer-2014
    title: "Changes in Medical Errors after Implementation of a Handoff Program"
    author: "Amy J. Starmer et al."
    year: 2014
    url: "https://psnet.ahrq.gov/issue/changes-medical-errors-after-implementation-handoff-program"
    type: paper
    note: "Observed. The I-PASS study: nine hospitals, 10,740 admissions, a 23% fall in medical errors and a 30% fall in preventable adverse events, with no increase in handoff duration. Cited here via the AHRQ PSNet record rather than the NEJM paper itself."
  - id: intermountain-ipass
    title: "Multicenter patient safety study reduces medical error injuries by 30%"
    author: "Intermountain Healthcare"
    year: 2014
    url: "https://intermountainhealthcare.org/news/2014/12/multicenter-patientsafety-study-reduces-medical-error-injuries-by-30"
    type: article
    note: "Secondary summary of the same study, carried in the research alongside the PSNet record."

review:
  - "Mechanism steps: drafted. Steps 2 and 4 carry sourced notes; the five-step shape, the titles and details are mine."
  - "Every Piper Alpha claim is secondary. The Cullen Report (1990) is the primary source and has not been pulled; one of the three citations is a trade-news article and another is an aviation magazine quoting the report."
  - "The I-PASS figures come from the AHRQ PSNet record and a hospital press release, not from the NEJM paper (Starmer et al., N Engl J Med 2014;371:1803-12). Pull the paper before these numbers leave draft."
  - "Add death toll from primary source."

openQuestions:
  - "The warehouse case the research asks for: what an incoming fleet operator should see about robots that are paused, in maintenance, or running with a sensor disabled. The Piper Alpha lesson says the disabled things need to be the loudest item on the screen, but nobody seems to build the handover view that way."
  - "Whether the receiver's restatement survives being software. I-PASS works partly because a person has to say it out loud to another person; a checkbox that says the same thing is the kind of control that gets cleared from habit."
---

The structural detail in Piper Alpha is the one worth carrying: the permits for the pump work and the valve work existed, and were separate, and were not cross-referenced.[cite:icheme-lpb261] Nobody lost the information. The system simply had no way to put two facts next to each other — this pump is being worked on, this pump's safety valve is gone — and the handover depended on somebody holding both at once. Lord Cullen's finding was not that a step was skipped but that there was no clear procedure for shift handovers at all, and that the permit system was habitually departed from.[cite:btw-piper-alpha]

What I-PASS adds is the receiver's half. Most handover design concentrates on what the outgoing operator says, which is the easier problem; the hard one is whether the incoming operator has actually built the picture. Making the receiver synthesise it back is a check on the transfer rather than on the sender, and the nine-hospital result suggests it is cheap — the errors fell and the handoffs did not get longer.[cite:starmer-2014] For a machine the equivalent is not a summary screen. It is being made to state what you think you have just taken charge of, including what on it is switched off.
