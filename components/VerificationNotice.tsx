import { sourceAnchor, type Source } from "@/lib/patterns";

type Item = { text: string; document: string; sourceId?: string };

/**
 * States what on this page has not been read against a source, and which
 * document would settle it. Sits above the opening story because that is the
 * most authoritative-looking prose on the page.
 */
export function VerificationNotice({ items, sources }: { items: Item[]; sources: Source[] }) {
  return (
    <aside className="verification-notice" aria-labelledby="verification-notice-head">
      <p id="verification-notice-head" className="mono-label">
        Not yet verified
      </p>
      {items.map((item) => {
        const [before, after] = item.text.split("{document}");
        const linked = item.sourceId && sources.some((s) => s.id === item.sourceId);
        return (
          <p key={item.text}>
            {before}
            {linked ? <a href={`#${sourceAnchor(item.sourceId!)}`}>{item.document}</a> : item.document}
            {after}
          </p>
        );
      })}
    </aside>
  );
}
