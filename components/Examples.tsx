import { VERDICT_LABELS, VERDICT_SHAPES, type Example } from "@/lib/patterns";
import { ExternalLink } from "./ExternalLink";

/**
 * Examples as figures: the image, its credit, then the verdict and a
 * one-sentence caption (redesign-handoff.md §3).
 *
 * The verdict is a shape and a word before it is a colour — "● Applies the
 * pattern", "■ Without it" — so the two never depend on telling ink from
 * rust. A figure whose image has not been cleared for reuse yet shows a
 * placeholder with its own description rather than being dropped.
 */
export function Examples({ examples }: { examples: Example[] }) {
  return (
    <ul className="examples">
      {examples.map((e) => (
        <li key={e.caption} className="example">
          <figure className="example-figure">
            {e.image ? (
              // Plain <img>: these are author-supplied paths, often remote.
              // eslint-disable-next-line @next/next/no-img-element
              <img className="example-image" src={e.image} alt={e.alt} />
            ) : (
              <div className="example-placeholder" role="img" aria-label={e.alt}>
                <span className="label">[Image: {e.alt}]</span>
              </div>
            )}
            {e.credit && (
              <figcaption className="example-credit">
                {e.url ? <ExternalLink href={e.url}>{e.credit}</ExternalLink> : e.credit}
              </figcaption>
            )}
          </figure>

          <p className={`mono-label example-verdict is-${e.verdict}`}>
            <span aria-hidden="true">{VERDICT_SHAPES[e.verdict]}</span> {VERDICT_LABELS[e.verdict]}
          </p>
          <p className="example-caption">{e.caption}</p>
        </li>
      ))}
    </ul>
  );
}
