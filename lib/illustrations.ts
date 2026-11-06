import fs from "node:fs";
import path from "node:path";

/**
 * Hand-drawn pattern illustrations, read off disk at build time and inlined
 * into the page.
 *
 * They are inlined rather than linked as `<img src>` for one reason: an SVG
 * loaded through `<img>` is an isolated document and cannot inherit `color`
 * from the page, so it could not follow light and dark mode. Inlining costs a
 * few KB per illustration and buys a drawing that is simply the ink colour,
 * whatever that currently is.
 *
 * Nothing here generates or edits artwork. A pattern has an illustration when
 * someone has drawn one and saved it as `<slug>.svg`; otherwise the page
 * shows nothing at all, which is why every caller treats `null` as normal
 * rather than as a missing asset.
 */

const DIR = path.join(process.cwd(), "public", "illustrations", "patterns");

/**
 * The two inks the drawings are exported in, and what each becomes on the page.
 *
 * Figma exports against a dark card, so the artwork is drawn in light greys:
 * #F5F5F5 for the marks that carry the idea, #D9D9D9 for anything deliberately
 * quieter, such as a dotted path between two objects. Mapping both to
 * `currentColor` would flatten that distinction, so the second becomes a dimmed
 * version of the ink instead, which still follows the theme.
 *
 * A colour outside this table is left exactly as drawn. That is the honest
 * default -- the loader has no way to tell a third tone from a mark that is
 * meant to be one fixed colour -- but it does mean a stray hex from Figma will
 * not follow the theme. `npm run build` prints a warning naming any it finds.
 */
const EXPORT_TONES: readonly (readonly [RegExp, string])[] = [
  [/#F5F5F5\b/gi, "currentColor"],
  [/#D9D9D9\b/gi, "var(--illus-dim)"],
  // A second quiet grey some exports use in place of #D9D9D9: same role in
  // the drawing, so the same ink on the page.
  [/#7F7F7F\b/gi, "var(--illus-dim)"],
  // The one mark a drawing makes in red -- the alarm that needs a hand now --
  // mapped to the page's own fault ink rather than Figma's red, so the card
  // and the pattern it links to agree about what red means.
  [/#F61717\b/gi, "var(--status-fault)"],
];

/** Colours that are structural rather than ink, and so are never remapped. */
const NOT_INK = new Set(["none", "white", "transparent", "currentcolor"]);

/**
 * Painting attributes that inherit, and so change how the children draw.
 *
 * Figma puts `fill="none"` on the root of every export, which is what makes a
 * `stroke`-only path read as an outline rather than a solid shape. Only the
 * `viewBox` used to survive into the page, so those paths fell back to the
 * SVG default of `fill: black` and every outline came out filled in. Anything
 * on this list is carried across; anything else on the root -- `width`,
 * `height`, `xmlns` -- is the file's own business and is dropped.
 */
const INHERITED_PAINT = [
  "fill",
  "fill-rule",
  "fill-opacity",
  "stroke",
  "stroke-width",
  "stroke-opacity",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-dasharray",
  "clip-rule",
] as const;

/**
 * Re-applies the root's painting attributes to the drawing, as a group.
 *
 * A group rather than attributes on the rendered `<svg>`: the component builds
 * that element in JSX and would need a prop per attribute, whereas the markup
 * here is already being inlined as a string. Anything a child sets for itself
 * still wins, which is the precedence those attributes had on the root.
 */
function carryRootPaint(markup: string, attrs: string): string {
  const carried: string[] = [];
  for (const name of INHERITED_PAINT) {
    const match = attrs.match(new RegExp(`\\b${name}="([^"]*)"`, "i"));
    if (match) carried.push(`${name}="${match[1]}"`);
  }
  if (carried.length === 0) return markup;
  return `<g ${carried.join(" ")}>${markup}</g>`;
}

export type Illustration = {
  /** Coordinate system for the `<svg>` the component renders. */
  viewBox: string;
  /** The drawing itself, with no root element of its own. */
  inner: string;
};

/**
 * Figma exports a rounded rectangle behind the whole drawing. On the page the
 * illustration sits on the page's own background, so that rect would paint a
 * dark card in light mode. Only a rect covering the entire canvas is removed;
 * a rect that happens to be part of the drawing is left alone.
 */
function stripBackdrop(markup: string, width: string, height: string): string {
  const rect = new RegExp(
    `<rect\\b(?=[^>]*\\bwidth="${width}")(?=[^>]*\\bheight="${height}")` +
      `(?![^>]*\\bx="(?!0")[^"]*")(?![^>]*\\by="(?!0")[^"]*")[^>]*/>\\s*`,
    "i",
  );
  return markup.replace(rect, "");
}

/**
 * Namespaces every id in the file.
 *
 * Figma numbers its masks per-file — `mask0_11_8` — so two illustrations on
 * one page can and do collide. An id defined twice in a document means the
 * second drawing silently renders through the first one's mask, which looks
 * like a drawing bug rather than an id bug. Prefixing with the slug makes
 * collisions impossible.
 */
function namespaceIds(markup: string, slug: string): string {
  const ids = new Set<string>();
  for (const m of markup.matchAll(/\bid="([^"]+)"/g)) ids.add(m[1]);
  let out = markup;
  for (const id of ids) {
    // Escaped because Figma ids are plain, but a hand-edited file may not be.
    const safe = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    out = out
      .replace(new RegExp(`\\bid="${safe}"`, "g"), `id="${slug}-${id}"`)
      .replace(new RegExp(`url\\(#${safe}\\)`, "g"), `url(#${slug}-${id})`)
      .replace(new RegExp(`\\b(xlink:href|href)="#${safe}"`, "g"), `$1="#${slug}-${id}"`);
  }
  return out;
}

/**
 * Says so when a drawing still holds a colour of its own after the swap.
 *
 * Every such colour is a mark that will stay the same in light and dark mode,
 * which is nearly always an export slip rather than a decision -- a layer left
 * on Figma's default black, or a third grey. Finding those by eye means
 * opening each drawing in both themes, so the build says it instead. A warning
 * and not an error: a fixed colour is occasionally what someone wants.
 */
function warnOnStrayColours(markup: string, slug: string): void {
  const stray = new Set<string>();
  for (const m of markup.matchAll(/\b(?:fill|stroke|stop-color)="([^"]+)"/gi)) {
    const value = m[1].trim();
    if (value.startsWith("var(") || value.startsWith("url(")) continue;
    if (NOT_INK.has(value.toLowerCase())) continue;
    stray.add(value);
  }
  if (stray.size === 0) return;
  console.warn(
    `illustrations: ${slug}.svg keeps ${[...stray].join(", ")} after the ink swap; ` +
      `${stray.size === 1 ? "that colour" : "those colours"} will not follow the theme.`,
  );
}

const cache = new Map<string, Illustration | null>();

export function getIllustration(slug: string): Illustration | null {
  const hit = cache.get(slug);
  if (hit !== undefined) return hit;

  // The slug comes from a filename we control, but it is still interpolated
  // into a path, so anything that could climb out of the directory is refused.
  if (!/^[a-z0-9-]+$/.test(slug)) {
    cache.set(slug, null);
    return null;
  }

  let raw: string;
  try {
    raw = fs.readFileSync(path.join(DIR, `${slug}.svg`), "utf8");
  } catch {
    cache.set(slug, null);
    return null;
  }

  const open = raw.match(/<svg\b([^>]*)>/i);
  if (!open) {
    cache.set(slug, null);
    return null;
  }
  const attrs = open[1];
  const width = attrs.match(/\bwidth="([^"]+)"/i)?.[1];
  const height = attrs.match(/\bheight="([^"]+)"/i)?.[1];
  const viewBox =
    attrs.match(/\bviewBox="([^"]+)"/i)?.[1] ??
    (width && height ? `0 0 ${width} ${height}` : null);
  if (!viewBox) {
    cache.set(slug, null);
    return null;
  }

  let inner = raw.slice(open.index! + open[0].length, raw.lastIndexOf("</svg>"));
  if (width && height) inner = stripBackdrop(inner, width, height);
  // Before the ink swap, so a root that paints in the export colour is
  // recoloured along with everything else.
  inner = carryRootPaint(inner.trim(), attrs);
  for (const [tone, replacement] of EXPORT_TONES) inner = inner.replace(tone, replacement);
  warnOnStrayColours(inner, slug);
  inner = namespaceIds(inner, slug);

  const result = { viewBox, inner: inner.trim() };
  cache.set(slug, result);
  return result;
}
