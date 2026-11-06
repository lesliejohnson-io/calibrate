import type { Metadata } from "next";
import Link from "next/link";
import { SocialLinks } from "@/components/SocialLinks";
import { PatternToc, type TocItem } from "@/components/PatternToc";
import { TocDisclosure } from "@/components/TocDisclosure";
import {
  EVIDENCE_DEFINITIONS,
  getAllPatterns,
  humanize,
  RELATION_DEFINITIONS,
  RELATIONS,
  RELATION_LABELS,
  STATUS_DEFINITIONS,
  STATUSES,
} from "@/lib/patterns";

export const metadata: Metadata = {
  title: "About",
  description:
    "What a pattern means in this library, how its pages are put together, what the facets mean, and how to cite it.",
};

const SITE = "trust-layer-patterns.vercel.app";

/** The sections of a pattern page, and the question each one answers. */
const ANATOMY: { name: string; note: string }[] = [
  { name: "Intent", note: "One sentence: what the machine does, and what it buys the human." },
  { name: "Problem", note: "The competing forces the pattern resolves, not just the symptom." },
  { name: "The mechanism", note: "The sequence, step by step, with the key moment marked." },
  { name: "Without / with", note: "The same three beats, played twice, so the difference is visible." },
  { name: "When to use it", note: "The conditions that justify it — and the ones that rule it out." },
  { name: "Design considerations", note: "Imperative rules, each with the reasoning behind it." },
  { name: "In the field", note: "Examples, each labelled observed or speculative." },
  { name: "Related patterns", note: "What this requires, precedes, complements or fights with." },
  { name: "Elsewhere", note: "The same idea in other libraries, linked rather than copied." },
  { name: "Sources", note: "What the pattern is built on, grouped by kind." },
  { name: "Still figuring out", note: "Open questions. The learning shown in public." },
];

/** This page's H2 sections, in the order they appear. */
const TOC: TocItem[] = [
  { id: "what", label: "What a pattern means here" },
  { id: "anatomy", label: "Anatomy of a pattern page" },
  { id: "status", label: "Status" },
  { id: "relations", label: "How patterns relate" },
  { id: "evidence", label: "Observed and speculative examples" },
  { id: "cite", label: "How to cite" },
  { id: "who", label: "The author" },
];

export default function AboutPage() {
  const example = getAllPatterns()[0];

  return (
    <div className="wrap pattern-layout">
      <article className="pattern about">
        <header className="pattern-head">
          <h1 className="display">About this library</h1>
          <p className="lede">
            A reference library of named, reusable design patterns for the trust layer between
            humans and autonomous machines — vehicles, surgical and industrial robots, drones and
            warehouse systems. It is for practitioners, and it is also a learning tool written in
            public.
          </p>
          <p className="page-byline">
            Written by <Link href="#who">Leslie Johnson</Link>, a designer for the trust layer
            between operators and autonomous systems.
          </p>
        </header>

        <TocDisclosure items={TOC} />

        <section className="section" aria-labelledby="what">
          <h2 id="what" className="section-head">
            What a pattern means here
          </h2>
          <div className="prose">
            <p>
              A pattern is a named, reusable solution to a problem that keeps recurring — the same
              sense the term carries in software design. It is not a component, a guideline or a
              piece of advice. It has a name you can say out loud in a design review, a mechanism
              you can draw, and a set of conditions under which it applies and another under which
              it does not.
            </p>
            <p>
              What narrows this library is the second half: <strong>autonomy with physical
              consequences</strong>. Most AI pattern libraries cover AI inside software, where a bad
              output is a bad output. Here the machine moves, cuts, lifts or drives, so a
              miscalibrated handoff is measured in seconds and metres. That is why these patterns
              weigh consequence so heavily, and why friction is sometimes the feature.
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="anatomy">
          <h2 id="anatomy" className="section-head">
            Anatomy of a pattern page
          </h2>
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
            Sections appear only when there is something to put in them, so a young pattern is
            short rather than padded with empty headings.
          </p>
        </section>

        <section className="section" aria-labelledby="status">
          <h2 id="status" className="section-head">
            Status
          </h2>
          <dl className="defs">
            {STATUSES.map((status) => (
              <div key={status} className="def">
                <dt>
                  <span className="status">{status}</span>
                </dt>
                <dd>{STATUS_DEFINITIONS[status]}</dd>
              </div>
            ))}
          </dl>
          <p className="anatomy-caption">
            Seeds let candidate patterns live in the repo without making the public library look
            thicker than it is. They are hidden on the index until you ask for them.
          </p>
        </section>

        <section className="section" aria-labelledby="relations">
          <h2 id="relations" className="section-head">
            How patterns relate
          </h2>
          <p className="prose">
            A relationship is written once, on one pattern, and shows up on both — inverted where
            that is what makes it read correctly. If The Handoff requires Shared Mental Model, then
            Shared Mental Model lists The Handoff under &ldquo;Required by&rdquo;.
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

        <section className="section" aria-labelledby="evidence">
          <h2 id="evidence" className="section-head">
            Observed and speculative examples
          </h2>
          <p className="prose">
            Every example in &ldquo;In the field&rdquo; carries one of two labels. The distinction
            is not decoration: while examples are still being collected, it is the thing that keeps
            the library honest about how much of it is evidence and how much is argument.
          </p>
          <dl className="defs">
            {(["observed", "speculative"] as const).map((evidence) => (
              <div key={evidence} className="def">
                <dt>
                  <span className={`tag tag-evidence tag-${evidence}`}>{humanize(evidence)}</span>
                </dt>
                <dd>{EVIDENCE_DEFINITIONS[evidence]}</dd>
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
              Johnson, L. (2026). {"{Pattern name}"}. Calibrate. {SITE}/patterns/
              {"{slug}"}
            </p>
            {example && (
              <>
                <p>For example:</p>
                <p className="cite-format">
                  Johnson, L. (2026). {example.name}. Calibrate. {SITE}/patterns/
                  {example.slug}
                </p>
              </>
            )}
            <p>
              The patterns are shareable under CC BY 4.0, so you are free to quote and adapt them
              with attribution. The <Link href="/changelog">changelog</Link> records what changed
              and when, if you need to cite a particular state of a pattern.
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
              position until someone says go. The design of those moments is what this pattern
              library is about.
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

      <PatternToc items={TOC} />
    </div>
  );
}
