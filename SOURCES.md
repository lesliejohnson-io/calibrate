# Calibrate — Sources

Paste each block into the matching pattern file's frontmatter, replacing `sources: []`.
Each `# comment` line explains what the source contributes to the pattern. YAML ignores comments, so you can keep them as notes for yourself.

Types follow the spec: `paper | standard | incident-report | article | talk`.
Incident reports are also strong **Observed** examples for the "In the field" section.

> Before publishing, read at least the abstract and the relevant section of each source. These were selected by topic fit and checked to exist; their specific claims have not been verified for you. Some links go to paywalled publisher pages. Where an open PDF exists, that's the link used.

---

## 01 — The Handoff

```yaml
sources:
  # Foundational: automation leaves humans with the hardest job (taking over in abnormal conditions) while eroding the skills and context needed to do it.
  - title: "Ironies of Automation (Bainbridge, 1983, Automatica 19(6))"
    url: https://en.wikipedia.org/wiki/Ironies_of_Automation
    type: paper
  # Empirical basis for "time to orient": shorter takeover windows produce faster but worse decisions.
  - title: "\"Take over!\" How long does it take to get the driver back into the loop? (Gold, Damböck, Lorenz & Bengler, 2013, HFES)"
    url: https://mediatum.ub.tum.de/doc/1308108/file.pdf
    type: paper
  # Non-critical takeovers vary widely (roughly 2–26 s); designing planned handoffs from emergency-takeover data is a mistake.
  - title: "Takeover Time in Highly Automated Vehicles: Noncritical Transitions to and From Manual Control (Eriksson & Stanton, 2017, Human Factors 59(4))"
    url: https://www.newswise.com/articles/over-to-you-automation
    type: paper
  # Regulatory vocabulary: "transition demand", "transition phase", planned vs unplanned events. Requires non-driving displays to suspend when a handoff starts.
  - title: "UN Regulation No. 157 — Automated Lane Keeping Systems (ALKS)"
    url: https://eur-lex.europa.eu/eli/reg/2021/389/oj/eng
    type: standard
  # Defines "request to intervene" and the fallback-ready user role at Level 3.
  - title: "SAE J3016 (2021) — Taxonomy and Definitions for Terms Related to Driving Automation Systems"
    url: https://saemobilus.sae.org/content/j3016_202104
    type: standard
  # Observed: the failure case the pattern exists to prevent. The system did not alert the safety operator, and the operator was not monitoring.
  - title: "NTSB HAR-19/03 — Collision Between Vehicle Controlled by Developmental ADS and Pedestrian, Tempe, AZ (2019)"
    url: https://ntsb.gov/investigations/accidentreports/reports/har1903.pdf
    type: incident-report
  # Observed: sudden autopilot disconnection, startle, crew takes over cold. This is the "Without" column in real life.
  - title: "BEA Final Report — Air France Flight AF447, Rio de Janeiro–Paris (2012)"
    url: https://www.faa.gov/sites/faa.gov/files/f-cp090601.en_.pdf
    type: incident-report
```

## 02 — The Glass Box

```yaml
sources:
  # Core framework: three levels of transparency. L1 = what it's doing and its plan; L2 = why; L3 = what it projects will happen and how uncertain it is.
  - title: "Situation Awareness–Based Agent Transparency (Chen et al., 2014, ARL-TR-6905)"
    url: https://apps.dtic.mil/sti/pdfs/ADA600351.pdf
    type: paper
  # Applied study: transparency displays for an autonomous robot teammate; effects on trust and situation awareness.
  - title: "Agent Transparency for an Autonomous Squad Member (Boyce, Chen, Selkowitz & Lakhmani, 2015, ARL-TR-7298)"
    url: https://apps.dtic.mil/sti/tr/pdf/ADA616862.pdf
    type: paper
  # Why showing reasoning matters: trust should be calibrated to capability. The purpose / process / performance dimensions map directly to what a glass box exposes.
  - title: "Trust in Automation: Designing for Appropriate Reliance (Lee & See, 2004, Human Factors 46(1))"
    url: https://journals.sagepub.com/doi/10.1518/hfes.46.1.50_30392
    type: paper
  # The problem is not automation itself but inadequate feedback and interaction with the people supervising it.
  - title: "The \"Problem\" of Automation: Inappropriate Feedback and Interaction, Not \"Over-Automation\" (Norman, 1990)"
    url: https://ntrs.nasa.gov/api/citations/19900004678/downloads/19900004678.pdf
    type: paper
```

## 03 — Graceful Degradation

```yaml
sources:
  # Defines "minimal risk condition" and "DDT fallback": the formal name for a defined fallback state.
  - title: "SAE J3016 (2021) — Taxonomy and Definitions for Terms Related to Driving Automation Systems"
    url: https://saemobilus.sae.org/content/j3016_202104
    type: standard
  # Defines the Minimum Risk Manoeuvre: what the system does when the human doesn't respond, or when a severe failure occurs. A worked regulatory example of stepping down.
  - title: "UN Regulation No. 157 — Automated Lane Keeping Systems (ALKS)"
    url: https://eur-lex.europa.eu/eli/reg/2021/389/oj/eng
    type: standard
  # Automation sits at an intermediate level of intelligence and fails precisely when the situation exceeds it. Degradation has to be designed in.
  - title: "The \"Problem\" of Automation: Inappropriate Feedback and Interaction, Not \"Over-Automation\" (Norman, 1990)"
    url: https://ntrs.nasa.gov/api/citations/19900004678/downloads/19900004678.pdf
    type: paper
  # Observed: the system dropped to a degraded control mode after unreliable airspeed, and the crew didn't grasp the new state. "Says so" failed.
  - title: "BEA Final Report — Air France Flight AF447, Rio de Janeiro–Paris (2012)"
    url: https://www.faa.gov/sites/faa.gov/files/f-cp090601.en_.pdf
    type: incident-report
```

## 04 — Appropriate Friction

```yaml
sources:
  # The HCI case for intentional friction (microboundaries) that interrupts mindless interaction, including for error reduction.
  - title: "Design Frictions for Mindful Interactions: The Case for Microboundaries (Cox et al., 2016, CHI EA)"
    url: https://discovery.ucl.ac.uk/id/eprint/1475258/
    type: paper
  # Levels of automation include a "veto window" level. Gives friction a place on a formal scale and ties it to the cost of an action's outcome.
  - title: "A Model for Types and Levels of Human Interaction with Automation (Parasuraman, Sheridan & Wickens, 2000, IEEE SMC-A 30(3))"
    url: https://doi.org/10.1109/3468.844354
    type: paper
  # Misuse = overreliance and complacency. Friction is a countermeasure for automation bias at high-stakes moments.
  - title: "Humans and Automation: Use, Misuse, Disuse, Abuse (Parasuraman & Riley, 1997, Human Factors 39(2))"
    url: https://doi.org/10.1518/001872097778543886
    type: paper
  # Observed: hardware interlocks were removed in favor of software, and operators could rapidly edit and proceed past error messages. The cost of missing friction.
  - title: "An Investigation of the Therac-25 Accidents (Leveson & Turner, 1993, IEEE Computer 26(7))"
    url: https://classes.cs.uchicago.edu/archive/2022/spring/33100-1/papers/therac25.pdf
    type: incident-report
```

## 05 — Shared Mental Model

```yaml
sources:
  # Mode error and automation surprises: when the operator's model of the system's mode diverges from its actual mode.
  - title: "How in the World Did We Ever Get into That Mode? Mode Error and Awareness in Supervisory Control (Sarter & Woods, 1995, Human Factors 37(1))"
    url: https://trid.trb.org/View/426376
    type: paper
  # Ten challenges, including mutual predictability, common ground, making current state obvious, and communicating status and intention. Close to a spec for this pattern.
  - title: "Ten Challenges for Making Automation a \"Team Player\" in Joint Human-Agent Activity (Klein, Woods, Bradshaw, Hoffman & Feltovich, 2004, IEEE Intelligent Systems 19(6))"
    url: https://doi.org/10.1109/MIS.2004.74
    type: paper
  # Situation awareness levels (perception, comprehension, projection). The vocabulary for what "in sync" means.
  - title: "Toward a Theory of Situation Awareness in Dynamic Systems (Endsley, 1995, Human Factors 37(1))"
    url: https://doi.org/10.1518/001872095779049543
    type: paper
  # Origin of "shared mental model" in team research: compatible models enable implicit coordination. Book chapter; no open link.
  - title: "Shared Mental Models in Expert Team Decision Making (Cannon-Bowers, Salas & Converse, 1993)"
    url: https://www.proquest.com/docview/38428594
    type: paper
```

---

## Notes for the library

- **Cross-pattern sources.** SAE J3016, UN R157, Norman 1990 and AF447 each support two patterns. That overlap is useful evidence for your Related patterns section: the Handoff and Graceful Degradation share regulatory roots, because a Minimum Risk Manoeuvre is what happens when a Handoff gets no response.
- **Eriksson & Stanton link.** It currently points to the HFES press release. Swap it for the journal DOI once you've pulled the paper.
- **Read first for learning:** Bainbridge (5 pages) and Klein et al. (5 pages). Both are short, and between them they cover the theory behind all five patterns.