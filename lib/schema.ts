import { z } from "zod";

/**
 * The vocabularies behind the facets. Exported as `as const` arrays so the UI
 * can build filter chips and the About page's definitions from the same source
 * the validator uses.
 */
export const MOMENTS = ["before", "during", "transition", "failure", "after"] as const;
export const TRUST_JOBS = ["know", "predict", "intervene", "recover", "calibrate"] as const;
export const RISKS = ["low", "elevated", "critical"] as const;
export const REVERSIBILITY = ["reversible", "costly", "irreversible"] as const;
export const STATUSES = ["seed", "draft", "reviewed", "stable"] as const;
export const DOMAINS = [
  "automotive",
  "surgical",
  "industrial",
  "drone",
  "warehouse",
  "maritime",
  "aviation",
  "home",
  "general",
] as const;
export const SOURCE_TYPES = ["paper", "book", "standard", "incident-report", "article", "talk"] as const;
export const RELATIONS = ["requires", "complements", "alternative-to", "tension-with", "precedes"] as const;

/**
 * The three console states a facet value can read as. Risk and reversibility
 * are the only facets that have one.
 */
export const STATUS_LEVELS = ["nominal", "caution", "fault"] as const;
export type StatusLevel = (typeof STATUS_LEVELS)[number];

/**
 * The shape that carries the state when colour cannot — for anyone who cannot
 * separate the three hues, and for print. Never show a state without it.
 */
export const STATUS_SHAPES: Record<StatusLevel, string> = {
  nominal: "●",
  caution: "▲",
  fault: "■",
};

export const RISK_STATUS: Record<(typeof RISKS)[number], StatusLevel> = {
  low: "nominal",
  elevated: "caution",
  critical: "fault",
};

export const REVERSIBILITY_STATUS: Record<(typeof REVERSIBILITY)[number], StatusLevel> = {
  reversible: "nominal",
  costly: "caution",
  irreversible: "fault",
};

/**
 * How much evidence stands behind an example: a documented system or
 * incident, an event known only from news reporting, or the author's own
 * concept. Keeping the three apart is what keeps the library honest.
 */
export const EVIDENCE = ["observed", "illustrative", "speculative"] as const;

export type Moment = (typeof MOMENTS)[number];
export type TrustJob = (typeof TRUST_JOBS)[number];
export type Risk = (typeof RISKS)[number];
export type Reversibility = (typeof REVERSIBILITY)[number];
export type Status = (typeof STATUSES)[number];
export type Domain = (typeof DOMAINS)[number];
export type Relation = (typeof RELATIONS)[number];
export type Evidence = (typeof EVIDENCE)[number];

/**
 * A relationship read from the other end. If B requires A, then A's page lists
 * B under "Required by" — the same edge, inverted, so each one is written once.
 */
export const INVERSE_RELATIONS = {
  requires: "required-by",
  precedes: "follows",
  complements: "complements",
  "alternative-to": "alternative-to",
  "tension-with": "tension-with",
} as const satisfies Record<Relation, string>;

export type RelationKey = Relation | (typeof INVERSE_RELATIONS)[Relation];

/** Group headings on the pattern page, in the order they are shown. */
export const RELATION_LABELS: Record<RelationKey, string> = {
  requires: "Requires",
  "required-by": "Required by",
  precedes: "Precedes",
  follows: "Follows",
  complements: "Complements",
  "alternative-to": "Alternative to",
  "tension-with": "In tension with",
};

export const RELATION_ORDER: RelationKey[] = [
  "requires",
  "required-by",
  "precedes",
  "follows",
  "complements",
  "alternative-to",
  "tension-with",
];

export const SOURCE_TYPE_LABELS: Record<(typeof SOURCE_TYPES)[number] | "other", string> = {
  paper: "Papers",
  book: "Books",
  standard: "Standards",
  "incident-report": "Incident reports",
  article: "Articles",
  talk: "Talks",
  other: "Other",
};

/**
 * How each Moment is written in the interface. Only `after` differs from a
 * plain humanize() of the data value: the moment covers the aftermath and
 * everything that follows from it, and "After" alone read as a single instant.
 * The stored value stays `after`, so content files are untouched.
 */
/**
 * The same vocabulary in the singular, for the label on one row of the
 * Sources list. "Incident report" is cut to "Incident" there: the row is
 * right-aligned in a narrow column and the word "report" earns nothing.
 */
export const SOURCE_TYPE_ROW_LABELS: Record<(typeof SOURCE_TYPES)[number] | "other", string> = {
  paper: "Paper",
  book: "Book",
  standard: "Standard",
  "incident-report": "Incident",
  article: "Article",
  talk: "Talk",
  other: "Source",
};

export const MOMENT_LABELS: Record<Moment, string> = {
  before: "Before",
  during: "During",
  transition: "Transition",
  failure: "Failure",
  after: "After and over time",
};

/** The question each Moment answers, used as the one-line purpose under group headings. */
export const MOMENT_QUESTIONS: Record<Moment, string> = {
  before: "Before the machine acts, does the human agree?",
  during: "While it runs, can the human see and predict it?",
  transition: "When control changes hands, is the human ready?",
  failure: "When it can't do the job, what happens?",
  after: "What happened, and what is it doing to us over time?",
};

/**
 * The same question cut to one short line, for the loop on the index where a
 * station is a quarter of a column wide. Each one is the operative clause of
 * the full question in MOMENT_QUESTIONS, which pages still use in full.
 */
export const MOMENT_PROMPTS: Record<Moment, string> = {
  before: "Does the human agree?",
  during: "Can they see and predict it?",
  transition: "Is the human ready?",
  failure: "What happens when it can't?",
  after: "What is it doing to us over time?",
};

/** The two or three sentences that open each Moment's page. */
export const MOMENT_EXPLANATIONS: Record<Moment, string> = {
  before:
    "Autonomy starts with consent. Before the machine acts, the human needs to know what it intends to do, agree that it should, and have a way to say no. These patterns cover the moment of authorization — what gets shown, what gets confirmed, and how much friction the consequence deserves.",
  during:
    "Once the machine is running, the human's job shifts from deciding to supervising. That only works if its state, reasoning and next move are legible without being noisy. These patterns keep the human able to see what is happening and predict what comes next, so trouble is noticed before it becomes an event.",
  transition:
    "Control changing hands is the most dangerous moment in a partly autonomous system. Someone who has been out of the loop has to rebuild their picture of the situation before they are accountable for it. These patterns cover how a transfer is announced, what state moves with it, and how much time the human gets to orient.",
  failure:
    "Every autonomous system eventually meets a situation it was not built for. What matters is whether it steps down into a defined state and says so, or just quietly stops being trustworthy. These patterns cover fallback ladders, minimal risk states, and how limits get communicated when capability is lost.",
  after:
    "Trust is not set once. It is repaired and recalibrated after every surprise, which means the human has to reconstruct what the machine saw and decided, then adjust how much to rely on it next time. This is the newest part of the library: recovery, review and calibration over time.",
};

/**
 * The 0–5 autonomy scale used by the `autonomy` facet. SAE's driving-
 * automation levels are the reference point, generalized here because the
 * library also covers robots, drones and warehouse systems.
 */
export const AUTONOMY_LEVELS: { level: number; name: string; detail: string }[] = [
  { level: 0, name: "None", detail: "The human performs the task. The machine does nothing on its own." },
  {
    level: 1,
    name: "Assistance",
    detail: "The machine handles one narrow part of the task. The human does the rest and stays responsible throughout.",
  },
  {
    level: 2,
    name: "Partial",
    detail: "The machine controls several parts of the task at once, but the human supervises continuously and is expected to intervene.",
  },
  {
    level: 3,
    name: "Conditional",
    detail: "Within defined conditions the machine runs the task itself. The human can disengage, but must take over when asked.",
  },
  {
    level: 4,
    name: "High",
    detail: "Inside its operating envelope the machine handles everything, including reaching a safe state on its own if nobody responds.",
  },
  {
    level: 5,
    name: "Full",
    detail: "No operating envelope limits, and no expectation of a human fallback.",
  },
];

/** What each relationship between two patterns means. */
export const RELATION_DEFINITIONS: Record<Relation, string> = {
  requires: "The other pattern has to be in place for this one to work at all.",
  complements: "They reinforce each other, but neither depends on the other.",
  "alternative-to": "Two ways of solving the same problem. Pick one.",
  "tension-with": "Applying one makes the other harder. The trade-off is the point.",
  precedes: "One comes before the other when control moves between person and machine.",
};

export const RISK_DEFINITIONS: Record<Risk, string> = {
  low: "A mistake is an inconvenience. Nothing is damaged and nobody is hurt.",
  elevated:
    "A mistake costs time, money or equipment, or puts someone in a situation they have to recover from.",
  critical:
    "A mistake can injure or kill, or do damage at a scale that reaches past the people operating it.",
};

export const REVERSIBILITY_DEFINITIONS: Record<Reversibility, string> = {
  reversible: "Undo it and the world is as it was.",
  costly: "It can be put right, but it takes time, money or an apology.",
  irreversible: "Once it has happened, it cannot be taken back.",
};

export const STATUS_DEFINITIONS: Record<Status, string> = {
  seed: "A candidate: name and intent only. Kept in the repo but off the index until it is written up.",
  draft: "The story, mechanism and pattern are written, with a few sources so far.",
  reviewed: "Every section filled, at least three sources, and at least one observed example.",
  stable: "Reviewed, then revisited after real-world use or feedback.",
};

export const EVIDENCE_DEFINITIONS: Record<Evidence, string> = {
  observed: "A real system, or an incident with an official investigation or record you can follow.",
  illustrative:
    "A real event known only from news reporting. Useful for the shape of the failure, not for its details.",
  speculative: "The author's own concept: plausible, but not yet seen in the field.",
};

/** What each trust job buys the human, used as the one-line group purpose. */
export const TRUST_JOB_PURPOSES: Record<TrustJob, string> = {
  know: "See the machine's state and reasoning.",
  predict: "Anticipate what it will do next.",
  intervene: "Act, override or stop it.",
  recover: "Get back to a safe state.",
  calibrate: "Trust it the right amount over time.",
};

const hasNoDuplicates = (values: readonly string[]) => new Set(values).size === values.length;

/**
 * gray-matter turns an unquoted YAML date into a JS Date, so accept both and
 * normalize to YYYY-MM-DD.
 */
const isoDate = z
  .union([z.string(), z.date()])
  .transform((v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v.trim()))
  .refine((v) => /^\d{4}-\d{2}-\d{2}$/.test(v), "expected a YYYY-MM-DD date");

const stepSchema = z.object({
  title: z.string().min(1),
  detail: z.string().min(1),
  note: z.string().min(1).optional(),
  key: z.boolean().optional(),
});

/**
 * The three beats of a flow. A fourth is allowed because some patterns do not
 * end when the operator acts: Explainable Fault's with-side runs on to "Fault
 * recorded", which is the half of that pattern the anti-pattern loses. Four
 * is the ceiling — at five the line stops reading as a sequence and wants to
 * be the mechanism list instead.
 */
const contrastSchema = z.object({
  steps: z
    .array(z.string().min(1))
    .min(3, "needs at least three beats")
    .max(4, "four beats is the most a flow line can carry"),
  caption: z.string().min(1),
});

const sourceSchema = z.object({
  /**
   * A short handle the body can cite as `[cite:bainbridge-1983]`. Optional:
   * a source only needs one if it is actually cited in the prose.
   */
  id: z
    .string()
    .regex(/^[a-z0-9][a-z0-9-]*$/, "use lower-case letters, digits and hyphens, e.g. bainbridge-1983")
    .optional(),
  title: z.string().min(1),
  author: z.string().min(1).optional(),
  year: z.union([z.string(), z.number()]).optional(),
  url: z.url().optional(),
  note: z.string().min(1).optional(),
  type: z.enum(SOURCE_TYPES).optional(),
});

/**
 * What an example shows: the pattern applied, or the cost of leaving it out.
 * Rendered as a shape plus a word — "● Applies the pattern", "■ Without it" —
 * so the verdict never rests on colour.
 */
export const VERDICTS = ["applies", "without"] as const;
export type Verdict = (typeof VERDICTS)[number];

export const VERDICT_LABELS: Record<Verdict, string> = {
  applies: "Applies the pattern",
  without: "Without it",
};

export const VERDICT_SHAPES: Record<Verdict, string> = {
  applies: "●",
  without: "■",
};

const exampleSchema = z
  .object({
    /** A path in /public. Left out while the figure is still a placeholder. */
    image: z.string().min(1).optional(),
    alt: z.string().min(1),
    /** e.g. "BEA, AF447 Final Report, 2012, Figure 70". */
    credit: z.string().min(1).optional(),
    verdict: z.enum(VERDICTS),
    caption: z.string().min(1),
    url: z.url().optional(),
    domain: z.enum(DOMAINS).optional(),
    evidence: z.enum(EVIDENCE).optional(),
  })
  .refine((e) => !e.image || e.alt, {
    message: "an example with an image needs alt text",
    path: ["alt"],
  });

/**
 * The interface illustrations that exist as components. A pattern names one to
 * show real screens in the without / with section instead of the box diagram;
 * anything not on this list fails the build rather than rendering nothing.
 */
export const INTERFACE_COMPONENTS = [
  "drone-release",
  "flight-computer",
  "explainable-fault",
  "autothrottle",
  "stop-anywhere",
  "alert-triage",
  "graceful-degradation",
] as const;
export type InterfaceComponent = (typeof INTERFACE_COMPONENTS)[number];

const interfaceSchema = z.object({
  component: z.enum(INTERFACE_COMPONENTS),
});

/**
 * The incident a pattern opens with. Every field is required once the block
 * exists, because a half-written tale is worse than none: a story with no
 * date or no source reads as authoritative while resting on nothing.
 *
 * `sourceId` has to name a source on the same page, and is checked where the
 * file is parsed rather than here, since the schema cannot see the sources
 * list from inside this object. A tale is Observed by definition — it is a
 * thing that happened — so a pattern with no real incident behind it carries
 * "Needs a cautionary tale" in `review:` instead of an invented one.
 */
const cautionaryTaleSchema = z.object({
  title: z.string().min(1),
  date: z.string().min(1),
  place: z.string().min(1),
  story: z.string().min(1),
  /**
   * The source the tale rests on. A list where one source does not carry the
   * whole story — the citation is written here rather than per sentence, so
   * every source the tale leans on has to be named here or not at all.
   */
  sourceId: z.union([z.string().min(1), z.array(z.string().min(1)).min(1)]),
});

/** The tale's sources as a list, whether one was named or several. */
export function taleSourceIds(tale: { sourceId: string | string[] }): string[] {
  return Array.isArray(tale.sourceId) ? tale.sourceId : [tale.sourceId];
}

/**
 * One design consideration: the rule stated as an instruction, then the one
 * or two sentences that say why it holds. Keeping the two apart is what lets
 * the page set the rule in bold and the reason in running text.
 */
const considerationSchema = z.object({
  rule: z.string().min(1),
  why: z.string().min(1),
});

/**
 * Which drafted sections still carry a DRAFT tag. Cleared field by field as
 * each one is reviewed, rather than all at once with the pattern's status.
 */
const draftsSchema = z
  .object({
    whenToUse: z.boolean().optional(),
    considerations: z.boolean().optional(),
    examples: z.boolean().optional(),
  })
  .optional();

const relatedSchema = z.object({
  slug: z.string().min(1),
  type: z.enum(RELATIONS),
  note: z.string().min(1, "every related pattern needs a one-sentence note"),
});

const crossReferenceSchema = z.object({
  library: z.string().min(1),
  name: z.string().min(1),
  url: z.url(),
  note: z.string().min(1).optional(),
});

const autonomySchema = z
  .tuple([z.number().int().min(0).max(5), z.number().int().min(0).max(5)])
  .refine(([low, high]) => low <= high, "expected [low, high] with low <= high")
  .optional();

const domainsSchema = z
  .array(z.enum(DOMAINS))
  .min(1)
  .refine(hasNoDuplicates, "contains duplicates")
  .refine(
    (d) => !(d.includes("general") && d.length > 1),
    '"general" cannot be combined with a specific domain',
  )
  .default(["general"]);

/**
 * A pattern's frontmatter. `moment` is the only new required field: it drives
 * grouping, and a silent default would file a pattern under the wrong heading
 * instead of failing the build. Everything else has a default.
 */
export const frontmatterSchema = z
  .object({
    number: z.number().int().min(1),
    name: z.string().min(1),
    intent: z.string().min(1).max(240, "keep the intent to one sentence (240 characters)"),

    /**
     * The index card's line, where the full intent is a sentence too long to
     * sit under a thumbnail at 260px. One sentence, no example — the examples
     * live on the pattern page (redesign-handoff.md §2). A pattern without
     * one shows its `intent` on the card, which is the right answer whenever
     * the intent is already short.
     */
    cardIntent: z
      .string()
      .min(1)
      .max(160, "a card line is one short sentence (160 characters)")
      .optional(),

    moment: z.enum(MOMENTS),
    /*
     * The four judgment ratings. They are no longer shown anywhere on the
     * site, but they stay in the schema so the values already written in
     * frontmatter keep validating and nothing has to be deleted to pass the
     * build. They are optional rather than defaulted: a default would invent
     * a rating for a pattern whose author never gave one. To bring them back,
     * render them again — the data is still here and still type-checked.
     */
    trustJobs: z
      .array(z.enum(TRUST_JOBS))
      .min(1)
      .max(2, "a pattern has one or two trust jobs")
      .refine(hasNoDuplicates, "contains duplicates")
      .optional(),
    risk: z.enum(RISKS).optional(),
    reversibility: z.enum(REVERSIBILITY).optional(),
    autonomy: autonomySchema,
    domains: domainsSchema,

    status: z.enum(STATUSES).default("draft"),
    updated: isoDate,
    aliases: z.array(z.string().min(1)).default([]),

    related: z.array(relatedSchema).default([]),
    crossReferences: z.array(crossReferenceSchema).default([]),
    sources: z
      .array(sourceSchema)
      .default([])
      .refine(
        (list) => {
          const ids = list.map((s) => s.id).filter((id): id is string => Boolean(id));
          return hasNoDuplicates(ids);
        },
        "two sources share the same id; a citation could not tell them apart",
      ),
    examples: z.array(exampleSchema).default([]),

    /**
     * One short paragraph on the conditions this pattern is for. Frontmatter
     * rather than a body heading: it is a fixed field of the entry, and the
     * page renders it in a fixed place.
     */
    whenToUse: z.string().min(1).optional(),
    considerations: z.array(considerationSchema).default([]),
    drafts: draftsSchema,

    /* The incident the page opens with, and the one-sentence answer to it. */
    cautionaryTale: cautionaryTaleSchema.optional(),
    therefore: z.string().min(1).optional(),

    /**
     * Which mark from the thumbnail map this pattern shows. Defaults to the
     * slug, which is what every pattern so far uses; name one explicitly only
     * when two patterns share a drawing.
     */
    thumbnail: z.string().min(1).optional(),

    openQuestions: z.array(z.string().min(1)).default([]),
    showOpenQuestions: z.boolean().optional(),

    /**
     * Author-facing review flags: what to check before this entry is trusted,
     * and why. Each item names the thing and its reason — "Mechanism steps:
     * drafted, not from research". Shown on the pattern page only while the
     * status is `draft`, and collected on /review. Not a reader-facing
     * surface: `openQuestions` is for what the pattern itself has not settled.
     */
    review: z.array(z.string().min(1)).default([]),

    steps: z
      .array(stepSchema)
      .min(2)
      .max(8, "3-6 steps work best; 8 is the hard limit")
      .refine(
        (steps) => steps.filter((s) => s.key).length <= 1,
        "only one step can be the key moment",
      ),
    without: contrastSchema,
    with: contrastSchema,

    /**
     * The named mistake the left-hand panel shows. Without it the panel is
     * just "Without" — the absence of the pattern rather than a thing people
     * do.
     */
    antiPattern: z.string().min(1).optional(),

    /**
     * Show built interface screens in place of the box diagram. Patterns
     * without it keep the diagram.
     */
    interface: interfaceSchema.optional(),
  })
  .transform((fm) => ({
    ...fm,
    showOpenQuestions: fm.showOpenQuestions ?? fm.openQuestions.length > 0,
  }));

export type Frontmatter = z.infer<typeof frontmatterSchema>;

/** One "field — what's wrong" line per problem, aligned for readable build output. */
export function formatIssues(error: z.ZodError): string[] {
  const rows = error.issues.map((issue) => ({
    field: issue.path.join(".") || "(root)",
    message: issue.message,
  }));
  const width = Math.max(...rows.map((r) => r.field.length));
  return rows.map((r) => `${r.field.padEnd(width)}  ${r.message}`);
}
