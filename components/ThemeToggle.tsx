"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * Appearance, as a menu button in the header.
 *
 * It used to be a flip switch between light and dark. Three options do not
 * flip, and the third one -- System -- is the absence of a stored choice
 * rather than a value, so a switch could not express it at all: with nothing
 * stored the site follows `prefers-color-scheme`, which is the state it ships
 * in. The drawer carries the same three as a segmented control; this is the
 * same setting with a header's worth of room.
 *
 * Which icon shows is still decided in CSS, from `data-theme` on the root,
 * which the layout's inline script sets before first paint. That keeps the
 * button identical on the server and the client and leaves nothing to flash.
 * Only the label is stateful, because "Appearance: Dark" is a sentence and no
 * stylesheet can say it.
 */
export type ThemeChoice = "system" | "light" | "dark";

/** The options, in the order the arrows walk them. */
const CHOICES: { value: ThemeChoice; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

/**
 * The choice on record, read from the DOM. Call it from an effect -- it reads
 * the document, so it has no answer on the server.
 *
 * "System" is what no stored choice looks like, which is why this cannot be
 * derived from the colour in force: a reader whose OS is dark and who chose
 * Dark looks identical to one who chose nothing, and the control has to tell
 * those two apart.
 */
export function storedChoice(): ThemeChoice {
  const chosen = document.documentElement.dataset.theme;
  return chosen === "dark" || chosen === "light" ? chosen : "system";
}

/** Records a choice and applies it. "system" clears the record instead. */
export function setThemeChoice(choice: ThemeChoice): void {
  const root = document.documentElement;
  if (choice === "system") {
    delete root.dataset.theme;
    try {
      localStorage.removeItem("theme");
    } catch {
      // Private browsing or blocked storage: nothing was stored to clear.
    }
    return;
  }
  root.dataset.theme = choice;
  try {
    localStorage.setItem("theme", choice);
  } catch {
    // Private browsing or blocked storage: the choice just won't persist.
  }
}

/**
 * The three marks, in one place: a half-filled circle for System, a sun for
 * Light, a moon for Dark. The header renders all three and lets CSS pick; the
 * drawer renders one per option, side by side. Same shapes either way, which
 * is the point of them living here rather than being drawn twice.
 */
export function ThemeIcon({
  choice,
  className,
  size = 17,
}: {
  choice: ThemeChoice;
  className?: string;
  size?: number;
}) {
  const shared = {
    className,
    viewBox: "0 0 20 20",
    width: size,
    height: size,
    "aria-hidden": true,
    focusable: "false" as const,
  };

  if (choice === "system") {
    return (
      <svg {...shared}>
        <path d="M10 3A7 7 0 0 0 10 17Z" fill="currentColor" />
        <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }

  if (choice === "light") {
    return (
      <svg {...shared}>
        <circle cx="10" cy="10" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M10 1.6v2.1M10 16.3v2.1M18.4 10h-2.1M3.7 10H1.6M15.94 4.06l-1.48 1.48M5.54 14.46l-1.48 1.48M15.94 15.94l-1.48-1.48M5.54 5.54 4.06 4.06"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg {...shared}>
      <path
        d="M16.5 12.4A7 7 0 0 1 7.6 3.5a7 7 0 1 0 8.9 8.9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ThemeToggle() {
  const [choice, setChoice] = useState<ThemeChoice | null>(null);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => setChoice(storedChoice()), []);

  /*
   * Escape and an outside click both close it, the same way the domain
   * popover does. Escape always hands focus back to the button; an outside
   * click only does if focus was still inside the menu, so clicking a nav
   * link leaves you on the nav link.
   */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.stopPropagation();
      setOpen(false);
      buttonRef.current?.focus();
    };

    const onPointerDown = (event: MouseEvent) => {
      if (wrapRef.current?.contains(event.target as Node)) return;
      const inside = wrapRef.current?.contains(document.activeElement);
      setOpen(false);
      if (inside) buttonRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  // Opening lands on the checked item, which is both the menu announcing
  // itself and the shortest path to the neighbouring option.
  useEffect(() => {
    if (!open) return;
    const items = menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]');
    const index = CHOICES.findIndex((c) => c.value === choice);
    items?.[index === -1 ? 0 : index]?.focus();
  }, [open, choice]);

  const pick = (next: ThemeChoice) => {
    setThemeChoice(next);
    setChoice(next);
    setOpen(false);
    buttonRef.current?.focus();
  };

  // Up and Down move between items without selecting; Enter and Space select,
  // which a <button> already does for us. Moving and choosing are separate in
  // a menu, unlike the drawer's radio group, where selection follows focus.
  const onItemKeyDown = (event: React.KeyboardEvent, index: number) => {
    const step = event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0;
    if (step === 0) return;
    event.preventDefault();
    const items = menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]');
    items?.[(index + step + CHOICES.length) % CHOICES.length]?.focus();
  };

  const current = CHOICES.find((c) => c.value === choice)?.label;

  return (
    <div className="theme-menu" ref={wrapRef}>
      <button
        type="button"
        ref={buttonRef}
        className="theme-toggle"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        // Until the effect has read the choice there is no current value to
        // name, and a guess would announce the wrong one.
        aria-label={current ? `Appearance: ${current}` : "Appearance"}
        onClick={() => setOpen((was) => !was)}
      >
        <ThemeIcon choice="system" className="theme-icon icon-system" />
        <ThemeIcon choice="light" className="theme-icon icon-sun" />
        <ThemeIcon choice="dark" className="theme-icon icon-moon" />
      </button>

      {open && (
        <div className="theme-pop" id={menuId} ref={menuRef} role="menu" aria-label="Appearance">
          {CHOICES.map((option, index) => (
            <button
              key={option.value}
              type="button"
              className="theme-item"
              role="menuitemradio"
              aria-checked={choice === option.value}
              onClick={() => pick(option.value)}
              onKeyDown={(event) => onItemKeyDown(event, index)}
            >
              <span className="theme-item-check" aria-hidden="true">
                {choice === option.value ? "✓" : ""}
              </span>
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
