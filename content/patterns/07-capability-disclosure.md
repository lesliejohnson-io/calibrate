---
number: 7
name: "Capability Disclosure"
intent: "Before the operator hands over control, the machine says where it can't run, and refuses to engage outside those conditions."
# The index card's line (redesign-handoff.md §2). Drafted on the redesign
# canvas, 2026-11-05 — not yet reviewed.
cardIntent: "The machine says what it cannot do and where it will not run, then refuses to engage outside those limits."

moment: before
trustJobs: [know]
risk: critical
reversibility: irreversible
autonomy: [1, 4]
domains: [automotive]

status: draft
updated: "2026-11-09"

steps:
  - title: "Declare the envelope"
    detail: "Where it works, what it can't see"
    note: "Name conditions the operator can recognize from the seat (this road, this load, this weather), not a sensor specification."
  - title: "Check the conditions"
    detail: "Is this one of them?"
  - title: "Offer or withhold"
    detail: "Engagement available only inside"
    key: true
  - title: "Name the blocker"
    detail: "Say which condition is missing"
  - title: "Re-check while running"
    detail: "Withdraw when the envelope ends"

antiPattern: "Fine Print Limits"

interface:
  component: "capability-disclosure"

demoNote: "Simplified illustration."

cautionaryTale:
  title: "Autopilot runs on a road it wasn't built for"
  date: "May 7, 2016"
  place: "Williston, Florida"
  story: >-
    A Tesla Model S was steering itself at 74 mph in a 65 mph zone on a
    divided highway west of Williston, Florida, a road with intersections and
    cross traffic. The owner's manual said Autosteer was meant for
    limited-access roads, but the car let it run here anyway. Of the
    41-minute drive, the system steered for 37 minutes, and over all of it
    the car detected the driver's hands on the wheel for a total of 25
    seconds. When a tractor-trailer turned left across the highway ahead,
    neither the car nor the driver braked, and the car passed under the
    trailer, killing the driver.
  sourceId: ntsb-har-17-02

therefore: >-
  Make the system enforce its own limits, and when it refuses, name the
  condition it's missing.

without:
  steps: ["Limits in the manual", "Engages anywhere", "Misuse looks like use"]
  caption: "The car's limits weren't hidden. The manual restricted Autosteer to highways and limited-access roads, in a ten-page section with sixteen warnings and four cautions.[cite:ntsb-har-17-02] And the car knew what road it was on, from GPS, map data and speed-sign recognition.[cite:ntsb-har-17-02] It engaged anyway. The boundary existed in the owner's manual and nowhere in the machine's behavior. A limit the operator has to remember is a limit the operator will eventually forget, usually on a day when everything else is going well."

with:
  steps: ["Envelope declared", "Conditions checked", "Engages only inside"]
  caption: "The machine holds the line itself, so operating outside what it was built for stops being something an operator can do by accident."

related:
  - slug: graceful-degradation
    type: precedes
    note: "Disclosure draws the envelope before anything starts; degradation is what happens when the machine reaches that edge while running."
  - slug: shared-mental-model
    type: complements
    note: "Disclosure is where the human's model of the machine starts. Keeping it current once the machine is running is the other pattern's job."

review:
  - "Tale verified against NTSB/HAR-17/02 this pass: the 2015 Tesla Model S 70D, eastbound on US-27A west of Williston, 4:36 p.m. on May 7, 2016; “vehicle speed just before impact with the semitrailer was 74 mph. The highway has a posted speed limit of 65 mph”; US-27A at the crash site is “a four-lane divided highway” and “is not a limited-access roadway because it has” at-grade crossings; the manual's “Warning: Autosteer is intended for use only on highways and limited-access roads with a fully attentive driver”; the truck “making a left turn from westbound US-27A across the two eastbound travel lanes”; “The car struck the right side of the semitrailer, crossed underneath it”; and the forward collision warning and automatic emergency braking “did not activate”, with “no record in the … braking or steering input immediately before the crash”."
  - "Tale corrected: the 37 minutes are not the last 37 minutes. The draft read “For the last 37 minutes of the drive, the system steered while the driver's hands were on the wheel for just 25 seconds.” The report: “for the 41-minute trip from Cedar Key, Autopilot was active for 37 minutes. During the trip, while Autopilot was in use, the system detected driver-applied torque on the steering wheel on seven different occasions for a total of 25 seconds.” Autopilot was on for 37 of 41 minutes, not for the final 37. Rewritten to say so; the 25 seconds is accurate as drafted."
  - "Anti-pattern corrected: the car recognized speed signs, not signs generally. The draft read “from GPS, map data and sign recognition.” Footnote 61 (p. 43): “Tesla's Autopilot system uses vehicle GPS data, commercially available road data, and camera recognition of speed signs to determine the type of road and the speed limit of the roadway.” Narrowed to “speed-sign recognition”."
  - "Demo invents one road. US-27A is the report's road. I-75 does not appear anywhere in NTSB/HAR-17/02 — it is a real limited-access highway written in for the contrast, which is the one place this demo names a place its source does not. Everything else it turns on is sourced in substance: road class is what the report says the firmware could determine and placed no restriction on."
  - "Demo's ten-second handback is not in the report. The brief specified the “Autosteer ending in 10 seconds, take the wheel” line; the AUTOSTEER OFF line that follows it is written here, so a countdown the reader starts actually resolves. The report describes no such behaviour either way — Tesla's hands-off escalation at the time ran to alerts, and “nor did the system initiate the Autosteer deactivation protocol” on this trip."
  - "Design considerations moved from frontmatter into the body so they can carry citations and a link, and the whole list is now four items rather than one. Only the first is carried over from the previous version."

openQuestions:
  - "The industrial example is still missing: a mobile robot or forklift that shows its operating zone and payload limits on the operator's tablet rather than in a commissioning document. Until there is one, the pattern is tagged automotive only."
  - "Where's the line between refusing to engage and warning loudly? Super Cruise refuses; most systems warn. Refusing is safer but more paternalistic, and the right answer probably depends on the stakes: refuse when a mistake can't be undone, warn when it can."

sources:
  - id: ntsb-har-17-02
    title: "Collision Between a Car Operating With Automated Vehicle Control Systems and a Tractor-Semitrailer Truck Near Williston, Florida"
    author: "National Transportation Safety Board"
    year: 2017
    url: "https://www.ntsb.gov/investigations/accidentreports/reports/har1702.pdf"
    type: incident-report
    note: "Observed. NTSB/HAR-17/02 on the May 2016 crash that killed the Tesla's driver. The manual's road-type limits are described as soft constraints; the firmware had no hard constraint on road classification. Probable cause names the driver's overreliance, with the automation's operational design contributing by permitting prolonged disengagement and use inconsistent with the manufacturer's own guidance. Recommendation H-17-41 asks Level 2 manufacturers to build in safeguards limiting use to the conditions the system was designed for. Footnote 17 (p. 23) is the source for the manual’s ten-page driver-assistance section, its sixteen warnings and its four cautions; footnote 61 (p. 43) states that Autopilot used GPS, commercially available road data and camera recognition of speed signs to determine road type."
  - id: amershi-2019
    title: "Guidelines for Human-AI Interaction"
    author: "Saleema Amershi et al."
    year: 2019
    url: "https://www.microsoft.com/research/blog/guidelines-for-human-ai-interaction-design/"
    type: paper
    note: "CHI 2019 (doi 10.1145/3290605.3300233). Guideline 1 is to make clear what the system can do; guideline 2 is to make clear how well it does it, including how often it gets things wrong. The disclosure half of this pattern, stated for software rather than vehicles."
  - id: gmc-super-cruise
    title: "How to use Super Cruise"
    author: "GMC"
    url: "https://www.gmc.com/support/vehicle-support/driving-and-safety/driver-assistance/how-to-use-super-cruise"
    type: article
    note: "Observed. The icon turns white only once the system has a compatible road and suitable conditions, and the steering-wheel light bar runs green while it is steering. Hands-free is offered on roads GM has mapped, so the limit is enforced rather than stated."
  - id: ansi-r15-08
    title: "ANSI/A3 R15.08-1-2020: Industrial Mobile Robots — Safety Requirements"
    year: 2020
    url: "https://webstore.ansi.org/standards/ria/ansia3r15082020r2026"
    type: standard
    note: "The same idea as a requirement: the manufacturer documents a specified operating environment, and that information for use has to reach the integrator and the end user. The normative text is paywalled and has not been read — this is from A3's and ANSI's own summaries."
---

## Design considerations

- **Name the missing condition when you refuse.** Refusing outright is honest but unpopular, and a system that refuses without saying why just reads as broken. “Autosteer unavailable: this road has cross traffic” keeps the operator’s trust; a greyed-out icon loses it.
- **Describe limits in the operator's terms.** This road, this load, this weather, not a sensor specification.
- **Enforce the limit, don't just describe it.** If the machine can tell it's outside its conditions, it shouldn't rely on the operator remembering the manual.[cite:ntsb-har-17-02]
- **Keep checking while running.** Conditions change mid-task; when the machine leaves its envelope, it says so and hands back control with time to spare. That handback is [Graceful Degradation](/patterns/graceful-degradation)'s job, and this pattern is what tells it where the edge is.

## In the field

**Observed · Automotive.** [Tesla, Williston](#tale): the manual restricted Autosteer to highways and limited-access roads, and the firmware placed no restriction on road class at all.[cite:ntsb-har-17-02]

**Observed · Automotive.** GM's Super Cruise offers hands-free driving only on roads GM has mapped, so the limit is enforced by the system rather than stated in a manual.[cite:gmc-super-cruise]
