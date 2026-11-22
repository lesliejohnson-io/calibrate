"use client";

import { useEffect, useRef, useState } from "react";
import { MOMENTS, MOMENT_LABELS, type Moment } from "@/lib/schema";

/** One word per moment. "After and over time" is cut to its first word here. */
const RAIL_LABELS: Record<Moment, string> = { ...MOMENT_LABELS, after: "After" };

export type RailNode = { moment: Moment; count: number };

/**
 * The index's section navigation. It looks and behaves like "On this page" on
 * the pattern pages: one word per moment on a grey track, with the active
 * moment's segment of the line darkened. It follows the reader down the page.
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
    <nav className="rail toc" aria-label="Moments">
      <ul className="toc-list">
        {nodes.map((node) => {
          // A moment the filters emptied has no section to scroll to, so it
          // stays in the list, greyed and unclickable.
          const off = node.count === 0;
          const isActive = !off && node.moment === current;
          const label = RAIL_LABELS[node.moment];
          return (
            <li key={node.moment}>
              {off ? (
                <span className="toc-link is-off" aria-disabled="true">
                  {label}
                </span>
              ) : (
                <a
                  href={hrefFor(node.moment)}
                  className="toc-link"
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => goTo(node.moment)}
                >
                  {label}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Every moment in order, with the number of cards currently in each. */
export function railNodes(counts: Record<Moment, number>): RailNode[] {
  return MOMENTS.map((moment) => ({ moment, count: counts[moment] ?? 0 }));
}
