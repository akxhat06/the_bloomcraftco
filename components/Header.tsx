import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

const nav = [
  { href: "#crafts", label: "Crafts" },
  { href: "#gallery", label: "Gallery" },
  { href: "#order", label: "Order" },
] as const;

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[var(--bloom-cream)]/90 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-3 py-3 min-[400px]:px-4 sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-0">
        {/* Nav row — first on mobile (toolbar); second column on sm+ */}
        <div className="order-1 flex w-full flex-col items-stretch gap-1.5 min-[500px]:flex-row min-[500px]:items-center min-[500px]:justify-end sm:order-2 sm:w-auto sm:gap-1 sm:pl-0">
          <div className="relative w-full min-w-0 sm:w-auto sm:shrink-0">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-lg p-2 text-stone-500 transition hover:text-stone-800 active:bg-amber-100/90 sm:hidden"
              aria-label={`${site.name} on Instagram`}
            >
              <InstagramIcon className="h-[19px] w-[19px]" />
            </a>
            <nav
              className="flex w-full min-w-0 items-center justify-center gap-0.5 pr-11 text-xs font-medium text-stone-600 min-[400px]:gap-2 min-[400px]:text-sm sm:justify-end sm:gap-1 sm:pr-0"
              aria-label="Primary"
            >
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="touch-manipulation rounded-full px-2 py-2 min-[400px]:px-2.5 sm:px-3 sm:py-1.5 active:bg-amber-100/80 sm:py-1.5 sm:hover:bg-amber-100/80 sm:hover:text-stone-900"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-8 shrink-0 items-center justify-center self-center rounded-full bg-stone-900 px-3.5 text-xs font-semibold text-amber-50 transition min-[500px]:inline-flex min-[500px]:self-auto min-[500px]:text-sm sm:px-3 sm:hover:bg-stone-800"
          >
            @{site.handle}
          </a>
        </div>

        {/* Brand — second on mobile (centered logo + name); first on sm+ (left) */}
        <div className="order-2 w-full min-w-0 sm:order-1 sm:flex-1 sm:pt-0">
          <Link
            href="#top"
            className="mx-auto flex w-full min-w-0 max-w-sm flex-col items-center justify-center gap-1.5 text-center sm:mx-0 sm:max-w-md sm:flex-row sm:items-center sm:justify-start sm:gap-3 sm:text-left md:max-w-lg"
          >
            <Image
              src="/bloomcraftco_circular_icon.svg"
              alt=""
              width={40}
              height={40}
              priority
              unoptimized
              className="h-10 w-10 shrink-0 drop-shadow-sm sm:h-9 sm:w-9"
            />
            <span className="w-full min-w-0 text-pretty font-serif text-base font-medium leading-tight text-stone-900 min-[400px]:text-lg sm:text-balance sm:text-left sm:text-lg md:text-xl">
              {site.name}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
