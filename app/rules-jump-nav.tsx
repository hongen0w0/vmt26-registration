"use client";

import type { MouseEvent } from "react";

type RuleJumpItem = {
  id: string;
  label: string;
};

export function RulesJumpNav({ items }: { items: RuleJumpItem[] }) {
  function handleJump(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();

    const target = document.getElementById(id);

    if (!(target instanceof HTMLDetailsElement)) {
      return;
    }

    target.open = true;
    window.history.pushState(null, "", `#${id}`);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.requestAnimationFrame(() => {
      target.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start"
      });

      const summary = target.querySelector("summary");

      if (summary instanceof HTMLElement) {
        summary.focus({ preventScroll: true });
      }
    });
  }

  return (
    <nav className="rules-jump-nav" aria-label="Tournament rules sections">
      <span>Jump to</span>
      {items.map((item) => (
        <a
          href={`#${item.id}`}
          key={item.id}
          onClick={(event) => handleJump(event, item.id)}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
