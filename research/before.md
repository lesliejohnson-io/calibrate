# Before — Before the machine acts, does the human agree?

Candidate patterns: Intent Preview, Capability Disclosure, Readiness Check
(Appropriate Friction already lives here.)

Research status key: **Ready** = incident, interface example and research all found. **Gap** = something still missing, listed under Open.

---

## Intent Preview — Ready

**Definition:** Before the machine acts, it shows the human what it is about to do (the path, the destination, the area it will sweep) so a wrong plan can be caught before it becomes a wrong action.

**Moment:** Before · **Trust job:** Know (sets up Intervene)

**Anti-pattern name:** Blind Execute. The system commits a plan the human never saw.

### Incident: American Airlines Flight 965, Cali, Colombia (1995)
- On a rushed approach, the captain entered "R" for the Rozo beacon. Rozo could only be reached by typing its full name; "R" selected the Romeo beacon near Bogotá, 132 nm away.
- The crew did not know the "R" on their chart (Rozo) was not the "R" they entered and executed (Romeo).
- The captain did not verify the provisional path on the FMS display or confirm it with the first officer before executing, in at least two separate cases.
- Investigators also cited FMS logic that dropped all intermediate fixes from the displays once a direct routing was executed, so the preview itself was degraded.
- The aircraft turned toward high terrain. 160 of 164 aboard died.
- Lesson drawn by investigators: when directing the FMS to a new waypoint, both pilots should confirm the airplane will head where intended before letting it command the turn.

### Interface example 1: Boeing MOD / EXEC loop
- A route change puts "MOD" in the page title, shows an ERASE prompt to discard it, and lights the white EXEC key.
- The proposed route appears as a dashed line on the navigation display; the pilot checks it for unexpected turns, loops or gaps.
- Nothing takes effect until the pilot presses EXEC. ERASE throws the proposed path away.
- Structure: staged plan → visible preview → explicit commit or discard.

### Interface example 2: Warehouse floor projection
- A robotic forklift (Örebro University) projects its intended trajectory onto the shared floor, plus lines marking the space the vehicle will occupy.
- Ratings from 13 test subjects improved clearly when intentions were projected.
- Related work found floor projection encourages people to choose an alternative, safer path.

### Research
- Walker, Hedayati, Lee & Szafir, "Communicating Robot Motion Intent with Augmented Reality," HRI 2018 (Best Paper). Four AR cues for a drone's flight path; NavPoints performed best and was most preferred.
- Chadalavada et al., "That's on my Mind! Robot to Human Intention Communication through on-board Projection on Shared Floor Space," ECMR 2015.

### Relationship to other patterns
Pairs with Appropriate Friction. Intent Preview answers "what is it about to do?"; Friction answers "how hard should it be to say go?" Boeing's EXEC loop does both; cross-link it from both pages.

### Sources
- [AA965 case study, MIT 16.422](https://ocw.mit.edu/courses/16-422-human-supervisory-control-of-automated-systems-spring-2004/f8b84345536213412a8fda2bbf87caa7_aa965_cali.pdf)
- [AA965 findings (FAA)](https://www.faa.gov/sites/faa.gov/files/findings.pdf)
- [Flight Safety Foundation: data entry errors](https://webdeva.flightsafety.org/asw-article/data-entry-errors-can-lead-aircraft-off-course)
- [Flight Safety Foundation, Accident Prevention 1997](https://www.leonardo-in-flight.nl/PDF/ap_jul_aug97%20CFIT%20B757%20Cali%20American%20Airlines.pdf)
- [The Boeing 737 CDU/FMC Explained](https://simtuts.com/guides/boeing-737-cdu-fmc-explained)
- [PMDG 737 FMC direct-to](https://flyawaysimulation.com/ask/answers/pmdg-737-fmc-direct-to-msfs/)
- [Chadalavada thesis, Chalmers 2016](https://publications.lib.chalmers.se/records/fulltext/238513/238513.pdf)
- [Han et al., Projecting Robot Navigation Paths](https://arxiv.org/pdf/2112.05172)
- [Walker et al., HRI 2018](https://researchgate.net/profile/Hooman-Hedayati/publication/323595221_Communicating_Robot_Motion_Intent_with_Augmented_Reality/links/5abbed870f7e9bfc04559830/Communicating-Robot-Motion-Intent-with-Augmented-Reality.pdf)

---

## Capability Disclosure — Ready

**Definition:** Before the human hands over control, the system says what it can and cannot do, and where it is allowed to operate. Ideally it also refuses to engage outside those conditions rather than relying on a warning in the manual.

**Moment:** Before · **Trust job:** Know

**Anti-pattern name:** Fine Print Limits. The boundary exists only in the owner's manual, not in the system's behavior.

### Incident: Tesla Autopilot, Williston, Florida (2016)
- A Model S on Autopilot drove under a tractor-trailer crossing its path. Neither the system nor the driver braked.
- NTSB found the system's operational design permitted the driver's overreliance: it allowed prolonged disengagement and use inconsistent with Tesla's own guidance.
- The driver's pattern of use showed a lack of understanding of the system's limitations.
- Tesla's manual recommended Autopilot only on highways and limited-access roads, but the system did not enforce that.
- NTSB recommended that manufacturers build safeguards limiting automated control to the conditions it was designed for.

### Interface example: GM Super Cruise availability states
- The system only offers hands-free mode once it confirms conditions are right; the icon signals availability before the driver can engage.
- Hands-free is allowed only when the steering-wheel light bar is green.
- The limits are enforced by the system, not just stated.

### Research
- Amershi et al., "Guidelines for Human-AI Interaction," CHI 2019. Guideline 1: make clear what the system can do. Guideline 2: make clear how well it can do it, including how often it may make mistakes.

### Industrial leads checked (2026-11-06)

Three leads were checked against primary sources. Only sources actually opened
and read are recorded here.

**1. Crane rated capacity devices — HOLDS UP, with a twist.** This is the best
industrial candidate, but not for the reason expected. ASME B30.5-2004 draws
the exact line this pattern is about, in its own definitions (p. 21):

- *rated capacity indicator* — "a device that automatically monitors radius,
  load weight, and load rating and warns the crane operator of an overload
  condition."
- *rated capacity (load) limiter* — "a device that automatically monitors
  radius, load weight, and load rating and prevents movements of the crane,
  which would result in an overload condition."

Warns versus prevents, named and separated in a safety standard. That is
Capability Disclosure and its anti-pattern as a definition pair.

The twist: neither standard *requires* the enforcing version. ASME 5-1.9.9.2
says cranes of 3 tons or more "shall have a load indicator, rated capacity
indicator, or rated capacity (load) limiter" — any one of the three satisfies
it. OSHA 29 CFR 1926.1416(e)(4)(i) does the same for cranes over 6,000 lb
manufactured after 29 March 2003: "at least one of the following: load weighing
device, load moment (or rated capacity) indicator, or load moment (or rated
capacity) limiter." So the regulation mandates that the limit be *known*, and
leaves enforcement optional. The only OSHA device described as acting on its
own is the anti two-blocking device, which "automatically prevents damage" —
and that is about the block hitting the boom tip, not rated capacity.

Also useful: OSHA treats these as "operational aids" and allows a crane to keep
working on temporary alternative measures while one is broken — Category II
devices get 30 calendar days to repair, Category I get 7 (§1926.1416(d), (e)).

**2. Forklift capacity data plates — HOLDS UP as the anti-pattern, and is
sharper than expected.** 29 CFR 1910.178 does *not* actually require a capacity
data plate. It requires only that "all nameplates and markings are in place and
are maintained in a legible condition" ((a)(6)), and that plates be changed
after a modification that affects capacity ((a)(4), which also requires the
manufacturer's prior written approval). The capacity duty itself falls on the
human: "Only loads within the rated capacity of the truck shall be handled"
((o)(2)), with "Vehicle capacity" listed as a training topic ((l)(3)(i)(H)).
Nothing in the section requires the truck to prevent an over-capacity lift.

That is Fine Print Limits stated in regulation: the limit is printed on a plate,
the operator is trained on it, and the machine does nothing to hold the line.

**3. ISO 3691-4 driverless trucks — DOES NOT HOLD UP. Do not cite.** The
standard is paywalled and was not read. Searching returned only vendor blogs,
a TUV whitepaper and ISO's own catalogue abstract — nothing that verifies any
requirement about operator-facing displays of operating zones or payload limits.
The abstract does note that the operating zone's condition significantly affects
safe operation, but that is scope language, not a display requirement. This lead
needs the actual standard text before anything from it goes on a page.

### Primary sources pulled (2026-11-06)

NTSB/HAR-17/02 was pulled and read, which closes the "Primary source to pull"
flag above and resolves two previously unsourced details on the pattern page:

- **Footnote 17, p. 23:** "The 10-page-long section in the owner's manual
  concerning driver assistance, which addresses TACC and Autosteer, contains
  16 items designated as warnings and 4 items designated as cautions." The
  ten-page / sixteen / four counts are the report's own.
- **Footnote 61, p. 43:** Autopilot "uses vehicle GPS data, commercially
  available road data, and camera recognition of speed signs to determine the
  type of road and the speed limit of the roadway on which the vehicle travels."
  The car could tell what kind of road it was on.
- **p. 23:** "the firmware's logic did not restrict the system's use based on
  functional road classification; the system had no hard constraint concerning
  road classification."
- **p. 44:** of the 37 minutes on Autopilot, "the system detected his hands on
  the steering wheel for only 25 seconds"; the longest gap was nearly 6 minutes.
- **p. 22:** the set cruise speed was "9 mph over the posted speed limit of
  65 mph" — the 74 mph figure.
- **Conclusion 5 and Recommendation H-17-41:** manufacturers should
  "Incorporate system safeguards that limit the use of automated vehicle control
  systems to those conditions for which they were designed."

### Still open
- An AMR or forklift that declares its operating zone or payload limits on the
  operator's tablet rather than in a commissioning document. Leads 1 and 2 are
  regulation, not interface: neither shows a screen an operator reads. ISO
  3691-4 may still contain one, but the text has to be bought and read first.

### Sources
- [EHS Today on NTSB Williston findings](https://www.ehstoday.com/safety/ntsb-fatal-crash-involving-tesla-autopilot-resulted-driver-errors-overreliance-automation)
- [Aftermarket News: NTSB findings list](https://www.aftermarketnews.com/ntsb-driver-errors-overreliance-automation-lack-safeguards-led-fatal-tesla-crash/)
- [Fortune/Reuters on NTSB hearing](https://fortune.com/2017/09/12/tesla-crash-autopilot-fatality-ntsb)
- [Insurance Journal on operational limitations](https://amp.insurancejournal.com/news/national/2017/09/13/464033.htm)
- [GMC Super Cruise](https://www.gmc.com/supercruise)
- [Microsoft Guidelines for Human-AI Interaction](https://www.microsoft.com/research/blog/guidelines-for-human-ai-interaction-design/)
- Pulled and read 2026-11-06: [NTSB/HAR-17/02 (Williston)](https://www.ntsb.gov/investigations/AccidentReports/Reports/HAR1702.pdf)
- Pulled and read 2026-11-06: [ASME B30.5-2004, Public.Resource.Org copy](https://law.resource.org/pub/us/cfr/ibr/002/asme.b30.5.2004.pdf) — incorporated by reference into 29 CFR 1926.1414 and 1926.1433
- Pulled and read 2026-11-06: [OSHA 29 CFR 1926.1416, Operational aids](https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.1416)
- Pulled and read 2026-11-06: [OSHA 29 CFR 1910.178, Powered industrial trucks](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.178)
- NOT read, do not cite: ISO 3691-4 (paywalled; only vendor summaries were available)

---

## Readiness Check — Ready

**Definition:** Before and during supervised operation, the system confirms the human is actually able to supervise (looking, present, hands available) and escalates when they are not, instead of assuming a human in the seat is a human in the loop.

**Moment:** Before (continues During) · **Trust job:** Intervene

**Anti-pattern name:** Body in the Seat. Presence is treated as attention.

### Incident: Uber ATG, Tempe, Arizona (2018)
- An Uber test vehicle under automated control struck and killed a pedestrian at 39 mph.
- NTSB found the probable cause was the safety operator's failure to monitor the road and the automated system because she was visually distracted by her phone.
- Contributing: ineffective oversight of operators and no adequate mechanism to address automation complacency.
- Uber had cameras watching drivers but did not spot-check that they were paying attention.
- NTSB recommended testing applications require plans to manage operator inattentiveness.

### Interface example: GM Super Cruise Driver Attention System
- An infrared camera on the steering column tracks head position and eye movement.
- Escalation ladder: light bar flashes green → flashes red with chimes and seat vibration → voice prompt to take control.
- If the driver still does not respond, the system slows the vehicle to a stop.

### Research
- Lee & See, "Trust in Automation: Designing for Appropriate Reliance," Human Factors 2004.
- NTSB's own framing after Williston: humans are very poor at monitoring automated systems.

### Open
- Decide whether this belongs in Before, During, or a new "Setup" bucket (see the buckets question).

### Sources
- [The Trucker on NTSB Tempe findings](https://www.thetrucker.com/trucking-news/the-nation/ntsb-calls-for-federal-review-process-for-av-testing-on-public-roads)
- [Eckert Seamans summary of NTSB findings](https://www.eckertseamans.com/?p=17389)
- [Fox Business/AP on NTSB hearing](https://www.foxbusiness.com/technology/safety-agency-says-distracted-driver-caused-fatal-uber-crash)
- [GMC Super Cruise alerts](https://www.gmc.com/supercruise)
- [Seeing Machines on Super Cruise camera](https://internationalfinance.com/company/seeing-machines-technology-enables-gm-super-cruise-driver-assistance-system/)
- Primary source to pull: NTSB report HAR-19/03 (Tempe)
