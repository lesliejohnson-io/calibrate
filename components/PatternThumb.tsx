/**
 * The pattern thumbnails (redesign-handoff.md §4).
 *
 * The grammar, which every new pattern follows:
 *
 *   square          the machine
 *   circle          a human — never a generic dot
 *   solid fill      in control right now
 *   diamond         a neutral point: state, signal, outcome, a step in a log
 *   solid triangle  direction (arrowhead)
 *
 * One idea per image, centred, small against an empty black field. The marks
 * are drawn at full size in a 240x132 frame and the wrapper scales them about
 * the centre, so the same path data serves both sizes and only the scale and
 * the stroke width change.
 *
 * Marks are drawn in `currentColor` rather than a literal white, so a
 * thumbnail follows --thumb-ink and the theme toggle keeps working.
 */

type Size = "card" | "small";

/** Scale and stroke per size: about 1.3 rendered units of stroke either way. */
const SIZES: Record<Size, { scale: number; stroke: number }> = {
  card: { scale: 0.32, stroke: 4 },
  small: { scale: 0.5, stroke: 6 },
};

/** A solid diamond: a neutral point, or the head of an arrow. */
const diamond = (cx: number, cy: number, r = 5) => (
  <path
    d={`M${cx} ${cy - r} L${cx + r} ${cy} L${cx} ${cy + r} L${cx - r} ${cy} Z`}
    fill="currentColor"
    stroke="none"
  />
);

type Mark = { label: string; marks: React.ReactElement };

/**
 * Keyed by a pattern's `thumbnail` field, which defaults to its slug. A
 * pattern with no entry renders an empty field rather than a wrong mark.
 */
export const THUMBNAILS: Record<string, Mark> = {
  handoff: {
    label: "A square and a circle, with the point of control passing from the machine to the human",
    marks: (
      <>
        <rect x="70" y="44" width="44" height="44" />
        <circle cx="166" cy="66" r="22" />
        {diamond(144, 66)}
      </>
    ),
  },
  "glass-box": {
    label: "A square with a chain of marks climbing inside it: the machine's reasoning, visible",
    marks: (
      <>
        <rect x="88" y="34" width="64" height="64" />
        <path d="M104 82 L128 58" />
        {diamond(104, 82, 3)}
        {diamond(116, 70, 3)}
        {diamond(128, 58)}
      </>
    ),
  },
  "graceful-degradation": {
    label:
      "A descending staircase with one solid square part-way down: the machine still in control, one step lower",
    marks: (
      <>
        <path d="M64 38 H96 V58 H128 V78 H160 V98 H176" />
        <rect x="138" y="65" width="12" height="12" fill="currentColor" stroke="none" />
      </>
    ),
  },
  "appropriate-friction": {
    label: "A solid circle and an arrow held at a gate before the outcome",
    marks: (
      <>
        <circle cx="66" cy="66" r="9" fill="currentColor" stroke="none" />
        <path d="M84 66 H120" />
        <path d="M130 66 L118 59.5 V72.5 Z" fill="currentColor" stroke="none" />
        <rect x="134" y="38" width="3" height="56" fill="currentColor" stroke="none" />
        <path d="M176 60 L182 66 L176 72 L170 66 Z" />
      </>
    ),
  },
  "shared-mental-model": {
    label: "A circle overlapping a square: the human's model and the machine's state, in sync",
    marks: (
      <>
        <circle cx="100" cy="66" r="30" />
        <rect x="110" y="36" width="60" height="60" />
        {diamond(120, 66)}
      </>
    ),
  },
  "intent-preview": {
    label:
      "A solid square and a hollow one joined by a dashed line: the machine now, and where it will be",
    marks: (
      <>
        <rect x="58" y="56" width="20" height="20" fill="currentColor" stroke="none" />
        <path d="M88 66 H150" strokeDasharray="3 6" strokeLinecap="butt" />
        <rect x="160" y="56" width="20" height="20" />
      </>
    ),
  },
  "capability-disclosure": {
    label: "A solid square inside a dashed circle: the machine inside its operating boundary",
    marks: (
      <>
        <circle cx="120" cy="66" r="40" strokeDasharray="7 9" />
        <rect x="106" y="52" width="28" height="28" fill="currentColor" stroke="none" />
      </>
    ),
  },
  "provenance-log": {
    label: "An unbroken line strung with five diamonds: a chain of recorded states",
    marks: (
      <>
        <path d="M52 66 H188" />
        {diamond(52, 66)}
        {diamond(86, 66)}
        {diamond(120, 66)}
        {diamond(154, 66)}
        {diamond(188, 66)}
      </>
    ),
  },
  "learning-loop": {
    label: "An arc closing back on itself: field reports looping into the design",
    marks: (
      <>
        <path d="M120 32 A34 34 0 1 1 86 66" />
        <path d="M86 56 L92.5 68 H79.5 Z" fill="currentColor" stroke="none" />
        {diamond(120, 32)}
      </>
    ),
  },
  "explainable-fault": {
    label: "A warning triangle carrying an exclamation mark: the fault, named",
    marks: (
      <>
        <path d="M120 30 L158 98 H82 Z" />
        <path d="M120 56 V76" />
        <circle cx="120" cy="86" r="2" fill="currentColor" stroke="none" />
      </>
    ),
  },
  "readiness-check": {
    label: "A circle with a solid pupil: the human's attention",
    marks: (
      <>
        <circle cx="120" cy="66" r="32" />
        <circle cx="128" cy="62" r="6" fill="currentColor" stroke="none" />
      </>
    ),
  },
  "return-of-control": {
    label:
      "An arc carrying control from a solid dot back to a square: the human handing control to the machine",
    marks: (
      <>
        <rect x="62" y="70" width="32" height="32" />
        <circle cx="170" cy="68" r="7" fill="currentColor" stroke="none" />
        <path d="M170 60 A46 46 0 0 0 78 60" />
        <path d="M78 69 L71.5 57 H84.5 Z" fill="currentColor" stroke="none" />
      </>
    ),
  },
  "operator-to-operator-handover": {
    label:
      "Two circles joined by a line through a solid square: machine state carried between two operators",
    marks: (
      <>
        <circle cx="62" cy="66" r="18" />
        <circle cx="178" cy="66" r="18" />
        <path d="M84 66 H156" />
        <rect x="112" y="58" width="16" height="16" fill="currentColor" stroke="none" />
      </>
    ),
  },
  "alert-triage": {
    label: "Four bars of falling height, the tallest one solid: alerts ranked, the critical one filled",
    marks: (
      <>
        <rect x="72" y="34" width="12" height="64" fill="currentColor" stroke="none" />
        <rect x="106" y="58" width="12" height="40" />
        <rect x="140" y="74" width="12" height="24" />
        <rect x="174" y="86" width="12" height="12" />
      </>
    ),
  },
  "stop-anywhere": {
    label: "A solid octagon: one unmistakable stop",
    marks: (
      <path
        d="M106 32 H134 L154 52 V80 L134 100 H106 L86 80 V52 Z"
        fill="currentColor"
        stroke="none"
      />
    ),
  },
};

export function PatternThumb({
  id,
  size = "card",
  /** Related cards sit the mark beside the name, so it adds nothing to read. */
  decorative = false,
  className,
}: {
  id: string;
  size?: Size;
  decorative?: boolean;
  className?: string;
}) {
  const mark = THUMBNAILS[id];
  const { scale, stroke } = SIZES[size];

  return (
    <svg
      className={`thumb thumb-${size}${className ? ` ${className}` : ""}`}
      viewBox="0 0 240 132"
      {...(decorative || !mark
        ? { "aria-hidden": true as const, focusable: false }
        : { role: "img", "aria-label": mark.label })}
    >
      <rect width="240" height="132" fill="var(--thumb-bg)" />
      {mark && (
        <g
          transform={`translate(120 66) scale(${scale}) translate(-120 -66)`}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="square"
          strokeLinejoin="miter"
          shapeRendering="geometricPrecision"
        >
          {mark.marks}
        </g>
      )}
    </svg>
  );
}
