"use client";

import { useId, useRef, useState } from "react";

import { Log, usePrinter, useStepFocus } from "./printout";

/**
 * A warehouse robot's speed setting, changed by three different parties, on
 * two panels. The reader makes each change themselves: once by hand, once as
 * the remote fleet team, once by letting the robot adjust itself. Then the
 * panel asks who set the speed to 12 km/h.
 *
 * On the left there is a current value and "last changed" — both true, and
 * neither an answer. On the right the same three changes are an append-only
 * log: time, actor, old and new value, software version. The Edit control on
 * each entry is real and refuses, because an editable log is a draft.
 *
 * Nothing here is a reading from the pattern's sources, which describe a
 * Tesla, a Tempe crash and a UK accounting system rather than a warehouse:
 * the robot, the speeds, the clock and the version string are written for
 * this page. What is taken from them is the shape of the record — an actor, a
 * timestamp and a software version per entry, which is what UN R157 requires
 * of an ALKS data storage system, held where the party to a dispute cannot
 * revise it.
 */

type ActorId = "operator" | "fleet" | "robot";

/**
 * Each party's own setting, so the question has one answer whatever order the
 * reader presses them in. 12 km/h is the fleet team's, and only theirs.
 */
const ACTORS: { id: ActorId; button: string; logged: string; spoken: string; speed: number }[] = [
  {
    id: "operator",
    button: "You change it",
    logged: "Operator",
    spoken: "the operator",
    speed: 10,
  },
  {
    id: "fleet",
    button: "Remote fleet team changes it",
    logged: "Remote: fleet team",
    spoken: "the remote fleet team",
    speed: 12,
  },
  {
    id: "robot",
    button: "Robot auto-adjusts",
    logged: "Robot: auto-adjust",
    spoken: "the robot, auto-adjusting",
    speed: 9,
  },
];

const actor = (id: ActorId) => ACTORS.find((a) => a.id === id)!;

/** The party the question is about, and the value that identifies them. */
const ANSWER = actor("fleet");
const ASKED_SPEED = ANSWER.speed;

const START_SPEED = 8;

/** A fixed clock, so the log is the same on every reading of the page. */
const TIMES = ["09:14", "09:17", "09:21"];

/** One build string for all three entries: nothing was redeployed mid-shift. */
const SOFTWARE = "sw 4.21.3";

const QUESTION = `Who set the speed to ${ASKED_SPEED} km/h?`;

/**
 * The display does not wrap — `.fc-line` is `white-space: pre` — so every
 * sentence is split by hand to around 30 characters, with continuations
 * indented two spaces. The `role="status"` text keeps each one whole.
 */
const NO_RECORD: string[] = [
  "No record of who.",
  "It's your word against",
  "  the system.",
];

const NO_EDIT: string[] = ["Entries can't be changed.", "Add a correction instead."];

/** One change, as the right-hand panel keeps it. */
type Entry = { id: ActorId; time: string; from: number; to: number };

/** The three buttons that change the setting, offered identically on both panels. */
function Changers({
  done,
  onChange,
  firstRef,
  labelledBy,
}: {
  done: ActorId[];
  onChange: (id: ActorId) => void;
  firstRef: React.RefObject<HTMLButtonElement | null>;
  labelledBy: string;
}) {
  return (
    <div className="pl-changers" role="group" aria-labelledby={labelledBy}>
      {ACTORS.map((a, i) => (
        <button
          key={a.id}
          type="button"
          className="fc-go"
          ref={i === 0 ? firstRef : undefined}
          disabled={done.includes(a.id)}
          onClick={() => onChange(a.id)}
        >
          {a.button}
        </button>
      ))}
    </div>
  );
}

/** The question, with one button per party. */
function Answers({
  onAnswer,
  firstRef,
  labelledBy,
}: {
  onAnswer: (id: ActorId) => void;
  firstRef: React.RefObject<HTMLButtonElement | null>;
  labelledBy: string;
}) {
  return (
    <div className="fc-guesses" role="group" aria-labelledby={labelledBy}>
      {ACTORS.map((a, i) => (
        <button
          key={a.id}
          type="button"
          className="fc-guess"
          ref={i === 0 ? firstRef : undefined}
          onClick={() => onAnswer(a.id)}
        >
          {a.logged}
        </button>
      ))}
    </div>
  );
}

/**
 * The anti-pattern: the state is right and its history is gone. Every change
 * lands on the same two fields, so after three of them the panel can say what
 * the speed is and when it last moved, and nothing at all about who.
 */
function WithoutScreen() {
  const groupId = useId();
  const askId = useId();
  const { lines, print, reset } = usePrinter([]);
  const sendFocus = useStepFocus();
  const firstChangeRef = useRef<HTMLButtonElement>(null);
  const firstAnswerRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const [speed, setSpeed] = useState(START_SPEED);
  const [done, setDone] = useState<ActorId[]>([]);
  const [stage, setStage] = useState<"changing" | "asking" | "done">("changing");
  const [status, setStatus] = useState("");

  const change = (id: ActorId) => {
    const next = [...done, id];
    setDone(next);
    setSpeed(actor(id).speed);
    setStatus(`Max speed ${actor(id).speed} km/h. Last changed 2 min ago.`);
    if (next.length === ACTORS.length) {
      setStage("asking");
      sendFocus(firstAnswerRef);
    }
  };

  const answer = (id: ActorId) => {
    print(
      [
        { key: "w-pick", text: `> ${actor(id).logged}`, tone: "dim" },
        ...NO_RECORD.map((text, i) => ({
          key: `w-none-${i}`,
          text,
          tone: "fault" as const,
          warn: i === 0,
        })),
      ],
      () => {
        setStage("done");
        setStatus(`You answered ${actor(id).spoken}. ${NO_RECORD.join(" ")}`);
        sendFocus(resetRef);
      },
    );
  };

  const resetAll = () => {
    reset();
    setSpeed(START_SPEED);
    setDone([]);
    setStage("changing");
    setStatus("");
    sendFocus(firstChangeRef);
  };

  return (
    <div className="console">
      <p className="console-title">Robot settings</p>
      <div className="console-screen console-crt">
        <dl className="console-readout pl-readout">
          <div className="console-cell">
            <dt>Max speed</dt>
            <dd>{speed} km/h</dd>
          </div>
          <div className="console-cell">
            <dt>Last changed</dt>
            <dd>{done.length > 0 ? "2 min ago" : "—"}</dd>
          </div>
        </dl>

        <Log lines={lines} minLines={5} />

        {stage === "changing" && (
          <>
            <p className="fc-entry-label" id={groupId}>
              Change the setting
            </p>
            <Changers
              done={done}
              onChange={change}
              firstRef={firstChangeRef}
              labelledBy={groupId}
            />
          </>
        )}

        {stage === "asking" && (
          <>
            <p className="fc-ask" id={askId}>
              {QUESTION}
            </p>
            <Answers onAnswer={answer} firstRef={firstAnswerRef} labelledBy={askId} />
          </>
        )}

        <p className="console-hint">
          {stage === "changing" && "Three parties can change this. Use all three."}
          {stage === "asking" && "The panel knows what, and when. Not who."}
          {stage === "done" && "Both fields were true. Neither was an answer."}
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
 * The pattern: the same three changes, each one an entry that names its
 * author. The log is append-only, and the Edit control on every row is wired
 * up and refuses — a correction is another entry, which is the property that
 * makes the earlier ones worth anything.
 */
function WithScreen() {
  const groupId = useId();
  const askId = useId();
  const logId = useId();
  const { lines, print, reset } = usePrinter([]);
  const sendFocus = useStepFocus();
  const firstChangeRef = useRef<HTMLButtonElement>(null);
  const firstAnswerRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const [speed, setSpeed] = useState(START_SPEED);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [stage, setStage] = useState<"changing" | "asking" | "done">("changing");
  const [status, setStatus] = useState("");

  const done = entries.map((e) => e.id);

  const change = (id: ActorId) => {
    const a = actor(id);
    const entry: Entry = { id, time: TIMES[entries.length], from: speed, to: a.speed };
    const next = [...entries, entry];
    setEntries(next);
    setSpeed(a.speed);
    setStatus(
      `${entry.time}. ${a.logged} changed max speed from ${entry.from} to ${entry.to} ` +
        `kilometres per hour. Software ${SOFTWARE}.`,
    );
    if (next.length === ACTORS.length) {
      setStage("asking");
      sendFocus(firstAnswerRef);
    }
  };

  const edit = () => {
    print(
      NO_EDIT.map((text, i) => ({
        key: `p-noedit-${i}-${Date.now()}`,
        text,
        tone: "rule" as const,
      })),
      () => setStatus(NO_EDIT.join(" ")),
    );
  };

  const answer = (id: ActorId) => {
    const right = id === ANSWER.id;
    const entry = entries.find((e) => e.id === ANSWER.id)!;
    print(
      [
        { key: "p-pick", text: `> ${actor(id).logged}`, tone: "dim" },
        { key: "p-ans-0", text: `${entry.time} ${ANSWER.logged}` },
        { key: "p-ans-1", text: `  set ${ASKED_SPEED} km/h · ${SOFTWARE}` },
        {
          key: "p-ans-2",
          text: right ? "You read it off the log." : "The log says otherwise.",
          tone: "rule",
        },
      ],
      () => {
        setStage("done");
        setStatus(
          `You answered ${actor(id).spoken}. ${entry.time}, ${ANSWER.logged} set ` +
            `${ASKED_SPEED} kilometres per hour, software ${SOFTWARE}. ` +
            (right ? "You read it off the log." : "The log says otherwise."),
        );
        sendFocus(resetRef);
      },
    );
  };

  const resetAll = () => {
    reset();
    setSpeed(START_SPEED);
    setEntries([]);
    setStage("changing");
    setStatus("");
    sendFocus(firstChangeRef);
  };

  return (
    <div className="console">
      <p className="console-title">Robot settings</p>
      <div className="console-screen console-crt">
        <dl className="console-readout pl-readout">
          <div className="console-cell">
            <dt>Max speed</dt>
            <dd>{speed} km/h</dd>
          </div>
          <div className="console-cell">
            <dt>Changes</dt>
            <dd>{entries.length} logged</dd>
          </div>
        </dl>

        <p className="fc-entry-label" id={logId}>
          Change log · append-only
        </p>
        <ol className="pl-log" aria-labelledby={logId}>
          {entries.length === 0 && <li className="fc-line is-dim">(no entries yet)</li>}
          {entries.map((e) => (
            <li key={e.time} className="pl-entry">
              <span className="pl-entry-lines">
                <span className="fc-line">{`${e.time} ${actor(e.id).logged}`}</span>
                <span className="fc-line">{`  ${e.from} → ${e.to} km/h · ${SOFTWARE}`}</span>
              </span>
              <button type="button" className="fc-go pl-edit" onClick={edit}>
                Edit
                <span className="sr-only">{` entry from ${e.time}`}</span>
              </button>
            </li>
          ))}
        </ol>

        <Log lines={lines} minLines={4} />

        {stage === "changing" && (
          <>
            <p className="fc-entry-label" id={groupId}>
              Change the setting
            </p>
            <Changers
              done={done}
              onChange={change}
              firstRef={firstChangeRef}
              labelledBy={groupId}
            />
          </>
        )}

        {stage === "asking" && (
          <>
            <p className="fc-ask" id={askId}>
              {QUESTION}
            </p>
            <Answers onAnswer={answer} firstRef={firstAnswerRef} labelledBy={askId} />
          </>
        )}

        <p className="console-hint">
          {stage === "changing" && "Every change writes a line. Try Edit on one."}
          {stage === "asking" && "The answer is already on screen."}
          {stage === "done" && "Nobody had to be believed. The record was checkable."}
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

export function ProvenanceLog({ variant }: { variant: "without" | "with" }) {
  return variant === "without" ? <WithoutScreen /> : <WithScreen />;
}
