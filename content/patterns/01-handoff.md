---
number: 1
name: "The Handoff"
intent: "The machine yields control on purpose: it signals the transfer, hands over its current state, and gives the human time to orient before they are accountable."
# The index card's line (redesign-handoff.md §2). Drafted on the redesign
# canvas, 2026-11-05 — not yet reviewed.
cardIntent: "The machine yields control on purpose and gives the human time to orient before they are accountable."

moment: transition
trustJobs: [intervene, predict]
risk: critical
reversibility: irreversible
autonomy: [2, 4]
domains: [automotive, surgical, drone]

status: draft
updated: "2026-10-23"

steps:
  - title: "Machine leads"
    detail: "Autonomy nominal"
  - title: "Trigger"
    detail: "Approaching the edge of its limits"
    note: "Hand off early and on purpose, at a designed boundary — not at the moment of failure."
  - title: "Signal + state"
    detail: "Mode, intent, hazards, time left"
    key: true
  - title: "Orient"
    detail: "Human acknowledges, gets bearings"
    note: "The window is sized to how long a human needs to re-enter the task, not to when the machine runs out."
  - title: "Human leads"
    detail: "Machine confirms release"

without:
  steps: ["Machine driving", "Sudden alarm", "Human takes over cold"]
  caption: "Control drops with no context. The human inherits the situation at the worst possible moment."

with:
  steps: ["Early signal", "State briefing", "Confirmed takeover"]
  caption: "The transfer is announced, explained and acknowledged. Responsibility moves only once the human is oriented."

# --- Drafted on the redesign canvas, 2026-11-05. Not yet reviewed: the DRAFT
# tags next to these headings are cleared field by field in `drafts:` below.
whenToUse: "Use this whenever a machine can reach the edge of what it can safely do and an operator is expected to take over. It matters most at autonomy levels where the human isn't watching continuously, so they arrive cold."

considerations:
  - rule: "Trigger at a designed boundary."
    why: "Decide in advance which conditions start a handoff, and start it before the machine runs out of options. A handoff that begins at the moment of failure is already late."
  - rule: "Size the window to the human."
    why: "Planned takeovers vary widely in how long they take. Base the orientation window on operators who have been out of the loop, not on emergency takeover data."
  - rule: "Brief all three levels."
    why: "Tell the human what is happening, what it means, and what happens next. Raw state alone leaves them holding data instead of understanding."
  - rule: "Clear the channel."
    why: "Suspend unrelated displays and media once a handoff starts, so the briefing is the only thing competing for attention."
  - rule: "Release only on acknowledgment."
    why: "Responsibility moves when the human confirms, not when a timer expires. If nobody confirms, fall back to a safe stop rather than handing control to no one."

examples:
  # The AF447 figure is not in /public yet. BEA, AF447 Final Report, 2012,
  # Figure 70 — confirm the BEA's reuse terms before publishing, and note on
  # the credit line that the figure is used under those terms, not CC BY.
  - alt: "ALKS transition-demand HMI"
    verdict: applies
    caption: "UN R157 names this moment the transition demand, and requires non-driving displays to suspend once it starts."
  - alt: "AF447 cockpit, with the message display zone marked"
    credit: "BEA, AF447 Final Report, 2012, Figure 70"
    url: "https://www.faa.gov/sites/faa.gov/files/f-cp090601.en_.pdf"
    verdict: without
    caption: "Air France 447: the autopilot disconnected suddenly and the crew took over cold. The handoff arrived as a few lines of text in this zone."
  - alt: "NTSB Tempe timeline figure"
    credit: "NTSB HAR-19/03, 2019"
    url: "https://www.ntsb.gov/investigations/accidentreports/reports/har1903.pdf"
    verdict: without
    caption: "Tempe, 2018: the system never alerted the safety operator, and the operator was not monitoring."

drafts:
  whenToUse: true
  considerations: true
  examples: true

related:
  - slug: shared-mental-model
    type: requires
    note: "The state briefing only works if the human's model of the situation is already current."

review:
  - "Needs demo (see DEMOS.md)"
  - "Needs a cautionary tale"
  - "Check Bainbridge citation placement. Bainbridge supports why a late or cold takeover fails — the operator has been monitoring for rare failures with skills gone rusty from disuse — not the \"hand off early, at a designed boundary\" claim the sentence leads with. There is no sentence in the body making that point on its own, so the citation was removed rather than moved."

sources:
  - id: bainbridge-1983
    title: "Ironies of Automation"
    author: "Lisanne Bainbridge"
    year: 1983
    url: "https://doi.org/10.1016/0005-1098(83)90046-8"
    type: paper
    note: "The classic statement of why the handoff is the hard part: automation leaves the human to monitor for rare failures and take over when things go wrong, with skills gone rusty from disuse. The case for handing off early and at a designed boundary rather than at the moment of failure."
  - id: gold-2013
    title: "“Take over!” How long does it take to get the driver back into the loop?"
    author: "Christian Gold, Daniel Damböck, Lutz Lorenz and Klaus Bengler"
    year: 2013
    url: "https://mediatum.ub.tum.de/doc/1308108/file.pdf"
    type: paper
    note: "The empirical basis for sizing the orientation window: shorter takeover times produce faster decisions that are also worse ones."
  - id: eriksson-stanton-2017
    title: "Takeover Time in Highly Automated Vehicles: Noncritical Transitions to and From Manual Control"
    author: "Alexander Eriksson and Neville A. Stanton"
    year: 2017
    url: "https://doi.org/10.1177/0018720816685832"
    type: paper
    note: "Non-critical takeovers vary enormously, roughly 2 to 26 seconds. Sizing a planned handoff from emergency-takeover data is a mistake."
  - id: un-r157
    title: "UN Regulation No. 157 — Automated Lane Keeping Systems (ALKS)"
    url: "https://eur-lex.europa.eu/eli/reg/2021/389/oj/eng"
    type: standard
    note: "The regulatory vocabulary for this pattern: transition demand, transition phase, and planned versus unplanned events. It also requires non-driving displays to suspend once a handoff starts."
  - id: sae-j3016
    title: "SAE J3016 — Taxonomy and Definitions for Terms Related to Driving Automation Systems"
    year: 2021
    url: "https://saemobilus.sae.org/standards/j3016_202104-taxonomy-definitions-terms-related-driving-automation-systems-road-motor-vehicles"
    type: standard
    note: "Defines the request to intervene, and the fallback-ready user role that Level 3 depends on."
  - id: ntsb-har-19-03
    title: "NTSB HAR-19/03 — Collision Between Vehicle Controlled by Developmental Automated Driving System and Pedestrian, Tempe, Arizona"
    year: 2019
    url: "https://www.ntsb.gov/investigations/accidentreports/reports/har1903.pdf"
    type: incident-report
    note: "Observed: the failure this pattern exists to prevent. The system never alerted the safety operator, and the operator was not monitoring."
  - id: bea-af447
    title: "BEA Final Report — Air France Flight AF447, Rio de Janeiro to Paris"
    year: 2012
    url: "https://www.faa.gov/sites/faa.gov/files/f-cp090601.en_.pdf"
    type: incident-report
    note: "Observed: sudden autopilot disconnection, startle, and a crew taking over cold. The “Without” column in real life."
  - id: endsley-jones
    title: "Designing for Situation Awareness"
    author: "Mica Endsley and Debra Jones"
    url: "https://www.amazon.com/dp/1420063553"
    type: book
    note: "The three-level model — what’s happening, what it means, what happens next — is a test for the state briefing. A handoff that delivers the first level alone leaves the human holding data instead of understanding."
  - id: carr-2014
    title: "The Glass Cage"
    author: "Nicholas Carr"
    year: 2014
    url: "https://www.amazon.com/dp/0393351637"
    type: book
    note: "Why a cold takeover fails even when the alarm works: skill and attention erode while the machine is driving. The orientation window has to be sized for an operator who has been out of the loop, not for one who never left it."

---

Timing is where this one usually goes wrong. A handoff triggered when the machine runs out of options is already too late, because the operator has been out of the loop and needs time to work out what is happening before they can act.[cite:carr-2014] Planned takeovers vary enormously in how long they take, so sizing the window from emergency data will leave people short.[cite:eriksson-stanton-2017]
