import type { Illustration } from "@/lib/illustrations";

/**
 * A pattern's hand-drawn illustration, inlined so it can take the page's ink
 * colour in either theme.
 *
 * Decorative by decision, not by omission: the pattern's name and intent are
 * next to it and say the same thing in words, so announcing the drawing would
 * only add a second, vaguer version of what a screen reader has just read.
 * `aria-hidden` and `focusable="false"` together keep it out of both the
 * accessibility tree and the tab order, the latter mattering because IE-era
 * SVG focus behaviour still surfaces in some engines.
 *
 * `dangerouslySetInnerHTML` is the only way to inline a file's markup. The
 * content is a repository file written by hand, not user input, and it is
 * normalised by `getIllustration` before it reaches here.
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
    <svg
      className={className ? `pattern-illustration ${className}` : "pattern-illustration"}
      viewBox={illustration.viewBox}
      aria-hidden="true"
      focusable="false"
      role="presentation"
      dangerouslySetInnerHTML={{ __html: illustration.inner }}
    />
  );
}
