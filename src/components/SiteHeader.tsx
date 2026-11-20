import Link from "next/link";
import { Suspense } from "react";
import { LogoMark } from "@/components/LogoMark";
import { HeaderNav, HeaderNavLive } from "@/components/SiteNav";

/** Thin, translucent global nav bar: logo mark on the left, links on the right. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line/60 bg-background/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="ds-container relative flex h-12 items-center justify-between gap-6">
        <Link href="/" aria-label="Studio Shivdev home" className="ds-logo-link flex min-h-11 items-center gap-2">
          <LogoMark animated className="h-5 w-auto" />
          <span className="text-[14px] font-semibold tracking-[-0.01em]">Studio Shivdev</span>
        </Link>
        {/* The current page is read from the URL. Artist pages added after a
            build aren't known when the site is built, so the nav renders without
            a current page until the URL is read (Cache Components needs a
            Suspense boundary here). */}
        <Suspense fallback={<HeaderNav pathname={null} />}>
          <HeaderNavLive />
        </Suspense>
      </div>
    </header>
  );
}
