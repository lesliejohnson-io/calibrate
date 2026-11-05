import type { Metadata } from "next";
import Link from "next/link";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
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

/* Display face: headings, card names, rail moment names. */
const display = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
/* Prose: lede, body, card intents. */
const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});
/* Data: labels, numbers, meta, verdicts. */
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: { default: "Trust Layer Patterns", template: "%s · Trust Layer Patterns" },
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
            <Link href="/" className="brand" aria-label="Trust Layer Patterns — home">
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
