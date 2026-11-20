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
import { EmptyState, ReleaseCard } from "@/components/Cards";

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
      <div className="grid gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:items-start">
        {artist.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={artist.photo_url}
            alt={artist.name}
            className="aspect-square w-full rounded-2xl object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="grid aspect-square w-full place-items-center rounded-2xl bg-gradient-to-br from-surface-2 to-surface text-7xl font-semibold text-muted"
          >
            {artist.name.charAt(0)}
          </div>
        )}
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
            {artist.name}
          </h1>
          {artist.bio && (
            <p className="mt-5 whitespace-pre-line leading-relaxed text-muted">
              {artist.bio}
            </p>
          )}
          {socials.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener"
                  className="rounded-full border border-line px-4 py-1.5 text-sm hover:border-accent hover:text-accent"
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}
          {embed && (
            <iframe
              title={`${artist.name} on Spotify`}
              src={embed}
              className="mt-8 h-[352px] w-full rounded-xl border-0"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          )}
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-black uppercase tracking-tight">Releases</h2>
        <div className="mt-6">
          {releases.length > 0 ? (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {releases.map((r) => (
                <ReleaseCard key={r.id} release={r} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="New music on the way"
              body={`${artist.name}'s first Studio Shivdev release is coming soon.`}
            />
          )}
        </div>
      </section>
    </>
  );
}

export default function ArtistPage(props: PageProps<"/artists/[slug]">) {
  return (
    <section className="py-16">
      <Link href="/artists" className="text-sm text-muted hover:text-accent">
        ← All artists
      </Link>
      <div className="mt-8">
        <Suspense fallback={<p className="text-muted">Loading artist…</p>}>
          <ArtistDetails params={props.params} />
        </Suspense>
      </div>
    </section>
  );
}
