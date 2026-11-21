"use client";

import { useState, useSyncExternalStore } from "react";

/** Same as NewTabHint in Cards.tsx, which can't be imported here (server-only data). */
function NewTabHint() {
  return (
    <>
      <span aria-hidden> ↗</span>
      <span className="sr-only"> (opens in new tab)</span>
    </>
  );
}

/** Ticks every second, so the flip clock stays in step with the real clock. */
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}
const getNow = () => Math.floor(Date.now() / 1000) * 1000;
const getServerNow = () => null;

const pad = (n: number) => String(n).padStart(2, "0");

function isSameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

/**
 * One split-flap card with two digits. When the value changes, the top half
 * of the old number folds down and the bottom half of the new one drops in.
 * Skips the fold when the visitor prefers reduced motion.
 */
function FlipUnit({ value, label, urgent }: { value: string | null; label: string; urgent: boolean }) {
  const shown = value ?? "––";
  const [state, setState] = useState({ cur: shown, prev: shown, flipping: false });

  // Adjust state while rendering: the standard way to react to a changed prop.
  if (shown !== state.cur) {
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setState({ cur: shown, prev: state.cur, flipping: !reduce });
  }

  const bottom = state.flipping ? state.prev : state.cur;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="ds-flip" data-urgent={urgent || undefined} aria-hidden>
        <div className="ds-flip-half ds-flip-top">
          <span>{state.cur}</span>
        </div>
        <div className="ds-flip-half ds-flip-bottom">
          <span>{bottom}</span>
        </div>
        {state.flipping && (
          <>
            <div key={`t-${state.cur}`} className="ds-flip-half ds-flip-top ds-flip-fold">
              <span>{state.prev}</span>
            </div>
            <div
              key={`b-${state.cur}`}
              className="ds-flip-half ds-flip-bottom ds-flip-drop"
              onAnimationEnd={() => setState((s) => ({ ...s, flipping: false }))}
            >
              <span>{state.cur}</span>
            </div>
          </>
        )}
      </div>
      <span className="text-[11px] font-semibold tracking-[0.18em] text-muted uppercase sm:text-[12px]">
        {label}
      </span>
    </div>
  );
}

/**
 * Live premiere clock and the call-to-action button. The server sends the
 * fixed date and empty cards; the browser then starts the flip clock, and
 * swaps to "Out now" once the premiere time has passed.
 */
export function PremiereStatus({
  startsAt,
  startsAtLabel,
  url,
}: {
  startsAt: string;
  startsAtLabel: string;
  url: string;
}) {
  const now = useSyncExternalStore(subscribe, getNow, getServerNow);
  const start = new Date(startsAt);
  const remaining = now === null ? null : start.getTime() - now;
  const live = remaining !== null && remaining <= 0;
  const secs = remaining === null ? null : Math.max(0, Math.floor(remaining / 1000));

  let caption = `Premieres on YouTube · ${startsAtLabel}`;
  if (live) caption = "Out now on YouTube";
  else if (secs !== null) {
    if (secs <= 60) caption = "Going live any second";
    else if (secs <= 600) caption = "Almost time";
    else if (secs <= 3600) caption = "Starting soon";
    else if (isSameDay(start, new Date(now!))) {
      const time = start.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });
      caption = `Premieres today at ${time}`;
    }
  }

  const days = secs === null ? null : Math.floor(secs / 86400);
  const units: { label: string; value: string | null }[] = [];
  if (days !== null && days > 0) units.push({ label: "Days", value: pad(days) });
  units.push(
    { label: "Hours", value: secs === null ? null : pad(Math.floor((secs % 86400) / 3600)) },
    { label: "Minutes", value: secs === null ? null : pad(Math.floor((secs % 3600) / 60)) },
    { label: "Seconds", value: secs === null ? null : pad(secs % 60) },
  );

  const minutesLeft = secs === null ? null : Math.ceil(secs / 60);

  return (
    <>
      <p className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-surface-2 px-4 py-2 text-[15px] font-medium">
        <span className="relative flex size-2.5" aria-hidden>
          <span className="absolute inset-0 animate-ping rounded-full bg-brand-red opacity-75 motion-reduce:hidden" />
          <span className="relative size-2.5 rounded-full bg-brand-red" />
        </span>
        <span aria-live="polite">{caption}</span>
      </p>

      {!live && (
        <div className="mt-8 sm:mt-10">
          <div role="timer" className="flex items-start justify-center gap-3 sm:gap-5">
            {units.map((u) => (
              <FlipUnit key={u.label} label={u.label} value={u.value} urgent={secs !== null && secs <= 60} />
            ))}
          </div>
          {/* Read out once a minute, not every second. */}
          <span className="sr-only">
            {minutesLeft === null ? "Counting down to the premiere" : `About ${minutesLeft} minutes until the premiere`}
          </span>
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <a href={url} target="_blank" rel="noopener" className="ds-btn-primary gap-2">
          <YouTubeGlyph />
          {live ? "Watch now on YouTube" : "Set a reminder on YouTube"}
          <NewTabHint />
        </a>
      </div>
    </>
  );
}

function YouTubeGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden fill="currentColor">
      <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.7 15.1V8.9L15.5 12l-5.8 3.1Z" />
    </svg>
  );
}
