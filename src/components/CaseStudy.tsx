import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Download,
  Github,
  X as XIcon,
  CircleDot,
  Circle,
} from "lucide-react";
import {
  CASE_STUDIES,
  CASE_STUDY_ORDER,
  type CaseStudy,
  type CaseStudySlug,
} from "@/data/case-studies";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "hardware", label: "Hardware" },
  { id: "software", label: "Software" },
  { id: "journey", label: "Journey" },
  { id: "challenges", label: "Challenges" },
  { id: "results", label: "Results" },
  { id: "gallery", label: "Gallery" },
  { id: "downloads", label: "Downloads" },
  { id: "future", label: "Future" },
] as const;

export function CaseStudyPage({ slug }: { slug: CaseStudySlug }) {
  const study = CASE_STUDIES[slug];
  const [active, setActive] = useState<string>("overview");
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Scrollspy
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(s.id);
          });
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [slug]);

  const { prev, next } = useMemo(() => {
    const i = CASE_STUDY_ORDER.indexOf(slug);
    return {
      prev: i > 0 ? CASE_STUDIES[CASE_STUDY_ORDER[i - 1]] : null,
      next:
        i >= 0 && i < CASE_STUDY_ORDER.length - 1
          ? CASE_STUDIES[CASE_STUDY_ORDER[i + 1]]
          : null,
    };
  }, [slug]);

  return (
    <div className="relative">
      <Hero study={study} />

      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[220px_1fr] gap-10 pb-24">
        {/* Sticky in-page nav */}
        <aside className="hidden lg:block">
          <nav className="sticky top-24 border-l border-border/60 pl-4 space-y-2">
            <div className="text-[10px] tracking-[0.3em] text-neon mb-3">
              // SECTIONS
            </div>
            {SECTIONS.map((s) => {
              const isActive = active === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`block text-[11px] uppercase tracking-[0.2em] py-1 transition-colors ${
                    isActive
                      ? "text-neon"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive ? "› " : "  "}
                  {s.label}
                </a>
              );
            })}
          </nav>
        </aside>

        <div className="scroll-smooth space-y-20">
          <Reveal>
            <Section id="overview" eyebrow="OVERVIEW" title="Project Overview">
              <p className="text-muted-foreground leading-relaxed max-w-3xl">
                {study.overview}
              </p>
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <Card title="Problem Statement">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {study.problem}
                  </p>
                </Card>
                <Card title="Objectives">
                  <ul className="text-sm text-muted-foreground space-y-2">
                    {study.objectives.map((o) => (
                      <li key={o} className="flex gap-2">
                        <span className="text-neon">›</span>
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </Section>
          </Reveal>

          <Reveal>
            <Section
              id="architecture"
              eyebrow="ARCHITECTURE"
              title="System Architecture"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <Card title="Architecture">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {study.architecture}
                  </p>
                </Card>
                <Card title="Working Principle">
                  <p className="text-sm text-muted-foreground leading-relaxed font-mono text-[12px]">
                    {study.workingPrinciple}
                  </p>
                </Card>
              </div>
            </Section>
          </Reveal>

          <Reveal>
            <Section id="hardware" eyebrow="HARDWARE" title="Hardware Components">
              <BulletCard items={study.hardware} />
            </Section>
          </Reveal>

          <Reveal>
            <Section id="software" eyebrow="SOFTWARE" title="Software Stack">
              <BulletCard items={study.software} />
            </Section>
          </Reveal>

          <Reveal>
            <Section id="journey" eyebrow="JOURNEY" title="Development Journey">
              <p className="text-muted-foreground leading-relaxed max-w-3xl">
                {study.journey}
              </p>
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                {study.decisions.map((d) => (
                  <Card key={d.title} title={d.title} eyebrow="DECISION">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {d.body}
                    </p>
                  </Card>
                ))}
              </div>
            </Section>
          </Reveal>

          <Reveal>
            <Section
              id="challenges"
              eyebrow="CHALLENGES"
              title="Challenges & Solutions"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {study.challenges.map((c) => (
                  <Card key={c.title} title={c.title} eyebrow="CHALLENGE">
                    <div className="text-[10px] tracking-[0.3em] text-neon mt-3 mb-1">
                      // SOLUTION
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {c.solution}
                    </p>
                  </Card>
                ))}
              </div>
            </Section>
          </Reveal>

          <Reveal>
            <Section id="results" eyebrow="RESULTS" title="Performance Results">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {study.results.map((r) => (
                  <div
                    key={r.label}
                    className="corners border border-border bg-card/40 p-5"
                  >
                    <div className="text-[10px] tracking-[0.3em] text-neon">
                      // {r.label}
                    </div>
                    <div className="font-display text-xl mt-2 text-foreground">
                      {r.value}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </Reveal>

          <Reveal>
            <Section id="gallery" eyebrow="GALLERY" title="Visuals & Media">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {study.gallery.map((g, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => g.src && setLightbox(i)}
                    className="group relative aspect-[4/3] border border-border bg-background/60 corners overflow-hidden text-left"
                  >
                    {g.src ? (
                      <img
                        src={g.src}
                        alt={g.caption}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 grid place-items-center text-[10px] tracking-[0.3em] text-neon/70"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(0,255,170,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,170,0.05) 1px, transparent 1px)",
                          backgroundSize: "16px 16px",
                        }}
                      >
                        // {(g.kind || "asset").toUpperCase()} · PENDING
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3">
                      <div className="text-[10px] tracking-[0.2em] text-neon">
                        // {g.kind ? g.kind.toUpperCase() : "IMAGE"}
                      </div>
                      <div className="text-xs text-foreground mt-0.5">
                        {g.caption}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {study.videos.length > 0 && (
                <div className="mt-8 grid md:grid-cols-2 gap-4">
                  {study.videos.map((v, i) => (
                    <div
                      key={i}
                      className="corners border border-border bg-card/40 p-4"
                    >
                      {v.src ? (
                        <video
                          src={v.src}
                          poster={v.poster}
                          controls
                          playsInline
                          className="aspect-video w-full border border-border bg-background/60 object-contain"
                        />
                      ) : (
                        <div className="aspect-video border border-border bg-background/60 grid place-items-center text-[10px] tracking-[0.3em] text-neon/70">
                          // VIDEO EMBED · PENDING
                        </div>
                      )}
                      <div className="mt-3 text-xs text-muted-foreground">
                        {v.title}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Section>
          </Reveal>

          <Reveal>
            <Section id="downloads" eyebrow="DOWNLOADS" title="Downloads">
              <div className="flex flex-wrap gap-3">
                {study.downloads.map((d, i) => {
                  const Icon = d.kind === "repo" ? Github : Download;
                  const disabled = !d.href;
                  const inner = (
                    <>
                      <Icon size={14} />
                      {d.label}
                      {disabled && (
                        <span className="text-[9px] text-neon/60 ml-1">
                          · pending
                        </span>
                      )}
                    </>
                  );
                  return d.href ? (
                    <a
                      key={i}
                      href={d.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 border border-neon text-neon px-4 py-2 text-xs uppercase tracking-[0.2em] hover:bg-neon hover:text-primary-foreground transition-colors"
                    >
                      {inner}
                    </a>
                  ) : (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 border border-border text-muted-foreground px-4 py-2 text-xs uppercase tracking-[0.2em] cursor-not-allowed"
                    >
                      {inner}
                    </span>
                  );
                })}
              </div>
            </Section>
          </Reveal>

          <Reveal>
            <Section
              id="future"
              eyebrow="FUTURE"
              title="Improvements & Lessons"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <Card title="Future Improvements">
                  <ul className="text-sm text-muted-foreground space-y-2">
                    {study.improvements.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span className="text-neon">+</span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
                <Card title="Lessons Learned">
                  <ul className="text-sm text-muted-foreground space-y-2">
                    {study.lessons.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span className="text-neon">›</span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </Section>
          </Reveal>

          {/* Related */}
          <div className="border-t border-border/60 pt-10">
            <div className="text-[10px] tracking-[0.3em] text-neon mb-6">
              // RELATED PROJECTS
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {prev ? (
                <RelatedCard direction="prev" study={prev} />
              ) : (
                <div />
              )}
              <Link
                to="/projects"
                className="corners border border-border bg-card/40 p-5 flex flex-col items-center justify-center text-center hover:border-neon transition-colors"
              >
                <div className="text-[10px] tracking-[0.3em] text-neon">
                  // INDEX
                </div>
                <div className="mt-2 font-display uppercase tracking-widest">
                  More Projects
                </div>
              </Link>
              {next ? (
                <RelatedCard direction="next" study={next} />
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && study.gallery[lightbox]?.src && (
        <button
          type="button"
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur grid place-items-center p-6"
          aria-label="Close image"
        >
          <div className="relative max-w-5xl w-full">
            <img
              src={study.gallery[lightbox].src}
              alt={study.gallery[lightbox].caption}
              className="w-full h-auto border border-neon/40"
            />
            <div className="mt-3 text-xs text-neon tracking-[0.2em]">
              // {study.gallery[lightbox].caption}
            </div>
            <div className="absolute -top-3 -right-3 border border-neon bg-background text-neon p-2">
              <XIcon size={16} />
            </div>
          </div>
        </button>
      )}
    </div>
  );
}

function Hero({ study }: { study: CaseStudy }) {
  const isOngoing = study.status === "ongoing";
  return (
    <section
      className="relative border-b border-border/60 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,255,170,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,170,0.04) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1 text-[10px] tracking-[0.3em] text-muted-foreground hover:text-neon"
            >
              <ArrowLeft size={12} /> PROJECTS
            </Link>
            <span className="text-neon">/</span>
            <span className="text-[10px] tracking-[0.3em] text-neon">
              {study.index}
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl uppercase leading-[1.05]">
            {study.title}
          </h1>
          <div className="mt-3 text-sm text-neon tracking-[0.25em] uppercase">
            {study.subtitle}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <StatusBadge status={study.status} />
            <span className="text-[10px] tracking-[0.3em] text-muted-foreground border border-border px-3 py-1.5">
              {study.duration}
            </span>
          </div>

          {isOngoing && typeof study.progress === "number" && (
            <div className="mt-5 max-w-md">
              <div className="flex items-center justify-between text-[10px] tracking-[0.3em] text-muted-foreground mb-2">
                <span>// DEV PROGRESS</span>
                <span className="text-neon">{study.progress}%</span>
              </div>
              <div className="h-1.5 bg-border/60 relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${study.progress}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-neon"
                />
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-1.5">
            {study.tech.map((t) => (
              <span
                key={t}
                className="text-[10px] tracking-widest uppercase border border-border px-2 py-1 text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          {study.repo && (
            <div className="mt-6 flex gap-3">
              <a
                href={study.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-neon text-neon px-4 py-2 text-xs uppercase tracking-[0.2em] hover:bg-neon hover:text-primary-foreground transition-colors"
              >
                <Github size={14} /> Repository
                <ExternalLink size={12} />
              </a>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative aspect-[4/3] border border-border bg-background/50 corners overflow-hidden"
        >
          {study.hero ? (
            <>
              <img
                src={study.hero}
                alt={study.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)",
                }}
              />
            </>
          ) : (
            <div
              className="absolute inset-0 grid place-items-center text-[10px] tracking-[0.3em] text-neon/70"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,255,170,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,170,0.06) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            >
              // HERO ASSET · PENDING
            </div>
          )}
          <div className="absolute bottom-2 left-2 text-[9px] text-neon tracking-[0.3em] bg-background/70 px-2 py-1 border border-neon/30">
            // {study.index}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: "completed" | "ongoing" }) {
  if (status === "completed") {
    return (
      <span className="inline-flex items-center gap-2 border border-neon/60 text-neon px-3 py-1.5 text-[10px] tracking-[0.3em]">
        <CircleDot size={12} /> COMPLETED
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 border border-yellow-400/60 text-yellow-400 px-3 py-1.5 text-[10px] tracking-[0.3em]">
      <Circle size={12} className="animate-pulse" /> ONGOING DEVELOPMENT
    </span>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="text-[10px] tracking-[0.3em] text-neon mb-2">
        // {eyebrow}
      </div>
      <h2 className="font-display text-2xl md:text-3xl uppercase mb-6">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Card({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="corners border border-border bg-card/40 p-5 glow-border-hover">
      {eyebrow && (
        <div className="text-[10px] tracking-[0.3em] text-neon mb-1">
          // {eyebrow}
        </div>
      )}
      <div className="font-display uppercase tracking-widest text-base mb-2">
        {title}
      </div>
      {children}
    </div>
  );
}

function BulletCard({ items }: { items: string[] }) {
  return (
    <div className="corners border border-border bg-card/40 p-6">
      <ul className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-neon">▹</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

function RelatedCard({
  direction,
  study,
}: {
  direction: "prev" | "next";
  study: CaseStudy;
}) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: study.slug }}
      className="corners border border-border bg-card/40 p-5 hover:border-neon transition-colors group"
    >
      <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-neon">
        {direction === "prev" ? (
          <>
            <ArrowLeft size={12} /> PREVIOUS
          </>
        ) : (
          <>
            NEXT <ArrowRight size={12} />
          </>
        )}
      </div>
      <div className="mt-2 font-display uppercase tracking-widest">
        {study.title}
      </div>
      <div className="text-xs text-muted-foreground mt-1">
        {study.subtitle}
      </div>
    </Link>
  );
}
