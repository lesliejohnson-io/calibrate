---
number: 14
name: "Alert Triage"
intent: "Alerts are ranked by how soon someone must act, so the one that matters isn't lost in a flood of equals."
# The index card's line (redesign-handoff.md §2). Drafted on the redesign
# canvas, 2026-11-05 — not yet reviewed.
cardIntent: "Alerts are ranked by how urgently a human must act, so the critical one isn't buried."

moment: during
trustJobs: [know, intervene]
risk: critical
reversibility: costly
autonomy: [1, 4]
domains: [industrial, aviation]

status: draft
updated: "2026-11-06"

steps:
  - title: "Condition detected"
    detail: "Something the operator may need to act on"
  - title: "Rank it by urgency"
    detail: "Act now, act soon, be aware"
    key: true
  - title: "Encode the rank"
    detail: "Colour, position and sound carry it"
  - title: "Group consequences under their cause"
    detail: "Effects of a fault, not new faults. Still available, one step away."
  - title: "Link to the response"
    detail: "The alert carries its procedure"

antiPattern: "Alarm Flood"

interface:
  component: alert-triage

cautionaryTale:
  title: "Three Mile Island Unit 2"
  date: "March 28, 1979"
  place: "Middletown, Pennsylvania"
  story: >-
    Just after 4 a.m., a valve stuck open in the cooling system of a nuclear
    reactor near Middletown, Pennsylvania, and water began to escape. Within
    minutes, more than a hundred alarms were sounding and flashing in the
    control room, each one looking as urgent as the next. The printer
    recording them fell more than two and a half hours behind. Amid the flood,
    the operators misread what was happening and cut back the emergency
    cooling the reactor needed, and about half the core melted. It was the
    worst accident in the history of US commercial nuclear power.
  sourceId: [tmi-commission, nrc-printer]

therefore: >-
  Rank every alert by how soon someone must act, show the rank in color,
  position and sound, and group alerts that are only consequences under the
  fault that caused them.

without:
  steps: ["Fault cascades", "Everything alarms", "Nothing is legible"]
  caption: "Every alarm arrived as an equal, so the one that mattered looked like the hundred that didn't. Consequences of the stuck valve arrived as peers of their own cause, and the printed record fell so far behind that it stopped describing the present. One operator told the President's Commission he would have liked to throw the alarm panel away, because it gave no useful information."

with:
  steps: ["Fault cascades", "Ranked and encoded", "The critical one stands out"]
  caption: "Rank is carried by the display itself, so the one alert that needs action now is distinguishable from the ninety-nine that are its consequences."

related:
  - slug: explainable-fault
    type: complements
    note: "Triage decides which alert reaches the operator first; the other decides whether it names anything useful when it gets there. A ranked flood of error codes is still unreadable."
  - slug: graceful-degradation
    type: tension-with
    note: "Stepping down produces alerts by design, and each rung has consequences that look like faults. The ladder is only legible if the step-down is one event rather than fifty."

sources:
  - id: tmi-commission
    title: "Report of the President's Commission on the Accident at Three Mile Island"
    author: "President's Commission on the Accident at Three Mile Island (Kemeny Commission)"
    year: 1979
    url: "https://www.tmia.com/sites/tmia.com/files/media/Presidents-Commission.pdf"
    type: incident-report
    note: "Observed. The Commission's own report, which describes the first alarm followed by a cascade of alarms that numbered 100 within minutes, and quotes operator Craig Faust telling the Commission he would have liked to have thrown away the alarm panel because it was not giving useful information. It also describes a control room where alarms sound or flash many times each hour as a matter of routine. Scanned copy hosted by TMI Alert; the printer delay is not in this report and stays on the NRC testimony."
  - id: nrc-printer
    title: "NRC testimony on the Three Mile Island alarm printer delay"
    author: "US Nuclear Regulatory Commission"
    url: "https://www.nrc.gov/docs/ML1933/ML19337A432.pdf"
    type: incident-report
    note: "Observed. The alarm printer running behind events, at one point by more than two and a half hours — the flood outpacing the only record of it."
  - id: easa-cs25-1322
    title: "CS-25 Book 1, 25.1322 — Flight crew alerting"
    author: "European Union Aviation Safety Agency"
    url: "https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-large-aeroplanes-cs-25?page=42"
    type: standard
    note: "Observed. The three-level hierarchy, the reserved colours, and the requirement that Warnings and Cautions reach the crew through at least two senses. The pattern as a certification requirement."
  - id: mit-16422
    title: "16.422 Human Supervisory Control of Automated Systems — alerting systems"
    author: "MIT OpenCourseWare"
    year: 2004
    url: "https://ocw.mit.edu/courses/16-422-human-supervisory-control-of-automated-systems-spring-2004/8d934ba66f80b2ca1f6f82cb0ee3e4bf_040804alertsys_1.pdf"
    type: talk
    note: "Observed. Course material on alerting design, and the source for the 777 EICAS checklist icon that links a message to the procedure it needs."

review:
  - "Tale, two claims that its sources do not carry. The Commission's report says “a cascade of alarms that numbered 100 within minutes”, not more than a hundred; the tale says “more than a hundred”. And the 1979 report nowhere states how much of the core melted — it describes melting as the risk, and records that core damage was “far more substantial than either had anticipated”. The “about half the core melted” figure comes from the later core examinations, via the NRC, which is not a source on this page. Both sentences are as supplied; neither has been changed."
  - "Tale, the printer sentence rests on nrc-printer, which could not be re-read this pass: nrc.gov returns 403 to an automated fetch. The claim stands on the source note already in this file, not on a reading of the document."
  - "Verified against the Commission's report this pass: the 4 a.m. start (“36 seconds after the hour of 4:00 a.m.”), the stuck-open PORV draining coolant for 2 hours 22 minutes, the operators shutting one high pressure injection pump down and throttling the second to under 100 gallons a minute, Faust's remark, and “the worst accident in the history of commercial nuclear power generation”."
  - "Design consideration 2 is stronger than CS 25.1322. The rule assigns red to Warnings and amber or yellow to Cautions, but 25.1322(f) says other flight-deck uses of red, amber and yellow “must be limited and must not adversely affect flight crew alerting” — and the AMC allows weather radar and terrain displays. “Used for nothing else” is the practice the rule protects, not the rule's own words."
  - "Design consideration 1 compresses the rule's definitions. CS 25.1322(b) distinguishes Warning and Caution by the response (“immediate” versus “subsequent”), but requires immediate flight crew awareness for both. “Act soon” carries the response and drops the awareness."
  - "Mechanism steps: drafted. Steps 2 and 3 carry sourced notes; the titles, details, and steps 4 and 5 are mine. Step 4 in particular — grouping consequential alarms under their cause — is standard alarm-management practice but is not in the research."
  - "Demo is a simplified illustration in the shape of the TMI sequence, not plant data, and says so on both panels. The thirty alarm texts are plausible rather than drawn from the record: the Commission's report names some of them, but the list, the arrival order and the split between cautions and consequences are mine."

openQuestions:
  - "The process industry's alarm management standard, ISA-18.2, is closer to a warehouse or plant control room than a flight deck, and it's where alarm rationalization and grouping are actually specified. It hasn't been pulled yet."
  - "Whether ranking survives a cascade. Three levels work on a flight deck partly because the number of possible alerts is limited and certified in advance. A plant or a robot fleet can generate thousands, and then the ranking has to be computed, not assigned ahead of time."
---

## Design considerations

- **Define levels by what the person must do.** Warning: act now. Caution: act soon. Advisory: be aware.[cite:easa-cs25-1322]
- **Reserve the colors.** Red and amber each mean one thing and are used for nothing else.[cite:easa-cs25-1322]
- **Use two senses for anything urgent.** Above Advisory, pair the visual alert with sound or touch.[cite:easa-cs25-1322]
- **Group consequences under their cause.** This is the step most often skipped, and it's the difference between a hundred alarms and one.
- **Keep the record live.** At Three Mile Island the alarm printer fell more than two and a half hours behind. A log that lags is history, not status.[cite:nrc-printer]

## In the field

**Observed · Industrial.** [Three Mile Island](#tale): a hundred alarms within minutes of the first, none of them ranked, and an operator who would have thrown the panel away.[cite:tmi-commission]

**Observed · Aviation.** The three-level flight crew alerting scheme — Warning, Caution, Advisory, with reserved colors and at least two senses for the top two — is a certification requirement for large airplanes.[cite:easa-cs25-1322]

## Notes

The aviation answer is worth borrowing because it's so unglamorous: three levels, colors that mean one thing, two senses for anything urgent. None of it is clever. It's a budget, spent in advance, on the assumption that attention is finite and the worst moment is when everything happens at once.
