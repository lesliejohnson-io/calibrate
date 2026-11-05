# Trust Layer Patterns — redesign handoff

Implementation spec for the redesign of trust-layer-patterns.vercel.app. The visual reference is the Claude design canvas "Trust Layer Patterns redesign" (two artboards: **Index — rail navigation** and **Pattern page — The Handoff**). Read the canvas for layout; use this file for exact values and rules.

**Repo rule:** make the changes, but do not commit or push. Leslie makes all commits herself.

---

## 1. Tokens

### Color

| Token | Value | Use |
|---|---|---|
| `--ground` | `#F6F6F3` | Page background |
| `--surface` | `#FFFFFF` | Cards, panels, inputs |
| `--ink` | `#141414` | Primary text, active states, rules |
| `--text-2` | `#2E2E2B` | Lede, body prose |
| `--text-3` | `#45453F` | Card intents, secondary text |
| `--muted` | `#5E5E5A` | Labels, meta, captions |
| `--rail-upcoming` | `#6E6E69` | Rail names not yet reached (passes 4.5:1 on ground) |
| `--line` | `#DEDED9` | Section dividers, header/footer borders |
| `--border` | `#E3E3DE` | Card borders |
| `--border-strong` | `#D4D4CE` | Inputs, chips, mechanism steps |
| `--loop` | `#C9C9C3` | Rail return path, upcoming dots |
| `--thumb-bg` | `#0A0A0A` | Thumbnail background |
| `--thumb-ink` | `#FFFFFF` | Thumbnail marks |
| `--fault` | `#C2410C` | Critical risk / irreversible / "Without it" — always paired with ■ |

Keep the existing dark-mode toggle; dark values are not designed yet.

### Type

| Role | Font | Size / line-height | Weight |
|---|---|---|---|
| Display (H1) | Inter Tight | 64 / 66, tracking −0.025em | 600 |
| Section head (H2) | Inter Tight | 30–32, tracking −0.015em | 600 |
| Card name | Inter Tight | 19 | 600 |
| Rail moment name | Inter Tight | 20 / 26 | 500 |
| Lede | Inter | 21 / 31 | 400 |
| Body | Inter | 16–17 / 25–27 | 400 |
| Card intent | Inter | 14 / 21 | 400 |
| Labels, numbers, meta | JetBrains Mono | 11–13, uppercase labels at 0.06–0.08em | 400–500 |

Load via `next/font/google`: Inter Tight (500, 600, 700), Inter (400, 500, 600), JetBrains Mono (400, 500).

### Layout

- Content max-width 1360px, side padding 40px.
- Header: TLP box mark + "TRUST LAYER PATTERNS" on **one line** (`white-space: nowrap`), nav: Patterns · About · Changelog · theme toggle (44×44 hit area).
- Card grid: `repeat(auto-fill, minmax(260px, 1fr))`, gap 24px.
- Radius 4px on cards and panels; pill radius on chips and tabs.

---

## 2. Index page

Two-column layout: **rail sidebar (240–290px)** + content. Wraps to one column under ~720px.

### Content column (top to bottom)

1. H1 "Trust Layer Patterns", lede (existing copy), meta line in mono: `15 patterns · updated YYYY-MM-DD · all drafts`.
2. **Illustration key** (new), mono 12px, inline: ▢ Machine · ○ Human · ■● Solid = in control. Optional fourth item: ◆ State or signal.
3. Controls band between two hairlines: search input · Group by (Moment / Trust job / A–Z) · Domain chips. Keep current behavior.
4. One section per moment: H2 name + question in muted text, then the card grid. Section `id="moment-{before|during|transition|failure|after}"`.

### Card

```
[thumbnail — full width, 240:132, background --thumb-bg]
04                         ← mono 12, muted
Appropriate Friction       ← Inter Tight 19/600
One-sentence intent.       ← 14/21, --text-3
INTERVENE                  ← mono 11 uppercase, pinned to card bottom
```

- Whole card is the link. Equal heights in a row (`height: 100%`, flex column, label `margin-top: auto`).
- Card intents are **one sentence**, no example. Examples move to the pattern page. Current trimmed copy is on the canvas; Leslie to review.
- Drop the "N sources" count from cards (it's on the pattern page).

### The rail (main navigation on the index)

A vertical stepper showing the control loop, Are.na-style.

**Behavior**
- `position: sticky; top: 24px; align-self: flex-start`. Under 720px: `position: static`, sits above content.
- Each moment links to its section (`#moment-…`).
- **Active moment follows scroll** (not in the mockup — implement with IntersectionObserver on the five sections; the topmost section crossing ~30% from the top viewport edge is active). Clicking also sets active.
- Active item expands to show its question (16/23, ink) and count (mono 12, muted). Others show the name only.
- Use `aria-current="true"` on the active link.

**States**
| | Name color | Dot | Inner line below dot |
|---|---|---|---|
| Passed (index < active) | `#45453F` | ink | ink |
| Active | ink | ink | ink |
| Upcoming | `--rail-upcoming` | `--loop` | `--loop` |

**Geometry** (x measured from the rail's left edge)
- Inner line: 2px wide, centered at x=23. Dots: 12px, centered x=23, 23px from the top of each item. Item text starts at x=48.
- Return path: 2px `--loop` line at x=3, running the full height between the two caps.
- **Bottom cap:** a half circle (r≈11) that starts directly under the After dot, curves down and left, and joins the return path. It hugs the dot, not the bottom of the After item, so it stays put when After is expanded.
- **Top cap:** a half circle (r≈11) over the top of the list that carries the return path across to x=23, then a short line down to a small solid triangle (10×8, `--loop`) pointing down onto the Before dot.
- Caption under the rail, 13px muted, indented to x=48: **"After feeds back into Before"**.

Build the loop as a single absolutely positioned SVG sized to the list if that's easier than per-item segments — but the bottom cap must track the After dot's position.

---

## 3. Pattern page

Two columns: article + right aside (240–280px). Aside drops below on narrow screens.

### Article order

1. Breadcrumb: All patterns / {Moment} / {Name}
2. Mono eyebrow `Pattern 01 · Transition`, H1, lede (intent).
3. **Mechanism — hero visual.** White panel. Steps as cards in a row (`repeat(auto-fit, minmax(150px, 1fr))`); the key moment is inverted (ink background, white text, label "03 · Key moment"). Step notes below as two short callouts with a 2px left rule.
4. Jump links as pills: When to use · Design considerations · Without / with · Examples · Related · Sources.
5. **When to use** (new field) — one short paragraph.
6. **Design considerations** (new field) — numbered list; each item = **bold rule.** + one or two sentences of why. Hairline between items.
7. **Without / with** — two panels; "With" has a 1.5px ink border.
8. **Examples** (new field) — grid of figures: image (4:3, `object-fit: cover`), credit caption, verdict label, one-sentence caption.
   - Verdict labels: `● Applies the pattern` (ink) or `■ Without it` (`--fault`). Never color alone.
9. **Related patterns** — compact cards: small thumbnail (88×48) + relation label (`Requires · 05`, `Follows · 03`, `Complements · 12`) + name + one-line note.
10. **Sources** — one numbered list, each row: number · title (link) + authors/year · type label (Paper, Book, Standard, Incident) right-aligned. Notes paragraph with superscript citation links sits above the list.
11. Pager: ← All patterns · Next in {moment} →.

### Aside

- Facts list (top rule in ink, hairlines between): Risk, Reversibility, Trust jobs, Autonomy, Domains, Status (`Draft · updated YYYY-MM-DD`). Risk/reversibility keep the ●▲■ shape + color.
- "On this page" TOC with a 2px left track; active item gets an ink segment and 600 weight. Track the active section with IntersectionObserver.

### Production rules

- **Hide "Needs your review" in production.** Render it only when `process.env.NODE_ENV !== 'production'` or behind a `?review` flag.
- Drafted content (When to use, Design considerations, Examples) shows a dashed "DRAFT" tag next to the heading until Leslie clears it. Drive this from a per-section `draft: true` flag in the data.

### New data fields (per pattern)

```ts
whenToUse: string;
considerations: { rule: string; why: string }[];
examples: {
  image?: string;          // path in /public
  alt: string;
  credit?: string;         // e.g. "BEA, AF447 Final Report, 2012, Figure 70"
  verdict: 'applies' | 'without';
  caption: string;
}[];
thumbnail: string;         // key into the thumbnail map below
drafts?: { whenToUse?: boolean; considerations?: boolean; examples?: boolean };
```

The Handoff's drafted content is on the canvas — copy it from there.

**AF447 image:** BEA, AF447 Final Report, 2012, Figure 70. Before publishing, confirm the BEA's reuse terms; the library is CC BY 4.0 and the credit line should note the figure is used under the BEA's terms, not CC BY.

---

## 4. Thumbnails

### Grammar (the rule every new pattern follows)

| Mark | Meaning |
|---|---|
| Square | The machine |
| Circle | A human |
| Solid fill | In control right now |
| Diamond | A neutral point: state, signal, outcome, a step in a log |
| Solid triangle | Direction (arrowhead) |

Circles are reserved for humans. Never use a circle as a generic dot. (Exception: the "!" point in Explainable Fault is punctuation.)

### Style

- One idea per image, centered, small and subtle: the mark occupies roughly a sixth of the frame width and the rest is empty black field.
- viewBox `0 0 240 132`, background `#0A0A0A`, marks `#FFFFFF`.
- The marks below are drawn at full size; the wrapper scales them to **0.32** around the center (card size) or **0.5** (88×48 related cards). Stroke is set inside the scaled group: **4** at card size (≈1.3 units rendered), **6** at related size.
- Square caps, miter joins, `shape-rendering="geometricPrecision"`. No text, no gradients.

### Wrapper

```html
<svg viewBox="0 0 240 132" role="img" aria-label="{description}">
  <g transform="translate(120 66) scale(0.32) translate(-120 -66)"
     fill="none" stroke="#FFFFFF" stroke-width="4"
     stroke-linecap="square" stroke-linejoin="miter"
     shape-rendering="geometricPrecision">
    {marks}
  </g>
</svg>
```

Suggested component: `<PatternThumb id="handoff" size="card|small" />` reading from a map of `{ marks, label }`.

### Marks (inner markup for each pattern)

**01 The Handoff** — dot of control passing from machine to human
```html
<rect x="70" y="44" width="44" height="44"/>
<circle cx="166" cy="66" r="22"/>
<path d="M144 61 L149 66 L144 71 L139 66 Z" fill="#FFFFFF" stroke="none"/>
```

**02 The Glass Box** — reasoning visible inside the machine
```html
<rect x="88" y="34" width="64" height="64"/>
<path d="M104 82 L128 58"/>
<path d="M104 79 L107 82 L104 85 L101 82 Z" fill="#FFFFFF" stroke="none"/>
<path d="M116 67 L119 70 L116 73 L113 70 Z" fill="#FFFFFF" stroke="none"/>
<path d="M128 53 L133 58 L128 63 L123 58 Z" fill="#FFFFFF" stroke="none"/>
```

**03 Graceful Degradation** — machine still in control, one step down
```html
<path d="M64 38 H96 V58 H128 V78 H160 V98 H176"/>
<rect x="138" y="65" width="12" height="12" fill="#FFFFFF" stroke="none"/>
```

**04 Appropriate Friction** — operator's action held at a gate before the outcome
```html
<circle cx="66" cy="66" r="9" fill="#FFFFFF" stroke="none"/>
<path d="M84 66 H120"/>
<path d="M130 66 L118 59.5 V72.5 Z" fill="#FFFFFF" stroke="none"/>
<rect x="134" y="38" width="3" height="56" fill="#FFFFFF" stroke="none"/>
<path d="M176 60 L182 66 L176 72 L170 66 Z"/>
```

**05 Shared Mental Model** — the human's model overlapping the machine's state
```html
<circle cx="100" cy="66" r="30"/>
<rect x="110" y="36" width="60" height="60"/>
<path d="M120 61 L125 66 L120 71 L115 66 Z" fill="#FFFFFF" stroke="none"/>
```

**06 Intent Preview** — the machine now, and where it will be
```html
<rect x="58" y="56" width="20" height="20" fill="#FFFFFF" stroke="none"/>
<path d="M88 66 H150" stroke-dasharray="3 6" stroke-linecap="butt"/>
<rect x="160" y="56" width="20" height="20"/>
```

**07 Capability Disclosure** — machine inside its operating boundary
```html
<circle cx="120" cy="66" r="40" stroke-dasharray="7 9"/>
<rect x="106" y="52" width="28" height="28" fill="#FFFFFF" stroke="none"/>
```

**08 Provenance Log** — an unbroken chain of recorded states
```html
<path d="M52 66 H188"/>
<path d="M52 61 L57 66 L52 71 L47 66 Z" fill="#FFFFFF" stroke="none"/>
<path d="M86 61 L91 66 L86 71 L81 66 Z" fill="#FFFFFF" stroke="none"/>
<path d="M120 61 L125 66 L120 71 L115 66 Z" fill="#FFFFFF" stroke="none"/>
<path d="M154 61 L159 66 L154 71 L149 66 Z" fill="#FFFFFF" stroke="none"/>
<path d="M188 61 L193 66 L188 71 L183 66 Z" fill="#FFFFFF" stroke="none"/>
```

**09 Learning Loop** — field reports loop back into the design
```html
<path d="M120 32 A34 34 0 1 1 86 66"/>
<path d="M86 56 L92.5 68 H79.5 Z" fill="#FFFFFF" stroke="none"/>
<path d="M120 27 L125 32 L120 37 L115 32 Z" fill="#FFFFFF" stroke="none"/>
```

**10 Explainable Fault** — the fault, named
```html
<path d="M120 30 L158 98 H82 Z"/>
<path d="M120 56 V76"/>
<circle cx="120" cy="86" r="2" fill="#FFFFFF" stroke="none"/>
```

**11 Readiness Check** — the human's attention
```html
<circle cx="120" cy="66" r="32"/>
<circle cx="128" cy="62" r="6" fill="#FFFFFF" stroke="none"/>
```

**12 Return of Control** — human hands control back to the machine (mirror of 01)
```html
<rect x="62" y="70" width="32" height="32"/>
<circle cx="170" cy="68" r="7" fill="#FFFFFF" stroke="none"/>
<path d="M170 60 A46 46 0 0 0 78 60"/>
<path d="M78 69 L71.5 57 H84.5 Z" fill="#FFFFFF" stroke="none"/>
```

**13 Operator-to-Operator Handover** — machine state carried between two people
```html
<circle cx="62" cy="66" r="18"/>
<circle cx="178" cy="66" r="18"/>
<path d="M84 66 H156"/>
<rect x="112" y="58" width="16" height="16" fill="#FFFFFF" stroke="none"/>
```

**14 Alert Triage** — alerts ranked, the critical one solid
```html
<rect x="72" y="34" width="12" height="64" fill="#FFFFFF" stroke="none"/>
<rect x="106" y="58" width="12" height="40"/>
<rect x="140" y="74" width="12" height="24"/>
<rect x="174" y="86" width="12" height="12"/>
```

**15 Stop Anywhere** — one unmistakable stop (no stroke group needed)
```html
<path d="M106 32 H134 L154 52 V80 L134 100 H106 L86 80 V52 Z" fill="#FFFFFF" stroke="none"/>
```

---

## 5. Accessibility checks

- All text ≥ 4.5:1 on its background (the token values above pass).
- Risk, reversibility and verdicts always pair color with a shape (●▲■).
- Thumbnails on cards: `role="img"` + `aria-label` describing the idea. Related-card thumbnails: `aria-hidden="true"` (the name is right next to them).
- Chips and tabs are real `<button>`s with `aria-pressed`; touch targets ≥ 44px tall where possible (chips are 32px — raise to 44px on touch).
- Rail and TOC: real links, visible focus ring, `aria-current` on the active item.

## 6. Out of scope for this pass

- Dark-mode values for the new tokens and black thumbnails.
- Thumbnails for patterns 16+ (follow the grammar in §4).
- Design considerations and examples for the other 14 patterns (Handoff is the template).
