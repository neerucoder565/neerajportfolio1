import { useEffect, useRef, useState } from "react";
import bgVideoAsset from "@/assets/exploded-view.mp4.asset.json";

// Non-Lovable deployments (e.g. *.workers.dev) don't proxy "/__l5e/..." paths,
// so point at the absolute Lovable CDN origin.
const ASSET_CDN_ORIGIN =
  "https://project--f5fd28dd-7b71-489d-910e-961a65dfa09f.lovable.app";
const bgVideoUrl = bgVideoAsset.url.startsWith("/")
  ? `${ASSET_CDN_ORIGIN}${bgVideoAsset.url}`
  : bgVideoAsset.url;

/**
 * Site-wide cinematic backdrop: a slow-motion exploded-view product render,
 * played behind all content with a soft fade-in and readability scrim.
 */
export function VideoBackdrop() {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Slow, Apple-style motion.
    v.playbackRate = 0.5;
    const play = () => v.play().catch(() => {});
    play();
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <video
        ref={ref}
        src={bgVideoUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setReady(true)}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ease-out"
        style={{
          opacity: ready ? 0.85 : 0,
          filter: "saturate(1.05) contrast(1.08) brightness(1.35)",
        }}
      />

      {/* readability scrim (light — video stays bright) */}
      <div className="absolute inset-0 bg-background/25" />
      {/* vignette + brand tint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 0%, color-mix(in oklab, var(--background) 25%, transparent) 62%, color-mix(in oklab, var(--background) 82%, transparent) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 70% 20%, color-mix(in oklab, var(--neon) 12%, transparent), transparent 60%)",
        }}
      />

      {/* chip callout label over the exploded-view render */}
      <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex items-center gap-3">
          <span className="block h-px w-16 bg-[var(--neon)]/60" />
          <span className="rounded-sm border border-[var(--neon)]/40 bg-background/60 px-2.5 py-1 font-mono text-[10px] tracking-[0.22em] text-[var(--neon)] backdrop-blur-sm">
            STM32F407VGT6 · ARM CORTEX-M4
          </span>
          <span className="block h-px w-16 bg-[var(--neon)]/60" />
        </div>
      </div>

    </div>
  );
}
