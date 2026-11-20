import Link from "next/link";
import { Logo } from "@/components/LogoMark";
import { NAV_LINKS } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-col gap-3">
          <Link href="/" aria-label="Studio Shivdev home" className="self-start text-foreground">
            <Logo />
          </Link>
          <p>Independent music label</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 font-semibold uppercase tracking-wider">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="ds-tap hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
