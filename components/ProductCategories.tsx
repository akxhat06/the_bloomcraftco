import { productCategories } from "@/content/site";

export function ProductCategories() {
  return (
    <section id="crafts" className="scroll-mt-20 border-b border-stone-200/80 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <h2 className="font-serif text-2xl font-medium text-stone-900 sm:text-3xl">
          What we make
        </h2>
        <p className="mt-2 text-stone-600">
          Colourful, yarn-crafted pieces you can gift, display, or carry every day.
        </p>
        <ul className="mt-10 grid gap-6 sm:grid-cols-3">
          {productCategories.map((cat) => (
            <li
              key={cat.title}
              className="flex flex-col rounded-2xl border border-amber-100/90 bg-gradient-to-b from-white to-amber-50/50 p-6 shadow-sm"
            >
              <span className="text-3xl" aria-hidden>
                {cat.emoji}
              </span>
              <h3 className="mt-4 font-serif text-lg text-stone-900">{cat.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{cat.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
