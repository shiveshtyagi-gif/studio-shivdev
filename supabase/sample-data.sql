-- Studio Shivdev: SAMPLE data for previewing the site.
-- These artists and releases are made up. Remove them before launch by
-- running supabase/remove-sample-data.sql.
-- Paste into Supabase > SQL Editor and click Run. Safe to run more than once.

insert into artists (name, slug, bio, photo_url)
values
  ('Aarav Sen', 'sample-aarav-sen',
   'SAMPLE ARTIST. Singer-songwriter blending acoustic guitar with late-night electronic textures.',
   'https://picsum.photos/seed/shivdev-aarav/600'),
  ('Meera Kaul', 'sample-meera-kaul',
   'SAMPLE ARTIST. Classically trained vocalist reworking ragas over modern beats.',
   'https://picsum.photos/seed/shivdev-meera/600'),
  ('Night Ghat', 'sample-night-ghat',
   'SAMPLE ARTIST. Producer duo making slow, atmospheric instrumentals.',
   'https://picsum.photos/seed/shivdev-ghat/600')
on conflict (slug) do nothing;

insert into releases (title, slug, artist_id, release_date, type, cover_url)
select r.title, r.slug, a.id, r.release_date::date, r.type, r.cover_url
from (values
  ('Monsoon Letters', 'sample-monsoon-letters', 'sample-aarav-sen', '2026-10-24', 'ep',
   'https://picsum.photos/seed/shivdev-monsoon/600'),
  ('Paper Boats', 'sample-paper-boats', 'sample-aarav-sen', '2026-06-12', 'single',
   'https://picsum.photos/seed/shivdev-boats/600'),
  ('Raag at Dawn', 'sample-raag-at-dawn', 'sample-meera-kaul', '2026-09-05', 'single',
   'https://picsum.photos/seed/shivdev-raag/600'),
  ('Sur', 'sample-sur', 'sample-meera-kaul', '2026-03-20', 'album',
   'https://picsum.photos/seed/shivdev-sur/600'),
  ('Lanterns on the River', 'sample-lanterns', 'sample-night-ghat', '2026-11-14', 'single',
   'https://picsum.photos/seed/shivdev-lanterns/600')
) as r(title, slug, artist_slug, release_date, type, cover_url)
join artists a on a.slug = r.artist_slug
on conflict (slug) do nothing;
