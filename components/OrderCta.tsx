import { site } from "@/content/site";

export function OrderCta() {
  return (
    <section
      id="order"
      className="scroll-mt-20 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-amber-200/80 bg-gradient-to-br from-amber-100 via-rose-50 to-sky-100 px-6 py-12 text-center sm:px-12 sm:py-16">
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
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-stone-900 px-8 text-sm font-semibold text-amber-50 transition hover:bg-stone-800"
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
