---
number: 7
name: "Capability Disclosure"
intent: "Before the human hands over control, the machine says what it cannot do and where it will not run, then refuses to engage outside those conditions. Super Cruise offers hands-free driving only on roads GM has mapped."
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
updated: "2026-10-28"

steps:
  - title: "Declare the envelope"
    detail: "Where it works, what it can't see"
    note: "Name conditions the operator can recognize from the seat — this road, this load, this weather — not a sensor specification."
  - title: "Check the conditions"
    detail: "Is this one of them?"
    note: "The Tesla had GPS, commercial road data and sign recognition, so it could tell what kind of road it was on. Nothing acted on the answer."
  - title: "Offer or withhold"
    detail: "Engagement available only inside"
    key: true
  - title: "Name the blocker"
    detail: "Say which condition is missing"
  - title: "Re-check while running"
    detail: "Withdraw when the envelope ends"

antiPattern: "Fine Print Limits"

without:
  steps: ["Limits in the manual", "Engages anywhere", "Misuse looks like use"]
  caption: "The boundary exists in the owner's manual and nowhere in the machine's behavior. At Williston the manual restricted Autosteer to highways and limited-access roads; the firmware placed no restriction on road class at all."

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
  - "Unsourced detail: “a ten-page section carrying sixteen warnings and four cautions”. The road-type restriction itself is in NTSB/HAR-17/02 and in the research notes, but these counts are in neither, so the citation on that sentence does not cover them."

sources:
  - id: ntsb-har-17-02
    title: "Collision Between a Car Operating With Automated Vehicle Control Systems and a Tractor-Semitrailer Truck Near Williston, Florida"
    author: "National Transportation Safety Board"
    year: 2017
    url: "https://www.ntsb.gov/investigations/accidentreports/reports/har1702.pdf"
    type: incident-report
    note: "Observed. NTSB/HAR-17/02 on the May 2016 crash that killed the Tesla's driver. The manual's road-type limits are described as soft constraints; the firmware had no hard constraint on road classification. Probable cause names the driver's overreliance, with the automation's operational design contributing by permitting prolonged disengagement and use inconsistent with the manufacturer's own guidance. Recommendation H-17-41 asks Level 2 manufacturers to build in safeguards limiting use to the conditions the system was designed for."
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

openQuestions:
  - "The industrial example is still missing. What this needs is a mobile robot or forklift that declares its operating zone and payload limits on the operator's tablet rather than in a commissioning document. Until there is one, the pattern is tagged automotive only."
  - "Where the line sits between refusing to engage and warning loudly. Super Cruise refuses; most systems warn. Refusing is safer and more paternalistic, and the right answer probably moves with the consequence."
---

The gap this closes is not between what a machine can do and what it says — it is between what it says and what it allows. Tesla's manual was neither wrong nor hidden: it restricted Autosteer to highways and limited-access roads, in a ten-page section carrying sixteen warnings and four cautions.[cite:ntsb-har-17-02] The car knew what road it was on, from GPS, map data and sign recognition, and engaged anyway.[cite:ntsb-har-17-02] That is why the useful version of this pattern is a constraint rather than a disclosure: a limit the operator has to remember is a limit the operator will eventually forget, usually on a day when everything else is going well. The harder design question is what to do at the boundary, because refusing outright is honest and unpopular, and a system that refuses without naming the condition it is missing just reads as broken.
