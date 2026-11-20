# Studio Shivdev design system

> **The live site now uses the Apple-style design** (merged from the `apple-style` branch on 21 November 2026).
> It keeps the brand (logo, red/black/white) but uses a light, product-site layout:
>
> - **Pages:** white pages, with black `ds-dark` and light-grey `ds-tile-grey` full-width tiles.
> - **Type:** big centred semibold headlines (`ds-display` 80px, `ds-headline` 56px, `ds-subhead`) in sentence case ending with a full stop ("Releases."), set in the system font (Geist as fallback).
> - **Links and buttons:** chevron links (`ds-link`, "Listen ›") and rounded pill buttons.
> - **Navigation:** a thin 48px translucent nav with small links, and a large-type phone menu.
> - **Components:** rounded cards (18px for covers, 28px for artists) and a swipeable artist row (`ds-scroller`).
> - **Footer:** a quiet grey footer in 12px type, with a hairline on top and the email address.
> - **Email:** the public address is `connect@studioshivdev.com` (`CONTACT_EMAIL` in `src/lib/nav.ts`). It appears as a mailto link on the Contact page and in the footer.
> - **Colour tokens:** text is near-black (black at 88%), and greys are black at reduced opacity. Links and buttons on white use a slightly deeper red, `#d0161d` (5.5:1), so small text passes contrast. Button fills use it in every theme (`--accent-fill`); the logo mark stays the exact logo red.
>
> The sections below describe the earlier dark design (git commit `79b2196`) and are kept for reference. Where they disagree with the summary above, follow the summary and `src/app/design-system.css`.

The Studio Shivdev website uses three colours (logo red, black and white), heavy uppercase type taken from the wordmark, and pill shapes taken from the waveform logo.

- **Source of truth:** [`src/app/design-system.css`](src/app/design-system.css), which holds the tokens, base styles, components and motion.
- **Live site:** https://www.studioshivdev.com (studioshivdev.com redirects there; DNS at GoDaddy points to Vercel).
- **See it live:** `/dev/gallery` shows every screen at desktop and phone width.
- **Review and comment:** the [Studio Shivdev Design System](https://claude.ai/artifact/EvmYKFfi8QFcob6uXxgHBA) gallery on claude.ai shows the tokens, type, logos and every component with a live preview. It's private until shared. Changes made there are not copied into the code automatically: bring them back to `design-system.css` and this file.

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
| Chip | `ds-chip` | Small outlined pill for socials, filters and jump links. 44px tall. |
| Tap area | `ds-tap` | Gives a plain text link (nav, "All releases →", "← All artists") a 44px-tall tap area without changing its look |
| Card | `ds-card` | Faint surface with hairline border, 24px padding |
| Panel | `ds-panel` | Brighter surface for call-to-action blocks, 32px padding |
| Text input / textarea | `ds-input` | 16px text (stops phones zooming in). Red border on focus and when invalid (`aria-invalid`). Put a `ds-field-error` message under the field, linked with `aria-describedby`. |
| Release card | `ReleaseCard` in `src/components/Cards.tsx` | Square cover, title, artist link, type · date, platform links in red. The cover and title open the first platform. Pass `as="h2"` when the page has no `h2` above the grid. |
| Artist card | `ArtistCard` (same file) | Circular photo and name. The name turns red on hover. |
| Empty state | `EmptyState` (same file) | Dashed border box, shown when a list has no items |
| Header / footer | `SiteHeader.tsx`, `SiteNav.tsx`, `SiteFooter.tsx` | 64px header with the logo lockup. Uppercase nav from 768px up; a Menu button with a drop-down below that. The current page is white with a red underline (`aria-current="page"`). Links turn red on hover. |

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

- The hero waveform's bars rise and fall gently three times (`.wave-bar`, 2.4s each, scale 0.8 → 1), then rest at full height. Moving content must stop on its own or offer a pause.
- Release covers grow 3% on hover (motion-safe only).
- Colour changes on hover use `transition-colors`. There are no other animations.
- All motion stops for people who turn on **Reduce motion**, via `prefers-reduced-motion`.

---

## 8. Accessibility checklist

- Every image has `alt` text. The decorative logo mark is `aria-hidden`.
- Form fields have visible labels, and "All fields are required." sits above the form. Each error appears under its field, the field is marked invalid, and focus moves to the first one. Success uses `role="status"` and takes focus.
- Focus is visible everywhere: a solid 2px white ring with a 3px gap (`:focus-visible` in `design-system.css`).
- Every page starts with a "Skip to content" link, shown when focused.
- Tap targets are at least 44px tall (`ds-tap`, `ds-chip`, buttons); platform links in release cards are at least 32px.
- Links that open a new tab show ↗ and say "(opens in new tab)" to screen readers (`NewTabHint`).
- Headings never skip a level.
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
