import { motion } from "motion/react";
import { ReactNode } from "react";

/**
 * Decorative laptop chassis that sits BEHIND its children.
 * The child (e.g. InteractivePCB) renders inside the "screen" area.
 * Animated: lid tilts open on mount, then a gentle idle float.
 */
export function LaptopFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative w-full"
      style={{ maxWidth: 620, perspective: "1600px" }}
    >
      {/* Lid + screen */}
      <motion.div
        initial={{ rotateX: -85, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        style={{ transformOrigin: "50% 100%", transformStyle: "preserve-3d" }}
        className="relative"
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative rounded-t-2xl border border-neon/30 bg-[oklch(0.10_0.01_170)] p-3 md:p-4 shadow-[0_0_60px_-20px_var(--neon)]"
        >
          {/* Webcam notch */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1.5 flex items-center gap-1.5 z-10">
            <span className="size-1 rounded-full bg-neon/60" />
            <span className="text-[7px] tracking-[0.3em] text-neon/50 font-mono">
              NK-CAM
            </span>
          </div>

          {/* Bezel / screen */}
          <div className="relative rounded-lg border border-neon/25 bg-background overflow-hidden pt-3">
            {/* Subtle scanline glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, var(--neon) 0 1px, transparent 1px 3px)",
              }}
            />
            <div className="relative flex items-center justify-center p-2 md:p-4">
              {children}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Hinge */}
      <div className="relative h-2 mx-auto w-[96%] bg-gradient-to-b from-[oklch(0.14_0.01_170)] to-[oklch(0.08_0.005_170)] border-x border-b border-neon/20" />

      {/* Base */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="relative mx-auto"
        style={{
          width: "108%",
          marginLeft: "-4%",
          transform: "perspective(900px) rotateX(58deg)",
          transformOrigin: "top center",
          height: 46,
          background:
            "linear-gradient(180deg, oklch(0.14 0.01 170) 0%, oklch(0.09 0.005 170) 60%, oklch(0.06 0.003 170) 100%)",
          borderRadius: "0 0 22px 22px",
          borderTop: "1px solid color-mix(in oklab, var(--neon) 25%, transparent)",
          boxShadow:
            "0 30px 60px -30px color-mix(in oklab, var(--neon) 40%, transparent)",
        }}
      >
        {/* Trackpad hint */}
        <div className="absolute left-1/2 top-2 -translate-x-1/2 w-1/3 h-1 rounded-full bg-neon/15" />
      </motion.div>

      {/* Floor glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -bottom-6 h-10 w-[70%] blur-2xl opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, var(--neon), transparent 70%)" }}
      />
    </div>
  );
}
