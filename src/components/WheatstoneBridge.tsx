import { useCallback, useEffect, useRef, useState } from "react";

type Comp = {
  id: string;
  ref: string;
  title: string;
  desc: string;
};

const COMPONENTS: Comp[] = [
  {
    id: "R1",
    ref: "R1",
    title: "Arduino-Based Development",
    desc: "End-to-end Arduino projects with sensors, actuators and control loops.",
  },
  {
    id: "R2",
    ref: "R2",
    title: "Electronics Hardware Development",
    desc: "Schematic design, breadboard layout and component selection.",
  },
  {
    id: "R3",
    ref: "R3",
    title: "Circuit Simulation & Testing",
    desc: "Validate behavior in simulation before committing to hardware.",
  },
  {
    id: "R4",
    ref: "R4",
    title: "Engineering Research & Implementation",
    desc: "Translate concepts and papers into working hardware demos.",
  },
  {
    id: "G",
    ref: "G",
    title: "Hardware Debugging & Optimization",
    desc: "Diagnose noisy signals, timing issues and component-level faults.",
  },
  {
    id: "VS",
    ref: "VS",
    title: "Embedded Systems Prototyping",
    desc: "From idea to working firmware on Arduino and embedded MCUs.",
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
  const start = { x: a.x + ux * (len / 2 - bodyLen / 2), y: a.y + uy * (len / 2 - bodyLen / 2) };
  const amp = 11;
  const zig = 6;
  const step = bodyLen / zig;
  let d = `M ${a.x} ${a.y} L ${start.x} ${start.y}`;
  for (let i = 1; i <= zig; i++) {
    const px = start.x + ux * step * i;
    const py = start.y + uy * step * i;
    const off = i === zig ? 0 : (i % 2 === 1 ? amp : -amp);
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

/* Source loop: left corner -> down -> battery -> up -> right corner */
const SOURCE_PATH = `M ${LEFT.x} ${LEFT.y} L ${LEFT.x} 478 L 320 478 M 400 478 L ${RIGHT.x} 478 L ${RIGHT.x} ${RIGHT.y}`;

export function WheatstoneBridge() {
  const [active, setActive] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback((id: string) => {
    setActive((cur) => (cur === id ? null : id));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const sel = COMPONENTS.find((c) => c.id === active) ?? null;
  const dim = (id: string) => (active && active !== id ? "wb-dim" : "");
  const on = (id: string) => active === id;

  const partProps = (c: Comp) => ({
    role: "button" as const,
    tabIndex: 0,
    "aria-pressed": on(c.id),
    "aria-label": `${c.ref}: ${c.title}`,
    className: `wb-part ${dim(c.id)} ${on(c.id) ? "wb-on" : ""}`,
    onClick: () => toggle(c.id),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle(c.id);
      }
    },
  });

  return (
    <div ref={rootRef} className="wb-root">
      <div className="wb-diagram corners relative border border-border bg-card/30 p-4 md:p-8">
        <svg
          viewBox="0 0 720 520"
          className="w-full h-auto"
          role="img"
          aria-label="Interactive Wheatstone bridge diagram"
        >
          {/* nodes */}
          {[TOP, RIGHT, BOTTOM, LEFT].map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r={6} className="wb-node" />
          ))}

          {/* resistor arms */}
          {COMPONENTS.filter((c) => c.id.startsWith("R")).map((c) => (
            <g key={c.id} {...partProps(c)}>
              <path d={ARMS[c.id]} className="wb-hit" />
              <path d={ARMS[c.id]} className="wb-trace" />
              {on(c.id) && <path d={ARMS[c.id]} className="wb-flow" />}
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

          {/* galvanometer branch: top corner -> center -> bottom corner */}
          <g {...partProps(COMPONENTS[4])}>
            <path
              d={`M ${TOP.x} ${TOP.y} L ${TOP.x} 208 M ${BOTTOM.x} ${BOTTOM.y} L ${BOTTOM.x} 272`}
              className="wb-hit"
            />
            <path
              d={`M ${TOP.x} ${TOP.y} L ${TOP.x} 208 M ${BOTTOM.x} ${BOTTOM.y} L ${BOTTOM.x} 272`}
              className="wb-trace wb-trace-signal"
            />
            {on("G") && (
              <path
                d={`M ${TOP.x} ${TOP.y} L ${TOP.x} 208 M ${BOTTOM.x} ${BOTTOM.y} L ${BOTTOM.x} 272`}
                className="wb-flow"
              />
            )}
            <circle cx={360} cy={240} r={32} className="wb-meter" />
            <path d="M 347 231 L 360 216 L 373 231" className="wb-needle" />
            <text x={360} y={256} textAnchor="middle" className="wb-label wb-label-lg">
              G
            </text>
          </g>

          {/* voltage source */}
          <g {...partProps(COMPONENTS[5])}>
            <path d={SOURCE_PATH} className="wb-hit" />
            <path d={SOURCE_PATH} className="wb-trace" />
            {on("VS") && <path d={SOURCE_PATH} className="wb-flow" />}
            {/* battery symbol */}
            <line x1={332} y1={458} x2={332} y2={498} className="wb-batt-long" />
            <line x1={348} y1={468} x2={348} y2={488} className="wb-batt-short" />
            <line x1={364} y1={458} x2={364} y2={498} className="wb-batt-long" />
            <line x1={380} y1={468} x2={380} y2={488} className="wb-batt-short" />
            <text x={356} y={442} textAnchor="middle" className="wb-label">
              VS
            </text>
          </g>
        </svg>
      </div>

      {/* readout */}
      <div className="mt-6 corners relative border border-border bg-card/40 p-5 md:p-6 term-recess">
        <div className="flex items-center gap-3 mb-4">
          <span className="wb-led" aria-hidden />
          <span className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">
            READOUT // {sel ? "SIGNAL DETECTED" : "NULL"}
          </span>
        </div>
        {sel ? (
          <div key={sel.id} className="wb-readout-in">
            <div className="font-display text-neon text-xs tracking-[0.35em] mb-2">
              [{sel.ref}]
            </div>
            <h3 className="font-display text-xl md:text-2xl uppercase mb-2">{sel.title}</h3>
            <p className="wb-body text-muted-foreground max-w-2xl">{sel.desc}</p>
          </div>
        ) : (
          <div>
            <div className="font-display text-xl md:text-2xl uppercase text-neon">
              SELECT A COMPONENT
            </div>
            <p className="wb-body text-muted-foreground mt-2">BRIDGE BALANCED</p>
          </div>
        )}
      </div>
    </div>
  );
}
