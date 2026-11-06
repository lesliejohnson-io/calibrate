import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPatterns,
  getMomentNeighbors,
  getPattern,
  getRelations,
  momentHref,
  momentLabel,
  pad,
} from "@/lib/patterns";
import { MechanismFlow } from "@/components/MechanismFlow";
import { Comparison } from "@/components/Comparison";
import { Considerations } from "@/components/Considerations";
import { Sources } from "@/components/Sources";
import { Examples } from "@/components/Examples";
import { ExternalLink } from "@/components/ExternalLink";
import { RelatedPatterns } from "@/components/RelatedPatterns";
import { PatternAside } from "@/components/PatternAside";
import { DraftTag } from "@/components/DraftTag";
import { TocDisclosure } from "@/components/TocDisclosure";
import type { TocItem } from "@/components/PatternToc";
import { CautionaryTale } from "@/components/CautionaryTale";

type Props = { params: Promise<{ slug: string }> };


export function generateStaticParams() {
  return getAllPatterns().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPattern(slug);
  return p ? { title: p.name, description: p.intent } : {};
}

export default async function PatternPage({ params }: Props) {
  const { slug } = await params;
  const p = getPattern(slug);
  if (!p) notFound();

  const { prev, next } = getMomentNeighbors(p);
  const relations = getRelations(p);
  const body = p.body;
  const drafts = p.drafts ?? {};

  const momentName = momentLabel(p.moment);
  const whenToUse = p.whenToUse ?? body.whenToUse;
  // An empty Sources section says less than no section; keep it in dev only.
  const showSources = p.sources.length > 0 || process.env.NODE_ENV !== "production";
  const showQuestions = p.showOpenQuestions && p.openQuestions.length > 0;
  /* Everything below the mechanism, in reading order. */
  const sections: TocItem[] = [
    body.problem ? { id: "problem", label: "Problem" } : null,
    whenToUse ? { id: "when", label: "When to use" } : null,
    p.considerations.length > 0 || body.considerations
      ? { id: "considerations", label: "Design considerations" }
      : null,
    p.examples.length > 0 || body.inTheField ? { id: "examples", label: "In the field" } : null,
    relations.length > 0 ? { id: "related", label: "Related patterns" } : null,
    p.crossReferences.length > 0 ? { id: "elsewhere", label: "Elsewhere" } : null,
    showSources ? { id: "sources", label: "Sources" } : null,
    showQuestions ? { id: "open-questions", label: "Still figuring out" } : null,
  ].filter((item): item is TocItem => item !== null);

  const tale = p.cautionaryTale;
  const demo = p.interface?.component;
  // null for a pattern nobody has drawn yet, which the component renders as
  // nothing rather than as a gap or a broken image.

  const toc: TocItem[] = [
    tale ? { id: "tale", label: tale.title } : null,
    p.antiPattern ? { id: "anti-pattern", label: `Anti-pattern: ${p.antiPattern}` } : null,
    { id: "solution", label: p.name },
    { id: "mechanism", label: "The mechanism" },
    ...sections,
  ].filter((item): item is TocItem => item !== null);

  return (
    <div className="wrap pattern-layout">
      <article className="pattern">
        <nav className="crumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">All patterns</Link>
            </li>
            <li>
              <Link href={momentHref(p.moment)}>{momentName}</Link>
            </li>
            <li aria-current="page">Pattern {pad(p.number)}</li>
          </ol>
        </nav>

        <header className="pattern-head">
          {/* Number and name together, the way the index card and the
              citation format write them. */}
          <h1 className="display">
            <span className="pattern-title-num">{pad(p.number)}/</span> {p.name}
          </h1>
          <p className="lede">{p.intent}</p>
        </header>

        {tale && <CautionaryTale tale={tale} numbers={p.citations} />}

        {/* The mistake and the answer to it, side by side: the pair is the
            argument, and reading one directly after the other down a single
            column loses the comparison the page is making. The demo below
            spans both, because it is the same two things again, operable. */}
        <div className="pattern-duo">
          {p.antiPattern && (
            <section className="duo-col" aria-labelledby="anti-pattern">
              <h2 id="anti-pattern" className="section-head">
                Anti-pattern: {p.antiPattern}
              </h2>
              <p className="prose-lead">{p.without.caption}</p>
            </section>
          )}

          <section className="duo-col" aria-labelledby="solution">
            <h2 id="solution" className="section-head">
              {p.name}
            </h2>
            {p.therefore && (
              <p className="therefore">
                <strong>Therefore:</strong> {p.therefore}
              </p>
            )}
          </section>
        </div>

        {/* Only the demo. The boxed "Without / With the pattern" step panels
            that used to stand in for one are gone: the anti-pattern section
            above already states the failure in a sentence, so on a pattern
            with no demo yet the boxes were restating it inside a border. */}
        {demo && (
          <section className="section section-demo" aria-label={`${p.name}: without and with`}>
            <p className="section-note section-note-lead">
              A working demo of the control, not a screenshot.
            </p>
            <Comparison
              without={p.without}
              withPattern={p.with}
              antiPattern={p.antiPattern}
              illustration={demo}
            />
          </section>
        )}

        <section className="section section-mechanism" aria-labelledby="mechanism">
          <MechanismFlow steps={p.steps} />
        </section>

        {/* The jump pills used to repeat these as chips; the sticky "On this
            page" nav carries them, so the pills were the same list twice. */}
        <TocDisclosure items={toc} />

        {body.problem && (
          <section className="section" aria-labelledby="problem">
            <h2 id="problem" className="section-head">
              Problem
            </h2>
            <div className="prose" dangerouslySetInnerHTML={{ __html: body.problem }} />
          </section>
        )}

        {whenToUse && (
          <section className="section" aria-labelledby="when">
            <h2 id="when" className="section-head">
              When to use <DraftTag when={drafts.whenToUse} />
            </h2>
            {p.whenToUse ? (
              <p className="prose-lead">{p.whenToUse}</p>
            ) : (
              <div className="prose" dangerouslySetInnerHTML={{ __html: body.whenToUse! }} />
            )}
            {body.whenNotToUse && (
              <>
                <h3 className="subhead when-not-head">Leave it out when</h3>
                <div className="prose" dangerouslySetInnerHTML={{ __html: body.whenNotToUse }} />
              </>
            )}
          </section>
        )}

        {(p.considerations.length > 0 || body.considerations) && (
          <section className="section" aria-labelledby="considerations">
            <h2 id="considerations" className="section-head">
              Design considerations <DraftTag when={drafts.considerations} />
            </h2>
            {p.considerations.length > 0 ? (
              <Considerations items={p.considerations} />
            ) : (
              <div
                className="prose considerations-prose"
                dangerouslySetInnerHTML={{ __html: body.considerations! }}
              />
            )}
          </section>
        )}

        {(p.examples.length > 0 || body.inTheField) && (
          <section className="section" aria-labelledby="examples">
            <h2 id="examples" className="section-head">
              In the field <DraftTag when={drafts.examples} />
            </h2>
            {body.inTheField && (
              <div className="prose" dangerouslySetInnerHTML={{ __html: body.inTheField }} />
            )}
            {p.examples.length > 0 && <Examples examples={p.examples} />}
          </section>
        )}

        {relations.length > 0 && (
          <section className="section" aria-labelledby="related">
            <h2 id="related" className="section-head">
              Related patterns
            </h2>
            <RelatedPatterns relations={relations} />
          </section>
        )}

        {p.crossReferences.length > 0 && (
          <section className="section" aria-labelledby="elsewhere">
            <h2 id="elsewhere" className="section-head">
              Elsewhere
            </h2>
            <ul className="elsewhere">
              {p.crossReferences.map((x) => (
                <li key={x.url} className="elsewhere-item">
                  <p className="elsewhere-head">
                    <ExternalLink href={x.url} className="elsewhere-name">
                      {x.name}
                    </ExternalLink>
                    <span className="subgroup-head">{x.library}</span>
                  </p>
                  {x.note && <p className="elsewhere-note">{x.note}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {showSources && (
          <section className="section" aria-labelledby="sources">
            <h2 id="sources" className="section-head">
              Sources
            </h2>
            {/* The notes paragraph carries the superscript citations into the
                numbered list below it. */}
            {body.notes && (
              <div
                className="prose source-notes"
                dangerouslySetInnerHTML={{ __html: body.notes }}
              />
            )}
            <Sources sources={p.sources} file={p.file} />
          </section>
        )}

        {showQuestions && (
          <aside className="section fieldnote" aria-labelledby="open-questions">
            <h2 id="open-questions" className="section-head">
              Still figuring out
            </h2>
            <ul className="fieldnote-list">
              {p.openQuestions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </aside>
        )}

        <nav className="pager" aria-label={`More ${momentName.toLowerCase()} patterns`}>
          <Link href="/" className="pager-link pager-all">
            ← All patterns
          </Link>
          {next && (
            <Link href={`/patterns/${next.slug}`} className="pager-link pager-next">
              <span className="label">
                Next pattern in series · {pad(next.number)} →
              </span>
              <span className="pager-name">{next.name}</span>
            </Link>
          )}
          {!next && prev && (
            <Link href={`/patterns/${prev.slug}`} className="pager-link pager-next">
              <span className="label">
                Previous pattern in series · {pad(prev.number)} ←
              </span>
              <span className="pager-name">{prev.name}</span>
            </Link>
          )}
        </nav>
      </article>

      <PatternAside pattern={p} toc={toc} />
    </div>
  );
}
