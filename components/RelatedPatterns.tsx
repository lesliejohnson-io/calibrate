import Link from "next/link";
import { getIllustration, pad, thumbnailId, type RelationEntry } from "@/lib/patterns";
import { PatternIllustration } from "./PatternIllustration";
import { PatternThumb } from "./PatternThumb";

/**
 * Related patterns as one flat grid of compact cards (redesign-handoff.md
 * §3). Each card carries its own relationship — "Requires · 05" — so the
 * group headings are gone and the list reads straight through in one pass.
 *
 * Incoming edges are already inverted by `getRelationGroups`, so a card that
 * says "Required by" is reading an edge written once on the other pattern.
 *
 * The picture is the same one the index card and the pattern's own page show,
 * on the same terms as `PatternCard`: the hand-drawn illustration wherever
 * one exists, the generated tile for a pattern nobody has drawn yet. A
 * pattern used to change appearance depending on which page you met it on,
 * which is the one thing a thumbnail is for.
 *
 * Either way it is decorative: the pattern's name is right beside it.
 */
export function RelatedPatterns({ relations }: { relations: RelationEntry[] }) {
  return (
    <ul className="relations">
      {relations.map(({ key, label, pattern, note }) => {
        const illustration = getIllustration(pattern.slug);
        return (
          <li key={`${key}-${pattern.slug}`}>
            <Link href={`/patterns/${pattern.slug}`} className="relation-card">
              {illustration ? (
                <span className="relation-art">
                  <PatternIllustration illustration={illustration} />
                </span>
              ) : (
                <PatternThumb
                  id={thumbnailId(pattern)}
                  size="small"
                  decorative
                  className="relation-thumb"
                />
              )}
              <span className="relation-body">
                <span className="mono-label relation-label">
                  {label} · {pad(pattern.number)}
                </span>
                <span className="relation-name">{pattern.name}</span>
                <span className="relation-note">{note}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
