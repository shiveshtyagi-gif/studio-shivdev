import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-28 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-4 text-3xl font-black uppercase tracking-tight">
        This page isn&apos;t here
      </h1>
      <p className="mt-3 text-muted">It may have moved, or the link may be wrong.</p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full border border-line px-5 py-2.5 text-sm font-semibold hover:border-foreground"
      >
        Back to home
      </Link>
    </section>
  );
}
