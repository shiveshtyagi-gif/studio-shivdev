import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArtists } from "@/lib/data";

// Dev gallery: every screen of the site side by side at desktop and phone
// width. Only available while running `npm run dev`; production returns 404.

export const metadata: Metadata = {
  title: "Dev gallery",
  robots: { index: false, follow: false },
};

type Screen = { name: string; path: string; note?: string };

const DESKTOP = { width: 1280, height: 860, scale: 0.42 };
const PHONE = { width: 375, height: 812, scale: 0.45 };

function Frame({
  path,
  label,
  size,
}: {
  path: string;
  label: string;
  size: { width: number; height: number; scale: number };
}) {
  return (
    <figure className="flex flex-col gap-2">
      <figcaption className="text-xs uppercase tracking-wider text-muted">
        {label} · {size.width}px
      </figcaption>
      <div
        className="overflow-hidden rounded-lg border border-line bg-background"
        style={{ width: size.width * size.scale, height: size.height * size.scale }}
      >
        <iframe
          src={path}
          title={`${path} at ${label}`}
          loading="lazy"
          className="origin-top-left border-0"
          style={{
            width: size.width,
            height: size.height,
            transform: `scale(${size.scale})`,
          }}
        />
      </div>
    </figure>
  );
}

export default async function DevGallery() {
  if (process.env.NODE_ENV !== "development") notFound();

  const artists = await getArtists();
  const screens: Screen[] = [
    { name: "Home", path: "/" },
    { name: "Artists", path: "/artists" },
    artists[0]
      ? { name: "Artist detail", path: `/artists/${artists[0].slug}`, note: artists[0].name }
      : { name: "Artist detail", path: "/artists/none", note: "no artists yet" },
    { name: "Releases", path: "/releases" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Not found (404)", path: "/this-page-does-not-exist" },
  ];

  return (
    <section className="py-12">
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">
        Development only
      </p>
      <h1 className="mt-3 text-4xl font-black uppercase tracking-tight">
        Dev gallery
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Every screen at desktop and phone width, with live data from Supabase.
        This page returns 404 on the live site.
      </p>

      <nav aria-label="Screens" className="mt-6 flex flex-wrap gap-2 text-sm">
        {screens.map((s) => (
          <a
            key={s.path}
            href={`#${s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            className="rounded-full border border-line px-3 py-1 hover:border-accent hover:text-accent"
          >
            {s.name}
          </a>
        ))}
      </nav>

      <div className="mt-10 flex flex-col gap-14">
        {screens.map((s) => (
          <article
            key={s.path}
            id={s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
            className="scroll-mt-28 border-t border-line pt-6"
          >
            <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h2 className="text-xl font-black uppercase tracking-tight">{s.name}</h2>
              <a href={s.path} target="_blank" className="font-mono text-sm text-muted hover:text-accent">
                {s.path} ↗
              </a>
              {s.note && <span className="text-sm text-muted">({s.note})</span>}
            </header>
            <div className="mt-4 flex flex-wrap items-start gap-6">
              <Frame path={s.path} label="Desktop" size={DESKTOP} />
              <Frame path={s.path} label="Phone" size={PHONE} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
