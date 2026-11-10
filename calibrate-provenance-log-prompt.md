I'm making the pattern pages in this repo easier to read. Start with Provenance Log (`content/patterns/08-provenance-log.md`). It will become the model for the other 14 pages, so build anything new as optional and reusable.

Don't commit or push anything. I make all commits myself. When you're done, show me the diff and a short list of what changed.

## Ground rules

- Don't add dependencies. The site uses plain CSS in `app/globals.css`. There's no Tailwind and no icon library. Match the existing class naming and the look of the cautionary tale, mechanism strip and therefore block.
- Every new frontmatter field is optional. The other 14 pages must render exactly as they do now.
- Don't change, add or round any facts. Use the wording below exactly as given. If something looks wrong to you, flag it in your summary. Don't fix it yourself.
- Follow the file's existing convention and add a short entry to the `review:` list for each change you make to the page's content.
- Run `npm run typecheck`, `npm run lint` and `npm run build`, and fix anything that fails.

## 1. Timeline and kicker in the cautionary tale

In `lib/schema.ts`, add two optional fields to `cautionaryTaleSchema`:

- `timeline`: an array of `{ at: string, label: string, detail?: string }`
- `kicker`: a string

In `components/CautionaryTale.tsx`:

- When `timeline` exists, render it **after** the story paragraph as an ordered list (`<ol>`): a countdown to impact.
  - Desktop: one horizontal row of markers on a single rule, each marker showing `at` in the mono label style, then `label`, then `detail`.
  - Mobile: stack the markers vertically.
  - The final marker ("Impact") gets a stronger mark. Use a shape, not color alone.
  - Keep it static: no animation, icons or hover effects.
- When `kicker` exists, render it after the timeline as a pull quote (`<blockquote>`), larger than body text.
- The existing source citation stays at the end of the story paragraph.

## 2. Insight callout under Therefore

In `lib/schema.ts`, add an optional top-level `insight` string field.

In `app/patterns/[slug]/page.tsx`, when `insight` exists, render it directly under the `<p className="therefore">` block as a callout. Make it visually quieter than Therefore but clearly set apart from body text, for example a thin rule above and below with the first sentence in bold.

## 3. Content edits to `content/patterns/08-provenance-log.md`

**a. Shorten the story** and add the timeline and kicker. Replace `cautionaryTale.story` with:

> Just before 10 p.m., an Uber test SUV driving itself struck and killed a woman pushing a bicycle across N. Mill Avenue. Nobody had to argue afterwards about what the machine had done, because the machine had written it down. At the NTSB's request, Uber's Advanced Technologies Group played the data back, and investigators built the timeline from the car's own sensor output.

Add:

```yaml
  timeline:
    - at: "−5.6 s"
      label: "First detection"
      detail: "Classified as a vehicle, by radar. 44.1 mph."
    - at: "−5.6 to −1.2 s"
      label: "Classification keeps changing"
      detail: "Vehicle, bicycle, other. Each label comes with a new predicted path."
    - at: "−1.2 s"
      label: "Action suppression begins"
      detail: "Bicycle, by lidar. Stopping now needs more braking than the system is allowed."
    - at: "−0.2 s"
      label: "Suppression ends"
      detail: "One second after it began."
    - at: "0 s"
      label: "Impact"
  kicker: "None of that is testimony. It is a readout."
```

**b. Anti-pattern.** Replace `without.caption` with the text below, keeping the citation:

> After the 2019 Key Largo crash, the record existed too: within moments of impact, the car uploaded a collision snapshot to the company that built it. But it sat with that company, out of reach of the people it concerned. For years, the people harmed had only their word, and the system's builder had everything else.[cite:wapo-tesla-data]

**c. Demo caption.** Replace `with.caption` with just:

> Every state change carries its author and its time.

(The review list already flags the Tempe sentence here as "the obvious next cut.")

**d. Insight.** Add `insight:` with the text of the current `## Notes` section, and delete that section from the body:

> The data is rarely what's missing. In both the crash and the Horizon case, the records existed. What decides whether a log protects people is who can reach it, and who can change it.

**e. In the field.** Each incident should be told only once. Replace the first two entries (Uber and Tesla) with one line at the end of the section:

> Also on this page: [Uber, Tempe](#tale) (the opening) · Tesla, Key Largo (the anti-pattern)

Keep the UN R157 and Horizon entries as they are. Drop the sentence pointing to The Handoff.

## 4. Example figure (prepare it; I'll add the drawing)

I'm drawing a black-and-white line illustration in Figma, in the same style as `public/illustrations/patterns/*.svg`. It will go at `public/illustrations/examples/key-largo-snapshot.svg`.

- Create the `public/illustrations/examples/` folder.
- In the `examples` entry, set `image: "/illustrations/examples/key-largo-snapshot.svg"`.
- Change `credit` to `"Drawing: Leslie Johnson, after The Washington Post, 2025"` and keep the `url`.
- Update `alt` to: "Line drawing of the Key Largo data flow: the crash, the car uploading a collision snapshot to Tesla's servers, the server acknowledging it, the car marking its own copy for deletion, and years later a hacker recovering it from a forensic copy of the Autopilot unit."
- Leave `drafts.examples: true` in place for now. I'll remove it once the SVG exists.
- Don't create a placeholder SVG. If the image is missing, the site should fall back to its existing placeholder box. Check that it does, and if it doesn't, tell me rather than changing `Examples.tsx`.

## When you're done

Run `npm run dev` and check `/patterns/provenance-log` at desktop width and at 375px. Then send me:

1. The diff.
2. A screenshot or description of the timeline and insight callout at both widths.
3. Anything you flagged but didn't change.
