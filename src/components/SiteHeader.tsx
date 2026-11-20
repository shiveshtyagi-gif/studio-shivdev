import Link from "next/link";
import { Suspense } from "react";
import { Logo } from "@/components/LogoMark";
import { HeaderNav, HeaderNavLive } from "@/components/SiteNav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line/70 bg-background/85 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" aria-label="Studio Shivdev home" className="flex min-h-11 items-center">
          <Logo />
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
