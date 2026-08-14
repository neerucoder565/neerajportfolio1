import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Code2, CircuitBoard, Cpu, Power } from "lucide-react";

type Level = "Beginner" | "Intermediate" | "Advanced";

type Skill = {
  name: string;
  level: Level;
  note: string;
  shape: "resistor" | "ic";
};

type Zone = {
  id: string;
  key: string;
  title: string;
  icon: typeof Code2;
  items: Skill[];
};

const ZONES: Zone[] = [
  {
    id: "programming",
    key: "programming_tools",
    title: "Programming & Tools",
    icon: Code2,
    items: [
      { name: "Embedded C", level: "Intermediate", note: "bare-metal firmware, driver development", shape: "ic" },
      { name: "Arduino Prototyping", level: "Advanced", note: "rapid hardware bring-up and testing", shape: "ic" },
      { name: "Python", level: "Intermediate", note: "automation scripts, data plotting", shape: "resistor" },
      { name: "PID Control Systems", level: "Intermediate", note: "closed-loop motor speed control", shape: "resistor" },
      { name: "Edge AI Integration", level: "Beginner", note: "tinyML inference on microcontrollers", shape: "resistor" },
      { name: "Altium", level: "Intermediate", note: "schematic capture and PCB layout", shape: "resistor" },
      { name: "Tanner EDA", level: "Beginner", note: "VLSI schematic and layout basics", shape: "resistor" },
    ],
  },
  {
    id: "electronics",
    key: "electronics_hardware",
    title: "Electronics & Hardware",
    icon: CircuitBoard,
    items: [
      { name: "Circuit Design", level: "Intermediate", note: "analog and digital signal chains", shape: "ic" },
      { name: "R-2R DAC Systems", level: "Intermediate", note: "4-bit ladder DAC design and testing", shape: "resistor" },
      { name: "Sensor Fusion", level: "Intermediate", note: "combining encoder and IMU data", shape: "resistor" },
      { name: "Hardware Debugging", level: "Intermediate", note: "scope, logic analyser, bring-up", shape: "resistor" },
      { name: "Breadboard Prototyping", level: "Intermediate", note: "fast iteration on discrete builds", shape: "resistor" },
      { name: "Microcontrollers", level: "Intermediate", note: "STM32 and AVR peripheral work", shape: "ic" },
      { name: "Automation", level: "Intermediate", note: "shop-floor process automation concepts", shape: "resistor" },
    ],
  },
  {
    id: "embedded",
    key: "embedded_systems",
    title: "Embedded Systems",
    icon: Cpu,
    items: [
      { name: "RISC-V", level: "Beginner", note: "ISA fundamentals and toolchain basics", shape: "ic" },
      { name: "Real-Time Systems", level: "Intermediate", note: "RTOS tasks, timing and scheduling", shape: "ic" },
      { name: "System Testing & Validation", level: "Intermediate", note: "test benches and regression checks", shape: "resistor" },
      { name: "Signal Processing", level: "Intermediate", note: "filtering and sampling fundamentals", shape: "resistor" },
    ],
  },
];

const LEVEL_ALPHA: Record<Level, number> = {
  Beginner: 0.35,
  Intermediate: 0.7,
  Advanced: 1,
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

function Led({ level, lit }: { level: Level; lit: boolean }) {
  const a = LEVEL_ALPHA[level];
  return (
    <span
      aria-hidden
      className="shrink-0 size-2.5 rounded-full transition-all duration-500"
      style={{
        background: lit
          ? `color-mix(in oklab, var(--neon-bright) ${a * 100}%, #2a2030)`
          : "#3a3540",
        boxShadow: lit
          ? `0 0 ${4 + a * 12}px color-mix(in oklab, var(--neon-bright) ${a * 90}%, transparent)`
          : "none",
      }}
    />
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
      {(["Beginner", "Intermediate", "Advanced"] as Level[]).map((l) => (
        <span key={l} className="flex items-center gap-2">
          <Led level={l} lit />
          {l}
        </span>
      ))}
    </div>
  );
}

export function SkillBreadboard() {
  const reduced = usePrefersReducedMotion();
  const [powered, setPowered] = useState(false);
  const [railPulse, setRailPulse] = useState(false);
  const [litCount, setLitCount] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  const order = useMemo(
    () => ZONES.flatMap((z) => z.items.map((s) => `${z.id}:${s.name}`)),
    []
  );

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const boot = useCallback(() => {
    clearTimers();
    setPowered(true);
    setActive(null);

    if (reduced) {
      setLitCount(order.length);
      setLogs([
        ...ZONES.map((z) => `INIT: ${z.key}... OK`),
        "SYSTEM READY.",
      ]);
      return;
    }

    setLitCount(0);
    setLogs([]);
    setRailPulse(true);

    const railMs = 500;
    const step = 90;
    let i = 0;
    let t = railMs;

    ZONES.forEach((z) => {
      z.items.forEach(() => {
        i += 1;
        const n = i;
        timers.current.push(window.setTimeout(() => setLitCount(n), t));
        t += step;
      });
      const zoneT = t;
      timers.current.push(
        window.setTimeout(() => setLogs((p) => [...p, `INIT: ${z.key}... OK`]), zoneT)
      );
      t += 160;
    });

    timers.current.push(window.setTimeout(() => setRailPulse(false), railMs + 200));
    timers.current.push(window.setTimeout(() => setLogs((p) => [...p, "SYSTEM READY."]), t));
  }, [clearTimers, order.length, reduced]);

  const boardRef = useRef<HTMLDivElement | null>(null);
  const bootedOnce = useRef(false);

  useEffect(() => {
    const el = boardRef.current;
    if (!el || bootedOnce.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !bootedOnce.current) {
            bootedOnce.current = true;
            io.disconnect();
            timers.current.push(window.setTimeout(() => boot(), reduced ? 0 : 1000));
          }
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [boot, reduced]);

  const isLit = (idx: number) => powered && idx < litCount;

  return (
    <div className="space-y-6" ref={boardRef}>
      <Legend />

      <div
        className="corners relative border border-border p-4 md:p-6 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(28,24,34,0.85), rgba(18,16,22,0.9))",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 1.6px)",
          backgroundSize: "14px 14px",
        }}
      >
        {/* top power rails */}
        <div className="relative mb-5 space-y-1">
          <Rail color="rgba(255,90,120,0.5)" pulse={railPulse} lit={powered} />
          <Rail color="rgba(90,150,255,0.45)" pulse={railPulse} lit={powered} delay={120} />
        </div>


        <div className="grid gap-6 lg:grid-cols-3">
          {ZONES.map((z) => {
            const before = order.indexOf(`${z.id}:${z.items[0].name}`);
            return (
              <div key={z.id} className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <z.icon
                    size={18}
                    strokeWidth={1.5}
                    className={powered ? "text-neon" : "text-muted-foreground"}
                  />
                  <h3 className="font-display uppercase text-xs tracking-[0.2em]">{z.title}</h3>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                  {z.items.map((s, i) => (
                    <SkillPart
                      key={s.name}
                      skill={s}
                      lit={isLit(before + i)}
                      active={active === s.name}
                      onActivate={() => setActive(active === s.name ? null : s.name)}
                      onHover={(v) => setActive(v ? s.name : null)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* bottom rails */}
        <div className="mt-6 space-y-1">
          <Rail color="rgba(90,150,255,0.45)" pulse={false} lit={powered} />
          <Rail color="rgba(255,90,120,0.5)" pulse={false} lit={powered} />
        </div>
      </div>

      <div
        className="border border-border bg-card/40 p-4 font-mono text-xs min-h-[110px]"
        aria-live="polite"
      >
        {logs.length === 0 ? (
          <div className="text-muted-foreground">// board unpowered — press PWR to initialise</div>
        ) : (
          logs.map((l) => (
            <div key={l} className="text-neon">
              <span className="text-muted-foreground mr-2">&gt;</span>
              {l}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Rail({
  color,
  pulse,
  lit,
  delay = 0,
}: {
  color: string;
  pulse: boolean;
  lit: boolean;
  delay?: number;
}) {
  return (
    <div className="relative h-px w-full overflow-hidden" style={{ background: color, opacity: lit ? 1 : 0.4 }}>
      {pulse && (
        <span
          className="absolute inset-y-0 w-24 rail-pulse"
          style={{
            animationDelay: `${delay}ms`,
            background:
              "linear-gradient(90deg, transparent, var(--neon-bright), transparent)",
            boxShadow: "0 0 12px var(--neon-bright)",
          }}
        />
      )}
    </div>
  );
}

function SkillPart({
  skill,
  lit,
  active,
  onActivate,
  onHover,
}: {
  skill: Skill;
  lit: boolean;
  active: boolean;
  onActivate: () => void;
  onHover: (v: boolean) => void;
}) {
  const a = LEVEL_ALPHA[skill.level];
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onActivate}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        onFocus={() => onHover(true)}
        onBlur={() => onHover(false)}
        aria-label={`${skill.name} — ${skill.level}`}
        className="group w-full min-h-11 flex items-center gap-2 border px-2 py-2 text-left transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon-bright)]"
        style={{
          borderColor: lit
            ? `color-mix(in oklab, var(--neon-bright) ${a * 60}%, transparent)`
            : "rgba(255,255,255,0.08)",
          background: lit ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.015)",
          boxShadow:
            lit && active
              ? "0 0 18px color-mix(in oklab, var(--neon-bright) 45%, transparent)"
              : "none",
        }}
      >
        {/* part body */}
        <span aria-hidden className="shrink-0">
          {skill.shape === "ic" ? (
            <svg width="26" height="16" viewBox="0 0 26 16">
              <rect x="5" y="3" width="16" height="10" rx="1" fill="#15131a" stroke={lit ? "var(--neon-bright)" : "#4a4550"} strokeWidth="0.8" />
              {[0, 1, 2].map((i) => (
                <g key={i} stroke={lit ? "var(--neon-bright)" : "#4a4550"} strokeWidth="1.2">
                  <line x1={8 + i * 5} y1="13" x2={8 + i * 5} y2="16" />
                  <line x1={8 + i * 5} y1="0" x2={8 + i * 5} y2="3" />
                </g>
              ))}
            </svg>
          ) : (
            <svg width="26" height="16" viewBox="0 0 26 16">
              <line x1="0" y1="8" x2="6" y2="8" stroke={lit ? "var(--neon-bright)" : "#4a4550"} strokeWidth="1.2" />
              <line x1="20" y1="8" x2="26" y2="8" stroke={lit ? "var(--neon-bright)" : "#4a4550"} strokeWidth="1.2" />
              <rect x="6" y="4" width="14" height="8" rx="2" fill="#2a2230" stroke={lit ? "var(--neon-bright)" : "#4a4550"} strokeWidth="0.8" />
              <line x1="10" y1="4" x2="10" y2="12" stroke={lit ? "var(--cyan)" : "#5a5560"} strokeWidth="1" />
              <line x1="14" y1="4" x2="14" y2="12" stroke={lit ? "var(--cyan)" : "#5a5560"} strokeWidth="1" />
            </svg>
          )}
        </span>

        <span
          className="flex-1 font-mono text-[11px] leading-tight transition-colors duration-500"
          style={{
            color: lit
              ? `color-mix(in oklab, var(--foreground) ${40 + a * 60}%, transparent)`
              : "rgba(200,190,210,0.28)",
          }}
        >
          {skill.name}
        </span>

        <Led level={skill.level} lit={lit} />
      </button>

      {active && lit && (
        <div className="absolute z-30 left-0 right-0 top-full mt-1 border border-border bg-background/95 backdrop-blur-sm p-3 text-[11px] font-mono shadow-lg">
          <div className="text-neon">{skill.name}</div>
          <div className="text-cyan uppercase tracking-[0.2em] text-[9px] mt-1">{skill.level}</div>
          <div className="text-muted-foreground mt-1 leading-relaxed">{skill.note}</div>
        </div>
      )}
    </div>
  );
}
