/**
 * The dashed DRAFT tag next to a section heading (redesign-handoff.md §3).
 *
 * Driven by a per-section flag in the pattern's `drafts:` block rather than
 * by its overall status, so sections clear one at a time as they are
 * reviewed. Rendered as text, not only a border, so it survives a stylesheet
 * that does not load and reads out to a screen reader.
 *
 * `when` defaults to false, so a pattern with no `drafts:` block carries no
 * tags. It defaulted to true until the pages moved their considerations and
 * examples into the body and dropped the block, at which point every page
 * was claiming all three of its sections were unreviewed.
 */
export function DraftTag({ when = false }: { when?: boolean }) {
  if (!when) return null;
  return <span className="draft-tag">Draft</span>;
}
