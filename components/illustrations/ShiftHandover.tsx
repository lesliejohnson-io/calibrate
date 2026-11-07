"use client";

import { useRef, useState } from "react";

import { Log, usePrinter, useStepFocus, type Line } from "./printout";

/**
 * The same shift change twice, on a console with two condensate pumps. The
 * reader is the incoming night-shift operator. Both screens hand them the
 * machine; what differs is whether the machine's own condition comes with it.
 *
 * Nothing here is taken from the pattern's sources, which describe a platform
 * control room in 1988: the two-pump console, the field names, the wording and
 * the equipment list are written for this page. What is taken from them is the
 * shape of the failure — two true facts held apart, and a handover that
 * depended on one person joining them up.
 *
 * Lines are hand-split to stay inside the column: `.fc-line` is
 * `white-space: pre`, so a long line runs off the panel instead of wrapping.
 * The `role="status"` text keeps each sentence whole for a screen reader.
 */

/** A floor, not a cap. The structured handover is longer, which is the point. */
const PANEL_LINES = 14;

const RULE = "—".repeat(22);

/** The free-text note: true, and missing the one fact that mattered. */
const NOTE: Omit<Line, "key">[] = [
  { text: "Pump A: maintenance today.", tone: "dim" },
  { text: "All good otherwise.", tone: "dim" },
];

/**
 * The structured handover: the same fields every time, with anything switched
 * off stated first and most prominently.
 */
const BRIEFING: Omit<Line, "key">[] = [
  { text: "DISABLED" },
  { text: "  Pump A · safety valve removed" },
  { text: "  do not start" },
  { text: "IN PROGRESS" },
  { text: "  Pump A valve refit · not begun", tone: "dim" },
  { text: "NORMAL" },
  { text: "  Pump B · running", tone: "dim" },
];

/**
 * The anti-pattern: the state of the plant leaves on a note somebody wrote
 * from memory. Every word of it is true. The other pump trips, and the obvious
 * move is the one nobody warned the night shift about.
 */
function WithoutScreen() {
  const { lines, print, reset } = usePrinter([]);
  const sendFocus = useStepFocus();
  const startRef = useRef<HTMLButtonElement>(null);
  const startPumpRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const [stage, setStage] = useState<"idle" | "printing" | "asking" | "done">("idle");
  const [status, setStatus] = useState("");

  const run = () => {
    setStage("printing");
    print(
      [
        { key: "w-1", text: "HANDOVER NOTE · day shift" },
        { key: "w-2", text: RULE, tone: "rule" },
        ...NOTE.map((n, i) => ({ ...n, key: `w-n${i}` })),
        { key: "w-3", text: RULE, tone: "rule" },
        { key: "w-4", text: "PUMP B TRIPPED.", tone: "fault", warn: true },
        { key: "w-5", text: "Start Pump A?" },
      ],
      () => {
        setStage("asking");
        setStatus(
          "Handover note, day shift. Pump A: maintenance today. All good otherwise. " +
            "Pump B tripped. Start Pump A?",
        );
        sendFocus(startPumpRef);
      },
    );
  };

  const startPump = () => {
    setStage("printing");
    print(
      [
        { key: "w-go", text: "> START PUMP A", tone: "dim" },
        { key: "w-e1", text: "Pump A started.", tone: "rule" },
        { key: "w-e2", text: "Its safety valve had been", tone: "fault", warn: true },
        { key: "w-e3", text: "removed.", tone: "fault" },
      ],
      () => {
        setStage("done");
        setStatus("Pump A started. Its safety valve had been removed.");
        sendFocus(resetRef);
      },
    );
  };

  const resetAll = () => {
    reset();
    setStage("idle");
    setStatus("");
    sendFocus(startRef);
  };

  return (
    <div className="console">
      <p className="console-title">Shift handover</p>
      <div className="console-screen console-crt">
        <Log lines={lines} minLines={PANEL_LINES} />

        {stage === "asking" && (
          <div className="fc-guesses" role="group" aria-label="Pump control">
            <button type="button" className="fc-guess" ref={startPumpRef} onClick={startPump}>
              Start Pump A
            </button>
          </div>
        )}

        {stage === "idle" && (
          <button type="button" className="fc-go" ref={startRef} onClick={run}>
            Play
          </button>
        )}

        <p className="console-hint">
          {stage === "idle" && "The day shift leaves a note. You are the night shift."}
          {stage === "printing" && " "}
          {stage === "asking" && "The other pump is down. Starting Pump A is the obvious move."}
          {stage === "done" &&
            "Both facts were true and known. Neither of them reached you together."}
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
 * The pattern: the machine states its own condition in the same fields every
 * time, with anything switched off first. Nothing is handed over until the
 * incoming operator says back what is disabled — and the lock-out then holds
 * when the obvious move comes round, so the button is never theirs to press.
 */
function WithScreen() {
  const { lines, print, reset } = usePrinter([]);
  const sendFocus = useStepFocus();
  const startRef = useRef<HTMLButtonElement>(null);
  const sayBackRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const [stage, setStage] = useState<"idle" | "printing" | "sayback" | "done">("idle");
  const [status, setStatus] = useState("");
  /** A wrong answer can be retried, so its printed keys have to stay unique. */
  const tries = useRef(0);

  const run = () => {
    setStage("printing");
    print(
      [
        { key: "p-1", text: "HANDOVER · day shift" },
        { key: "p-2", text: RULE, tone: "rule" },
        ...BRIEFING.map((b, i) => ({ ...b, key: `p-b${i}` })),
        { key: "p-3", text: RULE, tone: "rule" },
        { key: "p-4", text: "Say back what is disabled:" },
      ],
      () => {
        setStage("sayback");
        setStatus(
          "Handover, day shift. Disabled: Pump A, safety valve removed, do not start. " +
            "In progress: Pump A valve refit, not begun. Normal: Pump B, running. " +
            "Say back what is disabled.",
        );
        sendFocus(sayBackRef);
      },
    );
  };

  const sayBack = (choice: "a" | "b") => {
    const n = (tries.current += 1);
    setStage("printing");

    if (choice !== "a") {
      print(
        [
          { key: `p-no${n}`, text: "> PUMP B", tone: "dim" },
          { key: `p-no${n}b`, text: "Not accepted.", tone: "fault", warn: true },
          { key: `p-no${n}c`, text: "Read the DISABLED section.", tone: "rule" },
        ],
        () => {
          setStage("sayback");
          setStatus("Not accepted. Read the disabled section.");
          sendFocus(sayBackRef);
        },
      );
      return;
    }

    print(
      [
        { key: `p-ok${n}`, text: "> PUMP A", tone: "dim" },
        { key: `p-ok${n}b`, text: "Handover accepted ·", tone: "rule" },
        { key: `p-ok${n}c`, text: "day shift → night shift", tone: "rule" },
        { key: `p-ok${n}d`, text: RULE, tone: "rule" },
        { key: `p-ok${n}e`, text: "PUMP B TRIPPED.", tone: "fault", warn: true },
        { key: `p-ok${n}f`, text: "Pump A disabled:", tone: "rule" },
        { key: `p-ok${n}g`, text: "safety valve removed.", tone: "rule" },
      ],
      () => {
        setStage("done");
        setStatus(
          "Handover accepted, day shift to night shift. Pump B tripped. " +
            "Start Pump A is unavailable: Pump A disabled, safety valve removed.",
        );
        sendFocus(resetRef);
      },
    );
  };

  const resetAll = () => {
    reset();
    tries.current = 0;
    setStage("idle");
    setStatus("");
    sendFocus(startRef);
  };

  return (
    <div className="console">
      <p className="console-title">Shift handover</p>
      <div className="console-screen console-crt">
        <Log lines={lines} minLines={PANEL_LINES} />

        {stage === "sayback" && (
          <div className="fc-guesses" role="group" aria-label="Say back what is disabled">
            <button
              type="button"
              className="fc-guess"
              ref={sayBackRef}
              onClick={() => sayBack("a")}
            >
              Pump A
            </button>
            <button type="button" className="fc-guess" onClick={() => sayBack("b")}>
              Pump B
            </button>
          </div>
        )}

        {/*
         * The interlock as a control rather than a sentence: once the trip
         * arrives the button is there and is not available, which is the whole
         * difference from the other screen.
         */}
        {stage === "done" && (
          <div className="fc-guesses" role="group" aria-label="Pump control">
            <button type="button" className="fc-guess" disabled>
              Start Pump A
            </button>
          </div>
        )}

        {stage === "idle" && (
          <button type="button" className="fc-go" ref={startRef} onClick={run}>
            Play
          </button>
        )}

        <p className="console-hint">
          {stage === "idle" && "The same shift change, on a console that hands itself over."}
          {stage === "printing" && " "}
          {stage === "sayback" && "Nothing is yours until you say back what is switched off."}
          {stage === "done" &&
            "The lock-out came across with the responsibility, so the button was never yours."}
        </p>

        <p className="sr-only" role="status">
          {status}
        </p>

        {stage !== "idle" && (
          <button type="button" className="console-reset" ref={resetRef} onClick={resetAll}>
            Reset the demo
          </button>
        )}
      </div>
    </div>
  );
}

export function ShiftHandover({ variant }: { variant: "without" | "with" }) {
  return variant === "without" ? <WithoutScreen /> : <WithScreen />;
}
