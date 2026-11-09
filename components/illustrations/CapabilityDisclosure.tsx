"use client";

import { useId, useRef, useState } from "react";

import { Log, usePrinter, useStepFocus, type Line } from "./printout";

/**
 * The same Autosteer control on two roads, on two panels.
 *
 * On the left the limit lives in the manual: the reader picks either road and
 * the system engages on both, with a line of small print underneath. On the
 * right the limit lives in the machine: on the road with cross traffic the
 * control is present and unavailable, and the panel names the condition it is
 * missing rather than greying out in silence.
 *
 * US-27A is the road in the Williston report. I-75 is not named there — it is
 * a limited-access highway written in for the contrast, and the pattern's
 * `review:` list says so. No speed, time or sensor reading is invented: the
 * demo turns on road class, which is the one thing the report says the
 * firmware could tell and did not act on.
 */

type RoadId = "us27a" | "i75";

const ROADS: { id: RoadId; name: string; note: string; supported: boolean }[] = [
  { id: "us27a", name: "US-27A", note: "divided highway, cross traffic", supported: false },
  { id: "i75", name: "I-75", note: "limited-access highway", supported: true },
];

const road = (id: RoadId) => ROADS.find((r) => r.id === id)!;

/**
 * The display does not wrap — `.fc-line` is `white-space: pre` — so every
 * sentence is split by hand to around 30 characters, with continuations
 * indented two spaces. The `role="status"` text puts each one back together.
 */
const UNAVAILABLE: string[] = [
  "Autosteer unavailable:",
  "  this road has cross traffic.",
  "Available on limited-access",
  "  highways.",
];

const LEAVING: string[] = [
  "Leaving supported roads.",
  "Autosteer ending in",
  "  10 seconds, take the wheel.",
];

const HANDED_BACK: string[] = ["AUTOSTEER OFF ·", "  you have the wheel."];

/**
 * The refusal is the With panel's resting state, not an event: US-27A is
 * selected when the page loads, so the reason the control is unavailable has
 * to be on the display before the reader touches anything. Set as the
 * printer's initial lines rather than printed from an effect, which also
 * means Reset returns to it.
 */
const INITIAL_WITH: Line[] = UNAVAILABLE.map((text, i) => ({
  key: `p-init-${i}`,
  text,
  tone: i < 2 ? "fault" : "dim",
}));

/** Ten seconds, the notice the With panel gives before it hands back. */
const HANDBACK_MS = 10_000;

/** The road picker, offered identically on both panels. */
function RoadPicker({
  value,
  onChange,
  name,
  labelId,
  disabled,
}: {
  value: RoadId;
  onChange: (id: RoadId) => void;
  name: string;
  labelId: string;
  disabled?: boolean;
}) {
  return (
    <fieldset className="fc-choices">
      <legend className="fc-entry-label" id={labelId}>
        Road
      </legend>
      {ROADS.map((r) => (
        <label key={r.id} className="fc-choice">
          <input
            type="radio"
            name={name}
            value={r.id}
            checked={value === r.id}
            disabled={disabled}
            onChange={() => onChange(r.id)}
          />
          <span className="fc-choice-name">{r.name}</span>
          <span className="fc-choice-dist">{r.note}</span>
        </label>
      ))}
    </fieldset>
  );
}

/**
 * The anti-pattern: the road class makes no difference. Engaging works on
 * both roads, and what the manual says arrives as a line of small print after
 * the fact, which is the one place it cannot stop anything.
 */
function WithoutScreen() {
  const name = useId();
  const labelId = useId();
  const { lines, print, reset } = usePrinter([]);
  const sendFocus = useStepFocus();
  const engageRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const [picked, setPicked] = useState<RoadId>("us27a");
  const [engaged, setEngaged] = useState(false);
  const [status, setStatus] = useState("");

  const engage = () => {
    setEngaged(true);
    print(
      [
        { key: "w-on", text: "AUTOSTEER ON" },
        { key: "w-fine-0", text: "See owner's manual for", tone: "dim" },
        { key: "w-fine-1", text: "  limitations.", tone: "dim" },
      ],
      () => {
        setStatus(
          `Autosteer on, on ${road(picked).name}, a ${road(picked).note}. ` +
            "See owner's manual for limitations.",
        );
        sendFocus(resetRef);
      },
    );
  };

  const resetAll = () => {
    reset();
    setEngaged(false);
    setPicked("us27a");
    setStatus("");
    sendFocus(engageRef);
  };

  return (
    <div className="console">
      <p className="console-title">Driver assistance</p>
      <div className="console-screen console-crt">
        <RoadPicker
          value={picked}
          onChange={setPicked}
          name={name}
          labelId={labelId}
          disabled={engaged}
        />

        <Log lines={lines} minLines={8} />

        {!engaged && (
          <button type="button" className="fc-go" ref={engageRef} onClick={engage}>
            Engage Autosteer
          </button>
        )}

        <p className="console-hint">
          {engaged
            ? "It engaged on a road with cross traffic. The manual said not to."
            : "Pick either road. The control does not care which."}
        </p>

        <p className="sr-only" role="status" aria-live="polite">
          {status}
        </p>

        {engaged && (
          <button type="button" className="console-reset" ref={resetRef} onClick={resetAll}>
            Reset the demo
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * The pattern: the machine holds its own line. On the unsupported road the
 * control is present and unavailable — being unable to press it is the whole
 * difference from the other panel — and the refusal names the condition. It
 * keeps checking once engaged, so leaving the envelope mid-drive is announced
 * with time to take the wheel rather than discovered.
 */
function WithScreen() {
  const name = useId();
  const labelId = useId();
  const { lines, print, reset } = usePrinter(INITIAL_WITH);
  const sendFocus = useStepFocus();
  const engageRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const handback = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Numbers each selection, so toggling roads twice cannot collide keys. */
  const picks = useRef(0);
  const [picked, setPicked] = useState<RoadId>("us27a");
  const [engaged, setEngaged] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [status, setStatus] = useState("");

  const choose = (id: RoadId) => {
    setPicked(id);
    picks.current += 1;
    const n = picks.current;
    if (!engaged) {
      if (road(id).supported) {
        print([{ key: `p-ok-${n}`, text: "I-75 · limited-access highway", tone: "dim" }], () => {
          setStatus("I-75, a limited-access highway. Autosteer available.");
        });
      } else {
        print(
          UNAVAILABLE.map((text, i) => ({
            key: `p-no-${n}-${i}`,
            text,
            tone: i < 2 ? "fault" : "dim",
          })),
          () => setStatus(UNAVAILABLE.join(" ")),
        );
      }
      return;
    }

    // Engaged, and the reader has steered it off the roads it supports. The
    // check runs while it is running, which is the half a start-up gate misses.
    if (!road(id).supported && !leaving) {
      setLeaving(true);
      print(
        LEAVING.map((text, i) => ({
          key: `p-leave-${n}-${i}`,
          text,
          warn: i === 0,
          tone: "fault",
        })),
        () => setStatus(LEAVING.join(" ")),
      );
      handback.current = setTimeout(
        () => {
          print(
            HANDED_BACK.map((text, i) => ({ key: `p-off-${n}-${i}`, text, tone: "rule" })),
            () => {
              setEngaged(false);
              setLeaving(false);
              setStatus(HANDED_BACK.join(" "));
              sendFocus(resetRef);
            },
          );
        },
        // The ten seconds are the content, not decoration, so the wait is the
        // same length for everyone. Only the line-by-line printing is dropped
        // under prefers-reduced-motion, by the printer itself.
        HANDBACK_MS,
      );
    }
  };

  const engage = () => {
    setEngaged(true);
    print(
      [
        { key: "p-on-0", text: "AUTOSTEER ON ·" },
        { key: "p-on-1", text: "  limited-access highway" },
      ],
      () => setStatus("Autosteer on, limited-access highway."),
    );
  };

  const resetAll = () => {
    if (handback.current) clearTimeout(handback.current);
    reset();
    setEngaged(false);
    setLeaving(false);
    setPicked("us27a");
    setStatus("");
    picks.current = 0;
  };

  const supported = road(picked).supported;

  return (
    <div className="console">
      <p className="console-title">Driver assistance</p>
      <div className="console-screen console-crt">
        <RoadPicker value={picked} onChange={choose} name={name} labelId={labelId} />

        <Log lines={lines} minLines={8} />

        {!engaged && (
          <button
            type="button"
            className="fc-go"
            ref={engageRef}
            disabled={!supported}
            onClick={engage}
          >
            Engage Autosteer
          </button>
        )}

        <p className="console-hint">
          {!engaged && !supported && "The control is there. It will not engage here, and it says why."}
          {!engaged && supported && "A road the system was built for. Now it will engage."}
          {engaged && !leaving && "Engaged. Try switching back to US-27A."}
          {engaged && leaving && "It checked again while running, and gave you notice."}
        </p>

        <p className="sr-only" role="status" aria-live="polite">
          {status}
        </p>

        <button type="button" className="console-reset" ref={resetRef} onClick={resetAll}>
          Reset the demo
        </button>
      </div>
    </div>
  );
}

export function CapabilityDisclosure({ variant }: { variant: "without" | "with" }) {
  return variant === "without" ? <WithoutScreen /> : <WithScreen />;
}
