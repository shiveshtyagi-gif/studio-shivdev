import Link from "next/link";
import { getArtists, getReleases, releaseTypeLabel, type Release } from "@/lib/data";
import { Artwork, ArtistCard, Chevron, EmptyState, platformsOf } from "@/components/Cards";
import { HeroCarousel } from "@/components/HeroCarousel";
import { PremiereHero } from "@/components/PremiereHero";
import { HERO_ONLY } from "@/lib/site";

/** Links under a featured release: "Listen on … ›" plus a link to the artist. */
function ReleaseLinks({ release, size = "lg" }: { release: Release; size?: "lg" | "sm" }) {
  const listen = platformsOf(release)[0];
  const cls = size === "lg" ? "ds-link" : "ds-link-sm";
  return (
    <div className="mt-3 flex flex-wrap items-center justify-center gap-x-8">
      {listen ? (
        <a href={listen.url} target="_blank" rel="noopener" className={cls}>
          Listen on {listen.label} <Chevron />
          <span className="sr-only"> (opens in new tab)</span>
        </a>
      ) : (
        <span className="inline-flex min-h-11 items-center text-muted">Out soon</span>
      )}
      {release.artist && (
        <Link href={`/artists/${release.artist.slug}`} className={cls}>
          About {release.artist.name} <Chevron />
        </Link>
      )}
    </div>
  );
}

function kindOf(release: Release) {
  return release.type ? `New ${releaseTypeLabel[release.type].toLowerCase()}` : "New release";
}

export default async function Home() {
  // Hero-only mode (src/lib/site.ts): show just the premiere hero and skip
  // everything below it, including its database reads.
  if (HERO_ONLY) return <PremiereHero />;

  const [releases, artists] = await Promise.all([getReleases(3), getArtists()]);
  const [featured, ...rest] = releases;

  return (
    <>
      {/* Hero: four slides looping every 5 seconds */}
      <HeroCarousel />

      {/* Featured release */}
      {featured ? (
        <section className="ds-tile ds-tile-grey">
          <p className="ds-eyebrow">{kindOf(featured)}</p>
          <h2 className="mt-1 ds-headline">{featured.title}</h2>
          {featured.artist && <p className="mt-2 ds-subhead text-muted">by {featured.artist.name}</p>}
          <ReleaseLinks release={featured} />
          <div className="mx-auto mt-10 w-full max-w-[420px] overflow-hidden rounded-[28px] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.35)]">
            <Artwork src={featured.cover_url} alt={`${featured.title} cover art`} rounded="rounded-[28px]" eager />
          </div>
        </section>
      ) : (
        <section className="ds-tile ds-tile-grey">
          <div className="ds-container">
            <EmptyState
              title="First releases coming soon."
              body="Our debut releases are on the way. Check back shortly."
            />
          </div>
        </section>
      )}

      {/* Two-up releases */}
      {rest.length > 0 && (
        <section className="grid gap-3 p-3 md:grid-cols-2">
          {rest.map((r, i) => (
            <div
              key={r.id}
              className={`ds-tile ${i % 2 === 0 ? "ds-dark" : "ds-tile-grey"} flex flex-col items-center`}
            >
              <p className="ds-eyebrow">{kindOf(r)}</p>
              <h2 className="mt-1 ds-h2">{r.title}</h2>
              {r.artist && <p className="mt-1 text-[19px] text-muted">by {r.artist.name}</p>}
              <ReleaseLinks release={r} size="sm" />
              <div className="mt-8 w-full max-w-[300px] overflow-hidden rounded-[22px]">
                <Artwork src={r.cover_url} alt={`${r.title} cover art`} rounded="rounded-[22px]" />
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Artists */}
      {artists.length > 0 && (
        <section className="py-16 sm:py-24">
          <div className="ds-container">
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
              <h2 className="ds-headline">Meet the artists.</h2>
              <Link href="/artists" className="ds-link-sm">
                All artists <Chevron />
              </Link>
            </div>
            <div className="mt-8 ds-scroller">
              {artists.map((a) => (
                <div key={a.id} className="w-[260px] shrink-0 snap-start sm:w-[300px]">
                  <ArtistCard artist={a} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to action */}
      <section className="ds-dark ds-tile">
        <h2 className="ds-headline">Making music?</h2>
        <p className="mx-auto mt-3 max-w-xl ds-subhead text-muted">
          We listen to every demo we receive.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <Link href="/contact" className="ds-btn-primary">
            Send us your music
          </Link>
          <Link href="/about" className="ds-link">
            About the label <Chevron />
          </Link>
        </div>
      </section>
    </>
  );
}
