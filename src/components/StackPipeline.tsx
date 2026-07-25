import { useState } from "react";
import { motion } from "motion/react";
import { Cpu, Radio, Layers, type LucideIcon } from "lucide-react";

type Stage = {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  regs: [string, string][];
};

const STAGES: Stage[] = [
  {
    id: "MCU",
    icon: Cpu,
    title: "MCU & Firmware",
    desc: "STM32 (Cortex-M4) bare-metal, bootloader design, vector table relocation, interrupt-driven control loops in embedded C.",
    regs: [
      ["CORE", "Cortex-M4"],
      ["CLOCK", "84 MHz"],
      ["MODE", "Bare-metal"],
    ],
  },
  {
    id: "BUS",
    icon: Radio,
    title: "Peripherals & Buses",
    desc: "UART, SPI, I²C bring-up, sensor interfacing, DMA, and mixed-signal work — including R-2R DACs and PID actuation.",
    regs: [
      ["BUS", "UART / SPI / I²C"],
      ["XFER", "DMA"],
      ["ANALOG", "R-2R DAC"],
    ],
  },
  {
    id: "SYS",
    icon: Layers,
    title: "Systems & Edge AI",
    desc: "RTOS scheduling patterns, RISC-V (VEGA) fundamentals, and FPGA-fronted on-device vision pipelines.",
    regs: [
      ["RTOS", "Preemptive"],
      ["ISA", "RISC-V"],
      ["EDGE", "FPGA Vision"],
    ],
  },
];

function Connector({ delay }: { delay: number }) {
  return (
    <div className="relative hidden lg:flex h-px flex-1 items-center self-center">
      <div className="absolute inset-0 border-t border-dashed border-neon/40" />
      <motion.span
        className="absolute size-1.5 rounded-full bg-neon"
        style={{ boxShadow: "0 0 10px var(--neon)" }}
        initial={{ left: "0%", opacity: 0 }}
        animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.8, delay, repeat: Infinity, ease: "linear" }}
      />
      <span className="absolute -right-1 size-2 rotate-45 border-r border-t border-neon/60" />
    </div>
  );
}

export function StackPipeline() {
  const [active, setActive] = useState<string>(STAGES[0].id);

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0">
      {STAGES.map((s, i) => {
        const isActive = active === s.id;
        return (
          <div key={s.id} className="contents">
            <motion.button
              type="button"
              onMouseEnter={() => setActive(s.id)}
              onFocus={() => setActive(s.id)}
              onClick={() => setActive(s.id)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`corners relative w-full lg:w-[30%] text-left bg-card/40 border p-6 transition-colors ${
                isActive
                  ? "border-neon/70 bg-card/70"
                  : "border-border hover:border-neon/40"
              }`}
              style={
                isActive
                  ? { boxShadow: "0 0 24px -8px var(--neon)" }
                  : undefined
              }
            >
              <div className="flex items-center justify-between">
                <s.icon
                  className="text-neon"
                  size={26}
                  strokeWidth={1.5}
                />
                <span className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">
                  STAGE_0{i + 1} // {s.id}
                </span>
              </div>

              <h3 className="font-display text-xl uppercase mt-4 mb-3">
                {s.title}
              </h3>

              <div className="space-y-1 mb-4">
                {s.regs.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline gap-2 font-display text-[11px] tracking-widest"
                  >
                    <span className="text-muted-foreground">{k}</span>
                    <span className="flex-1 border-b border-dashed border-border/70" />
                    <span className="text-neon">{v}</span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>

              <div className="mt-4 h-px w-full bg-border/60 overflow-hidden">
                <motion.div
                  className="h-px bg-neon"
                  initial={false}
                  animate={{ width: isActive ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </motion.button>

            {i < STAGES.length - 1 && <Connector delay={i * 0.6} />}
          </div>
        );
      })}
    </div>
  );
}
