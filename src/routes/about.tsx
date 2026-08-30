import { createFileRoute } from "@tanstack/react-router";
import { Panel, Section } from "@/components/SiteShell";
import { GraduationCap, FileText } from "lucide-react";
import certificatePlaceholder from "@/assets/hackathon-certificate-placeholder.pdf.asset.json";


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
      </Section>

      <Section eyebrow="ACHIEVEMENTS" title="Hackathons">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              project: "MediFind",
              event: "Genesis 2026",
              outcome: "Smart emergency hospital finder.",
              cert: genesisCert.url,
            },
            {
              project: "Arch Nova",
              event: "DVCon India 2026 Design Contest (Stage 1 & 2A)",
              outcome: "YOLO-based adaptive task-aware object detection with FPGA preprocessing context.",
              cert: null,
            },
            {
              project: "AutoManuscript AI",
              event: 'Team "The Big Four"',
              outcome: "Six-stage AI manuscript formatting pipeline with citation engine and dual validation.",
              cert: null,
            },
            {
              project: "UrjaNet",
              event: "MSME Idea Hackathon 6.0",
              outcome: "AI-powered NILM and carbon compliance platform.",
              cert: null,
            },
            {
              project: "Hackathon 360°",
              event: "National Level ECLearnix Innovation Challenge — Round 2",
              outcome: "Selected through to Round 2 of the national innovation challenge.",
              cert: ecLearnixCert.url,
            },
            {
              project: "Hackathon 360° 4.0",
              event: "International Level — NSIT-IFSCS & ECLearnix",
              outcome: "Round 1 participant in the international innovation and problem-solving track.",
              cert: intl40Cert.url,
            },
            {
              project: "Hackathon 360° 3.0",
              event: "International Level — KPR Institute of Engineering & Technology",
              outcome: "International hackathon focused on rapid innovation and prototyping.",
              cert: kprietCert.url,
            },
            {
              project: "Quintessence 2026",
              event: "SECE Student Society, Easwari Engineering College",
              outcome: "Technical quiz on core electronics and communication fundamentals.",
              cert: quintessenceCert.url,
            },
          ].map((h, i) => (
            <Panel key={h.project} className="flex flex-col justify-between gap-4">
              <div>
                <div className="text-xs text-neon tracking-[0.25em] mb-2">
                  // ENTRY_{String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-xl uppercase text-glow-soft">{h.project}</h3>
                <div className="text-sm text-muted-foreground mt-1">{h.event}</div>
                <p className="text-sm text-muted-foreground/80 mt-3 leading-relaxed">
                  {h.outcome}
                </p>
              </div>
              {h.cert && (
                <a
                  href={h.cert}
                  download
                  className="inline-flex items-center gap-2 self-start text-xs uppercase tracking-[0.2em] text-neon hover:text-neon-bright transition-colors"
                >
                  <FileText size={14} />
                  View Certificate
                </a>
              )}

            </Panel>
          ))}
        </div>
      </Section>
    </>
  );
}
