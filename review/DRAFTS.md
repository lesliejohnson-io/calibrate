# Drafts worklist

One entry per page carrying a `drafts:` flag, closest to done first. Item numbers
refer to `review/AUDIT.md`. When a page's boxes are ticked, clear its flags, remove
its notice, and set `status: reviewed`.

The VERIFY comments that listed each page's checks were removed from the pattern
files on 2026-11-22. To read them, including where `AUDIT.md` mentions them:
`git show 3608cd0:content/patterns/03-graceful-degradation.md`

| # | Page | Flags still set | What it is waiting on | Have it? |
|---|---|---|---|---|
| 1 | Mode Awareness | tale, antiPattern, demo, considerations | Your review; no new document for the tale | Yes |
| 2 | Graceful Degradation | tale, antiPattern, examples | NTSB/MAR-97/01 | **Local** |
| 3 | Readiness Check | examples | NTSB/HAR-19/03; two Super Cruise sources | **HAR local** |
| 4 | Learning Loop | tale, antiPattern, demo, considerations, examples | Sheen Report; ASRS briefing | Public URLs |
| 5 | Return of Control | tale, antiPattern, demo, examples | FACE 71-171-2018; KNKT final report | FACE URL only |
| 6 | Explainable Fault | tale, antiPattern, demo, examples | NTSB brief CHI06MA121; KNKT final report | Letter URL only |
| 7 | The Handoff | tale, antiPattern, examples | CIAF; 2024 ruling; ETCS sources | CIAF local, **ruling not located** |

The KNKT final report closes part of both 5 and 6, so pull it once.

---

## 1. Mode Awareness (`16-mode-awareness.md`)

**Needs:** your review. The tale's source, `bea-f-gged`, has already been read.
**Where:** https://bea.aero/uploads/tx_elydbrapports/F-GGED.pdf
**Audit:** 16.2, 16.3, 16.7, 16.8, 16.11

- [ ] Tale and anti-pattern: 16.2, 16.3 and 16.7 record them as read against the French report. Review, then clear `tale` and `antiPattern`.
- [ ] Considerations: four cite `bea-f-gged` and one cites `ntsb-aar-14-01`. The audit has no item recording that these were read. Check them.
- [ ] Demo: built on 2026-11-22 as an invented forklift scene (16.11). Review it, including the three-times proportion taken from report section 22.335, then clear `demo`.

## 2. Graceful Degradation (`03-graceful-degradation.md`)

**Needs:** NTSB/MAR-97/01.
**Where:** `review/sources/mar9701.pdf`; https://www.ntsb.gov/investigations/AccidentReports/Reports/MAR9701.pdf
**Audit:** 3.1, 3.5, 3.6, 3.7

- [ ] Tale and anti-pattern: check every figure in the VERIFY comments (at `3608cd0`) against the report (3.1).
- [ ] Examples: 3.6 and 3.7 record the BEA and UN R157 readings. Confirm, then clear `examples`.
- [ ] Read UN R157 section 5.4 on whether the manoeuvre is mandatory after a severe failure (3.7).

## 3. Readiness Check (`11-readiness-check.md`)

**Needs:** NTSB/HAR-19/03, `gmc-super-cruise`, `seeing-machines`.
**Where:** `review/sources/har1903.pdf` (not yet in the manifest); https://www.gmc.com/supercruise; https://internationalfinance.com/company/seeing-machines-technology-enables-gm-super-cruise-driver-assistance-system/
**Audit:** no item covers these claims. 11.5 stays open as craft work and does not block.

- [ ] Tempe: the page says Uber "didn't check" what its cameras showed, while its source note says ATG used them "as a spot-check". Read HAR-19/03 and correct In the field, Design considerations and Notes.
- [ ] Super Cruise: read both sources against the In the field entry and the escalation considerations.

## 4. Learning Loop (`09-learning-loop.md`)

**Needs:** the Sheen Report (Court No. 8074) and the ASRS program briefing.
**Where:** https://assets.publishing.service.gov.uk/media/54c1704ce5274a15b6000025/FormalInvestigation_HeraldofFreeEnterprise-MSA1894.pdf; https://asrs.arc.nasa.gov/docs/ASRS_ProgramBriefing.pdf
**Audit:** 9.1, 9.4

- [ ] Tale, anti-pattern and demo: read against the Sheen Report (9.1).
- [ ] Examples: the Herald entry against Sheen, the ASRS entry against the briefing.
- [ ] Considerations: source or restate "count repeats, not just reports" and "treat workarounds as reports" (9.4).

## 5. Return of Control (`12-return-of-control.md`)

**Needs:** Washington State FACE Report 71-171-2018 and the KNKT final report on JT610.
**Where:** https://www.lni.wa.gov/safety-health/safety-research/files/2018/71_171_2018_LaserGuidedVehicle.pdf. No address is recorded for KNKT.
**Audit:** 12.1, 12.6, 12.8, 12.12

- [ ] Tale, anti-pattern and demo: read against FACE, above all the auto-resume behaviour the pattern rests on (12.1).
- [ ] Examples: the Lion Air repeated-activation claims need KNKT (12.12).
- [ ] Examples: no read is recorded for the Super Cruise entry (`gm-techlink`). The ISO 13850 entry was read from a manufacturer's datasheet, not the standard.
- [ ] Replace `wikipedia-mcas` with the FAA airworthiness directive or Boeing's description (12.8).

## 6. Explainable Fault (`10-explainable-fault.md`)

**Needs:** NTSB brief CHI06MA121, Safety Recommendations A-07-70 through -86, and the KNKT final report.
**Where:** https://www.ntsb.gov/safety/safety-recs/RecLetters/A07_70_86.pdf (the letter). **No address is recorded for the brief** or for KNKT.
**Audit:** 10.1, 10.3

- [ ] Locate the brief. The source entry names it but links only the letter (10.1).
- [ ] Tale, anti-pattern and demo: read against both.
- [ ] Examples: the Lion Air entry rests on AirlineRatings and Leeham until KNKT is read (10.3).

## 7. The Handoff (`01-handoff.md`)

**Needs:** CIAF, the 2024 ruling, and the sources for the ETCS entry.
**Where:** `review/sources/IF_240713_200514_CIAF.pdf`; https://www.era.europa.eu/system/files/2023-07/IF_240713_200514_CIAF.pdf. **The 2024 ruling has not been located.** `irj-etcs-santiago` has no URL.
**Audit:** 1.1, 1.4, 1.17

- [ ] Read CIAF for the four 1.17 items: the ERTMS boundary, the "useless signal" wording, the injured figure, and the ASFA-only kilometres. Only pp. 7 and 25 have been read.
- [ ] Check who made the phone call. The page says the conductor, and Shultz says inspector, track agent and controller.
- [ ] Add the CIAF URL to the source entry and remove its "not located" note.
- [ ] Locate and read the 2024 ruling. It is listed under Sources, but no sentence on the page cites it. The claim about Adif's head of operating safety is only in its unrendered source note.
- [ ] ETCS entry: find the acknowledgement window in SUBSET-026, and give `irj-etcs-santiago` a URL.
