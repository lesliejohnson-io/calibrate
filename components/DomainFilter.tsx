"use client";

import type { Domain } from "@/lib/browse";
import { domainLabel } from "@/lib/format";

/**
 * The index's domain filter: one chip per domain, under the search field.
 *
 * Multi-select, applied live. Each chip is a toggle button (`aria-pressed`),
 * so a screen reader hears "Aviation, 7, toggle button, pressed" and the
 * group needs no extra state of its own. A pressed chip fills with the
 * accent -- a change of fill, not only of hue, so it reads in greyscale too.
 *
 * Alphabetical by the label as written, not by the schema's order, so the
 * row can be scanned for a name. The count is how many patterns carry that
 * domain across the library, not within the current results: a number that
 * moved while you typed would be unreadable.
 *
 * This replaced a dropdown. The dropdown kept the first card above the fold,
 * but hid the one thing the filter is for -- which domains the library
 * covers, and how thinly -- behind a click.
 */
export function DomainFilter({
  domains,
  counts,
  selected,
  onToggle,
  onClear,
}: {
  domains: Domain[];
  /** Patterns per domain, across the library rather than the current results. */
  counts: Record<Domain, number>;
  selected: Domain[];
  onToggle: (domain: Domain) => void;
  onClear: () => void;
}) {
  const sorted = [...domains].sort((a, b) => domainLabel(a).localeCompare(domainLabel(b)));

  return (
    <div className="domain-chips" role="group" aria-label="Filter by domain">
      {sorted.map((domain) => {
        const on = selected.includes(domain);
        return (
          <button
            key={domain}
            type="button"
            className="domain-chip"
            aria-pressed={on}
            onClick={() => onToggle(domain)}
          >
            <span className="domain-chip-name">{domainLabel(domain)}</span>
            <span className="domain-chip-count">{counts[domain] ?? 0}</span>
          </button>
        );
      })}
      {selected.length > 0 && (
        <button type="button" className="clear-filters-inline domain-chips-clear" onClick={onClear}>
          Clear
        </button>
      )}
    </div>
  );
}
