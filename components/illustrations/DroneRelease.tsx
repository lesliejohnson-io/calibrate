"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useStepFocus } from "./printout";

const HOLD_MS = 2000;

/**
 * The one sentence both sides end on. The two demos differ in what it costs
 * to get here, not in what happens: the payload is over zone B either way,
 * and that is the point of running them side by side.
 */
const OUTCOME = "Payload released over zone B.";

/** The readout above the control, the same on both screens. */
function Readout({ state }: { state: string }) {
  return (
    <dl className="console-readout">
      <div className="console-cell">
        <dt>Zone</dt>
        <dd>B</dd>
      </div>
      <div className="console-cell">
        <dt>Altitude</dt>
        <dd>120 m</dd>
      </div>
      <div className="console-cell">
        <dt>Payload</dt>
        <dd>{state}</dd>
      </div>
    </dl>
  );
}

/**
 * The anti-pattern: the irreversible action behind a single tap, named no
 * more specifically than its menu item.
 *
 * It is a real button rather than a mock-up, because the demonstration is
 * how little it asks of you — there is no hold to time and no confirmation
 * to read, so a plain `<button>` is the whole interaction, Enter and Space
 * included.
 */
function WithoutScreen() {
  const [released, setReleased] = useState(false);
  const sendFocus = useStepFocus();
  const resetRef = useRef<HTMLButtonElement>(null);

  const release = () => {
    if (released) return;
    setReleased(true);
    sendFocus(resetRef);
  };

  return (
    <div className="console">
      <p className="console-title">Payload</p>
      <div className="console-screen console-crt af-screen">
        <Readout state={released ? "Released" : "Armed"} />

        {released && <p className="af-outcome">{OUTCOME}</p>}

        <button
          type="button"
          className="af-release af-tap"
          onClick={release}
          disabled={released}
          aria-describedby="tap-hint"
        >
          <span className="console-shape" aria-hidden="true">
            ■
          </span>
          <span className="console-button-text">Release payload</span>
        </button>

        <p className="console-hint" id="tap-hint">
          {released ? "One tap. No way to undo." : "Tap to release the payload."}
        </p>

        <p className="sr-only" role="status">
          {released ? `${OUTCOME} One tap. No way to undo.` : ""}
        </p>

        {released && (
          <button type="button" ref={resetRef} className="console-reset" onClick={() => setReleased(false)}>
            Reset the demo
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * The pattern: the same control, held for two seconds, with the consequence
 * written on the button rather than in a dialog that follows it.
 *
 * The fill is driven by a rAF clock rather than a CSS transition so that
 * letting go part-way is a real cancellation — the bar reports elapsed hold
 * time, and nothing is committed until it reaches the end. Under reduced
 * motion the same clock runs without the per-frame redraw: the bar sits empty
 * and the state changes once, at the end of the hold.
 */
function WithScreen() {
  const [progress, setProgress] = useState(0);
  const [released, setReleased] = useState(false);
  const [holding, setHolding] = useState(false);
  const frame = useRef<number | undefined>(undefined);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const keyHeld = useRef(false);
  const reduced = useRef(false);
  const sendFocus = useStepFocus();
  const resetRef = useRef<HTMLButtonElement>(null);
  const holdRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const stop = useCallback(() => {
    if (frame.current !== undefined) cancelAnimationFrame(frame.current);
    if (timer.current !== undefined) clearTimeout(timer.current);
    frame.current = undefined;
    timer.current = undefined;
  }, []);

  useEffect(() => stop, [stop]);

  const finish = useCallback(() => {
    stop();
    setProgress(1);
    setHolding(false);
    setReleased(true);
    sendFocus(resetRef);
  }, [sendFocus, stop]);

  const start = useCallback(() => {
    if (released || holding) return;
    setHolding(true);

    // The hold is timed by the clock, not by frames: a throttled tab would
    // otherwise stretch two seconds into however long the next frame takes.
    timer.current = setTimeout(finish, HOLD_MS);
    if (reduced.current) return; // no per-frame redraw; one state change at the end

    const began = performance.now();
    const tick = () => {
      const elapsed = performance.now() - began;
      if (elapsed >= HOLD_MS) return;
      setProgress(elapsed / HOLD_MS);
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }, [finish, holding, released]);

  /** Letting go early is a cancellation, not a pause. */
  const cancel = useCallback(() => {
    if (released) return;
    stop();
    setHolding(false);
    setProgress(0);
  }, [released, stop]);

  const reset = () => {
    stop();
    keyHeld.current = false;
    setReleased(false);
    setHolding(false);
    setProgress(0);
    sendFocus(holdRef);
  };

  return (
    <div className="console">
      <p className="console-title">Payload</p>
      <div className="console-screen console-crt af-screen">
        <Readout state={released ? "Released" : holding ? "Holding" : "Armed"} />

        {released && <p className="af-outcome">{OUTCOME}</p>}

        <button
          type="button"
          ref={holdRef}
          className={`af-release af-hold${holding ? " is-holding" : ""}`}
          disabled={released}
          aria-describedby="hold-hint"
          onPointerDown={(e) => {
            // Capture keeps the hold alive if the finger slides off the
            // button; not every pointer can be captured, and a hold that
            // cannot be captured still works.
            try {
              e.currentTarget.setPointerCapture(e.pointerId);
            } catch {
              /* no capture: pointerup on the button still ends the hold */
            }
            start();
          }}
          onPointerUp={cancel}
          onPointerCancel={cancel}
          onLostPointerCapture={cancel}
          onKeyDown={(e) => {
            if (e.key !== " " && e.key !== "Enter") return;
            e.preventDefault(); // Enter would otherwise fire a click.
            if (keyHeld.current) return; // ignore auto-repeat
            keyHeld.current = true;
            start();
          }}
          onKeyUp={(e) => {
            if (e.key !== " " && e.key !== "Enter") return;
            keyHeld.current = false;
            cancel();
          }}
          onBlur={() => {
            keyHeld.current = false;
            cancel();
          }}
        >
          <span
            className="console-fill"
            style={{ transform: `scaleX(${released ? 1 : progress})` }}
            aria-hidden="true"
          />
          <span className="console-shape" aria-hidden="true">
            ■
          </span>
          <span className="console-button-text">Release payload over zone B</span>
        </button>

        <p className="console-hint" id="hold-hint">
          {released
            ? "The payload is gone. Nothing here takes it back."
            : "Hold for two seconds. Let go early and nothing happens."}
        </p>

        {/* The demo's own state, announced rather than only drawn. */}
        <p className="sr-only" role="status">
          {released ? OUTCOME : holding ? "Holding" : ""}
        </p>

        {released && (
          <button type="button" ref={resetRef} className="console-reset" onClick={reset}>
            Reset the demo
          </button>
        )}
      </div>
    </div>
  );
}

export function DroneRelease({ variant }: { variant: "without" | "with" }) {
  return variant === "without" ? <WithoutScreen /> : <WithScreen />;
}
