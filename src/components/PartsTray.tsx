import { Link } from "@tanstack/react-router";

type Part = {
  ref: string;
  name: string;
  spec: string;
  detail: string;
  project?: { slug: string; label: string };
  icon: React.ReactNode;
};

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PARTS: Part[] = [
  {
    ref: "R1",
    name: "Circuit Design & PCB Layout",
    spec: "TOL: ±5% · QTY: 12 BUILDS",
    detail: "Schematic capture, footprint work and multi-layer routing in Altium.",
    project: { slug: "r2r-dac", label: "4-Bit R-2R DAC" },
    icon: (
      <svg viewBox="0 0 64 32" className="w-16 h-8" {...{}}>
        <path {...S} d="M2 16h12" />
        <path {...S} d="M14 16l4-8 6 16 6-16 6 16 6-16 4 8" />
        <path {...S} d="M46 16h16" />
      </svg>
    ),
  },
  {
    ref: "U1",
    name: "Firmware & Embedded Development",
    spec: "PKG: LQFP-100 · REV: C",
    detail: "Bare-metal C on STM32 — startup code, linker scripts, peripheral drivers.",
    project: { slug: "bootloader", label: "Bare-Metal Bootloader" },
    icon: (
      <svg viewBox="0 0 64 32" className="w-16 h-8">
        <rect {...S} x="20" y="6" width="24" height="20" rx="1.5" />
        <circle {...S} cx="25" cy="11" r="1.6" />
        {[10, 16, 22].map((y) => (
          <g key={y}>
            <path {...S} d={`M20 ${y}h-8`} />
            <path {...S} d={`M44 ${y}h8`} />
          </g>
        ))}
      </svg>
    ),
  },
  {
    ref: "J1",
    name: "Hardware Debugging & Bring-up",
    spec: "PITCH: 2.54mm · 10-PIN",
    detail: "SWD/JTAG bring-up, logic-analyser capture and signal-level fault isolation.",
    project: { slug: "bootloader", label: "Bare-Metal Bootloader" },
    icon: (
      <svg viewBox="0 0 64 32" className="w-16 h-8">
        <rect {...S} x="12" y="12" width="40" height="12" rx="1" />
        {[18, 26, 34, 42].map((x) => (
          <path key={x} {...S} d={`M${x} 12V4`} />
        ))}
      </svg>
    ),
  },
  {
    ref: "C1",
    name: "Circuit Simulation & Testing",
    spec: "SPEC: 3.3V · VERIFIED",
    detail: "SPICE / Tanner EDA sweeps validated against bench scope measurements.",
    project: { slug: "r2r-dac", label: "4-Bit R-2R DAC" },
    icon: (
      <svg viewBox="0 0 64 32" className="w-16 h-8">
        <path {...S} d="M2 16h26" />
        <path {...S} d="M28 4v24" />
        <path {...S} d="M36 4v24" />
        <path {...S} d="M36 16h26" />
      </svg>
    ),
  },
  {
    ref: "Q1",
    name: "Arduino & MCU Development",
    spec: "hFE: 180 · QTY: 8 BUILDS",
    detail: "Sensor interfacing, PWM motor drive and closed-loop control on AVR/ARM.",
    project: { slug: "pid-control", label: "PID Motor Control" },
    icon: (
      <svg viewBox="0 0 64 32" className="w-16 h-8">
        <path {...S} d="M4 16h20" />
        <path {...S} d="M24 6v20" />
        <path {...S} d="M24 12l16-8" />
        <path {...S} d="M24 20l16 8" />
        <path {...S} d="M40 4v-2" />
        <path {...S} d="M40 28v2" />
      </svg>
    ),
  },
  {
    ref: "X1",
    name: "RTOS & Real-Time Systems",
    spec: "FREQ: 8.000 MHz · ±20ppm",
    detail: "FreeRTOS task scheduling, deterministic timing and ISR-safe design.",
    project: { slug: "rtos", label: "RTOS Traffic Controller" },
    icon: (
      <svg viewBox="0 0 64 32" className="w-16 h-8">
        <path {...S} d="M2 16h12" />
        <path {...S} d="M14 8v16" />
        <rect {...S} x="20" y="9" width="24" height="14" rx="1" />
        <path {...S} d="M50 8v16" />
        <path {...S} d="M50 16h12" />
      </svg>
    ),
  },
];

export function PartsTray() {
  return (
    <div className="tray-shell relative border border-border bg-card/50 p-2 sm:p-3">
      <div className="tray-noise pointer-events-none absolute inset-0" />
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3">
        {PARTS.map((p) => (
          <div
            key={p.ref}
            className="tray-cell group relative overflow-hidden px-5 pt-6 pb-5 min-h-[190px]"
          >
            <div className="tray-part text-neon mb-4">{p.icon}</div>
            <div className="font-display text-sm text-neon tracking-[0.2em]">{p.ref}</div>
            <div className="text-sm text-foreground mt-1 leading-snug">{p.name}</div>
            <div className="text-[11px] text-muted-foreground mt-2 tracking-wider">{p.spec}</div>

            <div className="tray-tab absolute inset-x-0 bottom-0 border-t border-border bg-card/95 px-5 py-3">
              <div className="text-[11px] text-muted-foreground leading-relaxed">{p.detail}</div>
              {p.project && (
                <Link
                  to="/projects/$slug"
                  params={{ slug: p.project.slug }}
                  className="mt-2 inline-block text-[11px] text-cyan"
                >
                  → View project
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PartsTray;
