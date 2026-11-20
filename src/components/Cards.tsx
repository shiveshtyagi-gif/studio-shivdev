import Link from "next/link";
import {
  type Artist,
  type Release,
  formatReleaseDate,
  releaseTypeLabel,
} from "@/lib/data";

/** Square image with a lettered placeholder when no image is set. */
function Artwork({
  src,
  alt,
  rounded = "rounded-xl",
}: {
  src: string | null;
  alt: string;
  rounded?: string;
}) {
  if (!src) {
    return (
      <div
        aria-hidden
        className={`grid aspect-square w-full place-items-center bg-gradient-to-br from-surface-2 to-surface text-4xl font-semibold text-muted ${rounded}`}
      >
        {alt.charAt(0).toUpperCase()}
      </div>
    );
  }
  return (
    // Plain <img> keeps images off Vercel's image-optimisation quota.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`aspect-square w-full object-cover ${rounded}`}
    />
  );
}

export function ReleaseCard({ release }: { release: Release }) {
  const listen =
    release.spotify_url ?? release.youtube_url ?? release.apple_music_url;
  const meta = [
    release.type ? releaseTypeLabel[release.type] : null,
    formatReleaseDate(release.release_date),
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="group">
      <Artwork src={release.cover_url} alt={release.title} />
      <h3 className="mt-3 font-semibold leading-snug">{release.title}</h3>
      {release.artist && (
        <Link
          href={`/artists/${release.artist.slug}`}
          className="text-sm text-muted hover:text-accent"
        >
          {release.artist.name}
        </Link>
      )}
      <p className="mt-1 text-xs text-muted">{meta}</p>
      <div className="mt-2 flex flex-wrap gap-x-3 text-xs font-medium">
        {release.spotify_url && (
          <a href={release.spotify_url} target="_blank" rel="noopener" className="text-accent hover:underline">
            Spotify
          </a>
        )}
        {release.youtube_url && (
          <a href={release.youtube_url} target="_blank" rel="noopener" className="text-accent hover:underline">
            YouTube
          </a>
        )}
        {release.apple_music_url && (
          <a href={release.apple_music_url} target="_blank" rel="noopener" className="text-accent hover:underline">
            Apple Music
          </a>
        )}
        {!listen && <span className="text-muted">Links coming soon</span>}
      </div>
    </article>
  );
}

export function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link href={`/artists/${artist.slug}`} className="group block">
      <Artwork src={artist.photo_url} alt={artist.name} rounded="rounded-full" />
      <h3 className="mt-3 text-center font-semibold group-hover:text-accent">
        {artist.name}
      </h3>
    </Link>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-line px-6 py-12 text-center">
      <p className="font-semibold">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">{body}</p>
    </div>
  );
}
