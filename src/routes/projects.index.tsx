import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, CircleDot, Circle } from "lucide-react";
import { Section } from "@/components/SiteShell";
import { CASE_STUDIES, CASE_STUDY_ORDER } from "@/data/case-studies";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Neeraj K" },
      {
        name: "description",
        content:
          "In-depth engineering projects: bootloader, R-2R DAC, PID control, and RTOS traffic controller.",
      },
      { property: "og:title", content: "Projects — Neeraj K" },
      {
        property: "og:description",
        content:
          "Premium engineering documentation for embedded systems projects.",
      },
    ],
  }),
  component: CaseStudyIndex,
});

function CaseStudyIndex() {
  const studies = CASE_STUDY_ORDER.map((s) => CASE_STUDIES[s]);
  return (
    <Section eyebrow="PROJECT INDEX" title="Projects">
      <p className="text-muted-foreground max-w-2xl mb-10 leading-relaxed">
        Each project below is documented in depth — problem, architecture,
        hardware, software, challenges, results and lessons learned. Click any
        card to open the full write-up.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {studies.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Link
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="corners relative border border-border bg-card/40 p-6 glow-border-hover group block h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-xs text-neon tracking-[0.3em]">
                  {p.index}
                </div>
                {p.status === "completed" ? (
                  <span className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.3em] text-neon border border-neon/50 px-2 py-1">
                    <CircleDot size={10} /> COMPLETED
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.3em] text-yellow-400 border border-yellow-400/50 px-2 py-1">
                    <Circle size={10} className="animate-pulse" /> ONGOING
                  </span>
                )}
              </div>

              <div
                className="relative mb-4 aspect-[16/9] border border-border bg-background/40 overflow-hidden grid place-items-center"
                style={
                  !p.hero
                    ? {
                        backgroundImage:
                          "linear-gradient(rgba(0,255,170,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,170,0.06) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }
                    : undefined
                }
              >
                {p.hero ? (
                  <>
                    <img
                      src={p.hero}
                      alt=""
                      loading="lazy"
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
                  <div className="text-[10px] text-neon tracking-[0.3em]">
                    // ASSET PENDING
                  </div>
                )}
              </div>

              <h3 className="font-display text-2xl uppercase leading-tight">
                {p.title}
              </h3>
              <div className="text-xs text-neon mt-1 tracking-widest">
                {p.subtitle}
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {p.overview}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="text-[10px] tracking-widest uppercase border border-border px-2 py-1 text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground tracking-[0.25em]">
                  {p.duration}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] tracking-[0.3em] text-neon group-hover:translate-x-1 transition-transform">
                  VIEW PROJECT <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
