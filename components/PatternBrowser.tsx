"use client";

import { useCallback, useMemo, useRef } from "react";
import {
  availableDomains,
  DEFAULT_STATE,
  domainCounts,
  filterCards,
  groupCards,
  isFiltered,
  type Domain,
  type PatternCardData,
} from "@/lib/browse";
import { humanize } from "@/lib/format";
import { MOMENTS, type Moment } from "@/lib/schema";
import { useBrowse } from "./BrowseProvider";
import { DomainFilter } from "./DomainFilter";
import { MomentRail, type RailNode } from "./MomentRail";
import { PatternCard } from "./PatternCard";

/**
 * The index: the library, with the moment rail in a sticky column on the
 * right -- the same column a pattern page puts its contents list in.
 *
 * State lives in the URL so a view can be linked and shared, but the
 * component renders server-side in its default state first, so the whole
 * library is in the HTML without JavaScript.
 *
 * The grouping is fixed: the five moments, in the order the loop runs. The
 * controls are one row -- search, then the domain filter -- because filtering
 * is not the point of the page and should not be the first thing on it.
 */
export function PatternBrowser({
  cards,
  children,
}: {
  cards: PatternCardData[];
  /** The page's own masthead, which sits above the controls in the column. */
  children?: React.ReactNode;
}) {
  /* The state lives in the layout's provider rather than here, so a selection
     survives a trip into a pattern page and back. */
  const { state, update } = useBrowse();
  const searchRef = useRef<HTMLInputElement>(null);

  const domains = useMemo(() => availableDomains(cards), [cards]);
  // Counted over the library the reader can actually reach, so revealing
  // seeds changes the numbers in the popover along with the results.
  const counts = useMemo(
    () => domainCounts(state.showSeeds ? cards : cards.filter((c) => c.status !== "seed")),
    [cards, state.showSeeds],
  );
  const visible = useMemo(() => filterCards(cards, state), [cards, state]);
  const groups = useMemo(() => groupCards(visible), [visible]);

  // All five moments, always, so the rail keeps its shape while a filter
  // narrows the page. A moment with nothing in it reads as unavailable
  // rather than disappearing.
  const railNodes = useMemo<RailNode[]>(
    () =>
      MOMENTS.map((moment) => ({
        moment,
        count: visible.filter((c) => c.moment === moment).length,
      })),
    [visible],
  );

  const railHref = useCallback((moment: Moment) => `#moment-${moment}`, []);

  const toggleDomain = (domain: Domain) => {
    const has = state.domains.includes(domain);
    update({
      ...state,
      domains: has ? state.domains.filter((d) => d !== domain) : [...state.domains, domain],
    });
  };

  const clearQuery = () => {
    update({ ...state, query: "" });
    searchRef.current?.focus();
  };

  const clearDomains = () => update({ ...state, domains: [] });

  return (
    <div className="index-layout">
      <div className="index-main">
        {children}

        <div className="controls">
          <div className="controls-row">
            <div className="search">
              <label className="sr-only" htmlFor="pattern-search">
                Search patterns
              </label>
              <svg className="search-icon" viewBox="0 0 16 16" aria-hidden="true">
                <circle cx="7" cy="7" r="4.75" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10.5 10.5 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                id="pattern-search"
                ref={searchRef}
                type="search"
                placeholder="Search patterns"
                value={state.query}
                onChange={(e) => update({ ...state, query: e.target.value })}
                /* Escape empties the box, the way it does in a find bar. The
                   native search-input clear is hidden in CSS, so there is one
                   cross rather than two. */
                onKeyDown={(e) => {
                  if (e.key !== "Escape" || !state.query) return;
                  e.preventDefault();
                  clearQuery();
                }}
              />
              {state.query && (
                <button
                  type="button"
                  className="search-clear"
                  aria-label="Clear search"
                  onClick={clearQuery}
                >
                  <svg viewBox="0 0 12 12" aria-hidden="true">
                    <path
                      d="M2.5 2.5 9.5 9.5M9.5 2.5 2.5 9.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Seeds have no control of their own: ?status=all still reveals
                them, which is all the About page promises. */}
            <DomainFilter
              domains={domains}
              counts={counts}
              selected={state.domains}
              onToggle={toggleDomain}
              onClear={clearDomains}
            />
          </div>

          {/* What is on, spelled out and removable one at a time. The button
              says how many; these say which. */}
          {state.domains.length > 0 && (
            <div className="active-filters" role="group" aria-label="Active domain filters">
              {state.domains.map((domain) => (
                <span key={domain} className="active-chip">
                  {humanize(domain)}
                  <button
                    type="button"
                    className="active-chip-x"
                    aria-label={`Remove ${humanize(domain)} filter`}
                    onClick={() => toggleDomain(domain)}
                  >
                    <svg viewBox="0 0 10 10" aria-hidden="true">
                      <path
                        d="M2 2 8 8M8 2 2 8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </span>
              ))}
              <button type="button" className="clear-filters-inline" onClick={clearDomains}>
                Clear all
              </button>
            </div>
          )}
        </div>

        <div id="pattern-results" className="index-results">
          {groups.length === 0 ? (
            <p className="no-results">
              No patterns match.{" "}
              <button
                type="button"
                className="clear-filters-inline"
                onClick={() => update(DEFAULT_STATE)}
              >
                Clear filters
              </button>
            </p>
          ) : (
            groups.map((group) => (
              <section
                key={group.key}
                id={group.anchor}
                className="group"
                aria-labelledby={`group-${group.key}`}
              >
                <header className="group-head">
                  <h2 id={`group-${group.key}`} className="group-name">
                    {group.name}
                  </h2>
                  <p className="group-question">{group.purpose}</p>
                </header>
                <ul className="cards">
                  {group.cards.map((card) => (
                    <PatternCard key={card.slug} pattern={card} />
                  ))}
                </ul>
              </section>
            ))
          )}
        </div>

        {isFiltered(state) && groups.length > 0 && (
          <p className="result-count label">
            {visible.length} of {cards.length} patterns shown ·{" "}
            <button
              type="button"
              className="clear-filters-inline"
              onClick={() => update(DEFAULT_STATE)}
            >
              Clear filters
            </button>
          </p>
        )}
      </div>

      {/* After the library in the DOM as well as on the page: it is a jump
          list for what is beside it, so it reads after it. */}
      <MomentRail nodes={railNodes} hrefFor={railHref} />
    </div>
  );
}
