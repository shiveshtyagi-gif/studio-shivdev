import Link from "next/link";
import { Chevron } from "@/components/Cards";

export default function NotFound() {
  return (
    <section className="ds-tile py-28">
      <p className="ds-eyebrow">404</p>
      <h1 className="mt-2 ds-headline">This page isn&apos;t here.</h1>
      <p className="mx-auto mt-3 max-w-md ds-lead">It may have moved, or the link may be wrong.</p>
      <Link href="/" className="mt-6 ds-link">
        Back to home <Chevron />
      </Link>
    </section>
  );
}
