import {
  DOMAINS,
  MOMENTS,
  MOMENT_LABELS,
  MOMENT_QUESTIONS,
  TRUST_JOBS,
  TRUST_JOB_PURPOSES,
  type Domain,
  type Moment,
  type Status,
  type TrustJob,
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
  trustJobs: TrustJob[];
  domains: Domain[];
  status: Status;
  aliases: string[];
  /** Key into the thumbnail map — the pattern's slug unless it names one. */
  thumbnail: string;
};

export type { Domain, Moment, Status, TrustJob } from "./schema";

/** "incident-report" -> "Incident report". Duplicated from lib/format to keep
 *  this module's import graph to schema alone. */
const humanizeJob = (v: string) => v.charAt(0).toUpperCase() + v.slice(1).replace(/-/g, " ");

export const GROUP_BY = ["moment", "trustJob", "none"] as const;
export type GroupBy = (typeof GROUP_BY)[number];

export const GROUP_LABELS: Record<GroupBy, string> = {
  moment: "Moment",
  trustJob: "Trust job",
  none: "A–Z",
};

export type BrowseState = {
  group: GroupBy;
  domains: Domain[];
  /** Seeds are hidden by default; this reveals them. */
  showSeeds: boolean;
  query: string;
};

export const DEFAULT_STATE: BrowseState = {
  group: "moment",
  domains: [],
  showSeeds: false,
  query: "",
};

const isGroupBy = (v: string | null): v is GroupBy =>
  v !== null && (GROUP_BY as readonly string[]).includes(v);

const isDomain = (v: string): v is Domain => (DOMAINS as readonly string[]).includes(v);

/** Reads state out of a query string, ignoring anything unrecognized. */
export function parseState(search: string): BrowseState {
  const params = new URLSearchParams(search);
  const group = params.get("group");

  return {
    group: isGroupBy(group) ? group : DEFAULT_STATE.group,
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
  if (state.group !== DEFAULT_STATE.group) params.set("group", state.group);
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
  /** The heading as it is written, or null for the ungrouped A–Z view. */
  name: string | null;
  purpose?: string;
  anchor?: string;
  cards: PatternCardData[];
};

export function groupCards(cards: PatternCardData[], group: GroupBy): CardGroup[] {
  if (group === "none") {
    const sorted = [...cards].sort((a, b) => a.name.localeCompare(b.name));
    return sorted.length > 0 ? [{ key: "all", name: null, cards: sorted }] : [];
  }

  if (group === "trustJob") {
    // A pattern has one or two trust jobs, so it can appear in two groups.
    return TRUST_JOBS.map((job) => ({
      key: job,
      name: humanizeJob(job),
      purpose: TRUST_JOB_PURPOSES[job],
      cards: cards.filter((c) => c.trustJobs.includes(job)),
    })).filter((g) => g.cards.length > 0);
  }

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
