---
number: 5
name: "Shared Mental Model"
intent: "The operator’s picture of what the machine is doing matches what it’s actually doing."
# The index card's line (redesign-handoff.md §2). Same sentence as `intent`
# above, by Leslie's call on 2026-11-06 — the card and the page lede say the
# one thing rather than two near-identical versions of it.
cardIntent: "The operator’s picture of what the machine is doing matches what it’s actually doing."

moment: during
trustJobs: [predict, know]
risk: elevated
reversibility: costly
autonomy: [2, 5]
domains: [aviation, industrial, warehouse, surgical]

status: draft
updated: "2026-10-23"

steps:
  - title: "Machine state"
    detail: "Mode, intent, next move"
  - title: "Externalize"
    detail: "Display, light, sound, motion cue"
    note: "Show intent before motion: where the machine will go next, not only where it is now."
  - title: "Human belief"
    detail: "Believed state, predicted move"
  - title: "Detect drift"
    detail: "Belief ≠ actual state"
    note: "Drift is caught both ways: the machine also models what the human expects it to do."
    key: true
  - title: "Resync"
    detail: "Correct, then confirm alignment"

antiPattern: "Divergent Models"

interface:
  component: autothrottle

cautionaryTale:
  title: "Asiana Airlines Flight 214 at San Francisco"
  date: "6 July 2013"
  place: "San Francisco, California"
  story: >-
    On a clear-weather approach to San Francisco, the crew of a Boeing 777
    believed the autothrottle was managing their airspeed. It wasn’t. An
    earlier action had left it in a hold mode, where it would no longer add
    power on its own. The change was displayed at the top of both pilots’
    main flight displays, but none of the three pilots in the cockpit recalled
    seeing it. The airspeed dropped steadily while the crew watched their path,
    and by the time they noticed, it was too late to recover. The airplane
    struck the seawall short of the runway; three passengers died and 49 people
    were seriously injured.
  sourceId: ntsb-aar-14-01

therefore: >-
  Make the machine’s current mode, and what that mode will and won’t do,
  unmistakable at the moment it matters.

without:
  steps: ["Robot moves", "Human assumes", "Near miss"]
  caption: "The crew and the airplane each had a picture of who was controlling airspeed, and the pictures didn’t match. Nothing showed them the gap until the airspeed did."

with:
  steps: ["Intent shown", "Human predicts", "Coordinated work"]
  caption: "Each side can anticipate the other, so they share a workspace safely."

review:
  - "Tale, one sentence changed. The supplied copy said “nothing on the flight deck made that obvious”. NTSB/AAR-14/01 1.6.3.3 says the A/T mode is annunciated on the FMA at the top of each PFD, in green and boxed for ten seconds when it becomes active; 1.1 says none of the three crewmembers recalled seeing it. It was shown and not registered, which is the sharper version of this pattern. Rewritten to say so."
  - "Anti-pattern name “Divergent Models” is drafted. This pattern has no research entry, so nothing named its failure. Note research/during.md reserves “Silent Mode Switch” for a separate, unwritten Mode Awareness pattern."
  - "Asiana 214 is earmarked in research/during.md as the incident for that unwritten Mode Awareness pattern. Using it here spends it; decide whether Mode Awareness still gets written and what it opens with."
  - "Unsourced claim: “a machine with no model of what the operator expects it to do cannot tell when that expectation has gone wrong”. The two-way sync is argued, not sourced: Sarter and Woods cover the operator's model diverging from the system's mode, not the reverse."

sources:
  - id: ntsb-aar-14-01
    title: "Descent Below Visual Glidepath and Impact With Seawall, Asiana Airlines Flight 214, Boeing 777-200ER, HL7742, San Francisco, California, July 6, 2013"
    author: "National Transportation Safety Board"
    year: 2014
    url: "https://www.ntsb.gov/investigations/AccidentReports/Reports/AAR1401.pdf"
    type: incident-report
    note: "Observed. NTSB/AAR-14/01. Moving the thrust levers to idle put the autothrottle into HOLD, a mode in which it does not control airspeed, and none of the three flight crewmembers noted the change (1.1). Section 1.6.3.3 describes the flight mode annunciator at the top of each primary flight display, which shows the active A/T mode in green inside a box for ten seconds when it first becomes active — so the mode was displayed and not registered. The abstract gives the casualties: three of the 291 passengers fatally injured, and 40 passengers, 8 of the 12 flight attendants and 1 of the 4 flight crewmembers seriously injured, which is the 49 in the tale."
  - id: sarter-woods-1995
    title: "How in the World Did We Ever Get into That Mode? Mode Error and Awareness in Supervisory Control"
    author: "Nadine B. Sarter and David D. Woods"
    year: 1995
    url: "https://trid.trb.org/View/426376"
    type: paper
    note: "Mode error and automation surprises: what happens when the operator's model of the system's mode diverges from its actual mode."
  - id: klein-2004
    title: "Ten Challenges for Making Automation a “Team Player” in Joint Human-Agent Activity"
    author: "Gary Klein, David D. Woods, Jeffrey M. Bradshaw, Robert R. Hoffman and Paul J. Feltovich"
    year: 2004
    url: "https://doi.org/10.1109/MIS.2004.74"
    type: paper
    note: "Mutual predictability, common ground, making current state obvious, and communicating status and intention. Close to a specification for this pattern."
  - id: endsley-1995
    title: "Toward a Theory of Situation Awareness in Dynamic Systems"
    author: "Mica R. Endsley"
    year: 1995
    url: "https://doi.org/10.1518/001872095779049543"
    type: paper
    note: "Perception, comprehension and projection — the vocabulary for what being “in sync” actually means."
  - id: cannon-bowers-1993
    title: "Shared Mental Models in Expert Team Decision Making"
    author: "Janis A. Cannon-Bowers, Eduardo Salas and Sharolyn Converse"
    year: 1993
    type: book
    note: "The origin of the term in team research: compatible models are what let teammates coordinate without saying anything. A chapter in Castellan's Individual and Group Decision Making; no stable open link."
---

Showing the current state is not enough on its own, because an operator working alongside a machine is always predicting its next move.[cite:endsley-1995] Signal intent before the motion starts, so that prediction has something to work from.[cite:klein-2004] The sync runs both ways as well: a machine with no model of what the operator expects it to do cannot tell when that expectation has gone wrong.
