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

Eight of these are **printed displays**: a fixed-width readout that prints one
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

A printed display, titled `Ground control station · Console 2`. The reader
triggers the fault on each side. Rethemed from a 737 flight deck to the
Nogales ground control station when the pattern's opening story changed; the
component, the controls and the shape of both screens are unchanged.

- **Without:** prints `ALT FALLING`, `AIRSPEED FALLING`, `ENGINE —` one after
  another, with no cause. Then it asks "What's wrong?" and offers Fuel, Data
  link, Engine, Generator. Every answer prints the same verdict: "You're
  guessing. So was the pilot." Fuel is listed first because it is the right
  answer and still unreachable from this screen — the demonstration is that a
  competent guess has nothing to settle it against.
- **With:** the same three readings print underneath the condition that
  produced them — `ENGINE FUEL CUTOFF`, with the lever named and the action to
  take — then `LOGGED · SENT TO MAINTENANCE`.

Nothing is added to what the station knew: the lever position was already
readable by the machine. The only difference is that the display says so.

The brief asked for the named alert to lead with `■`. It leads with the `⚠`
the printed displays already use for a fault line (`.fc-line.is-fault`),
because `■` is the facet vocabulary's fault shape and these displays have
their own. Worth settling which one a demo uses.

The readouts are written for the page rather than taken from the brief of
accident, and the accident is real, so this demo carries
`demoNote: "Simplified illustration, not real ground station data."`

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

A printed display, titled `Driverless forklift · Aisle 4`, with a top-down
aisle under it: fifteen slots, the forklift a `▣` and the person a `●`, with a
legend line naming both shapes. Rethemed from a pitch gauge when the pattern's
opening story changed; the panel style, Play and Reset, and the captions are
unchanged.

The aisle is drawn in characters inside the display rather than as positioned
elements, so it needs no animation and no stylesheet of its own. Both sides
have a Play button and one control that toggles between "Step into the aisle"
and "Step out".

- **Without:** the forklift stops when the person steps in. When they step
  out, it waits two seconds and moves off by itself, printing
  `⚠ MOVING AGAIN / nobody asked. nobody checked.` Clearing its sensors was
  all the permission it needed.
- **With:** stepping in prints `⚠ HOLD · person in path` and the forklift
  latches. Stepping out prints `Path clear · resume at the vehicle` and the
  forklift stays held. A "Resume" button is present throughout and unavailable
  while anyone is in the path — being unable to press it is the difference
  from the other screen, which a hidden button could not show.

The aisle is not a live region. The forklift moves far more often than a
screen reader could follow, so the announcements are made at the moments that
matter through the `role="status"` line each screen owns; the aisle itself
carries a `role="img"` label with the forklift's slot and whether anyone is in
it.

No figure here comes from the pattern's source, which describes a water
bottling plant rather than this aisle: the fifteen slots, the two-second delay
and the wording are written for this page. What is taken from it is the shape
of the failure — a machine that treats a stop as a pause and starts again on
its own once its sensors clear. It carries
`demoNote: "Simplified illustration."`

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

### 07 Capability Disclosure — `capability-disclosure`

A printed display. A road picker with two options and an "Engage Autosteer"
button.

- **Without:** on either road, Engage prints `AUTOSTEER ON` and, under it,
  "See owner's manual for limitations." The road class makes no difference to
  anything, which is the anti-pattern: the limit is written down in the one
  place that cannot stop it.
- **With:** on US-27A the Engage button is present and unavailable, and the
  panel prints "Autosteer unavailable: this road has cross traffic. Available
  on limited-access highways." On I-75 it engages and says which road class it
  is on. Switching back to US-27A *while engaged* prints "Leaving supported
  roads. Autosteer ending in 10 seconds, take the wheel", and ten seconds
  later `AUTOSTEER OFF · you have the wheel` — the re-check while running,
  which a start-up gate alone would miss.

US-27A is the road in NTSB/HAR-17/02. I-75 is not named anywhere in that
report; it is a real limited-access highway written in for the contrast, and
the pattern's `review:` list says so. The handback line after the countdown is
also written here, so a countdown the reader starts actually resolves. No
speed, time or sensor reading is invented: the demo turns on road class, which
is what the report says the firmware could determine and placed no restriction
on. It carries `demoNote: "Simplified illustration."`

### 11 Readiness Check — `readiness-check`

A printed display with two things the reader sets — "Hand on wheel" and "Eyes
on: road / phone" — and a Play button. Ten seconds of driving, then a hazard.

- **Without:** the check senses the hand. With a hand on the wheel and eyes on
  the phone it prints `Driver engaged ✓` and keeps saying so, because that is
  all it measured. At ten seconds the hazard arrives — `⚠ Barrier ahead.` —
  and if the eyes are still on the phone it adds "The system thought you were
  engaged. You were looking at your phone."
- **With:** the check watches the eyes, and the four-rung ladder is on screen
  before the lapse, the way the fallback states are in Graceful Degradation.
  Moving the eyes to the phone climbs it one rung every four seconds: "Eyes on
  road, please", then a chime line, then a spoken-prompt line, then
  `⚠ No response. Slowing to a stop.` Looking back at the road at any rung
  abandons the ladder and prints "Thanks. Assistance continuing." — the point
  is to get the driver back, not to win.

The rungs and the ten seconds are paced in real time on both sides, including
under `prefers-reduced-motion`: how long a system waits before insisting is
the content here, and nothing flashes or moves — only the line-by-line
printing is dropped. Nothing in the demo is a reading from NTSB/HAR-20/01: the
toggles, the timings and the rung wording are written for this page. What is
taken from the report is the failure — engagement assessed from steering wheel
torque, no hands detected for the final six seconds, and no alert raised in
the last fifteen minutes. The ladder's shape, ending in a slowdown to a stop,
is Super Cruise's. It carries `demoNote: "Simplified illustration."`

### 08 Provenance Log — `provenance-log`

A warehouse robot's speed setting, changed by three parties. The reader makes
each change: "You change it", "Remote fleet team changes it", "Robot
auto-adjusts". Each party has its own value, so after all three the panel can
ask "Who set the speed to 12 km/h?" and the question has one answer whatever
order they were pressed in.

- **Without:** two cells, Max speed and "Last changed: 2 min ago". Both true,
  neither an answer. Any answer to the question prints "⚠ No record of who.
  It's your word against the system."
- **With:** the same three changes are an append-only log — time, actor, old →
  new value, software version — printed as the reader makes them. Every entry
  carries an "Edit" control that is wired up and refuses: "Entries can't be
  changed. Add a correction instead." The answer is already on screen, so
  answering reads it back off the log rather than revealing it.

Nothing here comes from the pattern's sources, which describe a Tesla, a Tempe
crash and a UK accounting system rather than a warehouse: the robot, the
speeds, the 09:14–09:21 clock and the `sw 4.21.3` version string are written
for this page. What is taken from the sources is the shape of the entry —
actor, timestamp and software version, which is what UN R157 paragraph 8.3
requires — and the property that makes it worth keeping, that the party to a
dispute cannot revise it. It carries `demoNote: "Simplified illustration."`

The `→` in a log entry is the second arrow inside a printed display on the
site, after the one in Operator-to-Operator Handover, and carries the same
caveat: `.fc-line` is a fixed monospace stack, so the character can fall back
if a font in the stack lacks U+2192.

### 09 Learning Loop — `learning-loop`

A printed display titled `Bow doors`, with a bridge status card above the
readout — `Ferry · Bridge`, a sailing counter and a door status row — and, on
the patterned side, the report's status track below it. Both sides have
"Report it" and "Next sailing". The reader plays a master who finds the bow
doors open after departure.

- **Without:** the door row reads "no indicator". "Report it" adds
  `Request: fit a door indicator on the bridge · Filed` to a Reports list and
  nothing else changes; it can be pressed again and again, and each press adds
  another identical record. "Next sailing" meets the same event. After three
  sailings the display says what it has been doing: "Three reports. Still no
  indicator. Nobody who could fit one saw them."
- **With:** reporting is one tap, labelled "no blame", and the report then has
  a status track — ○ Received, ○ Routed to the fleet's technical team,
  ○ Change made. Each "Next sailing" advances it one stage: "Routed · 3 other
  masters reported this", then "Change made · door indicators fitted on the
  bridge". On the sailing after that the door row reads `● CLOSED` before
  departure and the reader is told "Fitted because of your report."

The track's stages carry ● done and ○ pending plus the words, with "done" and
"pending" written out for a screen reader, so a stage never rests on colour or
on position. Nothing in the demo animates: the bridge card, the track and the
Reports list are state, and only the line-by-line printing is staggered, which
`usePrinter` already drops under `prefers-reduced-motion`.

Nothing here comes from the Sheen Report, which describes a ferry rather than
this console: the sailing counter, the three sailings and the "3 other
masters" figure are written for this page. What is taken from it is the shape
of the failure — a report filed in writing, with the fix named in it, that
stopped at management. It carries `demoNote: "Simplified illustration."`

## To build

Concepts go here as they are decided. Until a pattern has one, its `review:`
list should say so rather than this file carrying a placeholder.

<!-- Paste the demo list here. One heading per pattern, in the shape of the
     built ones above: what the reader does, what the Without side does, what
     the With side does, and any figure that has to come from a source. -->
