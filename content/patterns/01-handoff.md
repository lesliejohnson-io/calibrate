---
number: 1
name: "The Handoff"
intent: "The machine hands over control on purpose: it signals early, says what's happening, and gives the operator time to get their bearings before they're responsible."
# The index card's line (redesign-handoff.md §2). Drafted on the redesign
# canvas, 2026-11-05 — not yet reviewed.
cardIntent: "The machine yields control on purpose and gives the human time to orient before they are accountable."

moment: transition
trustJobs: [intervene, predict]
risk: critical
reversibility: irreversible
autonomy: [2, 4]
domains: [driving, surgical, drone]

status: draft
updated: "2026-11-07"

steps:
  - title: "Machine leads"
    detail: "Autonomy nominal"
  - title: "Trigger"
    detail: "Approaching the edge of its limits"
    note: "Hand off early and on purpose, at a designed boundary, not at the moment of failure."
  - title: "Signal + state"
    detail: "Mode, intent, hazards, time left"
    key: true
  - title: "Orient"
    detail: "Human acknowledges, gets bearings"
    note: "The window is sized to how long a human needs to re-enter the task, not to when the machine runs out."
  - title: "Human leads"
    detail: "Machine confirms release"

antiPattern: "The Unannounced Handoff"

interface:
  component: handoff

# The demo is an invented motorway handoff, not the Tempe crash: the speeds,
# the construction zone and the countdowns are written for this page.
demoNote: "Simplified illustration."

# VERIFY against the CIAF report directly: see the open item under
# 01 · The Handoff in review/AUDIT.md. The death toll (79) is settled.
cautionaryTale:
  title: "Alvia train at Santiago de Compostela"
  date: "July 24, 2013"
  place: "Santiago de Compostela, Spain"
  story: >-
    On the evening run from Madrid to Ferrol, an Alvia train came off about
    eighty kilometres of new high-speed line and onto conventional track on the
    approach to Santiago de Compostela. The high-speed section was signalled
    with the European train control system, which supervises speed
    continuously. The conventional track it joined carried only Spain's older
    ASFA, which warns a driver about speed but will not slow a train for him.
    The A Grandeira curve, limited to 80 km/h, is the first bend after the
    change.[cite:ciaf-santiago-2014]

    The train's own ERTMS equipment had been switched off since June 2012
    because of compatibility faults. Had it been working, it would have alerted
    the driver as he passed the last balise of the high-speed line, four
    kilometres before the curve.[cite:irj-santiago-2014] What remained was a speed reduction sign 200
    metres out, which the investigator called useless: a train that has not
    already slowed by the time it reaches that sign cannot.[cite:irj-santiago-2014]

    So the entire deceleration, from line speed to 80 km/h, was the driver's to
    remember, with nothing to prompt him at the moment it mattered. He was
    taking a call from the train's conductor about the route
    ahead.[cite:ciaf-santiago-2014] The
    recorder put the train at 195 km/h 250 metres before the curve and at
    179 km/h when it derailed, more than twice the limit.[cite:shultz-2016]
    79 people died.[cite:ciaf-santiago-2014]

    The commission found the driver's loss of attention to be the only cause.
    It did not count the missing onboard system as
    contributory.[cite:irj-santiago-2014]
  sourceId: [ciaf-santiago-2014, irj-santiago-2014, shultz-2016]

# Which of the sections above the fold are freshly written and unchecked.
drafts:
  tale: true
  antiPattern: true
  examples: true

therefore: >-
  Hand over control early and on purpose: signal clearly, tell the operator
  what's happening, give them time to get their bearings, and release only
  when they confirm.

without:
  steps: ["Machine driving", "Sudden alarm", "Human takes over cold"]
  # VERIFY against the CIAF report: that the transition from high-speed to
  # conventional track happened at a fixed point on the line rather than on a
  # condition; that nothing in the cab annunciated it, leaving trackside
  # signage as the only marker; and that the ETCS onboard equipment - which
  # would have announced the transition, demanded an acknowledgement and
  # applied the brakes without one - had been switched off by order.
  caption: >-
    The track handed speed control to the driver at a fixed point, at full
    speed, with nothing in the cab to say it had happened. The version that
    would have announced it, asked for an acknowledgement and braked if none
    came had been switched off.

with:
  steps: ["Early signal", "State briefing", "Confirmed takeover"]
  caption: "The transfer is announced, explained and acknowledged. Responsibility moves only once the human is oriented."

whenToUse: "Use this whenever a machine can reach the edge of what it can safely do and an operator is expected to take over. It matters most at autonomy levels where the human isn't watching continuously, so they arrive cold."

related:
  - slug: shared-mental-model
    type: requires
    note: "The state briefing only works if the human's model of the situation is already current."

openQuestions:
  - "How long is long enough? The time a person needs to get their bearings varies with the domain, and with how long they've been out of the loop."
  - "What if the operator says no? A handoff assumes the person will accept control. The design needs an answer for when they can't or won't."

sources:
  - id: ciaf-santiago-2014
    title: "Final report on the derailment of Alvia service 04155 at Santiago de Compostela, 24 July 2013"
    author: "Comisión de Investigación de Accidentes Ferroviarios (CIAF)"
    year: 2014
    type: incident-report
    note: "Observed, and the source for the opening story. FLAGGED, and the reason this entry has no `url`: the CIAF report was not located at a stable public address, so nothing could be linked without inventing a citation. The death toll is 79: the 80 in early reporting was corrected after a misidentification of remains. Nothing in the tale or the anti-pattern has been read against either document; the VERIFY comments in this frontmatter list what to check."
  - id: irj-santiago-2014
    title: "Driver error “only cause” of Santiago accident, says report"
    author: "International Railway Journal"
    year: 2014
    url: "https://www.railjournal.com/regions/europe/driver-error-only-cause-of-santiago-accident-says-report/"
    type: article
    note: "Secondary. Reporting on the CIAF findings: the onboard ERTMS switched off since June 2012 for compatibility faults, the alert it would have given at the last balise four kilometres before the curve, the speed reduction sign 200 metres out described as useless, and the commission naming the driver's loss of attention as the only cause without counting the missing onboard system as contributory."
  - id: shultz-2016
    title: "Disaster complexity and the Santiago de Compostela train derailment"
    author: "James M. Shultz et al."
    year: 2016
    url: "https://www.tandfonline.com/doi/full/10.1080/21665044.2015.1129889"
    type: paper
    note: "The recorded speeds in the opening story: 195 km/h 250 metres before the curve, and 179 km/h at the derailment."
  - id: santiago-ruling-2024
    title: "Court ruling on the Angrois derailment, 26 July 2024"
    year: 2024
    type: incident-report
    note: "Observed. The ruling found both the driver and the former head of operating safety at Adif responsible, which is why this pattern can say the handoff was a design decision rather than only a lapse. FLAGGED: no `url`, for the same reason as the CIAF entry - no stable public address was located. It is also the source of the 79 figure in the opening story."
  - id: irj-etcs-santiago
    title: "ETCS a crucial factor in Santiago accident inquiry"
    author: "International Railway Journal"
    type: article
    note: "Secondary, and the source for the ETCS level-transition behaviour in the In the field entry: a text announcement, a flashing acknowledgement prompt, and a brake application if no acknowledgement comes. FLAGGED: no `url`, and the five-second figure in that entry is not verified - see the VERIFY comment beside it."
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

## Design considerations

- **Never depend on someone you can't alert.** If the design assumes a person will take over, the system needs a way to ask them, early.[cite:ntsb-har-19-03]
- **Trigger at a designed boundary.** Decide in advance which conditions start a handoff, and start it before the machine runs out of options. A handoff that begins at the moment of failure is already late.
- **Size the window to the human.** Planned takeovers vary widely in how long they take. Base the orientation window on operators who have been out of the loop, not on emergency takeover data.
- **Brief all three levels.** Tell the human what is happening, what it means, and what happens next. Raw state alone leaves them holding data instead of understanding.
- **Clear the channel.** Suspend unrelated displays and media once a handoff starts, so the briefing is the only thing competing for attention.
- **Release only on acknowledgment.** Responsibility moves when the human confirms, not when a timer expires. If nobody confirms, fall back to a safe stop rather than handing control to no one.

## In the field

<!-- VERIFY: the Tempe entry below is this page's displaced opening story,
     cut to one sentence and keeping its NTSB source. One claim in it is
     contradicted by the report and is this page's long-standing flag, kept
     here so it is not lost in the move: the ADS *was* designed to alert, and
     did so 0.2 seconds before impact. What the report supports is that no
     alert was given when the system first recognised the emergency at 1.2
     seconds, and that the alert it was designed to send announced the car's
     own slowdown rather than asking for a takeover. See this file's review
     list. -->
**■ Without it · Automotive:** The system relied on the safety operator to brake in an emergency but wasn't designed to alert her.[cite:ntsb-har-19-03] See [Provenance Log](/patterns/provenance-log) for the full timeline.

<!-- VERIFY the five seconds, which is the one number in this entry and the
     least certain thing in it: the IRJ article is the source for the shape of
     an ETCS level transition - text announcement, flashing acknowledgement
     prompt, brake application without one - but the acknowledgement window is
     set by the ETCS specification rather than by the article, and "within
     seconds" is written here deliberately vaguely because of that. Replace it
     with the figure from SUBSET-026 and name the subset. -->
**● Applies the pattern · Rail:** ETCS level transitions. The driver gets a text announcement, then a flashing prompt to acknowledge, and the train brakes if no acknowledgement comes within seconds.[cite:irj-etcs-santiago]

**Observed · Driving.** UN R157 names this moment the transition demand, and requires non-driving displays to suspend once it starts.[cite:un-r157]

**Observed · Aviation.** Air France 447: the autopilot disconnected suddenly and the crew took over cold. The handoff arrived as a few lines of text on the message display.[cite:bea-af447]

## Notes

Timing is where this one usually goes wrong. A handoff triggered when the machine runs out of options is already too late, because the operator has been out of the loop and needs time to work out what's happening before they can act.[cite:carr-2014] Planned takeovers vary enormously in how long they take, so sizing the window from emergency data leaves people short.[cite:eriksson-stanton-2017]
