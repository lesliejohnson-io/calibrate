import type { Step } from "@/lib/patterns";
import { pad } from "@/lib/format";

/**
 * The mechanism as the pattern page's hero: a white panel holding the steps
 * as a row of cards, with the key moment inverted, and the step notes
 * underneath as callouts that name the step they belong to
 * (redesign-handoff.md §3).
 *
 * Pulling the notes out from under their step is what lets the cards keep
 * equal heights and lets the row reflow at any width: the note says "At 02"
 * instead of relying on sitting in the second column.
 *
 * The row has two states and nothing in between: every step side by side, or
 * every step stacked. A partial wrap -- three cards and then two -- reads as
 * two groups, which is a claim about the mechanism that the mechanism is not
 * making. Patterns carry anywhere from three steps to six, so the width where
 * the switch has to happen is different on every page; `--steps` is what lets
 * the stylesheet work it out instead of guessing at a breakpoint.
 */
export function MechanismFlow({ steps }: { steps: Step[] }) {
  const notes = steps
    .map((step, i) => ({ number: pad(i + 1), note: step.note }))
    .filter((n): n is { number: string; note: string } => Boolean(n.note));

  const first = steps[0]?.title.toLowerCase();
  const last = steps.at(-1)?.title.toLowerCase();

  return (
    <div className="mechanism">
      <div className="mechanism-head">
        <h2 id="mechanism" className="mono-label">
          The mechanism
        </h2>
        {first && last && (
          <p className="mechanism-arc">
            {first} &rarr; {last}
          </p>
        )}
      </div>

      <ol
        className="flow"
        aria-label="Mechanism, step by step"
        style={{ "--steps": steps.length } as React.CSSProperties}
      >
        {steps.map((step, i) => (
          <li key={step.title} className={`flow-card${step.key ? " is-key" : ""}`}>
            <span className="label flow-num">
              {pad(i + 1)}
              {step.key && " · Key moment"}
            </span>
            <strong className="flow-title">{step.title}</strong>
            <span className="flow-detail">{step.detail}</span>
          </li>
        ))}
      </ol>

      {notes.length > 0 && (
        <div className="flow-notes">
          {notes.map((n) => (
            <p key={n.number} className="flow-note">
              <strong>At {n.number}:</strong> {n.note}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
