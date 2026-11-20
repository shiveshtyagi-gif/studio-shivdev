import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Studio Shivdev, an independent music label.",
};

// Placeholder copy: replace with the label's own story.
const values = [
  {
    title: "Artists first",
    body: "Fair deals, clear terms, and artists who keep their creative voice.",
  },
  {
    title: "Made with care",
    body: "Every release gets proper production, mixing and artwork.",
  },
  {
    title: "Heard everywhere",
    body: "Distribution to Spotify, YouTube, Apple Music and every major platform.",
  },
];

export default function AboutPage() {
  return (
    <section className="py-16">
      <div className="grid items-center gap-12 md:grid-cols-[1.2fr_1fr]">
        <div>
          <h1 className="ds-h1">About</h1>
          <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
            <p>
              Studio Shivdev is an independent music label built to give new
              artists a home: a place to record, release and grow an audience.
            </p>
            <p>
              We work closely with a small roster, from the first demo to the
              release day, and stay with our artists for the long run.
            </p>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/studio-shivdev-logo.png"
          alt="Studio Shivdev"
          width={1110}
          height={850}
          className="mx-auto w-full max-w-sm"
        />
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {values.map((v) => (
          <div
            key={v.title}
            className="ds-card"
          >
            <h2 className="font-semibold">{v.title}</h2>
            <p className="mt-2 text-sm text-muted">{v.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 ds-panel">
        <h2 className="ds-h2">
          Making music?
        </h2>
        <p className="mt-2 max-w-xl text-muted">
          We listen to every demo we receive. Send us a link to your music.
        </p>
        <Link
          href="/contact"
          className="mt-6 ds-btn-primary"
        >
          Get in touch
        </Link>
      </div>
    </section>
  );
}
