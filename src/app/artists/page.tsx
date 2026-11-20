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
    <>
      <section className="ds-tile pb-8 sm:pb-10">
        <h1 className="ds-display">Artists.</h1>
        <p className="mx-auto mt-4 max-w-xl ds-lead">
          The voices and producers behind Studio Shivdev.
        </p>
      </section>
      <section className="ds-container pb-20">
        {artists.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {artists.map((a) => (
              <ArtistCard key={a.id} artist={a} as="h2" />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Roster announcement coming soon."
            body="We're putting the finishing touches on our artist roster."
          />
        )}
      </section>
    </>
  );
}
