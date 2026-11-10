"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Log, usePrinter, useStepFocus } from "./printout";

/**
 * The same interruption twice. On both screens a person steps into the aisle
 * and the forklift stops; what differs is who decides it is over.
 *
 * Nothing here is taken from the pattern's source, which describes a water
 * bottling plant rather than this aisle: the fifteen slots, the two-second
 * delay and the wording are written for this page. What is taken from it is
 * the shape of the failure — a machine that treats a stop as a pause and
 * starts again on its own once its sensors clear.
 *
 * The aisle is drawn in characters inside the printed display rather than as
 * positioned elements, so it needs no animation and no stylesheet of its own:
 * the forklift is a square and the person a circle, both named in a legend
 * line underneath, so neither rests on colour or on recognising a glyph.
 *
 * Lines are hand-split to stay inside the column: `.fc-line` is
 * `white-space: pre`, so a long line runs off the panel instead of wrapping.
 */

/** Slots across the aisle. The forklift travels left to right. */
const SLOTS = 15;

/** Where the person stands when they step in. */
const PERSON_SLOT = 9;

/** The forklift advances one slot on this beat. */
const TICK_MS = 500;

/**
 * How long the anti-pattern waits after the path clears before starting
 * again by itself. Written for this page: the report is not a source for any
 * particular delay, only for the fact that it resumed without being asked.
 */
const AUTO_RESUME_MS = 2000;

/**
 * The aisle, top down: the forklift's slot, the person's if they are in it,
 * and a legend naming both shapes. Rendered live rather than printed,
 * because it is the current state and not another entry in the log.
 *
 * It is not a live region. The forklift moves more often than a screen reader
 * could usefully follow, so the announcements are made at the moments that
 * matter instead, through the `role="status"` line each screen owns.
 */
function Aisle({ slot, personIn }: { slot: number; personIn: boolean }) {
  const track = Array.from({ length: SLOTS }, (_, i) => {
    if (i === slot) return "▣";
    if (personIn && i === PERSON_SLOT) return "●";
    return "·";
  }).join("");

  return (
    <>
      <p
        className="fc-line"
        role="img"
        aria-label={`Aisle 4. Forklift at slot ${slot + 1} of ${SLOTS}. ${
          personIn ? `A person is standing at slot ${PERSON_SLOT + 1}.` : "The aisle is clear."
        }`}
      >{`AISLE 4  [${track}]`}</p>
      <p className="fc-line is-dim" aria-hidden="true">
        {"▣ forklift   ● person"}
      </p>
    </>
  );
}

/**
 * The anti-pattern: the forklift stops for the person and then, once its path
 * is clear, starts again on its own. Nothing chose to give it the aisle back.
 */
function WithoutScreen() {
  const { lines, print, reset } = usePrinter([]);
  const sendFocus = useStepFocus();
  const startRef = useRef<HTMLButtonElement>(null);
  const stepRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const [stage, setStage] = useState<"idle" | "moving" | "stopped" | "resumed">("idle");
  const [slot, setSlot] = useState(0);
  const [personIn, setPersonIn] = useState(false);
  const [status, setStatus] = useState("");
  /**
   * True while a batch of lines is still printing. `usePrinter.print`
   * schedules one timer per line, so a second batch started mid-print
   * interleaves its lines with the first. Each handler drops a press that
   * arrives while this is set — in the handler rather than on `disabled`,
   * because disabling a control takes it out of the tab order and a keyboard
   * user tabbing on would land outside the demo.
   */
  const [busy, setBusy] = useState(false);

  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const auto = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopTimers = useCallback(() => {
    if (tick.current) clearInterval(tick.current);
    if (auto.current) clearTimeout(auto.current);
    tick.current = null;
    auto.current = null;
  }, []);

  useEffect(() => stopTimers, [stopTimers]);

  const drive = useCallback(() => {
    stopTimers();
    tick.current = setInterval(() => {
      setSlot((s) => (s >= SLOTS - 1 ? s : s + 1));
    }, TICK_MS);
  }, [stopTimers]);

  const run = () => {
    setStage("moving");
    print(
      [
        { key: "w-1", text: "FORKLIFT · travelling" },
        { key: "w-2", text: "—".repeat(22), tone: "rule" },
      ],
      () => {
        setStatus("Forklift travelling along aisle 4. The aisle is clear.");
        sendFocus(stepRef);
      },
    );
    drive();
  };

  const stepIn = () => {
    if (busy) return;
    stopTimers();
    setPersonIn(true);
    setStage("stopped");
    setSlot((s) => Math.min(s, PERSON_SLOT - 1));
    setStatus("You stepped into the aisle. The forklift stopped.");
  };

  const stepOut = () => {
    if (busy) return;
    setPersonIn(false);
    setStatus("You stepped out. The aisle is clear.");
    auto.current = setTimeout(() => {
      setStage("resumed");
      drive();
      setBusy(true);
      print(
        [
          { key: "w-go1", text: "MOVING AGAIN", tone: "fault", warn: true },
          { key: "w-go2", text: "nobody asked. nobody checked.", tone: "fault" },
        ],
        () => {
          setBusy(false);
          setStatus(
            "The forklift started moving again on its own. Nobody asked, and nobody checked the aisle was safe.",
          );
          sendFocus(resetRef);
        },
      );
    }, AUTO_RESUME_MS);
  };

  const resetAll = () => {
    stopTimers();
    reset();
    setStage("idle");
    setSlot(0);
    setPersonIn(false);
    setBusy(false);
    setStatus("");
    sendFocus(startRef);
  };

  const started = stage !== "idle";

  return (
    <div className="console">
      <p className="console-title">Driverless forklift · Aisle 4</p>
      <div className="console-screen console-crt">
        <Log lines={lines} minLines={3} />
        <Aisle slot={slot} personIn={personIn} />

        {started && (
          <div className="fc-guesses" role="group" aria-label="The aisle">
            <button
              type="button"
              className="fc-guess"
              ref={stepRef}
              onClick={personIn ? stepOut : stepIn}
            >
              {personIn ? "Step out" : "Step into the aisle"}
            </button>
          </div>
        )}

        {stage === "idle" && (
          <button type="button" className="fc-go" ref={startRef} onClick={run}>
            Play
          </button>
        )}

        <p className="console-hint">
          {stage === "idle" && "The forklift is working the aisle. You are about to walk into it."}
          {stage === "moving" && "Step in, then step out."}
          {stage === "stopped" && "It stopped for you. Now step out and watch."}
          {stage === "resumed" &&
            "It treated your stop as a pause. Clearing its sensors was all the permission it needed."}
        </p>

        <p className="sr-only" role="status">
          {status}
        </p>

        {started && (
          <button type="button" className="console-reset" ref={resetRef} onClick={resetAll}>
            Reset the demo
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * The pattern: the stop is announced and it latches. Clearing the path tells
 * the operator where to release it, and nothing moves until someone does.
 */
function WithScreen() {
  const { lines, print, reset } = usePrinter([]);
  const sendFocus = useStepFocus();
  const startRef = useRef<HTMLButtonElement>(null);
  const stepRef = useRef<HTMLButtonElement>(null);
  const resumeRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const [stage, setStage] = useState<"idle" | "moving" | "held">("idle");
  const [slot, setSlot] = useState(0);
  const [personIn, setPersonIn] = useState(false);
  const [status, setStatus] = useState("");
  /** See the note on the other screen: one batch of lines at a time. */
  const [busy, setBusy] = useState(false);

  const tick = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTick = useCallback(() => {
    if (tick.current) clearInterval(tick.current);
    tick.current = null;
  }, []);

  useEffect(() => stopTick, [stopTick]);

  const drive = useCallback(() => {
    stopTick();
    tick.current = setInterval(() => {
      setSlot((s) => (s >= SLOTS - 1 ? s : s + 1));
    }, TICK_MS);
  }, [stopTick]);

  const run = () => {
    setStage("moving");
    print(
      [
        { key: "p-1", text: "FORKLIFT · travelling" },
        { key: "p-2", text: "—".repeat(22), tone: "rule" },
      ],
      () => {
        setStatus("Forklift travelling along aisle 4. The aisle is clear.");
        sendFocus(stepRef);
      },
    );
    drive();
  };

  const stepIn = () => {
    if (busy) return;
    stopTick();
    setPersonIn(true);
    setStage("held");
    setSlot((s) => Math.min(s, PERSON_SLOT - 1));
    setBusy(true);
    print(
      [
        { key: "p-hold1", text: "HOLD", tone: "fault", warn: true },
        { key: "p-hold2", text: "· person in path", tone: "fault" },
      ],
      () => {
        setBusy(false);
        setStatus("Hold: a person is in the forklift's path. The forklift is held.");
      },
    );
  };

  const stepOut = () => {
    if (busy) return;
    setPersonIn(false);
    const stamp = Date.now();
    setBusy(true);
    print(
      [
        { key: `p-clear1-${stamp}`, text: "Path clear", tone: "rule" },
        { key: `p-clear2-${stamp}`, text: "· resume at the vehicle", tone: "rule" },
      ],
      () => {
        setBusy(false);
        setStatus("Path clear. The forklift is still held. Resume at the vehicle.");
        sendFocus(resumeRef);
      },
    );
  };

  const resume = () => {
    setStage("moving");
    const stamp = Date.now();
    print([{ key: `p-on-${stamp}`, text: "Resumed at your request.", tone: "rule" }]);
    setStatus("Resumed at your request. The forklift is travelling again.");
    drive();
    sendFocus(stepRef);
  };

  const resetAll = () => {
    stopTick();
    reset();
    setStage("idle");
    setSlot(0);
    setPersonIn(false);
    setBusy(false);
    setStatus("");
    sendFocus(startRef);
  };

  const started = stage !== "idle";

  return (
    <div className="console">
      <p className="console-title">Driverless forklift · Aisle 4</p>
      <div className="console-screen console-crt">
        <Log lines={lines} minLines={3} />
        <Aisle slot={slot} personIn={personIn} />

        {started && (
          <div className="fc-guesses" role="group" aria-label="The aisle">
            <button
              type="button"
              className="fc-guess"
              ref={stepRef}
              onClick={personIn ? stepOut : stepIn}
            >
              {personIn ? "Step out" : "Step into the aisle"}
            </button>
            {/* Present and unavailable while anyone is in the path: being
                unable to press it is the difference from the other screen,
                which a hidden button could not show. */}
            <button
              type="button"
              className="fc-guess"
              ref={resumeRef}
              onClick={resume}
              disabled={stage !== "held" || personIn}
            >
              Resume
            </button>
          </div>
        )}

        {stage === "idle" && (
          <button type="button" className="fc-go" ref={startRef} onClick={run}>
            Play
          </button>
        )}

        <p className="console-hint">
          {stage === "idle" && "The same forklift, on a machine that holds."}
          {stage === "moving" && "Step in. It will hold until you hand it back."}
          {stage === "held" &&
            (personIn
              ? "Held while you are in the path. Resume is unavailable."
              : "The path is clear and it is still held. Resuming is yours to do.")}
        </p>

        <p className="sr-only" role="status">
          {status}
        </p>

        {started && (
          <button type="button" className="console-reset" ref={resetRef} onClick={resetAll}>
            Reset the demo
          </button>
        )}
      </div>
    </div>
  );
}

export function ReturnOfControl({ variant }: { variant: "without" | "with" }) {
  return variant === "without" ? <WithoutScreen /> : <WithScreen />;
}
