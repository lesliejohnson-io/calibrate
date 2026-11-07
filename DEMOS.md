# Pattern demos

Every pattern page carries an interactive without / with demo in place of the
old static diagram. This file is where each pattern's demo concept is written
down before it is built.

A demo is wired to a pattern by `interface.component` in its frontmatter, and
the component name has to be in `INTERFACE_COMPONENTS` in `lib/schema.ts` or
the build fails. A pattern with no demo yet carries
`Needs demo (see DEMOS.md)` in its `review:` list.

## What a demo has to do

- **Be the control, not a picture of one.** The reader operates it. There is
  no caption saying so — the demo has to read as operable on sight, and a
  line of text promising that it is would be covering for a demo that
  doesn't.
- **Show the anti-pattern honestly.** The Without side is a real interaction
  that really goes wrong, not a disabled mock-up. Even a button that just
  fires is worth wiring up: how little it asks of the reader is the
  demonstration, and it only lands if their own tap is what does it.
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

Seven of these are **printed displays**: a fixed-width readout that prints one
line per 120ms, all at once under `prefers-reduced-motion`, in green on black
to read as a flight deck instrument rather than as part of the page. They
share one engine, `components/illustrations/printout.tsx`.

Their lines never wrap. `.fc-line` is `white-space: pre` and the type is a
fixed 14px mono with no responsive step, so a line wider than the column runs
off the screen instead of folding. How wide the column is depends on the
layout: 437px at a viewport narrow enough to drop the sidebar rail, 367px at
a wider one with the rail showing. Write to the narrower figure, and leave
room under it — a line at 90% of the column is a line that overflows on the
next layout change.

Sentences are therefore split by hand across several lines, with continuations
indented two spaces, and the `role="status"` text puts each sentence back
together so a screen reader hears it whole. To check a screen, print its
longest line into a hidden `.fc-line` inside a `.console-crt` and measure it
with a `Range`: a block element's own `scrollWidth` is floored at the column
width, so it cannot tell you a line fits, only that it does not.

Most carry no "not real data" disclaimer. The demos stage real accidents, so
the standing rule above — never invent data, and take every figure from the
pattern's own sources in the units those sources use — is what keeps them
honest, rather than a line of small print underneath.

The exception is a demo a reader could take for a record of what happened.
Four carry a note. Explainable Fault and Return of Control both stage real
accidents with readouts written for the page, so both say "Simplified
illustration, not real flight data." The Glass Box and The Handoff invent
their scenes outright — a forklift, a motorway lane closure — and say the
shorter "Simplified illustration." A demo opts in with `demoNote` in its
pattern's frontmatter; the field is deliberately per-pattern, because a
disclaimer on every demo is small print nobody reads.

Where exactly the line falls is not settled. Appropriate Friction invents its
scene as plainly as The Glass Box does — a drone, a zone B, an altitude, none
of them in the Therac-25 investigation — and carries no note, on the grounds
that nobody could mistake it for the accident. The same argument covers a
forklift standing in for a missile battery. Decide the rule once and apply it
to both.

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

The symptom lines are written for the page rather than taken from the
recorder, and the accident is real, so this demo carries
`demoNote: "Simplified illustration, not real flight data."`

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

### 02 The Glass Box — `glass-box`

A printed display. An autonomous forklift reports on aisle 7, and both sides
are wrong about it in the same way: a worker is kneeling behind a pallet,
where the camera cannot see. Both sides let the reader proceed. What differs
is whether there was anything on the display to check the verdict against.

- **Without:** prints `AISLE 7: CLEAR` and asks "Proceed?". Nothing stands
  behind the line. Either choice then reveals the worker, and proceeding adds
  "The system was sure. You had nothing to check it against." Holding is
  allowed, but the hint says what it was worth — "You held, but nothing on the
  display told you to. Next time you won't."
- **With:** the same verdict, `AISLE 7: CLEAR, because:`, over the three
  reasons that produced it, each carrying how sure the machine is: lidar
  high, camera low because a pallet is partly blocking the view, and when a
  person was last seen in the aisle. The low-confidence line is the one that
  matters, and a blocked camera is something a person in the aisle can reason
  about.

Proceeding stays available on the With side, and the demo says so — "The
difference is that this time it was a judgement." A glass box is not a veto,
and a demo that punished the reader for proceeding would be arguing for a
different pattern.

Both sides announce the outcome through a `role="status"` line, which carries
each hand-split sentence whole, and move focus to Reset once the aisle is
revealed.

No figure here comes from the pattern's sources, which describe a Patriot
missile battery rather than a warehouse: the aisle, the two sensors and the
40 seconds are written for this page. What is taken from the sources is the
shape of the failure — a confident classification whose basis the operator
cannot inspect. Because the readouts are invented, it carries
`demoNote: "Simplified illustration."`

### 01 The Handoff — `handoff`

A printed display. The car is driving; on both sides it is about to stop.
What differs is how much warning there is, and whether anything explains the
situation before the reader owns it.

- **Without:** prints `AUTOPILOT · 62 mph`, then `TAKE OVER NOW` with no
  notice and a two-second countdown. Press "I have control" in time and it
  prints "You have control. / You don't know why." Miss it and it prints
  "Too late." Winning the race is the point: what the reader gets is the car
  and no idea what it was about to meet.
- **With:** the same transfer announced fifteen seconds out, with the three
  things the reader needs — why (construction zone, lane closes in 400 m),
  now (62 mph, lane clear) and next (you'll need to merge left). Control
  moves only when they press "I have control". If nobody answers, the car
  does not drop the wheel: it prints "No response. / Slowing to a stop on the
  shoulder."

The countdown runs in real time on both sides, including under
`prefers-reduced-motion`. A number changing once a second is the content
here, not decoration — the whole demo is about how much time there is — and
nothing flashes or moves. It is not a live region either, because a tick a
second is noise in a screen reader; the `role="status"` line announces the
start and the outcome instead.

No figure here comes from the pattern's source, which describes a 2018 crash
in Tempe rather than a motorway lane closure: the speeds, the construction
zone and both countdowns are written for this page. What is taken from the
source is the shape of the failure — a design that depends on a person taking
over, with nothing useful reaching them before the moment it needs them. It
carries `demoNote: "Simplified illustration."`

### 12 Return of Control — `return-of-control`

A printed display with a live pitch gauge under it: a number and a marker on
a fixed scale, rendered rather than printed, because it is the current state
and not another entry in the log. Both sides have a Play button and a "Push
nose down" button; the automation wants the nose up.

- **Without:** every push moves the nose down, and the automation walks it
  back to its target a beat later, printing nothing. The reader can win any
  single round and still be losing. After fifteen seconds the screen says
  what it has been doing: "The automation countered you [N] times. / Nothing
  on the display told you."
- **With:** the first push prints `AUTOPILOT OFF · you have pitch control` and
  the automation stops acting. The nose stays where the reader puts it.
  "Resume autopilot" is a separate, deliberate press, and prints "Autopilot
  resumed at your request."

The gauge is not a live region. The marker moves far more often than a screen
reader could follow, so the announcements are made at the moments that matter
through the `role="status"` line each screen owns.

No figure here comes from the pattern's sources, which describe an approach
to Nagoya in 1994 and two 737 MAX accidents: the scale, the degrees, the
fifteen-second window and the counter are written for this page. What is
taken from them is the shape of the failure — a correction reversed without
anything saying so. It carries `demoNote: "Simplified illustration, not real
flight data."`

### 13 Operator-to-Operator Handover — `shift-handover`

A printed display on both sides, showing a console with two condensate pumps
at the moment a day shift hands over to a night shift. The reader plays the
incoming night-shift operator. Both sides end with the other pump tripping
and the obvious move being to start the first one.

- **Without:** the handover is a free-text note. "Pump A: maintenance today. /
  All good otherwise." Every word of it is true. Then `PUMP B TRIPPED. / Start
  Pump A?` and a "Start Pump A" button. Pressing it prints "Pump A started. /
  Its safety valve had been removed."
- **With:** the same state arrives in fixed fields, with `DISABLED` first and
  most prominent — "Pump A · safety valve removed / do not start" — then
  `IN PROGRESS` and `NORMAL`. Nothing is handed over until the reader says
  back what is switched off, by choosing Pump A from the equipment on the
  console; Pump B prints "Not accepted. / Read the DISABLED section." and lets
  them try again. Choosing Pump A prints "Handover accepted · / day shift →
  night shift", then the trip, then "Pump A disabled: / safety valve removed."
  The "Start Pump A" button appears and is unavailable.

The say-back is a real gate rather than a checkbox: the demo will not proceed
on the wrong answer. The refusal is a control rather than a sentence — the
button is present and disabled — because being unable to press it is the
whole difference from the other screen.

`PANEL_LINES` is a floor, not a cap: the structured handover is four lines
longer than the note, which is the point, so the With panel ends taller.

The arrow in "day shift → night shift" is the only one inside a printed
display on the site. `.fc-line` is a fixed monospace stack, so that one
character can fall back if a font in the stack lacks U+2192.

Nothing here comes from the pattern's sources, which describe a platform
control room in 1988: the two-pump console, the field names, the wording and
the equipment list are written for this page. What is taken from them is the
shape of the failure — two true facts held apart, and a handover that
depended on one person joining them up. It carries
`demoNote: "Simplified illustration."`

## To build

Concepts go here as they are decided. Until a pattern has one, its `review:`
list should say so rather than this file carrying a placeholder.

<!-- Paste the demo list here. One heading per pattern, in the shape of the
     built ones above: what the reader does, what the Without side does, what
     the With side does, and any figure that has to come from a source. -->
