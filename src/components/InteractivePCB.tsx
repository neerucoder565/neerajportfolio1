import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "@tanstack/react-router";

/**
 * Interactive embedded systems motherboard.
 * Realistic PCB with STM32 MCU, peripheral IC modules, copper traces, vias,
 * silkscreen labels and animated signal flow on hover.
 */

type ChipId =
  | "STM32"
  | "RTOS"
  | "UART"
  | "AI"
  | "ALTIUM"
  | "DAC"
  | "EMBC"
  | "ARDUINO";

interface ProjectRef {
  id: string;
  title: string;
  slug?: string; // case-study slug; falsy = display only
}

interface Chip {
  id: ChipId;
  label: string;
  sub: string;
  x: number;
  y: number;
  w: number;
  h: number;
  // trace polyline points from chip anchor toward MCU
  trace: string;
  projects: ProjectRef[];
}

// Project catalog — matches src/data/case-studies.ts
const P: Record<string, ProjectRef> = {
  r2r: { id: "PRJ_02", title: "R-2R DAC", slug: "r2r-dac" },
  boot: { id: "PRJ_01", title: "Bare-Metal Bootloader", slug: "bootloader" },
  pid: { id: "PRJ_03", title: "PID Control System", slug: "pid-control" },
  rtos: { id: "RTOS", title: "RTOS Traffic Controller Monitor", slug: "rtos" },
};


const CHIPS: Chip[] = [
  {
    id: "RTOS",
    label: "RTOS",
    sub: "SCHEDULER",
    x: 40, y: 55, w: 110, h: 54,
    trace: "150,82 175,82 175,140 210,140 210,200",
    projects: [P.rtos],
  },
  {
    id: "AI",
    label: "AI",
    sub: "NPU / EDGE",
    x: 205, y: 30, w: 90, h: 54,
    trace: "250,84 250,120 250,200",
    projects: [P.rtos],
  },
  {
    id: "EMBC",
    label: "EMB-C",
    sub: "EMBEDDED C",
    x: 350, y: 55, w: 110, h: 54,
    trace: "350,82 325,82 325,140 290,140 290,200",
    projects: [P.boot, P.pid],
  },
  {
    id: "UART",
    label: "UART",
    sub: "USART1 · TX/RX",
    x: 388, y: 218, w: 92, h: 62,
    trace: "388,249 340,249 340,249 300,249",
    projects: [P.pid],
  },
  {
    id: "ARDUINO",
    label: "ARDUINO",
    sub: "AVR · PROTO",
    x: 350, y: 388, w: 110, h: 54,
    trace: "350,415 325,415 325,360 290,360 290,300",
    projects: [P.pid],
  },
  {
    id: "DAC",
    label: "DAC",
    sub: "R-2R LADDER",
    x: 205, y: 415, w: 90, h: 54,
    trace: "250,415 250,380 250,300",
    projects: [P.r2r],
  },
  {
    id: "ALTIUM",
    label: "ALTIUM",
    sub: "PCB DESIGN",
    x: 40, y: 388, w: 110, h: 54,
    trace: "150,415 175,415 175,360 210,360 210,300",
    projects: [P.r2r],
  },
];

const NEON = "var(--neon)";

export function InteractivePCB({ size = 500 }: { size?: number }) {
  const [hover, setHover] = useState<ChipId | null>(null);
  const [selected, setSelected] = useState<ChipId | null>(null);

  const selectedChip = useMemo(
    () =>
      selected === "STM32"
        ? {
            id: "STM32" as ChipId,
            label: "STM32F407",
            sub: "ARM CORTEX-M4",
            projects: [P.boot],
          }
        : CHIPS.find((c) => c.id === selected) || null,
    [selected]
  );

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div
        className="relative"
        style={{ width: "100%", maxWidth: size, aspectRatio: "1 / 1" }}
      >
        <svg
          viewBox="0 0 500 500"
          className="absolute inset-0 w-full h-full"
          role="img"
          aria-label="Interactive embedded systems PCB"
        >
          <defs>
            {/* PCB substrate — subtle dark green with fiber texture */}
            <linearGradient id="pcb-body" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.22 0.05 165)" />
              <stop offset="55%" stopColor="oklch(0.18 0.04 170)" />
              <stop offset="100%" stopColor="oklch(0.14 0.03 175)" />
            </linearGradient>
            <linearGradient id="chip-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.20 0.008 170)" />
              <stop offset="100%" stopColor="oklch(0.10 0.006 175)" />
            </linearGradient>
            <linearGradient id="mcu-body" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.24 0.01 170)" />
              <stop offset="100%" stopColor="oklch(0.08 0.006 175)" />
            </linearGradient>
            <radialGradient id="signal-glow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor={NEON} stopOpacity="1" />
              <stop offset="100%" stopColor={NEON} stopOpacity="0" />
            </radialGradient>
            <filter id="trace-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <pattern
              id="pcb-grid"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke={NEON}
                strokeOpacity="0.04"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>

          {/* Substrate */}
          <rect
            x="8"
            y="8"
            width="484"
            height="484"
            rx="8"
            fill="url(#pcb-body)"
            stroke={NEON}
            strokeOpacity="0.35"
            strokeWidth="1"
          />
          <rect x="8" y="8" width="484" height="484" rx="8" fill="url(#pcb-grid)" />

          {/* Silkscreen border markings */}
          <g
            fontFamily="var(--font-mono)"
            fontSize="7"
            fill={NEON}
            fillOpacity="0.55"
            letterSpacing="2"
          >
            <text x="20" y="22">NK-EMB-01 // REV 2.4</text>
            <text x="480" y="22" textAnchor="end">
              +3V3 · GND
            </text>
            <text x="20" y="488">© NEERAJ K — MOTHERBOARD</text>
            <text x="480" y="488" textAnchor="end">
              MADE IN LAB
            </text>
          </g>

          {/* Mounting holes */}
          {[
            [30, 30], [470, 30], [30, 470], [470, 470],
          ].map(([cx, cy]) => (
            <g key={`${cx}-${cy}`}>
              <circle cx={cx} cy={cy} r="7" fill="oklch(0.08 0 0)" />
              <circle
                cx={cx}
                cy={cy}
                r="7"
                fill="none"
                stroke={NEON}
                strokeOpacity="0.45"
                strokeWidth="1"
              />
              <circle cx={cx} cy={cy} r="3" fill="oklch(0.05 0 0)" />
            </g>
          ))}

          {/* Ground plane fills (decorative copper pours) */}
          <g fill={NEON} fillOpacity="0.03">
            <rect x="60" y="130" width="60" height="80" rx="2" />
            <rect x="380" y="130" width="60" height="80" rx="2" />
            <rect x="60" y="300" width="60" height="80" rx="2" />
            <rect x="380" y="300" width="60" height="80" rx="2" />
          </g>

          {/* Decorative passive components: resistors + caps around the board */}
          <g>
            {[
              { x: 160, y: 130, r: 0 },
              { x: 340, y: 130, r: 0 },
              { x: 160, y: 372, r: 0 },
              { x: 340, y: 372, r: 0 },
              { x: 130, y: 250, r: 90 },
              { x: 370, y: 250, r: 90 },
            ].map((p, i) => (
              <g key={`res-${i}`} transform={`rotate(${p.r} ${p.x} ${p.y})`}>
                <rect
                  x={p.x - 10}
                  y={p.y - 3}
                  width="20"
                  height="6"
                  fill="oklch(0.22 0.03 65)"
                  stroke={NEON}
                  strokeOpacity="0.3"
                  strokeWidth="0.4"
                />
                <line x1={p.x - 14} y1={p.y} x2={p.x - 10} y2={p.y} stroke={NEON} strokeOpacity="0.5" strokeWidth="0.8" />
                <line x1={p.x + 10} y1={p.y} x2={p.x + 14} y2={p.y} stroke={NEON} strokeOpacity="0.5" strokeWidth="0.8" />
              </g>
            ))}
            {/* Electrolytic caps */}
            {[
              { x: 105, y: 250 }, { x: 395, y: 250 },
            ].map((p, i) => (
              <g key={`cap-${i}`}>
                <circle cx={p.x} cy={p.y} r="10" fill="oklch(0.20 0.03 260)" stroke={NEON} strokeOpacity="0.5" strokeWidth="0.6" />
                <path d={`M ${p.x - 6} ${p.y} A 6 6 0 0 1 ${p.x + 6} ${p.y}`} fill="none" stroke={NEON} strokeOpacity="0.6" strokeWidth="0.5" />
                <text x={p.x} y={p.y + 2} fontSize="5" fill={NEON} fillOpacity="0.7" textAnchor="middle" fontFamily="var(--font-mono)">+</text>
              </g>
            ))}
            {/* Crystal oscillator */}
            <g>
              <rect x="315" y="185" width="30" height="14" rx="3" fill="oklch(0.28 0.02 180)" stroke={NEON} strokeOpacity="0.55" strokeWidth="0.6" />
              <text x="330" y="195" fontSize="5" fill={NEON} fillOpacity="0.75" textAnchor="middle" fontFamily="var(--font-mono)">8MHz</text>
            </g>
          </g>

          {/* Copper traces (base layer) */}
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            {CHIPS.map((c) => (
              <polyline
                key={`base-${c.id}`}
                points={c.trace}
                stroke={NEON}
                strokeOpacity="0.22"
                strokeWidth="2.4"
              />
            ))}
          </g>

          {/* Vias along traces */}
          <g>
            {CHIPS.map((c) => {
              const pts = c.trace.split(" ").map((p) => p.split(",").map(Number));
              return pts.slice(1, -1).map(([x, y], i) => (
                <circle
                  key={`via-${c.id}-${i}`}
                  cx={x}
                  cy={y}
                  r="2.4"
                  fill="oklch(0.10 0 0)"
                  stroke={NEON}
                  strokeOpacity="0.6"
                  strokeWidth="0.8"
                />
              ));
            })}
          </g>

          {/* Animated signal traces (hover/selected) */}
          <g fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#trace-glow)">
            {CHIPS.map((c) => {
              const active = hover === c.id || selected === c.id;
              return (
                <polyline
                  key={`live-${c.id}`}
                  points={c.trace}
                  stroke={NEON}
                  strokeWidth="2"
                  strokeOpacity={active ? 1 : 0}
                  strokeDasharray="6 10"
                  style={{
                    transition: "stroke-opacity 250ms ease",
                    animation: active
                      ? "pcb-signal 1.1s linear infinite"
                      : undefined,
                  }}
                />
              );
            })}
          </g>

          {/* STM32 central MCU */}
          <g
            onMouseEnter={() => setHover("STM32")}
            onMouseLeave={() => setHover(null)}
            onClick={() =>
              setSelected((s) => (s === "STM32" ? null : "STM32"))
            }
            className="cursor-pointer"
          >
            {/* Pins */}
            {Array.from({ length: 14 }).map((_, i) => {
              const step = 6.5;
              const start = 209 + i * step;
              return (
                <g key={`pin-${i}`}>
                  <rect x={start} y="195" width="4" height="6" fill={NEON} fillOpacity="0.55" />
                  <rect x={start} y="299" width="4" height="6" fill={NEON} fillOpacity="0.55" />
                  <rect x="195" y={start} width="6" height="4" fill={NEON} fillOpacity="0.55" />
                  <rect x="299" y={start} width="6" height="4" fill={NEON} fillOpacity="0.55" />
                </g>
              );
            })}
            <rect
              x="200"
              y="200"
              width="100"
              height="100"
              rx="4"
              fill="url(#mcu-body)"
              stroke={NEON}
              strokeOpacity={hover === "STM32" || selected === "STM32" ? 0.95 : 0.55}
              strokeWidth="1.2"
              style={{ transition: "stroke-opacity 200ms" }}
            />
            {/* pin-1 dot */}
            <circle cx="208" cy="208" r="2" fill={NEON} fillOpacity="0.8" />
            <text x="250" y="245" textAnchor="middle" fontSize="11" fill={NEON} fillOpacity="0.9" fontFamily="var(--font-display)" letterSpacing="1.5">
              STM32
            </text>
            <text x="250" y="260" textAnchor="middle" fontSize="7" fill={NEON} fillOpacity="0.65" fontFamily="var(--font-mono)" letterSpacing="1.5">
              F407VGT6
            </text>
            <text x="250" y="278" textAnchor="middle" fontSize="6" fill={NEON} fillOpacity="0.5" fontFamily="var(--font-mono)" letterSpacing="2">
              CORTEX-M4
            </text>
          </g>

          {/* Peripheral chips */}
          {CHIPS.map((c) => {
            const active = hover === c.id || selected === c.id;
            return (
              <g
                key={c.id}
                onMouseEnter={() => setHover(c.id)}
                onMouseLeave={() => setHover(null)}
                onClick={() =>
                  setSelected((s) => (s === c.id ? null : c.id))
                }
                className="cursor-pointer"
              >
                {/* pins on the side facing the MCU */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const spacing = c.w / 7;
                  // Determine which side faces MCU (roughly)
                  const centerX = 250, centerY = 250;
                  const cxc = c.x + c.w / 2;
                  const cyc = c.y + c.h / 2;
                  const dx = centerX - cxc;
                  const dy = centerY - cyc;
                  if (Math.abs(dy) > Math.abs(dx)) {
                    const py = dy > 0 ? c.y + c.h : c.y - 5;
                    return (
                      <rect
                        key={i}
                        x={c.x + spacing * (i + 1) - 2}
                        y={py}
                        width="4"
                        height="5"
                        fill={NEON}
                        fillOpacity="0.5"
                      />
                    );
                  }
                  const px = dx > 0 ? c.x + c.w : c.x - 5;
                  const spacingY = c.h / 7;
                  return (
                    <rect
                      key={i}
                      x={px}
                      y={c.y + spacingY * (i + 1) - 2}
                      width="5"
                      height="4"
                      fill={NEON}
                      fillOpacity="0.5"
                    />
                  );
                })}
                <rect
                  x={c.x}
                  y={c.y}
                  width={c.w}
                  height={c.h}
                  rx="3"
                  fill="url(#chip-body)"
                  stroke={NEON}
                  strokeOpacity={active ? 0.95 : 0.5}
                  strokeWidth="1"
                  style={{ transition: "stroke-opacity 200ms" }}
                />
                <circle
                  cx={c.x + 6}
                  cy={c.y + 6}
                  r="1.6"
                  fill={NEON}
                  fillOpacity="0.75"
                />
                <text
                  x={c.x + c.w / 2}
                  y={c.y + c.h / 2 - 1}
                  textAnchor="middle"
                  fontSize="12"
                  fill={NEON}
                  fillOpacity="0.95"
                  fontFamily="var(--font-display)"
                  letterSpacing="1.5"
                >
                  {c.label}
                </text>
                <text
                  x={c.x + c.w / 2}
                  y={c.y + c.h / 2 + 12}
                  textAnchor="middle"
                  fontSize="6"
                  fill={NEON}
                  fillOpacity="0.55"
                  fontFamily="var(--font-mono)"
                  letterSpacing="1.5"
                >
                  {c.sub}
                </text>
                {active && (
                  <rect
                    x={c.x - 2}
                    y={c.y - 2}
                    width={c.w + 4}
                    height={c.h + 4}
                    rx="4"
                    fill="none"
                    stroke={NEON}
                    strokeOpacity="0.35"
                    strokeWidth="0.8"
                    strokeDasharray="3 3"
                  />
                )}
              </g>
            );
          })}

          {/* Corner brackets */}
          <g stroke={NEON} strokeOpacity="0.7" strokeWidth="1.2" fill="none">
            <path d="M 14 40 L 14 14 L 40 14" />
            <path d="M 486 40 L 486 14 L 460 14" />
            <path d="M 14 460 L 14 486 L 40 486" />
            <path d="M 486 460 L 486 486 L 460 486" />
          </g>
        </svg>

        <style>{`
          @keyframes pcb-signal {
            to { stroke-dashoffset: -32; }
          }
        `}</style>
      </div>

      {/* Readout panel */}
      <div className="w-full max-w-[500px] min-h-[130px] border border-border bg-card/40 corners relative p-4">
        <AnimatePresence mode="wait">
          {selectedChip ? (
            <motion.div
              key={selectedChip.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[9px] tracking-[0.3em] text-neon">
                    // CLICK ON THE PROJECT FOR MORE DETAILS
                  </div>
                  <div className="font-display text-lg text-foreground tracking-widest mt-0.5">
                    {selectedChip.label}
                    <span className="text-neon/60 text-xs ml-2">
                      {selectedChip.sub}
                    </span>
                  </div>
                </div>
                <button
                  className="text-[9px] tracking-[0.25em] text-muted-foreground hover:text-neon"
                  onClick={() => setSelected(null)}
                >
                  [ CLEAR ]
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedChip.projects.length ? (
                  selectedChip.projects.map((p) =>
                    p.slug ? (
                      <Link
                        key={p.id}
                        to="/projects/$slug"
                        params={{ slug: p.slug }}
                        className="text-[10px] uppercase tracking-[0.2em] border border-neon/40 text-neon px-2 py-1 hover:bg-neon/10 transition-colors"
                      >
                        {p.id} · {p.title}
                      </Link>
                    ) : (
                      <span
                        key={p.id}
                        className="text-[10px] uppercase tracking-[0.2em] border border-neon/40 text-neon px-2 py-1"
                      >
                        {p.title}
                      </span>
                    )
                  )
                ) : (

                  <span className="text-xs text-muted-foreground">
                    No linked projects yet.
                  </span>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-between h-full"
            >
              <div>
                <div className="text-[9px] tracking-[0.3em] text-neon">
                  // BUS IDLE
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Hover a module to trace signal · click to lock and reveal linked projects.
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-neon anim-pulse-neon" />
                <span className="text-[9px] tracking-[0.25em] text-muted-foreground">
                  3V3
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
