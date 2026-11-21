# During — While it runs, can the human see and predict it?

Candidate patterns: Calibrated Confidence, Legible Motion, Mode Awareness, Alert Triage, Stop Anywhere
(The Glass Box and Shared Mental Model already live here.)

Research status key: **Ready** = incident, interface example and research all found. **Gap** = something still missing, listed under Open.

---

## Calibrated Confidence — Gap (interface example)

**Definition:** The system shows how sure it is, and keeps that uncertainty stable and visible, so the human's trust can rise and fall with the machine's actual reliability instead of staying fixed.

**Moment:** During · **Trust job:** Know, Predict

**Anti-pattern name:** Silent Flip-Flop. The system changes its mind repeatedly with no signal to anyone.

### Incident: Uber ATG, Tempe, Arizona (2018)
- The system detected the pedestrian 5.6 seconds before impact.
- It alternated her classification between vehicle, bicycle and "other," and so could not correctly predict her path.
- Each time the classification changed, the tracking history was discarded and she was treated as a new object, so the system could not see she was crossing into its lane.
- None of this uncertainty was surfaced to the operator.

### Research
- Lee & See (2004): appropriate trust means calibration, matching trust to the system's actual capability. Designing for "appropriate" rather than "greater" trust.
- Google PAIR Guidebook, Explainability + Trust: help users calibrate their trust; if, when and how the system shows confidence levels can be critical to the user's decision making.
- Amershi et al. (2019), Guideline 2: make clear how well the system can do what it can do.

### Open
- Need a concrete shipped interface that displays robot or vehicle confidence to an operator. Candidates to research: warehouse inventory vision systems that flag low-confidence scans for human review; perception confidence overlays in AV safety-driver displays.

### Sources
- [IEEE Spectrum on NTSB Tempe documents](https://spectrum.ieee.org/ntsb-investigation-into-deadly-uber-selfdriving-car-crash-reveals-lax-attitude-toward-safety)
- [Marquette Law on tracking history reset](https://law.marquette.edu/facultyblog/2020/01/autonomous-vehicle-malfunctions-may-not-be-so-complicated-after-all)
- [Streetsblog on NTSB report](https://usa.streetsblog.org/2019/11/07/report-ubers-software-flaws-led-to-fatal-crash)
- [Lee & See 2004 (PDF)](https://mycourses.aalto.fi/pluginfile.php/1903876/course/section/223217/Lee%20and%20See%20-%202004%20-%20Trust%20in%20Automation%20Designing%20for%20Appropriate%20Rel.pdf)
- [Google PAIR Explainability + Trust](https://pair.withgoogle.com/chapter/People%20+%20AI%20Guidebook%20-%20Explainability%20+%20Trust.pdf)

---

## Legible Motion — Gap (incident, interface example)

**Definition:** The machine's movement itself signals where it is going, so people nearby can read its goal from how it moves, not only from a screen.

**Moment:** During · **Trust job:** Predict

**Anti-pattern name:** Efficient but Opaque. The shortest path that nobody around the robot can read.

### Research
- Dragan, Lee & Srinivasa, "Legibility and Predictability of Robot Motion," HRI 2013 (Carnegie Mellon). Central finding: predictable motion (matches what you expect) and legible motion (conveys intent) are different and often contradictory. Robots must change how they plan motion to be legible.
- Dragan & Srinivasa, "Generating Legible Motion," RSS 2013. Legibility improves within a "trust region"; exaggerate too far and observers' confidence in the robot's goal drops.

### Open
- Incident: look for warehouse AMR or cobot near-misses where a worker misread the robot's direction (OSHA records, industrial robot accident literature).
- Interface example: look for a shipped AMR that uses motion cues (slowing, angling toward its goal) in addition to lights or projection.
- Pittsburgh angle: this work came out of CMU, which is worth mentioning when you talk to local robotics people.

### Sources
- [Dragan et al. 2013, CMU Robotics Institute](https://www.ri.cmu.edu/publications/legibility-and-predictability-of-robot-motion)
- [Dragan & Srinivasa, Generating Legible Motion](https://www.ri.cmu.edu/publications/generating-legible-motion)

---

## Mode Awareness — Ready

**Definition:** The system makes its current mode, and any change of mode, impossible to miss, especially when a mode change silently shifts a responsibility back to the human.

**Moment:** During · **Trust job:** Know

**Anti-pattern name:** Silent Mode Switch.

### Incident: Air Inter Flight 148, Mont Sainte-Odile (1992)
Added 2026-11-21. Asiana 214 below is already the opening story of Shared Mental Model, so this is the incident Mode Awareness opens with. Read from the French commission of inquiry report (BEA, F-GGED); translations are mine.
- Airbus A320 F-GGED, Lyon to Strasbourg-Entzheim, call sign ITF 148 DA. 20 January 1992, 18:20 UTC (add one hour for local time). Night, in cloud, VOR-TAC approach to runway 05.
- On board: 2 flight crew, 4 cabin crew, 90 passengers. Killed: 5 crew, 82 passengers. Nine survived. (Synopsis; ch. 1.2; ch. 3.1.)
- The descent began at the published distance, 11 NM from the TACAN, but the vertical speed settled at 3300 ft/mn instead of about 800 ft/mn, the rate for the published path. The reference was almost certainly HDG-VS. (Ch. 3.1.)
- Impact on Mont La Bloss (summit 826 m / 2710 ft) at 799 m (2620 ft), about 10.5 NM from the runway 05 threshold. (Ch. 3.1.)
- Cause not established with certainty. The hypotheses the commission judged "assez probables": a vertical mode confusion (forgetting to change the reference, or mis-executing the change) or a setting error (entering by habit the value announced at the briefing). A FCU failure was judged very unlikely. (32.4.)
- In every hypothesis, the crew did not perceive the resulting vertical path anomaly, a vertical speed about four times the reference value. (32.5.)
- Display and control, 22.335: one rotary knob and one numeric window serve both VS and FPA; the digits are about three times the height of the mode legend; VS is shown in two digits (hundreds of ft/min), so "33" and "3.3" are near-identical. The commission judged the probability of confusion between 33 and 3.3 "élevée" and the error, once made, practically undetectable from the display alone.
- Annex 4 (3.3): the V/S or FPA target was shown in the FCU window and the mode on the FMA, but the target value was not shown on the PFD.
- 32.63: the presentation of vertical path parameters suited normal situations but lacked sufficient alerting power for a crew with a wrong picture of the situation. 32.7: the ergonomic design of the vertical autopilot controls may have contributed.
- No GPWS fitted; French rules did not require one at the time. (Ch. 3.1; 32.67.)
- Recommendations, 44.1: show the VS or FPA target on the PFD; change the FCU window to an unambiguous expression in normal units; strengthen the difference between the HDG-VS and TRK-FPA symbology on the PFD. 44.2: for all new-generation aircraft, mode annunciation by small alphanumeric text needs central vision and high-level decoding, and has low alerting power for a crew whose picture of the automation is wrong.
- Source: [BEA, Rapport de la commission d'enquête, F-GGED](https://bea.aero/uploads/tx_elydbrapports/F-GGED.pdf). English translation hosted at faa.gov (Accident_Report_Eng.pdf) refused an automated fetch; not read.

### Incident: Asiana Airlines Flight 214, San Francisco (2013)
Already used as the opening story of Shared Mental Model (05). Kept here as a second example.
- The pilot flying disconnected the autopilot and moved the thrust levers to idle, which put the autothrottle into HOLD mode, where it does not control airspeed.
- None of the three pilots in the cockpit noticed the change to HOLD.
- NTSB cited autothrottle and autopilot complexities that were inadequately described in Boeing's documentation and Asiana's training, which increased the likelihood of mode error.
- NTSB found that if an automatic "wake-up" had been available in that mode, it would likely have added power about 20 seconds before impact. Boeing later changed the 777 logic.
- Three people died.

### Interface example: Flight Mode Annunciator (FMA)
- The FMA at the top of the primary flight display shows the active autothrottle and autopilot modes in text (HOLD was annunciated there).
- Lesson for the pattern: a text annunciation is necessary but not sufficient. A mode change that transfers responsibility needs a stronger cue than a word changing in a status row.

### Sources
- [NTSB Asiana 214 investigation page](https://www.ntsb.gov/investigations/pages/DCA13MA120.aspx)
- [Swissinfo/Reuters on wake-up finding](https://www.swissinfo.ch/eng/u-s-investigators-propose-review-of-flight-controls-after-asiana-crash/40471988)
- [AIN on NTSB hearing](https://ainonline.com/aviation-news/2004-08-01/asiana-214-ntsb-looks-beyond-obvious-pilot-error)
- [Business & Commercial Aviation on the "FLCH trap" and Boeing's fix](https://informamarkets.turtl.co/story/bca-q3-2023/page/15)
- Primary source to pull: NTSB report AAR-14/01

---

## Alert Triage — Ready

**Definition:** Alerts are ranked by how urgently a human must act, and the ranking is visible in color, position and sound, so the critical signal is not buried in a flood.

**Moment:** During · **Trust job:** Know, Intervene

**Anti-pattern name:** Alarm Flood.

### Incident: Three Mile Island Unit 2 (1979)
- A cascade of alarms reached 100 within minutes of the first one.
- The computer alarm printer fell hours behind events, at one point delayed more than two and a half hours.
- An operator later told the President's Commission he would have liked to throw away the alarm panel because it gave no useful information.

### Interface example: Flight-deck alert hierarchy (EASA CS 25.1322)
- Three levels: Warning (immediate awareness and immediate response), Caution (immediate awareness, subsequent response), Advisory (awareness, may need response).
- Color is reserved: red for Warnings, amber or yellow for Cautions, and Advisories any color except red or green.
- Warnings and Cautions must reach the crew through at least two senses.
- Boeing's EICAS on the 777 also places a checklist icon next to a message when a procedure must be completed, linking the alert to the action.

### Open
- Add the process-industry standard for alarm management (ISA-18.2) as a second interface example; it is closer to warehouse and plant control rooms.

### Sources
- [TMI Alert, President's Commission excerpts](https://www.tmia.com/wednesday)
- [NRC testimony on alarm printer delay](https://www.nrc.gov/docs/ML1933/ML19337A432.pdf)
- [EASA CS 25.1322 alerting](https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-large-aeroplanes-cs-25?page=42)
- [MIT 16.422 alerting systems lecture](https://ocw.mit.edu/courses/16-422-human-supervisory-control-of-automated-systems-spring-2004/8d934ba66f80b2ca1f6f82cb0ee3e4bf_040804alertsys_1.pdf)

---

## Stop Anywhere — Ready

**Definition:** A human near or responsible for the machine can always stop it, with one unmistakable control that works in every mode, and the stop holds until a human deliberately releases it.

**Moment:** During · **Trust job:** Intervene

**Anti-pattern name:** No Brakes for Bystanders. Nobody present has authority to halt the machine.

### Incident: Waymo vehicle in a cone zone (reported by AI Business)
- A Waymo vehicle confused by cones requested help from its remote fleet response team, which gave it incorrect guidance.
- The car later pulled out, parked partly in the road, then moved forward as a roadside assistant approached. Neither the remote nor the roadside assistant could stop it.
- Note: news report, not an investigation. Use as an illustration, and say so on the page.

### Interface example: Machinery emergency stop (ISO 13850, IEC 60204-1)
- Emergency-stop actuators are red on a yellow background, and that combination is reserved for emergency devices only.
- Once pressed, the stop command latches and is maintained until the device is reset.
- Reset must be an intentional human action, and only at the location where the stop was triggered.

### Open
- Robotics angle to research: how AMR fleets handle remote stop versus on-robot stop, and who on the floor is allowed to trigger each.

### Sources
- [AI Business on Waymo cone incident](https://aibusiness.com/verticals/waymo-car-filmed-as-it-gets-confused-by-cones-escapes-its-own-support-team)
- [Schneider Electric on IEC 60204-1 colors](https://www.se.com/ie/en/faqs/FA28043/)
- [IPD on emergency stop function](https://www.ipd.com.au/ArticleView.aspx?ID=227)
- [Farnell/IDEC on ISO 13850 reset](https://www.farnell.com/datasheets/4129338.pdf)
- [In Compliance on red/yellow reservation](https://incompliancemag.com/?p=29942)
