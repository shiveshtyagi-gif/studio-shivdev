import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Studio Shivdev · Independent music label</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-1">
          <Link href="/artists" className="hover:text-foreground">
            Artists
          </Link>
          <Link href="/releases" className="hover:text-foreground">
            Releases
          </Link>
          <Link href="/about" className="hover:text-foreground">
            About
          </Link>
          <Link href="/contact" className="hover:text-foreground">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
