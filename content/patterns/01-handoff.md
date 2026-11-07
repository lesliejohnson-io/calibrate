---
number: 1
name: "The Handoff"
intent: "The machine hands over control on purpose: it signals early, says what's happening, and gives the operator time to get their bearings before they're responsible."
# The index card's line (redesign-handoff.md §2). Drafted on the redesign
# canvas, 2026-11-05 — not yet reviewed.
cardIntent: "The machine yields control on purpose and gives the human time to orient before they are accountable."

moment: transition
trustJobs: [intervene, predict]
risk: critical
reversibility: irreversible
autonomy: [2, 4]
domains: [automotive, surgical, drone]

status: draft
updated: "2026-11-07"

steps:
  - title: "Machine leads"
    detail: "Autonomy nominal"
  - title: "Trigger"
    detail: "Approaching the edge of its limits"
    note: "Hand off early and on purpose, at a designed boundary, not at the moment of failure."
  - title: "Signal + state"
    detail: "Mode, intent, hazards, time left"
    key: true
  - title: "Orient"
    detail: "Human acknowledges, gets bearings"
    note: "The window is sized to how long a human needs to re-enter the task, not to when the machine runs out."
  - title: "Human leads"
    detail: "Machine confirms release"

antiPattern: "The Handoff That Never Came"

interface:
  component: handoff

# The demo is an invented motorway handoff, not the Tempe crash: the speeds,
# the construction zone and the countdowns are written for this page.
demoNote: "Simplified illustration."

cautionaryTale:
  title: "Uber self-driving test vehicle"
  date: "March 18, 2018"
  place: "Tempe, Arizona"
  story: >-
    Just before 10 p.m., an Uber test SUV driving itself at about 40 mph
    detected a woman walking a bicycle across the road 5.6 seconds before
    reaching her. Its software kept changing its mind about what she was, and
    didn't conclude she was in its path until about a second before impact.
    The system relied on the safety operator behind the wheel to brake in an
    emergency, but it wasn't designed to alert her. She was looking down, and
    she grabbed the wheel a split second before the car struck and killed the
    pedestrian.
  sourceId: ntsb-har-19-03

therefore: >-
  Hand over control early and on purpose: signal clearly, tell the operator
  what's happening, give them time to get their bearings, and release only
  when they confirm.

without:
  steps: ["Machine driving", "Sudden alarm", "Human takes over cold"]
  caption: >-
    The system's design depended on a person taking over in an emergency, but
    it had no way to ask her. The handoff existed only in the plan. And even a
    perfect alarm a second before impact would have been too late: by then,
    there's no time to look up, understand and act.

with:
  steps: ["Early signal", "State briefing", "Confirmed takeover"]
  caption: "The transfer is announced, explained and acknowledged. Responsibility moves only once the human is oriented."

whenToUse: "Use this whenever a machine can reach the edge of what it can safely do and an operator is expected to take over. It matters most at autonomy levels where the human isn't watching continuously, so they arrive cold."

related:
  - slug: shared-mental-model
    type: requires
    note: "The state briefing only works if the human's model of the situation is already current."

review:
  - "Tale, the speed does not match the report. The story has the SUV “driving itself at about 40 mph” at the moment it detected her. NTSB HAR-19/03 has it approaching the site “at a speed of 45 mph” and recorded at 44.1 mph 5.6 seconds before impact; 40.5 mph is its speed 0.2 seconds before impact, and 39 mph is the impact speed. “About 45 mph” is what the source carries for the moment the sentence describes. Text left as supplied."
  - "Tale, “it wasn't designed to alert her” is contradicted by the report, and this is the page's load-bearing claim. The ADS was designed to alert: “If a collision could not be avoided with the application of maximum allowed braking, the system was designed to send an auditory alert to the vehicle operator while simultaneously initiating gradual vehicle slowdown.” It did so, 0.2 seconds before impact. What the report supports is narrower and still damning: no alert was given when the system first recognised the emergency at 1.2 seconds (“No alert was given to the operator when action suppression was initiated”), and the alert it was designed to send announced the vehicle's own slowdown rather than asking her to take over. The system had no way to ask for a takeover; it is not true that it had no way to alert her. Text left as supplied."
  - "Anti-pattern, “it had no way to ask her” carries the same problem as the tale's last clause, for the same reason. Accurate as written if “ask” means “request a takeover”; wrong if a reader takes it as “no alert of any kind”. Text left as supplied."
  - "Tale, “about a second before impact” is 1.2 seconds in the report: “Only when the ADS determined that the pedestrian's detected location was in the path of the SUV, 1.2 seconds before impact, did the system recognize an emergency situation.” Rounding down is defensible; the figure is recorded here so the next editor does not have to look it up."
  - "The `ntsb-har-19-03` source note still reads “The system never alerted the safety operator.” The same report shows an auditory alert 0.2 seconds before impact. The note was not in the brief's scope, so it was left alone, but it is wrong on the same point as the tale and should change with it."
  - "“Safety operator” is not the report's term. NTSB HAR-19/03 says “vehicle operator” throughout; Uber ATG renamed the role “mission specialist” after the crash. The site has used “safety operator” on this page already, so it was kept for consistency rather than changed here."
  - "The five existing design considerations were kept verbatim, per the brief, and so remain uncited. Three have direct support among the sources already on the page: window sizing in Eriksson & Stanton and Gold et al., the three-level briefing in Endsley & Jones, and clearing the channel in UN R157, which the source note says “requires non-driving displays to suspend once a handoff starts”. Say the word and the citations go on."
  - "The AF447 entry was reworded by three words. It used to end “as a few lines of text in this zone”, pointing at a BEA figure that was never added to /public and that the move to prose entries removes; it now reads “on the message display”. Nothing else about the entry changed."
  - "Demo invents its data. The pattern's source describes a 2018 crash in Tempe; the motorway, the construction zone, the 62 mph and both countdowns are written for this page. What is taken from the source is the shape of the failure: a design that depends on a person taking over, with no useful warning before the moment it needs them."
  - "Check Bainbridge citation placement. Bainbridge supports why a late or cold takeover fails — the operator has been monitoring for rare failures with skills gone rusty from disuse — not the \"hand off early, at a designed boundary\" claim the sentence leads with. There is no sentence in the body making that point on its own, so the citation was removed rather than moved."

openQuestions:
  - "How long is long enough? The time a person needs to get their bearings varies with the domain, and with how long they've been out of the loop."
  - "What if the operator says no? A handoff assumes the person will accept control. The design needs an answer for when they can't or won't."

sources:
  - id: bainbridge-1983
    title: "Ironies of Automation"
    author: "Lisanne Bainbridge"
    year: 1983
    url: "https://doi.org/10.1016/0005-1098(83)90046-8"
    type: paper
    note: "The classic statement of why the handoff is the hard part: automation leaves the human to monitor for rare failures and take over when things go wrong, with skills gone rusty from disuse. The case for handing off early and at a designed boundary rather than at the moment of failure."
  - id: gold-2013
    title: "“Take over!” How long does it take to get the driver back into the loop?"
    author: "Christian Gold, Daniel Damböck, Lutz Lorenz and Klaus Bengler"
    year: 2013
    url: "https://mediatum.ub.tum.de/doc/1308108/file.pdf"
    type: paper
    note: "The empirical basis for sizing the orientation window: shorter takeover times produce faster decisions that are also worse ones."
  - id: eriksson-stanton-2017
    title: "Takeover Time in Highly Automated Vehicles: Noncritical Transitions to and From Manual Control"
    author: "Alexander Eriksson and Neville A. Stanton"
    year: 2017
    url: "https://doi.org/10.1177/0018720816685832"
    type: paper
    note: "Non-critical takeovers vary enormously, roughly 2 to 26 seconds. Sizing a planned handoff from emergency-takeover data is a mistake."
  - id: un-r157
    title: "UN Regulation No. 157 — Automated Lane Keeping Systems (ALKS)"
    url: "https://eur-lex.europa.eu/eli/reg/2021/389/oj/eng"
    type: standard
    note: "The regulatory vocabulary for this pattern: transition demand, transition phase, and planned versus unplanned events. It also requires non-driving displays to suspend once a handoff starts."
  - id: sae-j3016
    title: "SAE J3016 — Taxonomy and Definitions for Terms Related to Driving Automation Systems"
    year: 2021
    url: "https://saemobilus.sae.org/standards/j3016_202104-taxonomy-definitions-terms-related-driving-automation-systems-road-motor-vehicles"
    type: standard
    note: "Defines the request to intervene, and the fallback-ready user role that Level 3 depends on."
  - id: ntsb-har-19-03
    title: "NTSB HAR-19/03 — Collision Between Vehicle Controlled by Developmental Automated Driving System and Pedestrian, Tempe, Arizona"
    year: 2019
    url: "https://www.ntsb.gov/investigations/accidentreports/reports/har1903.pdf"
    type: incident-report
    note: "Observed: the failure this pattern exists to prevent. The system never alerted the safety operator, and the operator was not monitoring."
  - id: bea-af447
    title: "BEA Final Report — Air France Flight AF447, Rio de Janeiro to Paris"
    year: 2012
    url: "https://www.faa.gov/sites/faa.gov/files/f-cp090601.en_.pdf"
    type: incident-report
    note: "Observed: sudden autopilot disconnection, startle, and a crew taking over cold. The “Without” column in real life."
  - id: endsley-jones
    title: "Designing for Situation Awareness"
    author: "Mica Endsley and Debra Jones"
    url: "https://www.amazon.com/dp/1420063553"
    type: book
    note: "The three-level model — what’s happening, what it means, what happens next — is a test for the state briefing. A handoff that delivers the first level alone leaves the human holding data instead of understanding."
  - id: carr-2014
    title: "The Glass Cage"
    author: "Nicholas Carr"
    year: 2014
    url: "https://www.amazon.com/dp/0393351637"
    type: book
    note: "Why a cold takeover fails even when the alarm works: skill and attention erode while the machine is driving. The orientation window has to be sized for an operator who has been out of the loop, not for one who never left it."

---

## Design considerations

- **Never depend on someone you can't alert.** If the design assumes a person will take over, the system needs a way to ask them, early.[cite:ntsb-har-19-03]
- **Trigger at a designed boundary.** Decide in advance which conditions start a handoff, and start it before the machine runs out of options. A handoff that begins at the moment of failure is already late.
- **Size the window to the human.** Planned takeovers vary widely in how long they take. Base the orientation window on operators who have been out of the loop, not on emergency takeover data.
- **Brief all three levels.** Tell the human what is happening, what it means, and what happens next. Raw state alone leaves them holding data instead of understanding.
- **Clear the channel.** Suspend unrelated displays and media once a handoff starts, so the briefing is the only thing competing for attention.
- **Release only on acknowledgment.** Responsibility moves when the human confirms, not when a timer expires. If nobody confirms, fall back to a safe stop rather than handing control to no one.

## In the field

**Observed · Automotive.** [Tempe, 2018](#tale): the design made the operator its emergency countermeasure, and the handoff never reached her in time to be one.[cite:ntsb-har-19-03]

**Observed · Automotive.** UN R157 names this moment the transition demand, and requires non-driving displays to suspend once it starts.[cite:un-r157]

**Observed · Aviation.** Air France 447: the autopilot disconnected suddenly and the crew took over cold. The handoff arrived as a few lines of text on the message display.[cite:bea-af447]

## Notes

Timing is where this one usually goes wrong. A handoff triggered when the machine runs out of options is already too late, because the operator has been out of the loop and needs time to work out what's happening before they can act.[cite:carr-2014] Planned takeovers vary enormously in how long they take, so sizing the window from emergency data leaves people short.[cite:eriksson-stanton-2017]
