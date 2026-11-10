import type { Metadata } from "next";
import Link from "next/link";
import { buildChangelog, getCommits } from "@/lib/changelog";
import { getAllPatterns, pad } from "@/lib/patterns";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What changed in the library, and when. Dated from the patterns and the git history.",
};

export default function ChangelogPage() {
  const patterns = getAllPatterns();
  const bySlug = new Map(patterns.map((p) => [p.slug, p]));
  const commits = getCommits();
  /**
   * Only changes to patterns belong on this page. A commit that touched no
   * file under content/patterns — tooling, the stylesheet, an illustration,
   * a copy fix on the about page — is repository history rather than library
   * change, and listing it told the reader nothing about the library.
   *
   * The filter is here rather than in `getCommits`, so the "history was not
   * available" note below still answers the question it is asking: whether
   * git could be read at all, not whether anything it said was about a
   * pattern.
   */
  const patternCommits = commits.filter((c) => c.patterns.length > 0);
  const days = buildChangelog(
    patternCommits,
    patterns.map((p) => ({ slug: p.slug, updated: p.updated })),
  );

  return (
    <div className="wrap">
      <article className="pattern about">
        <nav className="crumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">All patterns</Link>
            </li>
            <li aria-current="page">Changelog</li>
          </ol>
        </nav>

        <header className="pattern-head">
          <h1 className="display">What changed, and when</h1>
          <p className="lede">
            Built from the <code>updated</code> date on each pattern and from the commit history.
            It doubles as a learning record: the shape of the library over time, including the
            parts that were rewritten. Only changes to patterns are listed.
          </p>
        </header>

        {commits.length === 0 && (
          <p className="changelog-note">
            Commit history was not available at build time, so this page is showing the dates
            recorded on the patterns themselves.
          </p>
        )}

        <ol className="changelog">
          {days.map((day) => (
            <li key={day.date} className="changelog-day">
              <h2 className="changelog-date">{day.date}</h2>
              <div className="changelog-body">
                {day.updated.length > 0 && (
                  <p className="changelog-updated">
                    <span className="ui-label">Patterns dated this day</span>
                    <span className="changelog-links">
                      {day.updated.map((slug) => {
                        const p = bySlug.get(slug);
                        return p ? (
                          <Link key={slug} href={`/patterns/${slug}`} className="changelog-pattern">
                            {pad(p.number)} {p.name}
                          </Link>
                        ) : null;
                      })}
                    </span>
                  </p>
                )}
                {day.commits.length > 0 && (
                  <ul className="changelog-commits">
                    {day.commits.map((commit) => (
                      <li key={commit.hash} className="changelog-commit">
                        <code className="changelog-hash">{commit.hash}</code>
                        <span className="changelog-subject">{commit.subject}</span>
                        <span className="changelog-touched label">
                          touched {commit.patterns.join(", ")}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </article>
    </div>
  );
}
