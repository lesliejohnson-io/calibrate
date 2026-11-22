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

status: reviewed
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
    control room, each one looking as urgent as the next.[cite:tmi-commission]
    The printer recording them fell more than two and a half hours
    behind.[cite:nrc-printer] Amid the flood, the operators misread what was
    happening and cut back the emergency cooling the reactor needed, and about
    half the core melted.[cite:nrc-tmi-backgrounder] It was the worst accident
    in the history of US commercial nuclear power.[cite:nrc-tmi-backgrounder]
  sourceId: [tmi-commission, nrc-printer, nrc-tmi-backgrounder]

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
    note: "Observed. The Commission's own report, which describes the first alarm followed by a cascade of alarms that numbered 100 within minutes, and quotes operator Craig Faust telling the Commission he would have liked to have thrown away the alarm panel because it was not giving useful information. It also describes a control room where alarms sound or flash many times each hour as a matter of routine. Scanned copy hosted by TMI Alert; the printer delay is not in this report and stays on the Metropolitan Edison testimony. The linked copy is partial: 86 pages holding the Preface, the Account of the Accident and the Glossary, without the Overview. The design consideration quoting the report (\"there was no system for suppressing the unimportant signals so that operators could concentrate on the significant alarms\") is from the Overview, under Causes of the Accident, and was read in the pddoc.com transcription (https://www.pddoc.com/tmi2/kemeny/causes_of_the_accident.htm), not in this copy. The same sentence says more than 100 alarms went off in the first few minutes."
  - id: nrc-printer
    title: "Metropolitan Edison testimony on the Three Mile Island alarm printer delay"
    author: "William P. Hamilton and Robert W. Keaten, for Metropolitan Edison"
    url: "https://www.nrc.gov/docs/ML1933/ML19337A432.pdf"
    type: incident-report
    note: "The licensee's testimony in the TMI-1 restart proceeding, dated 9/15/80 and hosted on the NRC's document system. It is not NRC testimony. The figure is in ECNP Contention No. 1(a), an intervenor's contention the testimony quotes in order to answer it: “the alarm printer on the similar computer at Unit 2 had a delay time of over two and one-half hours at one point, and ran more than an hour behind events for over seven hours.” The response doesn't dispute the figure, and concedes that “the printed record will always be lagging”."
  - id: nrc-tmi-backgrounder
    title: "Backgrounder on the Three Mile Island Accident"
    author: "U.S. Nuclear Regulatory Commission"
    url: "https://www.nrc.gov/reading-rm/doc-collections/fact-sheets/3mile-isle.html"
    type: incident-report
    note: "The source for the opening story's cut-back emergency cooling, the half-melted core and the worst-accident line. The NRC states that \"about one-half of the core melted during the early stages of the accident.\" Not read directly this pass: nrc.gov returns 403 to an automated fetch. The core-melt wording is supported by archived copies of this page in search results; the emergency-cooling and worst-accident claims were attached without a reading of the page."
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

openQuestions:
  - "The process industry's alarm management standard, ISA-18.2, is closer to a warehouse or plant control room than a flight deck, and it's where alarm rationalization and grouping are actually specified. It hasn't been pulled yet."
  - "Whether ranking survives a cascade. Three levels work on a flight deck partly because the number of possible alerts is limited and certified in advance. A plant or a robot fleet can generate thousands, and then the ranking has to be computed, not assigned ahead of time."
---

## Design considerations

- **Define levels by what the person must do.** Warning: act now. Caution: act soon. Advisory: be aware.[cite:easa-cs25-1322]
- **Reserve the colors.** Red and amber each mean one thing and are used for nothing else.[cite:easa-cs25-1322]
- **Use two senses for anything urgent.** Above Advisory, pair the visual alert with sound or touch.[cite:easa-cs25-1322]
- **Group consequences under their cause.** This is the step most often skipped, and it's the difference between a hundred alarms and one.
- **Suppress what doesn't matter.** At Three Mile Island, the President's Commission found, "there was no system for suppressing the unimportant signals so that operators could concentrate on the significant alarms."[cite:tmi-commission]
- **Keep the record live.** At Three Mile Island the alarm printer fell more than two and a half hours behind. A log that lags is history, not status.[cite:nrc-printer]

## In the field

**Observed · Industrial.** [Three Mile Island](#tale): a hundred alarms within minutes of the first, none of them ranked, and an operator who would have thrown the panel away.[cite:tmi-commission]

**Observed · Aviation.** The three-level flight crew alerting scheme — Warning, Caution, Advisory, with reserved colors and at least two senses for the top two — is a certification requirement for large airplanes.[cite:easa-cs25-1322]

## Notes

The aviation answer is worth borrowing because it's so unglamorous: three levels, colors that mean one thing, two senses for anything urgent. None of it is clever. It's a budget, spent in advance, on the assumption that attention is finite and the worst moment is when everything happens at once.
