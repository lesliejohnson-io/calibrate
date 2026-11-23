"use client";

import { useId, useRef, useState } from "react";

import { Log, usePrinter, useStepFocus } from "./printout";

/**
 * One window, two modes, and a number the reader set themselves. The forklift
 * takes a speed for easing the forks into a pallet, seats the load, and then
 * switches itself to transit — at which point the figure still standing in the
 * window means something about twenty-eight times larger.
 *
 * This is deliberately not the autothrottle demo Shared Mental Model already
 * uses. There, the failure is missing a mode change. Here the mode change is
 * benign on its own and the harm is in the value that carried over: a number
 * that reads as correct in the mode it was not entered for.
 *
 * Nothing here is a reading from the pattern's source, which describes an
 * A320's flight control unit rather than a forklift: the two modes, the units
 * and the speed are written for this page, and the speed is whatever the
 * reader types. Two things are taken from the report. The shape of the failure
 * — one window serving two modes, in formats that do not tell each other apart
 * — and the proportion: on the Without side the digits are set three times the
 * height of the mode label beside them, which is what 22.335 describes.
 *
 * Lines are hand-split to stay inside the column: `.fc-line` is
 * `white-space: pre`, so a long line runs off the panel instead of wrapping.
 */

/** What the reader is told to set, and what the field offers if they just press Enter. */
const SUGGESTED = 6;

/** The window will not take a speed outside this; the field is a machine's field. */
const MIN_SPEED = 1;
const MAX_SPEED = 20;

type Mode = "precision" | "transit";

const UNIT: Record<Mode, string> = {
  precision: "cm/s",
  transit: "km/h",
};

const MODE_NAME: Record<Mode, string> = {
  precision: "PRECISION",
  transit: "TRANSIT",
};

/** Spoken form, so a screen reader hears a unit rather than a pair of letters. */
const UNIT_SPOKEN: Record<Mode, string> = {
  precision: "centimetres per second",
  transit: "kilometres per hour",
};

function parseSpeed(raw: string): number | null {
  const n = Number(raw.trim());
  if (!Number.isFinite(n)) return null;
  const whole = Math.round(n);
  if (whole < MIN_SPEED || whole > MAX_SPEED) return null;
  return whole;
}

/** The speed field. Enter submits; the button is the same action for a mouse. */
function SpeedEntry({
  onSubmit,
  disabled,
  id,
  label,
  inputRef,
}: {
  onSubmit: (speed: number) => void;
  disabled: boolean;
  id: string;
  label: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
  const [value, setValue] = useState("");
  /**
   * A rejected entry says so on the display. Silently dropping it leaves a
   * reader who typed something the field would not take with a control that
   * appears to be broken, which is a different demo than the one intended.
   */
  const [bad, setBad] = useState(false);
  const noteId = `${id}-note`;

  return (
    <form
      className="fc-entry"
      onSubmit={(e) => {
        e.preventDefault();
        if (disabled) return;
        const speed = parseSpeed(value === "" ? String(SUGGESTED) : value);
        if (speed === null) {
          setBad(true);
          return;
        }
        setBad(false);
        onSubmit(speed);
        setValue("");
      }}
    >
      <label className="fc-entry-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        ref={inputRef}
        className="fc-input ma-input"
        type="text"
        inputMode="numeric"
        autoComplete="off"
        spellCheck={false}
        placeholder={String(SUGGESTED)}
        value={value}
        disabled={disabled}
        aria-describedby={bad ? noteId : undefined}
        aria-invalid={bad || undefined}
        onChange={(e) => {
          setValue(e.target.value);
          if (bad) setBad(false);
        }}
      />
      <button type="submit" className="fc-go" disabled={disabled}>
        Set
      </button>
      {bad && (
        <p className="fc-line is-fault ma-reject" id={noteId} role="alert">
          <span className="fc-warn" aria-hidden="true">
            ⚠
          </span>
          {`whole number, ${MIN_SPEED}–${MAX_SPEED}`}
        </p>
      )}
    </form>
  );
}

/**
 * The window itself. `pairing` is the whole difference between the two
 * screens: unpaired, the digits stand three times the height of the mode and
 * the unit is nowhere, which is the panel the report describes; paired, the
 * mode and the unit are set at the value's own weight and the figure cannot be
 * read without them.
 *
 * The accessible name states the mode on both sides, because on the real panel
 * the mode was on the display. What the Without side never does is announce
 * that it changed.
 */
function Window({
  mode,
  speed,
  pairing,
  setIn,
}: {
  mode: Mode;
  speed: number | null;
  pairing: boolean;
  /** The mode the value was entered in, shown once the two have come apart. */
  setIn?: Mode | null;
}) {
  const shown = speed === null ? "--" : String(speed).padStart(2, "0");
  const stale = setIn != null && setIn !== mode;

  const spoken =
    speed === null
      ? `${MODE_NAME[mode]} mode. No speed set.`
      : pairing
        ? `${MODE_NAME[mode]} mode. ${speed} ${UNIT_SPOKEN[mode]}.${
            stale ? ` Set in ${MODE_NAME[setIn]} mode as ${speed} ${UNIT_SPOKEN[setIn]}.` : ""
          }`
        : `${MODE_NAME[mode]} mode. ${shown}.`;

  return (
    <div className={`ma-window${pairing ? " is-paired" : ""}`}>
      <p className="sr-only">{spoken}</p>
      <p className="ma-face" aria-hidden="true">
        <span className="ma-mode">{MODE_NAME[mode]}</span>
        <span className="ma-value">{shown}</span>
        {pairing && <span className="ma-unit">{UNIT[mode]}</span>}
      </p>
      {pairing && stale && speed !== null && (
        <p className="ma-setin" aria-hidden="true">
          {`set in ${MODE_NAME[setIn].toLowerCase()}: ${speed} ${UNIT[setIn]}`}
        </p>
      )}
    </div>
  );
}

/**
 * The anti-pattern. The mode is on the display the whole time — it prints when
 * it changes and the window names it — but it is a small word beside a figure
 * three times its height, and the figure did not change. The reader's second
 * Go is the demonstration: they press it expecting the creep they set.
 */
function WithoutScreen() {
  const fieldId = useId();
  const { lines, print, reset } = usePrinter([]);
  const sendFocus = useStepFocus();
  const inputRef = useRef<HTMLInputElement>(null);
  const goRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const [mode, setMode] = useState<Mode>("precision");
  const [speed, setSpeed] = useState<number | null>(null);
  const [stage, setStage] = useState<"set" | "ready" | "seated" | "done">("set");
  const [status, setStatus] = useState("");
  /**
   * True while a batch of lines is still printing. `usePrinter.print`
   * schedules one timer per line, so a second batch started mid-print
   * interleaves its lines with the first. Each handler drops a press that
   * arrives while this is set — in the handler rather than on `disabled`,
   * because disabling a control takes it out of the tab order and a keyboard
   * user tabbing on would land outside the demo.
   */
  const [busy, setBusy] = useState(false);

  const take = (value: number) => {
    setSpeed(value);
    setStage("ready");
    setBusy(true);
    print(
      [
        { key: "w-set1", text: `APPROACH SPEED ${value}`, tone: "dim" },
        { key: "w-set2", text: "—".repeat(22), tone: "rule" },
      ],
      () => {
        setBusy(false);
        setStatus(`Approach speed set to ${value}. Precision mode.`);
        sendFocus(goRef);
      },
    );
  };

  const go = () => {
    if (busy || speed === null) return;
    setBusy(true);

    if (stage === "ready") {
      print(
        [
          { key: "w-run1", text: `EASING IN · ${speed}` },
          { key: "w-run2", text: "PALLET SEATED" },
          // The mode is on the display. It is also four characters of dim
          // text under a figure that did not move.
          { key: "w-run3", text: "TRANSIT", tone: "dim" },
        ],
        () => {
          setMode("transit");
          setStage("seated");
          setBusy(false);
          setStatus("The forks eased in and the pallet is seated.");
          sendFocus(goRef);
        },
      );
      return;
    }

    print(
      [
        { key: "w-go1", text: `MOVING · ${speed}` },
        { key: "w-go2", text: `${speed} km/h`, tone: "fault", warn: true },
        { key: "w-go3", text: `you set ${speed} cm/s`, tone: "fault" },
      ],
      () => {
        setStage("done");
        setBusy(false);
        setStatus(
          `The forklift moved off at ${speed} kilometres per hour. You set ${speed} centimetres per second. The window read the same both times.`,
        );
        sendFocus(resetRef);
      },
    );
  };

  const resetAll = () => {
    reset();
    setMode("precision");
    setSpeed(null);
    setStage("set");
    setBusy(false);
    setStatus("");
    sendFocus(inputRef);
  };

  return (
    <div className="console">
      <p className="console-title">Forklift · Speed window</p>
      <div className="console-screen console-crt">
        <Window mode={mode} speed={speed} pairing={false} />
        <Log lines={lines} minLines={3} />

        {stage === "set" && (
          <SpeedEntry
            id={fieldId}
            label="Approach speed"
            onSubmit={take}
            disabled={busy}
            inputRef={inputRef}
          />
        )}

        {(stage === "ready" || stage === "seated") && (
          <div className="fc-actions">
            <button type="button" className="fc-go" ref={goRef} onClick={go}>
              Go
            </button>
          </div>
        )}

        <p className="console-hint">
          {stage === "set" &&
            `Ease the forks into the pallet. ${SUGGESTED} is a gentle nudge — set it and press Go.`}
          {stage === "ready" && "Go."}
          {stage === "seated" && "Loaded. Now take it to the drop point — press Go."}
          {stage === "done" &&
            "The mode was on the display the whole time. The number was three times its height, and it had not changed."}
        </p>

        <p className="sr-only" role="status">
          {status}
        </p>

        {stage !== "set" && (
          <button type="button" className="console-reset" ref={resetRef} onClick={resetAll}>
            Reset the demo
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * The pattern. Every figure in the window carries the mode and the unit it
 * belongs to, so the same two digits are a different reading in each mode. The
 * machine's switch names what moved and says plainly that the speed is the
 * operator's again — the escalation the mechanism asks for when a job comes
 * back — and the setting the value was entered under stays on screen beside
 * the live one, which is the check on the result.
 *
 * Keeping the carried-over speed still runs at the transit figure. A display
 * tells; it does not veto, and a demo that refused would be arguing for
 * Appropriate Friction instead.
 */
function WithScreen() {
  const fieldId = useId();
  const reEnterId = useId();
  const { lines, print, reset } = usePrinter([]);
  const sendFocus = useStepFocus();
  const inputRef = useRef<HTMLInputElement>(null);
  const reEnterRef = useRef<HTMLInputElement>(null);
  const goRef = useRef<HTMLButtonElement>(null);
  const keepRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const [mode, setMode] = useState<Mode>("precision");
  const [speed, setSpeed] = useState<number | null>(null);
  const [setIn, setSetIn] = useState<Mode | null>(null);
  const [stage, setStage] = useState<"set" | "ready" | "handback" | "moving">("set");
  const [status, setStatus] = useState("");
  /** See the note on the other screen: one batch of lines at a time. */
  const [busy, setBusy] = useState(false);

  const take = (value: number) => {
    setSpeed(value);
    setSetIn("precision");
    setStage("ready");
    setBusy(true);
    print(
      [
        { key: "p-set1", text: `PRECISION · ${value} cm/s`, tone: "dim" },
        { key: "p-set2", text: "—".repeat(22), tone: "rule" },
      ],
      () => {
        setBusy(false);
        setStatus(`Approach speed set to ${value} centimetres per second, in precision mode.`);
        sendFocus(goRef);
      },
    );
  };

  const go = () => {
    if (busy || speed === null) return;
    setBusy(true);
    print(
      [
        { key: "p-run1", text: `EASING IN · ${speed} cm/s` },
        { key: "p-run2", text: "PALLET SEATED" },
      ],
      () => {
        // The mode change is the machine's, and it hands the speed back.
        setMode("transit");
        setStage("handback");
        print(
          [
            { key: "p-hb1", text: "MODE CHANGED", tone: "fault", warn: true },
            { key: "p-hb2", text: "PRECISION → TRANSIT", tone: "fault" },
            { key: "p-hb3", text: "speed is yours again:", tone: "fault" },
            { key: "p-hb4", text: `${speed} now means ${speed} km/h`, tone: "fault" },
          ],
          () => {
            setBusy(false);
            setStatus(
              `Mode changed from precision to transit. The speed is yours again: ${speed} now means ${speed} kilometres per hour, not ${speed} centimetres per second. Keep it, or set a transit speed.`,
            );
            sendFocus(keepRef);
          },
        );
      },
    );
  };

  const keep = () => {
    if (busy || speed === null) return;
    setStage("moving");
    setBusy(true);
    print(
      [
        { key: "p-keep1", text: `MOVING · ${speed} km/h` },
        { key: "p-keep2", text: "as you chose.", tone: "dim" },
      ],
      () => {
        setBusy(false);
        setStatus(
          `Moving at ${speed} kilometres per hour, as you chose. The display told you; it did not stop you.`,
        );
        sendFocus(resetRef);
      },
    );
  };

  const reEnter = (value: number) => {
    setSpeed(value);
    setSetIn("transit");
    setStage("moving");
    setBusy(true);
    print(
      [
        { key: "p-re1", text: `MOVING · ${value} km/h` },
        { key: "p-re2", text: "set for transit.", tone: "dim" },
      ],
      () => {
        setBusy(false);
        setStatus(`Moving at ${value} kilometres per hour, set for transit.`);
        sendFocus(resetRef);
      },
    );
  };

  const resetAll = () => {
    reset();
    setMode("precision");
    setSpeed(null);
    setSetIn(null);
    setStage("set");
    setBusy(false);
    setStatus("");
    sendFocus(inputRef);
  };

  return (
    <div className="console">
      <p className="console-title">Forklift · Speed window</p>
      <div className="console-screen console-crt">
        <Window mode={mode} speed={speed} pairing setIn={setIn} />
        <Log lines={lines} minLines={3} />

        {stage === "set" && (
          <SpeedEntry
            id={fieldId}
            label="Approach speed · cm/s"
            onSubmit={take}
            disabled={busy}
            inputRef={inputRef}
          />
        )}

        {stage === "ready" && (
          <div className="fc-actions">
            <button type="button" className="fc-go" ref={goRef} onClick={go}>
              Go
            </button>
          </div>
        )}

        {stage === "handback" && speed !== null && (
          <div className="ma-choices">
            {/* Keeping is a real choice and it really runs at the transit
                figure: the pattern is that the display tells, not that it
                refuses. */}
            <button type="button" className="fc-guess" ref={keepRef} onClick={keep}>
              {`Keep ${speed} km/h`}
            </button>
            <SpeedEntry
              id={reEnterId}
              label="or set for transit · km/h"
              onSubmit={reEnter}
              disabled={busy}
              inputRef={reEnterRef}
            />
          </div>
        )}

        <p className="console-hint">
          {stage === "set" &&
            `Ease the forks into the pallet. ${SUGGESTED} is a gentle nudge — set it and press Go.`}
          {stage === "ready" && "Go."}
          {stage === "handback" &&
            "The forklift took a job off you and handed one back. Your number survived the change; its meaning did not."}
          {stage === "moving" &&
            "Both numbers are still on the window — what is running, and what you set it under."}
        </p>

        <p className="sr-only" role="status">
          {status}
        </p>

        {stage !== "set" && (
          <button type="button" className="console-reset" ref={resetRef} onClick={resetAll}>
            Reset the demo
          </button>
        )}
      </div>
    </div>
  );
}

export function ModeAwareness({ variant }: { variant: "without" | "with" }) {
  return variant === "without" ? <WithoutScreen /> : <WithScreen />;
}
