import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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

const TOOL_LOGOS = [
  { name: "C", icon: "https://cdn.simpleicons.org/c" },
  { name: "C++", icon: "https://cdn.simpleicons.org/cplusplus" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python" },
  { name: "Arduino", icon: "https://cdn.simpleicons.org/arduino" },
  { name: "STM32", icon: "https://cdn.simpleicons.org/stmicroelectronics" },
  { name: "FreeRTOS", icon: "https://cdn.simpleicons.org/freertos" },
  { name: "Altium", icon: "https://cdn.simpleicons.org/altiumdesigner" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git" },
];

function About() {
  return (
    <>
      <Section eyebrow="IDENTITY.LOG" title="About Neeraj K">
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          <Panel className="lg:col-span-2 h-full flex flex-col">
            <div className="text-xs text-neon tracking-[0.3em] mb-4">// BACKGROUND</div>
            <div className="max-w-[68ch] space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Electronics and Embedded Systems enthusiast with a strong interest in developing intelligent hardware and low-level software solutions.
              </p>
              <div className="text-xs text-neon tracking-[0.3em] pt-2">// SKILLS</div>
              <p className="text-muted-foreground leading-relaxed">
                Hands-on experience through academic and personal projects involving microcontrollers, circuit design, sensor interfacing, digital-to-analog conversion, motor control, and real-time system implementation. Proficient in C, C++, and Python, with a focus on hardware-software interaction, system optimization, and practical engineering problem-solving.
              </p>
              <div className="text-xs text-neon tracking-[0.3em] pt-2">// INTERESTS</div>
              <p className="text-muted-foreground leading-relaxed">
                Passionate about emerging technologies including RISC-V architectures, VLSI design, edge computing, and next-generation embedded platforms — continuously building projects to strengthen expertise in digital systems and semiconductor technologies.
              </p>
            </div>
          </Panel>
          <Panel className="h-full bg-card/70 backdrop-blur-sm">
            <div className="text-xs text-neon tracking-[0.3em] mb-4">// QUICK SPECS</div>
            <ul className="space-y-2 text-sm">
              {[
                { k: "Role", v: "Hardware Engineer" },
                { k: "Focus", v: "Embedded / VLSI" },
                { k: "Location", v: "India" },
              ].map((s) => (
                <li key={s.k} className="spec-row flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    <span className="text-neon mr-1">&gt;</span>{s.k}
                  </span>
                  <span className="text-cyan">{s.v}</span>
                </li>
              ))}
              <li className="spec-row flex justify-between gap-4 items-center">
                <span className="text-muted-foreground">
                  <span className="text-neon mr-1">&gt;</span>Status
                </span>
                <span className="inline-flex items-center gap-2 text-cyan">
                  <span
                    className="status-dot size-2 rounded-full"
                    style={{ backgroundColor: "var(--cyan)" }}
                  />
                  Open to work
                </span>
              </li>
            </ul>
          </Panel>
        </div>
      </Section>




      <Section eyebrow="EDUCATION" title="Trajectory">
        <div className="grid md:grid-cols-1 gap-6">
          <Panel>
            <div className="flex items-start justify-between gap-4">
              <div>
                <GraduationCap className="text-neon mb-3" size={24} strokeWidth={1.5} />
                <h3 className="font-display text-xl uppercase">Education</h3>
                <div className="mt-4">
                  <div className="text-sm">B.E. — Electronics & Communication Engineering</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Easwari Engineering College
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-neon tracking-[0.2em] mb-1">// CGPA</div>
                <div className="font-display text-3xl text-cyan glow-text">8.2<span className="text-sm text-muted-foreground ml-1">/10</span></div>
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

        <div className="mt-10">
          <div className="text-xs text-neon tracking-[0.3em] mb-4">// TOOLS &amp; PLATFORMS</div>
          <div className="flex flex-wrap gap-3">
            {TOOL_LOGOS.map((t) => (
              <div
                key={t.name}
                title={t.name}
                className="corners relative group flex items-center gap-2.5 border border-border bg-card/40 px-3.5 py-2.5 transition-all duration-300 hover:border-[var(--neon-bright)]/50 hover:shadow-[0_0_18px_color-mix(in_oklab,var(--neon-bright)_35%,transparent)]"
              >
                <span className="size-8 rounded-md bg-white/95 flex items-center justify-center p-1.5 shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <img
                    src={t.icon}
                    alt={`${t.name} logo`}
                    loading="lazy"
                    className="size-full object-contain"
                  />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
