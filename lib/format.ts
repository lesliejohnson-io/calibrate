/**
 * Display helpers for facet values. Kept free of Node imports so client
 * components can use them — `lib/patterns.ts` reads the filesystem.
 */
import { DOMAIN_LABELS, MOMENT_LABELS, type Domain, type Moment } from "./schema";

/** How a Moment is written in the interface. See MOMENT_LABELS. */
export function momentLabel(moment: Moment): string {
  return MOMENT_LABELS[moment];
}

/** How a Domain is written in the interface. See DOMAIN_LABELS. */
export function domainLabel(domain: Domain): string {
  return DOMAIN_LABELS[domain];
}

/** "incident-report" -> "Incident report". */
export function humanize(value: string): string {
  const spaced = value.replace(/-/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/** "Levels 2–4", or "Any level" when the pattern applies across the scale. */
export function autonomyRange([low, high]: readonly [number, number]): string {
  if (low === 0 && high === 5) return "Any level";
  return low === high ? `Level ${low}` : `Levels ${low}–${high}`;
}
