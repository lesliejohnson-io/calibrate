import type { Pattern } from "@/lib/patterns";
import { PatternToc, type TocItem } from "./PatternToc";

/**
 * The pattern page's right-hand column: "On this page", and nothing else.
 *
 * It used to open with a facts list — moment, domains, status, source count —
 * above the nav. Those facts are all stated on the page itself (the moment in
 * the breadcrumb, the sources in their own section), so the column was
 * repeating the page back at itself and pushing the one thing that earns a
 * fixed position down the screen. The nav is sticky, so it is now a column
 * that does one job while the article scrolls past it.
 *
 * `pattern` is kept in the signature because the facts are a deliberate
 * removal rather than a deletion: putting a row back is adding it here.
 */
export function PatternAside({ toc }: { pattern: Pattern; toc: TocItem[] }) {
  return (
    <aside className="pattern-aside">
      <PatternToc items={toc} />
    </aside>
  );
}
