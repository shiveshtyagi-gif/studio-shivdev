/**
 * The release shown in the home page's top showcase.
 * To feature a new release, change these values and drop its poster in
 * public/releases/ (a 1920px and a 960px wide copy).
 */
export const premiere = {
  title: "Betrayal",
  youtubeUrl: "https://youtu.be/7OlT32oFlhU",
  /** Premiere time on YouTube, with its time-zone offset (IST). */
  startsAt: "2026-11-21T17:30:00+05:30",
  /** What the static page says before the browser can work out "today". */
  startsAtLabel: "21 November, 5:30 PM IST",
  poster: {
    large: "/releases/betrayal-poster-1920.jpg",
    small: "/releases/betrayal-poster-960.jpg",
    width: 1920,
    height: 1080,
    alt: "Betrayal poster: Studio Shivdev presents Betrayal, with the two leads lit in red neon.",
  },
};
