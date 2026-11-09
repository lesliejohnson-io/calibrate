import {
  DOMAINS,
  MOMENTS,
  MOMENT_LABELS,
  MOMENT_QUESTIONS,
  type Domain,
  type Moment,
  type Status,
} from "./schema";

/**
 * The slice of a pattern the index needs. Deliberately narrow: this crosses
 * the server/client boundary, and the full pattern carries rendered HTML.
 */
export type PatternCardData = {
  slug: string;
  number: number;
  name: string;
  intent: string;
  moment: Moment;
  domains: Domain[];
  status: Status;
  aliases: string[];
  /** Key into the thumbnail map — the pattern's slug unless it names one. */
  thumbnail: string;
  /**
   * Where the hand-drawn illustration lives, if one has been drawn. Only the
   * path and the export frame cross to the client -- the index is a client
   * component, and the drawing itself is fetched as a file like any other
   * image. `null` for the patterns nobody has drawn yet.
   */
  illustration: { src: string; width: number; height: number } | null;
};

export type { Domain, Moment, Status, TrustJob } from "./schema";

/*
 * There is no grouping choice. The index is always the five moments in order,
 * because the order is the argument the library is making — the control loop,
 * start to finish — and an A–Z list of the same fifteen cards said nothing
 * the names did not. `?group=` is simply unrecognized now, so an old link
 * still opens the index rather than breaking.
 */
export type BrowseState = {
  domains: Domain[];
  /** Seeds are hidden by default; this reveals them. */
  showSeeds: boolean;
  query: string;
};

export const DEFAULT_STATE: BrowseState = {
  domains: [],
  showSeeds: false,
  query: "",
};

const isDomain = (v: string): v is Domain => (DOMAINS as readonly string[]).includes(v);

/** Reads state out of a query string, ignoring anything unrecognized. */
export function parseState(search: string): BrowseState {
  const params = new URLSearchParams(search);

  return {
    domains: (params.get("domain") ?? "")
      .split(",")
      .map((d) => d.trim())
      .filter(isDomain),
    showSeeds: params.get("status") === "all",
    query: params.get("q")?.trim() ?? "",
  };
}

/** The inverse. Defaults are left out so a clean view has a clean URL. */
export function stateToQuery(state: BrowseState): string {
  const params = new URLSearchParams();
  if (state.domains.length > 0) params.set("domain", state.domains.join(","));
  if (state.showSeeds) params.set("status", "all");
  if (state.query) params.set("q", state.query);

  const query = params.toString();
  return query ? `?${query}` : "";
}

export function isFiltered(state: BrowseState): boolean {
  return state.domains.length > 0 || state.showSeeds || state.query !== "";
}

/** Matches name, intent and aliases (spec §4). */
function matchesQuery(card: PatternCardData, query: string): boolean {
  const needle = query.toLowerCase();
  return (
    card.name.toLowerCase().includes(needle) ||
    card.intent.toLowerCase().includes(needle) ||
    card.aliases.some((a) => a.toLowerCase().includes(needle))
  );
}

export function filterCards(cards: PatternCardData[], state: BrowseState): PatternCardData[] {
  return cards.filter((card) => {
    if (!state.showSeeds && card.status === "seed") return false;
    if (state.domains.length > 0 && !card.domains.some((d) => state.domains.includes(d))) {
      return false;
    }
    if (state.query && !matchesQuery(card, state.query)) return false;
    return true;
  });
}

export type CardGroup = {
  key: string;
  /** The heading as it is written. */
  name: string;
  purpose: string;
  anchor: string;
  cards: PatternCardData[];
};

/**
 * The five moments in order, with the moments nothing matched left out — a
 * heading over no cards is a dead end, and filtering is the only way a moment
 * ends up empty. The rail still lists all five, greyed out, so the shape of
 * the library stays visible while a filter is narrowing it.
 */
export function groupCards(cards: PatternCardData[]): CardGroup[] {
  return MOMENTS.map((moment) => ({
    key: moment,
    name: MOMENT_LABELS[moment],
    purpose: MOMENT_QUESTIONS[moment],
    anchor: `moment-${moment}`,
    cards: cards.filter((c) => c.moment === moment),
  })).filter((g) => g.cards.length > 0);
}

/** Only offer domains the library actually uses, so no filter leads nowhere. */
export function availableDomains(cards: PatternCardData[]): Domain[] {
  const used = new Set(cards.flatMap((c) => c.domains));
  return DOMAINS.filter((d) => used.has(d));
}

/**
 * How many patterns each domain has, for the numbers in the domain popover.
 * Counted over whatever list is passed rather than over the current results
 * on purpose: a count that moved while you typed would be unreadable, and the
 * question the number answers is how much of the library a domain covers.
 */
export function domainCounts(cards: PatternCardData[]): Record<Domain, number> {
  const counts = Object.fromEntries(DOMAINS.map((d) => [d, 0])) as Record<Domain, number>;
  for (const card of cards) {
    for (const domain of card.domains) counts[domain] += 1;
  }
  return counts;
}

/**
 * The least the drawer needs to do its job on any page. The index already
 * holds the full card list, but the drawer lives in the layout and opens over
 * a pattern page, a moment page or the changelog, where no card list exists.
 * Rather than ship fifteen cards to every route, the layout ships this: the
 * domains on offer, how many patterns each one covers, and one array of
 * domains per pattern, which is all a match count needs.
 *
 * Seeds are left out. Nothing in the library is a seed today, so the drawer's
 * numbers and the index's agree; if a seed is ever added, `?status=all` will
 * reveal it on the index and the drawer will keep counting without it.
 */
export type Facets = {
  total: number;
  domains: Domain[];
  counts: Record<Domain, number>;
  patterns: Domain[][];
};

export function toFacets(cards: PatternCardData[]): Facets {
  const published = cards.filter((c) => c.status !== "seed");
  return {
    total: published.length,
    domains: availableDomains(published),
    counts: domainCounts(published),
    patterns: published.map((c) => c.domains),
  };
}

/** How many patterns a domain selection would leave. Empty means all of them. */
export function countMatches(facets: Facets, domains: Domain[]): number {
  if (domains.length === 0) return facets.total;
  return facets.patterns.filter((ds) => ds.some((d) => domains.includes(d))).length;
}
