"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The printed-display demos (Intent Preview, Explainable Fault) share one
 * machine: a fixed-width readout that prints a line at a time. Keeping the
 * engine here rather than in each demo means the timing, the reduced-motion
 * behaviour and the focus handling are the same on every page that uses it —
 * three things that are easy to get subtly wrong twice.
 */

/** One printed line per 120ms, so the display reads as a machine typing. */
export const LINE_MS = 120;

export type Tone = "normal" | "dim" | "fault" | "rule";

export type Line = {
  key: string;
  text: string;
  tone?: Tone;
  /** Draws a ⚠ before the text, so a fault is not carried by colour alone. */
  warn?: boolean;
};

/**
 * Prints lines one at a time. Under `prefers-reduced-motion` the whole batch
 * lands in a single state change instead — the sequence is information, but
 * the staggering is decoration, so only the staggering is dropped.
 *
 * The reduced-motion check is read in an effect rather than at module scope
 * because these components are server-rendered first, where `matchMedia` does
 * not exist.
 */
export function usePrinter(initial: Line[]) {
  const [lines, setLines] = useState<Line[]>(initial);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const stop = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  // Timers outlive the element otherwise, and setState on an unmounted
  // component is the one way this demo can log an error on a real page.
  useEffect(() => stop, [stop]);

  /**
   * Appends `next`, then runs `done`. `after` delays the whole batch, and
   * `every` overrides the line interval — a flood prints faster than a
   * readout a person is meant to follow line by line.
   */
  const print = useCallback(
    (next: Line[], done?: () => void, after = 0, every = LINE_MS) => {
      if (reduced.current) {
        setLines((cur) => [...cur, ...next]);
        if (done) timers.current.push(setTimeout(done, 0));
        return;
      }
      next.forEach((line, i) => {
        timers.current.push(
          setTimeout(
            () => {
              setLines((cur) => [...cur, line]);
              if (i === next.length - 1 && done) done();
            },
            after + (i + 1) * every,
          ),
        );
      });
    },
    [],
  );

  const reset = useCallback(() => {
    stop();
    setLines(initial);
  }, [initial, stop]);

  return { lines, print, reset, reduced };
}

/**
 * Moves focus to whatever replaced the control the operator just operated. Each
 * stage of these demos unmounts a field or a button, and without this focus
 * drops to <body> and a keyboard user loses their place mid-demo.
 */
export function useStepFocus() {
  const [target, setTarget] = useState<React.RefObject<HTMLElement | null> | null>(null);
  useEffect(() => {
    if (!target) return;
    target.current?.focus();
    setTarget(null);
  }, [target]);
  return setTarget;
}

/**
 * The display itself. `clearedKeys` marks lines that have been superseded:
 * they stay in place, struck through and faded, because a readout that
 * reflows while it prints cannot be followed — and in the Intent Preview
 * anti-pattern the route leaving the display is the whole point.
 */
export function Log({
  lines,
  clearedKeys,
  minLines,
}: {
  lines: Line[];
  clearedKeys?: Set<string>;
  /** Reserves height so the panel does not grow as the machine prints. */
  minLines?: number;
}) {
  return (
    <div
      className="fc-log"
      style={minLines ? { minHeight: `calc(${minLines} * 1.5 * var(--fs-base-sm))` } : undefined}
    >
      {lines.map((line) => (
        <p
          key={line.key}
          className={[
            "fc-line",
            line.tone && line.tone !== "normal" ? `is-${line.tone}` : "",
            clearedKeys?.has(line.key) ? "is-gone" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {line.warn && (
            <span className="fc-warn" aria-hidden="true">
              ⚠
            </span>
          )}
          {line.text}
        </p>
      ))}
    </div>
  );
}
