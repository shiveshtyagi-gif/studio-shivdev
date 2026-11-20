import type { Metadata } from "next";
import { getArtists } from "@/lib/data";
import { ArtistCard, EmptyState } from "@/components/Cards";

export const metadata: Metadata = {
  title: "Artists",
  description: "Meet the artists signed to Studio Shivdev.",
};

export default async function ArtistsPage() {
  const artists = await getArtists();

  return (
    <section className="py-16">
      <h1 className="text-4xl font-black uppercase tracking-tight">Artists</h1>
      <p className="mt-3 max-w-xl text-muted">
        The voices and producers behind Studio Shivdev.
      </p>
      <div className="mt-10">
        {artists.length > 0 ? (
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
            {artists.map((a) => (
              <ArtistCard key={a.id} artist={a} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Roster announcement coming soon"
            body="We're putting the finishing touches on our artist roster."
          />
        )}
      </div>
    </section>
  );
}
