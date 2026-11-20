import Link from "next/link";
import { Logo } from "@/components/LogoMark";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-col gap-3">
          <Link href="/" aria-label="Studio Shivdev home" className="text-foreground">
            <Logo />
          </Link>
          <p>Independent music label</p>
        </div>
        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-x-5 gap-y-1 font-semibold uppercase tracking-wider"
        >
          <Link href="/artists" className="hover:text-accent">
            Artists
          </Link>
          <Link href="/releases" className="hover:text-accent">
            Releases
          </Link>
          <Link href="/about" className="hover:text-accent">
            About
          </Link>
          <Link href="/contact" className="hover:text-accent">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
