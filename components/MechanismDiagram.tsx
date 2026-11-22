"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  describeDiagram,
  type Diagram,
  type DiagramItem,
  type DiagramPathElement,
} from "@/lib/diagram";

/**
 * A pattern's mechanism drawn from its `diagram` data (lib/diagram.ts).
 *
 * How it is built:
 *
 *  - Every box, group and label is a real DOM element on a CSS grid, so text
 *    reflows and can be selected. The grid has one track per "slot": the
 *    elements of the spine, with a connector cell between each pair. On
 *    desktop the slots are columns, with the event in a row above them and
 *    branches in a row below; under 720px they are rows, with branches in a
 *    second column. Only the stylesheet knows that. The component writes
 *    each cell's slot number into a custom property and CSS decides whether
 *    it is a column or a row.
 *  - The connectors are an absolutely positioned SVG layer over that grid.
 *    After layout, the component measures where the boxes landed and routes
 *    orthogonal lines between them, with elbows rounded to the box radius.
 *    It reads the orientation back from the `--dg-axis` custom property, so
 *    the routing follows whatever the CSS decided rather than guessing at the
 *    breakpoint itself.
 *  - Condition and via labels live in the connector cells, on the half of
 *    the cell beside the line, so they stay bound to the connector they name
 *    at any width.
 *
 * The drawing is hidden from screen readers. An ordered list beside it says
 * the same thing in words: the event, then each element in order, with every
 * condition stated.
 */

type Edge =
  /** From the event's dot into the first element. */
  | { kind: "event"; to: string; link: string }
  /** Between two elements, with the elbow (if any) in the connector cell between them. */
  | { kind: "step"; from: string; to: string; link: string }
  /** An empty fork path: out of the split, along its lane, back in at the merge. */
  | { kind: "skip"; from: string; to: string; split: string; merge: string; lane: string }
  /** Off the spine into a branch box. */
  | { kind: "branch"; from: string; cell: string; to: string };

type Point = [number, number];
/** A fork waiting for the element its paths rejoin at. */
type PendingFork = { lanes: { last: string | null; lane: string }[]; split: string };
type Line = { d: string; arrow?: string };

const nodeKey = (e: DiagramPathElement) => (e.type === "box" ? `n-${e.id}` : `g-${e.items[0].id}`);

function Item({
  item,
  className,
  node,
}: {
  item: Pick<DiagramItem, "id" | "title" | "note" | "key">;
  className: string;
  node?: string;
}) {
  return (
    <div className={`${className}${item.key ? " is-key" : ""}`} data-node={node}>
      <span className="dg-num">{item.id}</span>
      <strong className="dg-title">{item.title}</strong>
      {item.note && <span className="dg-note">{item.note}</span>}
    </div>
  );
}

function Element({ element }: { element: DiagramPathElement }) {
  if (element.type === "box") return <Item item={element} className="dg-box" node={nodeKey(element)} />;
  return (
    <div className="dg-group" data-node={nodeKey(element)}>
      {element.items.map((item) => (
        <Item key={item.id} item={item} className="dg-gitem" />
      ))}
    </div>
  );
}

function Labels({ labels }: { labels: string[] }) {
  if (labels.length === 0) return null;
  return (
    <span className="dg-labels">
      {labels.map((label) => (
        <span key={label} className="dg-label">
          {label}
        </span>
      ))}
    </span>
  );
}

/** Where a cell sits: the stylesheet turns these into a column or a row. */
const slotStyle = (slot: number) => ({ "--slot": slot, "--slot-row": slot + 1 }) as CSSProperties;

export function MechanismDiagram({ diagram }: { diagram: Diagram }) {
  const root = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });

  /* ---------- Layout model: cells in slot order, and the edges between them ---------- */

  const cells: ReactNode[] = [];
  const edges: Edge[] = [];
  let event: ReactNode = null;
  let slot = 0;
  let hasBranch = false;
  /** The element the next connector leaves from, and the cell before the current one. */
  let previous: string | null = null;
  let previousSlot = 0;
  let pendingFork: PendingFork | null = null;

  diagram.elements.forEach((e) => {
    if (e.type === "event") {
      event = (
        <div className="dg-event" key="event">
          <span className="dg-dot" data-node="dot" />
          <span className="dg-event-text">
            <span className="dg-num">{e.id}</span>
            <strong className="dg-title">{e.title}</strong>
            {e.note && <span className="dg-note">{e.note}</span>}
          </span>
        </div>
      );
      previous = "dot";
      return;
    }

    if (e.type === "branch") {
      hasBranch = true;
      const cell = `bcell-${e.item.id}`;
      const to = `n-${e.item.id}`;
      cells.push(
        <div key={cell} className="dg-branch" data-node={cell} style={slotStyle(previousSlot)}>
          <span className="dg-label">{e.condition}</span>
          <Item item={e.item} className="dg-box is-dashed" node={to} />
        </div>,
      );
      edges.push({ kind: "branch", from: previous!, cell, to });
      return;
    }

    // A connector cell leads into every spine element. It carries the via
    // label of the box it leads into.
    const link = `link-${++slot}`;
    const via = e.type === "box" && e.via ? [e.via] : [];
    cells.push(
      <div key={link} className="dg-slot dg-link" data-node={link} style={slotStyle(slot)}>
        <Labels labels={via} />
      </div>,
    );

    if (e.type === "fork") {
      const forkSlot = ++slot;
      const lanes: PendingFork["lanes"] = [];
      cells.push(
        <div key={`fork-${forkSlot}`} className="dg-slot dg-fork" style={slotStyle(forkSlot)}>
          {e.paths.map((path, p) => {
            const entry = `entry-${forkSlot}-${p}`;
            let from: string = previous!;
            let viaLink = link;
            const children: ReactNode[] = [];
            const viaOf = (pe: DiagramPathElement) => (pe.type === "box" && pe.via ? [pe.via] : []);
            path.elements.forEach((pe, k) => {
              // The lane's first element is entered from the split, so its via
              // label shares the lane's entry cell with the condition. The rest
              // are entered through a connector cell of their own.
              if (k > 0) {
                const inner = `ilink-${forkSlot}-${p}-${k}`;
                children.push(
                  <div key={inner} className="dg-link dg-inner" data-node={inner}>
                    <Labels labels={viaOf(pe)} />
                  </div>,
                );
                viaLink = inner;
              }
              children.push(<Element key={nodeKey(pe)} element={pe} />);
              edges.push({ kind: "step", from, to: nodeKey(pe), link: viaLink });
              from = nodeKey(pe);
            });
            lanes.push({ last: path.elements.length ? from : null, lane: entry });
            return (
              <div key={entry} className={`dg-lane${path.elements.length ? "" : " is-empty"}`}>
                <div className="dg-link dg-entry" data-node={entry}>
                  <Labels labels={[path.condition, ...(path.elements[0] ? viaOf(path.elements[0]) : [])]} />
                </div>
                {children}
              </div>
            );
          })}
        </div>,
      );
      pendingFork = { lanes, split: link };
      previousSlot = forkSlot;
      return;
    }

    const elementSlot = ++slot;
    const to = nodeKey(e);
    cells.push(
      <div key={to} className="dg-slot dg-node" style={slotStyle(elementSlot)}>
        <Element element={e} />
      </div>,
    );

    const fork = pendingFork as PendingFork | null;
    if (fork) {
      for (const { last, lane } of fork.lanes) {
        edges.push(
          last
            ? { kind: "step", from: last, to, link }
            : { kind: "skip", from: previous!, to, split: fork.split, merge: link, lane },
        );
      }
      pendingFork = null;
    } else if (previous === "dot") {
      edges.push({ kind: "event", to, link });
    } else {
      edges.push({ kind: "step", from: previous!, to, link });
    }

    // Through a fork, the element before it is still where the split leaves
    // from: `previous` only moves on at a spine element.
    previous = to;
    previousSlot = elementSlot;
  });

  /* ---------- Connectors: measured after layout, redrawn on every resize ---------- */

  const edgeKey = JSON.stringify(edges);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const routes: Edge[] = JSON.parse(edgeKey);

    const measure = () => {
      const base = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      const axis = style.getPropertyValue("--dg-axis").trim() === "y" ? "y" : "x";
      const radius = parseFloat(style.getPropertyValue("--dg-elbow")) || 4;

      const rect = (key: string) => {
        const node = el.querySelector<HTMLElement>(`[data-node="${key}"]`);
        if (!node) return null;
        const r = node.getBoundingClientRect();
        const l = r.left - base.left;
        const t = r.top - base.top;
        return { l, t, r: l + r.width, b: t + r.height, cx: l + r.width / 2, cy: t + r.height / 2 };
      };

      const out: Line[] = [];
      for (const edge of routes) {
        const pts = route(edge, axis, rect);
        if (pts) out.push(draw(pts, radius));
      }
      setLines(out);
      setSize({ width: base.width, height: base.height });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    el.querySelectorAll("[data-node]").forEach((node) => observer.observe(node));
    // Web fonts change every box's size once they arrive.
    document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, [edgeKey]);

  const description = describeDiagram(diagram);

  return (
    <div className="dg-wrap">
      <ol className="sr-only" aria-label="Mechanism, step by step">
        {description.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ol>
      <div
        ref={root}
        className={`dg${hasBranch ? " has-branch" : ""}`}
        style={{ "--dg-cols": slot } as CSSProperties}
        aria-hidden="true"
      >
        {event}
        {cells}
        <svg className="dg-lines" width={size.width} height={size.height} focusable="false">
          {lines.map((line, i) => (
            <g key={i}>
              <path d={line.d} />
              {line.arrow && <path d={line.arrow} />}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

type Rect = { l: number; t: number; r: number; b: number; cx: number; cy: number };

/**
 * The corner points of one connector. On the x axis (desktop) the spine runs
 * left to right and connectors leave a box's right edge; on the y axis they
 * leave its bottom edge. Elbows sit in the middle of the connector cell
 * between the two elements, which is also where the labels are.
 */
function route(edge: Edge, axis: "x" | "y", rect: (key: string) => Rect | null): Point[] | null {
  const x = axis === "x";

  if (edge.kind === "step" || edge.kind === "event") {
    const from = rect(edge.kind === "event" ? "dot" : edge.from);
    const to = rect(edge.to);
    const link = rect(edge.link);
    if (!from || !to || !link) return null;
    if (edge.kind === "event" && x) {
      // The event sits above the spine: down from the dot, then across.
      return [[from.cx, from.b], [from.cx, to.cy], [to.l, to.cy]];
    }
    return x
      ? [[from.r, from.cy], [link.cx, from.cy], [link.cx, to.cy], [to.l, to.cy]]
      : [[from.cx, from.b], [from.cx, link.cy], [to.cx, link.cy], [to.cx, to.t]];
  }

  if (edge.kind === "skip") {
    const from = rect(edge.from);
    const to = rect(edge.to);
    const split = rect(edge.split);
    const merge = rect(edge.merge);
    const lane = rect(edge.lane);
    if (!from || !to || !split || !merge || !lane) return null;
    return x
      ? [[from.r, from.cy], [split.cx, from.cy], [split.cx, lane.cy], [merge.cx, lane.cy], [merge.cx, to.cy], [to.l, to.cy]]
      : [[from.cx, from.b], [from.cx, split.cy], [lane.cx, split.cy], [lane.cx, merge.cy], [to.cx, merge.cy], [to.cx, to.t]];
  }

  const from = rect(edge.from);
  const cell = rect(edge.cell);
  const to = rect(edge.to);
  if (!from || !cell || !to) return null;
  // The branch's own connector runs down the gutter left of its label, so the
  // label reads as beside the line rather than floating over the box.
  const gutter = cell.l + 12;
  return x
    ? [[gutter, from.b], [gutter, to.cy], [to.l, to.cy]]
    : [[from.r, cell.t + 9], [gutter, cell.t + 9], [gutter, to.cy], [to.l, to.cy]];
}

/** An orthogonal polyline with rounded elbows, and an open arrowhead at its end. */
function draw(raw: Point[], radius: number): Line {
  // Drop zero-length segments and straight-through points: an elbow of zero
  // length would otherwise draw a stray curve.
  const pts: Point[] = [];
  for (const p of raw) {
    const q = pts.at(-1);
    if (q && Math.abs(q[0] - p[0]) < 0.5 && Math.abs(q[1] - p[1]) < 0.5) continue;
    pts.push(p);
  }
  for (let i = pts.length - 2; i > 0; i--) {
    const [a, b, c] = [pts[i - 1], pts[i], pts[i + 1]];
    const straight =
      (Math.abs(a[0] - b[0]) < 0.5 && Math.abs(b[0] - c[0]) < 0.5) ||
      (Math.abs(a[1] - b[1]) < 0.5 && Math.abs(b[1] - c[1]) < 0.5);
    if (straight) pts.splice(i, 1);
  }

  const dist = (a: Point, b: Point) => Math.hypot(b[0] - a[0], b[1] - a[1]);
  const toward = (a: Point, b: Point, d: number): Point => {
    const len = dist(a, b) || 1;
    return [a[0] + ((b[0] - a[0]) / len) * d, a[1] + ((b[1] - a[1]) / len) * d];
  };
  const fmt = (p: Point) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;

  let d = `M${fmt(pts[0])}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [a, b, c] = [pts[i - 1], pts[i], pts[i + 1]];
    const r = Math.min(radius, dist(a, b) / 2, dist(b, c) / 2);
    d += ` L${fmt(toward(b, a, r))} Q${fmt(b)} ${fmt(toward(b, c, r))}`;
  }
  const end = pts.at(-1)!;
  d += ` L${fmt(end)}`;

  if (pts.length < 2) return { d };
  const before = pts.at(-2)!;
  const len = dist(before, end) || 1;
  const u: Point = [(end[0] - before[0]) / len, (end[1] - before[1]) / len];
  const size = 6;
  const back: Point = [end[0] - u[0] * size, end[1] - u[1] * size];
  const left: Point = [back[0] - u[1] * size * 0.8, back[1] + u[0] * size * 0.8];
  const right: Point = [back[0] + u[1] * size * 0.8, back[1] - u[0] * size * 0.8];
  return { d, arrow: `M${fmt(left)} L${fmt(end)} L${fmt(right)}` };
}
