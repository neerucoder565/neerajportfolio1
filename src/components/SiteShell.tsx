import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { VideoBackdrop } from "./VideoBackdrop";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex flex-col">
      <VideoBackdrop />
      <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-md bg-background/70">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-2">
            <span className="font-display text-neon text-lg tracking-[0.25em]">NEERAJ K</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative px-3 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
                    active
                      ? "text-neon"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-px bg-neon" />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link to="/contact" className="hidden md:flex items-center gap-3 group">
            <span className="size-2 rounded-full bg-neon anim-pulse-neon" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground group-hover:text-neon transition-colors">
              // OPEN TO WORK
            </span>
          </Link>

          <button
            className="md:hidden text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <nav className="md:hidden border-t border-border/50 px-6 py-4 flex flex-col gap-2 bg-background">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-neon"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/50 mt-24">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs text-muted-foreground tracking-widest">
            © {new Date().getFullYear()} NEERAJ K // ALL SYSTEMS NOMINAL
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Neeraj0410"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-neon transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/neeraj-k-301386328"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-neon transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:neerajmadan2006@gmail.com"
              className="text-muted-foreground hover:text-neon transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

type TitleAnim = "blur" | "slide" | "scale" | "glitch" | "stagger" | "flip";

const TITLE_ANIMS: TitleAnim[] = ["blur", "slide", "scale", "glitch", "stagger", "flip"];

const animAssignments = new Map<string, TitleAnim>();

function pickAnim(seed: string): TitleAnim {
  const existing = animAssignments.get(seed);
  if (existing) return existing;
  const next = TITLE_ANIMS[animAssignments.size % TITLE_ANIMS.length];
  animAssignments.set(seed, next);
  return next;
}

function AnimatedTitle({ text, anim }: { text: string; anim: TitleAnim }) {
  const cls = "font-display text-3xl md:text-5xl uppercase text-glow-soft";
  const vp = { once: true, amount: 0.6 } as const;

  if (anim === "stagger") {
    return (
      <motion.h2
        className={cls}
        initial="hidden"
        whileInView="show"
        viewport={vp}
        variants={{ show: { transition: { staggerChildren: 0.035 } } }}
      >
        {text.split("").map((ch, i) => (
          <motion.span
            key={`${ch}-${i}`}
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: 22, rotateX: -70 },
              show: { opacity: 1, y: 0, rotateX: 0 },
            }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </motion.h2>
    );
  }

  const presets = {
    blur: {
      initial: { opacity: 0, y: 18, filter: "blur(8px)" },
      whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    },
    slide: {
      initial: { opacity: 0, x: -60, skewX: 8 },
      whileInView: { opacity: 1, x: 0, skewX: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.82, letterSpacing: "0.4em" },
      whileInView: { opacity: 1, scale: 1, letterSpacing: "0em" },
    },
    glitch: {
      initial: { opacity: 0, skewY: 6, y: -18, filter: "blur(4px)" },
      whileInView: { opacity: 1, skewY: 0, y: 0, filter: "blur(0px)" },
    },
    flip: {
      initial: { opacity: 0, rotateX: -85, y: 10 },
      whileInView: { opacity: 1, rotateX: 0, y: 0 },
    },
  };

  const p = presets[anim as Exclude<TitleAnim, "stagger">];

  return (
    <motion.h2
      className={cls}
      style={{ transformPerspective: 800 }}
      initial={p.initial}
      whileInView={p.whileInView}
      viewport={vp}
      transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      {text}
    </motion.h2>
  );
}

export function Section({
  eyebrow,
  title,
  titleAnim,
  children,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  titleAnim?: TitleAnim;
  children: React.ReactNode;
  className?: string;
}) {
  const anim = titleAnim ?? pickAnim(title ?? eyebrow ?? "section");
  return (
    <section className={`mx-auto max-w-7xl px-6 py-16 md:py-24 ${className}`}>
      {(eyebrow || title) && (
        <div className="mb-12">
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-xs text-neon tracking-[0.3em] mb-3"
            >
              // {eyebrow}
            </motion.div>
          )}
          {title && (
            <div className="relative inline-block">
              <AnimatedTitle text={title} anim={anim} />
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block h-px mt-3 origin-left bg-gradient-to-r from-neon via-neon/40 to-transparent"
                style={{ boxShadow: "0 0 12px color-mix(in oklab, var(--neon) 60%, transparent)" }}
              />
            </div>
          )}
        </div>
      )}
      <motion.div
        className="section-body-glow"
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}

export function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`corners relative bg-card/40 border border-border p-6 glow-border-hover ${className}`}
    >
      {children}
    </div>
  );
}
