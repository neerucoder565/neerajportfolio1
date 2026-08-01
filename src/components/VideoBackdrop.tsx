import { useEffect, useRef, useState } from "react";
import bgVideo from "@/assets/exploded-view.mp4.asset.json";

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
        src={bgVideo.url}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setReady(true)}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ease-out"
        style={{ opacity: ready ? 0.4 : 0, filter: "saturate(0.85) contrast(1.05)" }}
      />

      {/* readability scrim */}
      <div className="absolute inset-0 bg-background/70" />
      {/* vignette + brand tint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 0%, color-mix(in oklab, var(--background) 65%, transparent) 55%, var(--background) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 70% 20%, color-mix(in oklab, var(--neon) 12%, transparent), transparent 60%)",
        }}
      />
    </div>
  );
}
