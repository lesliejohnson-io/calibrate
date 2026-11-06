---
number: 15
name: "Stop Anywhere"
intent: "A stop works from any state, and stays stopped."
# The index card's line (redesign-handoff.md §2). Same sentence as `intent`
# above: the intent is already one short line, so the card and the page lede
# say the one thing rather than two near-identical versions of it.
cardIntent: "A stop works from any state, and stays stopped."

moment: during
trustJobs: [intervene]
risk: critical
reversibility: irreversible
autonomy: [1, 5]
domains: [automotive, industrial]

status: draft
updated: "2026-11-06"

steps:
  - title: "Machine is running"
    detail: "In any mode, attended or not"
  - title: "Someone needs it stopped"
    detail: "Operator, bystander, remote support"
  - title: "One control, always live"
    detail: "Unmistakable, and mode-independent"
    key: true
  - title: "The stop latches"
    detail: "It holds without being held"
  - title: "An operator releases it"
    detail: "Deliberately, at the point it was triggered"

antiPattern: "No Brakes for Bystanders"

interface:
  component: stop-anywhere

cautionaryTale:
  title: "A Cruise robotaxi at Fifth and Market"
  date: "2 October 2023"
  place: "San Francisco, California"
  story: >-
    At about 9:30 at night, near Fifth and Market Streets, an unidentified car
    struck a pedestrian in a crosswalk, who fell into the path of a driverless
    Cruise car. The Cruise car braked hard and came to a complete stop, with
    the pedestrian underneath it. Then it moved again: it attempted a pullover
    maneuver, travelling about 20 feet and reaching 7 mph, dragging the
    pedestrian with it before coming to a final stop. The state suspended
    Cruise’s driverless testing permit three weeks later.
  sourceId: dmv-cruise-suspension

therefore: >-
  Anyone responsible for what’s around the machine (its operator, a remote
  team, or the person standing beside it) can stop it from any state, and the
  stop holds until someone deliberately releases it.

without:
  steps: ["Machine misbehaves", "Nobody present can halt it", "It keeps going"]
  caption: "The people best placed to stop a machine are often the ones standing next to it, and they’re the ones with no way to do it. The car took its stop as a pause, and a built-in plan decided what happened next. Nobody on the street could override that plan."

with:
  steps: ["Machine misbehaves", "Anyone present stops it", "It stays stopped"]
  caption: "The authority to halt the machine belongs to whoever is in a position to see that it should be halted, and the stop does not expire on its own."

related:
  - slug: return-of-control
    type: requires
    note: "A latched stop is only safe if resuming is a deliberate act. Both patterns lean on the same rule: the machine does not decide when the operator is finished."
  - slug: readiness-check
    type: tension-with
    note: "One assumes a supervisor who can act; this assumes nobody reliable is watching and gives the stop to whoever is there. Designing for both means deciding whose authority wins."

sources:
  - id: dmv-cruise-suspension
    title: "Order of Suspension — Autonomous Vehicle Testing Permit, Driverless Vehicles, Cruise LLC"
    author: "California Department of Motor Vehicles"
    year: 2023
    url: "https://s3.documentcloud.org/documents/24080715/gm-cruise-order-of-suspension-driverless-testing.pdf"
    type: incident-report
    note: >-
      Observed. Dated 24 October 2023, effective immediately, signed by Deputy
      Director Bernard C. Soriano. Under Facts: “On October 2, 2023, at
      approximately 9:30 p.m., an accident occurred on or around 5[th] and
      Market Streets in San Francisco. A pedestrian was struck, while in the
      crosswalk, by an unknown third-party vehicle and fell into the path of a
      Cruise Autonomous Vehicle (AV). The AV initiated a hard-braking maneuver
      and came to a complete stop.” It then “attempted to perform a pullover
      maneuver while the pedestrian was underneath the vehicle. The AV traveled
      approximately 20 feet and reached a speed of 7 mph before coming to a
      subsequent and final stop. The pedestrian remained under the vehicle.”
      The order also records that at a meeting the following day Cruise showed
      the department video that ended at the initial stop and did not disclose
      the further movement; the department learned of it from another agency,
      and received the fuller video on 13 October. The vehicle involved was
      operating under Cruise’s deployment permit — this order suspends the
      driverless testing permit, on the grounds that the behaviour raises the
      same concern about the test fleet.
  - id: ai-business-waymo
    title: "Waymo car filmed as it gets confused by cones, escapes its own support team"
    author: "AI Business"
    url: "https://aibusiness.com/verticals/waymo-car-filmed-as-it-gets-confused-by-cones-escapes-its-own-support-team"
    type: article
    note: "An illustration, not a finding. This is a news report with no investigation behind it: a vehicle confused by cones, incorrect guidance from the remote fleet response team, and a departure that neither the remote team nor the roadside assistant could prevent. Treat it as a description of the failure mode rather than as established fact."
  - id: iso-13850
    title: "ISO 13850 emergency stop reset"
    author: "ISO 13850, via IDEC/Farnell"
    url: "https://www.farnell.com/datasheets/4129338.pdf"
    type: standard
    note: >-
      Observed, on pages 4 and 5 of an IDEC product brochure rather than in the
      standard itself. It quotes ISO 13850:2015 4.1.1.2 twice: “The emergency
      stop function must be available and operable at all times”, and “The
      emergency stop function shall be reset by intentional human action.
      Resetting of the emergency stop function shall be operated by
      disengagement of an emergency stop device.” The worked example adds the
      latching: “The NC contact does not move until the emergency stop switch
      latches (locks), allowing OFF operation and resetting only by the
      intended operation.”
  - id: iec-60204-colours
    title: "IEC 60204-1 actuator colours"
    author: "IEC 60204-1, via Schneider Electric"
    url: "https://www.se.com/ie/en/faqs/FA28043/"
    type: standard
    note: >-
      Observed, from a vendor FAQ quoting IEC 60204-1 (September 2021 version),
      10.2.1 and tables 2 and 3: “If a background exists immediately around the
      actuator, then this background shall be coloured YELLOW. The combination
      of a RED actuator with a YELLOW background shall only be used for
      emergency operation devices.” The standard’s own scope there is emergency
      operation devices, which covers emergency switching off as well as
      emergency stop.
  - id: incompliance-colours
    title: "Understanding Symbols: Emergency Stop"
    author: "Geoffrey Peckham, In Compliance Magazine"
    year: 2015
    url: "https://incompliancemag.com/understanding-symbols-emergency-stop/"
    type: article
    note: >-
      Secondary, and the sharpest wording of the reservation, quoting NFPA 79
      (2015) 10.7.3: “The RED/YELLOW color combination shall be reserved
      exclusively for emergency stop applications.” It also quotes EN/ISO 13850
      4.3.2 on where these controls go — “readily accessible and capable of
      non-hazardous actuation by the operator and others who could need to
      actuate them” — which is the standards’ own acknowledgement that the
      person who needs the stop is not always the operator.
  - id: ipd-estop
    title: "The emergency stop function"
    author: "IPD"
    type: article
    note: "Carried in the research for the emergency-stop function's requirements: latching, manual reset, and availability at all times. The URL it was filed under (ipd.com.au/ArticleView.aspx?ID=227) now serves an unrelated article about switchboards, so the link has been dropped rather than left pointing at the wrong page. Everything it was carried for is quoted directly from ISO 13850 in the IDEC source above."

review:
  - "Tale, three wordings changed against the DMV order. The supplied copy said “a hit-and-run driver”; the order says “an unknown third-party vehicle” and never uses the words hit-and-run, so the text says “an unidentified car”. The supplied copy said “her”; the order says only “a pedestrian” and gives no gender, so the text carries no pronoun. The supplied copy said the car was “following a routine to pull over after a collision”; the order says only that it “attempted to perform a pullover maneuver”, so that characterisation has moved out of the tale and into the anti-pattern sentence, where it reads as the argument it is."
  - "Tale, one word kept that is worth a look: “dragging”. The order does not use it. It says the AV “traveled approximately 20 feet and reached a speed of 7 mph” and that “the pedestrian remained under the vehicle”, which amounts to the same thing, but the word is ours."
  - "Permit nuance the tale flattens. The car in this incident was operating under Cruise’s *deployment* permit; the order cited here suspends the *driverless testing* permit, reasoning that the behaviour raises the same concern about the test fleet. The DMV suspended the deployment permit as well, but that is a separate document not cited here. “Cruise’s driverless testing permit” is accurate for this source; decide whether the page should say more."
  - "Design consideration 1 is a shade stronger than its standards source. Schneider’s IEC 60204-1 extract reserves red-on-yellow for “emergency operation devices”, which includes emergency switching off. The “and nothing else” reading comes from NFPA 79 via In Compliance: “reserved exclusively for emergency stop applications”. Both are cited; the sentence leans on the second."
  - "Design consideration 3 says the reset is local. ISO 13850 4.1.1.2 as quoted by IDEC requires “intentional human action” and reset “by disengagement of an emergency stop device”, which puts a hand on the device but is not the same as the standard’s separate requirement that reset only be possible at the point of actuation. Read the standard itself before this sentence is treated as settled."
  - "Source ipd-estop has rotted: its URL now serves a different article. Kept without a link because the research carried it, but nothing on this page cites it and it could be dropped."
  - "Mechanism steps: drafted. Steps 3 and 4 carry sourced notes; the titles, details and the five-step shape are mine."

openQuestions:
  - "How do autonomous mobile robot fleets handle a remote stop versus a stop on the robot itself, and who on the floor is allowed to trigger each? The industrial standards assume someone within reach of the machine, and a fleet managed from a control room doesn't guarantee that."
  - "Who gets the authority to stop a machine when no operator is present? A physical emergency control works because someone is standing at it. A driverless car on a public road is surrounded by people with no control at all, and it isn't clear what the equivalent is, or how to stop it being abused."
---

## Design considerations

- **Reserve the look of the stop control.** Red on yellow means emergency stop and nothing else, so someone who has never seen this machine still recognizes it.[cite:iec-60204-colours][cite:incompliance-colours]
- **Make the stop latch.** Once pressed, the machine stays stopped. Stopping shouldn't be something you have to keep doing.[cite:iso-13850]
- **Make the reset deliberate and local.** The machine can't decide on its own that the emergency is over; a person at the machine has to release it.[cite:iso-13850]
- **Give the stop to the people who are there.** Industrial standards assume someone within reach of the machine. A fleet run from a control room, or a car with no driver, breaks that assumption, so the people nearby need a way to stop it too.

## In the field

**Observed · Automotive.** The Cruise car at Fifth and Market stopped itself, then started again with a pedestrian underneath it, and nobody on the street had any way to intervene.[cite:dmv-cruise-suspension]

**Illustrative (news report) · Automotive.** A Waymo car confused by traffic cones asked its remote assistance team for help and got the wrong guidance. It later pulled out, parked partly in the road, then drove off as a roadside assistant walked up to it. Neither the remote team nor the person standing next to it could stop it.[cite:ai-business-waymo]

*Based on a news report, not an investigation. It's here for the shape of the failure, not the detail: a machine that asked for help, got the wrong help, and then moved while the person responsible for it was close enough to touch it.*
