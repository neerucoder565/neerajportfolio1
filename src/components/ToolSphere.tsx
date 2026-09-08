import { useEffect, useRef, useState } from "react";

const TOOLS = [
  "STM32",
  "ESP32",
  "ARDUINO",
  "ALTIUM",
  "QNX",
  "FreeRTOS",
  "RISC-V",
  "EMBEDDED C",
  "PYTHON",
  "TANNER EDA",
  "AVR",
  "UART",
  "SPI / I2C",
  "PID",
  "R-2R DAC",
  "GIT",
  "VS CODE",
  "RASPBERRY PI",
];

type P = { x: number; y: number; z: number };

function fibonacciSphere(n: number): P[] {
  const pts: P[] = [];
  const off = 2 / n;
  const inc = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = i * off - 1 + off / 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * inc;
    pts.push({ x: Math.cos(phi) * r, y, z: Math.sin(phi) * r });
  }
  return pts;
}

export function ToolSphere({ height = 420 }: { height?: number }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const base = useRef<P[]>(fibonacciSphere(TOOLS.length));
  const rot = useRef({ x: -0.25, y: 0 });
  const speed = useRef({ x: -0.0012, y: 0.0035 });
  const hovering = useRef(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    let raf = 0;
    const el = wrapRef.current;
    if (!el) return;

    const render = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const R = Math.min(w, h) * 0.42;
      const cx = w / 2;
      const cy = h / 2;
      const { x: rx, y: ry } = rot.current;
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);

      base.current.forEach((p, i) => {
        const node = itemRefs.current[i];
        if (!node) return;
        // rotate around Y then X
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const persp = 1.9 / (1.9 - z2);
        const sx = cx + x1 * R * persp;
        const sy = cy + y2 * R * persp;
        const depth = (z2 + 1) / 2; // 0 back .. 1 front

        node.style.transform = `translate3d(${sx}px, ${sy}px, 0) translate(-50%, -50%) scale(${0.65 + depth * 0.6})`;
        node.style.opacity = String(0.18 + depth * 0.82);
        node.style.zIndex = String(Math.round(depth * 100));
        node.style.filter = `blur(${(1 - depth) * 1.4}px) drop-shadow(0 0 ${2 + depth * 12}px color-mix(in oklab, var(--neon-bright) ${depth * 70}%, transparent))`;
      });
    };

    const loop = () => {
      if (!reduced && !hovering.current) {
        rot.current.y += speed.current.y;
        rot.current.x += speed.current.x;
        if (rot.current.x < -0.45) speed.current.x = 0.0012;
        if (rot.current.x > 0.15) speed.current.x = -0.0012;
      }
      render();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <div
      ref={wrapRef}
      className="corners relative w-full overflow-hidden border border-border"
      style={{
        height,
        background:
          "radial-gradient(ellipse at 50% 45%, color-mix(in oklab, var(--neon) 14%, transparent), transparent 65%), linear-gradient(180deg, rgba(24,20,30,0.75), rgba(14,12,18,0.9))",
      }}
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
    >
      {/* faint orbit rings */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-40" aria-hidden>
        <defs>
          <radialGradient id="ts-core">
            <stop offset="0%" stopColor="var(--neon-bright)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--neon-bright)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50%" cy="50%" r="16%" fill="url(#ts-core)" />
        <circle cx="50%" cy="50%" r="34%" fill="none" stroke="color-mix(in oklab, var(--cyan) 30%, transparent)" strokeWidth="0.6" strokeDasharray="3 7" />
        <circle cx="50%" cy="50%" r="42%" fill="none" stroke="color-mix(in oklab, var(--neon) 30%, transparent)" strokeWidth="0.6" strokeDasharray="2 10" />
      </svg>

      <div className="absolute inset-0">
        {TOOLS.map((t, i) => (
          <span
            key={t}
            ref={(n) => {
              itemRefs.current[i] = n;
            }}
            className="absolute left-0 top-0 whitespace-nowrap border border-neon/30 bg-background/50 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-neon backdrop-blur-[1px] will-change-transform"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        // toolchain_orbit
      </div>
    </div>
  );
}
