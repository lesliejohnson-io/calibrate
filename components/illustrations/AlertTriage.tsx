"use client";

import { useId, useRef, useState } from "react";

import { Log, usePrinter, useStepFocus, type Line } from "./printout";

/**
 * Two alarm panels carrying the same thirty events.
 *
 * A flood prints faster than a readout a person is meant to follow, so these
 * lines land every 60ms rather than the usual 120 — fast enough that the
 * reader watches the panel fill instead of reading it, which is the condition
 * the pattern is about.
 *
 * The panel is the plain readout rather than the green CRT the other
 * printed demos use: this pattern ranks alerts in red and amber, and a
 * monochrome display cannot show the thing being demonstrated. The rank is
 * still written in words beside every colour.
 *
 * The events are a simplified illustration in the shape of the Three Mile
 * Island sequence, not plant data: a plant trip, a relief valve left open,
 * and the consequences of coolant leaving through it. Both panels say so on
 * screen, because a demo that looks like a record of a real accident will be
 * read as one.
 */
const FLOOD_MS = 60;

/** The one alarm that needs a hand on a control. */
const WARNING = "RELIEF VALVE OPEN";

/** What the operator is supposed to do about it. */
const WARNING_ACTION = "CLOSE BLOCK VALVE RC-V2";

/**
 * Act soon, not now: the plant trip that preceded the stuck valve. These are
 * their own faults rather than consequences of it, so they stay on the panel
 * under their own rank instead of being grouped away.
 */
const CAUTIONS = [
  "FEEDWATER PUMP TRIP",
  "TURBINE TRIP",
  "REACTOR TRIP",
  "STEAM GEN A LEVEL LOW",
  "AUX FEEDWATER START",
] as const;

/**
 * Consequences of the open valve: coolant leaving the system, and every
 * instrument downstream of it reporting what that did. Twenty-four alarms,
 * none of which is a new fault.
 */
const CONSEQUENCES = [
  "PRESSURIZER LEVEL HIGH",
  "RC PRESSURE LOW",
  "RC PRESSURE FALLING",
  "PRESSURIZER TEMP HIGH",
  "LETDOWN FLOW HIGH",
  "LETDOWN TEMP HIGH",
  "DRAIN TANK LEVEL HIGH",
  "DRAIN TANK TEMP HIGH",
  "DRAIN TANK PRESSURE HIGH",
  "DRAIN TANK RUPTURE DISC",
  "CONTAINMENT SUMP LEVEL HIGH",
  "CONTAINMENT SUMP PUMP RUNNING",
  "AUX BUILDING SUMP LEVEL HIGH",
  "MAKEUP TANK LEVEL LOW",
  "HPI PUMP A RUNNING",
  "HPI PUMP B RUNNING",
  "RC TEMP RISING",
  "CORE EXIT TEMP HIGH",
  "RC PUMP 1A VIBRATION HIGH",
  "RC PUMP 1B VIBRATION HIGH",
  "PRESSURIZER LEVEL OFFSCALE",
  "CONTAINMENT PRESSURE HIGH",
  "CONTAINMENT TEMP HIGH",
  "CONTAINMENT RADIATION HIGH",
] as const;

/**
 * The arrival order on the untriaged panel: the trip, then the first effects
 * of the leak, then the alarm that names its cause, then the rest. The one
 * that matters is the fifteenth of thirty — buried, not hidden.
 */
const FLOOD: string[] = [
  ...CAUTIONS,
  ...CONSEQUENCES.slice(0, 9),
  WARNING,
  ...CONSEQUENCES.slice(9),
];

const WARNING_AT = FLOOD.indexOf(WARNING); // 14
const NOTE = "Simplified illustration, not real plant data.";

/**
 * The anti-pattern. Thirty alarms in one typeface, one colour and one weight,
 * in the order they happened, and a question that can only be answered by
 * reading all of them. Every line is a button, so the panel is as operable
 * from the keyboard as it is unreadable.
 */
function WithoutScreen() {
  const groupId = useId();
  const { lines, print, reset } = usePrinter([]);
  const sendFocus = useStepFocus();
  const startRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const firstLineRef = useRef<HTMLButtonElement>(null);
  const [stage, setStage] = useState<"idle" | "printing" | "asking" | "done">("idle");
  const [status, setStatus] = useState("");
  const [verdict, setVerdict] = useState("");

  const run = () => {
    setStage("printing");
    print(
      FLOOD.map((text, i) => ({ key: `f-${i}`, text })),
      () => {
        setStage("asking");
        setStatus(
          `${FLOOD.length} alarms, all the same. Find the alarm that needs action now. ` +
            "Every line is a button.",
        );
        sendFocus(firstLineRef);
      },
      0,
      FLOOD_MS,
    );
  };

  const pick = (index: number) => {
    if (index === WARNING_AT) {
      const read = index + 1;
      setStage("done");
      setVerdict(`Found it, after reading ${read} alarms.`);
      setStatus(`${WARNING}. Found it, after reading ${read} alarms.`);
      sendFocus(resetRef);
      return;
    }
    setVerdict("That one can wait. Keep looking.");
    setStatus(`${FLOOD[index]}. That one can wait. Keep looking.`);
  };

  const resetAll = () => {
    reset();
    setStage("idle");
    setStatus("");
    setVerdict("");
    sendFocus(startRef);
  };

  return (
    <div className="console">
      <p className="console-title">Control room alarm panel</p>
      <div className="console-screen">
        {stage === "idle" ? (
          <Log lines={lines} minLines={9} />
        ) : (
          <div className="tri-flood" role="group" aria-labelledby={groupId}>
            <p className="tri-ask" id={groupId}>
              Find the alarm that needs action now.
            </p>
            <ul className="tri-lines">
              {lines.map((line, i) => (
                <li key={line.key}>
                  <button
                    type="button"
                    className="tri-line"
                    ref={i === 0 ? firstLineRef : undefined}
                    disabled={stage !== "asking"}
                    onClick={() => pick(i)}
                  >
                    {line.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {stage === "idle" && (
          <button type="button" className="fc-go" ref={startRef} onClick={run}>
            Trigger the fault
          </button>
        )}

        <p className="console-hint">
          {stage === "idle" && `Press to see what the control room saw. ${NOTE}`}
          {stage === "printing" && " "}
          {stage === "asking" && (verdict || "Thirty alarms, every one of them equal.")}
          {stage === "done" &&
            `${verdict} Nothing on the panel ranked it, so the only way to find it was to read the flood.`}
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
 * The pattern. The same thirty events, ranked: the one that needs a hand now
 * at the top with its action, the five that need one soon under their own
 * rank, and the twenty-four consequences of the first one collapsed under it
 * — still on the panel, one keystroke away, no longer competing with their
 * own cause.
 *
 * Each rank is named in words beside its colour, so the ranking survives
 * greyscale, both themes and anyone who cannot separate red from amber.
 */
function WithScreen() {
  const { lines, print, reset } = usePrinter([]);
  const sendFocus = useStepFocus();
  const startRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const showRef = useRef<HTMLButtonElement>(null);
  const [stage, setStage] = useState<"idle" | "printing" | "done">("idle");
  const [shown, setShown] = useState(false);
  const [status, setStatus] = useState("");

  const run = () => {
    setStage("printing");
    print(
      [
        { key: "t-warn", text: WARNING },
        ...CAUTIONS.map((text, i) => ({ key: `t-c-${i}`, text })),
      ],
      () => {
        setStage("done");
        setStatus(
          `Warning: ${WARNING}, act now. ${WARNING_ACTION}. ` +
            `Caution, act soon: ${CAUTIONS.join(", ")}. ` +
            `${CONSEQUENCES.length} related alarms, consequences of ${WARNING}, grouped under it.`,
        );
        sendFocus(resetRef);
      },
      0,
      FLOOD_MS,
    );
  };

  const resetAll = () => {
    reset();
    setStage("idle");
    setShown(false);
    setStatus("");
    sendFocus(startRef);
  };

  const printed = (key: string) => lines.some((l: Line) => l.key === key);

  return (
    <div className="console">
      <p className="console-title">Control room alarm panel</p>
      <div className="console-screen">
        <div className="tri-ranked" style={{ minHeight: "calc(9 * 1.5 * 14px)" }}>
          {printed("t-warn") && (
            <div className="tri-rank is-warning">
              <p className="tri-rank-head">
                <span className="tri-rank-word">WARNING</span>{" "}
                <span className="tri-rank-text">{WARNING}: act now</span>
              </p>
              <p className="tri-rank-action">→ {WARNING_ACTION}</p>
            </div>
          )}

          {CAUTIONS.map(
            (text, i) =>
              printed(`t-c-${i}`) && (
                <p key={text} className="tri-rank is-caution tri-rank-head">
                  <span className="tri-rank-word">CAUTION</span>{" "}
                  <span className="tri-rank-text">{text}: act soon</span>
                </p>
              ),
          )}

          {stage === "done" && (
            <div className="tri-group">
              <p className="tri-group-line">
                <span className="tri-rank-word is-quiet">GROUPED</span>{" "}
                <span className="tri-rank-text">
                  {CONSEQUENCES.length} related alarms, consequences of {WARNING}
                </span>
                <button
                  type="button"
                  className="tri-show"
                  ref={showRef}
                  aria-expanded={shown}
                  onClick={() => setShown((v) => !v)}
                >
                  [{shown ? "hide" : "show"}]
                </button>
              </p>
              {shown && (
                <ul className="tri-group-list">
                  {CONSEQUENCES.map((text) => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {stage === "idle" && (
          <button type="button" className="fc-go" ref={startRef} onClick={run}>
            Trigger the fault
          </button>
        )}

        <p className="console-hint">
          {stage === "idle" && `The same thirty events, ranked. ${NOTE}`}
          {stage === "printing" && " "}
          {stage === "done" &&
            "One alarm needs a hand now, five need one soon, and twenty-four are consequences of the first. Nothing was thrown away."}
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

export function AlertTriage({ variant }: { variant: "without" | "with" }) {
  return variant === "without" ? <WithoutScreen /> : <WithScreen />;
}
