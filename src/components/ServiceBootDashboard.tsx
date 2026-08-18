import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Panel } from "./SiteShell";
import { Cpu, Wrench, CircuitBoard, FlaskConical, Bug, BookOpen, type LucideIcon } from "lucide-react";

export type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
  slug: string;
  log: string;
};

export const SERVICES: Service[] = [
  {
    icon: Cpu,
    title: "Embedded Systems Prototyping",
    desc: "From idea to working firmware on Arduino and embedded MCUs.",
    slug: "embedded-prototyping.service",
    log: "last_run: firmware flash successful, 0 errors",
  },
  {
    icon: Wrench,
    title: "Arduino-Based Development",
    desc: "End-to-end Arduino projects with sensors, actuators and control loops.",
    slug: "arduino-development.service",
    log: "last_run: sensor calibration completed",
  },
  {
    icon: CircuitBoard,
    title: "Electronics Hardware Development",
    desc: "Schematic design, breadboard layout and component selection.",
    slug: "hardware-design.service",
    log: "last_run: schematic validated, DRC passed",
  },
  {
    icon: FlaskConical,
    title: "Circuit Simulation & Testing",
    desc: "Validate behavior in simulation before committing to hardware.",
    slug: "circuit-simulation.service",
    log: "last_run: simulation converged, no faults",
  },
  {
    icon: Bug,
    title: "Hardware Debugging & Optimization",
    desc: "Diagnose noisy signals, timing issues and component-level faults.",
    slug: "hardware-debugging.service",
    log: "last_run: resolved timing skew, rev.C board",
  },
  {
    icon: BookOpen,
    title: "Engineering Research & Implementation",
    desc: "Translate concepts and papers into working hardware demos.",
    slug: "engineering-research.service",
    log: "last_run: prototype demo validated",
  },
];

const CMD = "$ systemctl status neeraj-services.target";

export function ServiceBootDashboard() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [typed, setTyped] = useState(0);
  const [shown, setShown] = useState(0);
  const [ok, setOk] = useState(0);
  const [phase, setPhase] = useState<"idle" | "boot" | "dash">(reduced ? "dash" : "idle");
  const [active, setActive] = useState<number | null>(null);
  const [ping, setPing] = useState<number | null>(null);
  const lastInteract = useRef(Date.now());
  const bootStarted = useRef(false);

  useEffect(() => {
    if (reduced) return;
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio >= 0.3) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: [0, 0.3, 0.4], rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  // boot sequence
  useEffect(() => {
    if (reduced || !inView || bootStarted.current) return;
    bootStarted.current = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    setPhase("boot");
    const start = 180;
    for (let i = 1; i <= CMD.length; i++) {
      timers.push(setTimeout(() => setTyped(i), start + i * 22));
    }
    const afterType = start + CMD.length * 22 + 260;
    for (let i = 0; i < SERVICES.length; i++) {
      timers.push(setTimeout(() => setShown(i + 1), afterType + i * 220));
      timers.push(setTimeout(() => setOk(i + 1), afterType + i * 220 + 150));
    }
    const done = afterType + (SERVICES.length - 1) * 220 + 150 + 420;
    timers.push(setTimeout(() => setPhase("dash"), done));
    // Fail safe: the services must never remain trapped in the boot terminal.
    timers.push(setTimeout(() => setPhase("dash"), 5000));
    return () => timers.forEach(clearTimeout);
  }, [inView, reduced]);

  // ambient health-check ping
  useEffect(() => {
    if (reduced || phase !== "dash") return;
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      const delay = 12000 + Math.random() * 3000;
      t = setTimeout(() => {
        if (Date.now() - lastInteract.current > 12000) {
          const i = Math.floor(Math.random() * SERVICES.length);
          setPing(i);
          setTimeout(() => setPing(null), 1000);
        }
        loop();
      }, delay);
    };
    loop();
    return () => clearTimeout(t);
  }, [phase, reduced]);

  return (
    <div ref={rootRef}>
      <AnimatePresence mode="wait">
        {phase !== "dash" ? (
          <motion.div
            key="boot"
            aria-hidden="true"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-sm border border-neon/40 bg-background/80 p-5 font-mono text-xs md:text-sm min-h-[16rem]"
          >
            <div className="text-cyan">
              {CMD.slice(0, typed)}
              {typed < CMD.length && <span className="caret" />}
            </div>
            <div className="mt-4 space-y-1.5">
              {SERVICES.slice(0, shown).map((s, i) => (
                <div key={s.slug} className="flex flex-wrap items-center gap-2">
                  <span className={i < ok ? "text-neon" : "text-muted-foreground anim-pulse-neon"}>
                    {i < ok ? "[ OK ]" : "[....]"}
                  </span>
                  <span className="text-muted-foreground">
                    svc_{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-foreground">{s.slug}</span>
                  {i < ok && <span className="text-muted-foreground/70">active (running)</span>}
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={reduced ? false : { opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SERVICES.map((s, i) => {
              const isOpen = active === i;
              return (
                <Panel key={s.title} className="focus-within:ring-1 focus-within:ring-ring">
                  <div
                    tabIndex={0}
                    role="group"
                    aria-label={s.title}
                    onMouseEnter={() => {
                      lastInteract.current = Date.now();
                      setActive(i);
                    }}
                    onMouseLeave={() => setActive((a) => (a === i ? null : a))}
                    onFocus={() => {
                      lastInteract.current = Date.now();
                      setActive(i);
                    }}
                    onBlur={() => setActive((a) => (a === i ? null : a))}
                    onClick={() => {
                      lastInteract.current = Date.now();
                      setActive((a) => (a === i ? null : i));
                    }}
                    className="outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <s.icon className="text-neon" size={26} strokeWidth={1.5} />
                      <span className="flex items-center gap-1.5 text-[10px] text-neon tracking-[0.3em]">
                        <span
                          className={`inline-block size-1.5 rounded-full bg-neon ${
                            reduced ? "" : "anim-pulse-neon"
                          }`}
                          style={ping === i ? { filter: "drop-shadow(0 0 8px var(--neon))" } : undefined}
                        />
                        ACTIVE SVC_{String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="mb-4 h-px w-full bg-border overflow-hidden">
                      <motion.div
                        className="h-px bg-neon"
                        style={{ opacity: ping === i ? 1 : 0.6 }}
                        animate={
                          reduced
                            ? { width: "55%" }
                            : { width: ["35%", "72%", "48%", "88%", "35%"] }
                        }
                        transition={
                          reduced
                            ? undefined
                            : { duration: 9, repeat: Infinity, ease: "easeInOut" }
                        }
                      />
                    </div>

                    <h3 className="font-display text-lg uppercase">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.p
                          initial={{ opacity: 0, y: -6, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -6, height: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="mt-3 font-mono text-xs text-muted-foreground/80 overflow-hidden"
                        >
                          &gt; {s.log}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </Panel>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
