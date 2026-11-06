"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

/**
 * Asiana Airlines Flight 214, as a thing you fly rather than a thing you read.
 *
 * The reader is given a job — hold the dot on the line — and the airspeed is
 * left to the autothrottle, exactly as the crew left it. Four seconds in the
 * autothrottle stops managing speed. Both sides change the mode label when it
 * happens; only the patterned side says what the new mode means.
 *
 * The demo is not a test of vigilance. The Without side is winnable, and most
 * readers will catch it, because they have one instrument to watch instead of
 * an airport. The point is how much harder it is to notice the version that
 * only renames itself.
 */

const START_SPEED = 137;
/** Also the target: the approach speed the autothrottle was holding. */
const TARGET_SPEED = 137;
const HOLD_AT_MS = 4000;
const DECAY_KT_PER_S = 2;
/** The Without side's only other cue, and late by design. */
const WARN_SPEED = 112;
/** Below this the recovery is gone, and the run ends. */
const FLOOR_SPEED = 110;

/** Degrees of deviation the dot can wander before it is off the display. */
const DOT_LIMIT = 100;
const NUDGE = 26;

type Phase = "idle" | "running" | "recovered" | "late";

function useReducedMotion() {
  const reduced = useRef(false);
  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  return reduced;
}

/**
 * The glide-path task: a dot that wanders off the line unless it is nudged
 * back. It is the distraction, not the lesson — it occupies the hands and the
 * eyes so the speed readout is something the reader has to *choose* to look
 * at, which is the situation the pattern is about.
 *
 * The drift is a sum of two sines rather than randomness, so the demo behaves
 * the same way twice and the Without and With runs are comparable.
 */
function drift(tSeconds: number) {
  return Math.sin(tSeconds * 0.9) * 17 + Math.sin(tSeconds * 2.3 + 1) * 8;
}

function GlidePath({
  offset,
  onNudge,
  disabled,
  label,
}: {
  offset: number;
  onNudge: (direction: -1 | 1) => void;
  disabled: boolean;
  label: string;
}) {
  const clamped = Math.max(-DOT_LIMIT, Math.min(DOT_LIMIT, offset));
  // 0 is the line; the dot travels 42% of the box either way.
  const top = 50 + (clamped / DOT_LIMIT) * 42;

  return (
    <div className="at-task">
      <div
        className="at-path"
        role="group"
        aria-label={label}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "ArrowUp") {
            e.preventDefault();
            onNudge(-1);
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            onNudge(1);
          }
        }}
      >
        <div className="at-line" aria-hidden="true" />
        <div className="at-dot" style={{ top: `${top}%` }} aria-hidden="true" />
      </div>
      <div className="at-nudges">
        <button type="button" className="fc-go" disabled={disabled} onClick={() => onNudge(-1)}>
          ↑ Up
        </button>
        <button type="button" className="fc-go" disabled={disabled} onClick={() => onNudge(1)}>
          ↓ Down
        </button>
      </div>
    </div>
  );
}

function Screen({ variant }: { variant: "without" | "with" }) {
  const showsMeaning = variant === "with";
  const taskId = useId();

  const reduced = useReducedMotion();
  const raf = useRef<number | null>(null);
  const startedAt = useRef(0);
  /** Carried in a ref so the loop reads the live value without restarting. */
  const correction = useRef(0);

  const [phase, setPhase] = useState<Phase>("idle");
  const [speed, setSpeed] = useState(START_SPEED);
  const [held, setHeld] = useState(false);
  const [offset, setOffset] = useState(0);
  const [result, setResult] = useState("");
  const [modeAnnouncement, setModeAnnouncement] = useState("");
  const [speedAtHold, setSpeedAtHold] = useState<number | null>(null);

  const playRef = useRef<HTMLButtonElement>(null);
  const powerRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);

  const stop = useCallback(() => {
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    raf.current = null;
  }, []);

  useEffect(() => stop, [stop]);

  const finish = useCallback(
    (kind: "recovered" | "late", atSpeed: number) => {
      stop();
      setPhase(kind);
      setResult(
        kind === "recovered"
          ? `You added power at ${Math.round(atSpeed)} kt. Recovered.`
          : "You noticed too late. The autothrottle stopped managing speed four seconds " +
              "into the run, when the mode changed from SPD to HOLD.",
      );
      // The outcome is announced on both sides: the demo withholds the cue,
      // not the result.
      requestAnimationFrame(() => resetRef.current?.focus());
    },
    [stop],
  );

  const tick = useCallback(
    (now: number) => {
      const t = (now - startedAt.current) / 1000;
      const slow = reduced.current ? 0.45 : 1;
      setOffset(drift(t * slow) + correction.current);

      if (t * 1000 >= HOLD_AT_MS) {
        const decayed = START_SPEED - (t - HOLD_AT_MS / 1000) * DECAY_KT_PER_S;
        const next = Math.max(FLOOR_SPEED, decayed);
        setSpeed(next);
        setHeld((was) => {
          if (!was) {
            setSpeedAtHold(START_SPEED);
            if (showsMeaning) {
              setModeAnnouncement("Autothrottle HOLD. Not managing speed.");
            }
          }
          return true;
        });
        if (next <= FLOOR_SPEED) {
          finish("late", next);
          return;
        }
      }
      raf.current = requestAnimationFrame(tick);
    },
    [finish, reduced, showsMeaning],
  );

  const play = () => {
    setPhase("running");
    setSpeed(START_SPEED);
    setHeld(false);
    setOffset(0);
    setResult("");
    setModeAnnouncement("");
    setSpeedAtHold(null);
    correction.current = 0;
    startedAt.current = performance.now();
    raf.current = requestAnimationFrame(tick);
    requestAnimationFrame(() => powerRef.current?.focus());
  };

  const addPower = () => {
    if (phase !== "running") return;
    finish("recovered", speed);
  };

  const reset = () => {
    stop();
    setPhase("idle");
    setSpeed(START_SPEED);
    setHeld(false);
    setOffset(0);
    setResult("");
    setModeAnnouncement("");
    setSpeedAtHold(null);
    correction.current = 0;
    requestAnimationFrame(() => playRef.current?.focus());
  };

  /**
   * `direction` is -1 for up and +1 for down, matching the arrow keys. A
   * larger offset puts the dot lower in the box, so up has to *subtract* —
   * getting this backwards inverts the control, which on a glide-path task
   * is the one bug a reader would blame themselves for.
   */
  const nudge = (direction: -1 | 1) => {
    correction.current += direction * NUDGE;
    setOffset((o) => o + direction * NUDGE);
  };

  const running = phase === "running";
  const done = phase === "recovered" || phase === "late";
  const low = speed < TARGET_SPEED;
  const warning = speed <= WARN_SPEED;

  return (
    <div className="console">
      <p className="console-title">Approach</p>
      <div className="console-screen console-crt">
        <div className="at-readouts">
          <div className="at-cell">
            <p className="at-cell-label">Airspeed</p>
            {/* The patterned side marks the trend in text and in a glyph as
                well as in colour; the anti-pattern side leaves the number
                looking exactly as it did at 137. */}
            <p className={`at-speed${showsMeaning && low ? " is-low" : ""}`}>
              {Math.round(speed)} kt
              {showsMeaning && low && (
                <span className="at-trend">
                  <span aria-hidden="true">▼</span> falling
                </span>
              )}
            </p>
            <p className="at-cell-sub">Target {TARGET_SPEED} kt</p>
          </div>

          <div className="at-cell">
            <p className="at-cell-label">Autothrottle</p>
            {showsMeaning && held ? (
              <p
                className={`at-mode is-meaning${reduced.current ? "" : " is-new"}`}
                key="held-with"
              >
                AUTOTHROTTLE HOLD: not managing speed
              </p>
            ) : (
              <p className="at-mode">{held ? "HOLD" : "SPD"}</p>
            )}
          </div>
        </div>

        {/* The anti-pattern's single late cue. */}
        {!showsMeaning && running && warning && (
          <p className="at-warn" aria-hidden="true">
            ⚠ LOW AIRSPEED
          </p>
        )}

        <GlidePath
          offset={offset}
          onNudge={nudge}
          disabled={!running}
          label="Glide path. Use the up and down arrow keys to hold the dot on the line."
        />

        <div className="fc-actions">
          {!running && !done && (
            <button type="button" className="fc-approve" ref={playRef} onClick={play}>
              Play
            </button>
          )}
          <button
            type="button"
            className="fc-go"
            ref={powerRef}
            onClick={addPower}
            disabled={!running}
          >
            Add power
          </button>
          {done && (
            <button type="button" className="console-reset" ref={resetRef} onClick={reset}>
              Reset the demo
            </button>
          )}
        </div>

        <p className="console-hint">
          {phase === "idle" &&
            "Press Play, then keep the dot on the line. The autothrottle has the speed."}
          {running && "Hold the dot on the line."}
          {done && result}
        </p>

        {/* Mode changes are announced only where the interface makes them
            mean something. The Without side stays silent on purpose — that
            silence is the anti-pattern — but its result is announced, because
            withholding the outcome would be a different failure. */}
        {showsMeaning && (
          <p className="sr-only" role="status">
            {modeAnnouncement}
          </p>
        )}
        <p className="sr-only" role="status">
          {result}
        </p>

        {done && speedAtHold !== null && (
          <p className="at-debrief">
            The mode changed from SPD to HOLD four seconds in, at {speedAtHold} kt.
            {showsMeaning
              ? " The display said what that meant."
              : " The display said “HOLD”, in the same color as everything else."}
          </p>
        )}
      </div>
    </div>
  );
}

export function Autothrottle({ variant }: { variant: "without" | "with" }) {
  return <Screen variant={variant} />;
}
