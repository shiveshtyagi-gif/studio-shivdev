import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav";

/** Quiet grey footer with small type, like a product site's footer. */
export function SiteFooter() {
  return (
    <footer className="bg-surface text-[12px] leading-[1.33] text-muted">
      <div className="ds-container py-10">
        <p className="border-b border-line pb-4">
          Studio Shivdev is an independent music label. Listen to our releases on
          Spotify, YouTube and Apple Music.
        </p>
        <div className="flex flex-col gap-2 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Studio Shivdev. All rights reserved.</p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="ds-tap text-foreground/80 hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
