import { site } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-stone-200/80 bg-stone-50 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-5 text-center sm:flex-row sm:px-6 sm:text-left">
        <div>
          <p className="font-serif text-stone-900">{site.name}</p>
          <p className="text-sm text-stone-500">© {year} {site.name}. All rights reserved.</p>
        </div>
        <div className="text-sm text-stone-600">
          <a
            href={site.instagram}
            className="font-medium text-amber-800 hover:text-amber-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            @{site.handle}
          </a>
          <p className="mt-1 text-stone-500">
            {site.locations.join(" · ")}
          </p>
        </div>
      </div>
    </footer>
  );
}
