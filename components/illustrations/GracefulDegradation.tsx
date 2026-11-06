"use client";

import { useId, useRef, useState } from "react";

import { Log, usePrinter, useStepFocus, type Line } from "./printout";

/**
 * A delivery drone losing three capabilities, on two panels.
 *
 * The same three faults are injected on both sides in whatever order the
 * reader picks. On the left the drone steps down silently: a fault code, a
 * mode label that changes, and nothing about what the aircraft can still do.
 * On the right the ladder is on screen, each fault moves the marker down one
 * rung as a single event, and every rung says what still works, what has
 * gone, and where it falls to next.
 *
 * Simplified illustration: the fault codes and the ladder are written for
 * this demo, not taken from any aircraft.
 */

type FaultId = "gps" | "camera" | "battery";

const FAULTS: { id: FaultId; label: string; code: string; mode: string }[] = [
  { id: "gps", label: "GPS lost", code: "NAV FAULT 0x21", mode: "ATTI" },
  { id: "camera", label: "Camera blocked", code: "VIS FAULT 0x07", mode: "MAN" },
  { id: "battery", label: "Battery critical", code: "PWR FAULT 0x3C", mode: "LAND" },
];

/**
 * The ladder, designed before the fault rather than improvised during it.
 * Each rung is the state the drone falls to next, and names the tasks that
 * survive it — which is the half of the pattern the left-hand panel skips.
 */
const LADDER = [
  {
    name: "FULL",
    works: "waypoint navigation, obstacle avoidance, delivery, return to home",
    gone: "nothing",
  },
  {
    name: "REDUCED",
    works: "altitude hold, manual flight, return to home on last known heading",
    gone: "waypoint navigation, precision delivery",
  },
  {
    name: "LAND IN PLACE",
    works: "controlled descent, position hold while descending",
    gone: "all horizontal travel, return to home",
  },
  { name: "STOP", works: "nothing: it is on the ground", gone: "flight" },
] as const;

const NOTE = "Simplified illustration.";

/** The three answers to a question the left-hand panel cannot settle. */
const ANSWERS = ["Yes", "No", "Can't tell"] as const;

/**
 * The anti-pattern. Every fault prints a code and silently moves the mode
 * label on. Both are true, and neither says what the drone can still be
 * trusted with — so the question at the end has no answer on this screen.
 */
function WithoutScreen() {
  const groupId = useId();
  const { lines, print, reset } = usePrinter([
    { key: "w-boot", text: "DELIVERY DRONE 04 · EN ROUTE", tone: "dim" },
  ]);
  const sendFocus = useStepFocus();
  const resetRef = useRef<HTMLButtonElement>(null);
  const firstAnswerRef = useRef<HTMLButtonElement>(null);
  const [mode, setMode] = useState("AUTO");
  const [done, setDone] = useState<FaultId[]>([]);
  const [stage, setStage] = useState<"faults" | "asking" | "answered">("faults");
  const [status, setStatus] = useState("");

  const inject = (fault: (typeof FAULTS)[number]) => {
    const next = [...done, fault.id];
    setDone(next);
    print([{ key: `w-${fault.id}`, text: fault.code, tone: "fault", warn: true }], () => {
      setMode(fault.mode);
      setStatus(`${fault.code}. Mode ${fault.mode}.`);
      if (next.length === FAULTS.length) {
        setStage("asking");
        sendFocus(firstAnswerRef);
      }
    });
  };

  const answer = (choice: string) => {
    print(
      [
        { key: "w-pick", text: `> ${choice.toUpperCase()}`, tone: "dim" },
        { key: "w-verdict", text: "CAN'T TELL. NEITHER COULD THE OPERATOR.", tone: "rule" },
      ],
      () => {
        setStage("answered");
        setStatus(`You answered ${choice}. Can't tell. Neither could the operator.`);
        sendFocus(resetRef);
      },
    );
  };

  const resetAll = () => {
    reset();
    setMode("AUTO");
    setDone([]);
    setStage("faults");
    setStatus("");
  };

  return (
    <div className="console">
      <p className="console-title">Drone status</p>
      <div className="console-screen console-crt">
        <dl className="console-readout">
          <div className="console-cell">
            <dt>Mode</dt>
            <dd>{mode}</dd>
          </div>
          <div className="console-cell">
            <dt>Faults</dt>
            <dd>{done.length}</dd>
          </div>
          <div className="console-cell">
            <dt>Can fly home</dt>
            <dd>—</dd>
          </div>
        </dl>

        <Log lines={lines} minLines={6} />

        {stage === "faults" && (
          <div className="gd-faults">
            {FAULTS.map((f) => (
              <button
                key={f.id}
                type="button"
                className="fc-go"
                disabled={done.includes(f.id)}
                onClick={() => inject(f)}
              >
                Inject fault: {f.label}
              </button>
            ))}
          </div>
        )}

        {stage === "asking" && (
          <div role="group" aria-labelledby={groupId}>
            <p className="fc-ask" id={groupId}>
              Can it still fly home?
            </p>
            <div className="fc-guesses">
              {ANSWERS.map((a, i) => (
                <button
                  key={a}
                  type="button"
                  className="fc-guess"
                  ref={i === 0 ? firstAnswerRef : undefined}
                  onClick={() => answer(a)}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="console-hint">
          {stage === "faults" &&
            `Inject the three faults and watch the mode label. ${NOTE}`}
          {stage === "asking" && "Three codes, three mode changes, and no statement of what it can still do."}
          {stage === "answered" &&
            "The panel reported every fault and never reported a capability. Nothing here could settle the question."}
        </p>

        <p className="sr-only" role="status" aria-live="polite">
          {status}
        </p>

        {stage === "answered" && (
          <button type="button" className="console-reset" ref={resetRef} onClick={resetAll}>
            Reset the demo
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * The pattern. The ladder is on screen before anything fails, so a step down
 * is one event against a state the reader has already seen: the marker moves
 * one rung, and the panel says what survives it.
 */
function WithScreen() {
  const { lines, print, reset } = usePrinter([
    { key: "c-boot", text: "DELIVERY DRONE 04 · EN ROUTE", tone: "dim" },
  ]);
  const sendFocus = useStepFocus();
  const resetRef = useRef<HTMLButtonElement>(null);
  const [rung, setRung] = useState(0);
  const [done, setDone] = useState<FaultId[]>([]);
  const [status, setStatus] = useState("");

  const atFloor = rung >= LADDER.length - 1;

  const inject = (fault: (typeof FAULTS)[number]) => {
    const next = Math.min(rung + 1, LADDER.length - 1);
    const state = LADDER[next];
    setDone((d) => [...d, fault.id]);
    setRung(next);

    /* One step down is one event: the fault, the new rung and its three
       lines print together rather than as four separate alarms. */
    const batch: Line[] = [
      { key: `c-${fault.id}`, text: `${fault.label.toUpperCase()} → ${state.name}`, tone: "fault", warn: true },
      { key: `c-${fault.id}-works`, text: `Still works: ${state.works}` },
      { key: `c-${fault.id}-gone`, text: `Gone: ${state.gone}`, tone: "dim" },
      {
        key: `c-${fault.id}-next`,
        text: next < LADDER.length - 1 ? `Next fallback: ${LADDER[next + 1].name}` : "Next fallback: none, this is the floor",
        tone: "dim",
      },
    ];
    if (state.name === "LAND IN PLACE") {
      batch.push({
        key: `c-${fault.id}-floor`,
        text: "Landing in place. No operator response needed.",
        tone: "rule",
      });
    }

    print(batch, () => {
      setStatus(
        `${fault.label}. Stepped down to ${state.name}. Still works: ${state.works}. Gone: ${state.gone}.` +
          (state.name === "LAND IN PLACE" ? " Landing in place. No operator response needed." : ""),
      );
      if (next === LADDER.length - 1) sendFocus(resetRef);
    });
  };

  const resetAll = () => {
    reset();
    setRung(0);
    setDone([]);
    setStatus("");
  };

  return (
    <div className="console">
      <p className="console-title">Drone status</p>
      <div className="console-screen console-crt">
        {/* The ladder is visible from the start, so a step down reads as a
            move between states the operator already knows about. */}
        <ol className="gd-ladder">
          {LADDER.map((state, i) => (
            <li
              key={state.name}
              className={`gd-rung${i === rung ? " is-here" : ""}${i < rung ? " is-passed" : ""}`}
              aria-current={i === rung ? "step" : undefined}
            >
              <span className="gd-marker" aria-hidden="true">
                {i === rung ? "▶" : " "}
              </span>
              <span className="gd-rung-name">{state.name}</span>
              {i === rung && <span className="gd-rung-now"> — now</span>}
            </li>
          ))}
        </ol>

        <Log lines={lines} minLines={6} />

        {!atFloor && (
          <div className="gd-faults">
            {FAULTS.map((f) => (
              <button
                key={f.id}
                type="button"
                className="fc-go"
                disabled={done.includes(f.id)}
                onClick={() => inject(f)}
              >
                Inject fault: {f.label}
              </button>
            ))}
          </div>
        )}

        <p className="console-hint">
          {rung === 0 && `The ladder is on screen before anything fails. ${NOTE}`}
          {rung > 0 && !atFloor && "One fault, one rung, one statement of what survives it."}
          {atFloor &&
            "The ladder ran out, and the drone put itself on the ground rather than waiting to be told."}
        </p>

        <p className="sr-only" role="status" aria-live="polite">
          {status}
        </p>

        {atFloor && (
          <button type="button" className="console-reset" ref={resetRef} onClick={resetAll}>
            Reset the demo
          </button>
        )}
      </div>
    </div>
  );
}

export function GracefulDegradation({ variant }: { variant: "without" | "with" }) {
  return variant === "without" ? <WithoutScreen /> : <WithScreen />;
}
