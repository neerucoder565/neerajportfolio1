import { motion } from "motion/react";

interface HudCircleProps {
  label?: string;
  size?: number;
}

/**
 * Animated HUD circle inspired by Alqen.io reference.
 * Concentric rings, rotating arcs, orbiting nodes, and a glowing core.
 */
export function HudCircle({ label = "SYS", size = 420 }: HudCircleProps) {
  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Outer rotating thick arc */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 anim-spin-slow"
      >
        <defs>
          <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--neon)" stopOpacity="1" />
            <stop offset="60%" stopColor="var(--neon)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--neon)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 100 6 A 94 94 0 0 1 188 70"
          fill="none"
          stroke="url(#arcGrad)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 12 130 A 94 94 0 0 0 80 192"
          fill="none"
          stroke="url(#arcGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>

      {/* Dashed ring */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 anim-spin-reverse">
        <circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke="var(--neon)"
          strokeWidth="0.6"
          strokeDasharray="2 4"
          opacity="0.55"
        />
      </svg>

      {/* Inner ring with tick marks */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 anim-spin-slow">
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke="var(--neon)"
          strokeWidth="0.4"
          opacity="0.45"
        />
        {Array.from({ length: 36 }).map((_, i) => (
          <line
            key={i}
            x1="100"
            y1="28"
            x2="100"
            y2={i % 3 === 0 ? "22" : "26"}
            stroke="var(--neon)"
            strokeWidth="0.6"
            opacity={i % 3 === 0 ? "0.7" : "0.3"}
            transform={`rotate(${i * 10} 100 100)`}
          />
        ))}
      </svg>

      {/* Orbiting nodes */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, ease: "linear", repeat: Infinity }}
      >
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon"
            style={{
              transform: `rotate(${deg}deg) translateY(-${size * 0.38}px)`,
              backgroundColor: "var(--neon)",
              boxShadow: "0 0 10px var(--neon)",
            }}
          />
        ))}
      </motion.div>

      {/* Hex core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex h-[42%] w-[42%] items-center justify-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0 anim-pulse-neon">
            <polygon
              points="50,6 90,28 90,72 50,94 10,72 10,28"
              fill="none"
              stroke="var(--neon)"
              strokeWidth="1"
              opacity="0.5"
            />
            <polygon
              points="50,16 80,33 80,67 50,84 20,67 20,33"
              fill="var(--neon)"
              opacity="0.06"
            />
          </svg>
          <div className="z-10 text-center">
            <div className="font-display text-neon text-2xl tracking-[0.2em]">
              {"</>"}
            </div>
            <div className="font-display text-neon text-xl tracking-[0.3em]">
              {label}
            </div>
            <div className="font-display text-neon text-2xl tracking-[0.2em]">
              {"</>"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
