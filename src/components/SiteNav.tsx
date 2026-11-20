"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/nav";

function isCurrent(pathname: string | null, href: string) {
  return !!pathname && (pathname === href || pathname.startsWith(`${href}/`));
}

const linkBase =
  "ds-tap font-semibold uppercase tracking-wider transition-colors hover:text-accent";
const linkState = (current: boolean) =>
  current
    ? "text-foreground underline decoration-accent decoration-2 underline-offset-8"
    : "text-muted";

/**
 * Main navigation. Inline links from 768px up; a Menu button with a
 * drop-down panel on phones. `pathname` marks the current page
 * (null while it is not known yet: no link is marked).
 */
export function HeaderNav({ pathname }: { pathname: string | null }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) setOpen(false);
      }}
    >
      {/* Desktop */}
      <nav aria-label="Main" className="hidden md:block">
        <ul className="flex gap-x-6 text-sm">
          {NAV_LINKS.map((l) => {
            const current = isCurrent(pathname, l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={current ? "page" : undefined}
                  className={`${linkBase} ${linkState(current)}`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Phone */}
      <div className="md:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
          className="flex min-h-11 min-w-11 cursor-pointer items-center gap-2 rounded-full px-3 text-sm font-semibold uppercase tracking-wider text-foreground hover:text-accent"
        >
          <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" className="shrink-0">
            {open ? (
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
          {open ? "Close" : "Menu"}
        </button>
        <nav
          id="mobile-nav"
          aria-label="Main"
          hidden={!open}
          className="absolute inset-x-0 top-full border-b border-line bg-background px-4 pb-4"
        >
          <ul className="flex flex-col text-base">
            {NAV_LINKS.map((l) => {
              const current = isCurrent(pathname, l.href);
              return (
                <li key={l.href} className="border-t border-line first:border-t-0">
                  <Link
                    href={l.href}
                    aria-current={current ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`${linkBase} ${linkState(current)} w-full py-1`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

/** HeaderNav with the current page read from the URL. */
export function HeaderNavLive() {
  return <HeaderNav pathname={usePathname()} />;
}
