---
number: 9
name: "Learning Loop"
intent: "What operators notice in the field — oddities, near-misses, workarounds — is easy to report, reaches the people who can change the machine, and visibly leads to changes. This is how After feeds back into Before."
# The index card's line (redesign-handoff.md §2). Drafted on the redesign
# canvas, 2026-11-05 — not yet reviewed.
cardIntent: "What operators notice in the field reaches the people who can change the machine, and visibly does."

moment: after
trustJobs: [recover]
risk: critical
reversibility: irreversible
autonomy: [1, 4]
domains: [aviation]

status: draft
updated: "2026-10-30"

steps:
  - title: "Operator notices"
    detail: "An oddity, a near-miss, a workaround"
  - title: "Reporting is easy"
    detail: "Low effort, and no blame attached"
  - title: "It reaches who can change it"
    detail: "Engineering and training, not just the file"
    key: true
  - title: "Something changes"
    detail: "The machine, the procedure or the training"
  - title: "The loop closes visibly"
    detail: "Reporters can see what their report changed"

antiPattern: "Reported and Forgotten"

interface:
  component: learning-loop

# The demo invents its bridge: the sailing counter, the status track and the
# three-sailing count are written for this page.
# VERIFY: the demo asserts two things about the real ship, and both come from
# the Sheen Report rather than from this page - that masters had asked for
# bridge door indicator lights and been refused, and that the bridge had no
# indicator to tell the captain whether the doors were shut. Check both, and
# check that "3 other masters reported this" is not a figure the report
# contradicts; it is written here as a plausible number, not a finding.
demoNote: "Simplified illustration."

# VERIFY against the Sheen Report (Department of Transport, Court No. 8074)
# before this leaves draft: the departure time ("just after 6 p.m.") and that
# she sailed from the inner harbour at Zeebrugge; that the assistant bosun
# responsible for closing the doors was asleep in his cabin; that the bow
# doors were not visible from the wheelhouse and that there was no indicator
# there; the time from departure to capsize ("within minutes") and the
# distance from the harbour ("less than a mile"); the death toll of 193; that
# ships in the fleet had sailed with doors open before; the 1985 request from
# a captain for bridge indicator lights and how the company answered it; and
# when bridge indicator lights became a legal requirement, which the text
# places after the disaster without giving a date or an instrument. No
# individual is named here and none should be added.
cautionaryTale:
  title: "Herald of Free Enterprise"
  date: "March 6, 1987"
  place: "Zeebrugge, Belgium"
  story: >-
    Just after 6 p.m., the roll-on/roll-off ferry left the inner harbor at
    Zeebrugge with her bow doors open. The crewman responsible for closing
    them was asleep in his cabin, and from the wheelhouse the captain couldn't
    see the doors and had no indicator to tell him. Water flooded the car deck
    and the ship capsized within minutes, less than a mile outside the
    harbor. 193 people died. The company had been told. Its ferries had sailed
    with doors open before, and in 1985 a captain asked for indicator lights
    on the bridge. The request was dismissed. After the disaster, indicator
    lights on the bridge became a legal requirement.
  sourceId: sheen-report

# Which of the sections above the fold are freshly written and unchecked.
# This page had no opening, no solution sentence, no considerations and no
# demo before this pass, so everything except the mechanism is new.
drafts:
  tale: true
  antiPattern: true
  demo: true
  considerations: true
  examples: true

therefore: >-
  Make reporting cheaper than staying silent, route every report to someone
  who can change the machine, the procedure or the training, and show the
  reporter what changed.

without:
  steps: ["Crew learns something", "It goes in a log", "Next crew starts blind"]
  # VERIFY against the Sheen Report: that masters across the fleet knew ships
  # had sailed with their doors open; that the 1985 request was made in
  # writing and proposed indicator lights as the fix; that it reached
  # management; and that nobody who could have fitted them acted on it. "And
  # nobody who reported it heard back" is the sharpest claim here and the one
  # least likely to be stated outright in the report - check it before the
  # DRAFT tag comes off.
  caption: >-
    Masters across the fleet knew ships had sailed with their doors open, and
    one put it in writing with a fix attached. The memo reached management and
    stopped there. Nobody who could change the ships acted on it, and nobody
    who reported it heard back.

with:
  steps: ["Crew reports", "It reaches the engineers", "The machine or procedure changes"]
  caption: "The loop closes where the reporter can see it."

related:
  - slug: provenance-log
    type: complements
    note: "The log is the record of what the machine did; the loop is what carries what the operator noticed. Neither substitutes for the other, and an investigation usually needs both."
  - slug: glass-box
    type: complements
    note: "Logged overrides are the richest input this loop has: repeated disagreement in the same situation is the clearest sign the machine is wrong."

sources:
  - id: sheen-report
    title: "mv Herald of Free Enterprise: Report of Court No. 8074, Formal Investigation (the Sheen Report)"
    author: "Department of Transport"
    year: 1987
    url: "https://assets.publishing.service.gov.uk/media/54c1704ce5274a15b6000025/FormalInvestigation_HeraldofFreeEnterprise-MSA1894.pdf"
    type: incident-report
    note: "Observed, and the source for the opening story and the anti-pattern. Not yet read against this page: both are drafted from the rewrite brief, and the VERIFY comments in this frontmatter list what to check. The reason this incident opens the pattern is that the loop failed at its middle rather than at its intake - the report was filed, in writing, with the fix named in it."
  - id: bea-af447
    title: "BEA Final Report — Air France Flight AF447, Rio de Janeiro to Paris"
    year: 2012
    url: "https://www.faa.gov/sites/faa.gov/files/f-cp090601.en_.pdf"
    type: incident-report
    note: "Observed. Section 1.17.1.5.3.1 records nine incidents in the Air France A330/A340 fleet's air safety reports associated with unreliable indicated airspeeds between May 2008 and March 2009, all in cruise between FL310 and FL380, seven of which mentioned stall-warning activation. A note adds that after the accident Air France analysed recorded flight parameters and identified six further incidents that had never been raised in a report at all, whose maintenance write-ups described the characteristic symptoms only partially or not at all. Section 2.4 concludes that feedback from in-service events made it impossible to analyse the repeated failure to apply the unreliable-airspeed procedure in advance, and the causal factors name the feedback mechanisms that made it impossible to identify that repeated non-application and remedy it."
  - id: asrs-briefing
    title: "ASRS Program Briefing"
    author: "NASA Aviation Safety Reporting System"
    url: "https://asrs.arc.nasa.gov/docs/ASRS_ProgramBriefing.pdf"
    type: talk
    note: "Observed. NASA and the FAA established the ASRS in 1975 and report intake began in 1976: voluntary, confidential and non-punitive, held by NASA rather than the authority that enforces. Intake runs at about 2,329 reports a week on data through December 2025. Reports come back out as safety alerts and CALLBACK, published monthly since 1979 — the visible far end of the loop, and the reason pilots keep filing."
  - id: amershi-2019
    title: "Guidelines for Human-AI Interaction"
    author: "Saleema Amershi et al."
    year: 2019
    url: "https://www.microsoft.com/research/blog/guidelines-for-human-ai-interaction-design/"
    type: paper
    note: "CHI 2019. Guideline 15 is to encourage granular feedback during regular interaction — the intake half of this pattern, stated for software."

review:
  - "Opening story added this pass, along with everything else this page was missing: a solution sentence, design considerations and a demo. Nothing in the tale, the anti-pattern, the considerations or the demo has been read against the Sheen Report - all of it is drafted from the brief, all of it carries `drafts:` flags, and the VERIFY comments in this frontmatter list what to check."
  - "JT610 is gone from this page, and so are the two secondary sources that carried it (Leeham and AIN). Nothing on the page cited AIN at all; Leeham was cited by the old anti-pattern caption and by the first body paragraph, both of which have been rewritten. The maintenance-log point JT610 was making here is still made on Explainable Fault, where JT610 is now an In the field entry."
  - "In the field is written in a different format from the other fourteen patterns. Every other page uses `**Observed · Domain.**`, the evidence-and-domain pair; the brief for this page asked for `■ Without it` / `● Applies the pattern`, the verdict shapes from `VERDICTS` in the schema. The verdict format says something the other one does not - whether the example is the pattern working or the cost of its absence - but the library now spells the same section two ways. Pick one and convert the rest."
  - "Design considerations are drafted and uncited. All five are written as instructions from the brief; the ASRS briefing supports the first and the last (confidential, non-punitive intake; CALLBACK as the visible far end), and nothing on the page supports “count repeats, not just reports” or “treat workarounds as reports”, which are the two that most want a source."
  - "Mechanism steps: drafted. The research has definition, incidents and an interface example but no mechanism; the two step notes are sourced, the titles and details are not."
  - "The brief asked for a closing line under the demo — “An indicator light was never the hard part. The hard part was getting the request to someone who could install one, and showing the masters it had happened.” There is no slot for prose between the demo and the mechanism: the page component goes demo, mechanism, then the body sections. The line is the last paragraph of Notes instead, which renders in the Sources section at the foot of the page. Add a post-demo field to the schema if that line is meant to sit where the brief put it."

openQuestions:
  - "The research files this as After → Before, which is the whole point of it, but a pattern carries exactly one moment in this library. It sits under After and over time, and the Before half shows up only in the prose."
  - "What closing the loop visibly actually takes. The ASRS publishes back to the whole profession rather than to the individual reporter, which may be why it works — but it is not obvious that per-reporter feedback would scale, or that it is what reporters want."
---

## Design considerations

- **Make reporting cost less than silence.** One step, from where the work happens, with no blame.[cite:asrs-briefing]
- **Route to someone who can change it.** A report that only reaches a file is a record, not a loop.
- **Count repeats, not just reports.** Group similar reports so a pattern shows up as one.
- **Close the loop visibly.** Show reporters what changed, or why nothing did. People stop reporting when reports vanish.[cite:asrs-briefing]
- **Treat workarounds as reports.** A workaround means the design failed quietly.

## In the field

<!-- VERIFY: the Herald entry is this page's opening story in one line. The
     claim to check against the Sheen Report is the one the tale and the
     anti-pattern both rest on - that indicator lights were asked for before
     the capsizing and the request was refused. -->
**■ Without it · Maritime:** [Herald of Free Enterprise](#tale) (1987). Requests for bridge door indicators were dismissed before the capsizing.[cite:sheen-report]

<!-- VERIFY: already verified against the BEA final report in the
     `bea-af447` source note below - nine unreliable-airspeed reports in the
     fleet between May 2008 and March 2009, six further events found only
     afterwards, and section 2.4 on feedback making the repeated
     non-application of the procedure impossible to identify in advance.
     Nothing new to check here. -->
**■ Without it · Aviation:** Air France 447. Repeated unreliable-airspeed events were reported, but the feedback never reached training.[cite:bea-af447] It is the opening story on [Graceful Degradation](/patterns/graceful-degradation).

<!-- VERIFY against the ASRS program briefing: that intake is voluntary,
     confidential and non-punitive and is held by NASA rather than the FAA;
     that reports are analysed rather than only filed; and that CALLBACK is
     the monthly publication that carries findings back to pilots. -->
**● Applies the pattern · Aviation:** NASA ASRS. Confidential, non-punitive reporting, analyzed and published back to pilots through CALLBACK.[cite:asrs-briefing]

## Notes

The hard part is not intake, it is the two ends. At the front, reporting has to cost less than silence, which is why the ASRS is confidential, non-punitive and sits with NASA rather than with the authority that could act on what it reads.[cite:asrs-briefing] At the back, something has to visibly change, and the people filing reports have to be able to see that it did. A loop whose far end is invisible is indistinguishable from a suggestion box, and it gets used like one.

Air France's A330/A340 fleet filed nine unreliable-airspeed reports between May 2008 and March 2009, and after AF447 the airline went back through recorded flight parameters and found six more incidents that had never been reported at all.[cite:bea-af447] The BEA's causal factors name the feedback mechanisms directly: they made it impossible to identify that crews were repeatedly not applying the procedure, and to remedy it.[cite:bea-af447]

An indicator light was never the hard part. The hard part was getting the request to someone who could install one, and showing the masters it had happened.
