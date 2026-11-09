"use client";

import { useEffect, useRef, useState } from "react";
import { MOMENTS, MOMENT_LABELS, MOMENT_QUESTIONS, type Moment } from "@/lib/schema";

export type RailNode = { moment: Moment; count: number };

/**
 * The index's section navigation: a vertical stepper whose active station
 * follows the reader down the page.
 *
 * Two things shape the markup, and both are about the stepper never moving:
 *
 *  - Every item is the same fixed height, tall enough for the expanded state
 *    (name, two lines of question, count). The question and count live in a
 *    slot that is reserved on every item and filled on one, so expanding a
 *    station cannot shift the dots above or below it. The height is a CSS
 *    variable rather than a measurement because it is the same for all five.
 *  - The line is drawn in two pieces that share that geometry: a full-length
 *    track in the loop grey, and an ink-coloured overlay as tall as the
 *    stations passed so far. The overlay's height is `(index + 1) * item
 *    height`, which CSS can work out from `--rail-active` alone -- nothing
 *    here measures the DOM.
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

  /*
   * A moment nothing matched has no section to scroll to, so its station is
   * dead: greyed, unclickable, and carrying the zero so the reader can see
   * why. The rail still lists all five -- the shape of the library is the
   * argument it is making, and hiding stations while a filter is on would
   * redraw the argument every keystroke.
   */
  const firstLive = nodes.find((n) => n.count > 0)?.moment;
  const liveActive = nodes.some((n) => n.moment === active && n.count > 0);
  const current = liveActive ? active : (firstLive ?? active);

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
  const activeIndex = Math.max(0, order.indexOf(current));

  /*
   * How far the ink half of the line runs. It is the active station, except
   * when a filter has emptied every one of them: nothing has been reached,
   * so the waterline is above the first dot rather than level with it.
   * -1 is the height calc's zero.
   */
  const inkIndex = firstLive === undefined ? -1 : activeIndex;

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
    <nav className="rail" aria-label="Moments">
      {/* `--rail-active` is the only thing the ink-coloured half of the line
          needs: its height is that many item heights. */}
      <div
        className="rail-body"
        style={{ "--rail-active": inkIndex } as React.CSSProperties}
      >
        <ol className="rail-list">
          {nodes.map((node, i) => {
            const off = node.count === 0;
            const isActive = !off && node.moment === current;
            const state = off
              ? "disabled"
              : isActive
                ? "active"
                : i < activeIndex
                  ? "passed"
                  : "upcoming";

            const inside = (
              <>
                <span className="rail-dot" aria-hidden="true" />
                <span className="rail-name">{MOMENT_LABELS[node.moment]}</span>
                {/* Reserved on every item, filled on one -- and on a dead
                    station, where the count is the whole explanation. */}
                <span className="rail-slot">
                  {isActive && (
                    <span className="rail-question">{MOMENT_QUESTIONS[node.moment]}</span>
                  )}
                  {(isActive || off) && (
                    <span className="label rail-count">
                      {node.count} {node.count === 1 ? "pattern" : "patterns"}
                    </span>
                  )}
                </span>
              </>
            );

            return (
              <li key={node.moment} className={`rail-item is-${state}`}>
                {off ? (
                  <span className="rail-link is-off" aria-disabled="true">
                    {inside}
                  </span>
                ) : (
                  <a
                    href={hrefFor(node.moment)}
                    className="rail-link"
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => goTo(node.moment)}
                  >
                    {inside}
                  </a>
                )}
              </li>
            );
          })}
        </ol>

        {/* The line runs a little past the last station and stops on a dot,
            so the list ends rather than being cut off. */}
        <span className="rail-end" aria-hidden="true" />
      </div>
    </nav>
  );
}

/** Every moment in order, with the number of cards currently in each. */
export function railNodes(counts: Record<Moment, number>): RailNode[] {
  return MOMENTS.map((moment) => ({ moment, count: counts[moment] ?? 0 }));
}
