import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import { ExternalLink } from "@/components/ExternalLink";
import { ByIcon, CcIcon } from "@/components/LicenseIcons";
import { BrandMark } from "@/components/BrandLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

/**
 * Re-applies a stored theme choice before first paint, so a reader who chose
 * a theme against their system setting never sees the other one flash.
 */
const THEME_SCRIPT = `try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`;

/*
 * Fonts are self-hosted rather than pulled from `next/font/google`.
 *
 * `next/font/google` fetches each family from fonts.googleapis.com at build
 * time and has no retry: when that request fails, the build fails with
 * "An error occurred in `next/font`" and takes the whole deploy with it.
 * That is exactly what happened on the first deploy after this site changed
 * families, because the restored build cache held the previous ones. Shipping
 * the files removes the network from the build entirely.
 *
 * Each file is the `latin` subset of the family's variable font, taken from
 * Google Fonts (Archivo, Inter and JetBrains Mono, all under the SIL Open
 * Font License). The variable axis covers every weight the CSS asks for, so
 * one file per family replaces the fixed weights we used to request. The
 * `latin` subset carries U+0000-00FF, which covers the accented characters in
 * the patterns and the source list; the geometric glyphs in the diagrams
 * (U+25xx) are outside every Google latin subset and render from the system
 * fallback, as they already did.
 *
 * To add a weight, nothing needs to change. To add glyph coverage, add the
 * matching `latin-ext` file with its own unicode-range.
 */

/* Display face: headings, card names, rail moment names. Also stands in for
   --font-condensed, which globals.css aliases to this variable. */
const display = localFont({
  src: "./fonts/Archivo-Variable-latin.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-display",
  fallback: ["system-ui", "sans-serif"],
});
/* Prose: lede, body, card intents. */
const sans = localFont({
  src: "./fonts/Inter-Variable-latin.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-sans",
  fallback: ["system-ui", "sans-serif"],
});
/* Data: labels, numbers, meta, verdicts. */
const mono = localFont({
  src: "./fonts/JetBrainsMono-Variable-latin.woff2",
  weight: "100 800",
  style: "normal",
  display: "swap",
  variable: "--font-mono",
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  title: { default: "Calibrate", template: "%s · Calibrate" },
  description:
    "Named, reusable design patterns for the trust layer between humans and autonomous machines.",
  /* REMOVE AT DOMAIN LAUNCH. Keeps the whole site out of search indexes while
     the patterns are drafts carrying unverified claims and review flags. */
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <header className="site-header">
          <div className="wrap site-header-inner">
            <Link href="/" className="brand" aria-label="Calibrate — home">
              <BrandMark />
            </Link>
            <nav className="site-nav" aria-label="Main">
              <Link href="/" className="site-nav-link">
                Patterns
              </Link>
              <Link href="/about" className="site-nav-link">
                About
              </Link>
              <Link href="/changelog" className="site-nav-link">
                Changelog
              </Link>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="wrap">
            <p className="footer-line">
              <span>
                ©&nbsp;2026{" "}
                <ExternalLink href="https://www.linkedin.com/in/lesliejohnson-ux">
                  Leslie Johnson
                </ExternalLink>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Shareable under{" "}
                <ExternalLink
                  href="https://creativecommons.org/licenses/by/4.0/"
                  rel="license noreferrer"
                >
                  <CcIcon />
                  <ByIcon />
                  CC BY 4.0
                </ExternalLink>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                <a href="mailto:leslie@lesliejohnson.io">Contact</a>
              </span>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
