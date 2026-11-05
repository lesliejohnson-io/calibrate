import { sourceAnchor, sourceGroups, SOURCE_TYPE_ROW_LABELS, type Source } from "@/lib/patterns";
import { ExternalLink } from "./ExternalLink";

/**
 * One numbered list: number, title and authors on the left, the kind of
 * source right-aligned (redesign-handoff.md §3).
 *
 * The numbering still comes from `sourceGroups`, which is also what assigns
 * the footnote numbers in the prose — the list is that running order
 * flattened, so a "[3]" in the notes and the third row here stay the same
 * source. The type headings are gone; each row carries its own label.
 */
export function Sources({ sources, file }: { sources: Source[]; file: string }) {
  if (sources.length === 0) {
    // Nothing in production: an empty Sources section says less than no
    // section at all. In development it's a reminder to go and research.
    if (process.env.NODE_ENV === "production") return null;
    return (
      <div className="empty">
        <p>No sources yet.</p>
        <p className="empty-hint">
          Add them under <code>sources:</code> in <code>{file}</code>. This reminder is only shown
          in development.
        </p>
      </div>
    );
  }

  const rows = sourceGroups(sources).flatMap((group) =>
    group.items.map((source, i) => ({ source, type: group.type, n: group.start + i })),
  );

  return (
    <ol className="sources">
      {rows.map(({ source: s, type, n }) => (
        <li key={n} className="source" id={s.id ? sourceAnchor(s.id) : undefined} value={n}>
          <span className="label source-num" aria-hidden="true">
            {n}
          </span>
          <span className="source-body">
            <span className="source-title">
              {s.url ? <ExternalLink href={s.url}>{s.title}</ExternalLink> : s.title}
            </span>
            {(s.author || s.year) && (
              <span className="source-meta">{[s.author, s.year].filter(Boolean).join(" · ")}</span>
            )}
          </span>
          <span className="mono-label source-type">{SOURCE_TYPE_ROW_LABELS[type]}</span>
        </li>
      ))}
    </ol>
  );
}
