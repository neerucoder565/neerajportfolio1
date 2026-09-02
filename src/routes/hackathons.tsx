import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Panel, Section } from "@/components/SiteShell";
import { FileText, ArrowLeft, Download, Trophy, Globe, Zap, Cpu } from "lucide-react";

export const Route = createFileRoute("/hackathons")({
  head: () => ({
    meta: [
      { title: "Hackathons — Neeraj K" },
      { name: "description", content: "Hackathons and competitions — embedded, AI and hardware innovation entries by Neeraj K." },
      { property: "og:title", content: "Hackathons — Neeraj K" },
      { property: "og:description", content: "Hackathons and competitions — embedded, AI and hardware innovation entries by Neeraj K." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Hackathons,
});

const HACKATHONS = [
  {
    project: "MediFind",
    event: "Genesis 2026",
    scope: "NATIONAL",
    tags: ["Emergency Tech", "Full Stack", "Maps"],
    outcome: "Smart emergency hospital finder.",
    cert: "/certificates/genesis-2026-certificate.pdf",
  },
  {
    project: "Hackathon 360°",
    event: "National Level ECLearnix Innovation Challenge — Round 2",
    scope: "NATIONAL",
    tags: ["Innovation", "Round 2", "Pitch"],
    outcome: "Selected through to Round 2 of the national innovation challenge.",
    cert: "/certificates/eclearnix-360-round2-certificate.pdf",
  },
  {
    project: "Hackathon 360° 4.0",
    event: "International Level — NSIT-IFSCS & ECLearnix",
    scope: "INTERNATIONAL",
    tags: ["Problem Solving", "Prototype"],
    outcome: "Round 1 participant in the international innovation and problem-solving track.",
    cert: "/certificates/hackathon-360-4-0-certificate.pdf",
  },
  {
    project: "Hackathon 360° 3.0",
    event: "International Level — KPR Institute of Engineering & Technology",
    scope: "INTERNATIONAL",
    tags: ["Rapid Build", "Ideation"],
    outcome: "International hackathon focused on rapid innovation and prototyping.",
    cert: "/certificates/hackathon-360-3-0-kpriet-certificate.pdf",
  },
  {
    project: "Quintessence 2026",
    event: "SECE Student Society, Easwari Engineering College",
    scope: "TECH QUIZ",
    tags: ["Electronics", "Communication"],
    outcome: "Technical quiz on core electronics and communication fundamentals.",
    cert: "/certificates/quintessence-2026-certificate.pdf",
  },
];

const STATS = [
  { icon: Trophy, label: "EVENTS ENTERED", value: "05" },
  { icon: Globe, label: "INTERNATIONAL", value: "02" },
  { icon: Zap, label: "CERTIFICATES", value: "05" },
  { icon: Cpu, label: "DOMAINS", value: "04" },
];

function StatStrip() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden border border-border bg-card/30 px-4 py-3 flex items-center gap-3 glow-border-hover"
        >
          <span className="absolute inset-0 scanline pointer-events-none opacity-60" />
          <s.icon size={16} className="text-neon shrink-0 anim-pulse-neon" />
          <div className="relative">
            <div className="font-display text-xl text-glow-soft leading-none">{s.value}</div>
            <div className="text-[10px] tracking-[0.25em] text-muted-foreground mt-1">{s.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function HackCard({ h, i }: { h: (typeof HACKATHONS)[number]; i: number }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1000 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
    >
      <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
        <Panel className="group overflow-hidden flex flex-col justify-between gap-4 h-full">
          {/* animated sweep */}
          <AnimatePresence>
            {hover && (
              <motion.span
                key="sweep"
                initial={{ x: "-120%" }}
                animate={{ x: "120%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, color-mix(in oklab, var(--neon) 18%, transparent), transparent)",
                }}
              />
            )}
          </AnimatePresence>

          {/* animated top rail */}
          <motion.span
            className="absolute top-0 left-0 h-px bg-neon"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 + i * 0.05, ease: "easeOut" }}
            style={{ boxShadow: "0 0 10px var(--neon)" }}
          />

          <div className="relative">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="text-xs text-neon tracking-[0.25em]">
                // ENTRY_{String(i + 1).padStart(2, "0")}
              </div>
              <span className="text-[10px] tracking-[0.22em] border border-neon/40 text-neon px-2 py-0.5">
                {h.scope}
              </span>
            </div>

            <h3 className="font-display text-xl md:text-2xl uppercase text-glow-soft">
              {h.project}
            </h3>
            <div className="text-sm text-muted-foreground mt-1">{h.event}</div>
            <p className="text-sm text-muted-foreground/80 mt-3 leading-relaxed">{h.outcome}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {h.tags.map((t, ti) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.25 + ti * 0.07 }}
                  className="text-[10px] uppercase tracking-[0.18em] border border-border bg-secondary/40 px-2 py-1 text-muted-foreground"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
        </Panel>
      </motion.div>
    </motion.div>
  );
}

function Hackathons() {
  const [viewing, setViewing] = useState<{ project: string; cert: string } | null>(null);

  return (
    <Section title="Hackathons">
      <AnimatePresence mode="wait">
        {viewing ? (
          <motion.div
            key="viewer"
            initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <button
                type="button"
                onClick={() => setViewing(null)}
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neon hover:text-neon-bright transition-colors"
              >
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                Back to Hackathons
              </button>
              <div className="font-display text-sm uppercase text-glow-soft hidden md:block">
                {viewing.project}
              </div>
              <a
                href={viewing.cert}
                download
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neon hover:text-neon-bright transition-colors"
              >
                <Download size={14} className="transition-transform group-hover:translate-y-0.5" />
                Download
              </a>
            </div>
            <Panel className="p-2 overflow-hidden">
              <motion.img
                src={viewing.cert.replace(/\.pdf$/, ".png")}
                alt={`${viewing.project} certificate`}
                className="w-full h-auto rounded-md"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </Panel>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <StatStrip />
            <div className="grid md:grid-cols-2 gap-6">
              {HACKATHONS.map((h, i) => (
                <div key={h.project} className="relative">
                  <HackCard h={h} i={i} />
                  {h.cert && (
                    <button
                      type="button"
                      onClick={() => setViewing({ project: h.project, cert: h.cert! })}
                      className="group mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neon hover:text-neon-bright transition-colors"
                    >
                      <FileText size={14} className="transition-transform group-hover:scale-110" />
                      View Certificate
                      <span className="block h-px w-0 bg-neon transition-all duration-300 group-hover:w-8" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
