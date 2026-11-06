# Self-hosted fonts

These files are shipped with the repo instead of fetched by `next/font/google`
at build time. `next/font/google` makes a network request to
fonts.googleapis.com during the build and does not retry; when that request
fails the build fails outright ("An error occurred in `next/font`"). Keeping
the files here takes the network out of the build.

| File | Family | Axis | Source |
| --- | --- | --- | --- |
| `Archivo-Variable-latin.woff2` | Archivo | `wght` 100–900 | Google Fonts, `latin` subset |
| `Inter-Variable-latin.woff2` | Inter | `wght` 100–900 | Google Fonts, `latin` subset |
| `JetBrainsMono-Variable-latin.woff2` | JetBrains Mono | `wght` 100–800 | Google Fonts, `latin` subset |

Each is the variable font for its family, so one file covers every weight
`app/globals.css` asks for (400–700). The `latin` subset covers U+0000–00FF,
which includes the accented characters in the patterns and the source list.
Glyphs outside it — the geometric shapes in the diagrams (U+25xx) and the
arrows `←` `→` — are in no Google latin subset and render from the system
fallback, as they did before.

Archivo replaced Inter Tight as the display face. Its `latin` subset is four
codepoints narrower (U+02BB, U+0329, U+2002, U+200B); none is used anywhere in
the site, and all four would fall back rather than fail. Note that Archivo's
default instance is `wght` 600 where Inter Tight's was 400, which only matters
if a rule ever asks for the family without naming a weight.

## Licence

All three families are licensed under the SIL Open Font License, Version 1.1:

- Archivo — Copyright (c) Omnibus-Type
- Inter — Copyright (c) The Inter Project Authors
- JetBrains Mono — Copyright (c) JetBrains s.r.o.

The licence text is at <https://openfontlicense.org/open-font-license-official-text/>.
The OFL permits bundling and redistribution with a work; it does not require
the work itself to carry the same licence, so the site's own CC BY terms are
unaffected.

## Updating

Refetch a family from the Google Fonts CSS API with a browser `User-Agent`
(so it serves woff2), take the `src` URL under the `/* latin */` comment, and
replace the file:

    curl -A "<browser UA>" \
      "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"

To widen glyph coverage, add the matching `latin-ext` file with its own
`unicode-range` descriptor alongside the existing `@font-face`.
