/**
 * The key to the thumbnail grammar (redesign-handoff.md §2 and §4), stated
 * once at the top of the index so the marks on the cards below are readable
 * rather than decorative.
 *
 * The marks are drawn rather than typed, so they match the thumbnails exactly
 * instead of approximating them with ▢ ○ ■ ●, whose weight and proportion
 * vary by font.
 */

const SIZE = 11;

function Square({ solid = false }: { solid?: boolean }) {
  return (
    <svg className="key-mark" viewBox="0 0 12 12" width={SIZE} height={SIZE} aria-hidden="true">
      <rect
        x="1.25"
        y="1.25"
        width="9.5"
        height="9.5"
        fill={solid ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function Circle({ solid = false }: { solid?: boolean }) {
  return (
    <svg className="key-mark" viewBox="0 0 12 12" width={SIZE} height={SIZE} aria-hidden="true">
      <circle
        cx="6"
        cy="6"
        r="4.75"
        fill={solid ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function Diamond() {
  return (
    <svg className="key-mark" viewBox="0 0 12 12" width={SIZE} height={SIZE} aria-hidden="true">
      <path d="M6 1 L11 6 L6 11 L1 6 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IllustrationKey() {
  return (
    <dl className="key" aria-label="Key to the pattern illustrations">
      <div className="key-item">
        <dt>
          <Square />
        </dt>
        <dd>Machine</dd>
      </div>
      <div className="key-item">
        <dt>
          <Circle />
        </dt>
        <dd>Human</dd>
      </div>
      <div className="key-item">
        <dt>
          <Square solid />
          <Circle solid />
        </dt>
        <dd>Solid = in control</dd>
      </div>
      <div className="key-item">
        <dt>
          <Diamond />
        </dt>
        <dd>State or signal</dd>
      </div>
    </dl>
  );
}
