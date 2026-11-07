"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Log, usePrinter } from "./printout";

/**
 * A warehouse robot crossing an aisle, with two stop controls: the operator's,
 * and one for whoever happens to be standing there.
 *
 * Both sides offer the same two buttons. The difference is what a press does.
 * On the anti-pattern side the operator's stop is a pause the robot's own plan
 * is free to end, and the bystander's stop is not wired to anything; on the
 * patterned side either press latches, and only a deliberate two-second hold
 * lets the robot move again.
 */

/** Seconds for the robot to cross the aisle, unimpeded. */
const CROSS_MS = 9000;
/** How long the anti-pattern side sits still before its plan resumes it. */
const RESUME_AFTER_MS = 1400;
/** The release on the patterned side, matching Appropriate Friction's hold. */
const HOLD_MS = 2000;

type Phase =
  /** Before the first Start. */
  | "idle"
  | "running"
  /** Anti-pattern: halted, with the pullover routine about to resume it. */
  | "pausing"
  /** Anti-pattern: resumed, and now refusing further stops. */
  | "maneuvering"
  /** Patterned: halted and latched. */
  | "held"
  | "arrived";

function useReducedMotion() {
  const reduced = useRef(false);
  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  return reduced;
}

/**
 * The aisle. Under `prefers-reduced-motion` the travelling block is replaced
 * by the same position written out, so the demo reports progress in text and
 * nothing on screen moves.
 */
function Aisle({ progress, moving, reduced }: { progress: number; moving: boolean; reduced: boolean }) {
  const percent = Math.round(progress * 100);

  if (reduced) {
    return (
      <p className="sa-aisle-text">
        AISLE 4 · {String(percent).padStart(3, " ")}% ACROSS · {moving ? "MOVING" : "STOPPED"}
      </p>
    );
  }

  return (
    <div className="sa-aisle" role="img" aria-label={`Aisle 4. Robot ${percent}% across.`}>
      <div className="sa-rail" aria-hidden="true" />
      <div
        className={`sa-bot${moving ? " is-moving" : ""}`}
        style={{ left: `${percent}%` }}
        aria-hidden="true"
      />
      <span className="sa-end" aria-hidden="true">
        ▏
      </span>
    </div>
  );
}

function Screen({ variant }: { variant: "without" | "with" }) {
  const latches = variant === "with";

  const reduced = useReducedMotion();
  const raf = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdFrame = useRef<number | null>(null);
  const keyHeld = useRef(false);
  /** Where the robot was when the clock last started, so a stop is not a rewind. */
  const base = useRef(0);
  const startedAt = useRef(0);

  const { lines, print, reset: clearLog } = usePrinter([
    { key: "boot", text: "AMR 12 · AISLE 4", tone: "dim" },
  ]);

  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [holdProgress, setHoldProgress] = useState(0);
  const [status, setStatus] = useState("");

  const startRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);

  const stopClock = useCallback(() => {
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    raf.current = null;
  }, []);

  const stopHold = useCallback(() => {
    if (holdTimer.current !== null) clearTimeout(holdTimer.current);
    if (holdFrame.current !== null) cancelAnimationFrame(holdFrame.current);
    holdTimer.current = null;
    holdFrame.current = null;
  }, []);

  const clearAll = useCallback(() => {
    stopClock();
    stopHold();
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = null;
  }, [stopClock, stopHold]);

  useEffect(() => clearAll, [clearAll]);

  /** Drives the crossing. Stored progress is absolute, so it survives a stop. */
  const run = useCallback(() => {
    startedAt.current = performance.now();
    const tick = (now: number) => {
      const next = Math.min(1, base.current + (now - startedAt.current) / CROSS_MS);
      setProgress(next);
      if (next >= 1) {
        base.current = 1;
        stopClock();
        setPhase("arrived");
        print([{ key: `arrived-${Date.now()}`, text: "ARRIVED · AISLE 4 CLEAR", tone: "dim" }]);
        setStatus("The robot reached the end of the aisle.");
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [print, stopClock]);

  const halt = useCallback(() => {
    stopClock();
    base.current = progress;
  }, [progress, stopClock]);

  const start = () => {
    setPhase("running");
    print([{ key: "run", text: "RUNNING · CROSSING AISLE 4" }]);
    setStatus("Robot moving.");
    run();
  };

  /**
   * `who` is the only thing the two controls differ by. On the patterned side
   * it changes nothing at all about the outcome, which is the point.
   */
  const pressStop = (who: "operator" | "nearby") => {
    const n = Date.now();

    if (!latches) {
      // The bystander's button is a button, and nothing else.
      if (who === "nearby") {
        print([{ key: `ext-${n}`, text: "NO EXTERNAL STOP", tone: "fault", warn: true }]);
        setStatus("No external stop. The robot keeps moving.");
        return;
      }
      if (phase === "maneuvering") {
        print([
          { key: `busy-${n}`, text: "STOP UNAVAILABLE DURING MANEUVER", tone: "fault", warn: true },
        ]);
        setStatus("Stop unavailable during maneuver.");
        return;
      }
      if (phase !== "running") return;

      halt();
      setPhase("pausing");
      print([{ key: `stopping-${n}`, text: "STOPPING…" }]);
      setStatus("Stopping.");

      // The plan the operator's press did not cancel.
      timer.current = setTimeout(() => {
        setPhase("maneuvering");
        print([
          { key: `resume-${n}`, text: "RESUMING: COMPLETING SAFE-PARK MANEUVER", tone: "fault" },
        ]);
        setStatus("Resuming: completing safe-park maneuver. The robot is moving again.");
        base.current = progress;
        run();
      }, RESUME_AFTER_MS);
      return;
    }

    // An e-stop that is already in is not a broken button, but a press that
    // reports nothing looks like one.
    if (phase === "held") {
      print([{ key: `again-${n}`, text: "ALREADY STOPPED · HOLDING", tone: "dim" }]);
      setStatus("Already stopped, and still holding.");
      return;
    }
    if (phase !== "running") return;
    halt();
    setPhase("held");
    print([
      { key: `held-${n}`, text: "STOPPED. HOLDING UNTIL RELEASED." },
      { key: `susp-${n}`, text: "SAFE-PARK MANEUVER · SUSPENDED", tone: "dim" },
    ]);
    setStatus(
      who === "operator"
        ? "Stopped by the operator. Holding until released. The safe-park maneuver is suspended."
        : "Stopped from beside the machine. Holding until released. The safe-park maneuver is suspended.",
    );
  };

  const finishRelease = useCallback(() => {
    stopHold();
    setHoldProgress(0);
    setPhase("running");
    print([{ key: `rel-${Date.now()}`, text: "RELEASED · RESUMING" }]);
    setStatus("Released. The robot is moving again.");
    base.current = progress;
    run();
  }, [print, progress, run, stopHold]);

  const beginRelease = useCallback(() => {
    if (phase !== "held" || holdTimer.current !== null) return;
    // Timed by the clock rather than by frames, so a throttled tab cannot
    // stretch the two seconds.
    holdTimer.current = setTimeout(finishRelease, HOLD_MS);
    if (reduced.current) return;

    const began = performance.now();
    const tick = () => {
      const elapsed = performance.now() - began;
      if (elapsed >= HOLD_MS) return;
      setHoldProgress(elapsed / HOLD_MS);
      holdFrame.current = requestAnimationFrame(tick);
    };
    holdFrame.current = requestAnimationFrame(tick);
  }, [finishRelease, phase, reduced]);

  /** Letting go early is a cancellation: the stop is still holding. */
  const cancelRelease = useCallback(() => {
    if (phase !== "held") return;
    stopHold();
    setHoldProgress(0);
  }, [phase, stopHold]);

  const resetAll = () => {
    clearAll();
    clearLog();
    base.current = 0;
    setPhase("idle");
    setProgress(0);
    setHoldProgress(0);
    setStatus("");
    requestAnimationFrame(() => startRef.current?.focus());
  };

  const moving = phase === "running" || phase === "maneuvering";
  const stopsEnabled = phase === "running" || phase === "pausing" || phase === "maneuvering";

  return (
    <div className="console">
      <p className="console-title">Warehouse robot</p>
      <div className="console-screen console-crt">
        <Log lines={lines} minLines={5} />

        <Aisle progress={progress} moving={moving} reduced={reduced.current} />

        <div className="sa-stops">
          <button
            type="button"
            className="sa-stop"
            onClick={() => pressStop("operator")}
            disabled={!stopsEnabled}
          >
            <span className="sa-stop-shape" aria-hidden="true">
              ■
            </span>
            Stop (operator)
          </button>
          <button
            type="button"
            className="sa-stop"
            onClick={() => pressStop("nearby")}
            disabled={!stopsEnabled}
          >
            <span className="sa-stop-shape" aria-hidden="true">
              ■
            </span>
            Stop (someone nearby)
          </button>
        </div>

        <div className="fc-actions">
          {phase === "idle" && (
            <button type="button" className="fc-approve" ref={startRef} onClick={start}>
              Start
            </button>
          )}

          {latches && phase === "held" && (
            <button
              type="button"
              className="sa-release"
              onPointerDown={(e) => {
                try {
                  e.currentTarget.setPointerCapture(e.pointerId);
                } catch {
                  /* no capture: pointerup on the button still ends the hold */
                }
                beginRelease();
              }}
              onPointerUp={cancelRelease}
              onPointerCancel={cancelRelease}
              onLostPointerCapture={cancelRelease}
              onKeyDown={(e) => {
                if (e.key !== " " && e.key !== "Enter") return;
                e.preventDefault(); // Enter would otherwise fire a click
                if (keyHeld.current) return; // ignore auto-repeat
                keyHeld.current = true;
                beginRelease();
              }}
              onKeyUp={(e) => {
                if (e.key !== " " && e.key !== "Enter") return;
                keyHeld.current = false;
                cancelRelease();
              }}
              onBlur={() => {
                keyHeld.current = false;
                cancelRelease();
              }}
            >
              <span
                className="console-fill"
                style={{ transform: `scaleX(${holdProgress})` }}
                aria-hidden="true"
              />
              <span className="console-button-text">Release (hold 2s)</span>
            </button>
          )}

          {(phase === "arrived" || phase === "maneuvering" || phase === "held") && (
            <button type="button" className="console-reset" ref={resetRef} onClick={resetAll}>
              Reset the demo
            </button>
          )}
        </div>

        <p className="console-hint">
          {phase === "idle" && "Press Start, then try either stop."}
          {phase === "running" &&
            (latches
              ? "Either control stops it. It makes no difference which."
              : "Try the operator's stop. Then try the other one.")}
          {phase === "pausing" && "Stopped. Nobody asked it to start again."}
          {phase === "maneuvering" &&
            "It decided the stop was over. Now the control is refusing you."}
          {phase === "held" &&
            "It stays stopped. Moving again takes a deliberate two-second hold."}
          {phase === "arrived" && "The robot crossed the aisle."}
        </p>

        <p className="sr-only" role="status">
          {status}
        </p>
      </div>
    </div>
  );
}

export function StopAnywhere({ variant }: { variant: "without" | "with" }) {
  return <Screen variant={variant} />;
}
