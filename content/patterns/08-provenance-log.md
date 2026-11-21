---
number: 8
name: "Provenance Log"
intent: "Every action that changes the machine's state is recorded with who or what made it, somewhere nobody can quietly alter or withhold."
# The index card's line (redesign-handoff.md §2). Drafted on the redesign
# canvas, 2026-11-05 — not yet reviewed.
cardIntent: "Every state change is recorded with who or what did it, in a way nobody can quietly alter."

moment: after
trustJobs: [know]
risk: critical
reversibility: irreversible
autonomy: [0, 5]
domains: [driving]

status: draft
updated: "2026-11-09"

steps:
  - title: "Action taken"
    detail: "Operator, remote party or machine"
  - title: "Record the actor"
    detail: "Who or what, and from where"
  - title: "Put it beyond reach"
    detail: "Append-only, outside the actor's control"
    key: true
  - title: "Retain it"
    detail: "Through the life of a dispute"
  - title: "Open it to inspection"
    detail: "A record the operator can read"

antiPattern: "The Unseen Hand"

interface:
  component: "provenance-log"

demoNote: "Simplified illustration."

cautionaryTale:
  title: "A test car's log records what it saw, second by second"
  date: "March 18, 2018"
  place: "Tempe, Arizona"
  story: >-
    Just before 10 p.m., an Uber test SUV driving itself struck and killed a
    woman pushing a bicycle across N. Mill Avenue. Nobody had to argue
    afterwards about what the machine had done, because the machine had
    written it down. At the NTSB's request, Uber's Advanced Technologies
    Group played the data back, and investigators built the timeline from the
    car's own sensor output.
  timeline:
    - at: "−5.6 s"
      label: "First detection"
      detail: "Classified as a vehicle, by radar. 44.1 mph."
    - at: "−5.6 to −1.2 s"
      label: "Classification keeps changing"
      detail: "Vehicle, bicycle, other. Each label comes with a new predicted path."
    - at: "−1.2 s"
      label: "Action suppression begins"
      detail: "Bicycle, by lidar. Stopping now needs more braking than the system is allowed."
    - at: "−0.2 s"
      label: "Suppression ends"
      detail: "One second after it began."
    - at: "0 s"
      label: "Impact"
  kicker: "None of that is testimony. It is a readout."
  sourceId: ntsb-har-19-03

therefore: >-
  Record every change to the machine's state with who or what made it, keep
  the record where no single party can alter or withhold it, and make it
  readable by the people it concerns.

insight: >-
  The data is rarely what's missing. In both the crash and the Horizon case,
  the records existed. What decides whether a log protects people is who can
  reach it, and who can change it.

without:
  steps: ["Change applied", "No trace of who", "The operator carries it"]
  caption: "After the 2019 Key Largo crash, the record existed too: within moments of impact, the car uploaded a collision snapshot to the company that built it. But it sat with that company, out of reach of the people it concerned. For years, the people harmed had only their word, and the system's builder had everything else.[cite:wapo-tesla-data]"

with:
  steps: ["Change applied", "Actor recorded", "Responsibility traceable"]
  caption: "Every state change carries its author and its time."

examples:
  - alt: "Line drawing of the Key Largo data flow: the crash, the car uploading a collision snapshot to Tesla's servers, the server acknowledging it, the car marking its own copy for deletion, and years later a hacker recovering it from a forensic copy of the Autopilot unit."
    placeholder: false
    credit: "The Washington Post"
    url: "https://www.spokesman.com/stories/2025/aug/29/tesla-said-it-didnt-have-key-data-in-a-fatal-crash"
    verdict: without
    domain: driving
    evidence: observed
    caption: "Tesla held the car's collision data on its own servers for years while saying it didn't have it."

# The example is a news story with no figure cleared for reuse yet, so the
# section keeps its DRAFT tag.
drafts:
  examples: true

related:
  - slug: glass-box
    type: complements
    note: "The Glass Box logs the operator's decision and the reasons for it. This pattern covers every other state change, including the ones no operator made."
  - slug: appropriate-friction
    type: complements
    note: "Friction makes a consequential action deliberate. The log is what makes it accountable once it has happened."

openQuestions:
  - "The Horizon remote-access evidence still needs primary sources: the witness statements are on the Inquiry site, and the relevant volumes aren't published yet."
  - "Who is the log for? A record built for a later investigation isn't the same thing as one the operator can check the same day, and it isn't obvious that one log can serve both."

sources:
  - id: wapo-tesla-data
    title: "Tesla said it didn't have key data in a fatal crash. Then a hacker found it"
    author: "Trisha Thadani and Faiz Siddiqui, The Washington Post"
    year: 2025
    url: "https://www.spokesman.com/stories/2025/aug/29/tesla-said-it-didnt-have-key-data-in-a-fatal-crash"
    type: article
    note: "The April 2019 Key Largo crash and the data that went with it, read here as republished by The Spokesman-Review on August 29, 2025. The collision snapshot uploaded automatically to Tesla's servers and acknowledged back to the car; the local copy unlinked and marked for deletion; years in which Tesla said it did not have the data; the recovery in 2024 from a forensic copy of the Autopilot unit by a hacker the plaintiffs enlisted; Tesla's later statement in court that it had the data on its servers all along; and Judge Beth Bloom's order finding insufficient evidence that the failure to produce it was intentional, while requiring Tesla to reimburse the retrieval costs. A news report, not a court record: it does not name the case caption, and the court filings should replace it."
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
  - id: eu-ai-act-art19
    title: "EU AI Act, Article 19 — Automatically generated logs"
    year: 2024
    url: "https://artificialintelligenceact.eu/article/19/"
    type: standard
    note: "Providers of high-risk AI systems must keep the logs their systems generate automatically, to the extent those logs are under their control, for a period appropriate to the system's intended purpose and “of at least six months, unless provided otherwise in the applicable Union or national law”. The recording capability itself is Article 12(1). Not an interface, but the requirement an audit-trail view would be serving. Still the artificialintelligenceact.eu rendering: EUR-Lex refused automated retrieval of the Official Journal text of Regulation (EU) 2024/1689, and the site appears to show a consolidated version, so the exact wording is unconfirmed."
---

## Design considerations

- **Record the actor, not just the change.** Who or what made it, from where, and with which software version.[cite:un-r157]
- **Keep the record out of reach of anyone who can change the state.** A log that one party to a dispute controls isn't evidence of anything.
- **Correct by adding, never by editing.** Entries are append-only; a mistake gets a new entry that says so.
- **Make it readable by the operator, while they still remember.** A log only an investigator reads, years later, protects the institution rather than the operator.
- **Keep it as long as a dispute could last.** Six months is a floor written for high-risk AI systems, not a guide to how long a claim takes.[cite:eu-ai-act-art19]

## In the field

**Observed · Driving.** UN R157 requires automated lane keeping systems to log activation, transition demands, overrides, emergency manoeuvres, collisions, minimum risk manoeuvres and severe failures, each with a timestamp and the software version that produced it.[cite:un-r157]

**Observed · Software.** The Post Office Horizon scandal. The Inquiry's first volume puts the number of people prosecuted and convicted on Horizon evidence at approximately 1,000 across the United Kingdom.[cite:horizon-vol1]

Also on this page: [Uber, Tempe](#tale) (the opening) · Tesla, Key Largo (the anti-pattern)
