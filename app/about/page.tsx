import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "@/components/ExternalLink";
import { SocialLinks } from "@/components/SocialLinks";
import { PatternAside } from "@/components/PatternAside";
import { type TocItem } from "@/components/PatternToc";
import { TocDisclosure } from "@/components/TocDisclosure";
import {
  EVIDENCE,
  EVIDENCE_DEFINITIONS,
  getAllPatterns,
  humanize,
  RELATION_DEFINITIONS,
  RELATIONS,
  RELATION_LABELS,
  STATUS_DEFINITIONS,
} from "@/lib/patterns";

export const metadata: Metadata = {
  title: "About",
  description:
    "What calibrated trust means, what a pattern means in this library, how its pages are put together, how much to trust each example, and how to cite it.",
};

/** The site's production origin, used in the citation format. */
const SITE = "https://trust-layer-patterns.vercel.app";

/** Lee & See (2004), the source of the term, cited as on The Glass Box. */
const LEE_SEE_URL = "https://journals.sagepub.com/doi/10.1518/hfes.46.1.50_30392";

/**
 * The statuses a published pattern can carry. Seed is left out: a candidate
 * that is only a name and an idea is not shown, so it is not a status a
 * reader of this site can meet.
 */
const PUBLISHED_STATUSES = ["draft", "reviewed", "stable"] as const;

/** The sections of a pattern page, and the question each one answers. */
const ANATOMY: { name: string; note: React.ReactNode }[] = [
  {
    name: "Title and intent",
    note: "The pattern's number and name, then one sentence on what it does.",
  },
  {
    name: "The story",
    note: "A real incident where this pattern was missing, from a documented source.",
  },
  {
    name: "What went wrong",
    note: "The anti-pattern: the general shape of the failure, named so you can spot it in your own systems.",
  },
  {
    name: "The pattern",
    note: (
      <>
        One sentence, starting with <em>Therefore</em>, that states the solution.
      </>
    ),
  },
  {
    name: "Try it",
    note: "A working demo of the same moment, without the pattern and with it.",
  },
  { name: "How it works", note: "The mechanism, step by step, with the key moment marked." },
  { name: "When to use it", note: "The conditions that justify it, and the ones that rule it out." },
  {
    name: "Design considerations",
    note: "Rules for applying it well, each with the reasoning behind it.",
  },
  {
    name: "In the field",
    note: "Real examples, each labelled by how much evidence stands behind it.",
  },
  {
    name: "Related patterns",
    note: "What this pattern requires, precedes, complements or works against.",
  },
  { name: "Sources", note: "What the pattern is built on." },
  { name: "Still figuring out", note: "Open questions: the learning, shown in public." },
];

/** This page's H2 sections, in the order they appear. */
const TOC: TocItem[] = [
  { id: "calibrated-trust", label: "What is calibrated trust?" },
  { id: "what", label: "What a pattern means here" },
  { id: "anatomy", label: "Anatomy of a pattern page" },
  { id: "evidence", label: "How much to trust each example" },
  { id: "status", label: "Status" },
  { id: "relations", label: "How patterns relate" },
  { id: "cite", label: "How to cite" },
  { id: "who", label: "The author" },
];

export default function AboutPage() {
  const example = getAllPatterns()[0];

  return (
    <div className="wrap pattern-layout">
      <article className="pattern about">
        <header className="pattern-head">
          <h1 className="display">About Calibrate</h1>
          <p className="lede">
            Calibrate is a library of named, reusable design patterns for calibrated trust between
            people and autonomous machines: vehicles, medical devices, surgical and industrial
            robots, drones, warehouse systems and defense systems. It&apos;s for practitioners, and
            it&apos;s also a learning tool written in public.
          </p>
          <p className="page-byline">
            Written by <Link href="#who">Leslie Johnson</Link>, a designer for calibrated trust
            between operators and autonomous systems.
          </p>
        </header>

        <TocDisclosure items={TOC} />

        <section className="section" aria-labelledby="calibrated-trust">
          <h2 id="calibrated-trust" className="section-head">
            What is calibrated trust?
          </h2>
          <div className="prose">
            <p>
              Every autonomous system has a side that faces people: the signals, controls, alerts
              and handoffs that tell someone whether to rely on the machine, when to step in, and
              how to recover.
            </p>
            <p>
              What that side has to get right is <strong>calibrated trust</strong>: trust that
              matches what the machine can actually do. Too little, and people ignore a system that
              would help them. Too much, and they stop watching when they shouldn&apos;t. These
              patterns are reusable ways to design for the right amount.
            </p>
          </div>
          <p className="anatomy-caption">
            <em>
              The idea of calibrated trust comes from human factors research, notably Lee &amp;
              See,{" "}
              <ExternalLink href={LEE_SEE_URL}>
                Trust in Automation: Designing for Appropriate Reliance
              </ExternalLink>{" "}
              (2004).
            </em>
          </p>
        </section>

        <section className="section" aria-labelledby="what">
          <h2 id="what" className="section-head">
            What a pattern means here
          </h2>
          <div className="prose">
            <p>
              A pattern is a named, reusable solution to a problem that keeps coming back, in the
              same sense the term carries in architecture and software design. It isn&apos;t a
              component, a guideline or a piece of advice. It has a name you can say out loud in a
              design review, a mechanism you can draw, and conditions under which it applies and
              others under which it doesn&apos;t.
            </p>
            <p>
              This library is narrower than most: it covers{" "}
              <strong>autonomy with physical consequences</strong>. Most AI pattern libraries cover
              AI inside software, where a bad output is a bad output. Here the machine moves, cuts,
              lifts or drives, so a mistake is measured in seconds and metres. That&apos;s why
              every pattern here starts with a real incident, and why friction is sometimes the
              feature.
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="anatomy">
          <h2 id="anatomy" className="section-head">
            Anatomy of a pattern page
          </h2>
          <p className="prose">
            Each page tells the same story in the same order: something went wrong, here&apos;s the
            name for it, and here&apos;s the design that prevents it.
          </p>
          <ol className="anatomy">
            {ANATOMY.map((row, i) => (
              <li key={row.name} className="anatomy-row">
                <span className="anatomy-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="anatomy-name">{row.name}</span>
                <span className="anatomy-note">{row.note}</span>
              </li>
            ))}
          </ol>
          <p className="anatomy-caption">
            Sections appear only when there&apos;s something to put in them, so a young pattern is
            short rather than padded with empty headings.
          </p>
        </section>

        <section className="section" aria-labelledby="evidence">
          <h2 id="evidence" className="section-head">
            How much to trust each example
          </h2>
          <p className="prose">
            Every example in &ldquo;In the field&rdquo; carries one of three labels. While examples
            are still being collected, these labels keep the library honest about how much of it is
            evidence and how much is argument.
          </p>
          <dl className="defs">
            {EVIDENCE.map((evidence) => (
              <div key={evidence} className="def">
                <dt>
                  <span className={`tag tag-evidence tag-${evidence}`}>{humanize(evidence)}</span>
                </dt>
                <dd>{EVIDENCE_DEFINITIONS[evidence]}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="section" aria-labelledby="status">
          <h2 id="status" className="section-head">
            Status
          </h2>
          <dl className="defs">
            {PUBLISHED_STATUSES.map((status) => (
              <div key={status} className="def">
                <dt>
                  <span className="status">{status}</span>
                </dt>
                <dd>{STATUS_DEFINITIONS[status]}</dd>
              </div>
            ))}
          </dl>
          <p className="anatomy-caption">
            Candidate patterns that are only a name and an idea aren&apos;t shown until
            they&apos;re written up.
          </p>
        </section>

        <section className="section" aria-labelledby="relations">
          <h2 id="relations" className="section-head">
            How patterns relate
          </h2>
          <p className="prose">
            A relationship is written once and shows up on both patterns, reworded where that reads
            better. If The Handoff requires Shared Mental Model, Shared Mental Model lists The
            Handoff under &ldquo;Required by.&rdquo;
          </p>
          <dl className="defs">
            {RELATIONS.map((relation) => (
              <div key={relation} className="def">
                <dt>{RELATION_LABELS[relation]}</dt>
                <dd>{RELATION_DEFINITIONS[relation]}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="section" aria-labelledby="cite">
          <h2 id="cite" className="section-head">
            How to cite
          </h2>
          <div className="prose">
            <p>Cite an individual pattern, not the library as a whole:</p>
            <p className="cite-format">
              Johnson, L. (2026). {"{Pattern name}"}.{" "}
              <em>Calibrate: Patterns for human&ndash;machine trust</em>. {SITE}
            </p>
            {example && (
              <>
                <p>For example:</p>
                <p className="cite-format">
                  Johnson, L. (2026). {example.name}.{" "}
                  <em>Calibrate: Patterns for human&ndash;machine trust</em>. {SITE}/patterns/
                  {example.slug}
                </p>
              </>
            )}
            <p>
              The patterns are shareable under CC BY 4.0: you&apos;re free to quote and adapt them
              with credit. The <Link href="/changelog">changelog</Link> records what changed and
              when, if you need to cite a pattern as it was on a particular date.
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="who">
          <h2 id="who" className="section-head">
            The author
          </h2>
          <div className="prose byline">
            <p>
              I&apos;m Leslie Johnson, a product designer in Pittsburgh. My work has moved from
              interfaces to systems, and I&apos;m most interested in how people work alongside
              autonomous ones.
            </p>
            <p>
              In a university research lab, I designed software you could talk to. For a
              longitudinal health study, I designed a voice-enabled tablet from scratch that read
              each question aloud, so participants with low reading fluency could answer on their
              own. Then I watched field teams in rural Appalachia run the study, and redesigned
              their onboarding. At a payments company, I saw how students struggled to pay in
              distracting environments, and redesigned the flow to be as simple as autopay.
            </p>
            <p>
              Now the machines move. A car hands the wheel back at highway speed; a drone holds
              position until someone says go. The design of those moments is what this library is
              about.
            </p>
            <p>
              I started this work as a deep dive into autonomous systems, and as a way to name and
              sort the patterns I&apos;ve uncovered. Patterns stay drafts until I find clear
              evidence, and the open questions on each page are ones I haven&apos;t answered yet.
              If you work in autonomy, robotics or human factors and something here is wrong or
              missing, <a href="mailto:leslie@lesliejohnson.io">please tell me</a>.
            </p>
          </div>
          <SocialLinks />
        </section>
      </article>

      <PatternAside toc={TOC} />
    </div>
  );
}
