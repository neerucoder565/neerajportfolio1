import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";

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

export function EngineeringWorkflow() {
  const [active, setActive] = useState<string | null>(STAGES[0].id);
  const activeStage = STAGES.find((s) => s.id === active) ?? null;

  return (
    <div className="corners relative border border-border bg-card/40 p-5 md:p-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(var(--neon) 1px, transparent 1px), linear-gradient(90deg, var(--neon) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative">
        {/* Horizontal rail */}
        <div className="flex items-stretch gap-2 md:gap-3 overflow-x-auto pb-2">
          {STAGES.map((s, i) => {
            const isActive = active === s.id;
            return (
              <div key={s.id} className="flex items-center shrink-0">
                <motion.button
                  type="button"
                  onMouseEnter={() => setActive(s.id)}
                  onFocus={() => setActive(s.id)}
                  onClick={() => setActive(isActive ? null : s.id)}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className={`group relative border-t-2 pt-3 px-3 md:px-4 pb-2 min-w-[130px] md:min-w-[150px] text-left transition-colors ${
                    isActive
                      ? "border-neon bg-neon/5"
                      : "border-border hover:border-neon/50"
                  }`}
                >
                  <div className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">
                    {s.id}
                  </div>
                  <div
                    className={`font-display text-sm md:text-base uppercase tracking-[0.18em] mt-1 transition-colors ${
                      isActive ? "text-neon" : "text-foreground"
                    }`}
                  >
                    {s.label}
                  </div>
                </motion.button>

                {i < STAGES.length - 1 && (
                  <div className="flex items-center gap-1 px-1 text-muted-foreground">
                    <span className="h-px w-4 md:w-6 bg-border" />
                    <ArrowRight size={14} className="text-neon/70" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Detail panel */}
        <div className="mt-5 border-t border-dashed border-border/70 pt-5 min-h-[120px]">
          <AnimatePresence mode="wait">
            {activeStage && (
              <motion.div
                key={activeStage.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                  {activeStage.note}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeStage.items.map((it) => (
                    <span
                      key={it}
                      className="border border-neon/40 text-neon px-2.5 py-1 font-display text-[10px] uppercase tracking-[0.2em]"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
