import { createFileRoute } from "@tanstack/react-router";
import { Panel, Section } from "@/components/SiteShell";
import { Briefcase, MapPin, Calendar, Target } from "lucide-react";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Neeraj K" },
      { name: "description", content: "Current internship pursuit and hands-on engineering experience in embedded systems and hardware design." },
      { property: "og:title", content: "Experience — Neeraj K" },
      { property: "og:description", content: "Embedded systems and hardware engineering internship candidate." },
    ],
  }),
  component: Experience,
});

const MILESTONES = [
  {
    icon: Briefcase,
    title: "Internship — Embedded Systems / Hardware",
    status: "Currently pursuing",
    meta: [
      { label: "Focus", value: "Embedded firmware, hardware design, testing & validation" },
      { label: "Location", value: "India / Remote" },
      { label: "Timeline", value: "Open for upcoming internships" },
    ],
    body: "I am actively seeking an internship where I can contribute to embedded firmware development, circuit design, sensor integration, and hardware debugging. I’m eager to work under experienced engineers, learn real-world product workflows, and apply my hands-on project experience in a professional setting.",
  },
];

const HIGHLIGHTS = [
  { title: "Embedded Firmware", desc: "Bare-metal C, STM32 vector-table relocation, MSP configuration, and flash partitioning." },
  { title: "Circuit Design", desc: "R-2R DACs, sensor interfacing, breadboard prototyping, and signal debugging." },
  { title: "Problem Solving", desc: "End-to-end project ownership, from concept and simulation to working hardware." },
];

function Experience() {
  return (
    <>
      <Section eyebrow="WORK_LOG" title="Experience">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {MILESTONES.map((m) => (
              <Panel key={m.title}>
                <div className="flex items-center gap-3 mb-4">
                  <m.icon className="text-neon" size={26} strokeWidth={1.5} />
                  <span className="text-xs uppercase tracking-[0.2em] text-neon">{m.status}</span>
                </div>
                <h3 className="font-display text-xl md:text-2xl uppercase mb-4">{m.title}</h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-5">
                  {m.meta.map((item) => (
                    <div key={item.label} className="flex items-start gap-2 text-sm">
                      <span className="text-neon">//</span>
                      <span className="text-muted-foreground">{item.label}:</span>
                      <span>{item.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">{m.body}</p>
              </Panel>
            ))}
          </div>

          <Panel className="h-fit">
            <div className="text-xs text-neon tracking-[0.3em] mb-4">// STATUS</div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="size-2 rounded-full bg-neon anim-pulse-neon" />
                <span className="text-sm">Actively seeking internship</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-neon" />
                <span className="text-sm text-muted-foreground">India / Remote</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-neon" />
                <span className="text-sm text-muted-foreground">Available for upcoming internships</span>
              </div>
              <div className="flex items-center gap-3">
                <Target size={16} className="text-neon" />
                <span className="text-sm text-muted-foreground">Embedded Systems / Hardware</span>
              </div>
            </div>
          </Panel>
        </div>
      </Section>

      <Section eyebrow="VALUE_ADD" title="What I bring">
        <div className="grid md:grid-cols-3 gap-6">
          {HIGHLIGHTS.map((h) => (
            <Panel key={h.title}>
              <h3 className="font-display text-lg uppercase mb-2">{h.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
            </Panel>
          ))}
        </div>
      </Section>
    </>
  );
}
