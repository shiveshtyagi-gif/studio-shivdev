"use client";

import { useSyncExternalStore } from "react";

/** Same as NewTabHint in Cards.tsx, which can't be imported here (server-only data). */
function NewTabHint() {
  return (
    <>
      <span aria-hidden> ↗</span>
      <span className="sr-only"> (opens in new tab)</span>
    </>
  );
}

/** Ticks every 15 seconds, so the countdown stays current. */
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
}
const getNow = () => Math.floor(Date.now() / 15_000) * 15_000;
const getServerNow = () => null;

function countdown(ms: number) {
  const mins = Math.ceil(ms / 60_000);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m} min`;
}

function isSameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

/**
 * Live premiere line and the call-to-action button. The server sends the
 * fixed date; the browser then swaps in "today", a countdown, or "Out now".
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
  const live = now !== null && now >= start.getTime();

  let status = `Premieres on YouTube · ${startsAtLabel}`;
  if (now !== null) {
    const time = start.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });
    if (live) status = "Out now on YouTube";
    else if (isSameDay(start, new Date(now)))
      status = `Premieres today at ${time} · in ${countdown(start.getTime() - now)}`;
  }

  return (
    <>
      <p className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-surface-2 px-4 py-2 text-[15px] font-medium">
        <span className="relative flex size-2.5" aria-hidden>
          <span className="absolute inset-0 animate-ping rounded-full bg-brand-red opacity-75 motion-reduce:hidden" />
          <span className="relative size-2.5 rounded-full bg-brand-red" />
        </span>
        <span aria-live="polite">{status}</span>
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
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
