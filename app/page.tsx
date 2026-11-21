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
   * The newest entry's own `updated:` date, among the patterns counted above.
   * ISO dates sort as strings, so the largest string is the latest day. This
   * moves only when a pattern is revised, not every time the site rebuilds.
   */
  const updated = patterns
    .filter((p) => p.status !== "seed")
    .map((p) => p.updated)
    .reduce((latest, d) => (d > latest ? d : latest), "");

  return (
    <div className="wrap">
      <PatternBrowser cards={cards}>
        <header className="hero">
          {/* The name alone. What the library is belongs in the paragraph
              below and in the page title, not in a second heading. */}
          <h1 className="display hero-name">Calibrate</h1>
          <p className="lede">
            Design patterns for human–machine trust. For autonomous systems that move, lift, cut
            and fly. Each pattern begins with a failure incident, names the anti-pattern, and gives
            a structure that works differently in a cockpit than in a warehouse. Blueprints, not
            components.
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
