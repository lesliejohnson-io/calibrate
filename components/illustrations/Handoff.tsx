"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import { Log, usePrinter, useStepFocus, type Line } from "./printout";

/**
 * The same motorway handoff twice. Both screens hand control to the reader
 * and both will give it up; what differs is how much warning there is and
 * whether anything explains the situation before the reader owns it.
 *
 * Nothing here is taken from the pattern's source, which describes a crash in
 * Tempe rather than a motorway lane closure: the speeds, the construction
 * zone and both countdowns are written for this page. What is taken from the
 * source is the shape of the failure — a design that depends on a person
 * taking over, with nothing useful reaching them before the moment it needs
 * them.
 *
 * Lines are hand-split to stay inside the column: `.fc-line` is
 * `white-space: pre`, so a long line runs off the panel instead of wrapping.
 * The `role="status"` text keeps each sentence whole for a screen reader.
 */

/** The anti-pattern's warning: no notice, then two seconds. */
const WITHOUT_SECONDS = 2;

/** The pattern's window. Long enough to read the briefing and decide. */
const WITH_SECONDS = 15;

/** What the machine says before it asks: why, now, next. */
const BRIEFING: Omit<Line, "key">[] = [
  { text: "Why:  construction zone ahead,", tone: "dim" },
  { text: "      lane closes in 400 m", tone: "dim" },
  { text: "Now:  62 mph, lane clear", tone: "dim" },
  { text: "Next: you'll need to merge left", tone: "dim" },
];

/**
 * A countdown the reader can beat. It ticks once a second and calls `onEnd`
 * when it runs out; clearing it is the caller's job, through `cancel`.
 *
 * `prefers-reduced-motion` does not suppress it. The ticking is the content
 * here, not decoration — the whole demo is about how much time there is — and
 * a number changing once a second is not motion in the sense the setting
 * means. Nothing flashes and nothing moves.
 */
function useCountdown(onEnd: () => void) {
  const [left, setLeft] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const ended = useRef(onEnd);
  ended.current = onEnd;

  const cancel = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setLeft(null);
  }, []);

  useEffect(() => cancel, [cancel]);

  const start = useCallback((from: number) => {
    setLeft(from);
    timer.current = setInterval(() => {
      setLeft((n) => {
        if (n === null) return null;
        if (n <= 1) {
          if (timer.current) clearInterval(timer.current);
          timer.current = null;
          ended.current();
          return 0;
        }
        return n - 1;
      });
    }, 1000);
  }, []);

  return { left, start, cancel };
}

/** The seconds remaining, spoken rather than shown as a bare numeral. */
const plural = (n: number) => `${n} second${n === 1 ? "" : "s"}`;

/**
 * The anti-pattern: the car drives, then demands the wheel with no warning
 * and no reason. Taking control in time is possible — the demo lets the
 * reader win — and winning is the point, because what they get is the car
 * and no idea what it was about to hit.
 */
function WithoutScreen() {
  const askId = useId();
  const { lines, print, reset } = usePrinter([]);
  const sendFocus = useStepFocus();
  const startRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const takeRef = useRef<HTMLButtonElement>(null);
  const [stage, setStage] = useState<"idle" | "driving" | "asking" | "done">("idle");
  const [outcome, setOutcome] = useState<"intime" | "late" | null>(null);
  const [status, setStatus] = useState("");

  const timeUp = () => {
    setOutcome("late");
    setStage("driving");
    print([{ key: "w-late", text: "Too late.", tone: "fault", warn: true }], () => {
      setStage("done");
      setStatus("Too late.");
      sendFocus(resetRef);
    });
  };
  const { left, start, cancel } = useCountdown(timeUp);

  const run = () => {
    setStage("driving");
    print(
      [
        { key: "w-1", text: "AUTOPILOT · 62 mph" },
        { key: "w-2", text: "Lane keeping active", tone: "dim" },
        { key: "w-3", text: "—".repeat(22), tone: "rule" },
        { key: "w-4", text: "TAKE OVER NOW", tone: "fault", warn: true },
      ],
      () => {
        setStage("asking");
        setStatus(`Take over now. ${plural(WITHOUT_SECONDS)}.`);
        start(WITHOUT_SECONDS);
        sendFocus(takeRef);
      },
    );
  };

  const take = () => {
    cancel();
    setOutcome("intime");
    setStage("driving");
    print(
      [
        { key: "w-got", text: "> I HAVE CONTROL", tone: "dim" },
        { key: "w-end1", text: "You have control.", tone: "rule" },
        { key: "w-end2", text: "You don't know why.", tone: "rule" },
      ],
      () => {
        setStage("done");
        setStatus("You have control. You don't know why.");
        sendFocus(resetRef);
      },
    );
  };

  const resetAll = () => {
    cancel();
    reset();
    setStage("idle");
    setOutcome(null);
    setStatus("");
    sendFocus(startRef);
  };

  return (
    <div className="console">
      <p className="console-title">Motorway handoff</p>
      <div className="console-screen console-crt">
        <Log lines={lines} minLines={11} />

        {stage === "asking" && (
          <>
            <p className="fc-ask" id={askId}>
              {left} s
            </p>
            <div className="fc-guesses" role="group" aria-label="Take over now">
              <button type="button" className="fc-guess" ref={takeRef} onClick={take}>
                I have control
              </button>
            </div>
          </>
        )}

        {stage === "idle" && (
          <button type="button" className="fc-go" ref={startRef} onClick={run}>
            Play
          </button>
        )}

        <p className="console-hint">
          {stage === "idle" && "The car is driving. You are not."}
          {stage === "driving" && " "}
          {stage === "asking" && "Two seconds, and nothing to go on."}
          {stage === "done" &&
            (outcome === "intime"
              ? "You won the race and still lost: you are steering a situation nobody described."
              : "The car asked at the moment it needed you, which is the moment it was already too late.")}
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
 * The pattern: the same transfer, announced fifteen seconds out, with the
 * three things the reader needs to act on. Control moves when they say so.
 * If they never do, the car does not drop the wheel — it stops.
 */
function WithScreen() {
  const askId = useId();
  const { lines, print, reset } = usePrinter([]);
  const sendFocus = useStepFocus();
  const startRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const takeRef = useRef<HTMLButtonElement>(null);
  const [stage, setStage] = useState<"idle" | "driving" | "asking" | "done">("idle");
  const [outcome, setOutcome] = useState<"taken" | "none" | null>(null);
  const [status, setStatus] = useState("");

  const timeUp = () => {
    setOutcome("none");
    setStage("driving");
    print(
      [
        { key: "p-none1", text: "No response.", tone: "rule" },
        { key: "p-none2", text: "Slowing to a stop on the shoulder.", tone: "rule" },
      ],
      () => {
        setStage("done");
        setStatus("No response. Slowing to a stop on the shoulder.");
        sendFocus(resetRef);
      },
    );
  };
  const { left, start, cancel } = useCountdown(timeUp);

  const run = () => {
    setStage("driving");
    print(
      [
        { key: "p-1", text: "AUTOPILOT · 62 mph" },
        { key: "p-2", text: "Handoff in 15 s" },
        { key: "p-3", text: "—".repeat(22), tone: "rule" },
        ...BRIEFING.map((b, i) => ({ ...b, key: `p-b${i}` })),
      ],
      () => {
        setStage("asking");
        setStatus(
          `Handoff in ${plural(WITH_SECONDS)}. Why: construction zone ahead, lane closes in 400 metres. ` +
            "Now: 62 miles per hour, lane clear. Next: you'll need to merge left.",
        );
        start(WITH_SECONDS);
        sendFocus(takeRef);
      },
    );
  };

  const take = () => {
    cancel();
    setOutcome("taken");
    setStage("driving");
    print(
      [
        { key: "p-got", text: "> I HAVE CONTROL", tone: "dim" },
        { key: "p-end", text: "You have control.", tone: "rule" },
      ],
      () => {
        setStage("done");
        setStatus("You have control.");
        sendFocus(resetRef);
      },
    );
  };

  const resetAll = () => {
    cancel();
    reset();
    setStage("idle");
    setOutcome(null);
    setStatus("");
    sendFocus(startRef);
  };

  return (
    <div className="console">
      <p className="console-title">Motorway handoff</p>
      <div className="console-screen console-crt">
        <Log lines={lines} minLines={11} />

        {stage === "asking" && (
          <>
            <p className="fc-ask" id={askId}>
              {left} s
            </p>
            <div className="fc-guesses" role="group" aria-label="Handoff in progress">
              <button type="button" className="fc-guess" ref={takeRef} onClick={take}>
                I have control
              </button>
            </div>
          </>
        )}

        {stage === "idle" && (
          <button type="button" className="fc-go" ref={startRef} onClick={run}>
            Play
          </button>
        )}

        <p className="console-hint">
          {stage === "idle" && "The same transfer, announced before it happens."}
          {stage === "driving" && " "}
          {stage === "asking" && "Fifteen seconds, and you know what you are taking."}
          {stage === "done" &&
            (outcome === "taken"
              ? "Control moved when you said so, not when the timer ran out."
              : "Nobody answered, so the car kept the problem rather than handing it to no one.")}
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

export function Handoff({ variant }: { variant: "without" | "with" }) {
  return variant === "without" ? <WithoutScreen /> : <WithScreen />;
}
