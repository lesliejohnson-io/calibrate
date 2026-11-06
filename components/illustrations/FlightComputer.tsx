"use client";

import { useId, useRef, useState } from "react";

import { Log, usePrinter, useStepFocus, type Line } from "./printout";

/**
 * Distances as the Flight Safety Foundation reports them for American
 * Airlines Flight 965: Bogotá was 212 km from the aircraft, which that report
 * gives as 132 statute miles. Earlier drafts of this demo said "132 NM",
 * which is a different distance — see the pattern's `review:` list.
 */
const ROMEO_DIST = "132 mi";
const ROZO_DIST = "8 mi";

/**
 * The flight plan the crew already has. Both screens start here, and the
 * anti-pattern screen is the one that throws it away.
 */
const ROUTE: Line[] = [
  { key: "r-head", text: "ACTIVE ROUTE", tone: "dim" },
  { key: "r-rozo", text: "ROZO        8 MI" },
  { key: "r-app", text: "CALI APPROACH" },
];

/** The query field. Enter submits; the button is the same action for a mouse. */
function Entry({
  onSubmit,
  disabled,
  id,
  inputRef,
}: {
  onSubmit: (value: string) => void;
  disabled: boolean;
  id: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
  const [value, setValue] = useState("");

  return (
    <form
      className="fc-entry"
      onSubmit={(e) => {
        e.preventDefault();
        const v = value.trim();
        if (!v || disabled) return;
        onSubmit(v);
        setValue("");
      }}
    >
      <label className="fc-entry-label" htmlFor={id}>
        Waypoint
      </label>
      <input
        id={id}
        ref={inputRef}
        className="fc-input"
        type="text"
        autoComplete="off"
        spellCheck={false}
        placeholder="R"
        value={value}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="fc-go" disabled={disabled || value.trim() === ""}>
        Enter
      </button>
    </form>
  );
}

/**
 * The anti-pattern: one letter resolves to a beacon 132 miles away and the
 * aircraft commits to it. The route the crew was flying is dropped from the
 * display as the turn begins, which is the part that makes the mistake hard
 * to catch — investigators found the same behaviour in the real FMS.
 */
function WithoutScreen() {
  const entryId = useId();
  const { lines, print, reset, reduced } = usePrinter(ROUTE);
  const sendFocus = useStepFocus();
  const resetRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [status, setStatus] = useState("");

  const run = (value: string) => {
    setBusy(true);
    setStatus("");
    print(
      [
        { key: "w-1", text: "MATCH FOUND  ROMEO", tone: "fault" },
        { key: "w-2", text: `DIST ${ROMEO_DIST.toUpperCase()}`, tone: "fault" },
        { key: "w-3", text: "EXECUTING" },
        { key: "w-4", text: "TURNING" },
      ],
      () => {
        // The turn has begun; the plan it replaced leaves the screen.
        setCleared(true);
        print(
          [{ key: "w-5", text: "── route cleared ──", tone: "rule" }],
          () => {
            setBusy(false);
            setDone(true);
            setStatus(
              `Entered ${value}. Matched ROMEO at ${ROMEO_DIST}. Executing and turning. The active route has been cleared.`,
            );
            sendFocus(resetRef);
          },
          reduced.current ? 0 : 320,
        );
      },
    );
  };

  const resetAll = () => {
    reset();
    setBusy(false);
    setDone(false);
    setCleared(false);
    setStatus("");
    sendFocus(inputRef);
  };

  return (
    <div className="console">
      <p className="console-title">Flight computer</p>
      <div className="console-screen console-crt">
        <Log
          lines={lines}
          minLines={9}
          clearedKeys={cleared ? new Set(ROUTE.map((l) => l.key)) : undefined}
        />

        {!done && <Entry id={entryId} inputRef={inputRef} onSubmit={run} disabled={busy} />}

        <p className="console-hint">
          {done ? "It’s already turning. Where is it going?" : "Type R and press Enter."}
        </p>

        <p className="sr-only" role="status">
          {status}
        </p>

        {done && (
          <button type="button" ref={resetRef} className="console-reset" onClick={resetAll}>
            Reset the demo
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * The pattern: the same ambiguous entry, answered with both matches and the
 * route each would produce, staged as a proposal. Approving ROMEO still flies
 * to ROMEO — a preview is not a veto, and the point is that the crew sees the
 * turn before it starts, not that the machine overrules them.
 */
function WithScreen() {
  const entryId = useId();
  const groupId = useId();
  const { lines, print, reset } = usePrinter(ROUTE);
  const sendFocus = useStepFocus();
  const resetRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const firstChoiceRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState<"entry" | "choose" | "done">("entry");
  const [choice, setChoice] = useState<"rozo" | "romeo" | null>(null);
  const [status, setStatus] = useState("");

  const run = () => {
    setBusy(true);
    print(
      [
        { key: "m-head", text: "2 MATCHES — CHOOSE ONE", tone: "dim" },
        { key: "m-rozo", text: "ROZO     8 MI   ON APPROACH" },
        { key: "m-romeo", text: "ROMEO  132 MI   OFF APPROACH", tone: "fault", warn: true },
      ],
      () => {
        setBusy(false);
        setStage("choose");
        setStatus(
          `Two matches. ROZO, ${ROZO_DIST}, on approach. Warning: ROMEO, ${ROMEO_DIST}, off approach. Choose one. Nothing has executed.`,
        );
        sendFocus(firstChoiceRef);
      },
    );
  };

  const approve = () => {
    const picked = choice === "romeo" ? "ROMEO" : "ROZO";
    const dist = choice === "romeo" ? ROMEO_DIST : ROZO_DIST;
    setBusy(true);
    print(
      [
        { key: "x-1", text: `EXECUTING  ${picked}` },
        { key: "x-2", text: "TURNING" },
      ],
      () => {
        setBusy(false);
        setStage("done");
        setStatus(`Approved. Executing direct to ${picked} at ${dist}, and turning.`);
        sendFocus(resetRef);
      },
    );
  };

  const discard = () => {
    setBusy(true);
    print([{ key: "d-1", text: "── proposal discarded ──", tone: "rule" }], () => {
      setBusy(false);
      setStage("done");
      setStatus("Proposal discarded. The active route is unchanged.");
      sendFocus(resetRef);
    });
  };

  const resetAll = () => {
    reset();
    setBusy(false);
    setStage("entry");
    setChoice(null);
    setStatus("");
    sendFocus(inputRef);
  };

  return (
    <div className="console">
      <p className="console-title">Flight computer</p>
      <div className="console-screen console-crt">
        <Log lines={lines} minLines={9} />

        {stage === "choose" && (
          <fieldset className="fc-choices" disabled={busy}>
            <legend className="fc-entry-label" id={groupId}>
              Proposed waypoint
            </legend>
            {(
              [
                { id: "rozo", label: "ROZO", dist: ROZO_DIST, note: "On approach", warn: false },
                { id: "romeo", label: "ROMEO", dist: ROMEO_DIST, note: "Off approach", warn: true },
              ] as const
            ).map((opt, i) => (
              <label key={opt.id} className={`fc-choice${opt.warn ? " is-fault" : ""}`}>
                <input
                  ref={i === 0 ? firstChoiceRef : undefined}
                  type="radio"
                  name={groupId}
                  value={opt.id}
                  checked={choice === opt.id}
                  onChange={() => setChoice(opt.id)}
                />
                <span className="fc-choice-name">
                  {opt.warn && (
                    <span className="fc-warn" aria-hidden="true">
                      ⚠
                    </span>
                  )}
                  {opt.label}
                </span>
                <span className="fc-choice-dist">{opt.dist}</span>
                <span className="fc-choice-note">{opt.note}</span>
              </label>
            ))}
          </fieldset>
        )}

        {/* The proposal: dashed and labelled as not active, so the route on
            screen is never mistaken for the route being flown. */}
        {stage === "choose" && choice && (
          <div className="fc-proposal">
            <p className="fc-proposal-label">Proposed · not active</p>
            <p className="fc-line is-dim">
              {choice === "romeo" ? "ROMEO     132 MI" : "ROZO        8 MI"}
            </p>
            <p className="fc-line is-dim">
              {choice === "romeo" ? "LEAVES APPROACH" : "CALI APPROACH"}
            </p>
          </div>
        )}

        {stage === "entry" && (
          <Entry id={entryId} inputRef={inputRef} onSubmit={run} disabled={busy} />
        )}

        {stage === "choose" && (
          <div className="fc-actions">
            <button
              type="button"
              className="fc-approve"
              onClick={approve}
              disabled={busy || choice === null}
            >
              Approve
            </button>
            <button type="button" className="fc-discard" onClick={discard} disabled={busy}>
              Discard
            </button>
          </div>
        )}

        <p className="console-hint">
          {stage === "entry" && "Type R and press Enter."}
          {stage === "choose" &&
            (choice === null
              ? "Two matches. Choose one to see the route it would fly."
              : "Nothing turns until you approve. ROMEO is still approvable — it is your call, made with the route in front of you.")}
          {stage === "done" && "The crew saw the turn before it started."}
        </p>

        <p className="sr-only" role="status">
          {status}
        </p>

        {stage === "done" && (
          <button type="button" ref={resetRef} className="console-reset" onClick={resetAll}>
            Reset the demo
          </button>
        )}
      </div>
    </div>
  );
}

export function FlightComputer({ variant }: { variant: "without" | "with" }) {
  return variant === "without" ? <WithoutScreen /> : <WithScreen />;
}
