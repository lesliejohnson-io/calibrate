# Pattern demos

Every pattern page carries an interactive without / with demo in place of the
old static diagram. This file is where each pattern's demo concept is written
down before it is built.

A demo is wired to a pattern by `interface.component` in its frontmatter, and
the component name has to be in `INTERFACE_COMPONENTS` in `lib/schema.ts` or
the build fails. A pattern with no demo yet carries
`Needs demo (see DEMOS.md)` in its `review:` list.

## What a demo has to do

- **Be the control, not a picture of one.** The reader operates it. The note
  above it says so: "A working demo of the control, not a screenshot."
- **Show the anti-pattern honestly.** The Without side is a real interaction
  that really goes wrong, not a disabled mock-up. Where there is genuinely
  nothing to demonstrate — a button that just fires — say so and leave it
  inert, as the drone release demo does.
- **Never invent data.** No real map, telemetry, product or place. Numbers
  that appear must come from the pattern's own sources, in the units those
  sources use.
- **Work from the keyboard**, including arrow-key choices, and move focus to
  whatever replaces a control it removes.
- **Respect `prefers-reduced-motion`.** Drop the animation, keep the outcome:
  the information is the end state, not the movement.
- **Never rely on colour alone.** A fault state carries a shape or a word as
  well — the ⚠ and "Off the approach", not just red.
- **Announce results** through a `role="status"` line, and offer a reset.

## Built

Two of these are **printed displays**: a fixed-width readout that prints one
line per 120ms, all at once under `prefers-reduced-motion`, in green on black
to read as a flight deck instrument rather than as part of the page. They
share one engine, `components/illustrations/printout.tsx`.

Neither carries a "not real data" disclaimer. The demos stage real accidents,
so the standing rule below — never invent data, and take every figure from
the pattern's own sources in the units those sources use — is what keeps them
honest, rather than a line of small print underneath.

### 06 Intent Preview — `flight-computer`

A printed display. The reader types `R` and presses Enter.

- **Without:** prints `MATCH FOUND ROMEO`, `DIST 132 MI`, `EXECUTING`,
  `TURNING`, and then the active route the crew was flying is struck out and
  `── route cleared ──` prints. Nothing was confirmed, and there was no moment
  in which it could have been.
- **With:** the same entry prints `2 MATCHES — CHOOSE ONE` and both of them —
  ROZO on the approach, ROMEO off it and flagged with ⚠ and the words "Off
  approach". Choosing one draws the route it would fly in a dashed box
  labelled "Proposed · not active". Nothing turns until Approve. Approving
  ROMEO still flies to ROMEO: a preview is not a veto.

The distance is 132 **statute** miles, per the Flight Safety Foundation's
figure of 212 km. Earlier drafts said "132 nm", which is wrong — see the
pattern's `review:` list.

### 10 Explainable Fault — `explainable-fault`

A printed display. The reader triggers the fault on each side.

- **Without:** prints `STICK SHAKER`, `IAS DISAGREE`, `ALT DISAGREE`,
  `STAB TRIM MOVING` one after another, with no cause. Then it asks
  "What's wrong?" and offers Speed trim, Autopilot, Pitot heat, Hydraulics.
  Every answer prints the same verdict: "You're guessing. So was the crew."
  Speed trim is listed first because it is the system the previous day's
  captain actually named — the guess was competent, not careless.
- **With:** the same four readings print underneath the condition that
  produced them — `AOA DISAGREE`, with the plain-language gloss — then
  `▣ CHECKLIST  AOA DISAGREE`, then `FAULT LOGGED → MAINTENANCE`.

Nothing is added to what the aircraft knew: the sensors had already
disagreed. The checklist label is named for the condition rather than quoting
a real 737 checklist, which none of the pattern's sources give — see its
`review:` list.

### 04 Appropriate Friction — `drone-release`

The payload release behind a two-second hold, with the consequence written on
the button. The Without side is deliberately inert: there is nothing to
demonstrate about a button that just fires.

## To build

Concepts go here as they are decided. Until a pattern has one, its `review:`
list should say so rather than this file carrying a placeholder.

<!-- Paste the demo list here. One heading per pattern, in the shape of the
     built ones above: what the reader does, what the Without side does, what
     the With side does, and any figure that has to come from a source. -->
