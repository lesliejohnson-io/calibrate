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

Three of these are **printed displays**: a fixed-width readout that prints one
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

### 05 Shared Mental Model — `autothrottle`

Asiana Airlines Flight 214 as a thing you fly. The reader is given a job —
hold the dot on the line with the arrow keys — and the airspeed is left to the
autothrottle, as the crew left it. Four seconds in, the autothrottle stops
managing speed and the airspeed falls 2 kt/s from 137.

- **Without:** the mode label changes `SPD` → `HOLD` in the same color as every
  other label. Nothing else, until a `⚠ LOW AIRSPEED` warning at 112 kt.
- **With:** the label becomes `AUTOTHROTTLE HOLD: not managing speed`,
  emphasized once rather than looping, and the speed turns amber with a ▼ and
  the word "falling" the moment it drops below target.

"Add power" ends the run with the speed it was caught at; at 110 kt it ends
with "You noticed too late." Mode changes are announced via `aria-live` only
on the With side — the Without side's silence is the anti-pattern — but the
result is announced on both.

### 15 Stop Anywhere — `stop-anywhere`

A warehouse robot crossing an aisle, with two stop controls on the device:
"Stop (operator)" and "Stop (someone nearby)". Both are drawn red on yellow,
because that combination is the pattern's first design consideration and a
demo of an emergency stop that invents its own colours would be arguing
against itself. Press Start, then try either one.

- **Without:** the operator's stop prints `STOPPING…` and the robot halts —
  then, with nobody asking, `RESUMING: COMPLETING SAFE-PARK MANEUVER` prints
  and it moves off again. Pressing the same control now prints
  `⚠ STOP UNAVAILABLE DURING MANEUVER`. The bystander's control is wired to
  nothing and prints `⚠ NO EXTERNAL STOP`.
- **With:** either control halts the robot at once and prints
  `STOPPED. HOLDING UNTIL RELEASED.` and `SAFE-PARK MANEUVER · SUSPENDED`.
  Pressing a stop that is already in prints `ALREADY STOPPED · HOLDING`
  rather than doing nothing. Moving again takes a two-second hold on
  "Release", which is deliberately *not* red on yellow — releasing is not an
  emergency control, and reserving those colours only works if nothing else
  wears them. Letting go early cancels.

Under `prefers-reduced-motion` the travelling block is replaced by the same
position written out — `AISLE 4 · 42% ACROSS · MOVING` — so progress is
reported in text and nothing on screen moves.

No figure in this demo comes from the pattern's sources, because none of them
describe a robot: the aisle, the robot and the timings are invented. What is
taken from the sources is the behaviour — a machine that treats its own stop
as a pause and completes a planned maneuver anyway, and a stop that latches
until an intentional human action releases it.

### 04 Appropriate Friction — `drone-release`

The same payload release on both sides, in the same green on black as the
printed displays. Both sides are playable, and both end with the payload over
zone B — what differs is what it cost to get there.

- **Without:** one tap, click or Enter on "Release payload" and it is gone.
  No confirmation, nothing named beyond the menu item. The panel prints
  `Payload released over zone B.`, the Payload cell goes Armed → Released, and
  the control is dead until Reset. The hint underneath then reads "One tap. No
  way to undo."
- **With:** the consequence is on the button — "Release payload over zone B" —
  and it takes a two-second hold, with the elapsed time swept behind the
  label. Let go early and nothing happens. The same outcome prints on success.

Both sides announce the outcome through a `role="status"` line, offer a Reset
that returns the panel to Armed, and work from the keyboard: Enter or Space
taps on the Without side, and holding either for two seconds releases on the
With side. Focus moves to Reset once the payload is gone, and back to the
control on Reset.

An earlier version left the Without side inert on the grounds that there is
nothing to demonstrate about a button that just fires. There is: how little it
asks of you is the demonstration, and it only lands if the reader's own tap is
what does it.

No figure here comes from the pattern's sources. The Therac-25 investigation
describes a radiation therapy console, not an aircraft, and staging a real
overdose as something a reader triggers was not the intent — so the drone,
zone B and the 120 m altitude are invented. What is taken from the sources is
the behaviour: an irreversible action one keystroke deep, on a machine whose
pauses the operator had learned to clear.

Nothing in this demo is red. A fault on these displays is brighter green with
more weight and a glyph (`.fc-line.is-fault`); red on yellow is reserved for
the emergency stops in Stop Anywhere.

## To build

Concepts go here as they are decided. Until a pattern has one, its `review:`
list should say so rather than this file carrying a placeholder.

<!-- Paste the demo list here. One heading per pattern, in the shape of the
     built ones above: what the reader does, what the Without side does, what
     the With side does, and any figure that has to come from a source. -->
