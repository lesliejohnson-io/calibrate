---
# Copy this file to e.g. "06-my-pattern.md" (the part after the number becomes
# the URL). Files starting with "_" are ignored by the site.
#
# Required: number, name, intent, moment, trustJobs, updated, steps, without, with.
# Everything else can be deleted and falls back to the default shown in [].

number: 6
name: "Pattern Name"
intent: "One sentence: what the machine does and what it buys the human. The page lede."
# cardIntent: the index card's line, where the full intent is too long to sit
# under a thumbnail. One short sentence, no example. Leave it out and the card
# shows the intent.
# cardIntent: "One short sentence for the card."

# thumbnail: which mark from the thumbnail map this pattern shows. Defaults to
# the slug, so name one only when two patterns share a drawing. The grammar is
# in redesign-handoff.md §4: square = machine, circle = human, solid = in
# control, diamond = a neutral point, solid triangle = direction.
# thumbnail: "handoff"

# --- Facets -----------------------------------------------------------------
# moment: where in the control loop this sits. Exactly one. Drives grouping.
#   before      Before the machine acts, does the human agree?
#   during      While it runs, can the human see and predict it?
#   transition  When control changes hands, is the human ready?
#   failure     When it can't do the job, what happens?
#   after       What happened, and what is it doing to us over time?
#               (written in the interface as "After and over time")
moment: during

# trustJobs: what the human needs. One or two of:
#   know · predict · intervene · recover · calibrate
trustJobs: [know]

risk: elevated            # low | elevated | critical            [elevated]
reversibility: costly     # reversible | costly | irreversible   [costly]

# autonomy: the range of automation levels this applies to, on the 0–5 scale
# defined on the About page.
autonomy: [0, 5]          # [[0, 5]]

# domains: one or more of automotive, surgical, industrial, drone, warehouse,
# maritime, aviation, home, general. Use "general" on its own, never alongside
# a specific domain.
domains: [general]        # [[general]]

# --- Housekeeping -----------------------------------------------------------
status: draft             # seed | draft | reviewed | stable     [draft]
updated: "2026-10-23"     # keep the quotes
aliases: []               # other names people search for        [[]]

# --- Links ------------------------------------------------------------------
# related: other patterns in this library. `slug` must exist; the note is
# required and is shown on the card. type is one of:
#   requires | complements | alternative-to | tension-with | precedes
# You only need to write a relationship once — the other pattern picks it up
# as an incoming link.
related: []
#  - slug: shared-mental-model
#    type: requires
#    note: "One sentence on why."

# crossReferences: patterns in other libraries. Link only, never copied content.
crossReferences: []
#  - library: "Shape of AI"
#    name: "Verification"
#    url: "https://www.shapeof.ai/patterns/verification"
#    note: "Software analog; this pattern adds time-to-orient and physical stakes."

# sources: `title` required. `type` is one of paper, book, standard,
# incident-report, article, talk.
sources: []
#  - title: "Paper or article title"
#    author: "Author name"
#    year: 2024
#    url: "https://example.com"
#    type: paper
#    note: "Why it matters for this pattern"

# whenToUse: one short paragraph on the conditions this pattern is for.
# whenToUse: "Use this whenever ..."

# considerations: each item is the rule as an instruction, then why it holds.
# Three to six work best.
# REQUIRED IN PRACTICE. The incident this pattern came from: a real event,
# from physical autonomy, that the sources on this page actually record. Every
# field is needed once the block exists, and `sourceId` must be the id of a
# source below or the build fails. Never write one from memory or from a
# secondary summary: if the research has no tale, leave this out and put
# "Needs a cautionary tale" in `review:` instead of inventing one.
# cautionaryTale:
#   title: "American Airlines Flight 965 at Cali"   # the incident's full name
#   date: "20 December 1995"
#   place: "Buga, Colombia"
#   story: >-
#     Three or four sentences. What the machine did, what the human saw, and
#     what it cost. Figures and units exactly as the source gives them.
#   sourceId: aa965-findings

# REQUIRED IN PRACTICE. The one-sentence answer to the tale, rendered after
# "Therefore:" above the demo. One sentence, imperative, no hedging.
# therefore: >-
#   Show the path before it is flown, and make committing to it a separate act
#   from proposing it.

# The interactive without / with demo. The component name has to be in
# INTERFACE_COMPONENTS in lib/schema.ts. Write the concept in DEMOS.md first;
# until one is built, put "Needs demo (see DEMOS.md)" in `review:`.
# interface:
#   component: "flight-computer"

considerations: []
#  - rule: "Write the rule as a short imperative."
#    why: "One or two sentences on why it holds and what breaks without it."

# examples: figures under the Examples heading. `verdict` is required and is
# either `applies` (the pattern in use) or `without` (what its absence costs) —
# shown as a shape and a word, never colour alone. `alt` is required; leave
# `image` out while the figure is still a placeholder and the slot renders as a
# stated gap, or add `placeholder: false` to drop the slot too and render the
# example as a credit line, verdict and caption. Confirm an image's reuse terms
# before publishing it.
examples: []
#  - image: "/examples/my-image.png"
#    alt: "What the image shows, for screen readers"
#    placeholder: false   # no image and no stated gap: a citation, not a figure
#    credit: "Who it is from, e.g. BEA, AF447 Final Report, 2012, Figure 70"
#    url: "https://example.com"
#    verdict: applies
#    caption: "One sentence on what this shows."

# drafts: which drafted parts of the page still carry a DRAFT tag. Clear them
# one at a time as each is reviewed, rather than all at once with the
# pattern's status.
#
# `tale`, `antiPattern` and `demo` cover the three things above the fold. An
# opening incident is the most authoritative-looking prose on the page — a
# dated, cited paragraph about something that really happened — so a freshly
# written one has to be able to say it has not been checked yet. The demo has
# no heading of its own, so its tag rides on the `demoNote` line, which is
# rendered for the tag alone when there is no note to carry.
# drafts:
#   tale: true
#   antiPattern: true
#   demo: true
#   whenToUse: true
#   considerations: true
#   examples: true

# --- Learning log -----------------------------------------------------------
# openQuestions renders as the "Still figuring out" block. It shows whenever
# there is at least one question; set showOpenQuestions: false to keep them in
# the file but off the page.
openQuestions: []
#  - "What is still unresolved about this pattern?"
# showOpenQuestions: true

# --- Diagrams ---------------------------------------------------------------
# 3–6 steps work best. Add `note:` to hang an annotation under a step, and
# `key: true` on the one step that is the pattern's key moment.
#
# A step `note:` is for design advice the steps alone do not carry — "friction
# scales with consequence", "hand off at a designed boundary". It is NOT the
# place for evidence: if a note states a fact the Sources section already
# states, the page is saying the same thing twice and the note is the weaker
# copy, because it has no citation and no room to explain itself. Put the
# fact in the source's own `note:`, or in the body where it can be cited, and
# leave the step without one.
steps:
  - title: "Step one"
    detail: "Short detail"
  - title: "Step two"
    detail: "Short detail"
    note: "Optional annotation."
  - title: "Step three"
    detail: "Short detail"
    key: true

# antiPattern: the name of the mistake the "without" panel shows. A named
# mistake operators actually make, not just the absence of the pattern. Leave it
# out if the left side is only a gap.
# antiPattern: "One-Tap Catastrophe"

# interface: show built interface screens in the without / with section
# instead of the box diagram below. Only patterns with an illustration built
# for them can use it; the names that exist are listed in lib/schema.ts
# (INTERFACE_COMPONENTS). Leave it out and the box diagram is used.
# interface:
#   component: "drone-release"

without:
  steps: ["Beat one", "Beat two", "Bad outcome"]
  caption: "What goes wrong without the pattern."

with:
  steps: ["Beat one", "Beat two", "Good outcome"]
  caption: "What the pattern makes possible."
---

## Problem

The tension this pattern resolves, framed as competing forces — "the machine
must keep going *and* the human must be ready". One to three short paragraphs.

## When not to use

- Where the cost of the pattern outweighs what it buys.
- Another exclusion.

## In the field

Prose above the example figures, if the figures need an introduction.

## Notes

Free-form research notes.
