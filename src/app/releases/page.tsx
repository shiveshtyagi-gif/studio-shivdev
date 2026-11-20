import type { Metadata } from "next";
import { getReleases } from "@/lib/data";
import { EmptyState, ReleaseCard } from "@/components/Cards";

export const metadata: Metadata = {
  title: "Releases",
  description: "Singles, EPs and albums released by Studio Shivdev.",
};

export default async function ReleasesPage() {
  const releases = await getReleases();

  return (
    <>
      <section className="ds-tile pb-8 sm:pb-10">
        <h1 className="ds-display">Releases.</h1>
        <p className="mx-auto mt-4 max-w-xl ds-lead">
          Singles, EPs and albums, newest first. Tap a cover to listen.
        </p>
      </section>
      <section className="ds-container pb-20">
        {releases.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {releases.map((r) => (
              <ReleaseCard key={r.id} release={r} as="h2" />
            ))}
          </div>
        ) : (
          <EmptyState
            title="First releases coming soon."
            body="Our debut releases are on the way. Check back shortly."
          />
        )}
      </section>
    </>
  );
}
