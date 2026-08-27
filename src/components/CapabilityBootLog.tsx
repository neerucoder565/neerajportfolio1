import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useReducedMotion } from "motion/react";

type Capability = {
  cmd: string;
  label: string;
  desc: string;
  to?: string;
};

const CAPS: Capability[] = [
  {
    cmd: "init embedded_systems",
    label: "EMBEDDED SYSTEMS",
    desc: "Bare-metal firmware, MCU bring-up and peripheral drivers on STM32 / AVR.",
    to: "/projects",
  },
  {
    cmd: "mount circuit_design",
    label: "CIRCUIT DESIGN",
    desc: "Schematic capture, R-2R networks and breadboard-to-board prototyping.",
    to: "/projects",
  },
  {
    cmd: "load control_systems",
    label: "CONTROL SYSTEMS",
    desc: "PID loops, encoder feedback and real-time motor control tuning.",
    to: "/projects",
  },
  {
    cmd: "start sensor_interfacing",
    label: "SENSOR INTERFACING",
    desc: "ADC/DAC chains, signal conditioning and multi-sensor data fusion.",
  },
  {
    cmd: "verify simulation_testing",
    label: "SIMULATION & TESTING",
    desc: "Pre-silicon validation, scope-verified waveforms and fault isolation.",
  },
  {
    cmd: "enable automation_stack",
    label: "AUTOMATION",
    desc: "Shop-floor automation concepts and process improvement from HL Mando.",
    to: "/experience/hl-mando",
  },
];

const READY = "> SYSTEM READY. NEERAJ K — ONLINE.";

/** Human-feeling per-character cadence: quicker mid-word, pauses on punctuation. */
function charDelay(ch: string, prev: string, index: number, len: number) {
  if (/[.,:;_]/.test(ch)) return 110;
  if (ch === " ") return 70;
  if (/[.,:;]/.test(prev)) return 130;
  const edge = index < 2 || index > len - 3;
  return edge ? 46 : 20 + Math.random() * 16;
}

function curveY(t: number) {
  // gentle etched-trace sag; matches the SVG quadratic control point
  return (1 - t) * (1 - t) * 62 + 2 * (1 - t) * t * 40 + t * t * 62;
}

export function CapabilityBootLog() {
  const prefersReduced = useReducedMotion() === true;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [done, setDone] = useState<number>(prefersReduced ? CAPS.length : 0);
  const [typing, setTyping] = useState<{ line: number; chars: number }>(
    prefersReduced ? { line: CAPS.length, chars: 0 } : { line: 0, chars: 0 },
  );
  const [ready, setReady] = useState(prefersReduced);
  const [pulse, setPulse] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const started = useRef(prefersReduced);

  useEffect(() => {
    if (prefersReduced) return;
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [prefersReduced]);

  useEffect(() => {
    if (prefersReduced || !inView || started.current) return;
    started.current = true;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((res) => timers.push(setTimeout(res, ms)));

    (async () => {
      for (let line = 0; line < CAPS.length; line++) {
        if (cancelled) return;
        const text = CAPS[line].cmd;
        setTyping({ line, chars: 0 });
        for (let i = 1; i <= text.length; i++) {
          await wait(charDelay(text[i - 1], text[i - 2] ?? "", i, text.length));
          if (cancelled) return;
          setTyping({ line, chars: i });
        }
        await wait(150);
        if (cancelled) return;
        setDone(line + 1);
        await wait(220);
      }
      if (cancelled) return;
      setPulse(true);
      await wait(200);
      setPulse(false);
      setReady(true);
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView, prefersReduced]);

  const fill = done / CAPS.length;

  const nodes = useMemo(
    () =>
      CAPS.map((c, i) => {
        const t = (i + 0.5) / CAPS.length;
        return { ...c, t, x: t * 100, y: curveY(t) };
      }),
    [],
  );

  const nodeClass = useCallback(
    (lit: boolean) =>
      `absolute -translate-x-1/2 -translate-y-1/2 size-3.5 rounded-full transition-transform duration-300 ${
        lit ? "bg-neon glow-bleed led-breathe" : "bg-muted-foreground/30"
      }`,
    [],
  );

  return (
    <div
      ref={rootRef}
      className={`transition-[filter] duration-150 ${pulse ? "crt-online" : ""}`}
    >
      {/* Terminal */}
      <div className="corners relative rounded-sm border border-neon/40 bg-background/85 term-recess p-5 md:p-7 font-mono text-xs md:text-sm">
        <div className="flex items-center gap-2 mb-4 text-[10px] tracking-[0.3em] text-muted-foreground">
          <span className="size-2 rounded-full bg-neon glow-bleed" />
          /dev/neeraj — capabilities
        </div>

        <ul className="space-y-2">
          {CAPS.map((c, i) => {
            const isDone = i < done;
            const isTyping = !prefersReduced && !isDone && typing.line === i;
            const text = prefersReduced
              ? c.cmd
              : isDone
                ? c.cmd
                : isTyping
                  ? c.cmd.slice(0, typing.chars)
                  : "";
            if (!isDone && !isTyping && !prefersReduced) return null;
            return (
              <li key={c.label} className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-block ${isDone ? "text-neon" : "text-muted-foreground"}`}
                  style={
                    isDone && !prefersReduced
                      ? {
                          animation:
                            "ok-settle 250ms cubic-bezier(0.34,1.56,0.64,1) 1",
                        }
                      : undefined
                  }
                >
                  {isDone ? "[OK]" : "[  ]"}
                </span>
                <span className="text-foreground">$ {text}</span>
                {isTyping && <span className="term-caret" />}
                {isDone && (
                  <span className="text-muted-foreground/70">{c.label}</span>
                )}
              </li>
            );
          })}
        </ul>

        {ready && (
          <div className="mt-5 text-neon">
            {READY} <span className="term-caret" />
          </div>
        )}
      </div>

      {/* Trace — horizontal on desktop */}
      <div className="hidden md:block relative mt-10 h-32">
        <svg
          viewBox="0 0 1000 120"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          style={{ filter: "drop-shadow(0 3px 4px oklch(0 0 0 / 0.6))" }}
          aria-hidden="true"
        >
          <path
            d="M0,62 Q500,40 1000,62"
            fill="none"
            stroke="currentColor"
            className="text-border"
            strokeWidth={3}
          />
          <path
            d="M0,62 Q500,40 1000,62"
            fill="none"
            stroke="var(--neon)"
            strokeWidth={3}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - fill}
            style={{
              transition: prefersReduced
                ? undefined
                : "stroke-dashoffset 700ms cubic-bezier(0.16,1,0.3,1)",
              filter: `drop-shadow(0 0 ${done ? 6 : 0}px var(--neon))`,
            }}
          />
        </svg>
        {nodes.map((n, i) => (
          <TraceNode
            key={n.label}
            cap={n}
            lit={i < done}
            hovered={hover === i}
            onHover={(v) => setHover(v ? i : null)}
            style={{ left: `${n.x}%`, top: `${(n.y / 120) * 100}%` }}
            nodeClass={nodeClass(i < done)}
            reduced={prefersReduced}
          />
        ))}
      </div>

      {/* Trace — vertical on mobile */}
      <div className="md:hidden relative mt-8 pl-6">
        <div className="absolute left-[7px] top-0 bottom-0 w-[3px] bg-border rounded-full" />
        <div
          className="absolute left-[7px] top-0 w-[3px] rounded-full bg-neon glow-bleed"
          style={{
            height: `${fill * 100}%`,
            transition: prefersReduced
              ? undefined
              : "height 700ms cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        <ul className="space-y-5">
          {CAPS.map((c, i) => {
            const lit = i < done;
            return (
              <li key={c.label} className="relative">
                <span
                  className={`absolute -left-6 top-1.5 size-3.5 rounded-full ${
                    lit ? "bg-neon glow-bleed led-breathe" : "bg-muted-foreground/30"
                  }`}
                />
                <div
                  className={`text-sm font-display uppercase tracking-wide ${
                    lit ? "text-neon" : "text-muted-foreground/60"
                  }`}
                >
                  {c.label}
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {c.desc}
                </p>
                {c.to && lit && (
                  <Link
                    to={c.to}
                    className="text-[11px] font-mono text-cyan mt-1 inline-block"
                  >
                    → View project
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function TraceNode({
  cap,
  lit,
  hovered,
  onHover,
  style,
  nodeClass,
  reduced,
}: {
  cap: Capability & { x: number; y: number };
  lit: boolean;
  hovered: boolean;
  onHover: (v: boolean) => void;
  style: React.CSSProperties;
  nodeClass: string;
  reduced: boolean;
}) {
  return (
    <div
      className="absolute"
      style={style}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {/* flash halo on power-on */}
      {lit && !reduced && (
        <span
          key="flash"
          className="absolute -translate-x-1/2 -translate-y-1/2 size-3.5 rounded-full bg-neon led-flash pointer-events-none"
          style={{ filter: "blur(3px)" }}
        />
      )}
      <button
        type="button"
        aria-label={cap.label}
        onFocus={() => onHover(true)}
        onBlur={() => onHover(false)}
        className={`${nodeClass} ${hovered && lit ? "scale-110" : ""} cursor-default outline-none`}
        style={
          hovered && lit && !reduced
            ? { transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)" }
            : undefined
        }
      />
      <div
        className={`absolute left-1/2 top-4 w-56 -translate-x-1/2 rounded-sm border border-neon/40 bg-background/95 p-3 text-left backdrop-blur-sm transition-all duration-200 ${
          hovered && lit
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
        style={{ boxShadow: "0 0 24px oklch(0.62 0.26 300 / 0.25)" }}
      >
        <div className="font-display text-[11px] uppercase tracking-[0.2em] text-neon">
          {cap.label}
        </div>
        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
          {cap.desc}
        </p>
        {cap.to && (
          <Link
            to={cap.to}
            className="mt-2 inline-block font-mono text-[11px] text-cyan"
          >
            → View project
          </Link>
        )}
      </div>
    </div>
  );
}
