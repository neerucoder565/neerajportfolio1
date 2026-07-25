import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown } from "lucide-react";

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

      <div className="relative flex flex-col">
        {STAGES.map((s, i) => {
          const isActive = active === s.id;
          return (
            <div key={s.id}>
              <motion.button
                type="button"
                onMouseEnter={() => setActive(s.id)}
                onFocus={() => setActive(s.id)}
                onClick={() => setActive(isActive ? null : s.id)}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`group w-full text-left border-l-2 pl-4 md:pl-6 py-3 transition-colors ${
                  isActive
                    ? "border-neon bg-neon/5"
                    : "border-border hover:border-neon/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">
                    {s.id}
                  </span>
                  <span
                    className={`font-display text-base md:text-xl uppercase tracking-[0.2em] transition-colors ${
                      isActive ? "text-neon" : "text-foreground"
                    }`}
                  >
                    {s.label}
                  </span>
                  <span className="hidden md:block flex-1 border-b border-dashed border-border/70" />
                </div>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 text-sm text-muted-foreground leading-relaxed max-w-xl">
                        {s.note}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {s.items.map((it) => (
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
              </motion.button>

              {i < STAGES.length - 1 && (
                <div className="flex items-center gap-2 pl-3 md:pl-5 py-1 text-muted-foreground">
                  <ArrowDown size={14} className="text-neon/70" />
                  <span className="h-px w-6 bg-border" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
