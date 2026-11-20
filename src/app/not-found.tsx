import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-28 text-center">
      <p className="ds-eyebrow">404</p>
      <h1 className="mt-4 ds-h1 text-3xl">
        This page isn&apos;t here
      </h1>
      <p className="mt-3 text-muted">It may have moved, or the link may be wrong.</p>
      <Link
        href="/"
        className="mt-8 ds-btn-secondary"
      >
        Back to home
      </Link>
    </section>
  );
}
