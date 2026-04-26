import Link from "next/link";
import { site } from "@/content/site";

const nav = [
  { href: "#crafts", label: "Crafts" },
  { href: "#gallery", label: "Gallery" },
  { href: "#order", label: "Order" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[var(--bloom-cream)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5 sm:px-6">
        <Link
          href="#top"
          className="font-serif text-lg tracking-tight text-stone-900 sm:text-xl"
        >
          {site.name}
        </Link>
        <nav
          className="flex items-center gap-1 text-sm font-medium text-stone-600"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 transition hover:bg-amber-100/80 hover:text-stone-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden shrink-0 rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-amber-50 transition hover:bg-stone-800 sm:inline-flex"
        >
          @the_bloomcraftco
        </a>
      </div>
    </header>
  );
}
