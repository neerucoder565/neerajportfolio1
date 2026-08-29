import { useCallback, useEffect, useRef, useState } from "react";

type Comp = {
  id: string;
  ref: string;
  title: string;
  desc: string;
  color: string;
};

const COMPONENTS: Comp[] = [
  {
    id: "R1",
    ref: "R1",
    title: "Arduino-Based Development",
    desc: "End-to-end Arduino projects with sensors, actuators and control loops.",
    color: "#22e3ff",
  },
  {
    id: "R2",
    ref: "R2",
    title: "Electronics Hardware Development",
    desc: "Schematic design, breadboard layout and component selection.",
    color: "#ff4fd8",
  },
  {
    id: "R3",
    ref: "R3",
    title: "Circuit Simulation & Testing",
    desc: "Validate behavior in simulation before committing to hardware.",
    color: "#ffab2e",
  },
  {
    id: "R4",
    ref: "R4",
    title: "Engineering Research & Implementation",
    desc: "Translate concepts and papers into working hardware demos.",
    color: "#8dff4a",
  },
  {
    id: "G",
    ref: "G",
    title: "Hardware Debugging & Optimization",
    desc: "Diagnose noisy signals, timing issues and component-level faults.",
    color: "#a97bff",
  },
  {
    id: "VS",
    ref: "VS",
    title: "Embedded Systems Prototyping",
    desc: "From idea to working firmware on Arduino and embedded MCUs.",
    color: "#ff5f6d",
  },
];

/* Diamond geometry (viewBox 0 0 720 520) */
const TOP = { x: 360, y: 70 };
const RIGHT = { x: 610, y: 240 };
const BOTTOM = { x: 360, y: 410 };
const LEFT = { x: 110, y: 240 };

/** Build a path along a segment with a zigzag resistor body in the middle. */
function resistorPath(
  a: { x: number; y: number },
  b: { x: number; y: number },
) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const nx = -uy;
  const ny = ux;
  const bodyLen = 84;
  const start = {
    x: a.x + ux * (len / 2 - bodyLen / 2),
    y: a.y + uy * (len / 2 - bodyLen / 2),
  };
  const amp = 11;
  const zig = 6;
  const step = bodyLen / zig;
  let d = `M ${a.x} ${a.y} L ${start.x} ${start.y}`;
  for (let i = 1; i <= zig; i++) {
    const px = start.x + ux * step * i;
    const py = start.y + uy * step * i;
    const off = i === zig ? 0 : i % 2 === 1 ? amp : -amp;
    d += ` L ${px + nx * off} ${py + ny * off}`;
  }
  d += ` L ${b.x} ${b.y}`;
  return d;
}

const ARMS: Record<string, string> = {
  R1: resistorPath(LEFT, TOP),
  R2: resistorPath(TOP, RIGHT),
  R3: resistorPath(LEFT, BOTTOM),
  R4: resistorPath(BOTTOM, RIGHT),
};

const LABEL_POS: Record<string, { x: number; y: number }> = {
  R1: { x: 190, y: 128 },
  R2: { x: 532, y: 128 },
  R3: { x: 190, y: 356 },
  R4: { x: 532, y: 356 },
};

const G_PATH = `M ${TOP.x} ${TOP.y} L ${TOP.x} 208 M ${BOTTOM.x} ${BOTTOM.y} L ${BOTTOM.x} 272`;

/* Source loop: left corner -> down -> battery -> up -> right corner */
const SOURCE_PATH = `M ${LEFT.x} ${LEFT.y} L ${LEFT.x} 478 L 320 478 M 400 478 L ${RIGHT.x} 478 L ${RIGHT.x} ${RIGHT.y}`;

/* Ambient loop around the whole diamond */
const LOOP_PATH = `M ${LEFT.x} ${LEFT.y} L ${TOP.x} ${TOP.y} L ${RIGHT.x} ${RIGHT.y} L ${BOTTOM.x} ${BOTTOM.y} Z`;

const PATHS: Record<string, string> = {
  ...ARMS,
  G: G_PATH,
  VS: SOURCE_PATH,
};

const DRAW_ORDER: Record<string, number> = {
  R1: 0,
  R2: 1,
  R4: 2,
  R3: 3,
  VS: 4,
  G: 5,
};

export function WheatstoneBridge() {
  const [active, setActive] = useState<string | null>(null);
  const [draining, setDraining] = useState<string | null>(null);
  const [readoutKey, setReadoutKey] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const drainTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggle = useCallback((id: string) => {
    setActive((cur) => {
      if (cur === id) {
        setDraining(id);
        if (drainTimer.current) clearTimeout(drainTimer.current);
        drainTimer.current = setTimeout(() => setDraining(null), 520);
        return null;
      }
      return id;
    });
    setReadoutKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && active) toggle(active);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, toggle]);

  useEffect(
    () => () => {
      if (drainTimer.current) clearTimeout(drainTimer.current);
    },
    [],
  );

  const sel = COMPONENTS.find((c) => c.id === active) ?? null;
  const on = (id: string) => active === id;

  const partProps = (c: Comp) => ({
    role: "button" as const,
    tabIndex: 0,
    "aria-pressed": on(c.id),
    "aria-label": `${c.ref}: ${c.title}`,
    className: [
      "wb-part",
      active && active !== c.id ? "wb-dim" : "",
      on(c.id) ? "wb-on" : "",
      draining === c.id ? "wb-drain" : "",
    ]
      .filter(Boolean)
      .join(" "),
    style: {
      ["--c" as string]: c.color,
      ["--draw-delay" as string]: `${0.18 + DRAW_ORDER[c.id] * 0.24}s`,
    } as React.CSSProperties,
    onClick: () => toggle(c.id),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle(c.id);
      }
    },
  });

  return (
    <div
      ref={rootRef}
      className="wb-root"
      style={
        { ["--active-c" as string]: sel?.color ?? "#7b8aa8" } as React.CSSProperties
      }
    >
      <div className="wb-diagram wb-chamfer relative border border-border p-4 md:p-8">
        <span className="wb-blob wb-blob-a" aria-hidden />
        <span className="wb-blob wb-blob-b" aria-hidden />
        <svg
          viewBox="0 0 720 520"
          className="relative w-full h-auto"
          role="img"
          aria-label="Interactive Wheatstone bridge diagram"
        >
          {/* ambient drift current around the loop */}
          <path d={LOOP_PATH} className="wb-ambient" pathLength={1} />

          {/* resistor arms */}
          {COMPONENTS.filter((c) => c.id.startsWith("R")).map((c) => (
            <g key={c.id} {...partProps(c)}>
              <path d={ARMS[c.id]} className="wb-hit" />
              <path d={ARMS[c.id]} className="wb-trace" pathLength={1} />
              {(on(c.id) || draining === c.id) && (
                <path d={ARMS[c.id]} className="wb-flow" />
              )}
              <rect
                x={LABEL_POS[c.id].x - 26}
                y={LABEL_POS[c.id].y - 18}
                width={52}
                height={26}
                className="wb-chip"
              />
              <text
                x={LABEL_POS[c.id].x}
                y={LABEL_POS[c.id].y}
                textAnchor="middle"
                className="wb-label"
              >
                {c.ref}
              </text>
            </g>
          ))}

          {/* corner nodes */}
          {[TOP, RIGHT, BOTTOM, LEFT].map((n, i) => (
            <circle
              key={i}
              cx={n.x}
              cy={n.y}
              r={6}
              className="wb-node"
              style={{ animationDelay: `${0.5 + i * 0.18}s` }}
            />
          ))}

          {/* galvanometer branch: top corner -> center -> bottom corner */}
          <g {...partProps(COMPONENTS[4])}>
            <path d={G_PATH} className="wb-hit" />
            <path d={G_PATH} className="wb-trace" pathLength={1} />
            {(on("G") || draining === "G") && (
              <path d={G_PATH} className="wb-flow" />
            )}
            <g className="wb-symbol">
              <circle cx={360} cy={240} r={32} className="wb-meter" />
              <path d="M 347 231 L 360 216 L 373 231" className="wb-needle" />
              <text
                x={360}
                y={256}
                textAnchor="middle"
                className="wb-label wb-label-lg"
              >
                G
              </text>
            </g>
          </g>

          {/* voltage source */}
          <g {...partProps(COMPONENTS[5])}>
            <path d={SOURCE_PATH} className="wb-hit" />
            <path d={SOURCE_PATH} className="wb-trace" pathLength={1} />
            {(on("VS") || draining === "VS") && (
              <path d={SOURCE_PATH} className="wb-flow" />
            )}
            <g className="wb-symbol">
              <line x1={332} y1={458} x2={332} y2={498} className="wb-batt-long" />
              <line x1={348} y1={468} x2={348} y2={488} className="wb-batt-short" />
              <line x1={364} y1={458} x2={364} y2={498} className="wb-batt-long" />
              <line x1={380} y1={468} x2={380} y2={488} className="wb-batt-short" />
              <text x={356} y={442} textAnchor="middle" className="wb-label">
                VS
              </text>
            </g>
          </g>

          {/* traveling charge pulse into the active component */}
          {active && (
            <circle r={5} className="wb-spark">
              <animateMotion
                dur="0.9s"
                repeatCount="indefinite"
                path={PATHS[active]}
              />
            </circle>
          )}
        </svg>
      </div>

      {/* readout */}
      <div className="mt-6 wb-chamfer wb-readout relative border border-border p-5 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="wb-led" aria-hidden />
          <span className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">
            READOUT // {sel ? "SIGNAL DETECTED" : "NULL"}
          </span>
        </div>
        <div key={readoutKey} className="wb-readout-in">
          {sel ? (
            <>
              <div
                className="font-display text-xs tracking-[0.35em] mb-2"
                style={{ color: sel.color }}
              >
                [{sel.ref}]
              </div>
              <h3 className="font-display text-xl md:text-2xl uppercase mb-2">
                {sel.title}
              </h3>
              <p className="wb-body text-muted-foreground max-w-2xl">{sel.desc}</p>
            </>
          ) : (
            <>
              <div className="font-display text-xl md:text-2xl uppercase text-neon">
                SELECT A COMPONENT
              </div>
              <p className="wb-body text-muted-foreground mt-2">BRIDGE BALANCED</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
