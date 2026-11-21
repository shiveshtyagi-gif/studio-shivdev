import { premiere } from "@/lib/premiere";
import { PremiereStatus } from "@/components/PremiereStatus";

/** Home page top: the latest release, with its poster and a YouTube link. */
export function PremiereHero() {
  const { title, youtubeUrl, startsAt, startsAtLabel, poster } = premiere;
  return (
    <section className="ds-dark ds-tile relative isolate">
      {/* Soft red glow behind the poster, echoing its neon. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 mx-auto h-[70%] max-w-[1100px] rounded-full bg-brand-red/25 blur-[120px]"
      />

      <div className="ds-rise">
        <p className="ds-eyebrow">New release · Music video</p>
        <h1 className="mt-2 ds-display">{title}.</h1>
        <p className="mx-auto mt-3 max-w-2xl ds-subhead">Some wounds don&rsquo;t make a sound.</p>
        <p className="mx-auto mt-4 max-w-xl ds-lead">
          Studio Shivdev presents a story of love, trust and the person who breaks it. Watch the
          world premiere on YouTube and be there the moment it drops.
        </p>
        <PremiereStatus startsAt={startsAt} startsAtLabel={startsAtLabel} url={youtubeUrl} />
      </div>

      <a
        href={youtubeUrl}
        target="_blank"
        rel="noopener"
        className="group relative mx-auto mt-12 block w-full max-w-[1068px] overflow-hidden rounded-[22px] shadow-[0_40px_100px_-30px_rgb(233_29_36/0.55)] sm:mt-16 sm:rounded-[28px]"
      >
        {/* Plain <img> keeps images off Vercel's image-optimisation quota. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster.large}
          srcSet={`${poster.small} 960w, ${poster.large} 1920w`}
          sizes="(min-width: 1110px) 1068px, calc(100vw - 40px)"
          width={poster.width}
          height={poster.height}
          alt={poster.alt}
          loading="eager"
          fetchPriority="high"
          className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none"
        />
        <span className="absolute inset-0 grid place-items-center bg-black/0 transition-colors group-hover:bg-black/20">
          <span className="grid size-16 place-items-center rounded-full bg-white/90 shadow-lg backdrop-blur transition-transform group-hover:scale-110 sm:size-20 motion-reduce:transition-none">
            <svg viewBox="0 0 24 24" className="ml-1 size-7 fill-brand-red sm:size-8" aria-hidden>
              <path d="M8 5.5v13l10.5-6.5L8 5.5Z" />
            </svg>
          </span>
        </span>
        <span className="sr-only">Watch {title} on YouTube (opens in new tab)</span>
      </a>
    </section>
  );
}
