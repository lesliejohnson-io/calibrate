/**
 * The paragraph under Therefore: the condition that decides whether
 * following the instruction does any good. Opt-in per pattern via the
 * top-level `insight` field, so a pattern with nothing to add under its
 * Therefore renders exactly as it did before this existed.
 *
 * Set between two hairlines rather than in a tinted box, and smaller than
 * the Therefore above it. The ranking matters: Therefore is the pattern's
 * one claim, and a callout that shouted would read as the correction to it
 * rather than the caveat on it.
 *
 * The first sentence is the lead, set in bold, so the callout can be taken
 * in at a glance and read in full only if the glance earns it. That is also
 * why the field is plain prose: the split is made on the text, which a
 * markdown body would not survive.
 */

/**
 * The first sentence, then the rest. Splits on a sentence-ending mark
 * followed by a capital — and only where two word characters run up to the
 * mark, so an abbreviation ("10 p.m. The car...") is not mistaken for the
 * end of a sentence. A single-sentence insight is all lead.
 */
function splitLead(text: string): [lead: string, rest: string] {
  const match = /(?<=\w\w)[.!?](?=\s+[^\p{Ll}])/u.exec(text);
  if (!match) return [text.trim(), ""];
  const end = match.index + 1;
  return [text.slice(0, end).trim(), text.slice(end).trim()];
}

export function Insight({ text }: { text: string }) {
  const [lead, rest] = splitLead(text);

  return (
    <aside className="insight">
      <p className="insight-text">
        <strong>{lead}</strong>
        {rest && ` ${rest}`}
      </p>
    </aside>
  );
}
