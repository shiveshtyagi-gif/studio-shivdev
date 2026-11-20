import Link from "next/link";
import {
  type Artist,
  type Release,
  formatReleaseDate,
  releaseTypeLabel,
} from "@/lib/data";

type HeadingLevel = "h2" | "h3";

/** Visible ↗ plus screen-reader text for links that open a new tab. */
export function NewTabHint() {
  return (
    <>
      <span aria-hidden> ↗</span>
      <span className="sr-only"> (opens in new tab)</span>
    </>
  );
}

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

/**
 * One release in a grid. The cover and title open the first available
 * platform; each platform also has its own link. `as` sets the title's
 * heading level so the page outline never skips a level.
 */
export function ReleaseCard({
  release,
  as: Heading = "h3",
}: {
  release: Release;
  as?: HeadingLevel;
}) {
  const platforms = [
    { label: "Spotify", url: release.spotify_url },
    { label: "YouTube", url: release.youtube_url },
    { label: "Apple Music", url: release.apple_music_url },
  ].filter((p): p is { label: string; url: string } => Boolean(p.url));
  const listen = platforms[0];
  const meta = [
    release.type ? releaseTypeLabel[release.type] : null,
    formatReleaseDate(release.release_date),
  ]
    .filter(Boolean)
    .join(" · ");

  const coverAndTitle = (
    <>
      <span className="block overflow-hidden rounded-xl">
        <span className="block transition-transform duration-300 motion-safe:group-hover/cover:scale-[1.03]">
          <Artwork src={release.cover_url} alt="" />
        </span>
      </span>
      <Heading className="mt-3 font-semibold leading-snug group-hover/cover:text-accent">
        {release.title}
      </Heading>
    </>
  );

  return (
    <article>
      {listen ? (
        <a
          href={listen.url}
          target="_blank"
          rel="noopener"
          className="group/cover block rounded-xl"
          aria-label={`${release.title}: listen on ${listen.label} (opens in new tab)`}
        >
          {coverAndTitle}
        </a>
      ) : (
        coverAndTitle
      )}
      {release.artist && (
        <Link
          href={`/artists/${release.artist.slug}`}
          className="inline-flex min-h-6 items-center text-sm text-muted hover:text-accent"
        >
          {release.artist.name}
        </Link>
      )}
      <p className="text-xs text-muted">{meta}</p>
      <div className="mt-1 flex flex-wrap gap-x-4 text-sm font-medium">
        {platforms.map((p) => (
          <a
            key={p.label}
            href={p.url}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-8 items-center text-accent hover:underline"
          >
            {p.label}
            <NewTabHint />
          </a>
        ))}
        {!listen && (
          <span className="inline-flex min-h-8 items-center text-xs text-muted">
            Links coming soon
          </span>
        )}
      </div>
    </article>
  );
}

export function ArtistCard({
  artist,
  as: Heading = "h3",
}: {
  artist: Artist;
  as?: HeadingLevel;
}) {
  return (
    <Link href={`/artists/${artist.slug}`} className="group block rounded-xl">
      <Artwork src={artist.photo_url} alt="" rounded="rounded-full" />
      <Heading className="mt-3 text-center font-semibold group-hover:text-accent">
        {artist.name}
      </Heading>
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
