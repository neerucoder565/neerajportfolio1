import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";

type Stage = {
  id: string;
  label: string;
  note: string;
  items: string[];
};

const STAGES: Stage[] = [
  {
    id: "01",
    label: "REQUIREMENTS",
    note: "Define the problem before touching a soldering iron.",
    items: ["Spec Capture", "Constraints", "Feasibility"],
  },
  {
    id: "02",
    label: "SYSTEM DESIGN",
    note: "Block diagrams, signal paths, and part selection.",
    items: ["Block Diagram", "MCU Selection", "Power Budget"],
  },
  {
    id: "03",
    label: "HARDWARE",
    note: "Schematic capture, prototyping, and board bring-up.",
    items: ["Altium", "Breadboard", "R-2R DAC", "Sensors"],
  },
  {
    id: "04",
    label: "FIRMWARE",
    note: "Bare-metal control loops and boot infrastructure.",
    items: ["Embedded C", "Bootloader", "RTOS", "Drivers"],
  },
  {
    id: "05",
    label: "DEBUGGING",
    note: "Instrument everything, then chase the anomaly.",
    items: ["UART Logs", "Oscilloscope", "SWD / GDB"],
  },
  {
    id: "06",
    label: "VALIDATION",
    note: "Measure against the spec, not against the vibe.",
    items: ["Step Response", "Linearity Sweep", "Stress Runs"],
  },
  {
    id: "07",
    label: "DEPLOYMENT",
    note: "Flash, field-test, and document for the next revision.",
    items: ["Flash Map", "Field Test", "Docs"],
  },
];

const SIZE = 540;
const C = SIZE / 2;
const R = 152;
const CIRC = 2 * Math.PI * R;
const N = STAGES.length;

function pointAt(i: number, radius = R) {
  const a = (i / N) * Math.PI * 2 - Math.PI / 2;
  return { x: C + radius * Math.cos(a), y: C + radius * Math.sin(a), a };
}

export function EngineeringCycle() {
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const stage = STAGES[index];

  const nodes = useMemo(
    () => STAGES.map((s, i) => ({ ...s, ...pointAt(i), i })),
    [],
  );

  const progress = index / (N - 1);
  const dashOffset = CIRC * (1 - progress);

  // loop pulse when last stage reached
  const [loopPulse, setLoopPulse] = useState(0);
  useEffect(() => {
    if (index === N - 1) setLoopPulse((v) => v + 1);
  }, [index]);

  return (
    <div className="relative overflow-hidden" role="tablist" aria-label="Engineering cycle stages">
      <div
        className="relative mx-auto"
        style={{ width: SIZE, maxWidth: "100%" }}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            setIndex((i) => (i + 1) % N);
          } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            setIndex((i) => (i - 1 + N) % N);
          }
        }}
      >
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="w-full h-auto overflow-visible"
        >
          <defs>
            <linearGradient id="ec-arc" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c4b5fd" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <filter id="ec-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="7" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* base ring */}
          <circle
            cx={C}
            cy={C}
            r={R}
            fill="none"
            stroke="#a78bfa"
            strokeOpacity={0.22}
            strokeWidth={3}
          />

          {/* progress arc */}
          <motion.circle
            cx={C}
            cy={C}
            r={R}
            fill="none"
            stroke="url(#ec-arc)"
            strokeWidth={6}
            strokeLinecap="round"
            filter="url(#ec-glow)"
            strokeDasharray={CIRC}
            transform={`rotate(-90 ${C} ${C})`}
            initial={{ strokeDashoffset: CIRC }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ type: "spring", stiffness: 60, damping: 18 }}
          />

          {/* traveling spark along the ring */}
          <motion.circle
            r={5}
            fill="#f3e8ff"
            filter="url(#ec-glow)"
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              path={`M ${C} ${C - R} A ${R} ${R} 0 1 1 ${C - 0.01} ${C - R}`}
            />
          </motion.circle>

          {/* occasional signal dots */}
          {[0, 1, 2].map((k) => (
            <circle key={k} r={3} fill="#c4b5fd" opacity={0.8}>
              <animateMotion
                dur={`${7 + k * 2}s`}
                begin={`${k * 2.5}s`}
                repeatCount="indefinite"
                path={`M ${C} ${C - R} A ${R} ${R} 0 1 1 ${C - 0.01} ${C - R}`}
              />
              <animate
                attributeName="opacity"
                values="0;0.9;0"
                dur={`${7 + k * 2}s`}
                begin={`${k * 2.5}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* loop-complete pulse */}
          <AnimatePresence>
            {loopPulse > 0 && (
              <motion.circle
                key={loopPulse}
                cx={C}
                cy={C}
                r={R}
                fill="none"
                stroke="#f3e8ff"
                strokeWidth={4}
                initial={{ opacity: 0.8, scale: 1 }}
                animate={{ opacity: 0, scale: 1.07 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                style={{ transformOrigin: `${C}px ${C}px` }}
              />
            )}
          </AnimatePresence>

          {/* leader lines */}
          {nodes.map((n) => {
            const outer = pointAt(n.i, R + 46);
            const isOn = n.i === index || n.i === hover;
            return (
              <motion.line
                key={`l-${n.id}`}
                x1={n.x}
                y1={n.y}
                x2={outer.x}
                y2={outer.y}
                stroke="#a78bfa"
                strokeWidth={1.5}
                strokeOpacity={isOn ? 0.95 : 0.35}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.4 + n.i * 0.1, duration: 0.5 }}
              />
            );
          })}
        </svg>

        {/* nodes */}
        {nodes.map((n) => {
          const done = n.i < index;
          const isActive = n.i === index;
          const pct = (v: number) => `${(v / SIZE) * 100}%`;
          return (
            <motion.button
              key={n.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={n.label}
              onMouseEnter={() => setHover(n.i)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setIndex(n.i)}
              className="absolute grid place-items-center rounded-full font-mono text-[11px] tracking-[0.08em]"
              style={{
                left: pct(n.x),
                top: pct(n.y),
                width: 44,
                height: 44,
                marginLeft: -22,
                marginTop: -22,
                background: done
                  ? "#7c3aed"
                  : isActive
                    ? "rgba(124,58,237,0.45)"
                    : "rgba(10,14,23,0.7)",
                border: `1.5px solid ${isActive ? "#e9d5ff" : done ? "#a78bfa" : "rgba(167,139,250,0.4)"}`,
                color: done || isActive ? "#f5f3ff" : "rgba(196,181,253,0.65)",
                boxShadow: isActive
                  ? "0 0 22px rgba(167,139,250,0.95), 0 0 52px rgba(124,58,237,0.55), inset 0 0 14px rgba(196,181,253,0.15)"
                  : hover === n.i
                    ? "0 0 16px rgba(167,139,250,0.65), 0 0 32px rgba(124,58,237,0.3)"
                    : "none",
                opacity: done || isActive ? 1 : 0.8,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={
                isActive
                  ? { scale: [1.08, 1.14, 1.08], opacity: 1 }
                  : { scale: hover === n.i ? 1.06 : 1, opacity: 1 }
              }
              transition={
                isActive
                  ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  : { type: "spring", stiffness: 320, damping: 14, delay: n.i * 0.1 }
              }
            >
              {done ? <Check size={14} strokeWidth={3} /> : n.id}
              {isActive && (
                <motion.span
                  className="pointer-events-none absolute rounded-full"
                  style={{
                    inset: -10,
                    border: "1.5px dashed rgba(196,181,253,0.75)",
                    boxShadow: "0 0 14px rgba(167,139,250,0.35)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              )}
            </motion.button>
          );
        })}

        {/* labels */}
        {nodes.map((n) => {
          const p = pointAt(n.i, R + 40);
          const isOn = n.i === index || n.i === hover;
          const cos = Math.cos(p.a);
          const align =
            Math.abs(cos) < 0.35 ? "center" : cos > 0 ? "left" : "right";
          return (
            <motion.div
              key={`t-${n.id}`}
              className="pointer-events-none absolute font-mono text-[11px] md:text-[12px] uppercase tracking-[0.18em] whitespace-nowrap"
              style={{
                left: `${(p.x / SIZE) * 100}%`,
                top: `${(p.y / SIZE) * 100}%`,
                transform: `translate(${align === "center" ? "-50%" : align === "left" ? "0%" : "-100%"}, -50%)`,
                color: isOn ? "#a78bfa" : "rgba(124,58,237,0.7)",
                textShadow: isOn
                  ? "0 0 8px rgba(124,58,237,0.95), 0 0 22px rgba(124,58,237,0.65), 0 0 38px rgba(124,58,237,0.35)"
                  : "0 0 10px rgba(124,58,237,0.2)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + n.i * 0.1 }}
            >
              {n.label}
            </motion.div>
          );
        })}

        {/* hub */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 220, damping: 22, duration: 0.3 }}
              className="w-[200px] p-3 text-center"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#a78bfa]"
                   style={{ textShadow: "0 0 6px rgba(124,58,237,0.8)" }}>
                Stage {stage.id} of 07
              </div>
              <div className="mt-1.5 font-mono text-base uppercase tracking-[0.12em] text-foreground"
                   style={{ textShadow: "0 0 10px rgba(124,58,237,0.75), 0 0 22px rgba(0,0,0,0.55)" }}>
                {stage.label}
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-[#c4b5fd]"
                 style={{ textShadow: "0 0 8px rgba(0,0,0,0.7)" }}>
                {stage.note}
              </p>
              <div className="mt-2.5 flex flex-wrap justify-center gap-1.5">
                {stage.items.map((it) => (
                  <span
                    key={it}
                    className="rounded-full bg-[#0a0e17]/50 border border-[rgba(167,139,250,0.35)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em] text-[#c4b5fd]"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
