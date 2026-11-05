---
number: 2
name: "The Glass Box"
intent: "The machine shows its reasoning, not just its output, so operators can trust or override it with context."
# The index card's line (redesign-handoff.md §2). Drafted on the redesign
# canvas, 2026-11-05 — not yet reviewed.
cardIntent: "The machine shows its reasoning, not just its output, so operators can trust or override it with context."

moment: during
trustJobs: [know, calibrate]
risk: elevated
reversibility: costly
autonomy: [2, 4]
domains: [industrial, surgical, maritime]

status: draft
updated: "2026-10-23"

steps:
  - title: "Inputs"
    detail: "Sensors, history, thresholds"
  - title: "Inference"
    detail: "Model weighs the evidence"
  - title: "Recommend + why"
    detail: "“X, because of A, B and C”"
    note: "Surface the drivers: sensor confidence, historical match, and which threshold was breached."
    key: true
  - title: "Operator judges"
    detail: "Agree, question or override"
  - title: "Decision logged"
    detail: "With the reasons behind it"
    note: "Overrides feed back, so disagreement becomes signal instead of noise."

without:
  steps: ["Black-box model", "“Do X”", "Blind accept or ignore"]
  caption: "Operators either rubber-stamp or distrust everything. Neither is calibrated trust."

with:
  steps: ["Model + evidence", "“X, because…”", "Informed decision"]
  caption: "Operators check the reasoning against what they see, and override when the machine is missing something."

review:
  - "Unsourced claim: “produces the same rubber-stamping as showing nothing”. A claim about what too much explanation does to operator behaviour; none of the four sources establishes it."
  - "No citations placed. The Notes section here is design argument rather than sourced claim, so a strict pass found nothing to attach."

sources:
  - id: chen-2014
    title: "Situation Awareness–Based Agent Transparency"
    author: "Jessie Y. C. Chen et al."
    year: 2014
    url: "https://apps.dtic.mil/sti/pdfs/ADA600351.pdf"
    type: paper
    note: "The core framework: three levels of transparency. Level 1 is what it is doing and its plan, level 2 is why, level 3 is what it projects will happen and how uncertain it is."
  - id: boyce-2015
    title: "Agent Transparency for an Autonomous Squad Member"
    author: "Michael Boyce, Jessie Y. C. Chen, Anthony Selkowitz and Shan Lakhmani"
    year: 2015
    url: "https://apps.dtic.mil/sti/tr/pdf/ADA616862.pdf"
    type: paper
    note: "An applied study of transparency displays for an autonomous robot teammate, and their effect on trust and situation awareness."
  - id: lee-see-2004
    title: "Trust in Automation: Designing for Appropriate Reliance"
    author: "John D. Lee and Katrina A. See"
    year: 2004
    url: "https://journals.sagepub.com/doi/10.1518/hfes.46.1.50_30392"
    type: paper
    note: "Why showing reasoning matters: trust should be calibrated to capability. The purpose, process and performance dimensions map directly onto what a glass box exposes."
  - id: norman-1990
    title: "The “Problem” of Automation: Inappropriate Feedback and Interaction, Not “Over-Automation”"
    author: "Donald A. Norman"
    year: 1990
    url: "https://ntrs.nasa.gov/api/citations/19900004678/downloads/19900004678.pdf"
    type: paper
    note: "The problem is not automation itself but inadequate feedback to the people supervising it."
---

An explanation only helps if the operator can check it against something they can see for themselves. Dumping the whole model into the interface produces the same rubber-stamping as showing nothing, so the reasons have to be few and specific to the decision in front of them. Recording what operators override matters as much as showing the reasons, because repeated disagreement in the same situation is the clearest sign the model is wrong.
