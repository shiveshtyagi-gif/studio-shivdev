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
    <section className="py-16">
      <h1 className="ds-h1">Releases</h1>
      <p className="mt-3 max-w-xl text-muted">
        Singles, EPs and albums, newest first. Tap a link to listen on your
        favourite platform.
      </p>
      <div className="mt-10">
        {releases.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {releases.map((r) => (
              <ReleaseCard key={r.id} release={r} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="First releases coming soon"
            body="Our debut releases are on the way. Check back shortly."
          />
        )}
      </div>
    </section>
  );
}
