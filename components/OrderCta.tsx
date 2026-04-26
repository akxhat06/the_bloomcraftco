import { site } from "@/content/site";

export function OrderCta() {
  return (
    <section
      id="order"
      className="scroll-mt-20 py-12 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-3 min-[400px]:px-5 sm:px-6">
        <div className="flex flex-col items-center overflow-hidden rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-100 via-rose-50 to-sky-100 px-4 py-10 text-center min-[400px]:rounded-3xl min-[400px]:px-6 sm:px-12 sm:py-16">
          <h2 className="font-serif text-2xl font-medium text-stone-900 sm:text-3xl">
            Pre-book your order
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-stone-700">
            Tell us the occasion, colour palette, and any photos or text you want tucked into a
            bouquet. We will chat through options on Instagram.
          </p>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex h-12 w-full min-h-12 max-w-md touch-manipulation items-center justify-center self-center rounded-full bg-stone-900 px-6 text-sm font-semibold text-amber-50 transition min-[400px]:w-auto min-[400px]:px-8 active:bg-stone-800 sm:hover:bg-stone-800"
          >
            Open Instagram DM
          </a>
          <p className="mt-6 text-sm text-stone-600">
            {site.locations.map((loc, i) => (
              <span key={loc}>
                {i > 0 ? " · " : ""}📍 {loc}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
