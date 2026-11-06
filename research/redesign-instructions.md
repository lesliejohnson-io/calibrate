# Instructions for Claude: redesign the Calibrate site

Save this as `research/redesign-instructions.md`, then in Claude Code from the repo root say:
"Follow research/redesign-instructions.md. Start with change 1."

---

## Goal

Make the site simpler, easier to read, and stop it looking AI-generated. The visual direction comes from the logo: a machine nameplate. That means condensed type for labels, ruled boxes, strong edges, and color that means something, the way an operator console uses it. Drop the editorial-magazine styling: paper texture feel, decorative accent color, pills everywhere, soft rounded cards.

## How to work

- **One change at a time, in the order below.** After each change, run the build, check it in the browser (light and dark mode, desktop and 375px mobile), then stop and show me screenshots before starting the next one.
- **Read before you change.** Start by reading `app/`, `components/`, the styles, `content/_template.md` (or whatever the template file is called), and two existing patterns, so you understand how pages are built from frontmatter.
- **Don't change pattern content** (text, sources, facts) except where a step below says to add a field.
- **Accessibility is required, not optional.** Color never carries meaning on its own; always pair it with text and a shape or icon. Meet WCAG AA contrast in both themes. Everything interactive works by keyboard, and motion respects `prefers-reduced-motion`.
- **Do not commit or push.** I make all commits myself.

---

## Change 1: Color system first (supports everything else)

Do this first, even though it's numbered 5 in my list, because every other change uses it.

- Remove the five moment colors and the decorative rust accent.
- **Use the exact values in `research/colors.css`.** Don't pick your own. Merge them into the site's existing styles and theming approach (keep the existing light/dark toggle working), and rename any existing variables that now duplicate these tokens.
- What each token is for:
  - `--bg` page, `--surface` cards and screens, `--panel` readout cells and console bezels
  - `--ink` all text, diagrams and the loop; `--muted` secondary text
  - `--edge` borders on controls, buttons and readout boxes (passes 3:1); `--rule` decorative dividers only
  - `--status-nominal` ● low risk, reversible
  - `--status-caution` ▲ elevated risk, costly to reverse
  - `--status-fault` ■ critical risk, irreversible; `--on-fault` is text on a fault-filled button
  - `--tint-*` backgrounds behind status values (readout cells); text on a tint uses the matching status color
- Status colors appear **only** where something has a status, and always with their shape (● ▲ ■) and a text label. Color is never the only cue.
- Everything else is ink on background. Links are ink with an underline. The "key moment" step in the mechanism diagram is shown with a heavier ink border and a "Key moment" label, not a color.
- Every text pair in the file already passes WCAG AA in both themes. If you combine tokens in a way the file doesn't (for example, status text on `--panel`), check the contrast and tell me.
- See `research/color-system-light.png` and `research/color-system-dark.png` for how it should look.

## Change 2: Cut most mono labels

- Section headings become normal sentence case in the body or heading font: "The mechanism", "Without / with the pattern" (renamed in change 7), "Sources", "Papers", "Incident reports", "Notes", "On this page".
- Remove the small uppercase letter-spaced "eyebrow" labels that sit above headings.
- The "PATTERN 04 · BEFORE" line becomes plain text: "Pattern 4". Drop the BEFORE pill; the breadcrumb already says Before.
- Keep monospace **only** for data values: Critical, Irreversible, Levels 1–5, dates, step numbers.

## Change 3: Metadata strip becomes an instrument readout

- Replace the current label/value strip with a readout panel: ruled boxes in a grid, like a console status display, using condensed type for the labels.
- **Risk** and **Reversibility** each show their value with the status shape and color:
  - risk: low → nominal, elevated → caution, critical → fault
  - reversibility: reversible → nominal, costly → caution, irreversible → fault
- Trust jobs, autonomy, domains and updated are shown as plain values in the same grid, no status color.
- Remove Status from the readout (see change 4).
- Must reflow cleanly to two columns on mobile.

## Change 4: Cut redundant tags on cards

- When the home page is grouped by moment, don't show the moment tag on cards.
- Remove the DRAFT tag from cards and from the pattern page readout.
- Add one site-wide line instead, near the top of the home page: "All patterns are drafts and change as I learn. Status is shown only once a pattern has been reviewed." Show a status tag on a card or page only when status is `reviewed` or `stable`.
- Keep the trust-job tag on cards only if it isn't already shown elsewhere on the card; otherwise remove it.

## Change 5: The loop becomes the hero

- At the top of the home page, replace the thin colored moment rail with a large drawn loop (SVG): five stations in order, Before → During → Transition → Failure → After and over time, with a visible arrow from After and over time back to Before. The return arrow is the point; make it as clear as the forward arrows.
- Each station shows its name, its question in one short line, and its pattern count. A station with no patterns says "None yet" rather than 0.
- Each station links to its section on the page.
- Ink only, no moment colors.
- Mobile: if the loop gets too small to read at 375px, switch to a vertical sequence with the return arrow drawn up the side.
- Rename the fifth moment's display label to **"After and over time"**, with the question **"What happened, and what is it doing to us over time?"** Keep the data value `after` unchanged so existing files still work. Update the comments in the template to match.

## Change 6: Show an interface instead of a second box diagram

- Add an optional frontmatter field so a pattern can show interface illustrations in the Without / with section instead of the box diagram. Suggested shape (adjust to fit the codebase, and tell me what you chose):

  ```yaml
  interface:
    component: "drone-release"   # which illustration to render
  ```

- If a pattern has no `interface` field, keep showing the existing without/with box diagram. Nothing breaks for other patterns.
- Build the `drone-release` illustration for Appropriate Friction as two small drone-console screens side by side (stacked on mobile):
  - **Without:** a payload panel with a single button, "Release payload". One tap.
  - **With:** the same panel with a hold-to-confirm button that reads "Release payload over zone B" and a progress ring or bar that fills over two seconds while held.
- Make the "with" button actually work as a demo: press and hold to fill, release early to cancel, reaching full shows "Released over zone B". Keyboard: hold Space or Enter. With reduced motion, show the filled state change without animation. Label clearly that it's a demo.
- Use the status colors honestly: the hold button is fault-colored because the action is irreversible.
- Draw it in the console visual language from change 3, not as a phone mockup.
- Add `interface: { component: "drone-release" }` to Appropriate Friction's frontmatter.

## Change 7: Name the anti-pattern

- Add an optional frontmatter field `antiPattern: "Name"`. When present, the "Without" label becomes "Anti-pattern: Name". When absent, it stays "Without".
- For Appropriate Friction: `antiPattern: "One-Tap Catastrophe"`.
- Add the field to the template with a comment: "A named mistake people actually make, not just the absence of the pattern. Leave it out if the left side is only a gap."

## Change 8: Fix the empty-looking Jump to box

- The collapsed "Jump to" bar looks like an empty input field. Replace it with something that is clearly a control: either a row of section links visible at mobile widths, or a button labeled "On this page" with a chevron that opens the list.
- Make sure it doesn't appear at widths where the "On this page" sidebar is already showing.

---

## When you're done with each change, tell me

1. What files you changed.
2. Screenshots: home page and Appropriate Friction, light and dark, desktop and mobile.
3. Any decision you made that I didn't specify.
4. Whether the build passed.
