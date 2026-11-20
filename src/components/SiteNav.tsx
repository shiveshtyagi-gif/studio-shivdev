"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/nav";

function isCurrent(pathname: string | null, href: string) {
  return !!pathname && (pathname === href || pathname.startsWith(`${href}/`));
}

/**
 * Main navigation. Small inline links from 768px up; a Menu button that
 * opens a full-width list of large links on phones. `pathname` marks the
 * current page (null while it is not known yet: no link is marked).
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
        <ul className="flex gap-x-8 text-[12px] tracking-[-0.01em]">
          {NAV_LINKS.map((l) => {
            const current = isCurrent(pathname, l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={current ? "page" : undefined}
                  className={`ds-tap transition-colors hover:text-foreground ${
                    current ? "text-foreground" : "text-muted"
                  }`}
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
          aria-label={open ? "Close menu" : "Menu"}
          onClick={() => setOpen((o) => !o)}
          className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full text-foreground"
        >
          <svg aria-hidden width="18" height="18" viewBox="0 0 18 18">
            {open ? (
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M2 6h14M2 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
        <nav
          id="mobile-nav"
          aria-label="Main"
          hidden={!open}
          className="absolute inset-x-0 top-full h-[calc(100dvh-3rem)] bg-background px-10 pt-6"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => {
              const current = isCurrent(pathname, l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={current ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`ds-tap text-[28px] font-semibold tracking-[-0.015em] ${
                      current ? "text-foreground" : "text-muted hover:text-foreground"
                    }`}
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
