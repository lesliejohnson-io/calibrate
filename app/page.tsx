import { getAllPatterns, toCardData } from "@/lib/patterns";
import { availableDomains } from "@/lib/browse";
import { PatternBrowser } from "@/components/PatternBrowser";

export default function Home() {
  const patterns = getAllPatterns();
  const cards = patterns.map(toCardData);
  // Seeds are excluded from the count until the filter reveals them.
  const published = cards.filter((c) => c.status !== "seed");
  /**
   * Counted, not written down: the domain list in the schema is the full
   * vocabulary, and only the ones a pattern actually claims are offered as
   * filters. The two numbers in the meta line are the two numbers the
   * controls below it work on.
   */
  const domainCount = availableDomains(published).length;
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
          {/* The name alone. What the library is belongs in the paragraph
              below and in the page title, not in a second heading. */}
          <h1 className="display hero-name">Calibrate</h1>
          <p className="lede">
            Design patterns for human–machine trust, for vehicles, robots and drones that move,
            lift, cut and fly. Each pattern starts with a real incident and ends with a design you
            can try.
          </p>
          <p className="label hero-meta">
            {published.length} {published.length === 1 ? "pattern" : "patterns"}
            {` · ${domainCount} ${domainCount === 1 ? "domain" : "domains"}`}
            {` · updated ${updated}`}
          </p>
        </header>
      </PatternBrowser>
    </div>
  );
}
