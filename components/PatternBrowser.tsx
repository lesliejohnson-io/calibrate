"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  availableDomains,
  DEFAULT_STATE,
  filterCards,
  GROUP_BY,
  GROUP_LABELS,
  groupCards,
  isFiltered,
  parseState,
  stateToQuery,
  type BrowseState,
  type Domain,
  type PatternCardData,
} from "@/lib/browse";
import { humanize } from "@/lib/format";
import { MOMENTS, type Moment } from "@/lib/schema";
import { MomentRail, type RailNode } from "./MomentRail";
import { PatternCard } from "./PatternCard";

/**
 * The index: the library, with the moment rail in a sticky column on the
 * right -- the same column a pattern page puts its contents list in.
 *
 * State lives in the URL so a view can be linked and shared, but the
 * component renders server-side in its default state first, so the whole
 * library is in the HTML without JavaScript.
 */
export function PatternBrowser({
  cards,
  children,
}: {
  cards: PatternCardData[];
  /** The page's own masthead, which sits above the controls in the column. */
  children?: React.ReactNode;
}) {
  const [state, setState] = useState<BrowseState>(DEFAULT_STATE);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Adopt whatever the URL says once mounted, and follow back/forward.
  useEffect(() => {
    const sync = () => setState(parseState(window.location.search));
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const update = useCallback((next: BrowseState) => {
    setState(next);
    const url = `${window.location.pathname}${stateToQuery(next)}${window.location.hash}`;
    window.history.replaceState(null, "", url);
  }, []);

  const domains = useMemo(() => availableDomains(cards), [cards]);
  const visible = useMemo(() => filterCards(cards, state), [cards, state]);
  const groups = useMemo(() => groupCards(visible, state.group), [visible, state.group]);

  const railNodes = useMemo<RailNode[]>(
    () => MOMENTS.map((moment) => ({ moment, count: visible.filter((c) => c.moment === moment).length })),
    [visible],
  );

  // Section anchors only exist while grouping by Moment; otherwise the rail
  // sends people to the Moment's own page rather than a link that goes nowhere.
  const railHref = useCallback(
    (moment: Moment) => (state.group === "moment" ? `#moment-${moment}` : `/moments/${moment}`),
    [state.group],
  );

  const toggleDomain = (domain: Domain) => {
    const has = state.domains.includes(domain);
    update({
      ...state,
      domains: has ? state.domains.filter((d) => d !== domain) : [...state.domains, domain],
    });
  };

  // Roving focus across the group-by tabs.
  const onTabKeyDown = (event: React.KeyboardEvent, index: number) => {
    const keys: Record<string, number> = {
      ArrowLeft: index - 1,
      ArrowRight: index + 1,
      Home: 0,
      End: GROUP_BY.length - 1,
    };
    const target = keys[event.key];
    if (target === undefined) return;
    event.preventDefault();
    const next = (target + GROUP_BY.length) % GROUP_BY.length;
    update({ ...state, group: GROUP_BY[next] });
    const buttons = tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons?.[next]?.focus();
  };

  return (
    <div className="index-layout">
      <div className="index-main">
        {children}

        <div className="controls">
          <div className="controls-row">
            <label className="search">
              <span className="sr-only">Search patterns</span>
              <svg className="search-icon" viewBox="0 0 16 16" aria-hidden="true">
                <circle cx="7" cy="7" r="4.75" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10.5 10.5 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                placeholder="Search patterns"
                value={state.query}
                onChange={(e) => update({ ...state, query: e.target.value })}
              />
            </label>

            <div className="control">
              <span className="mono-label" id="group-by-label">
                Group by
              </span>
              <div className="tabs" role="tablist" aria-labelledby="group-by-label" ref={tabsRef}>
                {GROUP_BY.map((group, i) => {
                  const selected = state.group === group;
                  return (
                    <button
                      key={group}
                      type="button"
                      role="tab"
                      id={`tab-${group}`}
                      aria-selected={selected}
                      aria-controls="pattern-results"
                      tabIndex={selected ? 0 : -1}
                      className="tab"
                      onClick={() => update({ ...state, group })}
                      onKeyDown={(e) => onTabKeyDown(e, i)}
                    >
                      {GROUP_LABELS[group]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="controls-row">
            <span className="mono-label" id="domain-label">
              Domain
            </span>
            {/* Seeds have no control of their own: ?status=all still reveals
                them, which is all the About page promises. */}
            <div className="chips" role="group" aria-labelledby="domain-label">
              {domains.map((domain) => (
                <button
                  key={domain}
                  type="button"
                  className="filter-chip"
                  aria-pressed={state.domains.includes(domain)}
                  onClick={() => toggleDomain(domain)}
                >
                  {humanize(domain)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div id="pattern-results" role="tabpanel" aria-labelledby={`tab-${state.group}`} tabIndex={-1}>
          {groups.length === 0 ? (
            <div className="empty empty-results">
              <p>No patterns match these filters.</p>
              <button type="button" className="clear-filters" onClick={() => update(DEFAULT_STATE)}>
                Clear filters
              </button>
            </div>
          ) : (
            groups.map((group) => (
              <section
                key={group.key}
                id={group.anchor}
                className="group"
                aria-labelledby={group.name ? `group-${group.key}` : undefined}
              >
                {group.name && (
                  <header className="group-head">
                    <h2 id={`group-${group.key}`} className="group-name">
                      {group.name}
                    </h2>
                    {group.purpose && <p className="group-question">{group.purpose}</p>}
                  </header>
                )}
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
            <button type="button" className="clear-filters-inline" onClick={() => update(DEFAULT_STATE)}>
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
