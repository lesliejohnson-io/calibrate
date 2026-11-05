import { getAllPatterns, toCardData } from "@/lib/patterns";
import { PatternBrowser } from "@/components/PatternBrowser";
import { IllustrationKey } from "@/components/IllustrationKey";

export default function Home() {
  const patterns = getAllPatterns();
  const cards = patterns.map(toCardData);
  // Seeds are excluded from the count until the filter reveals them.
  const published = patterns.filter((p) => p.status !== "seed");
  const updated = published
    .map((p) => p.updated)
    .sort()
    .at(-1);
  const allDrafts = published.every((p) => p.status === "draft" || p.status === "seed");

  return (
    <div className="wrap">
      <PatternBrowser cards={cards}>
        <header className="hero">
          <h1 className="display">Trust Layer Patterns</h1>
          <p className="lede">
            Patterns for autonomous machines that move, lift, cut, and fly, where a bad decision has
            physical consequences.
          </p>
          {/* Said once here instead of a DRAFT tag on every card. */}
          <p className="label hero-meta">
            {published.length} {published.length === 1 ? "pattern" : "patterns"}
            {updated && ` · updated ${updated}`}
            {allDrafts && " · all drafts"}
          </p>
          <IllustrationKey />
        </header>
      </PatternBrowser>
    </div>
  );
}
