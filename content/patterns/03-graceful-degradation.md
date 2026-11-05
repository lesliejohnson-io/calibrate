---
number: 3
name: "Graceful Degradation"
intent: "When the system can’t do what it’s supposed to, it steps down to a defined fallback state and says so — without panic or silence."
# The index card's line (redesign-handoff.md §2). Drafted on the redesign
# canvas, 2026-11-05 — not yet reviewed.
cardIntent: "When it can't do its job, the system steps down to a defined fallback and says so."

moment: failure
trustJobs: [recover, know]
risk: critical
reversibility: costly
autonomy: [3, 5]
domains: [automotive, drone, industrial]

status: draft
updated: "2026-10-23"

steps:
  - title: "Full capability"
    detail: "All systems nominal"
  - title: "Fault detected"
    detail: "Sensor, link or model loss"
  - title: "Step down"
    detail: "To the next defined fallback"
    note: "Fallbacks are designed in advance as a ladder: full → reduced → minimal-safe → stop."
    key: true
  - title: "Signal limits"
    detail: "What still works, what doesn’t"
  - title: "Restore"
    detail: "Or escalate via a Handoff"
    note: "Restore when you can; hand control to the human when you can’t."

without:
  steps: ["Fault occurs", "Silence or alarm flood", "Operator guesses"]
  caption: "Either nothing changes on screen, or everything screams at once. No one can tell what still works."

with:
  steps: ["Fault occurs", "Calm step-down", "Known limits"]
  caption: "The system names its new state and limits, so the operator adjusts instead of panicking."

related:
  - slug: handoff
    type: precedes
    note: "When the ladder runs out of fallbacks, the system escalates by handing control back."

review:
  - "No citations placed. All three sentences in Notes are design advice rather than claims about the world, and a strict pass found nothing a source could carry."

sources:
  - id: sae-j3016
    title: "SAE J3016 — Taxonomy and Definitions for Terms Related to Driving Automation Systems"
    year: 2021
    url: "https://saemobilus.sae.org/standards/j3016_202104-taxonomy-definitions-terms-related-driving-automation-systems-road-motor-vehicles"
    type: standard
    note: "Defines the minimal risk condition and the DDT fallback — the formal name for a defined fallback state."
  - id: un-r157
    title: "UN Regulation No. 157 — Automated Lane Keeping Systems (ALKS)"
    url: "https://eur-lex.europa.eu/eli/reg/2021/389/oj/eng"
    type: standard
    note: "Defines the Minimum Risk Manoeuvre: what the system does when the human does not respond, or when a severe failure occurs. A worked regulatory example of stepping down."
  - id: norman-1990
    title: "The “Problem” of Automation: Inappropriate Feedback and Interaction, Not “Over-Automation”"
    author: "Donald A. Norman"
    year: 1990
    url: "https://ntrs.nasa.gov/api/citations/19900004678/downloads/19900004678.pdf"
    type: paper
    note: "Automation sits at an intermediate level of intelligence and fails precisely when the situation exceeds it, so degradation has to be designed in rather than discovered."
  - id: bea-af447
    title: "BEA Final Report — Air France Flight AF447, Rio de Janeiro to Paris"
    year: 2012
    url: "https://www.faa.gov/sites/faa.gov/files/f-cp090601.en_.pdf"
    type: incident-report
    note: "Observed: the system dropped to a degraded control mode after unreliable airspeed, and the crew did not grasp the new state. The “says so” half of the pattern failed."
---

The fallback states have to exist before the fault does. A system that improvises its way down cannot tell the operator what it can still be trusted with, which is the thing they most need to know. Work out the ladder in advance, and make each rung specific enough that the operator can tell which tasks are still available and which have gone.
