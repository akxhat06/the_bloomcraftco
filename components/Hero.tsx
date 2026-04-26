import { site } from "@/content/site";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-amber-200/50 bg-gradient-to-b from-amber-50 via-[var(--bloom-cream)] to-rose-50/30"
    >
      <div
        className="pointer-events-none absolute -right-24 top-8 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-rose-200/40 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-5xl px-5 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
        <p className="mb-3 inline-flex rounded-full border border-amber-200/80 bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-900/80">
          Product &amp; service
        </p>
        <h1 className="font-serif max-w-3xl text-4xl font-medium leading-tight tracking-tight text-stone-900 sm:text-5xl md:text-6xl">
          {site.tagline}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-stone-600">
          {site.quote} — crochet bouquets, charms, and little blooms made by hand. Curated
          with care for Chintamani &amp; Bangalore.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full bg-amber-500 px-6 text-sm font-semibold text-stone-900 shadow-sm transition hover:bg-amber-400"
          >
            Message on Instagram
          </a>
          <a
            href="#gallery"
            className="inline-flex h-12 items-center justify-center rounded-full border border-stone-300/80 bg-white/60 px-6 text-sm font-semibold text-stone-800 transition hover:border-amber-300 hover:bg-amber-50/80"
          >
            See the craft
          </a>
        </div>
        <p className="mt-6 text-sm text-stone-500">
          {site.dmHint}
        </p>
      </div>
    </section>
  );
}
