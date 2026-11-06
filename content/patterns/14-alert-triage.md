---
number: 14
name: "Alert Triage"
intent: "Alerts are ranked by how urgently a human must act, and the ranking is visible in colour, position and sound, so the critical signal is not buried in a flood of equals."
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
updated: "2026-10-30"

steps:
  - title: "Condition detected"
    detail: "Something the operator may need to act on"
  - title: "Rank it by urgency"
    detail: "Act now, act soon, be aware"
    key: true
  - title: "Encode the rank"
    detail: "Colour, position and sound carry it"
  - title: "Suppress the rest"
    detail: "Consequences of a fault, not new faults"
  - title: "Link to the response"
    detail: "The alert carries its procedure"

antiPattern: "Alarm Flood"

without:
  steps: ["Fault cascades", "Everything alarms", "Nothing is legible"]
  caption: "Alarm Flood: at Three Mile Island a hundred alarms arrived within minutes of the first, and the alarm printer fell more than two and a half hours behind events. An operator told the President's Commission he would have liked to throw the alarm panel away, because it gave no useful information."

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
  - "Needs demo (see DEMOS.md)"
  - "Needs a cautionary tale"
  - "Mechanism steps: drafted. Steps 2 and 3 carry sourced notes; the titles, details, and steps 4 and 5 are mine. Step 4 in particular — suppressing consequential alarms — is standard alarm-management practice but is not in the research."

openQuestions:
  - "The research asks for ISA-18.2, the process-industry alarm management standard, as a second interface example — closer to a warehouse or plant control room than a flight deck, and the place where alarm rationalisation and suppression are actually specified. It has not been pulled."
  - "Whether ranking survives contact with a cascade. Three levels work on a flight deck partly because the number of possible alerts is bounded and certified. A plant or a robot fleet can generate thousands, and at that point the ranking has to be computed rather than assigned in advance."
---

The detail that makes Three Mile Island more than a volume problem is the printer falling two and a half hours behind.[cite:nrc-printer] The alarms were not just too many to read; the record of them stopped being a record of the present. Whatever the operators were looking at had come loose from what the plant was doing, which is the state this pattern exists to prevent — and the operator's remark about throwing the panel away is what a display looks like once it has lost the ability to distinguish anything.[cite:tmi-commission]

The aviation answer is worth borrowing precisely because it is so unglamorous. Three levels, defined by what the crew must do and when.[cite:easa-cs25-1322] Colours that mean one thing and are not available for anything else. Two sensory channels for anything above Advisory. None of that is clever; it is a budget, spent in advance, on the assumption that attention is finite and the worst moment is when everything happens at once. The part most often skipped is the fourth step, suppressing the consequences of a fault so they do not arrive as peers of their own cause — which is the difference between a hundred alarms and one.
