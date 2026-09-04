import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Panel, Section } from "@/components/SiteShell";
import { GraduationCap } from "lucide-react";
import altiumLogo from "@/assets/altium-logo.png.asset.json";



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

const TOOL_LOGOS = [
  { name: "C", icon: "https://cdn.simpleicons.org/c" },
  { name: "C++", icon: "https://cdn.simpleicons.org/cplusplus" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python" },
  { name: "Arduino", icon: "https://cdn.simpleicons.org/arduino" },
  { name: "STM32", icon: "https://cdn.simpleicons.org/stmicroelectronics" },
  { name: "Altium", icon: altiumLogo.url },
  { name: "Git", icon: "https://cdn.simpleicons.org/git" },
];

const ABOUT_SEGMENTS: { label: string; text: string }[] = [
  {
    label: "// BACKGROUND",
    text: "Electronics and Embedded Systems engineer focused on building intelligent hardware and low-level software. I enjoy taking ideas from schematic to working prototype — writing firmware, designing circuits, and iterating on real hardware until it works reliably. Currently completing my B.E. in Electronics & Communication Engineering.",
  },
  {
    label: "// SKILLS",
    text: "Hands-on experience with microcontrollers, circuit design, sensor interfacing, DAC systems, and motor control through academic and personal projects. Proficient in Embedded C, C++, and Python, with a strong focus on hardware-software interaction, system debugging, and practical engineering problem-solving on the bench.",
  },
  {
    label: "// INTERESTS",
    text: "Exploring RISC-V architectures, VLSI design, edge AI, and next-generation embedded platforms — continuously building projects to deepen my expertise in digital systems and semiconductor technologies, and to bridge the gap between theory and working silicon.",
  },
];

function useTypewriter(segments: { text: string }[], start: boolean) {
  const [counts, setCounts] = useState<number[]>(() => segments.map(() => 0));
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start || done) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setCounts(segments.map((s) => s.text.length));
      setDone(true);
      return;
    }
    let seg = 0;
    let char = 0;
    let timer: number;
    const tick = () => {
      char += 1;
      const s = seg;
      const c = char;
      setCounts((prev) => {
        const next = [...prev];
        next[s] = c;
        return next;
      });
      if (char >= segments[seg].text.length) {
        seg += 1;
        char = 0;
        if (seg >= segments.length) {
          setDone(true);
          return;
        }
        timer = window.setTimeout(tick, 400);
        return;
      }
      timer = window.setTimeout(tick, 18);
    };
    timer = window.setTimeout(tick, 500);
    return () => window.clearTimeout(timer);
  }, [start, done, segments]);

  return { counts, done };
}

function About() {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const { counts, done } = useTypewriter(ABOUT_SEGMENTS, inView);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Section eyebrow="IDENTITY.LOG" title="About Neeraj K">
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          <Panel className="lg:col-span-2 h-full flex flex-col">
            <div ref={panelRef} className="max-w-[68ch] space-y-4 font-mono">
              {ABOUT_SEGMENTS.map((seg, i) => {
                const typed = seg.text.slice(0, counts[i] ?? 0);
                const isActive = !done && counts[i] < seg.text.length && (i === 0 || counts[i - 1] >= ABOUT_SEGMENTS[i - 1].text.length);
                const isLast = done && i === ABOUT_SEGMENTS.length - 1;
                return (
                  <div key={seg.label}>
                    <div className="text-xs text-neon tracking-[0.3em] pt-2 first:pt-0">{seg.label}</div>
                    <p className="text-muted-foreground leading-relaxed mt-1 min-h-[3.5rem]">
                      {typed}
                      {(isActive || isLast) && !done && (
                        <span className="inline-block w-[7px] h-[1.05em] align-text-bottom bg-[var(--neon-bright)] animate-pulse ml-0.5 shadow-[0_0_8px_var(--neon-bright)]" />
                      )}
                    </p>
                  </div>
                );
              })}
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

      <Section eyebrow="TECHNICAL STACK" title="Tools & Platforms">
        <div className="flex flex-wrap gap-4">
          {TOOL_LOGOS.map((t) => (
            <div
              key={t.name}
              title={t.name}
              className="corners relative group flex items-center gap-3 border border-border bg-card/40 px-4 py-3 transition-all duration-300 hover:border-[var(--neon-bright)]/50 hover:shadow-[0_0_18px_color-mix(in_oklab,var(--neon-bright)_35%,transparent)]"
            >
              <span className="size-12 rounded-md bg-white/95 flex items-center justify-center p-2 shrink-0 transition-transform duration-300 group-hover:scale-110">
                <img
                  src={t.icon}
                  alt={`${t.name} logo`}
                  loading="lazy"
                  className="size-full object-contain"
                />
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
