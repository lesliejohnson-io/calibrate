"use client";

import { useId, useRef, useState } from "react";

import { Log, usePrinter, useStepFocus, type Line } from "./printout";

/**
 * An autonomous forklift's aisle check, run twice: once as a verdict, once
 * with the evidence under it. Both screens are wrong about the aisle in the
 * same way — a worker is kneeling behind a pallet where the camera cannot
 * see — and both let the reader proceed. The difference is whether there was
 * anything on the display to check the verdict against.
 *
 * Nothing here is taken from the pattern's sources, which describe a Patriot
 * battery rather than a warehouse: the aisle, the sensors and the timings are
 * written for this page. What is taken from them is the shape of the failure,
 * a confident classification whose basis the operator cannot inspect.
 */
/**
 * The fault, split across two printed lines to stay inside the column. The
 * ⚠ marks the event once, on the first line, the way the Explainable Fault
 * screen marks a fault heading and continues the sentence under it.
 */
const WORKER_LINES: string[] = ["A worker was kneeling behind", "a pallet in aisle 7."];

/** The same sentence whole, for the `role="status"` text. */
const WORKER = WORKER_LINES.join(" ");

/**
 * The display does not wrap — `.fc-line` is `white-space: pre`, so a line
 * longer than the column runs out of the panel rather than folding, and the
 * column is a fixed 14px mono with no responsive step. Every sentence here is
 * therefore split by hand, the way the Explainable Fault gloss is, to around
 * 30 characters: that screen's longest line is 296px of a 437px column, and
 * staying near that leaves the room the narrower two-up widths need. The
 * `role="status"` text keeps each sentence whole, so nothing a screen reader
 * hears is broken up by this.
 */
const PROCEED_WITHOUT: string[] = ["The system was sure.", "You had nothing to check it against."];
const PROCEED_WITH: string[] = ["The low-confidence reason", "was the one that mattered."];

/**
 * The three reasons behind the same verdict, with how sure each one is. Two
 * of them run past the column at its narrowest, so they continue on an
 * indented line rather than off the side of the panel.
 */
const REASONS: Omit<Line, "key">[] = [
  { text: "Lidar: no obstacle detected (high)" },
  { text: "Camera: view partly blocked" },
  { text: "  by a pallet (low)" },
  { text: "Last person seen in aisle 7:" },
  { text: "  40 seconds ago" },
];

/** Proceed and Hold, offered identically on both screens. */
function Choices({
  onChoose,
  firstRef,
  labelledBy,
}: {
  onChoose: (choice: "proceed" | "hold") => void;
  firstRef: React.RefObject<HTMLButtonElement | null>;
  labelledBy: string;
}) {
  return (
    <div className="fc-guesses" role="group" aria-labelledby={labelledBy}>
      <button type="button" className="fc-guess" ref={firstRef} onClick={() => onChoose("proceed")}>
        Proceed
      </button>
      <button type="button" className="fc-guess" onClick={() => onChoose("hold")}>
        Hold
      </button>
    </div>
  );
}

/**
 * The anti-pattern: the verdict with nothing under it. Holding is available,
 * but there is nothing on the display that would tell anyone to — which is
 * why the screen says so only after the fact.
 */
function WithoutScreen() {
  const askId = useId();
  const { lines, print, reset } = usePrinter([]);
  const sendFocus = useStepFocus();
  const startRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const firstChoiceRef = useRef<HTMLButtonElement>(null);
  const [stage, setStage] = useState<"idle" | "printing" | "asking" | "done">("idle");
  const [choice, setChoice] = useState<"proceed" | "hold" | null>(null);
  const [status, setStatus] = useState("");

  const run = () => {
    setStage("printing");
    print(
      [
        { key: "w-verdict", text: "AISLE 7: CLEAR" },
        { key: "w-ask", text: "Proceed?", tone: "dim" },
      ],
      () => {
        setStage("asking");
        setStatus("Aisle 7: clear. Proceed?");
        sendFocus(firstChoiceRef);
      },
    );
  };

  const choose = (pick: "proceed" | "hold") => {
    setChoice(pick);
    setStage("printing");
    print(
      [
        { key: "w-pick", text: `> ${pick.toUpperCase()}`, tone: "dim" },
        ...WORKER_LINES.map((text, i) => ({
          key: `w-worker-${i}`,
          text,
          tone: "fault" as const,
          warn: i === 0,
        })),
        ...(pick === "proceed"
          ? PROCEED_WITHOUT.map((text, i) => ({
              key: `w-verdict2-${i}`,
              text,
              tone: "rule" as const,
            }))
          : []),
      ],
      () => {
        setStage("done");
        setStatus(
          pick === "proceed"
            ? `You chose Proceed. ${WORKER} ${PROCEED_WITHOUT.join(" ")}`
            : `You chose Hold. ${WORKER}`,
        );
        sendFocus(resetRef);
      },
    );
  };

  const resetAll = () => {
    reset();
    setStage("idle");
    setChoice(null);
    setStatus("");
    sendFocus(startRef);
  };

  return (
    <div className="console">
      <p className="console-title">Forklift aisle check</p>
      <div className="console-screen console-crt">
        <Log lines={lines} minLines={12} />

        {stage === "asking" && (
          <>
            <p className="fc-ask" id={askId}>
              Proceed?
            </p>
            <Choices onChoose={choose} firstRef={firstChoiceRef} labelledBy={askId} />
          </>
        )}

        {stage === "idle" && (
          <button type="button" className="fc-go" ref={startRef} onClick={run}>
            Run the check
          </button>
        )}

        <p className="console-hint">
          {stage === "idle" && "The forklift has checked aisle 7."}
          {stage === "printing" && " "}
          {stage === "asking" && "One line. Nothing behind it."}
          {stage === "done" &&
            (choice === "proceed"
              ? "Trusting it was the only thing the display made possible."
              : "You held, but nothing on the display told you to. Next time you won't.")}
        </p>

        <p className="sr-only" role="status">
          {status}
        </p>

        {stage === "done" && (
          <button type="button" className="console-reset" ref={resetRef} onClick={resetAll}>
            Reset the demo
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * The pattern: the same verdict with the few reasons that produced it, each
 * carrying how sure the machine is. The camera's low confidence is the one
 * that matters, and it is checkable — a reader who thinks about what a
 * blocked camera means can hold on it. Proceeding is still allowed: a glass
 * box is not a veto.
 */
function WithScreen() {
  const askId = useId();
  const { lines, print, reset } = usePrinter([]);
  const sendFocus = useStepFocus();
  const startRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const firstChoiceRef = useRef<HTMLButtonElement>(null);
  const [stage, setStage] = useState<"idle" | "printing" | "asking" | "done">("idle");
  const [choice, setChoice] = useState<"proceed" | "hold" | null>(null);
  const [status, setStatus] = useState("");

  const run = () => {
    setStage("printing");
    print(
      [
        { key: "p-verdict", text: "AISLE 7: CLEAR, because:" },
        ...REASONS.map((r, i) => ({ ...r, key: `p-r${i}` })),
        { key: "p-ask", text: "Proceed?", tone: "dim" },
      ],
      () => {
        setStage("asking");
        setStatus(
          "Aisle 7: clear, because: lidar, no obstacle detected, high confidence. " +
            "Camera, view partly blocked by a pallet, low confidence. " +
            "Last person seen in aisle 7, 40 seconds ago. Proceed?",
        );
        sendFocus(firstChoiceRef);
      },
    );
  };

  const choose = (pick: "proceed" | "hold") => {
    setChoice(pick);
    setStage("printing");
    const verdict = pick === "hold" ? ["The reasons showed the gap."] : PROCEED_WITH;
    print(
      [
        { key: "p-pick", text: `> ${pick.toUpperCase()}`, tone: "dim" },
        ...WORKER_LINES.map((text, i) => ({
          key: `p-worker-${i}`,
          text,
          tone: "fault" as const,
          warn: i === 0,
        })),
        ...verdict.map((text, i) => ({ key: `p-verdict2-${i}`, text, tone: "rule" as const })),
      ],
      () => {
        setStage("done");
        setStatus(
          `You chose ${pick === "hold" ? "Hold" : "Proceed"}. ${WORKER} ${verdict.join(" ")}`,
        );
        sendFocus(resetRef);
      },
    );
  };

  const resetAll = () => {
    reset();
    setStage("idle");
    setChoice(null);
    setStatus("");
    sendFocus(startRef);
  };

  return (
    <div className="console">
      <p className="console-title">Forklift aisle check</p>
      <div className="console-screen console-crt">
        <Log lines={lines} minLines={12} />

        {stage === "asking" && (
          <>
            <p className="fc-ask" id={askId}>
              Proceed?
            </p>
            <Choices onChoose={choose} firstRef={firstChoiceRef} labelledBy={askId} />
          </>
        )}

        {stage === "idle" && (
          <button type="button" className="fc-go" ref={startRef} onClick={run}>
            Run the check
          </button>
        )}

        <p className="console-hint">
          {stage === "idle" && "The same check, on a display that shows its working."}
          {stage === "printing" && " "}
          {stage === "asking" && "Same verdict. Three reasons, and one of them is weak."}
          {stage === "done" &&
            (choice === "hold"
              ? "A blocked camera is something you can reason about. The verdict alone was not."
              : "Proceeding is still allowed. The difference is that this time it was a judgement.")}
        </p>

        <p className="sr-only" role="status">
          {status}
        </p>

        {stage === "done" && (
          <button type="button" className="console-reset" ref={resetRef} onClick={resetAll}>
            Reset the demo
          </button>
        )}
      </div>
    </div>
  );
}

export function GlassBox({ variant }: { variant: "without" | "with" }) {
  return variant === "without" ? <WithoutScreen /> : <WithScreen />;
}
