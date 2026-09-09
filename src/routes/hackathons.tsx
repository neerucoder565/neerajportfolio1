import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Panel, Section } from "@/components/SiteShell";
import { FileText, ArrowLeft, Download, Trophy, Globe, Zap, Cpu, X } from "lucide-react";

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
    domain: "Healthcare + Full Stack",
  },
  {
    project: "Hackathon 360°",
    event: "National Level ECLearnix Innovation Challenge — Round 2",
    scope: "NATIONAL",
    tags: ["Innovation", "Round 2", "Pitch"],
    outcome: "Selected through to Round 2 of the national innovation challenge.",
    cert: "/certificates/eclearnix-360-round2-certificate.pdf",
    domain: "Innovation & Prototyping",
  },
  {
    project: "Hackathon 360° 4.0",
    event: "International Level — NSIT-IFSCS & ECLearnix",
    scope: "INTERNATIONAL",
    tags: ["Problem Solving", "Prototype"],
    outcome: "Round 1 participant in the international innovation and problem-solving track.",
    cert: "/certificates/hackathon-360-4-0-certificate.pdf",
    domain: "Problem Solving",
  },
  {
    project: "Hackathon 360° 3.0",
    event: "International Level — KPR Institute of Engineering & Technology",
    scope: "INTERNATIONAL",
    tags: ["Rapid Build", "Ideation"],
    outcome: "International hackathon focused on rapid innovation and prototyping.",
    cert: "/certificates/hackathon-360-3-0-kpriet-certificate.pdf",
    domain: "Innovation & Prototyping",
  },
  {
    project: "Quintessence 2026",
    event: "SECE Student Society, Easwari Engineering College",
    scope: "TECH QUIZ",
    tags: ["Electronics", "Communication"],
    outcome: "Technical quiz on core electronics and communication fundamentals.",
    cert: "/certificates/quintessence-2026-certificate.pdf",
    domain: "Electronics & Communication",
  },
];

const DOMAINS = Array.from(new Set(HACKATHONS.map((h) => h.domain)));

const STATS = [
  { icon: Trophy, label: "EVENTS ENTERED", value: "05" },
  { icon: Globe, label: "INTERNATIONAL", value: "02" },
  { icon: Zap, label: "CERTIFICATES", value: "05" },
  { icon: Cpu, label: "DOMAINS", value: String(DOMAINS.length).padStart(2, "0") },
];

function StatStrip({ onOpenDomains }: { onOpenDomains: () => void }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
      {STATS.map((s, i) => {
        const isDomains = s.label === "DOMAINS";
        const content = (
          <>
            <span className="absolute inset-0 scanline pointer-events-none opacity-60" />
            <s.icon size={16} className="text-neon shrink-0 anim-pulse-neon" />
            <div className="relative">
              <div className="font-display text-xl text-glow-soft leading-none">{s.value}</div>
              <div className="text-[10px] tracking-[0.25em] text-muted-foreground mt-1">{s.label}</div>
            </div>
          </>
        );

        const commonClasses =
          "relative overflow-hidden border border-border bg-card/30 px-4 py-3 flex items-center gap-3 glow-border-hover transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neon";

        return isDomains ? (
          <motion.button
            key={s.label}
            type="button"
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={`${commonClasses} text-left cursor-pointer hover:bg-card/50`}
            onClick={onOpenDomains}
          >
            {content}
            <span className="absolute top-0 left-0 h-px w-full bg-neon/60" style={{ boxShadow: "0 0 12px var(--neon)" }} />
          </motion.button>
        ) : (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={commonClasses}
          >
            {content}
          </motion.div>
        );
      })}
    </div>
  );
}

function DomainModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative z-10 w-full max-w-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.97, y: 12, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Panel className="p-5 md:p-7 overflow-hidden">
              <motion.span
                className="absolute top-0 left-0 h-px bg-neon"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ boxShadow: "0 0 14px var(--neon)" }}
              />

              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <div className="text-xs text-neon tracking-[0.25em] mb-1">// DOMAIN BREAKDOWN</div>
                  <h3 className="font-display text-2xl md:text-3xl uppercase text-glow-soft">
                    Hackathon Domains
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center w-10 h-10 border border-border bg-card/50 text-muted-foreground hover:text-neon hover:border-neon/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neon"
                  aria-label="Close domain breakdown"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3">
                {HACKATHONS.map((h, i) => (
                  <motion.div
                    key={h.project}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 border border-border bg-secondary/20 px-4 py-3 hover:bg-secondary/40 transition-colors"
                  >
                    <span className="absolute top-0 left-0 h-px w-0 bg-neon/60 group-hover:w-full transition-all duration-300" style={{ boxShadow: "0 0 8px var(--neon)" }} />
                    <div>
                      <div className="font-display text-base md:text-lg uppercase text-glow-soft leading-none">
                        {h.project}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-1 tracking-wide">{h.event}</div>
                    </div>
                    <div className="flex items-center gap-2 sm:shrink-0">
                      <span className="h-1.5 w-1.5 rounded-full bg-neon anim-pulse-neon" />
                      <span className="text-xs md:text-sm text-neon tracking-[0.15em] uppercase whitespace-nowrap">
                        {h.domain}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {DOMAINS.map((d, i) => (
                  <motion.span
                    key={d}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.07 }}
                    className="text-[10px] uppercase tracking-[0.18em] border border-neon/40 text-neon bg-neon/5 px-3 py-1"
                  >
                    {d}
                  </motion.span>
                ))}
              </div>
            </Panel>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
  const [showDomains, setShowDomains] = useState(false);

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
            <Panel className="p-2 md:p-4 overflow-hidden flex items-center justify-center">
              <motion.img
                src={viewing.cert.replace(/\.pdf$/, ".png")}
                alt={`${viewing.project} certificate`}
                className="max-h-[55vh] md:max-h-[62vh] w-auto max-w-full rounded-md object-contain shadow-lg"
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
            <StatStrip onOpenDomains={() => setShowDomains(true)} />
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

      <DomainModal open={showDomains} onClose={() => setShowDomains(false)} />
    </Section>
  );
}
