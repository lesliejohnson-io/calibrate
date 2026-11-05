---
number: 8
name: "Provenance Log"
intent: "Every action that changed the machine's state is recorded with who or what did it, in a way nobody can quietly alter. After Tempe, investigators rebuilt what the car detected and when from its own data."
# The index card's line (redesign-handoff.md §2). Drafted on the redesign
# canvas, 2026-11-05 — not yet reviewed.
cardIntent: "Every state change is recorded with who or what did it, in a way nobody can quietly alter."

moment: after
trustJobs: [know]
risk: critical
reversibility: irreversible
autonomy: [0, 5]
domains: [automotive]

status: draft
updated: "2026-10-30"

steps:
  - title: "Action taken"
    detail: "Operator, remote party or machine"
  - title: "Record the actor"
    detail: "Who or what, and from where"
    note: "The record has to name the party, not just the event. UN R157 requires each stored entry to carry its reason, the date, a timestamp accurate to within a second, and the software version that was running."
  - title: "Put it beyond reach"
    detail: "Append-only, outside the actor's control"
    key: true
  - title: "Retain it"
    detail: "Through the life of a dispute"
    note: "At Tempe the data was still retrievable after the crash: ATG supplied a playback of sensor and vehicle-dynamics information, and investigators built the event timeline from its output."
  - title: "Open it to inspection"
    detail: "A record the operator can read"

antiPattern: "The Unseen Hand"

without:
  steps: ["Change applied", "No trace of who", "The operator carries it"]
  caption: "The Unseen Hand: the state changes and nothing records which party changed it. When the question is disputed later, the operator has only their word, and whoever built the system has everything else."

with:
  steps: ["Change applied", "Actor recorded", "Responsibility traceable"]
  caption: "Every state change carries its author and its time. At Tempe the ADS data held the detection times, the successive classifications and the suppressed brake command, so the sequence could be established rather than argued."

related:
  - slug: glass-box
    type: complements
    note: "The Glass Box logs the operator's decision and the reasons for it. This pattern covers every other state change, including the ones no operator made."
  - slug: appropriate-friction
    type: complements
    note: "Friction makes a consequential action deliberate. The log is what makes it accountable once it has happened."

sources:
  - id: ntsb-har-19-03
    title: "Collision Between Vehicle Controlled by Developmental Automated Driving System and Pedestrian, Tempe, Arizona"
    author: "National Transportation Safety Board"
    year: 2019
    url: "https://www.ntsb.gov/investigations/accidentreports/reports/har1903.pdf"
    type: incident-report
    note: "Observed. NTSB/HAR-19/03. Section 1.5.6.1 sets out what the ADS data contained: when the system detected the pedestrian, how it classified her and predicted her path, vehicle dynamics, and the planned and executed actions. At the NTSB's request ATG supplied a playback of that data, and investigators built the event timeline from the sensor output. The table of recorded parameters carries the first detection at 5.6 seconds, the successive reclassifications, and the one-second action suppression that held off braking. The pattern working: the machine's own record is what made the sequence establishable afterwards."
  - id: un-r157
    title: "UN Regulation No. 157 — Automated Lane Keeping Systems (ALKS)"
    year: 2021
    url: "https://eur-lex.europa.eu/eli/reg/2021/389/oj/eng"
    type: standard
    note: "Observed. Paragraph 8 requires a Data Storage System for Automated Driving. Paragraph 8.2.1 sets out what has to be recorded: activation, deactivation with its reason, transition demands with their reason, reduction or suppression of driver input, the start and end of emergency manoeuvres, detected collisions, engagement of a minimum risk manoeuvre, and severe ALKS or vehicle failures. Paragraph 8.3 requires each entry to store the reason, the date, a timestamp accurate to within a second, and the software version. The pattern as a type-approval requirement rather than a design choice."
  - id: horizon-vol1
    title: "Post Office Horizon IT Inquiry, Volume 1"
    author: "Sir Wyn Williams"
    year: 2025
    url: "https://www.postofficehorizoninquiry.org.uk/volume-1-post-office-horizon-it-inquirys-final-report"
    type: incident-report
    note: "Observed. HC 1119, presented to Parliament 8 July 2025. At 3.24 the Chair finds it difficult to be precise about how many people were prosecuted and convicted on Horizon evidence, and puts the likely figure at approximately 1,000 across the United Kingdom; 3.25 adds that between 50 and 60 were prosecuted without being convicted. This volume covers human impact and redress only — it does not deal with remote access or the Fujitsu audit findings, which are left to volumes not yet published."
  - id: eu-ai-act-art12
    title: "EU AI Act, Article 12 — Record-keeping"
    year: 2024
    url: "https://artificialintelligenceact.eu/article/12/"
    type: standard
    note: "High-risk AI systems must technically allow the automatic recording of events over the system's lifetime, with logs supporting traceability appropriate to the system's purpose and deployers retaining them for at least six months. Not an interface, but the requirement an audit-trail view would be serving. Still the artificialintelligenceact.eu rendering: EUR-Lex refused automated retrieval of the Official Journal text of Regulation (EU) 2024/1689, so both the article wording and which article the six-month period actually sits in are unconfirmed."
  - id: silicon-canals
    title: "Fujitsu engineers could access and change subpostmasters' accounts remotely"
    url: "https://siliconcanals.com/?p=102909"
    type: article
    note: "Reported that Fujitsu engineers could alter branch data remotely, against the Post Office's position in court that branch accounts could not be changed remotely. Secondary; not found in the Inquiry's published record."
  - id: courier-jenkins
    title: "Gareth Jenkins testimony to the Post Office Horizon IT Inquiry"
    url: "https://thecourier.co.uk/?p=5022953"
    type: article
    note: "A Fujitsu engineer's evidence to the inquiry that he learned only in 2018 that a remote change could be indistinguishable from a subpostmaster's own entry. Secondary; the underlying witness statements and transcripts are on the Inquiry site but were not located."
  - id: ey-2011
    title: "2011 Ernst & Young report on Fujitsu access to subpostmasters' accounts"
    year: 2011
    url: "https://links.hackliberty.org/post/771296"
    type: article
    note: "A 2011 Ernst & Young report warned that Fujitsu staff had unrestricted access to subpostmasters' accounts. A third-party summary; neither the report nor any mention of it was found in the Inquiry's published volume."

review:
  - "Mechanism steps: drafted. The research has a definition and evidence but no mechanism; the step notes are sourced, the titles and details are not."
  - "EU AI Act Article 12: still the artificialintelligenceact.eu rendering. EUR-Lex refuses automated retrieval, so the wording and which article carries the six-month retention are both unconfirmed."
  - "Remote-access, Jenkins and Ernst & Young claims: all still on secondary news sources. Not found in the Inquiry's published volume; the relevant volumes are unpublished."

openQuestions:
  - "The remote-access claims still rest on news reports. Volume 1 of the Inquiry covers human impact and redress; remote access, the Jenkins evidence and the Ernst & Young findings belong to volumes still unpublished. The witness statements are on the Inquiry site and should replace the secondary sources once located."
  - "Who the log is for. A record sized for a later investigation is not the same artifact as one the operator can check the same day, and it is not obvious that one log can serve both."
---

Tempe is this pattern working, and it is worth being exact about why. The system recorded what it detected, how it reclassified the object as the seconds ran down, and the brake command it held back, so the sequence could be established afterwards from the machine's own account of itself rather than from anyone's recollection.[cite:ntsb-har-19-03] The record outlived the event. That is the whole requirement. UN R157 now writes it into type approval for automated lane keeping: a data storage system that has to log activation and deactivation with their reasons, every transition demand, suppressed driver input, emergency manoeuvres, detected collisions, minimum risk manoeuvres and severe failures, each entry stamped with the software version that produced it.[cite:un-r157]

Horizon is the cautionary half, and it fails somewhere more specific than it is usually remembered as failing. The Post Office maintained in court that branch accounts could not be changed remotely.[cite:silicon-canals] Fujitsu engineers could in fact change them, and an engineer's evidence to the inquiry was that such a change need not look any different from the subpostmaster's own entry.[cite:courier-jenkins] None of that is a storage problem; the data was all there. A log the other party to a dispute can write to on the same footing as the operator is not evidence of anything, which is why the useful version of this pattern puts the record outside the reach of everyone who can change the state. The second requirement is easier to miss: the record has to be legible to the person whose work it describes, while they can still remember the day in question. A log that only an investigator reads, years later, protects the institution rather than the operator.
