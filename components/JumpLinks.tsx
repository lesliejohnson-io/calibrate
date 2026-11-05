import type { TocItem } from "./PatternToc";

/**
 * The row of pills under the mechanism (redesign-handoff.md §3). Same targets
 * as the aside's "On this page", in reading order, for the width where the
 * aside has dropped below the article and for anyone who scans across rather
 * than down.
 *
 * The mechanism is left out: it is the thing these sit beneath.
 */
export function JumpLinks({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav className="jump" aria-label="Jump to a section">
      <ul className="jump-list">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="jump-pill">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
