# Instructions for Claude: turn research notes into pattern entries

This file lives in `research/`. Run it from the root of the calibrate repo with: "Read research/research-to-pattern-instructions.md and follow it. Convert <pattern name>."

---

## Your task

Turn one pattern from the research notes in `research/` into a finished pattern entry in `content/`, in exactly the same format as the existing patterns.

## Repo layout

- `app/` and `components/`: the Next.js site. Do not change these for this task.
- `content/`: finished patterns. The site builds pages from these files.
- `research/`: working notes, one file per moment: `before.md`, `during.md`, `transition.md`, `failure.md`, `after.md`. Never render these on the site and never move them into `content/`.

## Steps

1. **Learn the format first.** Read every existing pattern in `content/`, starting with Appropriate Friction. Note the file extension, the frontmatter fields, how they're ordered, which values are allowed (moments, trust jobs, risk, reversibility, autonomy levels, domains, status), how patterns are numbered, and how sources are structured. Copy that structure exactly. Do not add new fields.
2. **Find the pattern** I named in the matching file in `research/`. Only convert patterns marked **Ready**. If it's marked **Gap** or **Not yet researched**, stop and tell me what's missing.
3. **Write the new entry** in `content/`, with a file name that follows the existing naming convention and the next pattern number.
4. **Write the file, then show it to me** with a short list of anything you had to decide or invent.

## How to map the research into the entry

- **Definition / summary:** use the research definition. Add one concrete example sentence in the same style as the existing patterns (Appropriate Friction uses a drone operator and a no-fly zone).
- **Moment:** use the moment from the research file. The fifth moment is now called **"After and over time."** If the existing data still says "After," tell me rather than renaming it yourself.
- **Trust jobs:** use the ones listed in the research, mapped to the existing allowed values.
- **Without / with the pattern:** the "without" side is the named **anti-pattern** from the research (for example, "Blind Execute"). If the existing format has a field for an anti-pattern name, use it; if not, tell me and leave the label as it is.
- **Sources:** carry over the papers, incident reports and interface examples, grouped the way existing patterns group them (papers, incident reports, and so on). Prefer primary sources. Where the research says "Primary source to pull," flag it for me instead of citing the secondary article as if it were the primary.
- **Domains:** only tag a domain if the entry contains a real example from that domain. No tag without an example.
- **Related patterns / open questions:** if the existing format has fields for these, fill them from the research. Only link patterns that already exist in `content/`.
- **Cautionary tale:** every pattern opens with one. It must be a real,
  **Observed** incident from physical autonomy, taken from a source that is on
  the page, with `sourceId` pointing at that source's id. Give the incident its
  full name ("American Airlines Flight 965 at Cali"), never a bare place name,
  and carry every figure and **unit** exactly as the source states it — a
  secondary summary that says "nm" where the report says "miles" is wrong, and
  that error travels. If the research has no incident behind the pattern, do
  **not** invent or borrow one: leave `cautionaryTale` out and add "Needs a
  cautionary tale" to `review:`.
- **Therefore:** one sentence, the answer to the tale, written as an
  instruction. It sits above the demo and is the pattern in a line.
- **Demo:** every pattern needs an interactive without / with demo. Write the
  concept into `DEMOS.md` first; the rules a demo has to meet are in that file.
  Until one is built, add "Needs demo (see DEMOS.md)" to `review:`.
- **Naming incidents:** anywhere else on the page, the first mention of an
  incident is its full name too. "At Cali" alone is not enough.
- **Mechanism step notes:** a step `note:` carries design advice, not
  evidence. If the fact is already in the Sources section or in the body, do
  not restate it under a step — the step note cannot be cited and has no room
  to explain itself, so the duplicate is always the weaker of the two. Most
  patterns end up with none.
- **Status:** always **Draft**.
- **Citations:** give every source a short `id` (`bainbridge-1983`), then cite it from the prose as `[cite:bainbridge-1983]` at the end of the sentence it supports. The footnote number is the source's position in the Sources list, so it is assigned for you. Be strict: cite only where that source supports the sentence's specific claim, never on topic match alone, and at most two per sentence. Design advice and argument take no citation. If a sentence makes a factual claim — a number, an incident, a study finding — and no source supports it, leave it uncited and add "Unsourced claim: <short quote>" to `review:`. If you are unsure, do the same rather than citing.

## Rules

- **Physical autonomy first:** the main Observed example must come from physical autonomy (vehicles, aviation, surgical or industrial robots, drones, warehouses, maritime). If the research has none, stop and tell me before writing, and suggest real candidates with sources.
- **Don't invent facts.** Every claim about an incident, study or product must come from the research file. If something the format needs isn't in the research (for example, risk level, reversibility, autonomy levels or mechanism steps), draft it, but list it for me as "drafted, needs your review." Never present a drafted value as sourced.
- **Paraphrase sources.** No quotations longer than a short phrase, and at most one per source.
- **Call them operators.** The person working with the machine is "the
  operator", in titles, intents, captions, mechanism steps, notes and UI copy
  alike — never "the user" or "a person". Exceptions, which are about other
  people and not a style choice: casualty and headcount figures ("151 people
  on board"), bystanders who have no control, the engineers at the far end of
  a Learning Loop, study participants, and terms quoted from a standard or a
  source title (SAE J3016's "fallback-ready user", "People + AI Guidebook").
  "Human" is a separate word with a separate job — it is the counterpart to
  "machine" in human-machine trust — and is not covered by this rule.
- **Write in my voice:** plain, concrete, no hype. Match the tone of the existing Notes sections.
- **Don't change existing patterns** or any site code.
- **Check your work:** run the project's build (and lint, if it has one) to confirm the new entry doesn't break anything. Report the result.
- **Do not commit or push.** I make all commits myself.

## When you're done, tell me

1. The file you created and its path.
2. Anything drafted rather than sourced.
3. Any primary sources still to pull.
4. Whether the build passed.
