"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_STATE,
  parseState,
  stateToQuery,
  type BrowseState,
  type Facets,
} from "@/lib/browse";

/**
 * One filter, two controls. The domain popover sits in the index's controls
 * band and the same filter sits in the navigation drawer, which opens over
 * every page on the site -- so the state cannot live in either of them.
 *
 * The URL is still the record: a filtered view is a link you can send. But
 * only the index writes to it. Stamping `?domain=` onto a pattern page would
 * be claiming the page is filtered when nothing on it is, so away from the
 * index the selection is held in memory and travels to the index when the
 * reader asks for it.
 *
 * The provider sits in the layout and survives client navigation, which is
 * what keeps a selection made on a pattern page alive on the way to the
 * index.
 */

export const NARROW = "(max-width: 720px)";

type BrowseValue = {
  state: BrowseState;
  update: (next: BrowseState) => void;
  facets: Facets;
  /** Viewport below the mobile breakpoint. `false` until mounted. */
  narrow: boolean;
};

const BrowseContext = createContext<BrowseValue | null>(null);

export function BrowseProvider({
  facets,
  children,
}: {
  facets: Facets;
  children: React.ReactNode;
}) {
  const [state, setState] = useState<BrowseState>(DEFAULT_STATE);
  const [narrow, setNarrow] = useState(false);

  // Adopt whatever the URL says once mounted, and follow back/forward. The
  // server renders the default state, so the whole library is in the HTML
  // without JavaScript.
  useEffect(() => {
    const sync = () => setState(parseState(window.location.search));
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia(NARROW);
    const read = () => setNarrow(mql.matches);
    read();
    mql.addEventListener("change", read);
    return () => mql.removeEventListener("change", read);
  }, []);

  /*
   * There is no search box below the breakpoint, so a `?q=` in the URL would
   * filter the list by something the reader can neither see nor undo. It is
   * dropped on arrival, and dropped again if the window is narrowed into that
   * state with a query already running.
   */
  useEffect(() => {
    if (!narrow || !state.query) return;
    setState((s) => ({ ...s, query: "" }));
    if (window.location.pathname === "/") {
      const url = `${window.location.pathname}${stateToQuery({ ...state, query: "" })}${window.location.hash}`;
      window.history.replaceState(null, "", url);
    }
  }, [narrow, state]);

  const update = useCallback((next: BrowseState) => {
    setState(next);
    if (window.location.pathname !== "/") return;
    const url = `${window.location.pathname}${stateToQuery(next)}${window.location.hash}`;
    window.history.replaceState(null, "", url);
  }, []);

  const value = useMemo(
    () => ({ state, update, facets, narrow }),
    [state, update, facets, narrow],
  );

  return <BrowseContext.Provider value={value}>{children}</BrowseContext.Provider>;
}

export function useBrowse(): BrowseValue {
  const value = useContext(BrowseContext);
  if (!value) throw new Error("useBrowse must be used inside BrowseProvider");
  return value;
}
