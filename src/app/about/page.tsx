import type { Metadata } from "next";
import Link from "next/link";
import { Chevron } from "@/components/Cards";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Studio Shivdev, an independent music label.",
};

// Placeholder copy: replace with the label's own story.
const values = [
  {
    title: "Artists first.",
    body: "Fair deals, clear terms, and artists who keep their creative voice.",
  },
  {
    title: "Made with care.",
    body: "Every release gets proper production, mixing and artwork.",
  },
  {
    title: "Heard everywhere.",
    body: "Distribution to Spotify, YouTube, Apple Music and every major platform.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* The full logo has a white wordmark, so it sits on black. */}
      <section className="ds-dark ds-tile">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/studio-shivdev-logo.png"
          alt="Studio Shivdev"
          width={1110}
          height={850}
          className="mx-auto w-56 sm:w-72"
        />
        <h1 className="mt-10 ds-headline">A home for new artists.</h1>
        <p className="mx-auto mt-4 max-w-2xl ds-lead">
          Studio Shivdev is an independent music label built to give new artists a
          place to record, release and grow an audience.
        </p>
      </section>

      <section className="ds-tile">
        <p className="mx-auto max-w-3xl text-[28px] leading-[1.14] font-semibold tracking-[-0.015em] sm:text-[40px] sm:leading-[1.1]">
          We work closely with a small roster, from the first demo to release day,
          and stay with our artists for the long run.
        </p>
      </section>

      <section className="ds-container grid gap-5 pb-20 sm:grid-cols-3">
        {values.map((v) => (
          <div key={v.title} className="ds-card">
            <h2 className="ds-h3">{v.title}</h2>
            <p className="mt-2 text-muted">{v.body}</p>
          </div>
        ))}
      </section>

      <section className="ds-tile ds-tile-grey">
        <h2 className="ds-headline">Making music?</h2>
        <p className="mx-auto mt-3 max-w-xl ds-subhead text-muted">
          We listen to every demo we receive.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <Link href="/contact" className="ds-btn-primary">
            Get in touch
          </Link>
          <Link href="/artists" className="ds-link">
            Meet the artists <Chevron />
          </Link>
        </div>
      </section>
    </>
  );
}
