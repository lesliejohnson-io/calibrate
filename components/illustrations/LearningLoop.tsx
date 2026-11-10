"use client";

import { useRef, useState } from "react";

import { Log, usePrinter, useStepFocus, type Line } from "./printout";

/**
 * The same request, filed twice. On both screens the reader is a master who
 * finds the bow doors open after departure and asks for an indicator light on
 * the bridge; what differs is whether the request reaches anyone who could
 * fit one, and whether the reader ever hears back.
 *
 * Nothing here is taken from the Sheen Report, which describes a ferry rather
 * than this console: the sailing counter, the status track, the three
 * sailings and the "3 other masters" figure are written for this page. What
 * is taken from it is the shape of the failure — a report filed in writing,
 * with the fix named in it, that stopped at management.
 *
 * Lines are hand-split to stay inside the column: `.fc-line` is
 * `white-space: pre`, so a long line runs off the panel instead of wrapping.
 */

/** How many sailings the anti-pattern runs before it states its own count. */
const SAILINGS_TO_REVEAL = 3;

/** The three stages a report passes through on the patterned screen. */
const TRACK = [
  "Received",
  "Routed to the fleet's technical team",
  "Change made",
] as const;

/**
 * The status track: a done or pending shape plus the words, so the stage a
 * report has reached never rests on colour or on position alone.
 */
function Track({ reached }: { reached: number }) {
  return (
    <ul className="ll-track">
      {TRACK.map((stage, i) => {
        const done = i < reached;
        return (
          <li key={stage} className={`ll-stage${done ? " is-done" : ""}`}>
            <span className="ll-mark" aria-hidden="true">
              {done ? "●" : "○"}
            </span>
            <span className="ll-stage-label">
              {stage}
              <span className="sr-only">{done ? " — done" : " — pending"}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/** The bridge status card both screens carry above the display. */
function Bridge({ sailing, doors }: { sailing: number; doors: string }) {
  return (
    <dl className="ll-bridge">
      <div className="ll-cell">
        <dt>Ferry · Bridge</dt>
        <dd>Sailing {sailing}</dd>
      </div>
      <div className="ll-cell">
        <dt>Bow doors</dt>
        <dd>{doors}</dd>
      </div>
    </dl>
  );
}

const EVENT: Omit<Line, "key">[] = [
  { text: "After departure, the deck crew", tone: "fault", warn: true },
  { text: "found the bow doors still open.", tone: "fault" },
  { text: "They closed them at sea.", tone: "fault" },
];

const event = (n: number): Line[] => EVENT.map((l, i) => ({ ...l, key: `ev-${n}-${i}` }));

/**
 * The anti-pattern: the report is filed, and filing is all that happens to
 * it. Each sailing meets the same event and adds another identical record.
 */
function WithoutScreen() {
  const { lines, print, reset } = usePrinter(event(1));
  const sendFocus = useStepFocus();
  const reportRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const [sailing, setSailing] = useState(1);
  /** Ids rather than sailing numbers: the same sailing can be reported twice. */
  const [reports, setReports] = useState<number[]>([]);
  const nextId = useRef(0);
  const [status, setStatus] = useState("");
  /**
   * True while a batch of lines is still printing. `usePrinter.print` schedules
   * one timer per line, so a second batch started mid-print interleaves its
   * lines with the first — pressing "Next sailing" on the keyboard is quite
   * fast enough to do it. Every handler that prints drops a press that arrives
   * while this is set.
   */
  const [busy, setBusy] = useState(false);

  const done = sailing > SAILINGS_TO_REVEAL;

  const report = () => {
    if (busy) return;
    nextId.current += 1;
    setReports((r) => [...r, nextId.current]);
    setStatus(
      `Request filed: fit a door indicator on the bridge. ${reports.length + 1} report${
        reports.length === 0 ? "" : "s"
      } filed. Nothing else changed.`,
    );
  };

  const nextSailing = () => {
    if (busy) return;
    const n = sailing + 1;
    setSailing(n);
    if (n > SAILINGS_TO_REVEAL) {
      setBusy(true);
      print(
        [
          { key: "w-rev0", text: "—".repeat(22), tone: "rule" },
          { key: "w-rev1", text: "Three reports. Still no", tone: "fault", warn: true },
          { key: "w-rev2", text: "indicator. Nobody who could", tone: "fault" },
          { key: "w-rev3", text: "fit one saw them.", tone: "fault" },
        ],
        () => {
          setBusy(false);
          setStatus(
            "Three reports. Still no indicator. Nobody who could fit one saw them.",
          );
          sendFocus(resetRef);
        },
      );
      return;
    }
    setBusy(true);
    print(event(n), () => {
      setBusy(false);
      setStatus(
        `Sailing ${n}. After departure, the deck crew found the bow doors still open. They closed them at sea.`,
      );
    });
  };

  const resetAll = () => {
    reset();
    setSailing(1);
    setReports([]);
    setBusy(false);
    setStatus("");
    sendFocus(reportRef);
  };

  return (
    <div className="console">
      <p className="console-title">Bow doors</p>
      <div className="console-screen console-crt">
        <Bridge sailing={Math.min(sailing, SAILINGS_TO_REVEAL)} doors="no indicator" />
        <Log lines={lines} minLines={7} />

        {reports.length > 0 && (
          <>
            <p className="fc-line is-dim">Reports</p>
            <ul className="ll-reports">
              {reports.map((id) => (
                <li key={id}>
                  {/* Hand-split: the whole request on one line overflows the
                      column, which does not wrap. */}
                  <p className="fc-line is-dim">{"Request: fit a door indicator"}</p>
                  <p className="fc-line is-dim">{"  on the bridge · Filed"}</p>
                </li>
              ))}
            </ul>
          </>
        )}

        {!done && (
          <div className="fc-guesses" role="group" aria-label="The report">
            <button
              type="button"
              className="fc-guess"
              ref={reportRef}
              onClick={report}
            >
              Report it
            </button>
            <button type="button" className="fc-guess" onClick={nextSailing}>
              Next sailing
            </button>
          </div>
        )}

        <p className="console-hint">
          {!done && "Report it, then take the next sailing."}
          {done && "Every report was true, and every one of them stopped at the file."}
        </p>

        <p className="sr-only" role="status">
          {status}
        </p>

        {done && (
          <button type="button" className="console-reset" ref={resetRef} onClick={resetAll}>
            Reset the demo
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * The pattern: the same report, routed, acted on, and shown back to the
 * person who filed it. The last sailing is the one where the reader can see
 * the difference before the ship moves.
 */
function WithScreen() {
  const { lines, print, reset } = usePrinter(event(1));
  const sendFocus = useStepFocus();
  const reportRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const [sailing, setSailing] = useState(1);
  const [reached, setReached] = useState(0);
  const [status, setStatus] = useState("");
  /** See the note on the Without screen: one batch of lines at a time. */
  const [busy, setBusy] = useState(false);

  const filed = reached > 0;
  const fitted = reached >= TRACK.length;
  const done = sailing > TRACK.length;

  const report = () => {
    if (busy) return;
    setReached(1);
    setBusy(true);
    print([{ key: "p-filed", text: "Received · no blame", tone: "rule" }], () => {
      setBusy(false);
      setStatus("Report received. No blame. Status: received.");
      sendFocus(nextRef);
    });
  };

  const nextSailing = () => {
    if (busy) return;
    const n = sailing + 1;
    setSailing(n);
    setBusy(true);

    if (reached === 1) {
      setReached(2);
      print(
        [
          { key: `p-r2-${n}`, text: "Routed · 3 other masters", tone: "rule" },
          { key: `p-r2b-${n}`, text: "reported this", tone: "rule" },
        ],
        () => {
          setBusy(false);
          setStatus("Routed to the fleet's technical team. Three other masters reported this.");
        },
      );
      return;
    }

    if (reached === 2) {
      setReached(3);
      print(
        [
          { key: `p-r3-${n}`, text: "Change made · door", tone: "rule" },
          { key: `p-r3b-${n}`, text: "indicators fitted on the bridge", tone: "rule" },
        ],
        () => {
          setBusy(false);
          setStatus("Change made. Door indicators fitted on the bridge.");
        },
      );
      return;
    }

    print(
      [
        { key: `p-fit-${n}`, text: "Bow doors ● CLOSED", tone: "rule" },
        { key: `p-fit2-${n}`, text: "before departure" },
        { key: `p-fit3-${n}`, text: "Fitted because of your report." },
      ],
      () => {
        setBusy(false);
        setStatus(
          "Sailing 4. Bow doors closed, shown on the bridge before departure. Fitted because of your report.",
        );
        sendFocus(resetRef);
      },
    );
  };

  const resetAll = () => {
    reset();
    setSailing(1);
    setReached(0);
    setBusy(false);
    setStatus("");
    sendFocus(reportRef);
  };

  return (
    <div className="console">
      <p className="console-title">Bow doors</p>
      <div className="console-screen console-crt">
        <Bridge
          sailing={Math.min(sailing, TRACK.length + 1)}
          doors={done ? "● CLOSED" : fitted ? "indicator fitted" : "no indicator"}
        />
        <Log lines={lines} minLines={7} />

        {filed && <Track reached={reached} />}

        {!done && (
          <div className="fc-guesses" role="group" aria-label="The report">
            <button
              type="button"
              className="fc-guess"
              ref={reportRef}
              onClick={report}
              disabled={filed}
            >
              Report it · no blame
            </button>
            <button
              type="button"
              className="fc-guess"
              ref={nextRef}
              onClick={nextSailing}
              disabled={!filed}
            >
              Next sailing
            </button>
          </div>
        )}

        <p className="console-hint">
          {!filed && "One tap, and no blame attached."}
          {filed && !fitted && "Take the next sailing and watch the report move."}
          {fitted && !done && "The change is made. One more sailing."}
          {done && "The loop closes where the reporter can see it."}
        </p>

        <p className="sr-only" role="status">
          {status}
        </p>

        {done && (
          <button type="button" className="console-reset" ref={resetRef} onClick={resetAll}>
            Reset the demo
          </button>
        )}
      </div>
    </div>
  );
}

export function LearningLoop({ variant }: { variant: "without" | "with" }) {
  return variant === "without" ? <WithoutScreen /> : <WithScreen />;
}
