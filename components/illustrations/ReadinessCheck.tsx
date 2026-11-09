"use client";

import { useEffect, useId, useRef, useState } from "react";

import { Log, usePrinter, useStepFocus, type Line } from "./printout";

/**
 * The same driver-assist panel checked two ways. The reader sets what the
 * driver is doing — a hand on the wheel, eyes on the road or on a phone — and
 * presses Play.
 *
 * On the left the check senses the hand, so a driver looking at a phone with a
 * hand resting on the wheel reads as engaged, and the panel says so right up
 * to the hazard. On the right the check watches the eyes, and failing it
 * starts a ladder that ends in a stop rather than in more asking.
 *
 * Nothing here is a reading from the Mountain View report: the panel, the
 * toggles and the rungs are written for this page. What is taken from the
 * report is the failure — a system that assessed engagement from the steering
 * wheel, had not detected hands for the last six seconds, and raised nothing.
 */

type Eyes = "road" | "phone";

/** Ten seconds of driving before the hazard, on both panels. */
const HAZARD_MS = 10_000;

/** One rung every four seconds, until the ladder runs out of rungs. */
const RUNG_MS = 4_000;

/**
 * The escalation, written down before the lapse rather than improvised
 * during it. Each rung is louder than the one above it, and the last one is
 * not a way of asking.
 */
const LADDER: { name: string; lines: string[] }[] = [
  { name: "PROMPT", lines: ["Eyes on road, please."] },
  { name: "CHIME", lines: ["♪ chime · eyes on road"] },
  { name: "SPOKEN", lines: ['Spoken: "Take over now."'] },
  { name: "STOP", lines: ["No response.", "Slowing to a stop."] },
];

const BARRIER: string[] = ["Barrier ahead."];

const MISSED: string[] = [
  "The system thought you were",
  "  engaged. You were looking",
  "  at your phone.",
];

const RESUMED: string[] = ["Thanks.", "Assistance continuing."];

/** The two things the reader sets, offered identically on both panels. */
function DriverControls({
  hand,
  eyes,
  onHand,
  onEyes,
  disabled,
  name,
}: {
  hand: boolean;
  eyes: Eyes;
  onHand: (on: boolean) => void;
  onEyes: (e: Eyes) => void;
  disabled?: boolean;
  name: string;
}) {
  return (
    <div className="rc-controls">
      <label className="fc-choice rc-toggle">
        <input
          type="checkbox"
          checked={hand}
          disabled={disabled}
          onChange={(e) => onHand(e.target.checked)}
        />
        <span className="fc-choice-name">Hand on wheel</span>
      </label>

      <fieldset className="fc-choices rc-eyes">
        <legend className="fc-entry-label">Eyes on</legend>
        {(["road", "phone"] as const).map((value) => (
          <label key={value} className="fc-choice rc-toggle">
            <input
              type="radio"
              name={name}
              value={value}
              checked={eyes === value}
              disabled={disabled}
              onChange={() => onEyes(value)}
            />
            <span className="fc-choice-name">{value}</span>
          </label>
        ))}
      </fieldset>
    </div>
  );
}

/**
 * The anti-pattern: a hand on the wheel is the whole check. The panel is
 * telling the truth about what it measured and the wrong thing about what it
 * was relying on, and it keeps saying so until the hazard arrives.
 */
function WithoutScreen() {
  const name = useId();
  const { lines, print, reset } = usePrinter([]);
  const sendFocus = useStepFocus();
  const playRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hand, setHand] = useState(true);
  const [eyes, setEyes] = useState<Eyes>("phone");
  const [stage, setStage] = useState<"idle" | "driving" | "done">("idle");
  const [status, setStatus] = useState("");

  // The eyes can change during the run, so the hazard reads them at the
  // moment it arrives rather than at the moment Play was pressed.
  const eyesNow = useRef<Eyes>(eyes);
  eyesNow.current = eyes;

  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  const play = () => {
    setStage("driving");
    print(
      [
        {
          key: "w-verdict",
          text: hand ? "Driver engaged ✓" : "Hold steering wheel",
          tone: hand ? "normal" : "fault",
          warn: !hand,
        },
      ],
      () =>
        setStatus(
          hand
            ? "Driver engaged. The check senses the hand on the wheel."
            : "Hold steering wheel.",
        ),
    );

    timer.current = setTimeout(() => {
      const looking = eyesNow.current === "phone";
      print(
        [
          ...BARRIER.map((text, i) => ({
            key: `w-haz-${i}`,
            text,
            tone: "fault" as const,
            warn: i === 0,
          })),
          ...(looking
            ? MISSED.map((text, i) => ({ key: `w-miss-${i}`, text, tone: "rule" as const }))
            : []),
        ],
        () => {
          setStage("done");
          setStatus(
            looking ? `${BARRIER.join(" ")} ${MISSED.join(" ")}` : BARRIER.join(" "),
          );
          sendFocus(resetRef);
        },
      );
    }, HAZARD_MS);
  };

  const resetAll = () => {
    if (timer.current) clearTimeout(timer.current);
    reset();
    setStage("idle");
    setHand(true);
    setEyes("phone");
    setStatus("");
    sendFocus(playRef);
  };

  return (
    <div className="console">
      <p className="console-title">Driver monitoring</p>
      <div className="console-screen console-crt rc-screen">
        <DriverControls
          hand={hand}
          eyes={eyes}
          onHand={setHand}
          onEyes={setEyes}
          disabled={stage === "done"}
          name={name}
        />

        <Log lines={lines} minLines={9} />

        {stage === "idle" && (
          <button type="button" className="fc-go" ref={playRef} onClick={play}>
            Play
          </button>
        )}

        <p className="console-hint">
          {stage === "idle" && "A hand on the wheel is all this check can sense."}
          {stage === "driving" && "Ten seconds of driving. Nothing is watching your eyes."}
          {stage === "done" && "The check passed the whole way. It was measuring the wrong thing."}
        </p>

        <p className="sr-only" role="status" aria-live="polite">
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
 * The pattern: the check watches where the driver is looking, and a failed
 * check escalates on a ladder whose last rung is not a request. Looking back
 * at the road at any rung resets it — the point is to get the driver back,
 * not to punish them.
 */
function WithScreen() {
  const name = useId();
  const { lines, print, reset } = usePrinter([]);
  const sendFocus = useStepFocus();
  const playRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hand, setHand] = useState(true);
  const [eyes, setEyes] = useState<Eyes>("road");
  const [stage, setStage] = useState<"idle" | "driving" | "stopped">("idle");
  /** How far down the ladder the current lapse has gone. -1 is not on it. */
  const [rung, setRung] = useState(-1);
  const [status, setStatus] = useState("");

  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  /** Prints rung `i`, then schedules the next one. */
  const climb = (i: number, run: number) => {
    const step = LADDER[i];
    setRung(i);
    print(
      step.lines.map((text, j) => ({
        key: `p-r${run}-${i}-${j}`,
        text,
        tone: i === LADDER.length - 1 ? ("fault" as const) : ("normal" as const),
        warn: i === LADDER.length - 1 && j === 0,
      })),
      () => {
        setStatus(step.lines.join(" "));
        if (i === LADDER.length - 1) {
          setStage("stopped");
          sendFocus(resetRef);
          return;
        }
        // The rungs are paced in real time on purpose: how long the system
        // waits before insisting is the content. Only the line-by-line
        // printing is dropped under prefers-reduced-motion, by the printer.
        timer.current = setTimeout(() => climb(i + 1, run), RUNG_MS);
      },
    );
  };

  const lapses = useRef(0);

  const chooseEyes = (next: Eyes) => {
    setEyes(next);
    if (stage !== "driving") return;

    if (next === "phone") {
      // Already climbing, or waiting on the first rung: nothing to restart.
      if (rung >= 0 || timer.current) return;
      lapses.current += 1;
      climb(0, lapses.current);
      return;
    }

    // Back on the road at any rung, including before the first one has
    // printed — a scheduled climb is a lapse in progress, so it is cancelled
    // on the same terms. The ladder is abandoned, not completed.
    if (rung >= 0 || timer.current) {
      const climbing = rung >= 0;
      clear();
      setRung(-1);
      if (!climbing) return;
      print(
        RESUMED.map((text, i) => ({
          key: `p-back-${lapses.current}-${i}`,
          text,
          tone: "rule" as const,
        })),
        () => setStatus(RESUMED.join(" ")),
      );
    }
  };

  const play = () => {
    setStage("driving");
    const start: Line[] = [{ key: "p-on", text: "Assistance on · eyes checked", tone: "dim" }];
    print(start, () => setStatus("Assistance on. The check is watching where you look."));
    if (eyes === "phone") {
      lapses.current += 1;
      timer.current = setTimeout(() => climb(0, lapses.current), RUNG_MS);
    }
  };

  const resetAll = () => {
    clear();
    reset();
    setStage("idle");
    setRung(-1);
    setHand(true);
    setEyes("road");
    setStatus("");
    lapses.current = 0;
    sendFocus(playRef);
  };

  return (
    <div className="console">
      <p className="console-title">Driver monitoring</p>
      <div className="console-screen console-crt rc-screen">
        <DriverControls
          hand={hand}
          eyes={eyes}
          onHand={setHand}
          onEyes={chooseEyes}
          disabled={stage === "stopped"}
          name={name}
        />

        {/* The ladder is on screen before the lapse, the way the fallback
            states are in Graceful Degradation: a rung the reader only meets
            after failing the check is not a published escalation. */}
        <ol className="gd-ladder rc-ladder">
          {LADDER.map((step, i) => (
            <li
              key={step.name}
              className={`gd-rung${i === rung ? " is-here" : ""}${
                rung >= 0 && i < rung ? " is-passed" : ""
              }`}
            >
              <span className="gd-marker" aria-hidden="true">
                {i === rung ? "▸" : " "}
              </span>
              <span className="gd-rung-name">{step.name}</span>
              {i === rung && <span className="gd-rung-now"> — now</span>}
            </li>
          ))}
        </ol>

        <Log lines={lines} minLines={6} />

        {stage === "idle" && (
          <button type="button" className="fc-go" ref={playRef} onClick={play}>
            Play
          </button>
        )}

        <p className="console-hint">
          {stage === "idle" && "This check watches the eyes. Set them on the phone and play."}
          {stage === "driving" &&
            (rung >= 0
              ? "It is climbing the ladder. Look back at the road to stop it."
              : "Engaged. Switch your eyes to the phone.")}
          {stage === "stopped" && "Nobody answered, so it stopped. That is what makes asking honest."}
        </p>

        <p className="sr-only" role="status" aria-live="polite">
          {status}
        </p>

        {stage === "stopped" && (
          <button type="button" className="console-reset" ref={resetRef} onClick={resetAll}>
            Reset the demo
          </button>
        )}
      </div>
    </div>
  );
}

export function ReadinessCheck({ variant }: { variant: "without" | "with" }) {
  return variant === "without" ? <WithoutScreen /> : <WithScreen />;
}
