---
number: 4
name: "Appropriate Friction"
intent: "The harder an action is to undo, the more deliberate the interface makes it."
# The index card's line (redesign-handoff.md §2). Drafted on the redesign
# canvas, 2026-11-05 — not yet reviewed.
cardIntent: "Before a high-stakes action, the interface makes the operator slow down and confirm."

moment: before
trustJobs: [intervene, know]
risk: critical
reversibility: irreversible
autonomy: [1, 5]
domains: [clinical, aviation, drone, surgical, industrial]

status: reviewed
updated: "2026-11-07"

steps:
  - title: "Intent"
    detail: "Operator starts an action"
  - title: "Weigh stakes"
    detail: "Reversible? Who’s affected?"
  - title: "Add friction"
    detail: "Confirm, delay or second trigger"
    key: true
  - title: "Commit"
    detail: "Re-affirm with the consequence shown"
  - title: "Execute + log"
    detail: "Action runs, provenance kept"

# The mechanism's real shape (lib/diagram.ts). It replaces the row of
# steps on the page, notes included; `steps` above is no longer shown here.
diagram:
  elements:
    - { type: event, id: "01", title: "Intent", note: "Operator starts an action" }
    - { type: box, id: "02", title: "Weigh stakes", note: "Friction scales with consequence. Low-stakes, reversible actions stay fast." }
    - type: fork
      paths:
        - condition: "Reversible, low stakes"
          elements: []
        - condition: "High stakes"
          elements:
            - { type: box, id: "03", title: "Add friction", key: true }
            - { type: box, id: "04", title: "Commit", note: "Restate the consequence (“Release payload over zone B”), never just “Are you sure?”" }
    - { type: box, id: "05", title: "Execute + log" }

antiPattern: "One-Tap Catastrophe"

# Show the control itself in the without / with section instead of the box
# diagram: this pattern is about what a button does under the hand.
interface:
  component: "drone-release"

cautionaryTale:
  title: "Therac-25 radiation therapy machine"
  date: "March 21, 1986"
  place: "Tyler, Texas"
  story: >-
    A patient lay on the treatment table while the operator, in the next room,
    typed in his prescription. She mistyped one setting and corrected it
    within seconds, and the correction triggered a flaw in the machine's
    software: it fired a beam far stronger than prescribed. The console said
    the opposite. It showed “MALFUNCTION 54,” a pause marked low priority, and
    a dose of 6 units against the 202 she had asked for — an underdose.
    Malfunction messages were commonplace on this machine and most of them
    meant nothing, so she pressed P to proceed, the routine fix. He had felt
    the first shock and was getting up to go for help; the video monitor was
    unplugged and the intercom was broken, so she neither saw nor heard him.
    He died five months later, one of six patients the Therac-25 overdosed
    between 1985 and 1987.
  sourceId: therac-25

therefore: >-
  Make irreversible actions deliberately harder than routine ones, say exactly
  what will happen, and keep that friction rare enough to still mean
  something.

without:
  steps: ["One tap", "Instant action", "Irreversible error"]
  caption: "The most dangerous action on the console, carrying on after a malfunction, took one keystroke. And because the machine raised malfunctions constantly, the pause meant nothing: operators had learned that proceeding was normal. Earlier models carried hardware interlocks that physically prevented this kind of overdose — on the Therac-20 the same software bug only tripped a breaker. The Therac-25 did not duplicate them all, and leaned on software instead."

with:
  steps: ["Initiate", "Friction step", "Deliberate commit"]
  caption: "A pause that restates the consequence catches slips before they become incidents."

openQuestions:
  - "How much friction is too much? There's a point where a hold or a confirmation becomes a reflex, and the research doesn't say where it is."
  - "What happens in a real emergency, when a delay costs more than a slip? Friction protects against mistakes made in calm conditions, but it can slow the right action down when seconds matter."

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
  - id: b737-fmc
    title: "The Boeing 737 CDU/FMC Explained"
    url: "https://simtuts.com/guides/boeing-737-cdu-fmc-explained"
    type: article
    note: "How the staged-plan loop actually works: a route change puts MOD in the page title, shows an ERASE prompt, lights the white EXEC key, and draws the proposed route as a dashed line. Nothing takes effect until EXEC is pressed. The source Intent Preview uses for the same loop."
  - id: therac-25
    title: "An Investigation of the Therac-25 Accidents"
    author: "Nancy G. Leveson and Clark S. Turner"
    year: 1993
    url: "https://web.stanford.edu/class/cs240/old/sp2014/readings/therac-25.pdf"
    type: incident-report
    note: "Observed: hardware interlocks were replaced with software, and operators could edit and proceed past error messages at speed. The cost of missing friction."
---

## Design considerations

- **Reserve friction for what can't be undone.** A pause that appears everywhere gets cleared from habit, and then it protects nothing.[cite:therac-25][cite:parasuraman-riley-1997]
- **Name the consequence, not the doubt.** “Release payload over zone B” makes the operator check; “Are you sure?” only makes them click.
- **Treat frequent warnings as a defect.** The Therac-25 raised malfunction messages constantly — one clinic logged an average of 40 dose-rate faults on some days — and most of them meant nothing, so clearing them became routine. Every warning that doesn't need action trains people to ignore the one that does.[cite:therac-25]
- **Don't let software be the only safeguard.** The Therac-25's predecessors had hardware interlocks that made the same bug harmless. Its makers chose not to duplicate them all and leaned on software instead, and the software failed.[cite:therac-25]
- **Scale friction with the stakes.** Routine, reversible actions stay fast; a hold, a delay or a second trigger is for the rest.[cite:parasuraman-sheridan-wickens-2000]

## In the field

**Observed · Clinical.** [Therac-25](#tale): carrying on after a malfunction was one keystroke deep, on a console whose malfunction messages were commonplace enough that clearing them was the normal thing to do.[cite:therac-25]

**Observed · Aviation.** On a Boeing 737 flight management computer, a route change is held as a modification rather than flown: the page title reads MOD, an ERASE prompt appears, and the EXEC key lights. The new route does not take effect until EXEC is pressed.[cite:b737-fmc]
