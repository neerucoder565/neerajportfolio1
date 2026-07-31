import { useEffect, useRef } from "react";

/**
 * Site-wide ambient "engineering workstation" backdrop.
 * Layers (all subtle, non-interactive, fixed behind content):
 *  1. slow drifting CAD grid with mouse parallax
 *  2. pulsing grid intersections
 *  3. periodic scanner sweep
 *  4. mouse-following radial glow
 *  5. faint copper traces with traveling signal pulses
 */

const TRACES = [
  "M -40 120 H 220 L 300 200 H 520 L 580 140 H 860",
  "M -40 420 H 160 L 240 340 H 430 L 500 400 H 760 L 820 340 H 1100",
  "M 1480 90 H 1240 L 1160 170 H 980 L 920 110 H 700",
  "M 1480 560 H 1300 L 1220 640 H 1000 L 940 580 H 640 L 560 660 H 300",
  "M 120 -40 V 180 L 200 260 V 520 L 140 580 V 820",
  "M 1340 -40 V 220 L 1260 300 V 540 L 1330 610 V 840",
];

const PADS = [
  [220, 120], [300, 200], [520, 200], [580, 140],
  [160, 420], [240, 340], [430, 340], [500, 400], [760, 400], [820, 340],
  [1240, 90], [1160, 170], [980, 170], [920, 110],
  [1300, 560], [1220, 640], [1000, 640], [940, 580], [640, 580], [560, 660],
  [200, 260], [140, 580], [1260, 300], [1330, 610],
] as const;

/** Grid intersections that pulse gently, spread across the field. */
const NODES = [
  [168, 112], [392, 224], [616, 168], [840, 336], [1064, 112],
  [1288, 280], [280, 448], [504, 560], [728, 448], [952, 616],
  [1176, 504], [112, 672], [560, 728], [1008, 728], [1344, 672],
] as const;

export function CircuitBackdrop() {
  const root = useRef<HTMLDivElement>(null);

  // Mouse parallax + follow glow, written straight to CSS vars via rAF.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0.5;
    let ty = 0.5;
    let px = 0.5;
    let py = 0.5;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth;
      ty = e.clientY / window.innerHeight;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      px += (tx - px) * 0.08;
      py += (ty - py) * 0.08;
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
      el.style.setProperty("--par-x", `${(px - 0.5) * -18}px`);
      el.style.setProperty("--par-y", `${(py - 0.5) * -12}px`);
      raf =
        Math.abs(tx - px) > 0.001 || Math.abs(ty - py) > 0.001
          ? requestAnimationFrame(tick)
          : 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className="cb-root pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* 1. drifting CAD grid (parallax offset applied to the wrapper) */}
      <div className="cb-parallax absolute inset-0">
        <div className="cb-grid absolute -inset-[10%]" />
      </div>

      {/* 4. mouse-following ambient glow */}
      <div className="cb-cursor-glow absolute inset-0" />

      {/* 3. scanner sweep band */}
      <div className="cb-sweep absolute inset-x-0 h-40" />

      <svg
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <filter id="cb-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 5. copper traces */}
        <g
          fill="none"
          stroke="var(--neon)"
          strokeOpacity="0.22"
          strokeWidth="1.1"
          strokeLinecap="square"
        >
          {TRACES.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>

        {/* traveling signal pulses */}
        <g fill="none" strokeWidth="1.8" strokeLinecap="round" filter="url(#cb-glow)">
          {TRACES.map((d, i) => (
            <path
              key={i}
              d={d}
              stroke="var(--neon)"
              strokeOpacity="0.7"
              className="cb-flow"
              style={{
                strokeDasharray: "70 900",
                animationDuration: `${9 + (i % 4) * 3}s`,
                animationDelay: `${i * 1.6}s`,
              }}
            />
          ))}
        </g>

        {/* vias */}
        <g>
          {PADS.map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="4" fill="none" stroke="var(--neon)" strokeOpacity="0.32" />
              <circle
                cx={x}
                cy={y}
                r="1.6"
                fill="var(--neon)"
                className="cb-blink"
                style={{ animationDelay: `${(i % 9) * 0.8}s` }}
              />
            </g>
          ))}
        </g>

        {/* 2. pulsing grid intersections */}
        <g stroke="var(--neon)" strokeWidth="1" filter="url(#cb-glow)">
          {NODES.map(([x, y], i) => (
            <g
              key={i}
              className="cb-node"
              style={{ animationDelay: `${(i * 1.3) % 9}s`, animationDuration: `${7 + (i % 5)}s` }}
            >
              <line x1={x - 5} y1={y} x2={x + 5} y2={y} />
              <line x1={x} y1={y - 5} x2={x} y2={y + 5} />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
