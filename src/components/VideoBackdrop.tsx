import { useEffect, useRef, useState } from "react";
import bgVideoAsset from "@/assets/exploded-view.mp4.asset.json";
import bgPosterAsset from "@/assets/exploded-view-poster.jpg.asset.json";

// Non-Lovable deployments (e.g. *.workers.dev) don't proxy "/__l5e/..." paths,
// so point at the absolute Lovable CDN origin.
const ASSET_CDN_ORIGIN =
  "https://project--f5fd28dd-7b71-489d-910e-961a65dfa09f.lovable.app";
const abs = (u: string) => (u.startsWith("/") ? `${ASSET_CDN_ORIGIN}${u}` : u);
const bgVideoUrl = abs(bgVideoAsset.url);
const bgPosterUrl = abs(bgPosterAsset.url);

/**
 * Site-wide cinematic backdrop: a slow-motion exploded-view product render,
 * played behind all content with a soft fade-in and readability scrim.
 * A poster still (same framing/grade) paints immediately so the first paint
 * is never a black screen while the video streams in.
 */
export function VideoBackdrop() {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Slow, Apple-style motion.
    v.playbackRate = 0.5;
    const play = () => {
      v.playbackRate = 0.5;
      v.play().catch(() => {});
    };
    play();
    if (v.readyState >= 2) setReady(true);
    // Autoplay can be deferred by the browser (tab restore, bfcache, mobile);
    // retry on the first sign of life so it never stays frozen/black.
    const onVis = () => { if (!document.hidden) play(); };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pageshow", play);
    window.addEventListener("pointerdown", play, { once: true });
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pageshow", play);
      window.removeEventListener("pointerdown", play);
    };
  }, []);

  const grade = "saturate(1.05) contrast(1.06) brightness(1.05)";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* instant poster: identical framing + grade, visible from first paint */}
      <img
        src={bgPosterUrl}
        alt=""
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0.7, filter: grade }}
      />
      <video
        ref={ref}
        src={bgVideoUrl}
        poster={bgPosterUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setReady(true)}
        onCanPlay={() => setReady(true)}
        onPlaying={() => setReady(true)}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out"
        style={{
          opacity: ready ? 0.7 : 0,
          filter: grade,
        }}
      />


      {/* readability scrim (medium — balanced for text legibility) */}
      <div className="absolute inset-0 bg-background/45" />
      {/* vignette + brand tint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 0%, color-mix(in oklab, var(--background) 30%, transparent) 62%, color-mix(in oklab, var(--background) 85%, transparent) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 70% 20%, color-mix(in oklab, var(--neon) 12%, transparent), transparent 60%)",
        }}
      />


    </div>
  );
}
