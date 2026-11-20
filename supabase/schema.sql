-- Studio Shivdev: database setup
-- Paste this whole file into Supabase > SQL Editor > New query, then click Run.
-- Safe to run more than once.

-- ---------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------

-- Artists signed to the label
create table if not exists artists (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,          -- used in the URL, e.g. /artists/shivdev
  bio text,
  photo_url text,
  instagram_url text,
  spotify_url text,
  youtube_url text,
  created_at timestamptz not null default now()
);

-- Singles, EPs and albums
create table if not exists releases (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,          -- used in the URL, e.g. /releases/first-light
  artist_id uuid references artists(id) on delete cascade,
  release_date date,
  type text check (type in ('single', 'ep', 'album')),
  cover_url text,
  spotify_url text,
  youtube_url text,
  apple_music_url text,
  created_at timestamptz not null default now()
);

create index if not exists releases_artist_id_idx on releases (artist_id);
create index if not exists releases_release_date_idx on releases (release_date desc);

-- Messages sent from the contact form
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------
-- Row Level Security: who can read or write each table
-- ---------------------------------------------------------------

alter table artists enable row level security;
alter table releases enable row level security;
alter table contact_messages enable row level security;

-- Anyone visiting the site can view artists and releases.
drop policy if exists "Public read artists" on artists;
create policy "Public read artists" on artists
  for select to anon, authenticated using (true);

drop policy if exists "Public read releases" on releases;
create policy "Public read releases" on releases
  for select to anon, authenticated using (true);

-- Anyone can send a message, within sensible lengths.
-- Nobody can read messages through the website; you read them in the Table Editor.
drop policy if exists "Public insert messages" on contact_messages;
create policy "Public insert messages" on contact_messages
  for insert to anon, authenticated
  with check (
    char_length(name) between 1 and 100
    and char_length(email) between 3 and 200
    and email like '%@%'
    and char_length(message) between 1 and 5000
  );

-- ---------------------------------------------------------------
-- Storage: a public bucket for artist photos and cover art
-- ---------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;
