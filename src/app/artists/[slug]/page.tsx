import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  getArtist,
  getArtists,
  getReleasesByArtist,
  spotifyEmbedUrl,
} from "@/lib/data";
import { Artwork, EmptyState, NewTabHint, ReleaseCard } from "@/components/Cards";

// Cache Components needs at least one slug to prerender. Until the first
// artist is added, a placeholder slug prerenders the "not found" page.
export async function generateStaticParams() {
  const artists = await getArtists();
  return artists.length > 0
    ? artists.map((a) => ({ slug: a.slug }))
    : [{ slug: "coming-soon" }];
}

export async function generateMetadata(
  props: PageProps<"/artists/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const artist = await getArtist(slug);
  if (!artist) return { title: "Artist not found" };
  return {
    title: artist.name,
    description: artist.bio?.slice(0, 160) ?? `${artist.name} on Studio Shivdev.`,
    openGraph: artist.photo_url ? { images: [artist.photo_url] } : undefined,
  };
}

async function ArtistDetails({ params }: Pick<PageProps<"/artists/[slug]">, "params">) {
  const { slug } = await params;
  const artist = await getArtist(slug);
  if (!artist) notFound();

  const releases = await getReleasesByArtist(artist.id);
  const embed = spotifyEmbedUrl(artist.spotify_url);
  const socials = [
    { label: "Spotify", url: artist.spotify_url },
    { label: "YouTube", url: artist.youtube_url },
    { label: "Instagram", url: artist.instagram_url },
  ].filter((s): s is { label: string; url: string } => Boolean(s.url));

  return (
    <>
      {/* Hero: centred like a product page */}
      <section className="ds-tile pb-10">
        <div className="mx-auto w-40 overflow-hidden rounded-full sm:w-52">
          <Artwork src={artist.photo_url} alt={artist.name} rounded="rounded-full" eager />
        </div>
        <h1 className="mt-6 ds-display">{artist.name}</h1>
        {artist.bio && (
          <p className="mx-auto mt-4 max-w-2xl whitespace-pre-line ds-lead">{artist.bio}</p>
        )}
        {socials.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener" className="ds-chip">
                {s.label}
                <NewTabHint />
              </a>
            ))}
          </div>
        )}
      </section>

      {embed && (
        <section className="ds-container pb-12">
          <iframe
            title={`${artist.name} on Spotify`}
            src={embed}
            className="mx-auto h-[352px] w-full max-w-3xl rounded-[18px] border-0"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </section>
      )}

      <section className="ds-tile ds-tile-grey text-left">
        <div className="ds-container">
          <h2 className="ds-headline">Releases.</h2>
          <div className="mt-8">
            {releases.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
                {releases.map((r) => (
                  <ReleaseCard key={r.id} release={r} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="New music on the way."
                body={`${artist.name}'s first Studio Shivdev release is coming soon.`}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

/** Placeholder in the shape of the artist page while it loads. */
function ArtistSkeleton() {
  const block = "bg-surface-2 motion-safe:animate-pulse";
  return (
    <div role="status" className="ds-tile flex flex-col items-center gap-5">
      <span className="sr-only">Loading artist</span>
      <div aria-hidden className={`size-40 rounded-full sm:size-52 ${block}`} />
      <div aria-hidden className={`h-14 w-2/3 max-w-md rounded-2xl ${block}`} />
      <div aria-hidden className={`h-5 w-5/6 max-w-xl rounded-full ${block}`} />
    </div>
  );
}

export default function ArtistPage(props: PageProps<"/artists/[slug]">) {
  return (
    <>
      <div className="ds-container pt-4">
        <Link href="/artists" className="ds-link-sm text-[14px]">
          <span aria-hidden>‹</span> All artists
        </Link>
      </div>
      <Suspense fallback={<ArtistSkeleton />}>
        <ArtistDetails params={props.params} />
      </Suspense>
    </>
  );
}
