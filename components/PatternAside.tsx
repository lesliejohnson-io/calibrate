import {
  autonomyRange,
  humanize,
  REVERSIBILITY_STATUS,
  RISK_STATUS,
  STATUS_SHAPES,
  type Pattern,
} from "@/lib/patterns";
import { PatternToc, type TocItem } from "./PatternToc";

/**
 * The pattern page's right-hand column: the facts, then "On this page"
 * (redesign-handoff.md §3).
 *
 * Risk and reversibility keep their shape as well as their colour, so the
 * state is legible without seeing the hue. The shape is hidden from screen
 * readers — the value's own word ("Critical") is what they announce, and
 * "black square critical" is noise.
 */
function Fact({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status?: "nominal" | "caution" | "fault";
}) {
  return (
    <div className="fact">
      <dt className="mono-label fact-label">{label}</dt>
      <dd className={`fact-value${status ? ` is-${status}` : ""}`}>
        {status && (
          <span className="fact-shape" aria-hidden="true">
            {STATUS_SHAPES[status]}
          </span>
        )}
        {value}
      </dd>
    </div>
  );
}

export function PatternAside({ pattern: p, toc }: { pattern: Pattern; toc: TocItem[] }) {
  return (
    <aside className="pattern-aside">
      <dl className="facts">
        <Fact label="Risk" value={humanize(p.risk)} status={RISK_STATUS[p.risk]} />
        <Fact
          label="Reversibility"
          value={humanize(p.reversibility)}
          status={REVERSIBILITY_STATUS[p.reversibility]}
        />
        <Fact label="Trust jobs" value={p.trustJobs.map(humanize).join(", ")} />
        <Fact label="Autonomy" value={autonomyRange(p.autonomy)} />
        <Fact label="Domains" value={p.domains.map(humanize).join(", ")} />
        <Fact label="Status" value={`${humanize(p.status)} · updated ${p.updated}`} />
      </dl>

      <PatternToc items={toc} />
    </aside>
  );
}
