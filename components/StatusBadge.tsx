import { STATUS_DEFINITIONS, type Status } from "@/lib/schema";

/**
 * A pattern's status as a line of metadata: the word, in the site's data face.
 * The verification notice carries the warning, so this has no border or colour.
 *
 * The hidden prefix makes it read as "Status: Draft". It is deliberately not
 * `role="status"`, which is a live region for content that changes.
 */
export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className="label status-badge" title={STATUS_DEFINITIONS[status]}>
      <span className="sr-only">Status: </span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
