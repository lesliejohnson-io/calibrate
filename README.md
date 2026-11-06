# Calibrate

A working library of named, reusable design patterns for the trust layer between humans and autonomous machines. Built with Next.js; every pattern is a single Markdown file.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Deploy: push to GitHub and import the repo in Vercel (no config needed).

## Editing a pattern

Everything for a pattern lives in `content/patterns/NN-slug.md`. You never need to touch components to update your research.

| Field | What it drives | Default |
| --- | --- | --- |
| `name`, `intent` | Page header and the home-page index | required |
| `moment` | Where in the control loop the pattern sits: `before`, `during`, `transition`, `failure` or `after`. The primary grouping axis | required |
| `trustJobs` | What the human needs. One or two of `know`, `predict`, `intervene`, `recover`, `calibrate` | required |
| `risk` | `low`, `elevated` or `critical` | `elevated` |
| `reversibility` | `reversible`, `costly` or `irreversible` | `costly` |
| `autonomy` | The `[low, high]` range of automation levels this applies to, on the 0–5 scale | `[0, 5]` |
| `domains` | One or more of `automotive`, `surgical`, `industrial`, `drone`, `warehouse`, `maritime`, `aviation`, `home`, `general`. Use `general` on its own | `[general]` |
| `status` | Badge: `seed`, `draft`, `reviewed` or `stable` | `draft` |
| `updated` | "Updated" date on the page (keep the quotes) | required |
| `aliases` | Extra names the search should match | `[]` |
| `related` | Links to other patterns in this library | `[]` |
| `crossReferences` | Links out to patterns in other libraries | `[]` |
| `sources` | The Sources list (`title` required; `author`, `year`, `url`, `type`, `note` optional) | `[]` |
| `examples` | The "In the field" cards (`title`, `domain`, `evidence`, `caption` required; `url`, `source`, `image`, `alt` optional) | `[]` |
| `openQuestions` | The "Still figuring out" block | `[]` |
| `steps` | The mechanism diagram. 3–6 steps work best. `note:` hangs an annotation under a step; `key: true` highlights the key moment | required |
| `without`, `with` | The comparison panels: three short beats + a caption each | required |
| Body (below the `---`) | Markdown, in H2 sections: Problem, When to use, When not to use, Design considerations, In the field, Notes | — |

The body's H2s are matched by name and rendered into their own sections on the page, in the order above. Anything written outside them — a preamble, a heading that isn't on the list — is kept under Notes rather than dropped, so nothing disappears if a name is misspelled.

Adding an example (`evidence` is `observed` for a real system or incident, `speculative` for your own concept):

```yaml
examples:
  - title: "What the example is called"
    domain: automotive
    evidence: observed
    caption: "One or two sentences on what this shows."
    url: "https://..."
    source: "Name of the source, shown as the link text"
```

Adding a source (`type` is one of `paper`, `book`, `standard`, `incident-report`, `article`, `talk`):

```yaml
sources:
  - title: "Paper or article title"
    author: "Author name"
    year: 2024
    url: "https://..."
    type: paper
    note: "Why it matters for this pattern"
```

Linking patterns — `type` is `requires`, `complements`, `alternative-to`, `tension-with` or `precedes`. Write each relationship once; the other pattern picks it up as an incoming link.

```yaml
related:
  - slug: shared-mental-model
    type: requires
    note: "One sentence on why."
```

### Status

| Status | Meaning |
| --- | --- |
| `seed` | Name and intent only. Hidden by default |
| `draft` | Mechanism and problem written, few sources |
| `reviewed` | All sections filled, ≥3 sources, ≥1 observed example |
| `stable` | Reviewed, then revisited after real-world use or feedback |

### Validation

Frontmatter is checked against `lib/schema.ts` (zod) whenever the content is read, so `npm run build` fails on bad data rather than rendering it blank. Errors name the file and the field, and every problem in the library is reported in one go:

```
Invalid frontmatter in 1 file:

  content/patterns/02-glass-box.md
    moment     Invalid option: expected one of "before"|"during"|…
    autonomy   expected [low, high] with low <= high
```

## Adding a pattern

Copy `content/patterns/_template.md` to `06-your-pattern.md`. The number sets the order; the words after it become the URL (`/patterns/your-pattern`). Files starting with `_` are ignored.

## Structure

```
app/                     pages (home, /patterns/[slug])
components/              MechanismFlow, Comparison, Sources
content/patterns/        one .md file per pattern  ← edit here
lib/schema.ts            the frontmatter vocabularies + validation rules
lib/patterns.ts          reads, validates and parses the content files
```

Light and dark mode follow the system setting. Colors are tokens at the top of `app/globals.css`.
