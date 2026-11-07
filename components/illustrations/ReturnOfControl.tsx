"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Log, usePrinter, useStepFocus, type Line } from "./printout";

/**
 * The same disagreement twice. On both screens the automation wants the nose
 * up and the reader wants it down; what differs is whether pushing the nose
 * down ends the argument or just loses a round of it.
 *
 * Nothing here is taken from the pattern's sources, which describe an
 * approach to Nagoya and two 737 MAX accidents: the scale, the degrees, the
 * 15-second window and the counter are written for this page. What is taken
 * from them is the shape of the failure — a correction reversed without
 * anything saying so.
 *
 * Lines are hand-split to stay inside the column: `.fc-line` is
 * `white-space: pre`, so a long line runs off the panel instead of wrapping.
 */

/** Where the automation wants the nose, in display degrees. */
const AUTOPILOT_TARGET = 4;

/** How far one press of the control column moves it. */
const PUSH = 3;

/** The scale's ends. Pitch is clamped here so the marker stays on it. */
const PITCH_MIN = -9;
const PITCH_MAX = 9;

/** The automation acts on this beat, whether or not it has anything to undo. */
const TICK_MS = 500;

/** How long the anti-pattern runs before it admits what it has been doing. */
const REVEAL_MS = 15_000;

const clamp = (n: number) => Math.min(PITCH_MAX, Math.max(PITCH_MIN, n));

/**
 * The pitch readout: a number and a marker on a fixed scale. Drawn in the
 * same monospace as the printed lines so it reads as part of the instrument,
 * and rendered live rather than printed, because it is the current state
 * rather than another entry in the log.
 *
 * It is not a live region. The marker moves far more often than a screen
 * reader could usefully follow, so the announcements are made at the moments
 * that matter instead, through the `role="status"` line each screen owns.
 */
function PitchGauge({ pitch }: { pitch: number }) {
  const span = PITCH_MAX - PITCH_MIN;
  const slot = Math.round(((pitch - PITCH_MIN) / span) * 14);
  const track = Array.from({ length: 15 }, (_, i) => (i === slot ? "●" : "·")).join("");
  const sign = pitch > 0 ? "+" : pitch < 0 ? "−" : " ";
  const degrees = `${sign}${String(Math.abs(pitch)).padStart(2, "0")}°`;

  return (
    <>
      <p className="fc-line">{`PITCH  ${degrees}`}</p>
      <p className="fc-line is-dim">{`DN [${track}] UP`}</p>
    </>
  );
}

/**
 * The anti-pattern: the automation holds its target and walks the nose back
 * up after every push, printing nothing. The reader can win any single round
 * and still be losing, which is what the count at the end is for.
 */
function WithoutScreen() {
  const { lines, print, reset } = usePrinter([]);
  const sendFocus = useStepFocus();
  const startRef = useRef<HTMLButtonElement>(null);
  const pushRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const [stage, setStage] = useState<"idle" | "flying" | "done">("idle");
  const [pitch, setPitch] = useState(0);
  const [countered, setCountered] = useState(0);
  const [status, setStatus] = useState("");

  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const reveal = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Set by a push, cleared by the automation when it takes the push back. */
  const owed = useRef(false);

  const stopTimers = useCallback(() => {
    if (tick.current) clearInterval(tick.current);
    if (reveal.current) clearTimeout(reveal.current);
    tick.current = null;
    reveal.current = null;
  }, []);

  useEffect(() => stopTimers, [stopTimers]);

  const run = () => {
    setStage("flying");
    print(
      [
        { key: "w-1", text: "AUTOPILOT · climbing" },
        { key: "w-2", text: "—".repeat(22), tone: "rule" },
      ],
      () => {
        setStatus("Autopilot climbing. Pitch 0 degrees.");
        sendFocus(pushRef);
      },
    );

    tick.current = setInterval(() => {
      setPitch((p) => {
        if (p === AUTOPILOT_TARGET) return p;
        const next = p < AUTOPILOT_TARGET ? p + 1 : p - 1;
        // Only the first step back counts: one push, one counter-action.
        if (owed.current && next > p) {
          owed.current = false;
          setCountered((c) => c + 1);
        }
        return next;
      });
    }, TICK_MS);

    reveal.current = setTimeout(() => {
      stopTimers();
      setCountered((n) => {
        print(
          [
            { key: "w-r0", text: "—".repeat(22), tone: "rule" },
            { key: "w-r1", text: "The automation countered you", tone: "fault", warn: true },
            { key: "w-r2", text: `${n} times.`, tone: "fault" },
            { key: "w-r3", text: "Nothing on the display told you.", tone: "fault" },
          ],
          () => {
            setStage("done");
            setStatus(
              `The automation countered you ${n} times. Nothing on the display told you.`,
            );
            sendFocus(resetRef);
          },
        );
        return n;
      });
    }, REVEAL_MS);
  };

  const pushDown = () => {
    owed.current = true;
    setPitch((p) => clamp(p - PUSH));
  };

  const resetAll = () => {
    stopTimers();
    owed.current = false;
    reset();
    setStage("idle");
    setPitch(0);
    setCountered(0);
    setStatus("");
    sendFocus(startRef);
  };

  return (
    <div className="console">
      <p className="console-title">Pitch control</p>
      <div className="console-screen console-crt">
        <Log lines={lines} minLines={3} />
        <PitchGauge pitch={pitch} />

        {stage === "flying" && (
          <div className="fc-guesses" role="group" aria-label="Pitch control">
            <button type="button" className="fc-guess" ref={pushRef} onClick={pushDown}>
              Push nose down
            </button>
          </div>
        )}

        {stage === "idle" && (
          <button type="button" className="fc-go" ref={startRef} onClick={run}>
            Play
          </button>
        )}

        <p className="console-hint">
          {stage === "idle" && "The autopilot is flying. You want the nose down."}
          {stage === "flying" && "Push all you like. Watch where the nose ends up."}
          {stage === "done" &&
            "Every correction was reversed. The display showed the nose, never the argument."}
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
 * The pattern: the first push ends the automation's claim on the axis and
 * says so. The nose then stays where the reader puts it, and the automation
 * comes back only when asked.
 */
function WithScreen() {
  const { lines, print, reset } = usePrinter([]);
  const sendFocus = useStepFocus();
  const startRef = useRef<HTMLButtonElement>(null);
  const pushRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const [stage, setStage] = useState<"idle" | "flying" | "manual">("idle");
  const [pitch, setPitch] = useState(0);
  const [status, setStatus] = useState("");

  const tick = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTick = useCallback(() => {
    if (tick.current) clearInterval(tick.current);
    tick.current = null;
  }, []);

  useEffect(() => stopTick, [stopTick]);

  const startAutopilot = useCallback(() => {
    stopTick();
    tick.current = setInterval(() => {
      setPitch((p) => (p === AUTOPILOT_TARGET ? p : p < AUTOPILOT_TARGET ? p + 1 : p - 1));
    }, TICK_MS);
  }, [stopTick]);

  const run = () => {
    setStage("flying");
    print(
      [
        { key: "p-1", text: "AUTOPILOT · climbing" },
        { key: "p-2", text: "—".repeat(22), tone: "rule" },
      ],
      () => {
        setStatus("Autopilot climbing. Pitch 0 degrees.");
        sendFocus(pushRef);
      },
    );
    startAutopilot();
  };

  const pushDown = () => {
    const first = stage === "flying";
    if (first) {
      stopTick();
      setStage("manual");
      print([
        { key: "p-off1", text: "AUTOPILOT OFF", tone: "rule" },
        { key: "p-off2", text: "· you have pitch control", tone: "rule" },
      ]);
    }
    setPitch((p) => {
      const next = clamp(p - PUSH);
      setStatus(
        first
          ? `Autopilot off. You have pitch control. Pitch ${next} degrees.`
          : `Pitch ${next} degrees.`,
      );
      return next;
    });
  };

  const resume = () => {
    setStage("flying");
    const stamp = Date.now();
    print([
      { key: `p-on1-${stamp}`, text: "Autopilot resumed", tone: "rule" },
      { key: `p-on2-${stamp}`, text: "at your request.", tone: "rule" },
    ]);
    setStatus("Autopilot resumed at your request.");
    startAutopilot();
  };

  const resetAll = () => {
    stopTick();
    reset();
    setStage("idle");
    setPitch(0);
    setStatus("");
    sendFocus(startRef);
  };

  const started = stage !== "idle";

  return (
    <div className="console">
      <p className="console-title">Pitch control</p>
      <div className="console-screen console-crt">
        <Log lines={lines} minLines={3} />
        <PitchGauge pitch={pitch} />

        {started && (
          <div className="fc-guesses" role="group" aria-label="Pitch control">
            <button type="button" className="fc-guess" ref={pushRef} onClick={pushDown}>
              Push nose down
            </button>
            <button
              type="button"
              className="fc-guess"
              onClick={resume}
              disabled={stage !== "manual"}
            >
              Resume autopilot
            </button>
          </div>
        )}

        {stage === "idle" && (
          <button type="button" className="fc-go" ref={startRef} onClick={run}>
            Play
          </button>
        )}

        <p className="console-hint">
          {stage === "idle" && "The same autopilot, on a display that yields."}
          {stage === "flying" &&
            "Push once and it stands back. Resuming is yours to ask for."}
          {stage === "manual" && "The nose stays where you put it. Nothing is pulling back."}
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
