import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  ArrowLeft,
  Factory,
  MapPin,
  Building2,
  Layers,
  Target,
  CalendarDays,
  ChevronDown,
  Cog,
  CheckCircle2,
} from "lucide-react";
import buildingAsset from "@/assets/hl-mando-building.jpeg.asset.json";

// Relative "/__l5e/..." asset paths only resolve on the Lovable-hosted origin.
// Use the absolute CDN origin so the image loads on custom worker deployments.
const buildingSrc = buildingAsset.url.startsWith("/")
  ? `https://project--f5fd28dd-7b71-489d-910e-961a65dfa09f.lovable.app${buildingAsset.url}`
  : buildingAsset.url;
import gateImg from "@/assets/mando-gate.jpg";
import certificateAsset from "@/assets/hl-mando-certificate.png.asset.json";
import officeImg from "@/assets/mando-office.jpg";
import landscapeImg from "@/assets/mando-landscape.jpg";

export const Route = createFileRoute("/experience_/hl-mando")({
  head: () => ({
    meta: [
      { title: "HL Mando Anand Pvt Ltd Internship — Neeraj K" },
      {
        name: "description",
        content:
          "One-month engineering internship at HL Mando Anand Pvt Ltd covering manufacturing automation, production observation and an engineering proposal.",
      },
      {
        property: "og:title",
        content: "HL Mando Anand Pvt Ltd — Engineering Internship",
      },
      {
        property: "og:description",
        content:
          "Manufacturing automation internship — mission context, assignments, timeline and outcomes.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InternshipDetail,
});

/* ---------------------------------------------------------------- data --- */

const CONTEXT = [
  { icon: Factory, label: "Industry", value: "Automotive Manufacturing" },
  { icon: Layers, label: "Operations", value: "Braking & suspension systems" },
  { icon: Building2, label: "Scale", value: "Multi-line production plant" },
  { icon: Target, label: "Focus", value: "Automation & process improvement" },
  { icon: MapPin, label: "Location", value: "Plant 1, Sipcot Industrial Park, Sriperambadur" },
  { icon: CalendarDays, label: "Window", value: "24 Jun — 24 Jul 2026" },
];

const ASSIGNMENTS = [
  {
    id: "01",
    title: "Observed Production Packing Control",
    note: "Traced the packing line control sequence, operator touchpoints and rejection handling.",
  },
  {
    id: "02",
    title: "Studied Material Movement",
    note: "Mapped material flow between stations to locate manual handling bottlenecks.",
  },
  {
    id: "03",
    title: "Designed Proposed Automation Solution",
    note: "Drafted an automation concept for the observed bottleneck and presented it to the team.",
  },
];

const GALLERY = [
  { src: landscapeImg, alt: "HL Mando plant view", label: "Plant", span: "md:col-span-2 md:row-span-2", h: "h-64 md:h-full" },
  { src: gateImg, alt: "Security gate", label: "Gate", span: "", h: "h-48 md:h-56" },
  { src: officeImg, alt: "Office building", label: "Office", span: "", h: "h-48 md:h-56" },
];


const TIMELINE = [
  { tag: "DAY 01", title: "Security briefing", note: "Safety induction, plant rules, PPE and access protocol." },
  { tag: "WEEK 01", title: "Factory familiarization", note: "Walked the shop floor, learned the layout and line hierarchy." },
  { tag: "WEEK 02", title: "Production observation", note: "Timed cycles, logged station behaviour and manual steps." },
  { tag: "WEEK 03", title: "Automation study", note: "Compared manual vs automated handling options for the target station." },
  { tag: "WEEK 04", title: "Engineering proposal", note: "Documented the proposed solution with sequence and expected gain." },
  { tag: "FINAL", title: "Presentation", note: "Presented findings and the proposal to the engineering team." },
];

const MATRIX = [
  { label: "Manufacturing Knowledge", pct: 88 },
  { label: "Automation Workflow", pct: 82 },
  { label: "Industrial Documentation", pct: 76 },
  { label: "Cross Functional Collaboration", pct: 90 },
];

const STATS = [
  { n: "30", label: "Days" },
  { n: "06", label: "Production lines studied" },
  { n: "01", label: "Engineering proposal" },
  { n: "01", label: "Month On Site" },
  { n: "100%", label: "Completion" },
];

/* ------------------------------------------------------------- helpers --- */

function useTyped(text: string, active: boolean, speed = 28) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!active) {
      setOut("");
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, active, speed]);
  return active ? out : "";
}

function Heading({ title }: { title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  const typed = useTyped(title, inView, 26);
  return (
    <div ref={ref} className="mb-10">
      <h2 className="font-display text-2xl md:text-4xl uppercase min-h-[1.2em]">
        {typed}
        {inView && typed.length < title.length && (
          <span className="text-neon animate-pulse">_</span>
        )}
      </h2>
    </div>
  );
}

function Bar({ pct, label }: { pct: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  return (
    <div ref={ref}>
      <div className="flex items-end justify-between mb-2">
        <span className="text-sm text-foreground">{label}</span>
        <span className="font-mono text-[11px] text-neon">{pct}%</span>
      </div>
      <div className="h-2.5 border border-border bg-background/60 relative overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 bg-neon"
          style={{ boxShadow: "0 0 12px var(--neon)" }}
        />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- access gate --- */

const BOOT = [
  "ACCESS REQUEST...",
  "VERIFYING CLEARANCE...",
  "LOADING RECORD...",
  "ACCESS GRANTED",
];

function AccessGate({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const p = setInterval(() => setPct((v) => Math.min(v + 4, 100)), 26);
    const s = setInterval(() => setStep((v) => Math.min(v + 1, BOOT.length - 1)), 480);
    const done = setTimeout(onDone, 2150);
    return () => {
      clearInterval(p);
      clearInterval(s);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-background grid place-items-center px-6"
    >
      <div className="pointer-events-none absolute inset-0 scanline opacity-60" />
      <div className="w-full max-w-md font-mono text-xs">
        {BOOT.slice(0, step + 1).map((l) => (
          <div
            key={l}
            className={l === "ACCESS GRANTED" ? "text-neon" : "text-muted-foreground"}
          >
            &gt; {l}
          </div>
        ))}
        <div className="mt-5 h-2 border border-border relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-neon transition-[width] duration-100"
            style={{ width: `${pct}%`, boxShadow: "0 0 12px var(--neon)" }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[10px] tracking-[0.3em] text-neon">
          <span>DECRYPT</span>
          <span>{pct}%</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------- particles -- */

function Particles() {
  const dots = Array.from({ length: 22 }, (_, i) => ({
    left: (i * 37) % 100,
    delay: (i % 11) * 0.7,
    dur: 9 + (i % 6) * 1.6,
    size: i % 4 === 0 ? 3 : 2,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-neon"
          style={{
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            boxShadow: "0 0 8px var(--neon)",
          }}
          initial={{ top: "105%", opacity: 0 }}
          animate={{ top: "-5%", opacity: [0, 0.8, 0] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------- page --- */

function InternshipDetail() {
  const [locked, setLocked] = useState(true);

  return (
    <>
      {locked && <AccessGate onDone={() => setLocked(false)} />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: locked ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* HERO */}
        <section className="relative min-h-[85vh] flex items-end overflow-hidden border-b border-border">
          <img
            src={buildingSrc}
            alt="HL Mando Anand plant facility"
            width={1600}
            height={900}
            className="absolute inset-0 size-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/45" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "linear-gradient(var(--neon) 1px, transparent 1px), linear-gradient(90deg, var(--neon) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          <Particles />
          <motion.div
            className="pointer-events-none absolute left-0 right-0 h-24"
            style={{
              background:
                "linear-gradient(to bottom, transparent, oklch(0.62 0.26 300 / 0.10), transparent)",
            }}
            initial={{ top: "-10%" }}
            animate={{ top: "100%" }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
          />

          <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-28">
            <Link
              to="/experience"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-neon transition-colors"
            >
              <ArrowLeft size={13} /> Back to work log
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="border border-neon/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.3em] text-neon">
                Engineering Internship
              </span>
              <span className="inline-flex items-center gap-2 border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-neon anim-pulse-neon" />
                Status : Completed
              </span>
            </div>

            <h1 className="mt-6 font-display text-4xl md:text-6xl xl:text-7xl uppercase leading-[1.05]">
              HL Mando Anand
              <br />
              Pvt Ltd
            </h1>

            <p className="mt-5 text-sm md:text-base tracking-[0.2em] uppercase text-muted-foreground">
              Manufacturing Automation · June 24 — July 24
            </p>

            <a
              href="#mission-context"
              className="mt-9 inline-flex items-center gap-3 border border-neon/50 px-5 py-3 text-[11px] uppercase tracking-[0.3em] text-neon hover:bg-neon/10 transition-colors"
            >
              View Details <ChevronDown size={14} />
            </a>
          </div>
        </section>

        {/* MISSION CONTEXT */}
        <section id="mission-context" className="mx-auto max-w-7xl px-6 py-20">
          <Heading title="Mission Context" />
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="corners relative border border-border overflow-hidden group">
              <img
                src={buildingSrc}
                alt="HL Mando Anand plant building"
                loading="lazy"
                width={1600}
                height={900}
                className="w-full h-72 md:h-[26rem] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 scanline opacity-30" />
              <div className="absolute bottom-0 left-0 right-0 bg-background/80 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-neon">
                // HL Mando Anand · Plant Facility
              </div>
            </div>

            <div className="divide-y divide-border/60 border-y border-border/60">
              {CONTEXT.map((c) => (
                <div key={c.label} className="flex items-center gap-4 py-4">
                  <c.icon size={16} className="text-neon shrink-0" strokeWidth={1.75} />
                  <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground w-28 shrink-0">
                    {c.label}
                  </div>
                  <div className="text-sm text-foreground ml-auto text-right">
                    {c.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INITIAL BRIEF */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <Heading title="Initial Brief" />
          <div className="corners relative border border-border bg-card/40 p-6 md:p-10 max-w-3xl">
            <div className="pointer-events-none absolute inset-0 scanline opacity-40" />
            <div className="relative font-mono text-sm space-y-6">
              <div>
                <div className="text-[10px] tracking-[0.35em] text-neon mb-2">MISSION</div>
                <p className="text-foreground leading-relaxed text-base">
                  Understand how a large-scale automotive manufacturing plant
                  operates and identify opportunities for automation.
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-border/60 text-xs">
                <div>
                  <div className="text-muted-foreground tracking-[0.25em] text-[10px] mb-1">CLEARANCE</div>
                  <div className="text-neon">PROJECT INTERN</div>
                </div>
                <div>
                  <div className="text-muted-foreground tracking-[0.25em] text-[10px] mb-1">DURATION</div>
                  <div className="text-foreground">30 DAYS</div>
                </div>
                <div>
                  <div className="text-muted-foreground tracking-[0.25em] text-[10px] mb-1">OUTCOME</div>
                  <div className="text-foreground">PROPOSAL SUBMITTED</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ASSIGNMENTS */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <Heading title="Assignments Received" />
          <div className="grid md:grid-cols-3 gap-6">
            {ASSIGNMENTS.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.18 }}
                className="corners relative border border-border bg-card/40 p-6 glow-border-hover"
              >
                <div className="font-display text-neon text-3xl">[{a.id}]</div>
                <h3 className="font-display text-lg uppercase mt-4 leading-snug">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {a.note}
                </p>
                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.3em] text-muted-foreground">
                    STATUS
                  </span>
                  <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] text-neon">
                    <CheckCircle2 size={13} /> COMPLETE
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* GALLERY */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <Heading title="Site Imagery" />
          <div className="grid md:grid-cols-4 md:auto-rows-[13rem] gap-4">
            {GALLERY.map((g) => (
              <div
                key={g.label}
                className={`relative overflow-hidden border border-border group ${g.span}`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className={`w-full ${g.h} md:h-full object-cover transition-transform duration-700 group-hover:scale-110`}
                />
                <div className="absolute inset-0 bg-background/40 group-hover:bg-background/10 transition-colors" />
                <div className="absolute bottom-0 left-0 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-neon bg-background/80">
                  {g.label}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] text-muted-foreground">
            // Representative site imagery — no confidential shop-floor or
            process content is published.
          </p>
        </section>

        {/* CERTIFICATION */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <Heading title="Certification" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="corners relative bg-card/40 border border-border p-4 md:p-6 glow-border-hover max-w-3xl"
          >
            <img
              src={`https://project--f5fd28dd-7b71-489d-910e-961a65dfa09f.lovable.app${certificateAsset.url}`}
              alt="HL Mando Anand India Private Limited internship completion certificate for Neeraj K"
              loading="lazy"
              className="w-full max-h-[26rem] md:max-h-[32rem] object-contain mx-auto border border-border/60"
            />
            <div className="mt-3 text-[10px] uppercase tracking-[0.3em] text-neon">
              // Internship completion — 18 Jun 2026 to 24 Jul 2026
            </div>
          </motion.div>
        </section>


        {/* TIMELINE */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <Heading title="Deployment Timeline" />
          <div className="relative max-w-3xl pl-8 md:pl-12">
            <div className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-px bg-border" />
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.tag}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="relative pb-10 last:pb-0"
              >
                <span
                  className="absolute -left-8 md:-left-12 top-1.5 size-4 md:size-6 grid place-items-center"
                >
                  <span
                    className="size-2.5 rounded-full bg-neon"
                    style={{ boxShadow: "0 0 12px var(--neon)" }}
                  />
                </span>
                <div className="text-[10px] tracking-[0.35em] text-neon">{t.tag}</div>
                <div className="font-display text-lg md:text-xl uppercase mt-1">
                  {t.title}
                </div>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  {t.note}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* LEARNING MATRIX */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <Heading title="System Upgrade" />
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl">
            {MATRIX.map((m) => (
              <Bar key={m.label} pct={m.pct} label={m.label} />
            ))}
          </div>
        </section>

        {/* STATS */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="border-t border-neon/40 pt-4"
              >
                <div className="font-display text-4xl md:text-5xl text-neon leading-none">
                  {s.n}
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* INTERNSHIP COMPLETED */}

        <section className="mx-auto max-w-7xl px-6 py-24">
          <Heading title="Internship Completed" />
          <div className="grid lg:grid-cols-[auto_1fr] gap-12 items-center">
            <div className="relative size-56 md:size-64 mx-auto">
              <svg viewBox="0 0 200 200" className="absolute inset-0 anim-spin-slow">
                <circle
                  cx="100"
                  cy="100"
                  r="92"
                  fill="none"
                  stroke="var(--neon)"
                  strokeWidth="0.8"
                  strokeDasharray="3 6"
                  opacity="0.6"
                />
              </svg>
              <svg viewBox="0 0 200 200" className="absolute inset-0 anim-spin-reverse">
                <circle
                  cx="100"
                  cy="100"
                  r="76"
                  fill="none"
                  stroke="var(--neon)"
                  strokeWidth="1.5"
                  strokeDasharray="120 360"
                  strokeLinecap="round"
                  style={{ filter: "drop-shadow(0 0 6px var(--neon))" }}
                />
              </svg>
              <svg viewBox="0 0 200 200" className="absolute inset-0 -rotate-90">
                <motion.circle
                  cx="100"
                  cy="100"
                  r="58"
                  fill="none"
                  stroke="var(--neon)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 58}
                  initial={{ strokeDashoffset: 2 * Math.PI * 58 }}
                  whileInView={{ strokeDashoffset: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 1.6, ease: "easeOut" }}
                  style={{ filter: "drop-shadow(0 0 8px var(--neon))" }}
                />
              </svg>
              <div className="absolute inset-0 grid place-items-center text-center">
                <div>
                  <Cog size={24} className="text-neon mx-auto anim-spin-slow" />
                  <div className="font-display text-5xl text-neon mt-2 leading-none anim-glow-breathe">
                    30
                  </div>
                  <div className="text-[10px] tracking-[0.35em] text-foreground/80 mt-1.5">
                    DAYS
                  </div>
                  <div className="text-[10px] tracking-[0.35em] text-muted-foreground mt-0.5">
                    COMPLETED
                  </div>
                </div>
              </div>


            </div>

            <div className="corners relative border border-border bg-card/40 p-6 md:p-8 overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(147,51,234,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(147,51,234,0.05) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              <div className="relative">
                <div className="text-[10px] tracking-[0.35em] text-neon mb-1">
                  // INTERNSHIP DEBRIEF
                </div>
                <div className="h-px bg-gradient-to-r from-neon/60 via-border to-transparent mb-6" />

                <div className="grid sm:grid-cols-2 gap-x-10 gap-y-1.5 mb-8">
                  {[
                    ["STATUS", "COMPLETED"],
                    ["ROLE", "PROJECT INTERN"],
                    ["LOCATION", "CHENNAI"],
                    ["DURATION", "30 DAYS"],
                  ].map(([k, v], i) => (
                    <motion.div
                      key={k}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.35, delay: i * 0.06 }}
                      className="flex items-baseline gap-3 text-[10px] tracking-[0.25em]"
                    >
                      <span className="text-muted-foreground w-24 shrink-0">{k}</span>
                      <span className="flex-1 border-b border-dashed border-border/60" />
                      <span className="text-neon">{v}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="text-[10px] tracking-[0.3em] text-muted-foreground mb-2">
                  OBJECTIVE
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                  Studied manufacturing workflows and proposed an embedded automation
                  solution to improve material movement efficiency.
                </p>


                <div className="text-[10px] tracking-[0.3em] text-muted-foreground mt-8 mb-3">
                  KEY DELIVERABLES
                </div>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                  {[
                    "Process Analysis",
                    "Automation Proposal",
                    "Hardware Architecture",
                    "PCB Design",
                    "Mechanical Design",
                    "RTOS Architecture",
                  ].map((d, i) => (
                    <motion.div
                      key={d}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="flex items-center gap-2 text-sm text-foreground/90 border-b border-border/40 py-1.5"
                    >
                      <CheckCircle2 size={14} className="text-neon shrink-0" />
                      <span>{d}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="text-[10px] tracking-[0.3em] text-muted-foreground mt-8 mb-3">
                  TECHNOLOGIES
                </div>
                <div className="flex flex-wrap gap-2">
                  {["ESP32-S3", "Raspberry Pi 5", "Altium", "AutoCAD", "FreeRTOS"].map((t) => (
                    <span
                      key={t}
                      className="text-[10px] tracking-[0.2em] uppercase border border-neon/40 text-neon px-3 py-1.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/experience"
                    className="border border-border px-4 py-2.5 text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-neon hover:border-neon/60 transition-colors"
                  >
                    ← Back to Experience
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
}
