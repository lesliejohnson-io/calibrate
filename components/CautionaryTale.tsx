import type { Frontmatter } from "@/lib/schema";
import { sourceAnchor } from "@/lib/citations";

type Tale = NonNullable<Frontmatter["cautionaryTale"]>;

/**
 * The incident the page opens with: where the pattern came from, before any
 * claim about what to do instead.
 *
 * The dateline is a real heading rather than an eyebrow, so the page's
 * outline runs tale → anti-pattern → pattern and a screen reader can jump
 * between them. The citation is written here rather than carried in the story
 * text, because the whole tale rests on one source: a per-sentence `[cite:]`
 * would repeat the same number three times.
 */
export function CautionaryTale({
  tale,
  number,
}: {
  tale: Tale;
  /** The source's position in the Sources list, which is its footnote. */
  number: number | undefined;
}) {
  return (
    <section className="section tale" aria-labelledby="tale">
      <h2 id="tale" className="section-head tale-head">
        {tale.title}
      </h2>
      <p className="tale-dateline">
        {tale.date} · {tale.place}
      </p>
      <p className="tale-story">
        {tale.story}
        {number !== undefined && (
          <sup className="cite">
            <a
              href={`#${sourceAnchor(tale.sourceId)}`}
              aria-label={`Source ${number}`}
              title={`Source ${number}`}
            >
              {number}
            </a>
          </sup>
        )}
      </p>
    </section>
  );
}
