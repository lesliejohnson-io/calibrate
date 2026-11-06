---
number: 3
name: "Graceful Degradation"
intent: "When the system can't do what it's supposed to, it steps down to a planned fallback and says plainly what still works."
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
updated: "2026-11-06"

steps:
  - title: "Full capability"
    detail: "All systems nominal"
  - title: "Fault detected"
    detail: "Sensor, link or model loss"
  - title: "Step down"
    detail: "To the next defined fallback"
    note: "Fallbacks are designed in advance as a ladder: full, then reduced, then minimal-safe, then stop."
    key: true
  - title: "Signal limits"
    detail: "What still works, what doesn't"
  - title: "Restore"
    detail: "Or escalate via a Handoff"
    note: "Restore capability when it comes back, and hand control to the human when it doesn't."

antiPattern: "Silent Step-Down"

interface:
  component: graceful-degradation

cautionaryTale:
  title: "Air France Flight 447"
  date: "June 1, 2009"
  place: "Atlantic Ocean"
  story: >-
    At night over the Atlantic, ice crystals blocked the airspeed sensors of
    an Airbus A330 flying from Rio de Janeiro to Paris. The autopilot
    disconnected, and the flight controls dropped into a reduced mode that no
    longer protected the airplane from stalling. The crew, handed control
    without warning, never worked out which protections were gone. The
    airplane climbed, stalled, and fell for more than three minutes into the
    ocean, killing all 228 people on board.
  sourceId: bea-af447

therefore: >-
  When a system loses capability, it steps down to a fallback designed in
  advance, and tells the operator plainly what still works and what doesn't.

without:
  steps: ["Fault occurs", "Silence or alarm flood", "Operator guesses"]
  caption: "The system did step down, as designed: when its airspeed data failed, it gave up the functions that depended on it. What it didn't do was make the new state clear. The crew was suddenly flying a different airplane from the one they'd had a minute earlier, and nothing told them what it could still be trusted with."

with:
  steps: ["Fault occurs", "Calm step-down", "Known limits"]
  caption: "The system names its new state and limits, so the operator adjusts instead of panicking."

related:
  - slug: handoff
    type: precedes
    note: "When the ladder runs out of fallbacks, the system escalates by handing control back."

review:
  - "Tale, one claim the BEA report does not carry as written. “Never worked out which protections were gone”: the report records the PNF calling out “alternate law protections” at 2 h 10 min 16 and reading the reconfiguration to alternate law off the ECAM between 2 h 10 min 18 and 2 h 10 min 25. The BEA's own conclusion is hedged — “although the PNF had called out the reconfiguration to alternate law when reading the ECAM, and even though the indicators of the loss of protection should have been displayed on the PFD (SPD LIM and an amber cross in roll and yaw), it is possible that the PF was not fully aware of this reconfiguration and of what it implied”. Text left as supplied."
  - "Anti-pattern, same point in stronger form. “Nothing told them what it could still be trusted with” is contradicted in the narrow sense: the ECAM announced the reconfiguration and the PFD should have shown the loss of protection. What the report does support is that no message identified the origin of the failure — “No failure message is provided that identifies the origin of these other failures: in particular, the rejection of the ADR's and of the speed measurements” — and that it is possible the pilot flying did not grasp what the new law implied. Shown and not registered, as on Shared Mental Model. Text left as supplied."
  - "Tale, two smaller hedges in the source. The report says the speed indications were incorrect “likely following the obstruction of the Pitot probes by ice crystals”; the tale states it flatly. And “handed control without warning” is the crew's experience rather than the report's wording: the autopilot disconnection was itself annunciated, and the report says the crew “detected a problem with this disconnection”."
  - "Verified against the BEA final report this pass: the A330-203 on AF 447, Rio de Janeiro Galeão to Paris Charles de Gaulle; autopilot disconnection and “a reconfiguration to alternate law”; “In alternate or direct law, the angle-of-attack protections are no longer available but a stall warning is triggered”; a maximum altitude of “about 38,000 ft”; impact at 2 h 14 min 28, more than three minutes after the apogee; and 228 fatalities (12 crew, 216 passengers). Note that the stall warning itself kept sounding — what was lost was the protection, not the warning."
  - "Verified against UN R157 this pass: 5.1.5, “If the driver fails to resume control of the DDT during the transition phase, the system shall perform a minimum risk manoeuvre”, and the 2.7 definition, “a procedure aimed at minimising risks in traffic, which is automatically performed by the system after a transition demand without driver response or in the case of a severe ALKS or vehicle failure”. Whether a separate operative paragraph makes the manoeuvre mandatory for a severe failure, rather than permitted, was not read: section 5.4 could not be pulled verbatim."
  - "Demo is a simplified illustration. The fault codes, the mode labels and the four-rung ladder are written for this page, not taken from any aircraft. The spec put “Landing in place. No operator response needed.” at the bottom rung; it prints on LAND IN PLACE, because the bottom rung is STOP, which is where the drone sits once it is down."
  - "Mechanism steps: unchanged apart from the two notes, which were rewritten to read as sentences."

openQuestions:
  - "How many rungs are too many? Each extra fallback state is one more mode the operator has to recognize, which risks the very confusion Shared Mental Model is about."
  - "Who decides when to step back up? Restoring capability automatically is convenient, but it changes the machine's behavior under the operator's hands."

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
    note: "Defines the Minimum Risk Manoeuvre: what the system does when the human does not respond, or when a severe failure occurs. A worked regulatory example of stepping down. Paragraph 5.1.5 requires it after a transition demand the driver does not answer; 2.7 defines it."
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

## Design considerations

- **Design the ladder before the fault.** A system that improvises its way down can't tell the operator what it can still be trusted with, which is the thing they most need to know.[cite:norman-1990]
- **Make every rung specific.** Each fallback state names which tasks are still available and which are gone.
- **Say what still works, not just what failed.** A list of losses leaves the operator to work out the rest.
- **Make each step down one event, not fifty.** A step down produces alerts by design; group them so the operator sees one change of state. [Alert Triage](/patterns/alert-triage) is how that grouping is done.
- **Define the floor.** When every fallback is used up and nobody responds, the system gets itself to a safe state on its own: what the standards call a minimal risk condition or minimum risk maneuver.[cite:sae-j3016][cite:un-r157]

## In the field

**Observed · Aviation.** [Air France 447](#tale): the flight controls stepped down to a mode without stall protection, and the crew flew on without establishing what the new mode could still be trusted with.[cite:bea-af447]

**Observed · Automotive.** UN R157 requires an automated lane keeping system to perform a minimum risk manoeuvre when the driver does not resume control after a transition demand — the floor of the ladder, written into a regulation.[cite:un-r157]
