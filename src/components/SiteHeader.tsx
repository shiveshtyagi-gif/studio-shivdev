import Link from "next/link";

const links = [
  { href: "/artists", label: "Artists" },
  { href: "/releases", label: "Releases" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight"
        >
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-full bg-accent text-sm font-bold text-accent-ink"
          >
            S
          </span>
          Studio Shivdev
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
