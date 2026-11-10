"use client";

import { useId, useRef, useState } from "react";

import { Log, usePrinter, useStepFocus, type Line } from "./printout";

/**
 * The Nogales ground control station at the moment the engine stops. The
 * pilot's console has locked up, control has moved to the console beside it,
 * and on that console the lever under the operator's hand is the engine's
 * fuel control rather than the camera iris — sitting in the position that
 * means cutoff.
 *
 * The three readings are what a station would show for an engine that has
 * stopped: altitude falling, airspeed decaying, and no engine indication at
 * all. The anti-pattern screen prints exactly these and stops, which is what
 * the pilot had. The patterned screen prints the same three under the
 * condition that produced them, and names the lever.
 *
 * Nothing here is a reading from CHI06MA121: the readouts and the wording of
 * the alert are written for this page, which is why the pattern carries
 * `demoNote: "Simplified illustration, not real ground station data."`
 *
 * Lines are hand-split to stay inside the column: `.fc-line` is
 * `white-space: pre`, so a long line runs off the panel instead of wrapping.
 */
const SYMPTOMS: Omit<Line, "key">[] = [
  { text: "ALT        FALLING", tone: "fault", warn: true },
  { text: "AIRSPEED   FALLING", tone: "fault", warn: true },
  { text: "ENGINE     —", tone: "fault", warn: true },
];

const keyed = (prefix: string): Line[] =>
  SYMPTOMS.map((s, i) => ({ ...s, key: `${prefix}-${i}` }));

/**
 * The four systems a pilot could reasonably reach for. Fuel is first because
 * it is the right answer and still unreachable from this screen: the demo's
 * point is that a competent guess has nothing on the display to settle it
 * against.
 */
const GUESSES = ["Fuel", "Data link", "Engine", "Generator"] as const;

/**
 * The anti-pattern: three true readings, no cause, and a question the display
 * has left to the operator. Every answer is treated the same way, because the
 * demo is not a quiz — there is nothing on this screen that could settle it.
 */
function WithoutScreen() {
  const groupId = useId();
  const { lines, print, reset } = usePrinter([]);
  const sendFocus = useStepFocus();
  const startRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const firstGuessRef = useRef<HTMLButtonElement>(null);
  const [stage, setStage] = useState<"idle" | "printing" | "asking" | "done">("idle");
  const [status, setStatus] = useState("");

  const run = () => {
    setStage("printing");
    print(keyed("w"), () => {
      setStage("asking");
      setStatus(
        "Altitude falling. Airspeed falling. No engine indication. No cause given. What's wrong?",
      );
      sendFocus(firstGuessRef);
    });
  };

  const guess = (choice: string) => {
    setStage("printing");
    print(
      [
        { key: "w-pick", text: `> ${choice.toUpperCase()}`, tone: "dim" },
        { key: "w-verdict", text: "You're guessing. So was the pilot.", tone: "rule" },
      ],
      () => {
        setStage("done");
        setStatus(`You chose ${choice}. You're guessing. So was the pilot.`);
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
      <p className="console-title">Ground control station · Console 2</p>
      <div className="console-screen console-crt">
        <Log lines={lines} minLines={9} />

        {stage === "asking" && (
          <div role="group" aria-labelledby={groupId}>
            <p className="fc-ask" id={groupId}>
              What&rsquo;s wrong?
            </p>
            <div className="fc-guesses">
              {GUESSES.map((g, i) => (
                <button
                  key={g}
                  type="button"
                  className="fc-guess"
                  ref={i === 0 ? firstGuessRef : undefined}
                  onClick={() => guess(g)}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        )}

        {stage === "idle" && (
          <button type="button" className="fc-go" ref={startRef} onClick={run}>
            Trigger the fault
          </button>
        )}

        <p className="console-hint">
          {stage === "idle" && "Press to see what the pilot saw."}
          {stage === "printing" && " "}
          {stage === "asking" && "Three true readings. Nothing names the cause."}
          {stage === "done" &&
            "Nothing on this display could have settled it. The lever that caused it is on this console, unannounced."}
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
 * The pattern: the same three readings, printed underneath the condition that
 * explains them, then the thing to do about it, then the record. Nothing is
 * added to what the station knew — the lever position was already readable by
 * the machine. The only difference is that the display says so.
 */
function WithScreen() {
  const { lines, print, reset } = usePrinter([]);
  const sendFocus = useStepFocus();
  const startRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const [stage, setStage] = useState<"idle" | "printing" | "done">("idle");
  const [status, setStatus] = useState("");

  const run = () => {
    setStage("printing");
    print(
      [
        { key: "c-head", text: "ENGINE FUEL CUTOFF", tone: "fault", warn: true },
        { key: "c-1", text: "condition lever on this", tone: "dim" },
        { key: "c-2", text: "console is at CUTOFF", tone: "dim" },
        { key: "c-3", text: "move to RUN", tone: "dim" },
        ...keyed("s"),
        { key: "c-log", text: "LOGGED · SENT TO MAINTENANCE", tone: "rule" },
      ],
      () => {
        setStage("done");
        setStatus(
          "Engine fuel cutoff: the condition lever on this console is at CUTOFF. Move it to RUN. " +
            "Symptoms: altitude falling, airspeed falling, no engine indication. " +
            "Logged and sent to maintenance.",
        );
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
      <p className="console-title">Ground control station · Console 2</p>
      <div className="console-screen console-crt">
        <Log lines={lines} minLines={9} />

        {stage === "idle" && (
          <button type="button" className="fc-go" ref={startRef} onClick={run}>
            Trigger the fault
          </button>
        )}

        <p className="console-hint">
          {stage === "idle" && "The same fault, on a display that names it."}
          {stage === "printing" && " "}
          {stage === "done" &&
            "Same three readings, one named condition, and the control to move. Because it has a name, it can be written down."}
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

export function ExplainableFault({ variant }: { variant: "without" | "with" }) {
  return variant === "without" ? <WithoutScreen /> : <WithScreen />;
}
