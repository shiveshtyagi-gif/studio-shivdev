/**
 * Hero-only mode. While true, the site shows just the home page's premiere
 * hero: every other page redirects to the home page, the header and footer
 * hide their page links, and the sections below the hero are skipped.
 *
 * Nothing is deleted. To bring the whole site back, set this to false and
 * push; the artists, releases, about and contact pages work again.
 */
export const HERO_ONLY = true;

/** The pages that redirect home in hero-only mode (used by next.config.ts). */
export const HERO_ONLY_REDIRECTS = [
  "/artists",
  "/artists/:path*",
  "/releases",
  "/about",
  "/contact",
  "/dev/:path*",
];
