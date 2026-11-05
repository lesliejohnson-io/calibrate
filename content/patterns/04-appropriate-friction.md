---
number: 4
name: "Appropriate Friction"
intent: "Before a high-stakes action, the interface asks the operator to slow down. A drone operator overriding a no-fly boundary has to hold the button for two seconds and confirm the zone, so a stray tap can’t send it there."
# The index card's line (redesign-handoff.md §2). Drafted on the redesign
# canvas, 2026-11-05 — not yet reviewed.
cardIntent: "Before a high-stakes action, the interface makes the operator slow down and confirm."

moment: before
trustJobs: [intervene, know]
risk: critical
reversibility: irreversible
autonomy: [1, 5]
domains: [drone, surgical, industrial]

status: draft
updated: "2026-10-23"

steps:
  - title: "Intent"
    detail: "Operator starts an action"
  - title: "Weigh stakes"
    detail: "Reversible? Who’s affected?"
    note: "Friction scales with consequence. Low-stakes, reversible actions stay fast."
  - title: "Add friction"
    detail: "Confirm, delay or second trigger"
    key: true
  - title: "Commit"
    detail: "Re-affirm with the consequence shown"
    note: "Restate the consequence — “Release payload over zone B” — never just “Are you sure?”"
  - title: "Execute + log"
    detail: "Action runs, provenance kept"

antiPattern: "One-Tap Catastrophe"

# Show the control itself in the without / with section instead of the box
# diagram: this pattern is about what a button does under the hand.
interface:
  component: "drone-release"

without:
  steps: ["One tap", "Instant action", "Irreversible error"]
  caption: "Smooth UX makes catastrophic actions as easy as trivial ones. One slip is all it takes."

with:
  steps: ["Initiate", "Friction step", "Deliberate commit"]
  caption: "A pause that restates the consequence catches slips before they become incidents."

sources:
  - id: cox-2016
    title: "Design Frictions for Mindful Interactions: The Case for Microboundaries"
    author: "Anna L. Cox et al."
    year: 2016
    url: "https://discovery.ucl.ac.uk/id/eprint/1475258/"
    type: paper
    note: "The HCI case for intentional friction — microboundaries that interrupt mindless interaction, including as a way to reduce error."
  - id: parasuraman-sheridan-wickens-2000
    title: "A Model for Types and Levels of Human Interaction with Automation"
    author: "Raja Parasuraman, Thomas B. Sheridan and Christopher D. Wickens"
    year: 2000
    url: "https://doi.org/10.1109/3468.844354"
    type: paper
    note: "Its levels of automation include a veto window, which gives friction a place on a formal scale and ties it to the cost of the action's outcome."
  - id: parasuraman-riley-1997
    title: "Humans and Automation: Use, Misuse, Disuse, Abuse"
    author: "Raja Parasuraman and Victor Riley"
    year: 1997
    url: "https://doi.org/10.1518/001872097778543886"
    type: paper
    note: "Misuse is overreliance and complacency. Friction is a countermeasure for automation bias at exactly the moments where it costs most."
  - id: therac-25
    title: "An Investigation of the Therac-25 Accidents"
    author: "Nancy G. Leveson and Clark S. Turner"
    year: 1993
    url: "https://web.stanford.edu/class/cs240/old/sp2014/readings/therac-25.pdf"
    type: incident-report
    note: "Observed: hardware interlocks were replaced with software, and operators could edit and proceed past error messages at speed. The cost of missing friction."
---

The hard part is choosing which actions get it. A pause that shows up everywhere gets cleared from habit, and then it protects nothing.[cite:therac-25][cite:parasuraman-riley-1997] Reserve it for actions that cannot be undone, and make the confirmation name the specific consequence rather than asking whether the operator is sure.
