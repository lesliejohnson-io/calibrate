import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPatterns, pad } from "@/lib/patterns";

/**
 * The working queue: every draft carrying review flags, in one place. Not
 * linked from the nav — it is an author's page, available only in dev.
 */
export const metadata: Metadata = {
  title: "Review queue",
  description: "Every pattern with open review items.",
};

export default function ReviewPage() {
  if (process.env.NODE_ENV === "production") notFound();

  const flagged = getAllPatterns().filter((p) => p.status === "draft" && p.review.length > 0);
  const total = flagged.reduce((sum, p) => sum + p.review.length, 0);

  return (
    <div className="wrap">
      <article className="pattern about">
        <nav className="crumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">All patterns</Link>
            </li>
            <li aria-current="page">Review queue</li>
          </ol>
        </nav>

        <header className="pattern-head">
          <h1 className="display">Needs your review</h1>
          <p className="lede">
            {total === 0
              ? "Nothing is flagged. Every draft's values are either sourced or already signed off."
              : `${total} open ${total === 1 ? "item" : "items"} across ${flagged.length} ${
                  flagged.length === 1 ? "pattern" : "patterns"
                }. Each one is a value that was drafted, inferred or left unverified, with the reason it needs checking.`}
          </p>
        </header>

        {flagged.length > 0 && (
          <section className="section" aria-labelledby="queue">
            <h2 id="queue" className="section-head">
              Open items
            </h2>
            <ul className="review-index">
              {flagged.map((p) => (
                <li key={p.slug}>
                  <p className="review-index-head">
                    <Link href={`/patterns/${p.slug}`} className="elsewhere-name">
                      {pad(p.number)} · {p.name}
                    </Link>
                    <span className="review-index-count">
                      {p.review.length} {p.review.length === 1 ? "item" : "items"}
                    </span>
                  </p>
                  <ul className="review-flag-list">
                    {p.review.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="pager-back">
          <Link href="/">Back to all patterns</Link>
        </p>
      </article>
    </div>
  );
}
