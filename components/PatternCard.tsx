import Link from "next/link";
import type { PatternCardData } from "@/lib/browse";
import { pad } from "@/lib/format";
import { PatternIllustration } from "./PatternIllustration";
import { PatternThumb } from "./PatternThumb";

/**
 * An index card: thumbnail, number, name and a one-sentence intent
 * (redesign-handoff.md §2). The trust job used to sit pinned to the bottom
 * edge; it went with the rest of the judgment ratings.
 *
 * The whole card is the link. The source count has moved to the pattern page
 * — a number that only matters once you are reading the entry.
 */
export function PatternCard({ pattern }: { pattern: PatternCardData }) {
  return (
    <li className="card-item">
      <Link href={`/patterns/${pattern.slug}`} className="card">
        {/* The hand-drawn illustration wins where one exists. It draws the
            same marks the generated thumbnail does, so showing both would put
            two pictures of one idea on a card. Both are dark tiles in the
            same slot, so a row of cards reads the same either way. Patterns
            nobody has drawn keep the generated tile. */}
        {pattern.illustration ? (
          <span className="card-art">
            <PatternIllustration illustration={pattern.illustration} />
          </span>
        ) : (
          <PatternThumb id={pattern.thumbnail} size="card" className="card-thumb" />
        )}
        <span className="card-body">
          <span className="label card-num">{pad(pattern.number)}</span>
          <span className="card-name">{pattern.name}</span>
          <span className="card-intent">{pattern.intent}</span>
        </span>
      </Link>
    </li>
  );
}
