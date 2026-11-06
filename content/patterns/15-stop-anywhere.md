---
number: 15
name: "Stop Anywhere"
intent: "Anyone near or responsible for the machine can always stop it, through one unmistakable control that works in every mode, and the stop holds until a human deliberately releases it."
# The index card's line (redesign-handoff.md §2). Drafted on the redesign
# canvas, 2026-11-05 — not yet reviewed.
cardIntent: "Anyone near the machine can always stop it with one control, and the stop holds until released."

moment: during
trustJobs: [intervene]
risk: critical
reversibility: irreversible
autonomy: [1, 5]
domains: [automotive, industrial]

status: draft
updated: "2026-10-30"

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
  - title: "A human releases it"
    detail: "Deliberately, at the point it was triggered"

antiPattern: "No Brakes for Bystanders"

without:
  steps: ["Machine misbehaves", "Nobody present can halt it", "It keeps going"]
  caption: "No Brakes for Bystanders: a Waymo confused by cones asked its remote fleet response team for help and was given incorrect guidance. It later pulled out, parked partly in the road, then moved off as a roadside assistant approached — and neither the remote team nor the person standing next to it could stop it."

with:
  steps: ["Machine misbehaves", "Anyone present stops it", "It stays stopped"]
  caption: "The authority to halt the machine belongs to whoever is in a position to see that it should be halted, and the stop does not expire on its own."

related:
  - slug: return-of-control
    type: requires
    note: "A latched stop is only safe if resuming is a deliberate act. Both patterns lean on the same rule: the machine does not decide when the human is finished."
  - slug: readiness-check
    type: tension-with
    note: "One assumes a supervisor who can act; this assumes nobody reliable is watching and gives the stop to whoever is there. Designing for both means deciding whose authority wins."

sources:
  - id: ai-business-waymo
    title: "Waymo car filmed as it gets confused by cones, escapes its own support team"
    author: "AI Business"
    url: "https://aibusiness.com/verticals/waymo-car-filmed-as-it-gets-confused-by-cones-escapes-its-own-support-team"
    type: article
    note: "An illustration, not a finding. This is a news report with no investigation behind it: a vehicle confused by cones, incorrect guidance from the remote fleet response team, and a departure that neither the remote team nor the roadside assistant could prevent. Treat it as a description of the failure mode rather than as established fact."
  - id: iso-13850
    title: "ISO 13850 emergency stop reset"
    author: "IDEC, via Farnell"
    url: "https://www.farnell.com/datasheets/4129338.pdf"
    type: standard
    note: "Observed. The stop command latches and is maintained until the device is reset; reset must be an intentional human action, and only at the location where the stop was triggered. Read from a manufacturer datasheet, not the standard itself."
  - id: iec-60204-colours
    title: "IEC 60204-1 actuator colours"
    author: "Schneider Electric"
    url: "https://www.se.com/ie/en/faqs/FA28043/"
    type: standard
    note: "Observed. Red actuator on a yellow background, a combination reserved for emergency devices. Read from a vendor FAQ rather than the standard."
  - id: ipd-estop
    title: "The emergency stop function"
    author: "IPD"
    url: "https://www.ipd.com.au/ArticleView.aspx?ID=227"
    type: article
    note: "Carried in the research for the emergency-stop function's requirements: latching, manual reset, and availability at all times."
  - id: incompliance-colours
    title: "Red and yellow: reserved for emergency stop"
    author: "In Compliance Magazine"
    url: "https://incompliancemag.com/?p=29942"
    type: article
    note: "Secondary. The reservation of the red-on-yellow combination, and why using it for anything else degrades the one control everyone is supposed to recognise."

review:
  - "Needs demo (see DEMOS.md)"
  - "Needs a cautionary tale"
  - "Mechanism steps: drafted. Steps 3 and 4 carry sourced notes; the titles, details and the five-step shape are mine."

openQuestions:
  - "The robotics question the research asks: how autonomous mobile robot fleets handle a remote stop versus an on-robot stop, and who on the floor is permitted to trigger each. The industrial standards assume a person within reach of the machine, which a fleet managed from a control room does not guarantee."
  - "Who gets the authority when the machine has no operator present. Reserving a physical control for emergencies works because the person is standing there; a driverless vehicle on a public road is surrounded by people with no control at all, and it is not obvious what the equivalent is — or what stops it being abused."
---

The Waymo story has to be used carefully, because it is a news report rather than an investigation and the research says as much. What makes it worth keeping is the shape rather than the detail: a machine that had already asked for help, received the wrong help, and then moved while a person responsible for it was close enough to touch it.[cite:ai-business-waymo] Whether or not that account is accurate in every particular, it describes the gap this pattern names — the authority to stop was held by people who were not there, and the person who was there had none.

Industrial machinery settled this a long time ago, and the settlement is more specific than "fit a big red button". The colour combination is reserved, so the control is legible to someone who has never seen this machine.[cite:iec-60204-colours] The stop latches, so stopping is not a thing you have to keep doing. And the reset is deliberate and local, so the machine cannot conclude on its own that the emergency has passed.[cite:iso-13850] The open problem is what any of that means for a vehicle on a public road, where everyone nearby is a bystander and none of them can reach anything.
