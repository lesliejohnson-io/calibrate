"use client";

import { useId, useRef, useState } from "react";

import { Log, usePrinter, useStepFocus, type Line } from "./printout";

/**
 * The four symptoms Lion Air Flight 610's crew met, in the order the
 * secondary reporting describes them: the stick shaker, airspeed and altitude
 * disagreement, and stabiliser trim running nose-down. The anti-pattern
 * screen prints exactly these and stops; the patterned screen prints the same
 * four under the condition that produced them.
 *
 * The AOA DISAGREE alert was not working on that aircraft, which is why the
 * left-hand screen is the one that actually flew.
 */
const SYMPTOMS: Omit<Line, "key">[] = [
  { text: "STICK SHAKER", tone: "fault", warn: true },
  { text: "IAS DISAGREE", tone: "fault", warn: true },
  { text: "ALT DISAGREE", tone: "fault", warn: true },
  { text: "STAB TRIM MOVING", tone: "fault", warn: true },
];

const keyed = (prefix: string): Line[] =>
  SYMPTOMS.map((s, i) => ({ ...s, key: `${prefix}-${i}` }));

/**
 * The four systems a crew could reasonably reach for. Speed trim is first
 * because it is the one the previous day's captain actually named — the
 * demo's point is that the guess was a competent guess, not a careless one.
 */
const GUESSES = ["Speed trim", "Autopilot", "Pitot heat", "Hydraulics"] as const;

/**
 * The anti-pattern: four true readings, no cause, and a question the display
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
        "Stick shaker. Airspeed disagree. Altitude disagree. Stabiliser trim moving. No cause given. What's wrong?",
      );
      sendFocus(firstGuessRef);
    });
  };

  const guess = (choice: string) => {
    setStage("printing");
    print(
      [
        { key: "w-pick", text: `> ${choice.toUpperCase()}`, tone: "dim" },
        { key: "w-verdict", text: "You're guessing. So was the crew.", tone: "rule" },
      ],
      () => {
        setStage("done");
        setStatus(`You chose ${choice}. You're guessing. So was the crew.`);
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
      <p className="console-title">Flight deck alerts</p>
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
          {stage === "idle" && "Press to see what the crew saw."}
          {stage === "printing" && " "}
          {stage === "asking" && "Four true readings. Nothing names the cause."}
          {stage === "done" &&
            "Nothing on this display could have settled it. The alert that would have was inoperative."}
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
 * The pattern: the same four readings, printed underneath the condition that
 * explains them, then the checklist, then the record. Nothing is added to
 * what the aircraft knew — the sensors had already disagreed. The only
 * difference is that the display says so.
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
        { key: "c-head", text: "AOA DISAGREE", tone: "fault", warn: true },
        {
          key: "c-1",
          text: "left and right angle-of-attack",
          tone: "dim",
        },
        { key: "c-2", text: "sensors disagree; left-side", tone: "dim" },
        { key: "c-3", text: "airspeed and altitude unreliable", tone: "dim" },
        ...keyed("s"),
        { key: "c-list", text: "▣ CHECKLIST  AOA DISAGREE" },
        { key: "c-log", text: "FAULT LOGGED → MAINTENANCE", tone: "rule" },
      ],
      () => {
        setStage("done");
        setStatus(
          "AOA DISAGREE: left and right angle-of-attack sensors disagree; left-side airspeed and altitude unreliable. " +
            "Symptoms: stick shaker, airspeed disagree, altitude disagree, stabiliser trim moving. " +
            "Checklist: AOA DISAGREE. Fault logged to maintenance.",
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
      <p className="console-title">Flight deck alerts</p>
      <div className="console-screen console-crt">
        <Log lines={lines} minLines={9} />

        {stage === "idle" && (
          <button type="button" className="fc-go" ref={startRef} onClick={run}>
            Trigger the fault
          </button>
        )}

        <p className="console-hint">
          {stage === "idle" && "The same fault, on a display that names it."}
          {stage === "printing" && " "}
          {stage === "done" &&
            "Same four readings, one named condition, and a procedure. Because it has a name, it can be written down."}
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
