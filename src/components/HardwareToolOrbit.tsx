import { motion, useReducedMotion } from "motion/react";
import {
  Binary,
  CircuitBoard,
  Code2,
  Cpu,
  GitBranch,
  Radio,
} from "lucide-react";

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
              className="group absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap text-neon"
              animate={reducedMotion ? undefined : { rotate: -direction }}
              transition={{ duration, ease: "linear", repeat: Infinity }}
            >
              <Icon
                aria-hidden="true"
                className="size-7 stroke-[1.6] drop-shadow-[0_0_9px_var(--neon)] transition-transform duration-300 group-hover:scale-125"
              />
              <span className="font-display text-xs uppercase tracking-[0.12em] opacity-80 transition-opacity group-hover:opacity-100">
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
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[276px] w-[276px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-neon/15" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[166px] w-[166px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon/10" />

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
        className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-neon/40 bg-background/80 text-neon shadow-[0_0_28px_var(--neon)]"
        animate={reducedMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cpu className="size-6" aria-hidden="true" />
      </motion.div>
    </div>
  );
}