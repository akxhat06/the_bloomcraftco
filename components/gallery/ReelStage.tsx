"use client";

import Image from "next/image";
import type { MediaSlide } from "@/lib/public-media";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

type Props = { slides: readonly MediaSlide[] };

/**
 * How long each image shows before auto-advancing (videos use natural end).
 * Slightly longer than 5.5s so the slow entrance still leaves time on-screen.
 */
const IMAGE_SLIDE_MS = 6500;

/**
 * Center reel — 9:16, shorter on small screens so controls + page chrome fit comfortably.
 * `dvh` tracks mobile browser UI better than `svh`.
 */
/**
 * Use `vh` (not just `dvh`) so height always resolves; `dvh` can be invalid in
 * some WebViews, leaving the box at height:0 when children are all `absolute`.
 * Optional `dvh` line can be added in pure CSS with @supports for progressive enhancement.
 */
const reelFrame =
  "h-[min(70vh,720px)] w-auto [aspect-ratio:9/16] max-w-[min(100%,420px)] min-[480px]:h-[min(80vh,800px)] sm:h-[min(86vh,800px)]";
const reelFrameSide =
  "h-[min(64vh,650px)] w-auto [aspect-ratio:9/16] max-w-[min(100%,360px)] min-[480px]:h-[min(74vh,720px)] sm:h-[min(78vh,700px)]";

function SidePeek({
  slide,
  onSelect,
  align,
}: {
  slide: MediaSlide | null;
  onSelect: () => void;
  align: "left" | "right";
}) {
  if (!slide) {
    return null;
  }

  const peekTx = align === "left" ? "-0.5rem" : "0.5rem";

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={align === "left" ? "Previous" : "Next"}
      className={`group pointer-events-auto relative min-h-0 shrink-0 cursor-pointer overflow-hidden rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-500 ${reelFrameSide}`}
    >
      <div
        key={`${slide.src}|${slide.kind}`}
        style={{ "--peek-tx": peekTx } as CSSProperties}
        className="absolute inset-0 origin-center overflow-hidden rounded-[inherit] border border-amber-200/50 bg-stone-100/80 shadow-md ring-1 ring-amber-100/50 reel-peek-swap-anim"
      >
        <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
          <div className="absolute inset-0 scale-105 [filter:blur(7px)] sm:[filter:blur(9px)]">
            <div className="relative h-full w-full min-h-[100%] min-w-[100%]">
              <PeekContent slide={slide} />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-stone-900/15 via-transparent to-stone-900/20" />
        <div
          className={`pointer-events-none absolute inset-0 rounded-[inherit] ${
            align === "left"
              ? "bg-gradient-to-r from-white/25 to-transparent"
              : "bg-gradient-to-l from-white/25 to-transparent"
          }`}
        />
      </div>
    </button>
  );
}

function PeekContent({ slide }: { slide: MediaSlide }) {
  if (slide.kind === "image") {
    return (
      <div className="relative h-full w-full">
        <Image
          src={slide.src}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 120px, 30vw, 200px"
          unoptimized={slide.src.endsWith(".svg")}
        />
      </div>
    );
  }
  if (slide.poster) {
    return (
      <div className="relative h-full w-full">
        <Image
          src={slide.poster}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100px, 30vw, 200px"
        />
      </div>
    );
  }
  return (
    <div className="h-full w-full">
      <video
        className="h-full w-full object-cover"
        src={slide.src}
        poster={slide.poster}
        muted
        playsInline
        preload="metadata"
        aria-hidden
      />
    </div>
  );
}

function ReelVideo({
  slide,
  isActive,
  onPlaybackEnded,
}: {
  slide: Extract<MediaSlide, { kind: "video" }>;
  isActive: boolean;
  onPlaybackEnded?: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const singleLoop = onPlaybackEnded == null;

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    if (!isActive) {
      el.pause();
    } else {
      el.muted = muted;
      void el.play().catch(() => setIsPlaying(false));
    }
  }, [isActive, muted, slide.src]);

  const toggle = useCallback(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    if (el.paused) {
      void el.play();
    } else {
      el.pause();
    }
  }, []);

  return (
    <div
      className="relative h-full w-full cursor-pointer bg-gradient-to-b from-amber-100/80 to-amber-50/40"
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        toggle();
      }}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <video
        ref={ref}
        className="h-full w-full object-cover"
        loop={singleLoop}
        playsInline
        muted={muted}
        poster={slide.poster}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          if (onPlaybackEnded) {
            onPlaybackEnded();
          }
        }}
      >
        <source src={slide.src} />
      </video>
      {!isPlaying && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/50 text-amber-900 shadow-sm ring-2 ring-amber-200/60 backdrop-blur-sm">
            <PlayIcon className="ml-0.5 h-8 w-8" />
          </span>
        </div>
      )}
      {isActive && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setMuted((m) => {
              const next = !m;
              if (ref.current) {
                ref.current.muted = next;
              }
              return next;
            });
          }}
          className="absolute right-2 z-10 min-h-9 touch-manipulation rounded-full border border-amber-200/70 bg-white/90 px-2.5 py-2 text-[10px] font-medium uppercase tracking-wide text-stone-700 shadow-sm backdrop-blur-sm max-sm:bottom-[max(2.5rem,env(safe-area-inset-bottom,0.25rem))] sm:bottom-3 sm:right-3 sm:py-1.5 sm:text-[11px] sm:normal-case"
        >
          {muted ? "Tap for sound" : "Mute"}
        </button>
      )}
    </div>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

/** Single filled “liked” heart on the right (decorative). */
function ReelLikedHeart() {
  return (
    <div
      className="pointer-events-none absolute right-2.5 z-[4] sm:bottom-16 sm:right-3 max-sm:bottom-[max(5.5rem,calc(2rem+env(safe-area-inset-bottom,0px)))]"
      role="img"
      aria-label="Liked"
    >
      <svg
        className="h-8 w-8 drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)]"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          fill="#ff3040"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </div>
  );
}

function MainFrame({
  slide,
  isActive,
  onVideoEnded,
}: {
  slide: MediaSlide;
  isActive: boolean;
  onVideoEnded?: () => void;
}) {
  if (slide.kind === "image") {
    return (
      <Image
        src={slide.src}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 480px) 100vw, 420px"
        priority={isActive}
        unoptimized={slide.src.endsWith(".svg")}
      />
    );
  }
  return (
    <ReelVideo
      key={slide.src}
      slide={slide}
      isActive={isActive}
      onPlaybackEnded={onVideoEnded}
    />
  );
}

export function ReelStage({ slides }: Props) {
  const n = slides.length;
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const advance = useCallback(() => {
    setActive((i) => (i + 1) % n);
  }, [n]);

  const go = useCallback(
    (d: -1 | 1) => {
      setActive((i) => (i + d + n) % n);
    },
    [n],
  );

  const activeSlide = n > 0 ? slides[active] : undefined;

  /** Image slides: auto-advance on a timer. Videos advance only when playback ends. */
  useEffect(() => {
    if (n <= 1) {
      return;
    }
    if (activeSlide?.kind !== "image") {
      return;
    }
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const t = window.setTimeout(() => {
      setActive((i) => (i + 1) % n);
    }, IMAGE_SLIDE_MS);
    return () => clearTimeout(t);
  }, [active, n, activeSlide?.kind, activeSlide?.src]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        go(-1);
      }
      if (e.key === "ArrowRight") {
        go(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (n === 0 || !activeSlide) {
    return null;
  }

  const prev = n > 1 ? slides[(active - 1 + n) % n] : null;
  const nextSlide = n > 1 ? slides[(active + 1) % n] : null;

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-amber-200/80 bg-gradient-to-b from-amber-50/95 via-white to-rose-50/50 p-2 shadow-lg shadow-amber-900/10 ring-1 ring-amber-100/80 min-[400px]:p-3 sm:rounded-[2rem] sm:p-6"
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const start = touchStartX.current;
        const endX = e.changedTouches[0]?.clientX;
        if (start == null || endX == null) {
          return;
        }
        const dx = endX - start;
        if (Math.abs(dx) < 50) {
          return;
        }
        if (dx < 0) {
          go(1);
        } else {
          go(-1);
        }
        touchStartX.current = null;
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_0%,rgba(251,191,36,0.14),transparent_55%)]"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-6xl overflow-x-clip px-0 min-[400px]:px-1 sm:px-2">
        <div className="flex min-h-0 min-w-0 items-start justify-center max-sm:gap-0 sm:items-center">
          {n > 1 && prev ? (
            <div className="relative z-[3] hidden w-auto shrink-0 origin-center -mr-[16%] sm:block md:-mr-[20%] lg:-mr-[22%]">
              <SidePeek slide={prev} align="left" onSelect={() => go(-1)} />
            </div>
          ) : null}
          <div className="relative z-20 mx-auto w-full min-w-0 max-w-[min(19rem,92vw)] shrink sm:max-w-[min(100%,420px)]">
            <div
              className={`relative z-0 overflow-hidden rounded-2xl bg-amber-50/50 shadow-[0_20px_40px_-8px_rgba(90,50,20,0.2)] ring-2 ring-amber-200/90 min-h-[200px] min-[400px]:rounded-[1.35rem] sm:min-h-0 sm:rounded-[1.4rem] sm:shadow-[0_24px_50px_-8px_rgba(90,50,20,0.22)] ${reelFrame} mx-auto w-full max-w-full`}
            >
              {n > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    className="absolute left-1.5 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full border border-amber-200/90 bg-white/95 text-lg leading-none text-stone-700 shadow-md sm:hidden"
                    aria-label="Previous"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="absolute right-1.5 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full border border-amber-200/90 bg-white/95 text-lg leading-none text-stone-700 shadow-md sm:hidden"
                    aria-label="Next"
                  >
                    ›
                  </button>
                </>
              ) : null}
              <div
                key={activeSlide.src + activeSlide.kind}
                className="absolute inset-0 z-[2] min-h-0 reel-main-swap-anim"
              >
                <div className="relative h-full min-h-0 w-full">
                  <MainFrame
                    slide={activeSlide}
                    isActive
                    onVideoEnded={n > 1 ? advance : undefined}
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-2/5 bg-gradient-to-t from-amber-950/35 via-amber-950/10 to-transparent" />
              <ReelLikedHeart />
            </div>
          </div>
          {n > 1 && nextSlide ? (
            <div className="relative z-[3] hidden w-auto shrink-0 origin-center -ml-[16%] sm:block md:-ml-[20%] lg:-ml-[22%]">
              <SidePeek slide={nextSlide} align="right" onSelect={() => go(1)} />
            </div>
          ) : null}
        </div>
      </div>

      <div className="relative mt-3 flex w-full max-w-full flex-wrap items-center justify-center gap-0.5 px-1 sm:mt-4 sm:gap-1.5 sm:px-0">
        {slides.map((s, i) => (
          <button
            key={s.src + s.kind + i}
            type="button"
            onClick={() => setActive(i)}
            className="flex h-9 min-w-7 touch-manipulation items-center justify-center sm:h-auto sm:min-w-0 sm:p-0"
            aria-label={`Slide ${i + 1} of ${n}`}
            aria-pressed={i === active}
          >
            <span
              className={`block h-1.5 rounded-full transition-all ${
                i === active ? "w-6 bg-amber-500" : "w-1.5 bg-amber-300/80 active:bg-amber-400 sm:hover:bg-amber-400"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
