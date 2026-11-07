import type { Illustration } from "@/lib/illustrations";

/**
 * A pattern's hand-drawn illustration, as the file itself.
 *
 * An `<img>` and not inline markup: the drawing is already a finished
 * picture, complete with its own dark card, and loading it as a separate
 * document is what guarantees nothing on the page can reach inside and change
 * it -- no recolouring, no `currentColor`, no theme adjustment. It is meant to
 * look identical in light and dark mode.
 *
 * Decorative by decision, not by omission: the pattern's name and intent are
 * next to it and say the same thing in words, so announcing the drawing would
 * only add a second, vaguer version of what a screen reader has just read.
 * An empty `alt` with `aria-hidden` keeps it out of the accessibility tree.
 */
export function PatternIllustration({
  illustration,
  className,
}: {
  illustration: Illustration | null;
  className?: string;
}) {
  if (!illustration) return null;

  return (
    /* The drawing has to reach the browser byte for byte: next/image would
       re-encode it, and it refuses SVG outright without dangerouslyAllowSVG. */
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className ? `pattern-illustration ${className}` : "pattern-illustration"}
      src={illustration.src}
      width={illustration.width}
      height={illustration.height}
      alt=""
      aria-hidden="true"
      draggable={false}
    />
  );
}
