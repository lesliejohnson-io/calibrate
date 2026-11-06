---
number: 6
name: "Intent Preview"
intent: "Before the machine acts it displays a proposed plan so a wrong plan is caught before it becomes a wrong action."
# The index card's line (redesign-handoff.md §2). Same sentence as `intent`
# above, by Leslie's call on 2026-11-06 — the card and the page lede say the
# one thing rather than two near-identical versions of it.
cardIntent: "Before the machine acts it displays a proposed plan so a wrong plan is caught before it becomes a wrong action."

moment: before
trustJobs: [know, intervene]
risk: critical
reversibility: irreversible
autonomy: [2, 5]
domains: [aviation, warehouse]

status: draft
updated: "2026-10-28"

steps:
  - title: "Plan staged"
    detail: "The change is held, not applied"
  - title: "Show the path"
    detail: "Route, destination, area it will sweep"
    key: true
  - title: "Human checks"
    detail: "Unexpected turns, loops or gaps"
  - title: "Commit or discard"
    detail: "Explicit execute, or erase"
  - title: "Act"
    detail: "The machine flies the plan that was seen"

interface:
  component: "flight-computer"

cautionaryTale:
  title: "American Airlines Flight 965 at Cali"
  date: "20 December 1995"
  place: "Buga, Colombia"
  story: >-
    Flight 965 was descending toward Cali at night when the crew accepted a
    late change of approach. Rushing, the captain typed “R” into the flight
    computer to select the Rozo beacon. The computer took it as Romeo, a
    beacon near Bogotá some 132 miles to the north-east, and the autopilot
    began turning toward it. Nobody saw the new path until the aircraft was
    off course over mountains; it struck one, and 160 of the 164 people on
    board died.
  sourceId: aa965-findings

therefore: >-
  Show the path before it is flown, and make committing to it a separate act
  from proposing it.

antiPattern: "Blind Execute"

without:
  steps: ["Plan entered", "Executed unseen", "Wrong path flown"]
  caption: "The system commits a plan the human never saw. The entry is accepted, the turn begins, and the first evidence of the mistake is the machine already making it."

with:
  steps: ["Plan staged", "Path shown", "Checked, then committed"]
  caption: "The proposal is visible while it is still only a proposal, so a wrong plan is caught before it becomes a wrong action."

related:
  - slug: appropriate-friction
    type: complements
    note: "Preview answers what the machine is about to do; friction answers how hard it should be to say go. Boeing's EXEC loop does both at once."

# The "Needs your review" box is off this page: both items below are settled
# or are a question for Leslie rather than a flag on the entry. Kept as notes
# so the record survives — move either back under a `review:` key to make the
# box reappear.
#
# - Distance unit corrected. The research notes and an earlier draft said
#   Romeo was "132 nm" away. The Flight Safety Foundation, quoting the
#   official report, says 212 km / 132 statute miles — about 114 nautical
#   miles. The page, the tale and the demo now all say miles.
# - OPEN, for Leslie: the tale's casualty figure. The FSF report gives 159
#   killed at the scene (two flight crew, six cabin crew, 151 passengers)
#   with five survivors, one of whom later died. The tale says 160 of 164,
#   counting the later death. Confirm that is the figure you want.

sources:
  - id: walker-2018
    title: "Communicating Robot Motion Intent with Augmented Reality"
    author: "Michael Walker, Hooman Hedayati, Jennifer Lee and Daniel Szafir"
    year: 2018
    type: paper
    note: "Four augmented-reality ways to show a drone's planned flight path. Drawing the waypoints performed best and was the one people preferred. Best paper at HRI 2018; link still to pull."
  - id: chadalavada-2015
    title: "That's on my Mind! Robot to Human Intention Communication through on-board Projection on Shared Floor Space"
    author: "Ravi Teja Chadalavada et al."
    year: 2015
    type: paper
    note: "The warehouse case: a robotic forklift projects its intended trajectory onto the floor, with lines marking the space it will occupy. Ratings from 13 test subjects improved clearly once intentions were projected. Link still to pull."
  - id: aa965-findings
    title: "Findings — American Airlines Flight 965, Cali, Colombia"
    url: "https://www.faa.gov/sites/faa.gov/files/findings.pdf"
    type: incident-report
    note: "Observed: the captain entered R for the Rozo beacon, which could only be selected by its full name, and got Romeo near Bogotá instead. Investigators also faulted FMS logic that emptied the displays of intermediate fixes once a direct routing was executed, degrading the preview itself. The Flight Safety Foundation write-up, quoting the Aeronáutica Civil report, puts Bogotá at 212 km — 132 statute miles, not nautical miles — and records two flight crew, six cabin crew and 151 passengers killed, with five survivors of whom one later died: 160 of 164."
  - id: aa965-case-study
    title: "American Airlines Flight 965, Cali — case study"
    year: 2004
    url: "https://ocw.mit.edu/courses/16-422-human-supervisory-control-of-automated-systems-spring-2004/f8b84345536213412a8fda2bbf87caa7_aa965_cali.pdf"
    type: article
    note: "MIT 16.422 course material. The clearest account of what was not verified: on at least two occasions the captain executed a provisional path without checking it on the display or confirming it with the first officer."
  - id: data-entry-errors
    title: "Data Entry Errors Can Lead Aircraft Off Course"
    url: "https://webdeva.flightsafety.org/asw-article/data-entry-errors-can-lead-aircraft-off-course"
    type: article
    note: "Flight Safety Foundation on the wider class of error this pattern catches — the plan is wrong before the machine does anything wrong."
  - id: fsf-1997
    title: "Flight Safety Foundation, Accident Prevention (July–August 1997)"
    year: 1997
    url: "https://www.leonardo-in-flight.nl/PDF/ap_jul_aug97%20CFIT%20B757%20Cali%20American%20Airlines.pdf"
    type: article
    note: "The Foundation's own write-up of the Cali CFIT, and the source of the lesson drawn for crews: confirm the aircraft will head where you intend before letting the FMS command the turn."
  - id: b737-fmc
    title: "The Boeing 737 CDU/FMC Explained"
    url: "https://simtuts.com/guides/boeing-737-cdu-fmc-explained"
    type: article
    note: "How the staged-plan loop actually works: a route change puts MOD in the page title, shows an ERASE prompt, lights the white EXEC key, and draws the proposed route as a dashed line. Nothing takes effect until EXEC is pressed."
  - id: pmdg-direct-to
    title: "PMDG 737 FMC direct-to"
    url: "https://flyawaysimulation.com/ask/answers/pmdg-737-fmc-direct-to-msfs/"
    type: article
    note: "A step-by-step walkthrough of the direct-to entry in a simulator, showing the same sequence from the operator's side."
---

A preview only helps if it survives the check. On American Airlines Flight 965 at Cali the FMS dropped the intermediate fixes from its displays once the direct routing was executed, so the one picture that would have shown the turn toward terrain had already been emptied by the time anyone could look.[cite:aa965-findings] The other half of the work is making the proposal unmistakably provisional: a staged change that looks identical to a live one invites the operator to read it as already true, and the pattern collapses back into Blind Execute. Where the machine moves through shared space rather than along a route page, the preview has to go where the people are — the Örebro forklift projects its path onto the floor, which is the same idea aimed at bystanders instead of at an operator.[cite:chadalavada-2015]
