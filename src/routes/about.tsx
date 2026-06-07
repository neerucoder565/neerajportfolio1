import { createFileRoute } from "@tanstack/react-router";
import { Panel, Section } from "@/components/SiteShell";
import { GraduationCap } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Neeraj K" },
      { name: "description", content: "Engineer with deep interest in embedded systems, automotive tech and electronics design." },
      { property: "og:title", content: "About — Neeraj K" },
      { property: "og:description", content: "Structural & weight analysis engineer building hardware-focused projects." },
    ],
  }),
  component: About,
});

const SKILLS = [
  "Embedded Systems", "Arduino Programming", "Electronics Circuit Design",
  "Sensor Fusion", "PID Control Systems", "DAC Design (R-2R Ladder)",
  "Circuit Simulation & Testing", "Hardware Debugging", "PCB / Breadboard Prototyping",
  "Structural Analysis", "Weight Analysis", "Basic AI + Hardware Integration",
];

function About() {
  return (
    <>
      <Section eyebrow="IDENTITY.LOG" title="About Neeraj K">
        <div className="grid lg:grid-cols-3 gap-8">
          <Panel className="lg:col-span-2">
            <p className="text-muted-foreground leading-relaxed">
              Electronics and Embedded Systems enthusiast with a strong interest in developing intelligent hardware and low-level software solutions. Hands-on experience through academic and personal projects involving microcontrollers, circuit design, sensor interfacing, digital-to-analog conversion, motor control, and real-time system implementation.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Proficient in C, C++, and Python, with a focus on understanding hardware-software interaction, system optimization, and practical engineering problem-solving. Passionate about emerging technologies including RISC-V architectures, VLSI design, edge computing, and next-generation embedded platforms. Continuously exploring new concepts and building projects to strengthen expertise in embedded electronics, digital systems, and semiconductor technologies.
            </p>
          </Panel>
          <Panel>
            <div className="text-xs text-neon tracking-[0.3em] mb-4">// QUICK SPECS</div>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between"><span className="text-muted-foreground">Role</span><span>Hardware Engineer</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">Focus</span><span>Embedded / VLSI</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">Location</span><span>India</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">Status</span><span className="text-neon">Open to work</span></li>
            </ul>
          </Panel>
        </div>
      </Section>

      <Section eyebrow="EDUCATION" title="Trajectory">
        <div className="grid md:grid-cols-1 gap-6">
          <Panel>
            <GraduationCap className="text-neon mb-3" size={24} strokeWidth={1.5} />
            <h3 className="font-display text-xl uppercase">Education</h3>
            <div className="mt-4">
              <div className="text-sm">B.E. — Electronics & Communication Engineering</div>
              <div className="text-xs text-muted-foreground mt-1">
                Easwari Engineering College
              </div>
            </div>
          </Panel>
        </div>
      </Section>

      <Section eyebrow="TECHNICAL STACK" title="Skills Matrix">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {SKILLS.map((s, i) => (
            <div
              key={s}
              className="corners relative border border-border bg-card/30 px-4 py-3 text-sm glow-border-hover"
            >
              <span className="text-neon mr-2 text-xs">{String(i + 1).padStart(2, "0")}</span>
              {s}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
