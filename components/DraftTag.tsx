/**
 * The dashed DRAFT tag next to a section heading (redesign-handoff.md §3).
 *
 * Driven by a per-section flag in the pattern's `drafts:` block rather than
 * by its overall status, so sections clear one at a time as they are
 * reviewed. Rendered as text, not only a border, so it survives a stylesheet
 * that does not load and reads out to a screen reader.
 */
export function DraftTag({ when = true }: { when?: boolean }) {
  if (!when) return null;
  return <span className="draft-tag">Draft</span>;
}
