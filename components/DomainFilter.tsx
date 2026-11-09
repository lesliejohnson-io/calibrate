"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Domain } from "@/lib/browse";
import { humanize } from "@/lib/format";

/**
 * The index's only filter control: one button that opens a checkbox list.
 *
 * It replaced a row of nine toggle chips. The chips were honest but they were
 * also the widest thing on the page and they pushed the first card below the
 * fold, so the library was introduced by its filter rather than by its
 * contents. A closed button says there is a filter here; an open popover says
 * what it can do; and the count on the button says one is on, which a scatter
 * of pressed chips only said if you were looking at it.
 *
 * Multi-select, applied live. There is no Apply button because there is
 * nothing to apply — the results are already behind the popover, changing.
 */
export function DomainFilter({
  domains,
  counts,
  selected,
  onToggle,
  onClear,
}: {
  domains: Domain[];
  /** Patterns per domain, across the library rather than the current results. */
  counts: Record<Domain, number>;
  selected: Domain[];
  onToggle: (domain: Domain) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const popId = useId();

  /*
   * Escape and an outside click both close it. Focus goes back to the button
   * on Escape, and on an outside click only if it was inside the popover —
   * clicking the search box should leave you in the search box, not bounce
   * you back to a control you have finished with.
   */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.stopPropagation();
      setOpen(false);
      buttonRef.current?.focus();
    };

    const onPointerDown = (event: MouseEvent) => {
      if (wrapRef.current?.contains(event.target as Node)) return;
      const inside = wrapRef.current?.contains(document.activeElement);
      setOpen(false);
      if (inside) buttonRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  // Opening puts you on the first option, so the keyboard path is one Tab
  // shorter and the popover announces itself by taking focus.
  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLInputElement>("input")?.focus();
  }, [open]);

  /** Arrow keys walk the list; Tab still works the way Tab works. */
  const onOptionKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = domains.length - 1;
    const targets: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowUp: index - 1,
      Home: 0,
      End: last,
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    const inputs = listRef.current?.querySelectorAll<HTMLInputElement>("input");
    inputs?.[Math.min(last, Math.max(0, target))]?.focus();
  };

  const count = selected.length;

  return (
    <div className="domain-filter" ref={wrapRef}>
      <button
        type="button"
        ref={buttonRef}
        className={`domain-button${count > 0 ? " is-on" : ""}`}
        aria-expanded={open}
        aria-controls={popId}
        onClick={() => setOpen((was) => !was)}
      >
        <span>Domain{count > 0 ? ` · ${count}` : ""}</span>
        <svg className="domain-chevron" viewBox="0 0 10 6" aria-hidden="true">
          <path
            d="M1 1.5 5 5 9 1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="domain-pop" id={popId} role="dialog" aria-label="Filter by domain">
          <ul className="domain-list" ref={listRef}>
            {domains.map((domain, i) => (
              <li key={domain}>
                {/* The label is the row, so the whole 40px is the target. */}
                <label className="domain-option">
                  <input
                    type="checkbox"
                    checked={selected.includes(domain)}
                    onChange={() => onToggle(domain)}
                    onKeyDown={(event) => onOptionKeyDown(event, i)}
                  />
                  <span className="domain-option-name">{humanize(domain)}</span>
                  <span className="label domain-option-count">{counts[domain] ?? 0}</span>
                </label>
              </li>
            ))}
          </ul>

          <div className="domain-pop-foot">
            <button
              type="button"
              className="clear-filters-inline"
              onClick={onClear}
              disabled={count === 0}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
