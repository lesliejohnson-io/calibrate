import fs from "node:fs";
import path from "node:path";

/**
 * Hand-drawn pattern illustrations, served as files.
 *
 * The drawings are finished artwork. Each one is exported against its own
 * dark rounded card and drawn in light greys to sit on it, so it is a picture
 * rather than ink: it looks the same in light and dark mode, which is the
 * point. Nothing here reads, rewrites, recolours or inlines the markup --
 * `<img src>` hands the browser the file byte for byte, which is also what
 * keeps a drawing's own masks and gradient ids out of the page's id space.
 *
 * This module's whole job is to say whether a pattern has a drawing and where
 * it lives. A pattern has one when someone has drawn it and saved it as
 * `<slug>.svg`; otherwise the page shows nothing at all, which is why every
 * caller treats `null` as normal rather than as a missing asset.
 */

const DIR = path.join(process.cwd(), "public", "illustrations", "patterns");

/**
 * The export frame every drawing shares. Carried on the `<img>` so the card
 * reserves the right slot before the file arrives, rather than reflowing the
 * grid once it does.
 */
const WIDTH = 173;
const HEIGHT = 98;

export type Illustration = {
  /** Public path to the file, exactly as it sits in `public/`. */
  src: string;
  width: number;
  height: number;
};

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

  const result = fs.existsSync(path.join(DIR, `${slug}.svg`))
    ? { src: `/illustrations/patterns/${slug}.svg`, width: WIDTH, height: HEIGHT }
    : null;
  cache.set(slug, result);
  return result;
}
