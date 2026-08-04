import { motion } from "motion/react";
import { ReactNode } from "react";

/**
 * Laptop chassis: the lid (screen) physically hinges open on mount,
 * then the screen boots. The base stays flat on the "desk".
 */
export function LaptopFrame({ children }: { children: ReactNode }) {
  // Lid geometry (SVG units)
  const W = 640;
  const MON_X = 4;
  const MON_Y = 0;
  const MON_W = 632;
  const MON_H = 496;
  const BEZEL_X = 8;
  const BEZEL_T = 6;
  const BEZEL_B = 26;
  const SCREEN_X = MON_X + BEZEL_X;
  const SCREEN_Y = MON_Y + BEZEL_T;
  const SCREEN_W = MON_W - BEZEL_X * 2;
  const SCREEN_H = MON_H - BEZEL_T - BEZEL_B;
  const LID_H = MON_H + 4;

  // Base geometry
  const BASE_H = 122;
  const NECK_H = 6;

  const GRADS = (
    <defs>
      <linearGradient id="mon-metal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="oklch(0.26 0.006 305)" />
        <stop offset="55%" stopColor="oklch(0.16 0.005 305)" />
        <stop offset="100%" stopColor="oklch(0.10 0.004 305)" />
      </linearGradient>
      <linearGradient id="mon-bezel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="oklch(0.10 0.003 305)" />
        <stop offset="100%" stopColor="oklch(0.05 0.002 305)" />
      </linearGradient>
      <linearGradient id="mon-hi" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--neon)" stopOpacity="0.35" />
        <stop offset="100%" stopColor="var(--neon)" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="stand-metal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="oklch(0.22 0.006 305)" />
        <stop offset="100%" stopColor="oklch(0.10 0.004 305)" />
      </linearGradient>
      <linearGradient id="base-metal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="oklch(0.20 0.005 305)" />
        <stop offset="100%" stopColor="oklch(0.08 0.003 305)" />
      </linearGradient>
    </defs>
  );

  return (
    <div className="relative w-full" style={{ maxWidth: 960, perspective: 2200 }}>
      {/* ambient glow behind the whole machine */}
      <div
        className="absolute inset-0 -z-10 blur-3xl opacity-60 pointer-events-none anim-glow-breathe"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, color-mix(in oklab, var(--neon) 45%, transparent), transparent 70%)",
        }}
      />
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -4, 0] }}
        transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 } }}
        className="relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          initial={{ rotateY: 180 }}
          animate={{ rotateY: 0 }}
          transition={{ rotateY: { duration: 1.2, ease: [0.4, 0, 0.2, 1] } }}
          style={{ transformStyle: "preserve-3d" }}
        >

        {/* ---------------- LID (starts closed, hinges open) ---------------- */}
        <motion.div
          initial={{ rotateX: -90 }}
          animate={{ rotateX: 0 }}
          transition={{
            rotateX: { duration: 1, delay: 1.2, ease: [0.33, 1, 0.68, 1] },
          }}
          className="relative origin-bottom"
          style={{ transformStyle: "preserve-3d", transformOrigin: "50% 100%" }}
        >

          {/* ---- BACK SHELL: outer lid surface, visible while closed ---- */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              transform: "rotateY(180deg) translateZ(1px)",
              backfaceVisibility: "hidden",
              background:
                "linear-gradient(135deg, oklch(0.52 0.06 330) 0%, oklch(0.62 0.07 335) 35%, oklch(0.5 0.06 328) 68%, oklch(0.58 0.065 332) 100%)",
              boxShadow:
                "0 0 50px color-mix(in oklab, var(--neon) 40%, transparent), inset 0 1px 0 rgba(255,255,255,0.25)",
            }}
          >
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background:
                  "linear-gradient(115deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 45%, rgba(0,0,0,0.12) 100%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 18 20" className="w-[13%] opacity-90" fill="oklch(0.18 0.03 320)" aria-hidden>
                <path d="M11.5 7.6c0-2 1.6-2.9 1.7-3-0.9-1.4-2.4-1.6-2.9-1.6-1.2-0.1-2.4 0.7-3 0.7-0.6 0-1.6-0.7-2.7-0.7-1.4 0-2.7 0.8-3.4 2.1-1.5 2.5-0.4 6.3 1 8.4 0.7 1 1.6 2.2 2.7 2.2 1.1 0 1.5-0.7 2.8-0.7 1.3 0 1.7 0.7 2.8 0.7 1.2 0 1.9-1 2.6-2 0.8-1.2 1.2-2.3 1.2-2.4-0.1 0-2.3-0.9-2.3-3.5zM9.3 1.6C9.9 0.9 10.3-0.1 10.2-1c-0.9 0-2 0.6-2.6 1.3-0.5 0.6-1 1.6-0.9 2.5 1 0.1 2-0.5 2.6-1.2z" />
              </svg>
            </div>
          </div>

          <svg viewBox={`0 0 ${W} ${LID_H}`} className="w-full block" style={{ backfaceVisibility: "hidden" }} aria-hidden>
            {GRADS}
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
            <rect x={MON_X + 2} y={MON_Y + 2} width={MON_W - 4} height={30} rx={12} fill="url(#mon-hi)" />
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
            <rect x={SCREEN_X} y={SCREEN_Y} width={SCREEN_W} height={SCREEN_H} rx={4} fill="oklch(0.04 0.005 305)" />
            {/* Apple-style logo on bottom bezel */}
            <g transform={`translate(${W / 2 - 7}, ${MON_Y + MON_H - 22})`} fill="var(--neon)" fillOpacity="0.7">
              <path d="M11.5 7.6c0-2 1.6-2.9 1.7-3-0.9-1.4-2.4-1.6-2.9-1.6-1.2-0.1-2.4 0.7-3 0.7-0.6 0-1.6-0.7-2.7-0.7-1.4 0-2.7 0.8-3.4 2.1-1.5 2.5-0.4 6.3 1 8.4 0.7 1 1.6 2.2 2.7 2.2 1.1 0 1.5-0.7 2.8-0.7 1.3 0 1.7 0.7 2.8 0.7 1.2 0 1.9-1 2.6-2 0.8-1.2 1.2-2.3 1.2-2.4-0.1 0-2.3-0.9-2.3-3.5zM9.3 1.6C9.9 0.9 10.3-0.1 10.2-1c-0.9 0-2 0.6-2.6 1.3-0.5 0.6-1 1.6-0.9 2.5 1 0.1 2-0.5 2.6-1.2z" />
            </g>
            <circle cx={MON_X + MON_W - 22} cy={MON_Y + MON_H - 14} r={2.4} fill="var(--neon)">
              <animate attributeName="fill-opacity" values="0.4;1;0.4" dur="2.4s" repeatCount="indefinite" />
            </circle>
          </svg>

          {/* Screen content overlay */}
          <motion.div
            className="absolute overflow-hidden rounded-[4px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0.9, 0.4, 1] }}
            transition={{ duration: 0.5, delay: 2.2, times: [0, 0.2, 0.5, 0.7, 1] }}
            style={{
              backfaceVisibility: "hidden",
              left: `${(SCREEN_X / W) * 100}%`,
              top: `${(SCREEN_Y / LID_H) * 100}%`,
              width: `${(SCREEN_W / W) * 100}%`,
              height: `${(SCREEN_H / LID_H) * 100}%`,
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05] z-10"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, var(--neon) 0 1px, transparent 1px 3px)",
              }}
            />
            {/* animated wallpaper: drifting aurora blobs */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" style={{ background: "oklch(0.08 0.03 300)" }}>
              <motion.div
                className="absolute -inset-1/4 blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle at 30% 35%, color-mix(in oklab, var(--neon) 55%, transparent), transparent 55%)",
                }}
                animate={{ x: ["-6%", "8%", "-6%"], y: ["-4%", "6%", "-4%"], scale: [1, 1.15, 1] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -inset-1/4 blur-2xl opacity-70"
                style={{
                  background:
                    "radial-gradient(circle at 70% 65%, oklch(0.55 0.18 265 / 0.75), transparent 55%)",
                }}
                animate={{ x: ["6%", "-8%", "6%"], y: ["5%", "-6%", "5%"], scale: [1.1, 1, 1.1] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -inset-1/4 blur-3xl opacity-50"
                style={{
                  background:
                    "radial-gradient(circle at 50% 85%, oklch(0.5 0.2 330 / 0.7), transparent 60%)",
                }}
                animate={{ x: ["0%", "-6%", "0%"], y: ["0%", "-8%", "0%"] }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* faint grid */}
              <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--neon) 1px, transparent 1px), linear-gradient(90deg, var(--neon) 1px, transparent 1px)",
                  backgroundSize: "26px 26px",
                }}
              />
              {/* sheen sweep */}
              <motion.div
                className="absolute inset-y-0 w-1/3"
                style={{
                  background:
                    "linear-gradient(100deg, transparent, rgba(255,255,255,0.10), transparent)",
                }}
                animate={{ x: ["-120%", "320%"] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
              />
            </div>

            <div className="relative z-[5] w-full h-full flex items-center justify-center p-1">
              {children}
            </div>
          </motion.div>
        </motion.div>

        {/* ---------------- BASE (static deck) ---------------- */}
        <motion.svg
          viewBox={`0 0 ${W} ${NECK_H + BASE_H}`}
          className="w-full block -mt-px"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1] }}
          transition={{ duration: 1.7, times: [0, 0.7, 0.95], ease: "easeOut" }}
          aria-hidden
        >

          <rect
            x={MON_X + 40}
            y={0}
            width={MON_W - 80}
            height={NECK_H}
            fill="url(#stand-metal)"
            stroke="color-mix(in oklab, var(--neon) 25%, transparent)"
            strokeWidth="0.6"
          />
          <rect x={MON_X + 40} y={0} width={MON_W - 80} height={1} fill="var(--neon)" fillOpacity="0.3" />
          <path
            d={`M ${MON_X + 20} ${NECK_H}
                L ${MON_X + MON_W - 20} ${NECK_H}
                L ${MON_X + MON_W + 18} ${NECK_H + BASE_H - 8}
                Q ${MON_X + MON_W + 18} ${NECK_H + BASE_H - 2} ${MON_X + MON_W + 12} ${NECK_H + BASE_H - 2}
                L ${MON_X - 12} ${NECK_H + BASE_H - 2}
                Q ${MON_X - 18} ${NECK_H + BASE_H - 2} ${MON_X - 18} ${NECK_H + BASE_H - 8} Z`}
            fill="url(#base-metal)"
            stroke="color-mix(in oklab, var(--neon) 25%, transparent)"
            strokeWidth="0.8"
          />
          <path
            d={`M ${MON_X - 10} ${NECK_H + BASE_H - 5} L ${MON_X + MON_W + 10} ${NECK_H + BASE_H - 5}`}
            stroke="color-mix(in oklab, var(--neon) 32%, transparent)"
            strokeWidth="0.6"
            fill="none"
          />
          {/* Keyboard keys */}
          {[14, 14, 13, 12, 10].map((count, r) => {
            const inset = 46 - r * 4;
            const left = MON_X + inset;
            const right = MON_X + MON_W - inset;
            const gap = 2.4;
            const kw = (right - left - gap * (count - 1)) / count;
            const kh = 8.4;
            const y = NECK_H + 9 + r * (kh + 2.6);
            return (
              <g key={r}>
                {Array.from({ length: count }).map((_, i) => (
                  <rect
                    key={i}
                    x={left + i * (kw + gap)}
                    y={y}
                    width={kw}
                    height={kh}
                    rx={1.6}
                    fill="oklch(0.13 0.004 305)"
                    stroke="color-mix(in oklab, var(--neon) 16%, transparent)"
                    strokeWidth="0.4"
                  />
                ))}
              </g>
            );
          })}
          {/* Spacebar row */}
          <rect
            x={W / 2 - 90}
            y={NECK_H + 9 + 5 * 11}
            width={180}
            height={8.4}
            rx={1.6}
            fill="oklch(0.13 0.004 305)"
            stroke="color-mix(in oklab, var(--neon) 16%, transparent)"
            strokeWidth="0.4"
          />
          {/* Trackpad */}
          <rect
            x={W / 2 - 62}
            y={NECK_H + 9 + 6 * 11 + 5}
            width={124}
            height={26}
            rx={3}
            fill="oklch(0.10 0.003 305)"
            stroke="color-mix(in oklab, var(--neon) 20%, transparent)"
            strokeWidth="0.5"
          />

        </motion.svg>
        </motion.div>

      </motion.div>


      <div
        className="absolute left-1/2 -translate-x-1/2 -bottom-3 h-8 w-[70%] blur-2xl opacity-50 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, var(--neon), transparent 70%)",
        }}
      />
    </div>
  );
}
