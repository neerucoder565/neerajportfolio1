import { motion, useReducedMotion } from "motion/react";
import {
  Binary,
  CircuitBoard,
  Code2,
  Cpu,
  GitBranch,
  Radio,
} from "lucide-react";

const RED_LIGHT = "#DC2626";
const RED_DARK = "#991B1B";
const RED_CORE = "#7F1D1D";
const RED_GLOW = `${RED_LIGHT}CC`;
const RED_SOFT = `${RED_LIGHT}4D`;

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
              className="group absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap"
              animate={reducedMotion ? undefined : { rotate: -direction }}
              transition={{ duration, ease: "linear", repeat: Infinity }}
            >
              <div
                className="grid size-10 place-items-center rounded-full border"
                style={{
                  background: "oklch(0.12 0.02 25 / 0.72)",
                  borderColor: RED_LIGHT,
                  boxShadow: `0 0 10px ${RED_GLOW}, inset 0 0 12px ${RED_CORE}`,
                }}
              >
                <Icon
                  aria-hidden="true"
                  className="size-5 stroke-[2] text-white transition-transform duration-300 group-hover:scale-110"
                  style={{
                    filter: `drop-shadow(0 0 6px ${RED_LIGHT})`,
                  }}
                />
              </div>
              <span
                className="font-display text-sm font-semibold uppercase tracking-[0.12em] opacity-95 transition-opacity group-hover:opacity-100"
                style={{
                  color: RED_LIGHT,
                  textShadow:
                    `0 0 8px ${RED_LIGHT}, 0 0 16px ${RED_DARK}, 0 0 24px ${RED_LIGHT}`,
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
            "radial-gradient(circle, oklch(0.12 0.04 25 / 0.5) 0%, oklch(0.12 0.04 25 / 0.18) 55%, transparent 72%)",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[276px] w-[276px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
        style={{ borderColor: RED_SOFT }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[166px] w-[166px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
        style={{ borderColor: `${RED_LIGHT}26` }}
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
          background: `linear-gradient(135deg, ${RED_LIGHT}, ${RED_DARK})`,
          borderColor: RED_LIGHT,
          boxShadow: `0 0 28px ${RED_GLOW}`,
        }}
        animate={reducedMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cpu className="size-6" aria-hidden="true" style={{ filter: `drop-shadow(0 0 6px ${RED_DARK})` }} />
      </motion.div>
    </div>
  );
}
