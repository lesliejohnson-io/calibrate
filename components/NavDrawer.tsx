"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MOMENTS } from "@/lib/schema";
import { SOCIAL_LINKS, SocialIcon } from "./SocialLinks";
import { resolvedTheme, toggleTheme, type Theme } from "./ThemeToggle";

/**
 * The small-screen menu: a hamburger in the header and a drawer behind it.
 *
 * Below the breakpoint the header has room for the mark and one control, so
 * the links and the theme switch move in here. The drawer is navigation only:
 * the domain filter stays in the index's controls band at every width, where
 * it sits beside the thing it narrows.
 *
 * The drawer stays in the DOM when it is shut, because a transform cannot
 * animate from a thing that is not there. `inert` is what makes that safe: a
 * closed drawer takes no focus, answers no click and is invisible to a screen
 * reader, so the only thing left in the page is markup nobody can reach.
 *
 * Short labels, by the brief: the moment named "After and over time"
 * everywhere else on the site is "After" in here.
 */

/** The moments, in loop order, with the names the drawer uses. */
const MOMENT_SHORT: Record<(typeof MOMENTS)[number], string> = {
  before: "Before",
  during: "During",
  transition: "Transition",
  failure: "Failure",
  after: "After",
};

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function NavDrawer() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const drawerId = useId();

  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  // Focus the close button on open, and hand focus back to the hamburger on
  // close. Every exit -- the X, the scrim, Escape, a link -- goes through
  // `close`, so there is one path and one place it lands.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
  }, [open]);

  // Nothing behind the drawer scrolls while it is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Escape closes; Tab cycles inside. The drawer is the only thing on screen
  // while it is open, so the trap is a loop over its own focusables rather
  // than anything that has to know about the page.
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      close();
      return;
    }
    if (event.key !== "Tab") return;

    const items = Array.from(
      drawerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [],
    ).filter((el) => el.offsetParent !== null || el === document.activeElement);
    if (items.length === 0) return;

    const first = items[0];
    const last = items[items.length - 1];
    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }
  };

  const current = (href: string) =>
    href === "/"
      ? pathname === "/" || pathname.startsWith("/patterns") || pathname.startsWith("/moments")
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <button
        type="button"
        ref={hamburgerRef}
        className="hamburger"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls={drawerId}
        onClick={() => setOpen(true)}
      >
        <span className="hamburger-lines" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <div
        className={`drawer-scrim${open ? " is-open" : ""}`}
        aria-hidden="true"
        onClick={close}
      />

      <div
        id={drawerId}
        ref={drawerRef}
        className={`drawer${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        onKeyDown={onKeyDown}
      >
        <div className="drawer-scroll">
          <div className="drawer-top">
            <Link href="/" className="drawer-brand" aria-label="Calibrate — home" onClick={close}>
              <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
                <rect y="34" width="64" height="10" fill="currentColor" />
                <circle cx="32" cy="20" r="14" fill="currentColor" />
                <path d="M32 44L40.6603 59H23.3397L32 44Z" fill="currentColor" />
              </svg>
            </Link>
            <button
              type="button"
              ref={closeRef}
              className="drawer-close"
              aria-label="Close menu"
              onClick={close}
            >
              <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false">
                <path
                  d="M4.5 4.5 15.5 15.5M15.5 4.5 4.5 15.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <nav className="drawer-nav" aria-label="Site">
            <Link
              href="/"
              className="drawer-link"
              aria-current={current("/") ? "page" : undefined}
              onClick={close}
            >
              Patterns
            </Link>
            <ul className="drawer-moments">
              {MOMENTS.map((moment) => (
                <li key={moment}>
                  <Link href={`/#moment-${moment}`} className="drawer-moment" onClick={close}>
                    {MOMENT_SHORT[moment]}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="drawer-link"
              aria-current={current("/about") ? "page" : undefined}
              onClick={close}
            >
              About
            </Link>
            <Link
              href="/changelog"
              className="drawer-link"
              aria-current={current("/changelog") ? "page" : undefined}
              onClick={close}
            >
              Changelog
            </Link>
          </nav>

          <DrawerTheme />

          <div className="drawer-foot">
            <p className="drawer-name">Leslie Johnson</p>
            <ul className="drawer-socials">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    aria-label={link.label}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <SocialIcon link={link} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * The header's switch decides which icon to show in CSS, so it can be
 * server-rendered with no state at all. This one cannot: its label has to say
 * which way the switch goes, and that is a sentence, not a stylesheet. It is
 * only ever read inside an open drawer, so there is nothing to flash.
 */
function DrawerTheme() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => setTheme(resolvedTheme()), []);

  const label =
    theme === null
      ? "Switch between light and dark mode"
      : theme === "dark"
        ? "Switch to light mode"
        : "Switch to dark mode";

  return (
    <button
      type="button"
      className="drawer-theme"
      aria-label={label}
      onClick={() => setTheme(toggleTheme())}
    >
      {theme === "dark" ? (
        <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false">
          <circle cx="10" cy="10" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M10 1.6v2.1M10 16.3v2.1M18.4 10h-2.1M3.7 10H1.6M15.94 4.06l-1.48 1.48M5.54 14.46l-1.48 1.48M15.94 15.94l-1.48-1.48M5.54 5.54 4.06 4.06"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false">
          <path
            d="M16.5 12.4A7 7 0 0 1 7.6 3.5a7 7 0 1 0 8.9 8.9Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
