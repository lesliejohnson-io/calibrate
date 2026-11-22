# Calibrate

A pattern library for human–machine trust. Its premise is that its claims are checked. For page structure, components, layout and schema, see [SPEC.md](SPEC.md).

## Working rules

- Never commit, stage or push. Leslie makes every commit herself. Leave all changes in the working tree and suggest commit boundaries in your report.
- The environment is Windows / PowerShell. Give PowerShell commands, never bash.
- Never invent or paraphrase source wording. If a claim isn't supported by a document in `review/sources/`, say so and leave it out. A plausible citation is worse than none.
- Don't fetch URLs or search the web unless the prompt says to. Work from `review/`.
- Report rather than guess. A skipped item named in the report beats a confident wrong edit.
- Don't change `status` values unless the prompt explicitly says to.
- Ask before a schema change that would mean rewriting pattern files by hand. New fields are optional, with safe defaults.
- Run `npm run build` before reporting done.

## Verification

- `review/sources/` holds the primary documents and is gitignored. `review/sources/README.md` is the manifest: title, reference, issuing body, date, public URL. Keep it current when sources are added.
- `review/AUDIT.md`, `review/review-fixes-2026-11-21.md`, `review/REMAINING.md` and `review/DRAFTS.md` are the review record. Update them rather than restate them.
- Third-party PDFs are never committed. Published figures, tables and press photographs from sources are never reused. Illustrations on this site are drawn fresh.

## Status

Status is a confidence label shown to readers, not a visibility gate. All patterns are published.

- `reviewed`: every claim on the page has been read against the source it cites.
- `draft`: some claims have not been read against a source; the page says which.
- `stable`: reserved. `lib/schema.ts` defines it as "Reviewed, then revisited after real-world use or feedback." No pattern carries it and no code treats it differently from `reviewed`.

Drafted mechanism steps do not block `reviewed`. The mechanism is openly the library's own synthesis, not a sourced claim.

## Naming people in cautionary tales

- Don't name the people harmed.
- Don't name individual operators, clinicians, drivers or crew, even where the source names them. Use the source's own term for the role: "the vehicle operator," "the Consultant Surgeon," "the pilot flying."
- Do name institutions, companies, agencies and officials acting in an official capacity.

The patterns are about what the system did. Naming an individual turns a systems failure into a personal one, which is the reading every one of these patterns exists to argue against.

## Conventions

- `lib/schema.ts` is the source of truth for the domain vocabulary. If `SPEC.md` or `_template.md` disagrees with it, the schema wins and the others get fixed.
- A domain goes on a pattern when the page has real content in it (an opening, an In the field entry, a sourced example), not because the pattern could theoretically apply there. A demo never justifies a domain tag, because demo data is written for the page rather than drawn from a source.
- In the field uses `Observed · Domain`, or `Illustrative` / `Speculative` where that is the evidence. Report any page still using the verdict shapes.
- Call the person working the machine "the operator," never "the user" or "a person." Leave alone casualty figures, bystanders, the engineers who change the machine, and terms quoted from a source.
- A pattern's H1 is its name alone. The breadcrumb carries the number.
