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
domains: [automotive]

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
    woman pushing a bicycle across N. Mill Avenue. What the machine had done
    was not left to argument afterwards, because the machine had written it
    down: its automated driving system recorded when it detected her, how it
    classified her and what path it predicted each time that changed, the
    vehicle's own dynamics, and the actions it planned and took. At the
    NTSB's request, Uber's Advanced Technologies Group played the data back,
    and investigators built the timeline from the sensor output. First
    detection came 5.6 seconds before impact; the classification alternated
    between vehicle, bicycle and other; and 1.2 seconds out, when stopping
    would have taken more braking than the system was allowed, it began a
    one-second suppression that held braking off. None of that is testimony.
    It is a readout.
  sourceId: ntsb-har-19-03

therefore: >-
  Record every change to the machine's state with who or what made it, keep
  the record where no single party can alter or withhold it, and make it
  readable by the people it concerns.

without:
  steps: ["Change applied", "No trace of who", "The operator carries it"]
  caption: "After the 2019 Key Largo crash the record existed too, and it was the most important evidence in the case: what the car detected, and when. But it sat entirely with the company that built the car, out of reach of the people it concerned. Whatever the reasons, the effect was the same: for years, the people harmed had only their word, and the system's builder had everything else.[cite:wapo-tesla-data]"

with:
  steps: ["Change applied", "Actor recorded", "Responsibility traceable"]
  caption: "Every state change carries its author and its time. At Tempe the ADS data held the detection times, the successive classifications and the suppressed brake command, so the sequence could be established rather than argued."

examples:
  - alt: "Placeholder for a figure from the Key Largo case: the collision snapshot the car uploaded to Tesla's servers, and the acknowledgement sent back to the car."
    credit: "Trisha Thadani and Faiz Siddiqui, The Washington Post, 2025"
    url: "https://www.spokesman.com/stories/2025/aug/29/tesla-said-it-didnt-have-key-data-in-a-fatal-crash"
    verdict: without
    domain: automotive
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

review:
  - "Opening story replaced this pass: Tempe in, Key Largo out. The new tale is verified against NTSB/HAR-19/03. §1.5.6.1: “The ADS data included the time the system detected the pedestrian, how the system classified and assigned predicted paths to the pedestrian, various vehicle dynamics, and the ADS's planned and executed actions. At the request of NTSB investigators, ATG provided a playback of sensor and vehicle dynamics information showing the events leading up to the crash. Investigators examined the output from the sensor systems to create a timeline of the events.” The table of selected ADS parameters carries first detection at −5.6 seconds, “Classification: Vehicle--by radar”, and at −1.2 seconds “Classification: Bicycle--by lidar … situation becomes hazardous (emergency situation) … Action suppression begins”, ending at −0.2 seconds “1 second after it begins”. §1.5.6.1 again: the ADS “changed the pedestrian's classification several times, alternating between vehicle, bicycle, and other”, and at 1.2 seconds “preventing the collision would have required braking beyond the ADS braking design specifications”. The 911 call came in at 10:00 p.m., which is where “just before 10 p.m.” comes from — the report gives no clock time for the impact itself."
  - "Tempe now opens two patterns. It is already the cautionary tale on The Handoff, where it is told as a takeover nobody was asked for; here it is told as a log. The two stories do not overlap in their facts, but a reader going through the library in order meets the same crash twice, and the In the field entry now says so rather than pretending otherwise. Worth deciding whether that is the intent."
  - "Anti-pattern caption changed, not silently. It read “The record existed, and it was the most important evidence in the case…”, where “the case” meant Key Largo because Key Largo was the opening. With Tempe at the top, “the case” would now be read as Tempe — and at Tempe the data was handed over, so the sentence would have become false. It now names the 2019 Key Largo crash and carries the Washington Post citation. Nothing else in it changed."
  - "Left alone and flagged: the `with` caption still opens “At Tempe the ADS data held the detection times, the successive classifications and the suppressed brake command.” Every word of it is accurate, but it now restates the opening story two screens below it. Not changed, because the brief did not ask and the sentence is not wrong — but it is the obvious next cut."
  - "Flagged in another file, not changed: The Handoff's Tempe tale says the SUV was “driving itself at about 40 mph” when it detected her. HAR-19/03 records 44.1 mph at 5.6 seconds and 45 mph on the approach; 39 mph is the speed when the operator took the wheel, 0.02 seconds before impact. The figure is close to the impact speed and wrong for the detection it is attached to. Outside this brief's scope, so it stands."
  - "The Key Largo verification below — the Washington Post quotations, and the corrections to “forensic expert”, “seriously injured”, the 9:14 p.m. time and the Autopilot attribution — now covers the anti-pattern caption, the In the field entry and the example rather than the opening tale. The text itself was moved, not rewritten."
  - "The example carries no figure. The Washington Post story is a news article with nothing cleared for reuse, so the example renders the placeholder box with its alt text, and `drafts.examples` is set — the section keeps its DRAFT tag until a figure or a court exhibit replaces it."
  - "Replace or supplement with court filings from Benavides v. Tesla (S.D. Fla.) when available. The present source is a Washington Post story, and it never names the case caption: it says only “a trial that began last month in Miami federal court”, “the Florida lawsuit” and “U.S. District Judge Beth Bloom”. Miami federal court is consistent with the Southern District of Florida, but the district, the caption and the docket number are all inference from the article rather than statements in it, so none of them appear on the page."
  - "Tale verified against the Washington Post story this pass: “Immediately after the wreck at 9:14 p.m. on April 25, 2019, the crucial data … was automatically uploaded to the company's servers”; the snapshot “internally referred to as a collision snapshot”; “Moments later … the data was just as automatically ‘unlinked’ from the 2019 Tesla Model S at the scene, meaning the local copy was marked for deletion”; “Tesla's headquarters soon sent an automated message back to the car confirming that it had received the collision snapshot”; “a crash that killed 22-year-old Naibel Benavides Leon”; “the company said it didn't have the data”; “Within minutes, he found key data that was marked for deletion — along with confirmation that Tesla had received the collision snapshot”; “Tesla later said in court that it had the data on its own servers all along”; and Judge Beth Bloom “said in an order that she did not find ‘sufficient evidence’ that Tesla's failure to initially produce the data was intentional.”"
  - "Tale corrected: not a forensic expert, and not the car's own hardware. The draft read “a forensic expert hired by the victims' lawyers recovered it from the car's own hardware.” The article describes “a self-described hacker, enlisted by the plaintiffs to decode the contents of a chip they recovered from the vehicle”, working from “a flash drive containing a forensic copy of the Autopilot unit's contents” under terms agreed with Tesla, and says he “did not testify”. The forensic engineer who did testify, Alan Moore, is a different person and did not recover the data. Rewritten as a hacker working from a forensic copy."
  - "Tale corrected: “seriously injured” understates the article, which says Angulo was “catastrophically injured”. Changed to the article's word. “A little after 9 p.m.” is likewise replaced with the article's own 9:14 p.m."
  - "Tale narrowed: the article does not flatly state the car was on Autopilot. It says the driver, George McGee, “said he was using Autopilot”, so the page attributes it to him rather than asserting it."
  - "EU AI Act citation corrected: the six-month retention is Article 19(1), not Article 12. Article 12(1) is the requirement that high-risk systems “technically allow for the automatic recording of events (logs) over the lifetime of the system”; the retention duty sits with providers in Article 19(1), “of at least six months, unless provided otherwise in the applicable Union or national law”. Still the artificialintelligenceact.eu rendering rather than the Official Journal text, and the site appears to show a consolidated version, so the wording wants checking against EUR-Lex or the European Commission's AI Act Service Desk."
  - "Horizon claims cut back to the Inquiry's own evidence. The remote-access, Gareth Jenkins and Ernst & Young claims and their three news sources are removed: none of them was found in the Inquiry's published record, and the volumes that would carry them are unpublished. What is left is Volume 1's own figure, approximately 1,000 people prosecuted and convicted."
  - "Mechanism steps: drafted. The research has a definition and evidence but no mechanism; the step notes are sourced, the titles and details are not."
  - "Demo invents its panel. Nothing in it is a reading from the sources, which describe a Tesla, a Tempe crash and a UK accounting system rather than a warehouse: the robot, the speeds, the 09:14–09:21 clock and the sw 4.21.3 version string are written for this page. What is taken from the sources is the shape of the entry — actor, timestamp and software version, which is what UN R157 paragraph 8.3 requires — and the property that makes it worth keeping, that the party to a dispute cannot revise it."

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

**Observed · Automotive.** [Uber, Tempe](#tale): investigators rebuilt what the car detected and when from its own data — the first detection at 5.6 seconds, the successive reclassifications, and the one-second action suppression that held off braking.[cite:ntsb-har-19-03] The same crash opens [The Handoff](/patterns/handoff), read there for the takeover that was never asked for.

**Observed · Automotive.** Tesla, Key Largo. The collision snapshot was uploaded, acknowledged and marked for deletion in the car within moments, and then sat with the company that built the car for years.[cite:wapo-tesla-data]

**Observed · Automotive.** UN R157 requires automated lane keeping systems to log activation, transition demands, overrides, emergency manoeuvres, collisions, minimum risk manoeuvres and severe failures, each with a timestamp and the software version that produced it.[cite:un-r157]

**Observed · Software.** The Post Office Horizon scandal. The Inquiry's first volume puts the number of people prosecuted and convicted on Horizon evidence at approximately 1,000 across the United Kingdom.[cite:horizon-vol1]

## Notes

The data is rarely what's missing. In both the crash and the Horizon case, the records existed. What decides whether a log protects people is who can reach it, and who can change it.
