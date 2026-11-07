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
domains: [medical, aviation, drone, surgical, industrial]

status: draft
updated: "2026-11-07"

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
    note: "Restate the consequence (“Release payload over zone B”), never just “Are you sure?”"
  - title: "Execute + log"
    detail: "Action runs, provenance kept"

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

review:
  - "Tale corrected against Leveson & Turner: the console did not show only Malfunction 54. The draft read “The console showed only ‘MALFUNCTION 54.’” The report: “the console displayed the message ‘Malfunction 54.’ The machine also displayed a ‘treatment pause,’ indicating a problem of low priority… The machine showed a substantial underdose on its dose monitor display: 6 monitor units delivered, whereas the operator had requested 202 monitor units.” The display told her the patient had been under-treated, which is why pressing P was a reasonable act rather than a careless one — a stronger version of the point the page is making. Rewritten to say so, with the 6-against-202 figure."
  - "Tale and design consideration corrected: the frequency belonged to malfunction messages at large, not to Malfunction 54. Malfunction 54 itself was rare — AECL engineers “spent a day running the machine through tests but could not reproduce a Malfunction 54,” and the Tyler physicist needed “a great deal of effort” to elicit it. What was commonplace: “Malfunction messages were commonplace - most did not involve patient safety,” and at another clinic “an average of 40 dose-rate malfunctions, attributed to underdoses, occurred on some days.” Both now say malfunction messages, and “Treat frequent warnings as a defect” carries the 40-a-day figure."
  - "Tale corrected: the cry for help belongs to the April 11 patient. The draft read “nobody heard him cry out.” For March 21 the report has the patient feeling “an electric shock or that someone had poured hot coffee on his back” and beginning “to get up from the treatment table to go for help. It was at this moment that the operator hit the ‘P’ key”; he pounded on the door after the second exposure. The patient moaning for help over a working intercom is three weeks later. The monitors were right as drafted: “the video display was unplugged and the audio monitor was broken.” Rewritten to the March 21 sequence."
  - "Anti-pattern and design consideration corrected: software was not the only safeguard. The draft read “on the Therac-25, software was the only safeguard.” The report says AECL “decided not to duplicate all the existing hardware safety mechanisms and interlocks” and that “the Therac-25 relies largely on software.” The predecessor half is solid and is now stated concretely instead: on the Therac-20 the same bug was “just a nuisance… because this machine has independent hardware protective circuits for monitoring the electron-beam scanning. The protective circuits do not allow the beam to turn on, so there is no danger of radiation exposure to a patient” — the symptom there was tripped fuses and breakers."
  - "Verified against Leveson & Turner this pass: March 21, 1986 at the East Texas Cancer Center in Tyler, Texas; the patient face down on the treatment table while the operator “left the treatment room, closed the door, and sat at the control terminal”; the mode typed as “x” for X ray instead of “e” for electron and fixed with the cursor up key; the editing window — the Tyler error occurred when the operator “made an entry indicating the mode/energy, went to the command line, then moved the cursor up to change the mode/energy, and returned to the command line all within 8 seconds”; 16,500 to 25,000 rads against the 180 prescribed; “He died from complications of the overdose five months after the accident”; and “Between June 1985 and January 1987, six known accidents involved massive overdoses by the Therac-25.” The draft's “months later” is now “five months later”, and “one of six patients… between 1985 and 1987” is accurate as written."
  - "Demo invents its data. The drone, zone B and the 120 m altitude are written for this page: the pattern's sources describe a radiation therapy console, not an aircraft, and staging the real accident as a playable overdose was not the intent. What is taken from the sources is the behaviour — an irreversible action one keystroke deep, and a machine whose pauses the operator had learned to clear."
  - "Demo uses no red. The brief allowed a red danger state only if the other console demos use the same red for warnings. They do not: the printed displays carry a fault as brighter green (#b9ffc6) with added weight and a ⚠, and red on yellow is reserved for the emergency stop controls in Stop Anywhere, where the CSS notes that reserving those colours “only works if nothing else wears them.” This demo follows the printed displays."

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

**Observed · Medical.** [Therac-25](#tale): carrying on after a malfunction was one keystroke deep, on a console whose malfunction messages were commonplace enough that clearing them was the normal thing to do.[cite:therac-25]

**Observed · Aviation.** On a Boeing 737 flight management computer, a route change is held as a modification rather than flown: the page title reads MOD, an ERASE prompt appears, and the EXEC key lights. The new route does not take effect until EXEC is pressed.[cite:b737-fmc]
