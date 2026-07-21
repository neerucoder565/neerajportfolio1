import { motion } from "motion/react";
import { ReactNode } from "react";

/**
 * Realistic laptop chassis (MacBook-like silhouette) rendered in SVG so the
 * base has proper perspective (trapezoid) and the hinge sits flush with the
 * lid. Children render inside the screen area via absolute overlay.
 *
 * Animations:
 *  - Lid opens (rotateX) on mount from a closed state
 *  - Gentle idle float after settling
 *  - Soft neon under-glow
 */
export function LaptopFrame({ children }: { children: ReactNode }) {
  // Geometry (SVG units)
  const W = 620;
  const LID_W = 560;
  const LID_H = 470;
  const LID_X = (W - LID_W) / 2;
  const BEZEL = 14;
  const SCREEN_X = LID_X + BEZEL;
  const SCREEN_Y = BEZEL + 6;
  const SCREEN_W = LID_W - BEZEL * 2;
  const SCREEN_H = LID_H - BEZEL * 2 - 6;

  return (
    <div className="relative w-full" style={{ maxWidth: 720 }}>
      {/* Idle float wrapper */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* LID (opens on mount) */}
        <motion.div
          initial={{ rotateX: -92, opacity: 0.2 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          style={{
            transformOrigin: "50% 100%",
            transformStyle: "preserve-3d",
            perspective: "1800px",
          }}
          className="relative"
        >
          <svg
            viewBox={`0 0 ${W} ${LID_H + 8}`}
            className="w-full block"
            aria-hidden
          >
            <defs>
              <linearGradient id="lid-metal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.28 0.006 170)" />
                <stop offset="50%" stopColor="oklch(0.18 0.005 170)" />
                <stop offset="100%" stopColor="oklch(0.12 0.004 170)" />
              </linearGradient>
              <linearGradient id="bezel-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.10 0.003 170)" />
                <stop offset="100%" stopColor="oklch(0.06 0.002 170)" />
              </linearGradient>
              <linearGradient id="lid-hi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--neon)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--neon)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Lid body */}
            <rect
              x={LID_X}
              y={0}
              width={LID_W}
              height={LID_H}
              rx={18}
              fill="url(#lid-metal)"
              stroke="color-mix(in oklab, var(--neon) 30%, transparent)"
              strokeWidth="1"
            />
            {/* Top highlight */}
            <rect
              x={LID_X + 2}
              y={2}
              width={LID_W - 4}
              height={40}
              rx={16}
              fill="url(#lid-hi)"
            />
            {/* Bezel */}
            <rect
              x={LID_X + BEZEL - 2}
              y={BEZEL - 2}
              width={LID_W - (BEZEL - 2) * 2}
              height={LID_H - (BEZEL - 2) * 2}
              rx={10}
              fill="url(#bezel-grad)"
              stroke="color-mix(in oklab, var(--neon) 20%, transparent)"
              strokeWidth="0.75"
            />
            {/* Webcam */}
            <circle
              cx={W / 2}
              cy={BEZEL / 2 + 1}
              r={2.2}
              fill="oklch(0.05 0 0)"
              stroke="color-mix(in oklab, var(--neon) 50%, transparent)"
              strokeWidth="0.6"
            />
            <circle cx={W / 2} cy={BEZEL / 2 + 1} r={0.8} fill="var(--neon)" fillOpacity="0.6" />
            {/* Screen well (dark, actual content overlaid via HTML) */}
            <rect
              x={SCREEN_X}
              y={SCREEN_Y}
              width={SCREEN_W}
              height={SCREEN_H}
              rx={6}
              fill="oklch(0.04 0.005 170)"
            />
            {/* Bottom chin with brand */}
            <text
              x={W / 2}
              y={LID_H - 4}
              textAnchor="middle"
              fontSize="6"
              letterSpacing="4"
              fill="var(--neon)"
              fillOpacity="0.5"
              fontFamily="var(--font-mono, monospace)"
            >
              NEERAJ · K
            </text>
          </svg>

          {/* Screen content overlay (HTML on top of SVG screen well) */}
          <div
            className="absolute overflow-hidden rounded-[6px]"
            style={{
              left: `${(SCREEN_X / W) * 100}%`,
              top: `${(SCREEN_Y / (LID_H + 8)) * 100}%`,
              width: `${(SCREEN_W / W) * 100}%`,
              height: `${(SCREEN_H / (LID_H + 8)) * 100}%`,
            }}
          >
            {/* Scanline shimmer */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05] z-10"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, var(--neon) 0 1px, transparent 1px 3px)",
              }}
            />
            {/* Screen glow gradient */}
            <div
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 40%, color-mix(in oklab, var(--neon) 8%, transparent), transparent 70%)",
              }}
            />
            <div className="relative z-[5] w-full h-full flex items-center justify-center p-2">
              {children}
            </div>
          </div>
        </motion.div>

        {/* HINGE + BASE (SVG so the trapezoid perspective is exact) */}
        <motion.svg
          viewBox="0 0 620 60"
          className="w-full block -mt-[1px]"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          aria-hidden
        >
          <defs>
            <linearGradient id="base-metal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.22 0.006 170)" />
              <stop offset="45%" stopColor="oklch(0.14 0.005 170)" />
              <stop offset="100%" stopColor="oklch(0.07 0.003 170)" />
            </linearGradient>
            <linearGradient id="hinge-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.08 0.003 170)" />
              <stop offset="100%" stopColor="oklch(0.18 0.005 170)" />
            </linearGradient>
          </defs>
          {/* Hinge strip */}
          <rect x="30" y="0" width="560" height="6" fill="url(#hinge-grad)" />
          <rect x="30" y="0" width="560" height="1" fill="var(--neon)" fillOpacity="0.25" />
          {/* Base body as a trapezoid (front wider than back due to perspective) */}
          <path
            d="M 30 6
               L 590 6
               L 612 52
               Q 612 58 606 58
               L 14 58
               Q 8 58 8 52
               Z"
            fill="url(#base-metal)"
            stroke="color-mix(in oklab, var(--neon) 22%, transparent)"
            strokeWidth="0.75"
          />
          {/* Front edge highlight */}
          <path
            d="M 14 55 L 606 55"
            stroke="color-mix(in oklab, var(--neon) 30%, transparent)"
            strokeWidth="0.6"
            fill="none"
          />
          {/* Trackpad */}
          <rect
            x={620 / 2 - 55}
            y={22}
            width={110}
            height={20}
            rx={3}
            fill="oklch(0.10 0.003 170)"
            stroke="color-mix(in oklab, var(--neon) 15%, transparent)"
            strokeWidth="0.5"
          />
        </motion.svg>
      </motion.div>

      {/* Floor shadow / glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -bottom-4 h-8 w-[75%] blur-2xl opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--neon), transparent 70%)",
        }}
      />
    </div>
  );
}
