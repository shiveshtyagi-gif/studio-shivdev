import { cacheLife, cacheTag } from "next/cache";
import { supabase } from "@/lib/supabase";

export type Artist = {
  id: string;
  name: string;
  slug: string;
  bio: string | null;
  photo_url: string | null;
  instagram_url: string | null;
  spotify_url: string | null;
  youtube_url: string | null;
};

export type Release = {
  id: string;
  title: string;
  slug: string;
  release_date: string | null;
  type: "single" | "ep" | "album" | null;
  cover_url: string | null;
  spotify_url: string | null;
  youtube_url: string | null;
  apple_music_url: string | null;
  artist: { name: string; slug: string } | null;
};

const ARTIST_FIELDS =
  "id, name, slug, bio, photo_url, instagram_url, spotify_url, youtube_url";
const RELEASE_FIELDS =
  "id, title, slug, release_date, type, cover_url, spotify_url, youtube_url, apple_music_url, artist:artists(name, slug)";

// Every read is cached and refreshed at most about once a minute, so new
// artists and releases added in Supabase show up on the live site quickly
// without a redeploy, while keeping database calls low on the free plans.

export async function getArtists(): Promise<Artist[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("artists");
  const { data, error } = await supabase
    .from("artists")
    .select(ARTIST_FIELDS)
    .order("name");
  if (error) console.error("getArtists:", error.message);
  return (data as Artist[] | null) ?? [];
}

export async function getArtist(slug: string): Promise<Artist | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("artists");
  const { data, error } = await supabase
    .from("artists")
    .select(ARTIST_FIELDS)
    .eq("slug", slug)
    .maybeSingle();
  if (error) console.error("getArtist:", error.message);
  return (data as Artist | null) ?? null;
}

export async function getReleases(limit?: number): Promise<Release[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("releases");
  let query = supabase
    .from("releases")
    .select(RELEASE_FIELDS)
    .order("release_date", { ascending: false, nullsFirst: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) console.error("getReleases:", error.message);
  return (data as unknown as Release[] | null) ?? [];
}

export async function getReleasesByArtist(
  artistId: string,
): Promise<Release[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("releases");
  const { data, error } = await supabase
    .from("releases")
    .select(RELEASE_FIELDS)
    .eq("artist_id", artistId)
    .order("release_date", { ascending: false, nullsFirst: false });
  if (error) console.error("getReleasesByArtist:", error.message);
  return (data as unknown as Release[] | null) ?? [];
}

/** Turns a Spotify share link into its embeddable player URL, or null. */
export function spotifyEmbedUrl(url: string | null): string | null {
  if (!url) return null;
  const match = url.match(
    /open\.spotify\.com\/(?:intl-[a-z]+\/)?(artist|album|track|playlist)\/([A-Za-z0-9]+)/,
  );
  return match ? `https://open.spotify.com/embed/${match[1]}/${match[2]}` : null;
}

export function formatReleaseDate(date: string | null): string {
  if (!date) return "Coming soon";
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const releaseTypeLabel: Record<string, string> = {
  single: "Single",
  ep: "EP",
  album: "Album",
};
