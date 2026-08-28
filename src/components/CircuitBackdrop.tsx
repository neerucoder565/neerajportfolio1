const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  left: `${(i * 9.7 + 4) % 96}%`,
  top: `${60 + ((i * 13) % 45)}%`,
  duration: `${26 + (i % 5) * 7}s`,
  delay: `${-(i * 3.4).toFixed(1)}s`,
}));

export function CircuitBackdrop() {
  return (
    <div className="wbg" aria-hidden>
      <div className="wbg-grid" />
      <span className="wbg-blob wbg-blob-1" />
      <span className="wbg-blob wbg-blob-2" />
      <span className="wbg-blob wbg-blob-3" />
      <span className="wbg-blob wbg-blob-4" />

      <svg
        className="wbg-traces"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <path d="M 0 120 H 180 V 260 H 340" />
        <path d="M 1200 180 H 1010 V 320 H 880 V 430" />
        <path d="M 60 700 V 560 H 240 V 470" />
        <path d="M 1140 720 H 940 V 600" />
        <path d="M 420 800 V 690 H 620" />
        <circle cx="180" cy="260" r="3" />
        <circle cx="1010" cy="320" r="3" />
        <circle cx="240" cy="560" r="3" />
        <circle cx="940" cy="600" r="3" />
        <circle cx="620" cy="690" r="3" />
      </svg>

      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="wbg-particle"
          style={{
            left: p.left,
            top: p.top,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}

      <div className="wbg-vignette" />
      <div className="wbg-grain" />
    </div>
  );
}
