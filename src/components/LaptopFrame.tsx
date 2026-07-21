import { motion } from "motion/react";
import { ReactNode } from "react";

/**
 * Desktop PC monitor chassis (SVG) with neck + base stand.
 * Children render inside the screen area via absolute overlay.
 *
 * Animations:
 *  - Monitor rises + scales in on mount
 *  - Screen "boots": flicker + glow ramp
 *  - Gentle idle float
 */
export function LaptopFrame({ children }: { children: ReactNode }) {
  // Geometry (SVG units)
  const W = 620;
  const MON_X = 6;
  const MON_Y = 0;
  const MON_W = 608;
  const MON_H = 490;
  const BEZEL_X = 16;
  const BEZEL_T = 14;
  const BEZEL_B = 34; // thicker bottom bezel (brand strip)
  const SCREEN_X = MON_X + BEZEL_X;
  const SCREEN_Y = MON_Y + BEZEL_T;
  const SCREEN_W = MON_W - BEZEL_X * 2;
  const SCREEN_H = MON_H - BEZEL_T - BEZEL_B;

  // Laptop base
  const STAND_TOP = MON_Y + MON_H;
  const NECK_H = 6; // hinge strip
  const BASE_H = 56; // laptop base body
  const TOTAL_H = MON_H + NECK_H + BASE_H + 4;

  return (
    <div className="relative w-full" style={{ maxWidth: 760 }}>
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <svg
            viewBox={`0 0 ${W} ${TOTAL_H}`}
            className="w-full block"
            aria-hidden
          >
            <defs>
              <linearGradient id="mon-metal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.26 0.006 170)" />
                <stop offset="55%" stopColor="oklch(0.16 0.005 170)" />
                <stop offset="100%" stopColor="oklch(0.10 0.004 170)" />
              </linearGradient>
              <linearGradient id="mon-bezel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.10 0.003 170)" />
                <stop offset="100%" stopColor="oklch(0.05 0.002 170)" />
              </linearGradient>
              <linearGradient id="mon-hi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--neon)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--neon)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="stand-metal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.22 0.006 170)" />
                <stop offset="100%" stopColor="oklch(0.10 0.004 170)" />
              </linearGradient>
              <linearGradient id="base-metal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.20 0.005 170)" />
                <stop offset="100%" stopColor="oklch(0.08 0.003 170)" />
              </linearGradient>
            </defs>

            {/* Monitor body */}
            <rect
              x={MON_X}
              y={MON_Y}
              width={MON_W}
              height={MON_H}
              rx={14}
              fill="url(#mon-metal)"
              stroke="color-mix(in oklab, var(--neon) 30%, transparent)"
              strokeWidth="1"
            />
            {/* Top highlight */}
            <rect
              x={MON_X + 2}
              y={MON_Y + 2}
              width={MON_W - 4}
              height={30}
              rx={12}
              fill="url(#mon-hi)"
            />
            {/* Bezel (dark inset) */}
            <rect
              x={MON_X + BEZEL_X - 2}
              y={MON_Y + BEZEL_T - 2}
              width={MON_W - (BEZEL_X - 2) * 2}
              height={MON_H - BEZEL_T - BEZEL_B + 4}
              rx={8}
              fill="url(#mon-bezel)"
              stroke="color-mix(in oklab, var(--neon) 22%, transparent)"
              strokeWidth="0.75"
            />
            {/* Screen well (dark, children render on top via HTML overlay) */}
            <rect
              x={SCREEN_X}
              y={SCREEN_Y}
              width={SCREEN_W}
              height={SCREEN_H}
              rx={4}
              fill="oklch(0.04 0.005 170)"
            />
            {/* Bottom bezel branding */}
            <text
              x={W / 2}
              y={MON_Y + MON_H - 12}
              textAnchor="middle"
              fontSize="7"
              letterSpacing="5"
              fill="var(--neon)"
              fillOpacity="0.55"
              fontFamily="var(--font-mono, monospace)"
            >
              NEERAJ · K
            </text>
            {/* Power LED */}
            <circle
              cx={MON_X + MON_W - 22}
              cy={MON_Y + MON_H - 14}
              r={2.4}
              fill="var(--neon)"
            >
              <animate
                attributeName="fill-opacity"
                values="0.4;1;0.4"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Neck (stand riser) */}
            <path
              d={`M ${W / 2 - 40} ${STAND_TOP}
                  L ${W / 2 + 40} ${STAND_TOP}
                  L ${W / 2 + 30} ${STAND_TOP + NECK_H}
                  L ${W / 2 - 30} ${STAND_TOP + NECK_H} Z`}
              fill="url(#stand-metal)"
              stroke="color-mix(in oklab, var(--neon) 25%, transparent)"
              strokeWidth="0.8"
            />
            {/* Neck highlight */}
            <line
              x1={W / 2}
              y1={STAND_TOP + 2}
              x2={W / 2}
              y2={STAND_TOP + NECK_H - 2}
              stroke="color-mix(in oklab, var(--neon) 35%, transparent)"
              strokeWidth="0.6"
            />

            {/* Base */}
            <path
              d={`M ${W / 2 - 130} ${STAND_TOP + NECK_H}
                  L ${W / 2 + 130} ${STAND_TOP + NECK_H}
                  Q ${W / 2 + 150} ${STAND_TOP + NECK_H + 4} ${W / 2 + 140} ${STAND_TOP + NECK_H + BASE_H}
                  L ${W / 2 - 140} ${STAND_TOP + NECK_H + BASE_H}
                  Q ${W / 2 - 150} ${STAND_TOP + NECK_H + 4} ${W / 2 - 130} ${STAND_TOP + NECK_H} Z`}
              fill="url(#base-metal)"
              stroke="color-mix(in oklab, var(--neon) 28%, transparent)"
              strokeWidth="0.8"
            />
            {/* Base front highlight */}
            <path
              d={`M ${W / 2 - 138} ${STAND_TOP + NECK_H + BASE_H - 2} L ${W / 2 + 138} ${STAND_TOP + NECK_H + BASE_H - 2}`}
              stroke="color-mix(in oklab, var(--neon) 35%, transparent)"
              strokeWidth="0.6"
              fill="none"
            />
          </svg>

          {/* Screen content overlay (HTML on top of SVG screen well) */}
          <motion.div
            className="absolute overflow-hidden rounded-[4px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0.9, 0.4, 1] }}
            transition={{ duration: 1.1, delay: 0.55, times: [0, 0.2, 0.5, 0.7, 1] }}
            style={{
              left: `${(SCREEN_X / W) * 100}%`,
              top: `${(SCREEN_Y / TOTAL_H) * 100}%`,
              width: `${(SCREEN_W / W) * 100}%`,
              height: `${(SCREEN_H / TOTAL_H) * 100}%`,
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
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floor shadow / glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -bottom-3 h-8 w-[70%] blur-2xl opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--neon), transparent 70%)",
        }}
      />
    </div>
  );
}
