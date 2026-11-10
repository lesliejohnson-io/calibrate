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
 * The filter state, held above the index. The only control is the index's
 * controls band, but the state outlives it: a reader can tick a domain,
 * follow a card into a pattern page and come back to the selection intact.
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

type BrowseValue = {
  state: BrowseState;
  update: (next: BrowseState) => void;
  facets: Facets;
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

  // Adopt whatever the URL says once mounted, and follow back/forward. The
  // server renders the default state, so the whole library is in the HTML
  // without JavaScript.
  useEffect(() => {
    const sync = () => setState(parseState(window.location.search));
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const update = useCallback((next: BrowseState) => {
    setState(next);
    if (window.location.pathname !== "/") return;
    const url = `${window.location.pathname}${stateToQuery(next)}${window.location.hash}`;
    window.history.replaceState(null, "", url);
  }, []);

  const value = useMemo(() => ({ state, update, facets }), [state, update, facets]);

  return <BrowseContext.Provider value={value}>{children}</BrowseContext.Provider>;
}

export function useBrowse(): BrowseValue {
  const value = useContext(BrowseContext);
  if (!value) throw new Error("useBrowse must be used inside BrowseProvider");
  return value;
}
