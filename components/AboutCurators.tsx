import { site } from "@/content/site";

export function AboutCurators() {
  return (
    <section className="border-b border-stone-200/80 bg-white/50 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <h2 className="font-serif text-2xl font-medium text-stone-900 sm:text-3xl">
          About the studio
        </h2>
        <p className="mt-4 max-w-2xl text-stone-600">
          One maker, many ideas — we crochet flowers, bundle them into bouquets, and add
          personal touches like polaroids and cards when you need something unforgettable.
        </p>
        <p className="mt-4 text-sm text-stone-500">
          Curated by{" "}
          {site.curatedBy.map((c, i) => (
            <span key={c.label}>
              {i > 0 ? " · " : ""}
              <a
                href={c.href}
                className="font-medium text-amber-800 underline decoration-amber-300 underline-offset-2 hover:text-amber-900"
                target="_blank"
                rel="noopener noreferrer"
              >
                {c.label}
              </a>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
