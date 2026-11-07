---
number: 2
name: "The Glass Box"
intent: "The machine shows the reasons behind its decision, not just the decision, so the operator can check it, trust it or override it."
# The index card's line (redesign-handoff.md §2). Drafted on the redesign
# canvas, 2026-11-05 — not yet reviewed.
cardIntent: "The machine shows its reasoning, not just its output, so operators can trust or override it with context."

moment: during
trustJobs: [know, calibrate]
risk: elevated
reversibility: costly
autonomy: [2, 4]
domains: [defense, industrial, surgical, maritime]

status: draft
updated: "2026-11-07"

steps:
  - title: "Inputs"
    detail: "Sensors, history, thresholds"
  - title: "Inference"
    detail: "Model weighs the evidence"
  - title: "Recommend + why"
    detail: '"X, because of A, B and C"'
    note: "Surface the drivers: sensor confidence, historical match, and which threshold was breached."
    key: true
  - title: "Operator judges"
    detail: "Agree, question or override"
  - title: "Decision logged"
    detail: "With the reasons behind it"
    note: "Overrides feed back, so disagreement becomes signal instead of noise."

antiPattern: "Verdict Without Reasons"

interface:
  component: glass-box

# The demo is a warehouse forklift, not a Patriot battery: invented readouts
# standing in for a real incident, so it says so.
demoNote: "Simplified illustration."

cautionaryTale:
  title: "Patriot missile battery"
  date: "March 22, 2003"
  place: "Iraq–Kuwait border"
  story: >-
    A British Tornado was flying back to base after a mission over Iraq when a
    US Patriot missile battery's computer classified it as an incoming
    anti-radiation missile, a weapon that homes in on radar. The aircraft's
    identification system wasn't working, and the criteria programmed into the
    Patriot for that kind of missile were broad enough to include it. The
    battery's crew, following their rules of engagement for self-defense,
    fired. Both men on board the Tornado were killed.
  sourceId: [mod-zg710, hansard-zg710]

therefore: >-
  Show the few reasons behind each recommendation, in terms the operator can
  check against what they can see, and record what they override.

without:
  steps: ["Black-box model", "Verdict only", "Blind accept or ignore"]
  caption: |
    The system gave the battery's crew an answer, anti-radiation missile, but
    not the evidence behind it. They couldn't see that the classification
    rested on criteria a friendly aircraft with a broken transponder could
    meet.[cite:mod-zg710][cite:hansard-zg710] An answer without reasons leaves
    only two choices, trust it completely or ignore it, and under time
    pressure people trust it.

with:
  steps: ["Model + evidence", "“X, because…”", "Informed decision"]
  caption: "Operators check the reasoning against what they see, and override when the machine is missing something."

related:
  - slug: learning-loop
    type: complements
    note: "The reasons are what make an override meaningful. Recording which reason the operator disagreed with is what turns repeated disagreement into a signal the model is wrong."

review:
  - "Tale, the place does not match either source. The heading says “Iraq–Kuwait border”; the MoD summary gives “LOCATION: Kuwait” and has ZG710 “returning to Ali Al Salem Air Base in Kuwait”, struck at 17,938 ft as it began its descent. Hansard says only that it was shot down during Operation TELIC. Neither document puts the engagement on the border. “Kuwait” is what both support. Text left as supplied."
  - "Tale, “both men” is not in either source. The MoD summary says “CREW: Two – pilot and navigator”, “Two fatalities” and “Both members of the crew were killed instantly”; it does not give the crew's sex. “Both crew” would be carried by the source as written. Text left as supplied."
  - "Tale, a date that is right but worth knowing about. The MoD gives the accident as 22 March 2003 at 2348 hrs — “0248 hrs on 23 Mar 03 local time”. The heading date matches the official date; locally it was already the 23rd."
  - "Anti-pattern, one sentence that is the pattern's reading rather than a finding. “The system gave the battery's crew an answer… but not the evidence behind it” is not stated anywhere in the Board's findings, which do not describe what the Patriot console displayed. What the sources do support is everything the sentence rests on: the broad criteria, the absent IFF response, the one-minute decision, and crews “trained to react quickly, engage early and to trust the Patriot system”. Flagged because the page presents it as what happened. Text left as supplied."
  - "Design considerations, one citation deliberately omitted. “Dumping everything into the interface produces the same rubber-stamping as showing nothing” still has no source behind it — the brief asked for Chen et al. 2014 only if it supports the claim, and it could not be checked this pass (see below), so no citation was attached. This repeats the flag the page already carried."
  - "Chen 2014 and Boyce 2015 could not be re-verified this pass. Both are hosted on apps.dtic.mil, which returns HTTP 403 to automated requests; getting around that would have meant impersonating a browser, which was not done. The confidence consideration is cited to Chen on the strength of this file's own existing source note — “level 3 is what it projects will happen and how uncertain it is” — which matches independent secondary descriptions of the SAT model, but neither paper was read directly. Confirm against the PDFs before this leaves draft."
  - "Mechanism step 03 now uses straight quotes — '\"X, because of A, B and C\"' — per the brief. The neighbouring `with.steps` entry still uses curly quotes (“X, because…”), as does the rest of the content corpus, so the two now differ. Say which you want and both can match."
  - "Demo invents its data. The pattern's sources describe a Patriot battery; the forklift, aisle 7, the two sensors and the 40 seconds are written for this page. What is taken from the sources is the shape of the failure — a confident classification whose basis the operator cannot inspect."

openQuestions:
  - "How much reasoning fits into seconds? The Patriot crew had very little time; a glass box that needs reading may not help when the decision has to be instant."
  - "Can explanations make over-trust worse? A plausible-sounding reason can make people agree faster, not check harder. The research on this is mixed."

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
    note: "The problem is not automation itself but inadequate feedback to the operators supervising it."
  - id: mod-zg710
    title: "Military Aircraft Accident Summary: Royal Air Force Tornado GR Mk4A ZG710"
    author: "UK Ministry of Defence, Directorate of Air Staff"
    year: 2004
    url: "https://assets.publishing.service.gov.uk/media/5a78e39b40f0b62b22cbd9a5/maas03_02_tornado_zg710_22mar03.pdf"
    type: incident-report
    note: "Observed. The RAF Board of Inquiry summary. The source for the broad classification criteria — “based on the many different Anti-Radiation Missiles available worldwide, and were therefore very broad” — the absent IFF response, the self-defence Rules of Engagement, and the finding that the crew “had about one minute to decide whether to engage” and that “if the crew had delayed firing, ZG710 would probably have been reclassified as its flight path changed”."
  - id: hansard-zg710
    title: "Tornado GR4A ZG710 (Accident Summary) — written statement, 14 May 2004"
    author: "Ivor Caplin, Parliamentary Under-Secretary of State for Defence"
    year: 2004
    url: "https://api.parliament.uk/historic-hansard/written-statements/2004/may/14/tornado-gr4a-zg710-accident-summary"
    type: incident-report
    note: "The statement to the Commons presenting the Board's findings: the Patriot battery “in following its self-defence rules of engagement, misidentified Tornado ZG710 as a hostile anti-radiation missile and engaged it”, with contributory factors including the IFF failure and rules of engagement “not sufficiently robust to prevent a friendly aircraft without a functioning IFF system being classified as an anti-radiation missile”."
---

## Design considerations

- **Give a few reasons, not the whole model.** Dumping everything into the interface produces the same rubber-stamping as showing nothing, so the reasons have to be few and specific to the decision in front of the operator.
- **Make every reason checkable.** Each one should be something the operator can compare with what they can see or know. A blocked camera means something to a person standing in the aisle; a confidence score on its own does not.
- **Show how sure the machine is about each reason.** A confident answer resting on one weak input should look different from one resting on several strong ones — the projection level of the transparency model is where that uncertainty belongs.[cite:chen-2014]
- **Say what else the evidence fits.** "No identification reply" also fits a friendly aircraft with a broken transponder, which is what it was.[cite:mod-zg710] Naming the alternative is often the most useful reason of all.
- **Record what operators override.** Repeated disagreement in the same situation is the clearest sign the model is wrong, which is what [Learning Loop](/patterns/learning-loop) does with it.

## In the field

**Observed · Defense.** [The Patriot battery and Tornado ZG710](#tale): the classification criteria were "very broad", the aircraft's IFF did not reply, and the crew had about a minute to decide. The Board found that with a wider picture of the airspace they "would then have been more likely to identify ZG710 as a friendly track, albeit one without a working IFF" — the reasons existed, but not where the crew could reach them.[cite:mod-zg710]

## Notes

An explanation only helps if the operator can check it against something they can see for themselves.
