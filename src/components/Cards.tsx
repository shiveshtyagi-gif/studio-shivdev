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

/** The "›" after a chevron link, hidden from screen readers. */
export function Chevron() {
  return <span aria-hidden>›</span>;
}

/** Square image with a lettered placeholder when no image is set. */
export function Artwork({
  src,
  alt,
  rounded = "rounded-[18px]",
  eager = false,
}: {
  src: string | null;
  alt: string;
  rounded?: string;
  eager?: boolean;
}) {
  if (!src) {
    return (
      <div
        aria-hidden
        className={`grid aspect-square w-full place-items-center bg-surface-2 text-5xl font-semibold text-muted ${rounded}`}
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
      loading={eager ? "eager" : "lazy"}
      className={`aspect-square w-full object-cover ${rounded}`}
    />
  );
}

export function platformsOf(release: Release) {
  return [
    { label: "Spotify", url: release.spotify_url },
    { label: "YouTube", url: release.youtube_url },
    { label: "Apple Music", url: release.apple_music_url },
  ].filter((p): p is { label: string; url: string } => Boolean(p.url));
}

export function releaseMeta(release: Release) {
  return [
    release.type ? releaseTypeLabel[release.type] : null,
    formatReleaseDate(release.release_date),
  ]
    .filter(Boolean)
    .join(" · ");
}

/**
 * One release in a grid or scroller. The cover and title open the first
 * available platform. `as` sets the title's heading level.
 */
export function ReleaseCard({
  release,
  as: Heading = "h3",
}: {
  release: Release;
  as?: HeadingLevel;
}) {
  const platforms = platformsOf(release);
  const listen = platforms[0];

  const coverAndTitle = (
    <>
      <span className="block overflow-hidden rounded-[18px] bg-surface">
        <span className="block transition-transform duration-500 motion-safe:group-hover/cover:scale-[1.03]">
          <Artwork src={release.cover_url} alt="" />
        </span>
      </span>
      <Heading className="mt-4 text-[17px] leading-snug font-semibold">{release.title}</Heading>
    </>
  );

  return (
    <article className="text-left">
      {listen ? (
        <a
          href={listen.url}
          target="_blank"
          rel="noopener"
          className="group/cover block rounded-[18px]"
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
          className="inline-flex min-h-6 items-center text-[14px] text-muted hover:text-foreground hover:underline"
        >
          {release.artist.name}
        </Link>
      )}
      <p className="text-[12px] text-muted">{releaseMeta(release)}</p>
      <div className="mt-1 flex flex-wrap gap-x-4 text-[14px]">
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
          <span className="inline-flex min-h-8 items-center text-[12px] text-muted">
            Links coming soon
          </span>
        )}
      </div>
    </article>
  );
}

/** One artist: a large rounded photo card with the name and a chevron link. */
export function ArtistCard({
  artist,
  as: Heading = "h3",
}: {
  artist: Artist;
  as?: HeadingLevel;
}) {
  return (
    <Link href={`/artists/${artist.slug}`} className="group block rounded-[28px] text-left">
      <span className="block overflow-hidden rounded-[28px] bg-surface">
        <span className="block transition-transform duration-500 motion-safe:group-hover:scale-[1.03]">
          <Artwork src={artist.photo_url} alt="" rounded="rounded-[28px]" />
        </span>
      </span>
      <Heading className="mt-4 text-[21px] leading-tight font-semibold">{artist.name}</Heading>
      <span className="mt-1 inline-flex items-center gap-1 text-[14px] text-accent group-hover:underline">
        View artist <Chevron />
      </span>
    </Link>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="ds-panel">
      <p className="ds-h3">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-muted">{body}</p>
    </div>
  );
}
