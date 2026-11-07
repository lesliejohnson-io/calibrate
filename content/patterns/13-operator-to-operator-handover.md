---
number: 13
name: "Operator-to-Operator Handover"
intent: "When responsibility passes between operators, the system carries the machine's true state across, including unfinished work and anything switched off."
# The index card's line (redesign-handoff.md §2). Drafted on the redesign
# canvas, 2026-11-05 — not yet reviewed.
cardIntent: "When responsibility passes between operators, the system carries its true state across."

moment: transition
trustJobs: [know]
risk: critical
reversibility: irreversible
autonomy: [1, 4]
domains: [industrial, medical]

status: draft
updated: "2026-11-07"

steps:
  - title: "Shift ends"
    detail: "Responsibility is about to move"
  - title: "Machine states its own condition"
    detail: "Mode, work in progress, what is disabled"
  - title: "Structured, not freeform"
    detail: "The same fields every time"
  - title: "Receiver restates it"
    detail: "In their own words, back to the sender"
    key: true
  - title: "Responsibility moves"
    detail: "Recorded, with both parties named"

antiPattern: "Lost at Shift Change"

interface:
  component: shift-handover

# The demo is an invented two-pump console, not the Piper Alpha control
# room: the fields, the wording and the equipment list are written for this
# page.
demoNote: "Simplified illustration."

cautionaryTale:
  title: "Piper Alpha oil platform"
  date: "July 6, 1988"
  place: "North Sea"
  story: >-
    That day, engineers removed a safety valve from one of the platform's two
    condensate pumps and sealed the open pipe with a temporary cover. The
    work wasn't finished when the day shift ended, and the permit for the
    valve work was kept separately from the permit for the pump, with nothing
    connecting the two. That night the other pump failed, and the night
    shift, not knowing the valve was gone, restarted the first one. Gas
    escaped through the temporary cover and ignited, and the explosions and
    fires that followed destroyed the platform and killed 167 people.
  sourceId: [jesip-piper-alpha, icheme-lpb261, btw-piper-alpha, fsa-cullen]

therefore: >-
  Carry the machine's true state across every change of operator, in the same
  form every time, with anything disabled shown first, and have the person
  taking over say back what they're taking charge of.

without:
  steps: ["Work unfinished", "Handover by memory", "Next shift acts blind"]
  caption: >-
    Nobody lost the information. Both facts existed: this pump is being
    worked on, and this pump's safety valve is gone. But they sat on separate
    pieces of paper, and the handover depended on someone holding both in
    their head at once.[cite:icheme-lpb261] Lord Cullen found there was no
    clear procedure for shift handovers at all, and that the permit system
    was routinely not followed.[cite:btw-piper-alpha]

with:
  steps: ["State assembled", "Receiver restates it", "Responsibility recorded"]
  caption: "The machine's real condition travels with the responsibility, and the receiver has to say it back before it is theirs."

related:
  - slug: handoff
    type: complements
    note: "The Handoff moves control between a machine and a human. This moves it between two humans, where the state has to survive a gap in which nobody is watching."
  - slug: provenance-log
    type: complements
    note: "A handover is a state change with two actors, and worth recording as one. Who accepted the machine, and in what condition, is exactly the question asked afterwards."

review:
  - "Cite the Cullen Report (1990) itself when available."
  - "Anti-pattern, “no clear procedure for shift handovers at all” is in tension with the IChemE bulletin. That sentence is cited to a trade-news summary of Cullen. LPB 261 describes a procedure that did exist and was not kept to: “The Occidental procedure required maintenance and operations to meet, inspect the work site and sign off permits together. However, the operators were busy with their own handovers at the same time, and the practice developed where maintenance would” leave the paperwork instead. “Routinely not followed” is well supported; “no clear procedure at all” needs the Cullen Report itself to stand. Text left as supplied."
  - "Tale, the sources say condensate, not gas. JESIP calls it “a massive leakage of gas condensate”; LPB 261 has “condensate leaked from the blind flange … The escaping condensate ignited.” The story says “Gas escaped through the temporary cover”. Text left as supplied."
  - "Tale, two details the sources add that the story leaves out, neither contradicting it. The blind flange “was not, however, leak-tested or pressure-tested” and was “not fully tightened up” — which is why it leaked. And LPB 261 notes the restart was not unreasonable on what the night shift knew: maintenance on pump A “had not yet started and the problem with pump A was not especially serious”."
  - "Tale, “that day” is the day shift reading, which the sources support indirectly. LPB 261 dates the isolation to “the evening of 06 July 1988” and records that the associated permits “had been suspended overnight”. The valve work being done and left unfinished before the night shift came on is the sense both sources carry."
  - "I-PASS, “no increase in handoff duration” is slightly stronger than the paper. Starmer et al. report “no significant changes … in the duration of oral handoffs (2.4 and 2.5 minutes per patient, respectively; P=0.55)”. The mean rose a tenth of a minute and the difference was not significant, so “no significant change” is the exact claim. The In the field entry avoids the phrase; the source note states the figures."
  - "Starmer et al. was read from a mirror. The URL in the brief, the Washington University Digital Commons deposit, serves HTML rather than the PDF to a non-browser client; the same deposited document was read in full from the Lehigh Valley Health Network repository copy. The citation points at the Washington University record, which is the canonical deposit. Europe PMC confirms the paper is not open access there (PMID 25372088), so there is no PMC copy to prefer."
  - "Tale heading reordered into the page’s own shape. The brief gives one line, “July 6, 1988 · Piper Alpha oil platform · North Sea”; the CautionaryTale component takes a title and renders “date · place” beneath it, so the page shows “Piper Alpha oil platform” with “July 6, 1988 · North Sea” under it, the same as every other converted page. No words changed."
  - "Design considerations, six words added to the last item. The brief’s text ends “is exactly the question asked afterwards” and then asks for a link to Provenance Log; a bare trailing link reads badly, so the sentence now ends “… asked afterwards, which is what Provenance Log is for”, with the link on the pattern name. Nothing else in the item changed."
  - "Two source notes rewritten outside the brief, both to replace a paraphrase with the verified wording. `icheme-lpb261` said “carried in the research for the sequence” and now quotes the bulletin; `starmer-2014` said “cited here via the AHRQ PSNet record rather than the NEJM paper itself”, which stopped being true when the URL changed, and now quotes the paper and gives the duration figures. Neither note is body text."
  - "Front matter, two fields changed outside the brief. `domains` gained `medical`, because In the field now carries the I-PASS entry and the filters read that list; `updated` moved to 2026-11-07."
  - "Demo prints an arrow glyph. “day shift → night shift” is the brief’s wording and the only arrow inside a printed display anywhere on the site; `.fc-line` is a fixed monospace stack, so if a font in it lacks U+2192 that one character falls back. Checked in Chrome on Windows and it renders; worth a second look on another platform."
  - "Mechanism steps: drafted. Steps 2 and 4 carry sourced notes; the five-step shape, the titles and details are mine."
  - "Demo invents its data. The sources describe a platform control room in 1988; the two-pump console, the field names and the equipment list are written for this page. What is taken from them is the shape of the failure — two true facts held apart, and a handover that relied on someone joining them up."

openQuestions:
  - "What should an incoming fleet operator see about robots that are paused, in maintenance, or running with a sensor disabled? Piper Alpha says the disabled ones should be the loudest thing on the screen, but few handover views seem to be built that way."
  - "Does saying it back still work in software? I-PASS works partly because one person says it out loud to another. A checkbox that does the same job is exactly the kind of step that gets cleared from habit."

sources:
  - id: jesip-piper-alpha
    title: "Piper Alpha Explosion: Lessons Learnt"
    author: "Joint Emergency Services Interoperability Principles (JESIP)"
    year: 2008
    url: "https://jesip.org.uk/uploads/media/incident_reports_and_inquiries/Piper%20Alpha%20Explosion.pdf"
    type: incident-report
    note: "Observed. A UK government source for the basic facts: “167 people died, 62 people survived”, and the leak traced to “pipe work connected to a condensate pump. A safety valve had been removed from this pipe work for overhaul and maintenance… When the pipe work from which the safety valve had been removed was pressurised at start-up, it is believed the leak occurred.”"
  - id: icheme-lpb261
    title: "Loss Prevention Bulletin 261"
    author: "Institution of Chemical Engineers"
    url: "https://www.icheme.org/media/1982/lpb261_pg03.pdf"
    type: article
    note: "The sequence in detail: pump A isolated for maintenance, its “pressure relief valve had also been removed for maintenance under a separate permit and a blind flange almost certainly fitted in its place”, the flange “not, however, leak-tested or pressure-tested”, pump B tripping “at about 21.45”, and the finding that “because of the way in which work permits were organised on Piper Alpha, the operators would not have known that the pressure relief valve for pump A was missing.” Also the handover itself: communications “between shifts, and between crews was personal, informal”."
  - id: btw-piper-alpha
    title: "Piper Alpha: permit to work, shift handover, accountability"
    url: "https://btw.media/en/articles/piper-alpha-permit-to-work-shift-handover-accountability"
    type: article
    note: "Secondary. Carried in the research for Lord Cullen's findings: no clear procedure for shift handovers, and a permit-to-work system that was inadequate and habitually departed from."
  - id: fsa-cullen
    title: "Lord Cullen on the Piper Alpha handover"
    author: "Flight Safety Australia"
    url: "https://www.flightsafetyaustralia.com/?p=207044"
    type: article
    note: "Secondary, quoting the Cullen report. Used here for the handover finding rather than for any aviation content."
  - id: starmer-2014
    title: "Changes in Medical Errors after Implementation of a Handoff Program"
    author: "Amy J. Starmer et al."
    year: 2014
    url: "https://digitalcommons.wustl.edu/cgi/viewcontent.cgi?article=4493&context=open_access_pubs"
    type: paper
    note: "Observed. The I-PASS study as published in the New England Journal of Medicine (2014;371:1803-12), read in the Washington University open-access deposit. In 10,740 patient admissions across nine hospitals, “the medical-error rate decreased by 23% … (24.5 vs. 18.8 per 100 admissions, P<0.001), and the rate of preventable adverse events decreased by 30% (4.7 vs. 3.3 events per 100 admissions, P<0.001)”. There were “no significant changes … in the duration of oral handoffs (2.4 and 2.5 minutes per patient, respectively; P=0.55)”."

---

## Design considerations

- **Put related facts side by side.** At Piper Alpha the two permits existed but weren't cross-referenced. The handover view should show everything about a piece of equipment in one place.[cite:icheme-lpb261]
- **Show what's disabled first, and loudest.** Things that are switched off, removed or bypassed are the items most likely to hurt the next person.
- **Use the same fields every time.** A structured handover can't leave out what a free-text note forgets.
- **Have the receiver say it back.** Most handover design focuses on the person leaving, which is the easier problem. Checking whether the person arriving has actually built the picture is the harder, more valuable one.[cite:starmer-2014]
- **Record who handed over to whom.** Who accepted the machine, and in what condition, is exactly the question asked afterwards, which is what [Provenance Log](/patterns/provenance-log) is for.

## In the field

**Observed · Industrial.** [Piper Alpha](#tale): the permit for the pump and the permit for its safety valve were separate and uncross-referenced, so the night shift restarted a pump whose valve had been removed.[cite:icheme-lpb261][cite:jesip-piper-alpha]

**Observed · Medical.** I-PASS, a structured handoff program used across nine hospitals, where medical errors fell 23% and preventable adverse events 30%.[cite:starmer-2014]

## Notes

For a machine, the equivalent of I-PASS isn't a summary screen. It's asking the incoming operator to state what they think they've just taken charge of, including what on it is switched off.
