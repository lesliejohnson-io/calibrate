import { z } from "zod";

/**
 * The mechanism as a diagram: a per-pattern data object that says what the
 * mechanism's shape is, and nothing about how it is drawn. Orientation (left
 * to right on desktop, top to bottom on mobile) is decided by CSS alone.
 *
 * Four element types and no more:
 *
 *  - event   the trigger: a filled dot with its label beside it. Always first.
 *  - box     one step or obligation.
 *  - group   two or more boxes edge to edge in one border: these hold at the
 *            same time.
 *  - fork    the spine splits into two labelled paths that rejoin at the
 *            element after the fork.
 *
 * Plus one attachment, `branch`: a single box hanging off the spine from the
 * element before it, on a labelled connector, that does not rejoin. It is
 * drawn dashed, because it may not happen and no alternative is drawn. A
 * fork's paths are solid, because the alternative is visible.
 */

const id = z.string().min(1);

const itemSchema = z.object({
  id,
  title: z.string().min(1),
  note: z.string().min(1).optional(),
  key: z.boolean().optional(),
});

const eventSchema = z.object({
  type: z.literal("event"),
  id,
  title: z.string().min(1),
  note: z.string().min(1).optional(),
});

const boxSchema = itemSchema.extend({
  type: z.literal("box"),
  /** A label on the connector leading into this box. */
  via: z.string().min(1).optional(),
});

const groupSchema = z.object({
  type: z.literal("group"),
  items: z.array(itemSchema).min(2, "a group joins two or more boxes"),
});

/**
 * What a fork's path can hold. Boxes and groups only: a fork inside a fork,
 * or a branch off a path, is a shape none of the converted patterns needs,
 * and the routing is only built for the spine.
 */
const pathElementSchema = z.discriminatedUnion("type", [boxSchema, groupSchema]);

const forkSchema = z.object({
  type: z.literal("fork"),
  paths: z
    .array(
      z.object({
        condition: z.string().min(1),
        /** Empty means the path runs straight to the merge. */
        elements: z.array(pathElementSchema),
      }),
    )
    .length(2, "a fork has exactly two paths"),
});

const branchSchema = z.object({
  type: z.literal("branch"),
  condition: z.string().min(1),
  item: z.object({ id, title: z.string().min(1) }),
});

const elementSchema = z.discriminatedUnion("type", [
  eventSchema,
  boxSchema,
  groupSchema,
  forkSchema,
  branchSchema,
]);

export const diagramSchema = z
  .object({ elements: z.array(elementSchema).min(2) })
  .superRefine(({ elements }, ctx) => {
    const issue = (message: string) => ctx.addIssue({ code: "custom", message });

    if (elements[0]?.type !== "event") issue("a diagram starts with its event");
    if (elements.slice(1).some((e) => e.type === "event")) issue("only the first element is an event");

    elements.forEach((e, i) => {
      const before = elements[i - 1];
      const after = elements[i + 1];
      if (e.type === "branch" && before?.type !== "box" && before?.type !== "group") {
        issue("a branch hangs off the box or group just before it");
      }
      if (e.type === "fork") {
        if (before?.type !== "box" && before?.type !== "group") {
          issue("a fork splits from the box or group just before it");
        }
        if (after?.type !== "box" && after?.type !== "group") {
          issue("a fork rejoins at a box or group, so one has to follow it");
        }
      }
    });

    const items = allItems(elements);
    if (items.filter((item) => item.key).length > 1) issue("at most one key box per diagram");
    const ids = items.map((item) => item.id);
    const dupes = ids.filter((v, i) => ids.indexOf(v) !== i);
    if (dupes.length > 0) issue(`ids must be unique: ${[...new Set(dupes)].join(", ")}`);
  });

export type Diagram = z.infer<typeof diagramSchema>;
export type DiagramElement = Diagram["elements"][number];
export type DiagramItem = z.infer<typeof itemSchema>;
export type DiagramPathElement = z.infer<typeof pathElementSchema>;

type Numbered = { id: string; title: string; note?: string; key?: boolean };

/** Every numbered thing in the diagram, in reading order. */
function allItems(elements: DiagramElement[]): Numbered[] {
  return elements.flatMap((e): Numbered[] => {
    switch (e.type) {
      case "event":
      case "box":
        return [e];
      case "group":
        return e.items;
      case "branch":
        return [e.item];
      case "fork":
        return e.paths.flatMap((p) => allItems(p.elements));
    }
  });
}

function itemText(item: Numbered): string {
  const key = item.key ? " (key moment)" : "";
  const note = item.note ? ` ${sentence(item.note)}` : "";
  return `${item.id}, ${item.title}${key}.${note}`;
}

function sentence(text: string): string {
  return /[.!?”"]$/.test(text) ? text : `${text}.`;
}

function pathElementText(e: DiagramPathElement): string {
  if (e.type === "group") {
    return `At the same time: ${e.items.map((i) => itemText(i).replace(/\.$/, "")).join("; ")}.`;
  }
  return `${e.via ? `${e.via}: ` : ""}${itemText(e)}`;
}

/**
 * The diagram as an ordered list of sentences, for screen readers: the event,
 * then each element in order, with every condition stated. The drawn diagram
 * is hidden from assistive technology, so this has to say everything it does.
 */
export function describeDiagram(diagram: Diagram): string[] {
  return diagram.elements.map((e) => {
    switch (e.type) {
      case "event":
        return `Starts when: ${itemText(e)}`;
      case "box":
      case "group":
        return pathElementText(e);
      case "branch":
        return `Off to the side, and it may not happen. ${e.condition}: ${itemText(e.item)}`;
      case "fork": {
        const paths = e.paths.map(({ condition, elements }) => {
          const route =
            elements.length === 0
              ? "goes straight on to the next step."
              : elements.map(pathElementText).join(" Then ");
          return `If “${condition}”: ${route}`;
        });
        return `Then one of two paths. ${paths.join(" ")} Both paths rejoin at the next step.`;
      }
    }
  });
}
