import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content", "patterns");

/** Current pattern slugs, read the same way `lib/patterns.ts` derives them. */
function currentSlugs() {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
    .map((file) => file.replace(/\.md$/, ""));
}

/**
 * Slugs that have moved, old -> current. A pattern's URL is the thing people
 * cite, so a rename or a merge keeps its old address working rather than
 * breaking the citation: cite a pattern once and the link stays good.
 *
 * Add a line here in the same commit that renames or merges the file. A merge
 * points the absorbed slug at the pattern that absorbed it. Nothing has moved
 * yet, so the map is empty — the plumbing is here so a rename is one line.
 */
const RENAMED = {
  // "old-slug": "current-slug",
};

/**
 * Pages that have been taken down, pointed at whatever now answers the
 * question they used to. `/matrix` held the risk × reversibility view; those
 * two ratings are no longer shown anywhere, so the patterns index is the
 * honest destination. A 308 rather than a 404 because the page was linked
 * from About and may be bookmarked.
 */
const RETIRED = [{ source: "/matrix", destination: "/", permanent: true }];

/**
 * Permanent redirects for every URL that is not the canonical one:
 *
 *  - Renamed or merged slugs, from the map above.
 *  - Numbered addresses. The files are named `NN-slug.md` and the number is
 *    on every card and citation line, so `/patterns/01-handoff` is a URL
 *    readers reasonably type; it has never been canonical.
 *
 * Both are 308s: the old address is wrong for good, not for now.
 */
async function redirects() {
  const slugs = currentSlugs();
  const canonical = new Set(slugs.map((s) => s.replace(/^\d+-/, "")));

  const unknown = Object.entries(RENAMED).filter(([, to]) => !canonical.has(to));
  if (unknown.length > 0) {
    throw new Error(
      "next.config.mjs: RENAMED points at slugs that are not patterns:\n" +
        unknown.map(([from, to]) => `  ${from} -> ${to}`).join("\n"),
    );
  }

  const numbered = slugs
    .filter((slug) => /^\d+-/.test(slug))
    .map((slug) => [slug, slug.replace(/^\d+-/, "")]);

  const patterns = [...Object.entries(RENAMED), ...numbered].map(([from, to]) => ({
    source: `/patterns/${from}`,
    destination: `/patterns/${to}`,
    permanent: true,
  }));

  return [...patterns, ...RETIRED];
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hide the dev-mode indicator badge in the corner.
  devIndicators: false,
  redirects,
};

export default nextConfig;
