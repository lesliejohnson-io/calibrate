import type { Contrast, InterfaceComponent } from "@/lib/patterns";
import { AlertTriage } from "./illustrations/AlertTriage";
import { CapabilityDisclosure } from "./illustrations/CapabilityDisclosure";
import { Autothrottle } from "./illustrations/Autothrottle";
import { DroneRelease } from "./illustrations/DroneRelease";
import { ExplainableFault } from "./illustrations/ExplainableFault";
import { FlightComputer } from "./illustrations/FlightComputer";
import { GlassBox } from "./illustrations/GlassBox";
import { GracefulDegradation } from "./illustrations/GracefulDegradation";
import { Handoff } from "./illustrations/Handoff";
import { LearningLoop } from "./illustrations/LearningLoop";
import { ProvenanceLog } from "./illustrations/ProvenanceLog";
import { ReadinessCheck } from "./illustrations/ReadinessCheck";
import { ReturnOfControl } from "./illustrations/ReturnOfControl";
import { ShiftHandover } from "./illustrations/ShiftHandover";
import { StopAnywhere } from "./illustrations/StopAnywhere";

const ILLUSTRATIONS: Record<
  InterfaceComponent,
  (props: { variant: "without" | "with" }) => React.ReactElement
> = {
  "drone-release": DroneRelease,
  "flight-computer": FlightComputer,
  "explainable-fault": ExplainableFault,
  autothrottle: Autothrottle,
  "stop-anywhere": StopAnywhere,
  "alert-triage": AlertTriage,
  "graceful-degradation": GracefulDegradation,
  "glass-box": GlassBox,
  handoff: Handoff,
  "return-of-control": ReturnOfControl,
  "shift-handover": ShiftHandover,
  "capability-disclosure": CapabilityDisclosure,
  "readiness-check": ReadinessCheck,
  "provenance-log": ProvenanceLog,
  "learning-loop": LearningLoop,
};

/**
 * The three beats as one line. Written out rather than drawn as boxes: the
 * sequence is three words and an arrow twice, and at that length a diagram
 * costs more room than it repays (redesign-handoff.md §3).
 */
function Sequence({ steps }: { steps: string[] }) {
  return (
    <p className="seq">
      {steps.map((step, i) => (
        <span key={step}>
          {i > 0 && <span className="seq-arrow" aria-hidden="true"> &rarr; </span>}
          {i > 0 && <span className="sr-only">, then </span>}
          {step}
        </span>
      ))}
    </p>
  );
}

/**
 * Two panels: the failure mode, then the patterned version. The patterned one
 * carries a 1.5px ink border — the only border on the page at that weight —
 * so which of the two is the recommendation is settled before it is read.
 *
 * A pattern that names an `interface` shows the two screens themselves in
 * place of the beats: for a pattern about what a control does under the hand,
 * a drawing of the control says more than three labelled phrases. The
 * captions stay either way.
 */
export function Comparison({
  without,
  withPattern,
  antiPattern,
  illustration,
}: {
  without: Contrast;
  withPattern: Contrast;
  /** Names the mistake rather than calling it the absence of the pattern. */
  antiPattern?: string;
  illustration?: InterfaceComponent;
}) {
  const Illustration = illustration ? ILLUSTRATIONS[illustration] : null;

  return (
    <div className={`compare${Illustration ? " compare-interface" : ""}`}>
      <section className="panel panel-without" aria-labelledby="without-label">
        <h3 id="without-label" className="mono-label panel-label">
          {!Illustration && antiPattern ? `Anti-pattern: ${antiPattern}` : "Without"}
        </h3>
        {Illustration ? <Illustration variant="without" /> : <Sequence steps={without.steps} />}
        {/* With a demo, the anti-pattern section immediately above already
            names the failure and states it in a sentence; repeating it under
            the panel says the same thing three times on one screen. */}
        {!Illustration && <p className="panel-caption">{without.caption}</p>}
      </section>

      <section className="panel panel-with" aria-labelledby="with-label">
        <h3 id="with-label" className="mono-label panel-label">
          With the pattern
        </h3>
        {Illustration ? <Illustration variant="with" /> : <Sequence steps={withPattern.steps} />}
        <p className="panel-caption">{withPattern.caption}</p>
      </section>
    </div>
  );
}
