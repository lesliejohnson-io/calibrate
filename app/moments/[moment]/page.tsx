import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPatterns,
  momentHref,
  momentLabel,
  MOMENTS,
  MOMENT_EXPLANATIONS,
  MOMENT_QUESTIONS,
  toCardData,
  type Moment,
} from "@/lib/patterns";
import { LoopHero } from "@/components/LoopHero";
import { PatternCard } from "@/components/PatternCard";

type Props = { params: Promise<{ moment: string }> };

const isMoment = (v: string): v is Moment => (MOMENTS as readonly string[]).includes(v);

export function generateStaticParams() {
  return MOMENTS.map((moment) => ({ moment }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { moment } = await params;
  if (!isMoment(moment)) return {};
  return { title: momentLabel(moment), description: MOMENT_QUESTIONS[moment] };
}

export default async function MomentPage({ params }: Props) {
  const { moment } = await params;
  if (!isMoment(moment)) notFound();

  const all = getAllPatterns().filter((p) => p.status !== "seed");
  const cards = all.filter((p) => p.moment === moment).map(toCardData);
  const nodes = MOMENTS.map((m) => ({
    moment: m,
    count: all.filter((p) => p.moment === m).length,
  }));

  return (
    <div className="wrap">
      <article className="moment-page">
        <nav className="crumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">All patterns</Link>
            </li>
            <li aria-current="page">{momentLabel(moment)}</li>
          </ol>
        </nav>

        <header className="pattern-head">
          <h1 className="display">{momentLabel(moment)}</h1>
          <p className="lede">{MOMENT_QUESTIONS[moment]}</p>
          <p className="moment-explainer">{MOMENT_EXPLANATIONS[moment]}</p>
        </header>

        <LoopHero nodes={nodes} current={moment} hrefFor={momentHref} compact linkEmpty />

        <section className="group" aria-labelledby="moment-patterns">
          <header className="group-head">
            <h2 id="moment-patterns" className="group-name">
              {cards.length === 0
                ? "No patterns yet"
                : `${cards.length} ${cards.length === 1 ? "pattern" : "patterns"}`}
            </h2>
            {cards.length === 0 && (
              <p className="group-question">
                This Moment is named but not yet filled. Candidates are listed in the backlog.
              </p>
            )}
          </header>
          {cards.length > 0 && (
            <ul className="cards">
              {cards.map((card) => (
                <PatternCard key={card.slug} pattern={card} />
              ))}
            </ul>
          )}
        </section>
      </article>
    </div>
  );
}
