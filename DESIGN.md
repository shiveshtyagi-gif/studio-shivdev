# Studio Shivdev design system

The Studio Shivdev website uses three colours (logo red, black and white), heavy uppercase type taken from the wordmark, and pill shapes taken from the waveform logo.

- **Source of truth:** [`src/app/design-system.css`](src/app/design-system.css), which holds the tokens, base styles, components and motion.
- **See it live:** `/dev/gallery` shows every screen at desktop and phone width.

Change a token in `design-system.css` and the whole site follows. Don't hard-code hex values or one-off colours in components.

---

## 1. Brand

| Asset | File | Use |
| --- | --- | --- |
| Full logo (waveform + STUDIO / SHIVDEV) | `public/brand/studio-shivdev-logo.png` | About page, link previews. Black backgrounds only (the wordmark is white). |
| Waveform mark (SVG) | `src/components/LogoMark.tsx`: `<LogoMark />` | Hero (with `animated`), anywhere the mark appears alone |
| Header lockup | `<Logo />` in the same file | Header and footer |
| Browser tab icon | `src/app/icon.svg` | Favicon: red mark on a black rounded square |
| Link preview | `src/app/opengraph-image.png` | Shared links on WhatsApp, Instagram, X |

**Logo rules**
- Keep the waveform red (`--brand-red`) on black. Never recolour, stretch, outline or add effects.
- Leave clear space around the mark of at least the width of one bar.
- Minimum size: 24px tall for the mark and 28px for the header lockup.
- `LogoMark` is redrawn from the original logo's exact bar positions. If the logo changes, update the `BARS` table there and `icon.svg`.

---

## 2. Colour

Only three colours. Every grey is white at lower opacity on black, never an extra hue.

| Token | Value | Tailwind class | Use |
| --- | --- | --- | --- |
| `--brand-red` / `--accent` | `#E91D24` | `bg-accent`, `text-accent`, `border-accent` | Logo, primary button, eyebrows, hover states, links, error text |
| `--brand-black` / `--background` | `#000000` | `bg-background` | Page background |
| `--brand-white` / `--foreground` | `#FFFFFF` | `text-foreground` | Headings, body text |
| `--accent-ink` | white | `text-accent-ink` | Text on red |
| `--muted` | white at 68% | `text-muted` | Secondary text, captions, nav links |
| `--border` | white at 14% | `border-line` | Hairlines, card and input borders |
| `--surface` | white at 5% | `bg-surface` | Cards, inputs |
| `--surface-2` | white at 10% | `bg-surface-2` | Raised panels, image placeholders |

**Contrast (WCAG)**

| Pair | Ratio | Result |
| --- | --- | --- |
| White on black | 21:1 | AA / AAA |
| Muted text on black | about 9.4:1 | AA / AAA |
| Red on black (eyebrows, links) | 4.7:1 | AA |
| White on red (primary button) | 4.5:1 (4.49) | At the AA line for small text. Keep button text bold and uppercase, and don't put long or small text on red. |

**Red is for emphasis.** Use one red call to action per view, plus eyebrows and hovers. Big blocks of red compete with the logo.

---

## 3. Typography

| Font | Use |
| --- | --- |
| **Geist Sans** (via `next/font`) | All text |
| **Geist Mono** | Paths and code, for example in the dev gallery |

| Class | Style | Use |
| --- | --- | --- |
| `ds-display` | 48px → 72px, Black (900), uppercase, line-height 0.95 | One per page at most: the home hero |
| `ds-h1` | 36px, Black, uppercase | Page titles (add `sm:text-5xl` for big detail headers) |
| `ds-h2` | 24px, Black, uppercase | Section titles ("Latest releases") |
| `ds-h3` | 20px, Black, uppercase | Sub-sections |
| `ds-eyebrow` | 14px, Bold, uppercase, letter-spacing 0.3em, red | Short label above a title |
| `ds-lead` | 18px, muted | Intro paragraph under a title |
| Body | 16px, regular, white or `text-muted` | Running text |

Headings echo the heavy **SHIVDEV** wordmark: Black weight, uppercase, tight tracking. Body text stays in normal sentence case.

---

## 4. Layout and spacing

- **Page width:** content sits in `max-w-6xl` (1152px), with side padding of 16px on phones and 24px from `sm` up. This is set in `layout.tsx`.
- **Spacing:** Tailwind's 4px scale. Common values are `mt-3` (title → lead), `mt-6`/`mt-8` (blocks), `py-16` (page section) and `mt-14` (major breaks).
- **Grids:** releases use 2 columns on phones and 4 from `md`. Artists use 2 → 3 → 4/5.
- **Breakpoints:** Tailwind defaults (`sm` 640, `md` 768, `lg` 1024). Design for 375px width first.
- **Corners:** `rounded-full` for buttons and chips, `rounded-2xl` for cards and panels, `rounded-xl` for cover art and inputs. Artist photos are circles.

---

## 5. Components

Use the `ds-` classes from `design-system.css`. Add layout utilities next to them (`mt-6`, `self-start`) but not colour or type utilities.

| Component | Class or file | Notes |
| --- | --- | --- |
| Primary button | `ds-btn-primary` | Red pill, white bold uppercase text. Turns white with black text on hover. One per view. |
| Secondary button | `ds-btn-secondary` | White 2px outline pill. Turns red on hover. |
| Chip | `ds-chip` | Small outlined pill for socials, filters and jump links |
| Card | `ds-card` | Faint surface with hairline border, 24px padding |
| Panel | `ds-panel` | Brighter surface for call-to-action blocks, 32px padding |
| Text input / textarea | `ds-input` | Red border on focus |
| Release card | `ReleaseCard` in `src/components/Cards.tsx` | Square cover, title, artist link, type · date, platform links in red |
| Artist card | `ArtistCard` (same file) | Circular photo and name. The name turns red on hover. |
| Empty state | `EmptyState` (same file) | Dashed border box, shown when a list has no items |
| Header / footer | `SiteHeader.tsx`, `SiteFooter.tsx` | Logo lockup and uppercase nav. Links turn red on hover. |

**Example**

```tsx
<p className="ds-eyebrow">Independent music label</p>
<h1 className="mt-4 ds-display">New sounds from Studio Shivdev</h1>
<p className="mt-6 ds-lead">We find, record and release music…</p>
<Link href="/releases" className="mt-8 ds-btn-primary">Listen to releases</Link>
```

---

## 6. Imagery

- **Cover art:** square, at least 1000×1000 px, JPG or WebP, under 500 KB. Shown with `rounded-xl`.
- **Artist photos:** square source, shown as circles. Keep the face centred.
- **Missing image:** a lettered placeholder on `surface-2` appears automatically. Never use a broken image.
- Images use plain `<img>`, not Next.js `<Image>`, to stay off Vercel's image-optimisation quota on the free plan.

---

## 7. Motion

- The hero waveform's bars rise and fall gently (`.wave-bar`, 2.4s, scale 0.8 → 1).
- Colour changes on hover use `transition-colors`. There are no other animations.
- All motion stops for people who turn on **Reduce motion**, via `prefers-reduced-motion`.

---

## 8. Accessibility checklist

- Every image has `alt` text. The decorative logo mark is `aria-hidden`.
- Form fields have visible labels. Errors use `role="alert"`, and success uses `role="status"`.
- Focus is visible: inputs get a red border, and links and buttons keep the browser focus ring.
- Keep red text at 14px or larger. Don't put body paragraphs in red.

---

## 9. Voice

Short, warm, confident. Address artists directly ("Send us your music"). Use sentence case in body text and uppercase only for headings, buttons and nav. Write "Coming soon", not "No data".

---

## 10. Changing the system

1. Edit tokens or components in `src/app/design-system.css`.
2. Update this file to match.
3. Check every screen at `/dev/gallery` (`npm run dev`, then http://localhost:3000/dev/gallery).
4. Run `npm run lint` and `npm run build` before pushing.
