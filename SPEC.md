# Calibrate — Layout Spec

**Site:** trust-layer-patterns.vercel.app
**Purpose:** A reference library of named, reusable design patterns for the trust layer between humans and autonomous machines. It is for practitioners, and it is also the author's learning tool.
**Scale target:** 20+ patterns.
**Status:** Spec v1. The taxonomy is still being explored (see §2).

---

## 0. Instructions for Claude Code

1. **Read the repo first.** Patterns currently live in `content/patterns/NN-slug.md` with frontmatter that includes `sources:`. The existing pattern page already has two components: **Mechanism** (numbered steps with a "Key moment") and **Without / With**. Keep both and reuse them. Do not rebuild them.
2. **Do not commit or push.** The author makes all commits herself. Stop after each phase (§9) and summarize what changed.
3. **Ask before changing the content schema** in ways that would require rewriting existing pattern files by hand. New fields must be optional and have safe defaults.
4. **Validate frontmatter at build time** (e.g. with zod). Give clear errors that name the file and the field.

---

## 1. Positioning (index page, above the fold)

Other AI pattern libraries cover AI inside software: prompts, chat, generation. This library covers **autonomy with physical consequences**: vehicles, surgical and industrial robots, drones, warehouse systems.

The index hero must say this in one sentence. Do not lead with a generic "UX patterns" framing.

---

## 2. Taxonomy: faceted, not fixed

With 20+ patterns, a flat list stops working. The organizing axis isn't settled yet, so **encode several axes in frontmatter now** and let the index switch between them. Each pattern gets exactly one primary **Moment**. The other axes are filters.

### Axis A — Moment in the control loop (primary, default grouping)

| Moment | Question it answers | Current patterns |
|---|---|---|
| `before` | Before the machine acts, does the human agree? | Appropriate Friction |
| `during` | While it runs, can the human see and predict it? | The Glass Box, Shared Mental Model |
| `transition` | When control changes hands, is the human ready? | The Handoff |
| `failure` | When it can't do the job, what happens? | Graceful Degradation |
| `after` | After something happens, can trust be rebuilt or recalibrated? | (none yet) |

`after` is new. It gives room for patterns about recovery, review and calibration.

### Axis B — Trust job (what the human needs)

`know` (see state and reasoning) · `predict` (anticipate behavior) · `intervene` (act or override) · `recover` (get back to safe) · `calibrate` (trust the right amount over time)

A pattern may have 1–2 trust jobs.

### Axis C — Risk & reversibility

- `risk`: `low | elevated | critical`
- `reversibility`: `reversible | costly | irreversible`

Can be shown as an optional 2×2/3×3 matrix view later. It is not used as navigation.

### Axis D — Autonomy level

`autonomy`: the range of automation levels the pattern applies to, e.g. `[3, 5]`. Use a 0–5 scale and define it on the About page (SAE-style levels as the reference point). Patterns like the Handoff live mostly at levels 2–4.

### Axis E — Domain

`domains`: `automotive | surgical | industrial | drone | warehouse | maritime | aviation | home | general`

Used to filter, and to tag examples.

> **Open decision:** After roughly 10 patterns are tagged, review whether Moment still feels like the right primary axis or whether Trust job reads better. Because grouping is driven by data, switching the default is a one-line config change.

---

## 3. Content model (frontmatter)

```yaml
---
number: 1                      # display number, zero-padded in UI
slug: handoff
name: The Handoff
intent: >-                     # one sentence, shown on cards and in the page header
  The machine yields control on purpose...
moment: transition             # required, one of Axis A
trustJobs: [intervene, predict]
risk: critical
reversibility: irreversible
autonomy: [2, 4]
domains: [automotive, surgical, drone]
status: draft                  # seed | draft | reviewed | stable
updated: 2026-10-08
aliases: [takeover request, transition of control]   # searchable
related:
  - slug: shared-mental-model
    type: requires             # requires | complements | alternative-to | tension-with | precedes
    note: The handoff briefing only works if the human's model of state is current.
crossReferences:               # patterns in other libraries, link only, no copied content
  - library: Shape of AI
    name: Verification
    url: https://www.shapeof.ai/patterns/verification
    note: Software analog; this pattern adds time-to-orient and physical stakes.
sources:
  - title: ...
    url: ...
    type: paper | standard | incident-report | article | talk
openQuestions:                 # learning log; visibility controlled by showOpenQuestions
  - How long is long enough to orient? Does it vary by domain?
showOpenQuestions: true
---
```

The markdown body holds these sections, as H2s with fixed names so they can be parsed and linked to: **Problem**, **When to use**, **When not to use**, **Design considerations**, **In the field**, **Notes**. Mechanism and Without/With keep their existing data format.

Create `content/patterns/_template.md` with every field and section stubbed. It must be excluded from the build.

---

## 4. Index page `/`

Top to bottom:

1. **Header bar:** site name · "Working library" tag · nav: Patterns / Moments / About.
2. **Hero:**
   - H1 "Calibrate"
   - Positioning sentence (§1)
   - Meta line: `N patterns · updated YYYY-MM-DD`
3. **Control-loop diagram (navigation):** a horizontal loop of the five Moments (Before → During → Transition → Failure → After, with After feeding back to Before). Each node shows its name and pattern count and links to that section's anchor. On mobile it becomes a vertical stepper. This is the signature visual of the site, so keep it simple and typographic, not illustrated.
4. **Controls row** (sticky under the header once scrolled):
   - **Group by:** `Moment` (default) · `Trust job` · `None (A–Z)`. Implement as a tablist.
   - **Filters:** Domain (multi-select chips), Status (hide seeds by default).
   - **Search:** matches name, intent and aliases. Show it only once there are 12+ patterns.
   - Mirror state in the URL: `?group=moment&domain=surgical`.
5. **Grouped sections:** for each group, show an H2 with the group name, a one-line purpose (the question from §2), and a grid of cards.
6. **Footer:** "Patterns for the human–machine trust layer · in progress" · link to About · how to cite.

### Pattern card

- Number (`01`), name, intent (clamped to 3 lines)
- Chips: moment (always), first trust job
- Status badge **only** when the status is not `stable`. Use a muted style.
- **Never show "0 sources."** Show the source count only when it is above 0.
- The whole card is the link, with a visible focus ring.
- Grid: 3 columns on desktop, 2 on tablet, 1 on mobile.

---

## 5. Pattern page `/patterns/[slug]`

### Layout

- Desktop: main column (~68ch) plus a **sticky right-rail TOC** with section anchors and a scroll-spy highlight.
- Mobile: the TOC collapses into a "Jump to" disclosure under the header.

### Section order

1. **Breadcrumb:** All patterns / {Moment} / {Name}
2. **Header:**
   - `Pattern 01 · {Moment}` eyebrow, then H1 name, then intent as a lede
   - Meta strip: trust jobs, risk, reversibility, autonomy range, domains, status, updated date
3. **Problem.** The tension the pattern resolves, framed as competing forces (for example, "the machine must keep going *and* the human must be ready"). 1–3 short paragraphs.
4. **The mechanism.** Existing component, unchanged. The "Key moment" step stays visually distinct.
5. **Without / With.** Existing component, unchanged.
6. **When to use / When not to use.** Two columns on desktop, stacked on mobile. Each is a short list tied to risk and reversibility.
7. **Design considerations.** A list where every item is a **bold imperative rule** followed by 1–2 sentences. Target 3–6 items.
8. **In the field.** Example cards. Each card has: domain chip, image (optional), caption, source link, and a label that is either **Observed** (a real system or incident) or **Speculative** (the author's concept). The Observed/Speculative distinction is required, because it keeps the library honest while examples are still being collected.
9. **Related patterns.** Cards grouped by relationship type ("Requires", "Complements", "In tension with"…), each with its one-sentence note. Include incoming relationships too: if pattern B lists A, show B on A's page.
10. **Elsewhere.** Cross-references to other libraries: name, library and note, linking out. Omit the section when it's empty.
11. **Sources.** A numbered list grouped by type. When there are no sources, render nothing in production and a dev-only reminder in development.
12. **Open questions.** Rendered when `showOpenQuestions: true`. Style it as a margin-note / field-notebook block labeled "Still figuring out." This is the learning surface, and it shows the work in public.
13. **Pager:** previous/next **within the same Moment**, plus a "Back to {Moment}" link.

---

## 6. Other pages

- **`/moments/[moment]`:** the Moment's question, a 2–3 sentence explanation, a mini loop diagram with this Moment highlighted, and the cards for its patterns. Grows into a real page as the count passes ~5 per Moment.
- **`/about`:** what a "pattern" means here; anatomy of a pattern page (a small annotated diagram); definitions for statuses, the autonomy scale, the trust jobs and the relationship types; how to cite; a note on Observed vs Speculative examples.
- **`/changelog` (optional, phase 3):** dated entries generated from `updated` fields and git history. Doubles as a learning record.

---

## 7. Status model

| Status | Meaning | Shown publicly? |
|---|---|---|
| `seed` | Name + intent only | Hidden by default; a filter can reveal it |
| `draft` | Mechanism + problem written, few sources | Yes, with a muted badge |
| `reviewed` | All sections filled, ≥3 sources, ≥1 Observed example | Yes, with a muted badge |
| `stable` | Reviewed, plus revisited after real-world use or feedback | Yes, no badge |

Seeds let the author add candidate patterns to the repo without making the public library look thin.

---

## 8. Visual & interaction rules

- Keep the current typographic, quiet aesthetic. Content density is a feature for reference use.
- Chips: one consistent style. Use color for Moment only (5 tokens), not for every facet.
- Accessibility: one H1 per page; tabs use correct ARIA roles and arrow-key behavior; chips and filters are real buttons or checkboxes; respect `prefers-reduced-motion` for scroll-spy and transitions; text contrast is AA at minimum.
- Links to other libraries and sources open in the same tab with an external-link icon (do not force a new tab).
- No layout shift when filters change. Show an empty state with a "Clear filters" action.

---

## 9. Build phases (stop and report after each)

1. **Content model.** Extend the frontmatter schema with validation, add `_template.md`, and backfill the 5 existing patterns with `moment` and the other facets (propose values, then wait for approval).
2. **Pattern page.** New section order, right-rail TOC, Related (including incoming links), In the field, Open questions, pager scoped to the Moment.
3. **Index.** Hero, control-loop diagram, grouped sections, card redesign, removal of the "0 sources" display.
4. **Group-by / filters / URL state,** then search once there are 12+ patterns.
5. **Moment pages and About.**
6. **Optional:** changelog, risk × reversibility matrix view.

---

## Appendix — Candidate pattern backlog (seeds to explore)

These are prompts for the author's research, not decisions. Add them as `seed` status only after vetting.

- **Before:** Intent Preview (the machine shows its planned path before moving) · Operating Envelope (it declares the conditions it's designed for) · Arming (an explicit step that enables autonomy)
- **During:** Confidence Display · Attention Support (keeping a supervising human engaged without nagging) · Ambient State (peripheral awareness without alerts)
- **Transition:** Takeback (human → machine) · Override · Mode Clarity (preventing mode confusion)
- **Failure:** Minimal Risk State (getting to safe when no human responds) · Alarm Triage (preventing alarm floods) · Stop Authority (who can halt it, and how)
- **After:** Incident Replay (reconstructing what the machine saw and decided) · Trust Repair · Calibration Over Time
