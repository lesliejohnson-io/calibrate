---
number: 10
name: "Explainable Fault"
intent: "When something goes wrong, the system names the actual fault in the operator's terms and points at what to do about it, instead of showing symptoms or a code. On the 777 a checklist icon sits beside the message."
# The index card's line (redesign-handoff.md §2). Drafted on the redesign
# canvas, 2026-11-05 — not yet reviewed.
cardIntent: "The system names the actual fault in the operator's terms and points at what to do."

moment: failure
trustJobs: [know, recover]
risk: critical
reversibility: irreversible
autonomy: [1, 4]
domains: [aviation]

status: draft
updated: "2026-10-30"

steps:
  - title: "Fault occurs"
    detail: "A sensor, link or subsystem fails"
  - title: "Diagnose it"
    detail: "Find the cause behind the symptoms"
  - title: "Name it in the operator's terms"
    detail: "The condition, not an error code"
    key: true
  - title: "Point at the response"
    detail: "The procedure that goes with it"
  - title: "Record it"
    detail: "So maintenance inherits the diagnosis"

antiPattern: "Symptoms Without a Cause"

interface:
  component: explainable-fault

without:
  steps: ["Fault occurs", "Symptoms only", "Wrong diagnosis"]
  caption: "Symptoms Without a Cause: the crew gets the downstream effects and has to infer the fault under time pressure. On the flight before JT610 the captain attributed the trim behaviour to the speed trim system — a different system entirely."

with:
  steps: ["Fault occurs", "Cause named", "Response to hand", "Fault recorded"]
  caption: "The alert names the condition in terms the operator recognizes and carries the procedure with it, so the diagnosis isn't left to inference. Because the fault has a name, it's logged and reaches maintenance before the next flight."

related:
  - slug: graceful-degradation
    type: complements
    note: "Degradation is the step down; this is the part that says which fault caused it. A fallback nobody can name is hard to work with."
  - slug: learning-loop
    type: complements
    note: "An unnamed fault cannot feed back. Without the alert, the JT610 crew could not document the faulty sensor, so it was not available to help maintenance."

sources:
  - id: airlineratings-knkt
    title: "Lion Air MAX report finds Boeing, airline, pilots contributed to tragedy"
    author: "AirlineRatings"
    year: 2019
    url: "https://www.airlineratings.com/articles/lion-air-max-report-finds-boeing-airline-pilots-contributed-tragedy"
    type: article
    note: "Secondary reporting on the KNKT final report. Carried in the research as the source for the miscalibrated angle-of-attack sensor and the inoperative AOA DISAGREE alert."
  - id: leeham-jt610
    title: "Bjorn's Corner: Analysing the Lion Air JT610 crash, Part 3"
    author: "Leeham News"
    year: 2019
    url: "https://leehamnews.com/2019/11/15/bjorns-corner-analysing-the-lion-air-jt610-crash-part-3/"
    type: article
    note: "Secondary. The symptoms the crew actually saw, and the previous captain's attribution of the trim behaviour to the speed trim system."
  - id: mit-16422
    title: "16.422 Human Supervisory Control of Automated Systems — alerting systems"
    author: "MIT OpenCourseWare"
    year: 2004
    url: "https://ocw.mit.edu/courses/16-422-human-supervisory-control-of-automated-systems-spring-2004/8d934ba66f80b2ca1f6f82cb0ee3e4bf_040804alertsys_1.pdf"
    type: talk
    note: "Observed. Course material describing the 777 EICAS behaviour: each alert message names the condition, and a checklist icon appears beside a message when an electronic checklist must be completed."
  - id: amershi-2019
    title: "Guidelines for Human-AI Interaction"
    author: "Saleema Amershi et al."
    year: 2019
    url: "https://www.microsoft.com/research/blog/guidelines-for-human-ai-interaction-design/"
    type: paper
    note: "CHI 2019. Guideline 11 is to make clear why the system did what it did — the same requirement stated for software."
  - id: pair-guidebook
    title: "People + AI Guidebook — Errors + Graceful Failure"
    author: "Google PAIR"
    url: "https://pair.withgoogle.com/chapter/errors-failing/"
    type: article
    note: "The chapter is built on three considerations: define what counts as an error, identify where errors come from, and provide paths forward from failure. The third is this pattern's second half stated for software — an error the user cannot act on is only half communicated. It also names returning control to the user as the usual path forward when a system fails."

review:
  - "Needs a cautionary tale"
  - "Demo: the checklist line reads \"CHECKLIST  AOA DISAGREE\" — the checklist named for the condition, which is the pattern's own logic. No source here names a real 737 checklist for this alert, so the label is drafted, not sourced."
  - "Mechanism steps: drafted. The research has definition, incident and interface example but no mechanism; the two step notes are sourced, the titles and details are not."
  - "KNKT final report (JT610) is flagged in the research as a primary source to pull. Every JT610 claim here rests on secondary reporting until it is."

openQuestions:
  - "How specific the named cause should be when the system cannot tell which of several faults it is seeing. Naming the wrong cause confidently is worse than naming the symptoms, and the honest middle — a short list of candidates — is harder to act on under time pressure."
---

The useful detail in JT610 is that the alert meant to name the fault was not working on that aircraft, so the crew were left with a stick shaker, disagreeing airspeed and altitude, and trim that kept pushing the nose down.[cite:airlineratings-knkt][cite:leeham-jt610] Symptoms are not a diagnosis. The previous day's captain had put the same behaviour down to the speed trim system,[cite:leeham-jt610] which is exactly what happens when a cluster of effects arrives without the cause attached: the crew reaches for the system that best explains what they can see.

There is a second cost, further downstream. Investigators noted that without the alert the crew could not document the faulty sensor, so it never reached maintenance.[cite:airlineratings-knkt] A fault that cannot be named cannot be reported, which means it cannot be fixed, which means the next crew meets it too. That is why the last step here is recording rather than displaying — naming the condition is what makes it transmissible. The 777's answer is the plainest version of the pattern: the message states the condition, and the icon beside it says there is a checklist to run.[cite:mit-16422]
