import { readdir } from "node:fs/promises";
import path from "node:path";

const IMAGE_EXT = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".avif",
  ".svg",
]);
const VIDEO_EXT = new Set([".mp4", ".webm", ".mov", ".m4v"]);

function isPosterFilename(name: string): boolean {
  return /-poster\.(jpe?g|png|webp)$/i.test(name);
}

function posterForVideoBase(
  base: string,
  nameSet: Set<string>,
): string | undefined {
  const candidates = [
    `${base}-poster.jpg`,
    `${base}-poster.jpeg`,
    `${base}-poster.png`,
    `${base}-poster.webp`,
  ];
  for (const c of candidates) {
    if (nameSet.has(c)) {
      return `/media/${c}`;
    }
  }
  return undefined;
}

/**
 * Scans `public/media` at build/request time. Add files to the folder — no manual list in `site.ts`.
 * Optional cover: for `my-reel.mp4`, add `my-reel-poster.jpg` (or .png / .webp).
 */
export async function listMediaFromPublicFolder(): Promise<{
  images: readonly string[];
  videos: ReadonlyArray<{ src: string; poster?: string }>;
}> {
  const dir = path.join(process.cwd(), "public", "media");
  let names: string[] = [];
  try {
    names = await readdir(dir);
  } catch {
    return { images: [], videos: [] };
  }

  const sorted = names.filter((f) => !f.startsWith(".")).sort((a, b) => a.localeCompare(b));
  const nameSet = new Set(sorted);

  const videoStems = new Set<string>();
  const videos: { src: string; poster?: string }[] = [];

  for (const name of sorted) {
    const ext = path.extname(name).toLowerCase();
    if (!VIDEO_EXT.has(ext)) {
      continue;
    }
    const base = path.basename(name, ext);
    videoStems.add(base);
    videos.push({
      src: `/media/${name}`,
      poster: posterForVideoBase(base, nameSet),
    });
  }

  const images: string[] = [];
  for (const name of sorted) {
    const ext = path.extname(name).toLowerCase();
    if (!IMAGE_EXT.has(ext)) {
      continue;
    }
    if (isPosterFilename(name)) {
      const stem = name.replace(/-poster\.(jpe?g|png|webp)$/i, "");
      if (videoStems.has(stem)) {
        continue;
      }
    }
    images.push(`/media/${name}`);
  }

  return { images, videos };
}

export type MediaSlide =
  | { kind: "image"; src: string }
  | { kind: "video"; src: string; poster?: string };

/**
 * All images and videos in one list, ordered by file name, for a single reel-style carousel.
 */
export async function listUnifiedMediaSlides(): Promise<MediaSlide[]> {
  const { images, videos } = await listMediaFromPublicFolder();
  const withKeys: { key: string; slide: MediaSlide }[] = [];

  for (const src of images) {
    withKeys.push({
      key: path.basename(src).toLowerCase(),
      slide: { kind: "image", src },
    });
  }
  for (const v of videos) {
    withKeys.push({
      key: path.basename(v.src).toLowerCase(),
      slide: { kind: "video", src: v.src, poster: v.poster },
    });
  }

  withKeys.sort((a, b) => a.key.localeCompare(b.key, undefined, { numeric: true }));
  return withKeys.map((x) => x.slide);
}
