import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getIllustration } from "./illustrations";
import { marked } from "marked";
import { formatIssues, frontmatterSchema, type Frontmatter } from "./schema";
import { applyCitations, sourceAnchor, sourceGroups, sourceNumbers } from "./citations";
import { taleSourceIds } from "./schema";

export { sourceAnchor, sourceGroups };
export type { SourceGroup } from "./citations";

import {
  INVERSE_RELATIONS,
  RELATION_LABELS,
  RELATION_ORDER,
  type Moment,
  type Relation,
  type RelationKey,
} from "./schema";

export type { InterfaceComponent, Verdict } from "./schema";
export { VERDICTS, VERDICT_LABELS, VERDICT_SHAPES } from "./schema";
export type {
  Domain,
  Evidence,
  Moment,
  Relation,
  RelationKey,
  Reversibility,
  Risk,
  Status,
  TrustJob,
} from "./schema";
export {
  AUTONOMY_LEVELS,
  DOMAINS,
  EVIDENCE,
  EVIDENCE_DEFINITIONS,
  INTERFACE_COMPONENTS,
  MOMENT_EXPLANATIONS,
  MOMENT_LABELS,
  MOMENT_PROMPTS,
  MOMENT_QUESTIONS,
  MOMENTS,
  RELATION_DEFINITIONS,
  REVERSIBILITY,
  REVERSIBILITY_STATUS,
  RISK_STATUS,
  STATUS_SHAPES,
  REVERSIBILITY_DEFINITIONS,
  RISK_DEFINITIONS,
  RISKS,
  STATUS_DEFINITIONS,
  RELATION_LABELS,
  RELATIONS,
  SOURCE_TYPES,
  SOURCE_TYPE_LABELS,
  SOURCE_TYPE_ROW_LABELS,
  STATUSES,
  taleSourceIds,
  TRUST_JOBS,
  TRUST_JOB_PURPOSES,
} from "./schema";

export type { PatternCardData } from "./browse";
import type { PatternCardData } from "./browse";

export { autonomyRange, humanize, momentLabel, pad } from "./format";
export { getIllustration, type Illustration } from "./illustrations";

/** One step in a pattern's mechanism flow. */
export type Step = Frontmatter["steps"][number];

/** A short three-beat sequence for the without / with comparison. */
export type Contrast = Frontmatter["without"];

export type Source = Frontmatter["sources"][number];
export type Consideration = Frontmatter["considerations"][number];
export type Related = Frontmatter["related"][number];
export type CrossReference = Frontmatter["crossReferences"][number];
export type Example = Frontmatter["examples"][number];

/**
 * The fixed H2 sections of a pattern's markdown body. Anything the author
 * writes outside them — a preamble, an unrecognized heading — falls through to
 * `notes` rather than being dropped.
 */
export type Body = {
  problem?: string;
  whenToUse?: string;
  whenNotToUse?: string;
  considerations?: string;
  inTheField?: string;
  notes?: string;
};

export type Pattern = Frontmatter & {
  /** Derived from the filename: "01-handoff.md" -> "handoff". */
  slug: string;
  body: Body;
  file: string;
  /** Source id -> its footnote number, for sources this page actually cites. */
  citations: Record<string, number>;
  /**
   * `without.caption` ready to render: HTML-escaped, `[cite:]` resolved, and
   * split into one paragraph per blank line. The anti-pattern's text is the
   * one piece of frontmatter prose long enough to want both, since it is what
   * the page shows under the "Anti-pattern:" heading.
   */
  antiPatternHtml: string;
};

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
};

const escapeHtml = (s: string) => s.replace(/[&<>"]/g, (c) => HTML_ESCAPES[c]);

/** One `<p class="prose-lead">` per blank-line-separated paragraph. */
function paragraphs(html: string): string {
  return html
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p class="prose-lead">${p.replace(/\n/g, " ")}</p>`)
    .join("");
}

const CONTENT_DIR = path.join(process.cwd(), "content", "patterns");

/** H2 heading text -> the key it fills on `Body`. */
const BODY_SECTIONS: Record<string, keyof Body> = {
  problem: "problem",
  "when to use": "whenToUse",
  "when not to use": "whenNotToUse",
  "design considerations": "considerations",
  "in the field": "inTheField",
  notes: "notes",
};

/**
 * Splits the markdown body on its H2s. Content before the first heading, and
 * any heading that isn't one of the fixed section names, is kept under
 * `notes` with its heading intact, so nothing an author writes disappears.
 */
function splitBody(markdown: string): Body {
  const chunks: { heading: string | null; lines: string[] }[] = [{ heading: null, lines: [] }];
  let inFence = false;

  for (const line of markdown.split(/\r?\n/)) {
    if (line.trimStart().startsWith("```")) inFence = !inFence;
    const heading = inFence ? null : /^##[ \t]+(.+?)[ \t]*$/.exec(line);
    if (heading) chunks.push({ heading: heading[1], lines: [] });
    else chunks[chunks.length - 1].lines.push(line);
  }

  const parts: Partial<Record<keyof Body, string[]>> = {};
  const add = (key: keyof Body, text: string) => {
    (parts[key] ??= []).push(text);
  };

  for (const chunk of chunks) {
    const text = chunk.lines.join("\n").trim();
    const key = chunk.heading ? BODY_SECTIONS[chunk.heading.toLowerCase()] : undefined;

    if (key) {
      if (text) add(key, text);
    } else if (chunk.heading) {
      add("notes", `## ${chunk.heading}\n\n${text}`.trim());
    } else if (text) {
      add("notes", text);
    }
  }

  const body: Body = {};
  for (const [key, texts] of Object.entries(parts) as [keyof Body, string[]][]) {
    body[key] = marked.parse(texts.join("\n\n"), { async: false }) as string;
  }
  return body;
}

/** Which mark a pattern shows. Defaults to the slug (handoff §4). */
export function thumbnailId(p: Pick<Pattern, "slug" | "thumbnail">): string {
  return p.thumbnail ?? p.slug;
}

/** A Moment's own page. */
export function momentHref(moment: Moment): string {
  return `/moments/${moment}`;
}

/** A frontmatter failure in one file, held so the build can report them all at once. */
class ContentError extends Error {
  constructor(
    readonly file: string,
    readonly problems: string[],
  ) {
    super(`${file}\n${problems.map((p) => `    ${p}`).join("\n")}`);
    this.name = "ContentError";
  }
}

function readPattern(file: string): Pattern {
  const rel = `content/patterns/${file}`;
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const { data, content } = matter(raw);

  const parsed = frontmatterSchema.safeParse(data);
  if (!parsed.success) throw new ContentError(rel, formatIssues(parsed.error));

  const { body, extras, citations } = applyCitations(
    splitBody(content),
    parsed.data.sources,
    rel,
    { antiPattern: escapeHtml(parsed.data.without.caption) },
  );

  // The tale's source is validated the same way a [cite:] is: naming a source
  // that is not on the page fails the build rather than rendering a tale whose
  // citation links nowhere.
  //
  // It is also *numbered* the same way. The tale's citation is written in
  // frontmatter rather than as a `[cite:]`, so it never passed through
  // applyCitations and its number was only in `citations` when some other
  // sentence on the page happened to cite the same source. Where none did,
  // the footnote silently disappeared and the opening paragraph read as
  // unsourced — which is what happened on Shared Mental Model. Registering
  // the ids here means a tale's citation is present because the tale names
  // it, not because a design consideration two screens down does.
  const tale = parsed.data.cautionaryTale;
  const numbers = sourceNumbers(parsed.data.sources);
  for (const id of tale ? taleSourceIds(tale) : []) {
    if (!parsed.data.sources.some((source) => source.id === id)) {
      throw new Error(
        `${rel}: cautionaryTale.sourceId names "${id}", ` +
          `which is not the id of any source in this file.`,
      );
    }
    citations[id] = numbers[id];
  }

  return {
    ...parsed.data,
    slug: file.replace(/\.md$/, "").replace(/^\d+-/, ""),
    body,
    file: rel,
    citations,
    antiPatternHtml: paragraphs(extras.antiPattern),
  };
}

/** Checks that no single file can make on its own. */
function checkLibrary(patterns: Pattern[]): void {
  const problems: string[] = [];
  const seenNumbers = new Map<number, string>();
  const seenSlugs = new Map<string, string>();
  const bySlug = new Map(patterns.map((p) => [p.slug, p]));

  for (const p of patterns) {
    const clashingNumber = seenNumbers.get(p.number);
    if (clashingNumber) problems.push(`${p.file}: number ${p.number} is already used by ${clashingNumber}`);
    else seenNumbers.set(p.number, p.file);

    const clashingSlug = seenSlugs.get(p.slug);
    if (clashingSlug) problems.push(`${p.file}: slug "${p.slug}" is already used by ${clashingSlug}`);
    else seenSlugs.set(p.slug, p.file);

    for (const r of p.related) {
      if (r.slug === p.slug) problems.push(`${p.file}: related "${r.slug}" points at itself`);
      else if (!bySlug.has(r.slug)) problems.push(`${p.file}: related "${r.slug}" is not a pattern`);
    }
  }

  if (problems.length > 0) {
    throw new Error(`Content problems across patterns:\n\n${problems.map((p) => `  ${p}`).join("\n")}`);
  }
}

let cache: Pattern[] | undefined;

/** All patterns, ordered by their `number`. Files starting with "_" are ignored. */
export function getAllPatterns(): Pattern[] {
  if (cache) return cache;

  const patterns: Pattern[] = [];
  const failures: ContentError[] = [];

  for (const file of fs.readdirSync(CONTENT_DIR)) {
    if (!file.endsWith(".md") || file.startsWith("_")) continue;
    try {
      patterns.push(readPattern(file));
    } catch (err) {
      if (err instanceof ContentError) failures.push(err);
      else throw err;
    }
  }

  if (failures.length > 0) {
    const files = failures.length === 1 ? "file" : "files";
    throw new Error(
      `Invalid frontmatter in ${failures.length} ${files}:\n\n` +
        failures.map((f) => `  ${f.message}`).join("\n\n"),
    );
  }

  patterns.sort((a, b) => a.number - b.number);
  checkLibrary(patterns);

  // Only cache in production: in dev, editing a .md file should show up on reload.
  if (process.env.NODE_ENV === "production") cache = patterns;
  return patterns;
}

export function getPattern(slug: string): Pattern | undefined {
  return getAllPatterns().find((p) => p.slug === slug);
}

/** The narrow shape the index sends to the browser. */
export function toCardData(p: Pattern): PatternCardData {
  return {
    slug: p.slug,
    number: p.number,
    name: p.name,
    intent: p.cardIntent ?? p.intent,
    moment: p.moment,
    domains: p.domains,
    status: p.status,
    aliases: p.aliases,
    thumbnail: thumbnailId(p),
    illustration: getIllustration(p.slug),
  };
}

export function getPatternsByMoment(moment: Moment): Pattern[] {
  return getAllPatterns().filter((p) => p.moment === moment);
}

/**
 * Previous and next within the same Moment, so the pager walks a coherent
 * group rather than the whole library by number.
 */
export function getMomentNeighbors(pattern: Pattern): {
  prev?: Pattern;
  next?: Pattern;
  total: number;
} {
  const siblings = getPatternsByMoment(pattern.moment);
  const i = siblings.findIndex((p) => p.slug === pattern.slug);
  return { prev: siblings[i - 1], next: siblings[i + 1], total: siblings.length };
}

/** One related pattern as the card shows it: "Requires · 05", then the note. */
export type RelationEntry = {
  key: RelationKey;
  label: string;
  pattern: Pattern;
  note: string;
};

/**
 * Every relationship touching this pattern as one flat list, in the order the
 * group headings used to run. The cards carry their own relation label, so
 * the grouping headings are gone and the list is read straight through.
 */
export function getRelations(pattern: Pattern): RelationEntry[] {
  return getRelationGroups(pattern).flatMap((group) =>
    group.entries.map((entry) => ({
      key: group.key,
      label: group.label,
      pattern: entry.pattern,
      note: entry.note,
    })),
  );
}

export type RelationGroup = {
  key: RelationKey;
  label: string;
  entries: { pattern: Pattern; note: string }[];
};

/**
 * Every relationship touching this pattern, grouped for display. Outgoing
 * edges keep their type; incoming ones are inverted, so an edge written once
 * on B shows up correctly on A ("B requires A" reads as "Required by B").
 */
export function getRelationGroups(pattern: Pattern): RelationGroup[] {
  const all = getAllPatterns();
  const bySlug = new Map(all.map((p) => [p.slug, p]));
  const grouped = new Map<RelationKey, { pattern: Pattern; note: string }[]>();

  const push = (key: RelationKey, target: Pattern | undefined, note: string) => {
    if (!target) return;
    const entries = grouped.get(key) ?? [];
    if (entries.some((e) => e.pattern.slug === target.slug)) return;
    entries.push({ pattern: target, note });
    grouped.set(key, entries);
  };

  for (const r of pattern.related) {
    push(r.type, bySlug.get(r.slug), r.note);
  }

  for (const other of all) {
    if (other.slug === pattern.slug) continue;
    for (const r of other.related) {
      if (r.slug !== pattern.slug) continue;
      push(INVERSE_RELATIONS[r.type as Relation], other, r.note);
    }
  }

  return RELATION_ORDER.filter((key) => grouped.has(key)).map((key) => ({
    key,
    label: RELATION_LABELS[key],
    entries: grouped.get(key)!.sort((a, b) => a.pattern.number - b.pattern.number),
  }));
}
