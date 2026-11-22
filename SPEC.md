# Calibrate: Product Spec

**Site:** calibrate.lesliejohnson.io
**Purpose:** A reference library of named, reusable design patterns for the trust layer between humans and autonomous machines. It is for practitioners, and it is also the author's learning tool.
**Scale target:** 20+ patterns.

This file describes the product as built. The rules for working in this repo are in [CLAUDE.md](CLAUDE.md).

---

## 1. Positioning

Other AI pattern libraries cover AI inside software: prompts, chat, generation. This library covers **autonomy with physical consequences**: vehicles, surgical and industrial robots, drones, warehouse systems.

---

## 2. Taxonomy

Each pattern has exactly one primary **Moment**. The other axes are filters or stored data. All vocabularies are defined in `lib/schema.ts`.

### Moment (primary grouping)

| Value | Label | Question (`MOMENT_QUESTIONS`) |
|---|---|---|
| `before` | Before | Before the machine acts, does the human agree? |
| `during` | During | While it runs, can the human see and predict it? |
| `transition` | Transition | When control changes hands, is the human ready? |
| `failure` | Failure | When it can't do the job, what happens? |
| `after` | After and over time | What happened, and what is it doing to us over time? |

### Domain (the index filter)

`driving | clinical | surgical | industrial | drone | warehouse | maritime | aviation | rail | defense | software | home | general`

`general` cannot be combined with a specific domain. The index offers only domains at least one pattern uses. For when a domain applies, see [CLAUDE.md](CLAUDE.md#conventions).

### Judgment ratings (stored, not shown)

These validate in frontmatter but are not rendered anywhere on the site.

- `trustJobs`: one or two of `know | predict | intervene | recover | calibrate`
- `risk`: `low | elevated | critical`
- `reversibility`: `reversible | costly | irreversible`
- `autonomy`: a `[low, high]` range on a 0–5 scale

---

## 3. Content model

Each pattern is one file, `content/patterns/NN-slug.md`. The slug comes from the file name. Files starting with `_` are excluded, and `_template.md` stubs every field. `lib/schema.ts` validates frontmatter with zod at build time, and errors name the file and field.

```yaml
---
number: 1                      # zero-padded in the UI
name: "The Handoff"
intent: "..."                  # one sentence, 240 characters at most
cardIntent: "..."              # optional shorter line for the index card, 160 at most
moment: transition             # required
trustJobs: [intervene, predict]
risk: critical
reversibility: irreversible
autonomy: [2, 4]
domains: [rail, driving, aviation]
status: draft                  # seed | draft | reviewed | stable
updated: "2026-11-07"
aliases: []                    # searchable

steps:                         # required, 2-8, at most one key: true
  - { title: "...", detail: "...", note: "...", key: true }
diagram: { elements: [] }      # optional; replaces the row of steps (section 6)
antiPattern: "..."             # the named mistake
interface: { component: handoff }   # optional demo, from INTERFACE_COMPONENTS
demoNote: "..."                # optional line above the demo

cautionaryTale:
  title: "..."
  date: "July 24, 2013"
  place: "..."
  story: >-                    # a blank line starts a new paragraph
    ...[cite:source-id]
  timeline: []                 # optional, two markers or more
  kicker: "..."                # optional pull quote
  sourceId: source-id          # or a list

drafts:                        # sections that carry a DRAFT tag
  tale: true                   # also antiPattern, demo, whenToUse, considerations, examples
unverified:                    # the notice above the opening story (section 5)
  - text: "... {document} ..."
    document: "..."
    sourceId: source-id        # optional; links the document name to Sources

therefore: "..."
insight: "..."                 # optional, plain prose, no citations
without: { steps: [], caption: "..." }   # 3-4 beats
with: { steps: [], caption: "..." }
whenToUse: "..."
considerations: []             # optional { rule, why } list; or use the body section
examples: []                   # optional structured examples

related:
  - slug: shared-mental-model
    type: requires             # requires | complements | alternative-to | tension-with | precedes
    note: "..."
crossReferences:               # other libraries, link only
  - { library: "...", name: "...", url: "...", note: "..." }
sources:
  - id: source-id              # needed only if cited as [cite:source-id]
    title: "..."
    author: "..."
    year: 2014
    url: "..."
    type: paper                # paper | book | standard | incident-report | article | talk
    note: "..."                # internal; not rendered
openQuestions: []
showOpenQuestions: true        # defaults to true when there are open questions
review: []                     # author-facing flags, listed on /review in development
---
```

The markdown body uses fixed H2s: **Problem**, **When to use**, **When not to use**, **Design considerations**, **In the field**, **Notes**. Anything under another heading is kept under Notes. `[cite:source-id]` becomes a numbered footnote.

---

## 4. Index page `/`

Built by `app/page.tsx` and `components/PatternBrowser.tsx`. There are two columns: the library, and a 260px sticky rail that drops away at the layout's breakpoint.

Top to bottom in the main column:

1. **Hero:** H1 "Calibrate", the positioning paragraph, and a meta line: `N patterns · N domains · updated YYYY-MM-DD`. The date is the newest `updated` value.
2. **Search:** a labelled field matching name, intent and aliases. Escape clears it.
3. **Domain chips** (`DomainFilter`): multi-select toggle buttons, alphabetical by label, each with its library-wide count.
4. **Moment groups:** one section per Moment in loop order, each with an H2, its question and a card grid. Grouping is fixed.
5. **Filtered states:** "No patterns match" with Clear filters, or `X of Y patterns shown` with Clear filters.

**Moment rail** (`MomentRail`): one word per Moment on a track, following the reader down the page. A Moment with no matches stays listed, greyed and unclickable.

**Pattern card** (`PatternCard`): illustration or generated thumbnail, zero-padded number, name and card line. The whole card is the link. The status sits opposite the number (`StatusBadge`). Cards show no chips or source count. The grid is `repeat(auto-fill, minmax(260px, 1fr))`.

**URL state:** `?domain=a,b`, `?q=text`, and `?status=all` to reveal seeds. State lives in `BrowseProvider`, so a selection survives a trip into a pattern page and back.

**Site chrome** (`app/layout.tsx`): a header with the brand mark and Patterns / About | Changelog, replaced by `NavDrawer` below its breakpoint. The footer carries copyright, CC BY 4.0 and Contact.

---

## 5. Pattern page `/patterns/[slug]`

An article column plus `PatternAside`, a sticky "On this page" list. On small screens `TocDisclosure` takes its place.

Section order:

1. Breadcrumb: All patterns / {Moment} / Pattern NN, followed by `StatusBadge`
2. H1 name and intent as lede
3. **Verification notice** (`VerificationNotice`), when `unverified` is set: what has not been read, and the document that would settle it
4. **Cautionary tale** (`CautionaryTale`)
5. **Anti-pattern and Pattern**, side by side: the named mistake, then Therefore and Insight
6. **Demo** (`Comparison`), when `interface` is set: the same interface without and with the pattern
7. **The mechanism** (`MechanismFlow`; see section 6)
8. Problem
9. When to use, and "Leave it out when"
10. Design considerations
11. In the field
12. Related patterns, including incoming relationships
13. Elsewhere (cross-references)
14. Sources: a numbered list with each source's type, plus the Notes section above it
15. "Still figuring out" (open questions)
16. Pager: All patterns, plus next (or previous) within the same Moment

`DraftTag` marks a section whose `drafts:` flag is set. Sections with no content are omitted.

---

## 6. Mechanism diagram

`MechanismFlow` renders the mechanism in one of two forms:

- **Row of steps** (default): the `steps` array as equal cards, with the key moment inverted and step notes beneath as "At 02:" callouts.
- **Diagram**: when a pattern sets `diagram`, `MechanismDiagram` draws its real shape and replaces the row, the arc and the notes. `steps` is still required by the schema.

The page invokes it once:

```tsx
<MechanismFlow steps={p.steps} diagram={p.diagram} />
```

Data is validated by `diagramSchema` in `lib/diagram.ts`. A diagram is `{ elements: [...] }`, with at least two elements:

| Type | Fields | Meaning |
|---|---|---|
| `event` | `id`, `title`, `note?` | The trigger, drawn as a filled dot. Always first, and only first. |
| `box` | `id`, `title`, `note?`, `key?`, `via?` | One step. `via` labels the connector into it. |
| `group` | `items` (2+ of `id`, `title`, `note?`, `key?`) | Boxes that hold at the same time, in one border. |
| `fork` | `paths` (exactly 2 of `condition`, `elements`) | The spine splits and rejoins. Paths hold boxes and groups; an empty path runs straight to the merge. Needs a box or group on each side. |
| `branch` | `condition`, `item` (`id`, `title`) | A dashed box off the preceding box or group that may not happen and does not rejoin. |

A diagram allows at most one `key`, and ids must be unique.

```yaml
diagram:
  elements:
    - { type: event, id: "01", title: "Action taken" }
    - { type: box, id: "02", title: "Record the actor" }
    - type: group
      items:
        - { id: "03", title: "Put it beyond reach", key: true }
        - { id: "04", title: "Retain it" }
    - { type: box, id: "05", title: "Open it to inspection", via: "Later, to someone other than the actor" }
```

**Rendering:** boxes and labels are real DOM elements on a CSS grid. Connectors are an SVG layer routed after layout. Slots are columns on desktop and rows under 720px, and only the stylesheet decides which. The drawing is hidden from assistive technology, and `describeDiagram` supplies the same content as an ordered list for screen readers.

---

## 7. Other pages

- **`/moments/[moment]`:** the Moment's question and explanation, `LoopHero` with this Moment highlighted, and its cards.
- **`/about`:** calibrated trust, what a pattern means here, evidence labels, status definitions, relationship types, how to cite, and the author.
- **`/changelog`:** dated entries built from `updated` fields and the commit history, listing only commits that touched a pattern.
- **`/review`:** author-facing list of draft patterns with `review:` items. Development only; it returns 404 in production.

---

## 8. Status in the product

The meaning of each status is in [CLAUDE.md](CLAUDE.md#status). The reader-facing wording is `STATUS_DEFINITIONS` in `lib/schema.ts`, shown on `/about`.

Every written pattern is served in every build. `seed` (name and intent only) is the one extra value: a seed still builds, but the index and Moment pages leave it out unless `?status=all` is set. No pattern is a seed today.

`StatusBadge` shows the status as muted metadata on every pattern card, related-pattern card and pattern page. `DraftTag`s and the verification notice say what is unverified.

---

## 9. Visual and interaction rules

- A quiet, typographic aesthetic. Content density is a feature for reference use.
- Accessibility: one H1 per page; filters are real buttons; respect `prefers-reduced-motion`; text contrast is AA at minimum.
- Links to other libraries and sources open in the same tab with an external-link icon.
- No layout shift when filters change.

---

## Appendix: candidate pattern backlog

Prompts for the author's research, not decisions. Some have since become patterns, so check the index first. Add a candidate as `seed` only after vetting.

- **Before:** Intent Preview · Operating Envelope · Arming
- **During:** Confidence Display · Attention Support · Ambient State
- **Transition:** Takeback · Override · Mode Clarity
- **Failure:** Minimal Risk State · Alarm Triage · Stop Authority
- **After:** Incident Replay · Trust Repair · Calibration Over Time
