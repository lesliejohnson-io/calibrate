import { SOURCE_TYPES, SOURCE_TYPE_LABELS, type Frontmatter } from "./schema";

type Source = Frontmatter["sources"][number];

/**
 * `[cite:some-id]` in a pattern's prose. Matched after the markdown has been
 * turned into HTML, where it survives untouched: it is not link syntax, so
 * marked passes it through as text.
 */
const CITE = /\[cite:([a-z0-9][a-z0-9-]*)\]/g;

/** The anchor a citation links to, and the id the Sources list puts on it. */
export function sourceAnchor(id: string): string {
  return `source-${id}`;
}

/** Untyped sources fall under "Other" rather than being hidden. */
const GROUP_ORDER = [...SOURCE_TYPES, "other"] as const;

export type SourceGroup = {
  type: (typeof GROUP_ORDER)[number];
  label: string;
  /** The ordinal of this group's first item in the continuous numbering. */
  start: number;
  items: Source[];
};

/**
 * The Sources section's running order: grouped by type, numbered continuously
 * across the groups. Citation numbers are positions in this order, so both the
 * list and the footnotes have to read it from here or they will drift apart.
 */
export function sourceGroups(sources: Source[]): SourceGroup[] {
  let counter = 0;
  return GROUP_ORDER.map((type) => {
    const items = sources.filter((s) => (s.type ?? "other") === type);
    const start = counter + 1;
    counter += items.length;
    return { type, label: SOURCE_TYPE_LABELS[type], start, items };
  }).filter((g) => g.items.length > 0);
}

/** Source id -> its number in the Sources list. Sources without an id are skipped. */
export function sourceNumbers(sources: Source[]): Record<string, number> {
  const numbers: Record<string, number> = {};
  for (const group of sourceGroups(sources)) {
    group.items.forEach((s, i) => {
      if (s.id) numbers[s.id] = group.start + i;
    });
  }
  return numbers;
}

/**
 * The body sections in the order they appear on the page. Citation numbers no
 * longer depend on this order, but the walk still has to cover every section
 * that can carry prose.
 */
export const CITED_SECTIONS = [
  "problem",
  "whenToUse",
  "whenNotToUse",
  "considerations",
  "inTheField",
  "notes",
] as const;

export type CitedSection = (typeof CITED_SECTIONS)[number];

/**
 * Replaces every `[cite:id]` with a superscript link to its source, numbered
 * by that source's position in the Sources list — footnote 3 is the third
 * source — so each source carries one number and the list's own ordinal is it.
 *
 * A citation naming a source that does not exist, or one with no `id`, fails
 * the build. A silent drop would leave a claim looking sourced when the link
 * behind it had quietly gone.
 */
export function applyCitations<
  T extends Partial<Record<CitedSection, string>>,
  E extends Record<string, string> = Record<string, never>,
>(
  body: T,
  sources: Source[],
  file: string,
  /**
   * Prose that lives in frontmatter rather than in the markdown body and so
   * is not one of the CITED_SECTIONS — currently the anti-pattern's text.
   * Passed through the same pass so there is one numbering, one `cited` set
   * and one build error for a citation naming a source that is not there.
   * Values must already be HTML-escaped: what comes back is rendered as HTML.
   */
  extras?: E,
): { body: T; extras: E; citations: Record<string, number> } {
  const numbers = sourceNumbers(sources);
  const cited = new Set<string>();
  const missing = new Set<string>();
  const out = { ...body };

  const cite = (html: string) =>
    html.replace(CITE, (_match, id: string) => {
      const n = numbers[id];
      if (n === undefined) {
        missing.add(id);
        return "";
      }
      cited.add(id);
      return (
        `<sup class="cite">` +
        `<a href="#${sourceAnchor(id)}" aria-label="Source ${n}" title="Source ${n}">${n}</a>` +
        `</sup>`
      );
    });

  for (const section of CITED_SECTIONS) {
    const html = body[section];
    if (typeof html !== "string" || !html.includes("[cite:")) continue;
    out[section] = cite(html) as T[CitedSection];
  }

  const outExtras = { ...(extras ?? ({} as E)) };
  for (const key of Object.keys(outExtras) as (keyof E)[]) {
    const text = outExtras[key];
    if (typeof text === "string") outExtras[key] = cite(text) as E[keyof E];
  }

  if (missing.size > 0) {
    throw new Error(
      `${file}: cites ${[...missing].map((id) => `"${id}"`).join(", ")}, ` +
        `which ${missing.size === 1 ? "is not" : "are not"} the id of any source in this file.`,
    );
  }

  return {
    body: out,
    extras: outExtras,
    citations: Object.fromEntries([...cited].map((id) => [id, numbers[id]])),
  };
}
