import Link from "next/link";
import { getArtists, getReleases } from "@/lib/data";
import { ArtistCard, EmptyState, ReleaseCard } from "@/components/Cards";

export default async function Home() {
  const [releases, artists] = await Promise.all([
    getReleases(4),
    getArtists(),
  ]);

  return (
    <>
      <section className="py-20 sm:py-28">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Independent music label
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
          New sounds from Studio Shivdev.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          We find, record and release music by independent artists. Explore
          our roster and listen to the latest releases.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/releases"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink hover:opacity-90"
          >
            Listen to releases
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold hover:border-foreground"
          >
            Send us your music
          </Link>
        </div>
      </section>

      <section className="py-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Latest releases
          </h2>
          {releases.length > 0 && (
            <Link href="/releases" className="text-sm text-muted hover:text-foreground">
              All releases →
            </Link>
          )}
        </div>
        <div className="mt-6">
          {releases.length > 0 ? (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {releases.map((r) => (
                <ReleaseCard key={r.id} release={r} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="First releases coming soon"
              body="Our debut releases are on the way. Check back shortly."
            />
          )}
        </div>
      </section>

      {artists.length > 0 && (
        <section className="py-10">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight">Artists</h2>
            <Link href="/artists" className="text-sm text-muted hover:text-foreground">
              All artists →
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
            {artists.slice(0, 5).map((a) => (
              <ArtistCard key={a.id} artist={a} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
