---
number: 16
name: "Mode Awareness"
intent: "The machine makes its current mode, and every change of mode, impossible to miss, most of all when a change hands a job back to the operator."
# The index card's line. Drafted 2026-11-21, not yet reviewed.
cardIntent: "The current mode, and any change to it, is impossible to miss."

moment: during
trustJobs: [know]
risk: critical
reversibility: irreversible
autonomy: [1, 4]
domains: [aviation]

status: draft
updated: "2026-11-21"

steps:
  - title: "Mode changes"
    detail: "Selected, or switched by the machine"
  - title: "Name what moved"
    detail: "Which job the machine dropped or took on"
  - title: "Pair mode with value"
    detail: "Each number carries its mode and unit"
    key: true
  - title: "Escalate the handback"
    detail: "Stronger cue when a job returns to the operator"
  - title: "Check the result"
    detail: "Target and effect shown where the operator looks"

antiPattern: "Silent Mode Switch"

cautionaryTale:
  title: "Air Inter Flight 148 at Mont Sainte-Odile"
  date: "January 20, 1992"
  place: "Barr, Bas-Rhin, France"
  story: >-
    At night and in cloud, the crew of an Airbus A320 began their descent
    toward Strasbourg at exactly the published point. The approach called for
    about 800 feet per minute; the airplane settled at 3,300. The investigators
    could not say for certain why, but the explanations they judged fairly
    probable end the same way: the figure from the approach briefing, meant as
    a 3.3-degree path, set while the autopilot was in vertical speed mode,
    where the same knob and the same window read in hundreds of feet per
    minute. Neither pilot noticed a descent about four times steeper than
    planned. The airplane struck a ridge near Mont Sainte-Odile, 10.5
    nautical miles short of the runway, and 87 of the 96 people on board died.
  sourceId: bea-f-gged

therefore: >-
  Show every value with the mode and unit it belongs to, on the display the
  operator is watching, so that a number meant for one mode cannot pass for
  the other.

without:
  steps: ["Value entered", "Wrong mode, same digits", "Descent no one sees"]
  caption: "One knob and one window served both vertical modes. The digits stood about three times taller than the mode label beside them, and a flight path angle and a vertical speed were written in the same two-digit shape, so a value meant for one mode read as correct in the other. The target never appeared on the display the crew used to check the result."

with:
  steps: ["Value entered", "Mode and unit shown with it", "Mismatch caught"]
  caption: "A path angle and a vertical speed look different on sight, and the target sits where the operator checks the airplane's response, so the wrong one is visible before it becomes a descent."

related:
  - slug: shared-mental-model
    type: complements
    note: "Shared Mental Model is the operator's whole picture of the machine matching the machine. Mode Awareness is the display job that keeps the mode part of that picture true."
  - slug: graceful-degradation
    type: complements
    note: "A step-down is a mode change. Graceful Degradation picks the rung; this decides whether the operator notices the machine has moved to it."
  - slug: alert-triage
    type: tension-with
    note: "A cue for every mode change is a flood by another route. Only changes that hand a job back should compete for attention at warning level."

review:
  - "Incident changed from the research's first choice. research/during.md named Asiana 214, but Shared Mental Model (05) already opens with it, its Therefore and its autothrottle demo. Air Inter 148 was added to research/during.md on 2026-11-21 by your call and read from the BEA report itself; Asiana stays as a second In the field example."
  - "Tale rests on the commission's hypotheses, not an established cause. Report 32.4: the reason for the high descent rate could not be determined with certainty; the vertical mode confusion and the setting error are both rated “assez probables”, and a FCU failure “très peu probable”. The tale says the investigators could not say for certain and gives the outcome the probable hypotheses share (3.3 entered in VS mode), not one of them as fact."
  - "Verified against the French report this pass (translations are mine): 20 January 1992, 18:20 UTC (synopsis); Lieu-dit “La Bloss”, Commune de Barr (Bas-Rhin), near Mont Sainte-Odile (synopsis); descent begun at the published 11 NM; 3300 ft/mn against about 800 ft/mn; reference “presque sûrement” HDG-VS (ch. 3.1); vertical speed about four times the reference, not perceived (32.5); impact 10.5 NM from the runway 05 threshold (ch. 3.1); 2 flight crew, 4 cabin crew and 90 passengers on board, 5 crew and 82 passengers killed, nine survivors (synopsis, ch. 1.2, ch. 3.1). 2 + 4 + 90 = 96 and 5 + 82 = 87."
  - "Tale: “a ridge near Mont Sainte-Odile” is my wording for Mont La Bloss (826 m). The title uses Mont Sainte-Odile because that is the name the accident is known by and the one the report's own title uses."
  - "Source is the French original. An English translation is hosted at faa.gov (sites/faa.gov/files/2022-11/Accident_Report_Eng.pdf) but returned 403 to an automated fetch and was not read. Swap the URL if you would rather link the English, after checking it says the same."
  - "Source year: 1993 from the report's own account of its schedule (final meetings and the consultation in 1993). A search result gives 26 November 1993 as the date; not confirmed in the text."
  - "Without caption, “about three times taller”: 22.335 says the selected values are “beaucoup plus lisible (hauteur triple)” than the mode indication."
  - "Drafted, needs your review: risk, reversibility, autonomy [1, 4], the five mechanism steps, the With side, and the cardIntent. None is from research."
  - "Not carried over from research: the Asiana “wake-up” finding (that an automatic wake-up in HOLD would likely have added power about 20 seconds before impact). Research has it from Swissinfo/Reuters only; the primary, NTSB AAR-14/01, still needs pulling for that finding. AIN and Business & Commercial Aviation articles also left out: not read this pass."
  - "What Airbus changed on the FCU after the accident is not stated in the report text read here, so the page does not claim it."
  - "Needs demo (see DEMOS.md). It must not repeat the autothrottle demo Shared Mental Model already uses; the concept in DEMOS.md is built on the shared knob and window instead."
  - "Worth settling: whether Mode Awareness stands apart from Shared Mental Model. Both now open on vertical-mode error in aviation; Shared Mental Model's Therefore is close to this pattern's intent."

drafts:
  tale: true
  antiPattern: true
  demo: true
  considerations: true

openQuestions:
  - "Which mode changes deserve a cue strong enough to interrupt, and which should stay quiet? Every alert spent on a routine change trains operators to look past the one that hands a job back."
  - "How does this carry over to machines without a flight deck's display discipline — a forklift switching from autonomous to manual, a surgical robot changing control scheme? The research so far is all aviation."

sources:
  - id: bea-f-gged
    title: "Rapport de la commission d'enquête sur l'accident survenu le 20 janvier 1992 près du Mont Sainte-Odile (Bas-Rhin) à l'Airbus A 320 immatriculé F-GGED exploité par la compagnie Air Inter"
    author: "Commission d'enquête, Ministère de l'Équipement, des Transports et du Logement (published by the BEA)"
    year: 1993
    url: "https://bea.aero/uploads/tx_elydbrapports/F-GGED.pdf"
    type: incident-report
    note: "Observed. In French. A descent at 3300 ft/mn instead of about 800 that neither pilot perceived (3.1, 32.5), most probably from a confusion between the vertical speed and flight path angle modes. One knob and one window served both, the value dwarfed the mode label, and 33 and 3.3 were near-identical on the display (22.335). Recommends showing the target on the PFD and an unambiguous FCU format (44.1), and better mode annunciation for every new-generation aircraft (44.2)."
  - id: ntsb-aar-14-01
    title: "Descent Below Visual Glidepath and Impact With Seawall, Asiana Airlines Flight 214, Boeing 777-200ER, HL7742, San Francisco, California, July 6, 2013"
    author: "National Transportation Safety Board"
    year: 2014
    url: "https://www.ntsb.gov/investigations/AccidentReports/Reports/AAR1401.pdf"
    type: incident-report
    note: "Observed. NTSB/AAR-14/01. Moving the thrust levers to idle put the autothrottle into HOLD, where it does not control airspeed, and none of the three flight crewmembers noted the change (1.1). The flight mode annunciator shows the active autothrottle mode in green, boxed for ten seconds when it becomes active (1.6.3.3)."
---

## Design considerations

- **Put the mode beside the number it governs.** On the A320 at the time, vertical speed and flight path angle shared one knob and one window, and the digits stood about three times taller than the mode label next to them. The value was what the eye read.[cite:bea-f-gged]
- **Never give two modes the same format.** Vertical speed was shown in two digits, hundreds of feet per minute, so 33 and 3.3 looked nearly alike. The investigators judged that confusion likely, and once made, practically impossible to spot from the display alone.[cite:bea-f-gged]
- **Show the target where the operator checks the result.** The selected vertical speed or path angle appeared on the control panel but not on the primary flight display, which is where crews were taught to check what the airplane was doing. The commission recommended putting it there.[cite:bea-f-gged]
- **Don't rely on a word in a status row.** Small text labels need to be read head-on and decoded, which gives them little power to alert an operator whose picture is already wrong.[cite:bea-f-gged] On Asiana Airlines Flight 214 at San Francisco, HOLD appeared boxed on both pilots' displays and none of the three pilots in the cockpit noted it.[cite:ntsb-aar-14-01]
- **Escalate when a job comes back.** A mode change that leaves the operator responsible for something the machine was doing needs a stronger cue than one that doesn't.

## In the field

**Observed · Aviation.** [Air Inter Flight 148 at Mont Sainte-Odile](#tale): a descent four times steeper than planned, probably set by a value meant for the other mode, on a panel where the two looked the same.[cite:bea-f-gged]

**Observed · Aviation.** On Asiana 214, moving the thrust levers to idle left the autothrottle in HOLD, where it no longer controls airspeed. The flight mode annunciator showed the change in green, boxed for ten seconds, and none of the three pilots noted it.[cite:ntsb-aar-14-01]

## Notes

Both incidents have the same shape: the mode was on the display, and nobody saw it. That's why this pattern isn't satisfied by annunciating the mode. The question is whether the operator can tell, at a glance and under load, which mode a number belongs to and what the machine has stopped doing.
