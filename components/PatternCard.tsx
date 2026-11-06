import Link from "next/link";
import type { PatternCardData } from "@/lib/browse";
import { pad } from "@/lib/format";
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
        <PatternThumb id={pattern.thumbnail} size="card" className="card-thumb" />
        <span className="card-body">
          <span className="label card-num">{pad(pattern.number)}</span>
          <span className="card-name">{pattern.name}</span>
          <span className="card-intent">{pattern.intent}</span>
        </span>
      </Link>
    </li>
  );
}
