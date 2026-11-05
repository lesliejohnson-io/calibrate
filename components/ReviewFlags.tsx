"use client";

import { useEffect, useState } from "react";

/**
 * "Needs your review": the author-facing list of what in this entry is
 * drafted, inferred or unverified, and why it needs checking.
 *
 * Never shown to a reader in production. It appears in development, and on
 * the deployed site only behind `?review`, which is how Leslie reads the
 * flags on a page as published rather than only in the editor
 * (redesign-handoff.md §3). The /review index is the other way in.
 *
 * The query check runs after mount rather than on the server, so the page
 * stays static and the flag costs nothing to anyone who does not pass it.
 */
export function ReviewFlags({ items }: { items: string[] }) {
  const inDevelopment = process.env.NODE_ENV !== "production";
  const [show, setShow] = useState(inDevelopment);

  useEffect(() => {
    if (inDevelopment) return;
    setShow(new URLSearchParams(window.location.search).has("review"));
  }, [inDevelopment]);

  if (items.length === 0 || !show) return null;

  return (
    <aside className="review-flag" aria-labelledby="needs-review">
      <h2 id="needs-review" className="review-flag-head">
        Needs your review
      </h2>
      <p className="review-flag-note">
        Drafted or unverified. Each item says what to check and why. Shown in development, and in
        production only with <code>?review</code>.
      </p>
      <ul className="review-flag-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
