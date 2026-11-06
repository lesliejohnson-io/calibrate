import { getAllPatterns, toCardData } from "@/lib/patterns";
import { PatternBrowser } from "@/components/PatternBrowser";

export default function Home() {
  const patterns = getAllPatterns();
  const cards = patterns.map(toCardData);
  // Seeds are excluded from the count until the filter reveals them.
  const published = patterns.filter((p) => p.status !== "seed");
  /**
   * The library's date, not the newest entry's. A pattern's own `updated:`
   * says when that entry was last revised; this line is about the whole
   * library, which changes whenever the site is rebuilt — so it is read at
   * build time rather than derived from the files. The page is statically
   * prerendered, so this is the deploy date and stays fixed until the next
   * build.
   */
  const updated = new Date().toISOString().slice(0, 10);

  return (
    <div className="wrap">
      <PatternBrowser cards={cards}>
        <header className="hero">
          {/* The name, then what it is: two headings rather than one
              sentence, so the outline reads Calibrate > what it holds. */}
          <h1 className="display">Calibrate</h1>
          <h2 className="display hero-title-line">Patterns for human-machine trust</h2>
          <p className="lede">
            Patterns for autonomous machines that move, lift, cut, and fly, where a bad decision has
            physical consequences.
          </p>
          <p className="label hero-meta">
            {published.length} {published.length === 1 ? "pattern" : "patterns"}
            {` · updated ${updated}`}
          </p>
        </header>
      </PatternBrowser>
    </div>
  );
}
