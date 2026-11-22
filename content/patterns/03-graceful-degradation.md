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
domains: [driving, drone, industrial]

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

# VERIFY against NTSB/MAR-97/01 before this leaves draft: how long after
# leaving Bermuda the antenna cable separated ("about an hour"); the alarm the
# GPS gave on losing signal — its duration, whether it was audible, and where
# on the bridge it annunciated; the "DR" indication on the GPS display and
# where that display sat relative to the watch station; that the autopilot
# took position from the GPS without distinguishing a fix from an estimate;
# the roughly 34 hours between the switch to dead reckoning and the
# grounding; how far west of the intended track the ship had drifted;
# "about 10 miles east of Nantucket" for Rose and Crown Shoal; roughly 1,500
# people aboard; and that there were no injuries, which the text implies by
# not mentioning any.
cautionaryTale:
  title: "Royal Majesty cruise ship"
  date: "June 10, 1995"
  place: "Nantucket, Massachusetts"
  story: >-
    About an hour after the cruise ship left Bermuda for Boston, the cable to
    its GPS antenna came loose. The GPS quietly switched to dead reckoning,
    estimating position without accounting for wind or current, and the
    autopilot, which wasn't designed to notice the change, kept steering by
    it. The only signals were a brief alarm and a small "DR" on the GPS unit,
    away from where the officers stood watch. For about 34 hours the bridge
    believed the ship was on course while it drifted steadily west. The Royal
    Majesty ran aground on Rose and Crown Shoal, about 10 miles east of
    Nantucket, with roughly 1,500 people aboard.
  sourceId: ntsb-mar-97-01

# Which of the sections above the fold are freshly written and unchecked.
drafts:
  tale: true
  antiPattern: true
  examples: true

therefore: >-
  When a system loses capability, it steps down to a fallback designed in
  advance, and tells the operator plainly what still works and what doesn't.

without:
  steps: ["Fault occurs", "Silence or alarm flood", "Operator guesses"]
  # VERIFY against NTSB/MAR-97/01: that switching to dead reckoning on loss
  # of satellite signal was the GPS unit's designed behaviour rather than a
  # fault; that the autopilot consumed the estimated position without
  # distinguishing it from a fix, and had no way to detect the mode change;
  # and that the officers of the watch were navigating on that position for
  # the roughly day and a half the phrase "a day and a half earlier" rests on.
  caption: "The GPS stepped down exactly as designed when it lost its signal, but nothing downstream noticed. The autopilot kept treating estimates as fixes, and the officers kept trusting a position that had stopped being measured a day and a half earlier."

with:
  steps: ["Fault occurs", "Calm step-down", "Known limits"]
  caption: "The system names its new state and limits, so the operator adjusts instead of panicking."

related:
  - slug: handoff
    type: precedes
    note: "When the ladder runs out of fallbacks, the system escalates by handing control back."

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
  - id: ntsb-mar-97-01
    title: "Grounding of the Panamanian Passenger Ship Royal Majesty on Rose and Crown Shoal near Nantucket, Massachusetts, June 10, 1995"
    author: "National Transportation Safety Board"
    year: 1997
    url: "https://www.ntsb.gov/investigations/AccidentReports/Reports/MAR9701.pdf"
    type: incident-report
    note: "Observed, and the source for the opening story. NTSB/MAR-97/01. Not yet read against the page: every figure in the tale and the anti-pattern above is drafted from the brief, and the VERIFY comments in this file's frontmatter list what has to be checked. The reason this incident is here rather than a second aviation one is that the step-down and the failure to notice it sit in different boxes — the GPS degraded correctly, and the autopilot consuming its output had no idea."
  - id: bea-af447
    title: "BEA Final Report — Air France Flight AF447, Rio de Janeiro to Paris"
    year: 2012
    url: "https://www.faa.gov/sites/faa.gov/files/f-cp090601.en_.pdf"
    type: incident-report
    note: "Observed: the system dropped to a degraded control mode after unreliable airspeed. The reconfiguration was called out from the ECAM, and the BEA concludes it is possible the pilot flying “was not fully aware of this reconfiguration and of what it implied.” The “says so” half of the pattern failed."
---

## Design considerations

- **Design the ladder before the fault.** A system that improvises its way down can't tell the operator what it can still be trusted with, which is the thing they most need to know.[cite:norman-1990]
- **Make every rung specific.** Each fallback state names which tasks are still available and which are gone.
- **Say what still works, not just what failed.** A list of losses leaves the operator to work out the rest.
- **Make each step down one event, not fifty.** A step down produces alerts by design; group them so the operator sees one change of state. [Alert Triage](/patterns/alert-triage) is how that grouping is done.
- **Define the floor.** When every fallback is used up and nobody responds, the system gets itself to a safe state on its own: what the standards call a minimal risk condition or minimum risk maneuver.[cite:sae-j3016][cite:un-r157]

## In the field

<!-- VERIFY: the AF447 entry below is this page's displaced opening story, cut
     to one sentence and keeping its own source. The claim to check against
     the BEA final report is the one this file's review list already records
     at length: the report says the reconfiguration to alternate law *was*
     called out and should have been displayed, so "never established what the
     new mode could still be trusted with" rests on the report's hedged
     conclusion that the pilot flying may not have grasped what it implied,
     not on a finding that nothing was shown. -->
**Observed · Aviation.** Air France 447: the flight controls stepped down to a mode without stall protection. The reconfiguration was called out from the ECAM, and the BEA concludes it is possible the pilot flying "was not fully aware of this reconfiguration and of what it implied."[cite:bea-af447]

**Observed · Driving.** UN R157 requires an automated lane keeping system to perform a minimum risk manoeuvre when the driver does not resume control after a transition demand — the floor of the ladder, written into a regulation.[cite:un-r157]
