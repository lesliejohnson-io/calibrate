import { taleSourceIds, type Frontmatter } from "@/lib/schema";
import { sourceAnchor } from "@/lib/citations";
import { DraftTag } from "@/components/DraftTag";

type Tale = NonNullable<Frontmatter["cautionaryTale"]>;

/**
 * The incident the page opens with: where the pattern came from, before any
 * claim about what to do instead.
 *
 * The dateline is a real heading rather than an eyebrow, so the page's
 * outline runs tale → anti-pattern → pattern and a screen reader can jump
 * between them. The citation is written here rather than carried in the story
 * text, because the tale rests on the same one or two sources throughout: a
 * per-sentence `[cite:]` would repeat the same number three times.
 *
 * `draft` puts the DRAFT tag beside the title. An opening incident is the
 * most authoritative-looking prose on a pattern page — a dated, cited
 * paragraph about something that really happened — so a freshly written one
 * has to be able to say it has not been checked against its source yet.
 */
export function CautionaryTale({
  tale,
  numbers,
  draft,
}: {
  tale: Tale;
  /** Each source's position in the Sources list, which is its footnote. */
  numbers: Record<string, number | undefined>;
  draft?: boolean;
}) {
  const cited = taleSourceIds(tale)
    .map((id) => ({ id, n: numbers[id] }))
    .filter((c): c is { id: string; n: number } => c.n !== undefined);

  return (
    <section className="section tale" aria-labelledby="tale">
      <h2 id="tale" className="section-head tale-head">
        {tale.title} <DraftTag when={draft} />
      </h2>
      <p className="tale-dateline">
        {tale.date} · {tale.place}
      </p>
      <p className="tale-story">
        {tale.story}
        {cited.length > 0 && (
          <sup className="cite">
            {cited.map((c, i) => (
              <span key={c.id}>
                {i > 0 && ","}
                <a
                  href={`#${sourceAnchor(c.id)}`}
                  aria-label={`Source ${c.n}`}
                  title={`Source ${c.n}`}
                >
                  {c.n}
                </a>
              </span>
            ))}
          </sup>
        )}
      </p>
    </section>
  );
}
