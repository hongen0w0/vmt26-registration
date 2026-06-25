"use client";

import { type KeyboardEvent, type ReactNode, useRef } from "react";

export function CrewCardTrack({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    const track = trackRef.current;

    if (!track) {
      return;
    }

    event.preventDefault();

    const direction = event.key === "ArrowRight" ? 1 : -1;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    track.scrollBy({
      left: direction * track.clientWidth * 0.85,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  }

  return (
    <div
      ref={trackRef}
      className="crew-card-track"
      role="region"
      aria-label="VMT26 crew roles and Discord contacts"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}
