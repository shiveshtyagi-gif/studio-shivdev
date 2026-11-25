"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/LogoMark";
import { premiere } from "@/lib/premiere";

const INTERVAL_MS = 5000;

type Slide = {
  eyebrow: string;
  title: string;
  cta: string;
  href: string;
  external?: boolean;
  /** Real picture; slides without one show a placeholder panel. */
  image?: { src: string; srcSet: string; alt: string };
  /** Placeholder panel colour (used until real pictures are added). */
  color: string;
};

// Slide 1 is the Betrayal video; 2 to 4 are placeholders until the real
// pictures and wording arrive. Swap the entries below to change the hero.
const SLIDES: Slide[] = [
  {
    eyebrow: "New release · Music video",
    title: premiere.title,
    cta: "Watch now",
    href: premiere.youtubeUrl,
    external: true,
    image: {
      src: premiere.poster.large,
      srcSet: `${premiere.poster.small} 960w, ${premiere.poster.large} 1920w`,
      alt: premiere.poster.alt,
    },
    color: "#2b0609",
  },
  { eyebrow: "Coming soon", title: "Next single", cta: "See releases", href: "/releases", color: "#141416" },
  { eyebrow: "Spotlight", title: "Meet the artists", cta: "Explore", href: "/artists", color: "#b3141a" },
  { eyebrow: "Open call", title: "Send us your music", cta: "Get in touch", href: "/contact", color: "#222226" },
];

/** Where each slide sits relative to the one in the middle. */
function positionOf(i: number, current: number) {
  return ["center", "right", "back", "left"][(i - current + SLIDES.length) % SLIDES.length];
}

/** Home page top: four slides that loop forever, one every 5 seconds. */
export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [held, setHeld] = useState(false);

  // Advance every 5 seconds. Resting a pointer or keyboard focus on the hero
  // holds it still so a link can be read and clicked; it carries on after.
  useEffect(() => {
    if (held) return;
    const id = setTimeout(() => setCurrent((c) => (c + 1) % SLIDES.length), INTERVAL_MS);
    return () => clearTimeout(id);
  }, [current, held]);

  return (
    <section
      className="ds-dark ds-tile relative isolate overflow-hidden !pb-10 sm:!pb-14"
      aria-roledescription="carousel"
      aria-label="Featured"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 mx-auto h-[60%] max-w-[1100px] rounded-full bg-brand-red/20 blur-[120px]"
      />

      <h1 className="sr-only">Studio Shivdev</h1>

      <div className="hero-stage">
        {SLIDES.map((s, i) => {
          const pos = positionOf(i, current);
          const active = pos === "center";
          return (
            <div
              key={s.title}
              className="hero-card"
              data-pos={pos}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${SLIDES.length}`}
              aria-hidden={!active}
              inert={!active}
            >
              {s.image ? (
                // Plain <img> keeps images off Vercel's image-optimisation quota.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={s.image.src}
                  srcSet={s.image.srcSet}
                  sizes="(min-width: 1110px) 660px, 62vw"
                  alt={s.image.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  className="absolute inset-0 size-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center" style={{ background: s.color }}>
                  <LogoMark className="w-[46%] opacity-20 [&_rect]:fill-white" />
                </div>
              )}
              <div className="hero-shade" aria-hidden />
              <div className="hero-caption">
                <p className="text-[12px] font-medium text-white/85 sm:text-sm">{s.eyebrow}</p>
                <p className="mt-1 text-[22px] font-semibold leading-tight text-white sm:text-4xl">{s.title}</p>
                <Link
                  href={s.href}
                  {...(s.external ? { target: "_blank", rel: "noopener" } : {})}
                  className="mt-3 inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-medium text-black transition-opacity hover:opacity-85 sm:text-base"
                >
                  {s.cta}
                  {s.external && <span className="sr-only"> (opens in new tab)</span>}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center" role="group" aria-label="Choose a slide">
        {SLIDES.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Show slide ${i + 1}: ${s.title}`}
            aria-current={i === current}
            className="ds-tap group grid cursor-pointer place-items-center px-1.5"
          >
            <span className="hero-dot" data-on={i === current} data-held={held}>
              <i key={i === current ? current : "off"} />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
