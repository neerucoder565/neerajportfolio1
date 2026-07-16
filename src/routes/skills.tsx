import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/SiteShell";
import { Code2, CircuitBoard, Cpu } from "lucide-react";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Neeraj K" },
      { name: "description", content: "Programming, electronics hardware and embedded systems skills." },
      { property: "og:title", content: "Skills — Neeraj K" },
      { property: "og:description", content: "Embedded firmware, circuit design and embedded systems competencies." },
    ],
  }),
  component: Skills,
});

const GROUPS = [
  {
    icon: Code2,
    title: "Programming & Tools",
    items: [
      { name: "Embedded C", level: "Intermediate" },
      { name: "Arduino Prototyping", level: "Advanced" },
      { name: "Python", level: "Intermediate" },
      { name: "PID Control Systems", level: "Intermediate" },
      { name: "Edge AI Integration", level: "Beginner / Intermediate" },
      { name: "Altium", level: "Intermediate" },
      { name: "Tanner EDA", level: "Beginner" },
    ],
  },
  {
    icon: CircuitBoard,
    title: "Electronics & Hardware",
    items: [
      { name: "Circuit Design", level: "Intermediate" },
      { name: "R-2R DAC Systems", level: "Intermediate" },
      { name: "Sensor Fusion", level: "Intermediate" },
      { name: "Hardware Debugging", level: "Intermediate" },
      { name: "Breadboard Prototyping", level: "Intermediate" },
      { name: "Microcontrollers", level: "Intermediate" },
      { name: "Automation", level: "Intermediate" },
    ],
  },
  {
    icon: Cpu,
    title: "Embedded Systems",
    items: [
      { name: "RISC-V", level: "Beginner" },
      { name: "Real-Time Systems", level: "Intermediate" },
      { name: "System Testing & Validation", level: "Intermediate" },
      { name: "Signal Processing Basics", level: "Intermediate" },
    ],
  },
];

function Skills() {
  return (
    <Section eyebrow="CAPABILITY_LEVELS" title="Skill Telemetry">
      <div className="grid md:grid-cols-3 gap-6">
        {GROUPS.map((g) => (
          <div key={g.title} className="corners relative border border-border bg-card/40 p-6">
            <div className="flex items-center gap-3 mb-6">
              <g.icon className="text-neon" size={22} strokeWidth={1.5} />
              <h3 className="font-display uppercase text-sm tracking-widest">{g.title}</h3>
            </div>
            <ul className="space-y-4">
              {g.items.map((item) => (
                <li key={item.name} className="flex justify-between items-baseline gap-3 border-b border-border/40 pb-2">
                  <span className="text-sm">{item.name}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-neon whitespace-nowrap">{item.level}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
