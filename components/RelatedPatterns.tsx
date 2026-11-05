import Link from "next/link";
import { pad, thumbnailId, type RelationEntry } from "@/lib/patterns";
import { PatternThumb } from "./PatternThumb";

/**
 * Related patterns as one flat grid of compact cards (redesign-handoff.md
 * §3). Each card carries its own relationship — "Requires · 05" — so the
 * group headings are gone and the list reads straight through in one pass.
 *
 * Incoming edges are already inverted by `getRelationGroups`, so a card that
 * says "Required by" is reading an edge written once on the other pattern.
 *
 * The thumbnails are decorative here: the name is right beside them.
 */
export function RelatedPatterns({ relations }: { relations: RelationEntry[] }) {
  return (
    <ul className="relations">
      {relations.map(({ key, label, pattern, note }) => (
        <li key={`${key}-${pattern.slug}`}>
          <Link href={`/patterns/${pattern.slug}`} className="relation-card">
            <PatternThumb
              id={thumbnailId(pattern)}
              size="small"
              decorative
              className="relation-thumb"
            />
            <span className="relation-body">
              <span className="mono-label relation-label">
                {label} · {pad(pattern.number)}
              </span>
              <span className="relation-name">{pattern.name}</span>
              <span className="relation-note">{note}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
