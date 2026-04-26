import { ReelStage } from "@/components/gallery/ReelStage";
import { listUnifiedMediaSlides } from "@/lib/public-media";

export async function MediaShowcase() {
  const slides = await listUnifiedMediaSlides();
  const hasAny = slides.length > 0;

  return (
    <section
      id="gallery"
      className="scroll-mt-20 border-b border-amber-200/30 bg-gradient-to-b from-[var(--bloom-cream)] via-amber-50/35 to-rose-50/25 py-12 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-3 min-[400px]:px-4 sm:px-6">
        <h2 className="text-center font-serif text-2xl font-medium text-stone-900 sm:text-left sm:text-3xl">
          Gallery
        </h2>
        {!hasAny ? (
          <p className="mt-2 text-center text-stone-500 sm:text-left">No photos or videos in public/media yet.</p>
        ) : null}
        {hasAny ? <div className="mt-8"><ReelStage slides={slides} /></div> : null}
      </div>
    </section>
  );
}
