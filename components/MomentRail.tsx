"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MOMENTS, MOMENT_LABELS, MOMENT_QUESTIONS, type Moment } from "@/lib/schema";

export type RailNode = { moment: Moment; count: number };

/**
 * The control loop as the index's navigation: a vertical stepper whose active
 * station follows the reader down the page (redesign-handoff.md §2).
 *
 * The drawing is three parts, and they are split the way they are so that
 * nothing has to be redrawn when a station expands:
 *
 *  - The dot and the segment of inner line below it belong to each item, so
 *    they move with it.
 *  - The triangle and the short lead-in above it belong to the first item.
 *  - The return path and its two half-round caps are one box with its right
 *    side open: a 20px-wide box between x=3 and x=23 with 10px corners draws
 *    a semicircle at each end and the straight return down the left. Its
 *    height is the one thing CSS cannot work out on its own — it runs from
 *    44px above the first dot to 10px below the last — so it is measured.
 *
 * Measuring rather than guessing is what keeps the bottom cap hugging the
 * After dot instead of the bottom of the After item, which is the difference
 * you see when After is the active station and has expanded.
 */
export function MomentRail({
  nodes,
  /** Section ids only exist while the index is grouped by Moment. */
  hrefFor,
}: {
  nodes: RailNode[];
  hrefFor: (moment: Moment) => string;
}) {
  const [active, setActive] = useState<Moment>(nodes[0]?.moment ?? "before");
  const listRef = useRef<HTMLOListElement>(null);
  const [loopHeight, setLoopHeight] = useState<number>();

  /*
   * The station a click is currently scrolling to. While this is set the
   * observer is ignored: a click on After scrolls the page past During,
   * Transition and Failure, and without this the rail would mark each of
   * them active on the way through, expanding and collapsing three times
   * before it settled. The pin is released when the scroll stops.
   */
  const pinned = useRef<Moment | null>(null);
  const releaseTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const order = nodes.map((n) => n.moment);
  const activeIndex = Math.max(0, order.indexOf(active));

  /* Re-measure whenever a station expands or the viewport reflows. */
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const items = Array.from(list.children) as HTMLElement[];
      const last = items.at(-1);
      if (!last) return;
      // Both dots sit 23px from the top of their item; the box runs from 44px
      // above the first to 10px below the last.
      setLoopHeight(last.offsetTop + 54);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    for (const item of Array.from(list.children)) observer.observe(item);
    return () => observer.disconnect();
  }, [nodes, active]);

  /* The topmost section crossing ~30% down the viewport is the active one. */
  useEffect(() => {
    const sections = nodes
      .map((n) => document.getElementById(`moment-${n.moment}`))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const onScreen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onScreen.add(entry.target.id);
          else onScreen.delete(entry.target.id);
        }
        // Keep tracking what is on screen, but let the click win until its
        // scroll has finished.
        if (pinned.current) return;
        const first = nodes.find((n) => onScreen.has(`moment-${n.moment}`));
        if (first) setActive(first.moment);
      },
      { rootMargin: "-30% 0px -70% 0px" },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [nodes]);

  /*
   * Release the pin when the scroll stops. `scrollend` is the accurate
   * signal; the timer is the fallback for browsers without it and for a
   * click on a station the page cannot scroll far enough to reach, where no
   * scroll — and so no scrollend — ever happens.
   */
  useEffect(() => {
    const release = () => {
      pinned.current = null;
      clearTimeout(releaseTimer.current);
    };
    window.addEventListener("scrollend", release);
    return () => {
      window.removeEventListener("scrollend", release);
      clearTimeout(releaseTimer.current);
    };
  }, []);

  const goTo = (moment: Moment) => {
    pinned.current = moment;
    setActive(moment);
    clearTimeout(releaseTimer.current);
    releaseTimer.current = setTimeout(() => {
      pinned.current = null;
    }, 1200);
  };

  if (nodes.length === 0) return null;

  return (
    <nav className="rail" aria-label="The control loop">
      <div className="rail-body">
        <span
          className="rail-return"
          aria-hidden="true"
          style={loopHeight ? { height: `${loopHeight}px` } : undefined}
        />

        <ol className="rail-list" ref={listRef}>
          {nodes.map((node, i) => {
            const isActive = node.moment === active;
            const state = isActive ? "active" : i < activeIndex ? "passed" : "upcoming";
            return (
              <li key={node.moment} className={`rail-item is-${state}`}>
                {i === 0 && <span className="rail-lead" aria-hidden="true" />}
                <a
                  href={hrefFor(node.moment)}
                  className="rail-link"
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => goTo(node.moment)}
                >
                  <span className="rail-dot" aria-hidden="true" />
                  <span className="rail-name">{MOMENT_LABELS[node.moment]}</span>
                  {isActive && (
                    <>
                      <span className="rail-question">{MOMENT_QUESTIONS[node.moment]}</span>
                      <span className="label rail-count">
                        {node.count} {node.count === 1 ? "pattern" : "patterns"}
                      </span>
                    </>
                  )}
                </a>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="rail-caption">After feeds back into Before</p>
    </nav>
  );
}

/** Every moment in loop order, with the number of cards currently in each. */
export function railNodes(counts: Record<Moment, number>): RailNode[] {
  return MOMENTS.map((moment) => ({ moment, count: counts[moment] ?? 0 }));
}
