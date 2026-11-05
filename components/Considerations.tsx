import type { Consideration } from "@/lib/patterns";
import { pad } from "@/lib/format";

/**
 * Design considerations: each item is the rule stated as an instruction,
 * then the sentence or two that says why it holds (redesign-handoff.md §3).
 *
 * The rule carries the weight because it is the part a designer acts on; the
 * reason is what lets them tell when it does not apply.
 */
export function Considerations({ items }: { items: Consideration[] }) {
  return (
    <ol className="considerations">
      {items.map((item, i) => (
        <li key={item.rule} className="consideration">
          <span className="label consideration-num" aria-hidden="true">
            {pad(i + 1)}
          </span>
          <p className="consideration-body">
            <strong className="consideration-rule">{item.rule}</strong> {item.why}
          </p>
        </li>
      ))}
    </ol>
  );
}
