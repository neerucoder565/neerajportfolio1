import { motion, useReducedMotion } from "motion/react";
import {
  Binary,
  CircuitBoard,
  Code2,
  Cpu,
  GitBranch,
  Radio,
} from "lucide-react";

const CYAN_LIGHT = "#22D3EE";
const CYAN_DARK = "#0891B2";
const CYAN_GLOW = `${CYAN_LIGHT}CC`;
const CYAN_SOFT = `${CYAN_LIGHT}4D`;
const RAINBOW =
  "conic-gradient(from 0deg, #FF0000, #FF8C00, #FFD700, #22C55E, #06B6D4, #6366F1, #EC4899, #FF0000)";

const OUTER_TOOLS = [
  { name: "STM32", icon: Cpu },
  { name: "ESP32", icon: Radio },
  { name: "ARDUINO", icon: CircuitBoard },
  { name: "ALTIUM", icon: CircuitBoard },
  { name: "QNX", icon: Binary },
  { name: "RISC-V", icon: Cpu },
];

const INNER_TOOLS = [
  { name: "EMBEDDED C", icon: Code2 },
  { name: "FreeRTOS", icon: Cpu },
  { name: "TANNER EDA", icon: CircuitBoard },
  { name: "PYTHON", icon: Code2 },
  { name: "GIT", icon: GitBranch },
];

type OrbitProps = {
  tools: typeof OUTER_TOOLS;
  radius: number;
  duration: number;
  reverse?: boolean;
  reducedMotion: boolean;
};

function Orbit({ tools, radius, duration, reverse, reducedMotion }: OrbitProps) {
  const direction = reverse ? -360 : 360;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 size-0"
      animate={reducedMotion ? undefined : { rotate: direction }}
      transition={{ duration, ease: "linear", repeat: Infinity }}
    >
      {tools.map((tool, index) => {
        const angle = (360 / tools.length) * index;
        const Icon = tool.icon;
        return (
          <div
            key={tool.name}
            className="absolute left-0 top-0"
            style={{ transform: `rotate(${angle}deg) translateY(-${radius}px)` }}
          >
            <motion.div
              className="group absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap text-white"
              animate={reducedMotion ? undefined : { rotate: -direction }}
              transition={{ duration, ease: "linear", repeat: Infinity }}
            >
              <Icon
                aria-hidden="true"
                className="size-8 stroke-[2] transition-transform duration-300 group-hover:scale-125"
                style={{
                  filter: `drop-shadow(0 0 8px ${CYAN_LIGHT}) drop-shadow(0 0 16px ${CYAN_DARK})`,
                }}
              />
              <span
                className="font-display text-sm font-semibold uppercase tracking-[0.12em] opacity-95 transition-opacity group-hover:opacity-100"
                style={{
                  color: CYAN_LIGHT,
                  textShadow:
                    `0 0 8px ${CYAN_LIGHT}, 0 0 16px ${CYAN_DARK}, 0 0 24px ${CYAN_LIGHT}`,
                }}
              >
                {tool.name}
              </span>
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
}

export function HardwareToolOrbit() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div
      className="relative mx-auto h-[330px] w-full max-w-[560px] overflow-hidden"
      aria-label="Hardware and embedded engineering tools"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.12 0.02 305 / 0.55) 0%, oklch(0.12 0.02 305 / 0.2) 55%, transparent 72%)",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[276px] w-[276px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
        style={{ borderColor: CYAN_SOFT }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[166px] w-[166px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
        style={{ borderColor: `${CYAN_LIGHT}26` }}
      />

      <Orbit
        tools={OUTER_TOOLS}
        radius={138}
        duration={34}
        reducedMotion={reducedMotion}
      />
      <Orbit
        tools={INNER_TOOLS}
        radius={83}
        duration={24}
        reverse
        reducedMotion={reducedMotion}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-white"
        style={{
          background: `linear-gradient(135deg, ${CYAN_LIGHT}, ${CYAN_DARK})`,
          borderColor: CYAN_LIGHT,
          boxShadow: `0 0 28px ${CYAN_GLOW}`,
        }}
        animate={reducedMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cpu className="size-6" aria-hidden="true" style={{ filter: `drop-shadow(0 0 6px ${CYAN_DARK})` }} />
      </motion.div>
    </div>
  );
}
