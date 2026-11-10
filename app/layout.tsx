import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import { ExternalLink } from "@/components/ExternalLink";
import { ByIcon, CcIcon } from "@/components/LicenseIcons";
import { BrandMark } from "@/components/BrandLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BrowseProvider } from "@/components/BrowseProvider";
import { NavDrawer } from "@/components/NavDrawer";
import { getAllPatterns, toCardData } from "@/lib/patterns";
import { toFacets } from "@/lib/browse";
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
 * Google Fonts (Archivo, Inter, Newsreader and JetBrains Mono, all under the
 * SIL Open Font License). The variable axis covers every weight the CSS asks
 * for, so one file per family replaces the fixed weights we used to request.
 *
 * The two sans faces have different jobs. Archivo is the display face, and
 * Inter is now the interface face — nav, cards, labels, the mechanism strip,
 * the demos — rather than the reading face it used to be. Reading text is
 * Newsreader: the opening tale, the body sections, the Therefore and the
 * captions. Newsreader ships upright and italic as two files, so an emphasis
 * in reading text is a drawn italic rather than a slanted upright. The
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
/* Interface: nav, cards, card intents, controls, demo text. */
const sans = localFont({
  src: "./fonts/Inter-Variable-latin.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-sans",
  fallback: ["system-ui", "sans-serif"],
});
/* Editorial: the opening tale, body sections, Therefore, captions. Two files,
   because the italic is drawn rather than sloped. `opsz` is left to
   font-optical-sizing in globals.css, which reads it off the rendered size. */
const serif = localFont({
  src: [
    { path: "./fonts/Newsreader-Variable-latin.woff2", weight: "200 800", style: "normal" },
    { path: "./fonts/Newsreader-Italic-Variable-latin.woff2", weight: "200 800", style: "italic" },
  ],
  display: "swap",
  variable: "--font-serif",
  fallback: ["Georgia", "serif"],
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
  title: { default: "Calibrate Patterns: Designing for human–machine trust", template: "%s · Calibrate" },
  description:
    "Named, reusable design patterns for the trust layer between humans and autonomous machines.",
  /* REMOVE AT DOMAIN LAUNCH. Keeps the whole site out of search indexes while
     the patterns are drafts carrying unverified claims and review flags. */
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  /* The drawer carries the domain filter on every page, not just the index,
     so the counts behind it are read here rather than passed down a route. */
  const facets = toFacets(getAllPatterns().map(toCardData));

  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <BrowseProvider facets={facets}>
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
                <span className="site-nav-sep" aria-hidden="true">
                  |
                </span>
                <Link href="/changelog" className="site-nav-link site-nav-link-sm">
                  Changelog
                </Link>
                <ThemeToggle />
              </nav>
              {/* Below the breakpoint the nav above is hidden and this is the
                  only control in the header. */}
              <NavDrawer />
            </div>
          </header>
          <main>{children}</main>
        </BrowseProvider>
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
