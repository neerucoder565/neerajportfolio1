import { createFileRoute } from "@tanstack/react-router";
import { Panel, Section } from "@/components/SiteShell";
import { Cpu, Wrench, CircuitBoard, FlaskConical, Bug, BookOpen } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Neeraj K" },
      { name: "description", content: "Hardware engineering services: embedded prototyping, circuit design, testing, debugging." },
      { property: "og:title", content: "Services — Neeraj K" },
      { property: "og:description", content: "Embedded systems prototyping, electronics development, simulation and debugging." },
    ],
  }),
  component: Services,
});

const SERVICES = [
  { icon: Cpu, title: "Embedded Systems Prototyping", desc: "From idea to working firmware on Arduino and embedded MCUs." },
  { icon: Wrench, title: "Arduino-Based Development", desc: "End-to-end Arduino projects with sensors, actuators and control loops." },
  { icon: CircuitBoard, title: "Electronics Hardware Development", desc: "Schematic design, breadboard layout and component selection." },
  { icon: FlaskConical, title: "Circuit Simulation & Testing", desc: "Validate behavior in simulation before committing to hardware." },
  { icon: Bug, title: "Hardware Debugging & Optimization", desc: "Diagnose noisy signals, timing issues and component-level faults." },
  { icon: BookOpen, title: "Engineering Research & Implementation", desc: "Translate concepts and papers into working hardware demos." },
];

function Services() {
  return (
    <Section eyebrow="SERVICE_MATRIX" title="What I Build">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((s, i) => (
          <Panel key={s.title}>
            <div className="flex items-center justify-between mb-4">
              <s.icon className="text-neon" size={26} strokeWidth={1.5} />
              <span className="text-[10px] text-neon tracking-[0.3em]">SVC_{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="font-display text-lg uppercase">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </Panel>
        ))}
      </div>
    </Section>
  );
}
