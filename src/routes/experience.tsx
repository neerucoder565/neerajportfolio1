import { createFileRoute } from "@tanstack/react-router";
import { Panel, Section } from "@/components/SiteShell";
import { Briefcase, MapPin, Calendar, Target, Cog, Factory, Users, Clock, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Neeraj K" },
      { name: "description", content: "Engineering internship at HL Mando Anand Pvt Ltd — manufacturing automation and process improvement." },
      { property: "og:title", content: "Experience — Neeraj K" },
      { property: "og:description", content: "Engineering intern working on manufacturing automation initiatives." },
    ],
  }),
  component: Experience,
});

// Internship: 24th June 2026 → 24th July 2026 (~1 month window presented)
const START = new Date("2026-06-24T00:00:00");
const END = new Date("2026-07-24T00:00:00");
const TODAY = new Date("2026-07-18T00:00:00"); // aligns with current context date

function progress() {
  const total = END.getTime() - START.getTime();
  const done = Math.min(Math.max(TODAY.getTime() - START.getTime(), 0), total);
  const pct = Math.round((done / total) * 100);
  const dayMs = 1000 * 60 * 60 * 24;
  const totalDays = Math.round(total / dayMs);
  const elapsedDays = Math.round(done / dayMs);
  const remaining = Math.max(totalDays - elapsedDays, 0);
  const weekOf = Math.min(Math.ceil(elapsedDays / 7) || 1, Math.ceil(totalDays / 7));
  const totalWeeks = Math.ceil(totalDays / 7);
  return { pct, remaining, weekOf, totalWeeks, totalDays, elapsedDays };
}

const FOCUS = [
  { icon: Cog, label: "Process Optimization" },
  { icon: Factory, label: "Industrial Automation" },
  { icon: Users, label: "Cross-functional Collaboration" },
];

const HIGHLIGHTS = [
  { title: "Engineering Mindset", desc: "Translating academic project experience into structured problem-solving on the shop floor." },
  { title: "Automation Focus", desc: "Supporting manufacturing automation initiatives and process-improvement workflows." },
  { title: "Team Delivery", desc: "Working alongside experienced engineers across functions in a real industrial environment." },
];

function Experience() {
  const p = progress();
  return (
    <>
      <Section eyebrow="WORK_LOG" title="Experience">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* MAIN CARD */}
          <div className="lg:col-span-2">
            <div className="corners relative bg-card/40 border border-border p-6 md:p-8 glow-border-hover overflow-hidden group">
              {/* inner grid texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--neon) 1px, transparent 1px), linear-gradient(90deg, var(--neon) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="pointer-events-none absolute inset-0 scanline opacity-40" />
              {/* soft glow sweep on hover */}
              <div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(600px circle at var(--x,50%) var(--y,0%), oklch(0.82 0.19 158 / 0.12), transparent 40%)",
                }}
              />

              <div className="relative">
                {/* header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3">
                    <Briefcase className="text-neon" size={26} strokeWidth={1.5} />
                    <span className="text-[10px] uppercase tracking-[0.3em] text-neon">
                      // Currently pursuing
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 border border-neon/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-neon">
                    <span className="size-1.5 rounded-full bg-neon anim-pulse-neon" />
                    Live
                  </span>
                </div>

                <h3 className="font-display text-2xl md:text-3xl uppercase leading-tight">
                  HL Mando Anand Pvt Ltd
                </h3>

                {/* meta grid */}
                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                  <MetaLine icon={Briefcase} label="Role" value="Project Intern" />
                  <MetaLine icon={Calendar} label="Duration" value="24 Jun 2026 — 24 Jul 2026" />
                  <MetaLine icon={Clock} label="Length" value={`${p.totalDays} days · ~1 month`} />
                  <MetaLine icon={MapPin} label="Company" value="HL Mando Anand Pvt Ltd" />
                  <MetaLine icon={Target} label="Focus" value="Manufacturing automation & process improvement" />
                </div>

                {/* progress */}
                <div className="mt-7">
                  <div className="flex items-end justify-between mb-2">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-neon">
                      // Timeline
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      Week {p.weekOf} of {p.totalWeeks} · {p.pct}%
                    </div>
                  </div>
                  <div className="h-2 border border-border bg-background/60 relative overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-neon"
                      style={{
                        width: `${p.pct}%`,
                        boxShadow: "0 0 12px var(--neon), 0 0 24px oklch(0.82 0.19 158 / 0.5)",
                      }}
                    />
                    <div
                      className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-[shimmer_2.2s_linear_infinite]"
                      style={{ left: `calc(${p.pct}% - 2rem)` }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px] tracking-widest text-muted-foreground">
                    <span>24 JUN</span>
                    <span>{p.remaining} days remaining</span>
                    <span>24 JUL</span>
                  </div>
                </div>

                {/* description */}
                <p className="mt-7 text-muted-foreground leading-relaxed">
                  Interning at HL Mando Anand Pvt Ltd from 24th June 2026 to 24th July 2026,
                  learning how large-scale manufacturing operates, supporting automation
                  workflows, and translating academic engineering knowledge into practical
                  shop-floor impact.
                </p>

                {/* focus pills */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {FOCUS.map((f) => (
                    <span
                      key={f.label}
                      className="inline-flex items-center gap-2 border border-border hover:border-neon/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-neon transition-colors"
                    >
                      <f.icon size={13} className="text-neon" strokeWidth={1.75} />
                      {f.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SIDE STATUS PANEL */}
          <Panel className="h-fit">
            <div className="text-[10px] text-neon tracking-[0.3em] mb-5">// STATUS</div>
            <div className="divide-y divide-border/60">
              <StatRow icon={Briefcase} label="Role" value="Project Intern" />
              <StatRow icon={Target} label="Focus" value="Automation" />
              <StatRow icon={MapPin} label="Company" value="HL Mando Anand Pvt Ltd" />
              <StatRow icon={Calendar} label="Window" value="24 Jun → 24 Jul 2026" />
              <StatRow icon={Clock} label="Remaining" value={`${p.remaining} days`} />
              <StatRow icon={TrendingUp} label="Progress" value={`${p.pct}%`} />
            </div>

            {/* circular-ish progress */}
            <div className="mt-6 pt-5 border-t border-border/60">
              <div className="text-[10px] text-neon tracking-[0.3em] mb-3">// COMPLETION</div>
              <div className="flex items-center gap-4">
                <Ring pct={p.pct} />
                <div className="text-xs text-muted-foreground leading-relaxed">
                  Day {p.elapsedDays} of {p.totalDays}
                  <br />
                  <span className="text-foreground">Week {p.weekOf} / {p.totalWeeks}</span>
                </div>
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

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </>
  );
}

function MetaLine({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5 text-sm">
      <Icon size={15} className="text-neon mt-0.5 shrink-0" strokeWidth={1.75} />
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
        <div className="text-foreground truncate">{value}</div>
      </div>
    </div>
  );
}

function StatRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <Icon size={15} className="text-neon shrink-0" strokeWidth={1.75} />
      <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground w-20">{label}</div>
      <div className="text-sm text-foreground ml-auto text-right">{value}</div>
    </div>
  );
}

function Ring({ pct }: { pct: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
  return (
    <div className="relative size-16 shrink-0">
      <svg viewBox="0 0 64 64" className="size-16 -rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" stroke="var(--border)" strokeWidth="4" />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke="var(--neon)"
          strokeWidth="4"
          strokeDasharray={c}
          strokeDashoffset={off}
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 6px var(--neon))" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center font-display text-sm text-neon">
        {pct}%
      </div>
    </div>
  );
}
