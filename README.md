# The Bloomcraft Co. — `bloomcraftco`

Marketing site for [The Bloomcraft Co.](https://www.instagram.com/the_bloomcraftco/) (@the_bloomcraftco): hero, about, product categories, an Instagram-style media reel, and order call-to-action. Copy lives in `content/site.ts`, and gallery assets are read automatically from the filesystem.

## Stack

- **Next.js** 16 (App Router) · **React** 19 · **TypeScript**
- **Tailwind CSS** 4
- **Fonts:** DM Sans & Fraunces (Google) via `next/font`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home page revalidates every 60 seconds so new files under `public/media/` can appear without a full redeploy in production (see `export const revalidate` in `app/page.tsx`).

## Scripts

| Command      | Description              |
| ------------ | ------------------------ |
| `npm run dev`   | Local dev (Turbopack)   |
| `npm run build` | Production build        |
| `npm run start` | Run production build    |
| `npm run lint`  | ESLint (Next.js config) |

## Media gallery

There is no Instagram API. Images and short videos are combined into one ordered list from **`public/media/`** only. Supported types and naming are defined in `lib/public-media.ts`.

- **Images:** e.g. `.jpg`, `.png`, `.webp`, `.avif`, `.svg`
- **Video posters (optional):** for `my-reel.mp4`, add a matching `my-reel-poster.jpg` (or `.jpeg` / `.png` / `.webp`) so the reel can show a still before playback.

## Configuration

- **Site copy, links, tagline:** `content/site.ts`
- **Styling / theme tokens:** `app/globals.css`
- **Environment:** copy `.env.example` to `.env.local` for local overrides (no secrets are required for the public marketing site as shipped).

## Project layout (high level)

```
app/           App Router: layout, page, global styles
components/    UI: Header, Hero, MediaShowcase, ReelStage, etc.
content/       Central marketing copy
lib/           public-media listing helpers
public/media/  Add images and videos here
```

## Deploy

Deploy on [Vercel](https://vercel.com) or any host that runs Node for Next.js. Set environment variables in the host dashboard if you add any in production.

## License

Private project; all rights reserved unless otherwise noted by the owner.
