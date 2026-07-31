/**
 * Site-wide animated electronics backdrop.
 * Fixed, non-interactive, sits behind all content.
 */

const TRACES = [
  "M -40 120 H 220 L 300 200 H 520 L 580 140 H 860",
  "M -40 420 H 160 L 240 340 H 430 L 500 400 H 760 L 820 340 H 1100",
  "M 1480 90 H 1240 L 1160 170 H 980 L 920 110 H 700",
  "M 1480 560 H 1300 L 1220 640 H 1000 L 940 580 H 640 L 560 660 H 300",
  "M 120 -40 V 180 L 200 260 V 520 L 140 580 V 820",
  "M 1340 -40 V 220 L 1260 300 V 540 L 1330 610 V 840",
  "M 740 -40 V 60 L 660 140 V 300",
  "M 420 840 V 700 L 500 620 V 480",
];

const PADS = [
  [220, 120], [300, 200], [520, 200], [580, 140],
  [160, 420], [240, 340], [430, 340], [500, 400], [760, 400], [820, 340],
  [1240, 90], [1160, 170], [980, 170], [920, 110],
  [1300, 560], [1220, 640], [1000, 640], [940, 580], [640, 580], [560, 660],
  [200, 260], [140, 580], [1260, 300], [1330, 610], [660, 140], [500, 620],
] as const;

/** Small IC / passive component glyphs scattered in the empty margins. */
const CHIPS = [
  { x: 250, y: 168, w: 54, h: 34, pins: 4 },
  { x: 795, y: 366, w: 62, h: 38, pins: 5 },
  { x: 1180, y: 138, w: 50, h: 32, pins: 4 },
  { x: 585, y: 610, w: 66, h: 40, pins: 5 },
  { x: 105, y: 545, w: 48, h: 30, pins: 4 },
  { x: 1290, y: 268, w: 56, h: 34, pins: 4 },
];

export function CircuitBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-100"
    >
      <svg
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="cb-pulse" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--neon)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--neon)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--neon)" stopOpacity="0" />
          </linearGradient>
          <filter id="cb-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* static copper traces */}
        <g
          fill="none"
          stroke="var(--neon)"
          strokeOpacity="0.34"
          strokeWidth="1.25"
          strokeLinecap="square"
        >
          {TRACES.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>

        {/* traveling signal pulses along the same traces */}
        <g fill="none" strokeWidth="2" strokeLinecap="round" filter="url(#cb-glow)">
          {TRACES.map((d, i) => (
            <path
              key={i}
              d={d}
              stroke="var(--neon)"
              strokeOpacity="0.85"
              className="cb-flow"
              style={{
                strokeDasharray: "70 900",
                animationDuration: `${7 + (i % 4) * 2.5}s`,
                animationDelay: `${i * 1.15}s`,
              }}
            />
          ))}
        </g>

        {/* solder pads / vias */}
        <g>
          {PADS.map(([x, y], i) => (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r="4.5"
                fill="none"
                stroke="var(--neon)"
                strokeOpacity="0.5"
              />
              <circle
                cx={x}
                cy={y}
                r="1.8"
                fill="var(--neon)"
                className="cb-blink"
                style={{ animationDelay: `${(i % 9) * 0.7}s` }}
              />
            </g>
          ))}
        </g>

        {/* IC packages */}
        <g>
          {CHIPS.map((c, i) => (
            <g key={i} className="cb-breathe" style={{ animationDelay: `${i * 1.4}s` }}>
              <rect
                x={c.x}
                y={c.y}
                width={c.w}
                height={c.h}
                rx="3"
                fill="var(--neon)"
                fillOpacity="0.09"
                stroke="var(--neon)"
                strokeOpacity="0.45"
              />
              {Array.from({ length: c.pins }).map((_, p) => {
                const step = c.w / (c.pins + 1);
                const px = c.x + step * (p + 1);
                return (
                  <g key={p} stroke="var(--neon)" strokeOpacity="0.45">
                    <line x1={px} y1={c.y} x2={px} y2={c.y - 7} />
                    <line x1={px} y1={c.y + c.h} x2={px} y2={c.y + c.h + 7} />
                  </g>
                );
              })}
              <circle cx={c.x + 7} cy={c.y + 7} r="1.6" fill="var(--neon)" fillOpacity="0.5" />
            </g>
          ))}
        </g>

        {/* resistors */}
        <g stroke="var(--neon)" strokeOpacity="0.4" fill="none">
          {[
            [430, 340],
            [940, 580],
            [200, 260],
          ].map(([x, y], i) => (
            <g key={i} className="cb-breathe" style={{ animationDelay: `${1 + i}s` }}>
              <rect x={x - 16} y={y - 6} width="32" height="12" rx="2" fill="var(--neon)" fillOpacity="0.06" />
              <line x1={x - 8} y1={y - 6} x2={x - 8} y2={y + 6} />
              <line x1={x} y1={y - 6} x2={x} y2={y + 6} />
              <line x1={x + 8} y1={y - 6} x2={x + 8} y2={y + 6} />
            </g>
          ))}
        </g>

        {/* slow scanning sweep line */}
        <rect
          x="0"
          y="0"
          width="1440"
          height="2"
          fill="url(#cb-pulse)"
          opacity="0.6"
          className="cb-scan"
        />
      </svg>
    </div>
  );
}
