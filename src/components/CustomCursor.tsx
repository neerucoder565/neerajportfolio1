import { useEffect, useRef, useState } from "react";

const RING_IDLE =
  "conic-gradient(from 0deg, #a78bfa, #22d3ee 30%, #f472b6 55%, #8b5cf6 80%, #a78bfa)";
const RING_HOVER =
  "conic-gradient(from 0deg, #22d3ee, #a5f3fc 35%, #a78bfa 60%, #22d3ee)";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const display = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    // Disable custom cursor on touch-first devices to avoid duplicates with native tap feedback.
    if (typeof window !== "undefined" && "ontouchstart" in window) {
      return;
    }
    setEnabled(true);

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest(
        "a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]"
      );
      setHovering(Boolean(clickable));
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mouseenter", enter);
    window.addEventListener("mouseover", over, { passive: true });

    let active = true;
    const loop = () => {
      if (!active) return;
      // Higher lerp factor makes the cursor follow the real pointer faster.
      display.current.x += (pos.current.x - display.current.x) * 0.75;
      display.current.y += (pos.current.y - display.current.y) * 0.75;
      const el = document.getElementById("custom-cursor");
      if (el) {
        el.style.transform = `translate3d(${display.current.x}px, ${display.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      active = false;
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mouseenter", enter);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      id="custom-cursor"
      className={`pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-screen transition-[width,height,opacity] duration-200 ease-out ${
        hovering ? "size-12" : "size-8"
      } ${visible ? "opacity-100" : "opacity-0"}`}
      style={{ willChange: "transform" }}
      aria-hidden="true"
    >
      {/* wide multi-colour aura breathing around the ring */}
      <div
        className="absolute -inset-4 rounded-full animate-pulse"
        style={{
          background: hovering
            ? "radial-gradient(circle, rgba(34,211,238,0.55) 0%, rgba(167,139,250,0.4) 40%, rgba(244,114,182,0.28) 68%, transparent 80%)"
            : "radial-gradient(circle, rgba(167,139,250,0.55) 0%, rgba(34,211,238,0.35) 42%, rgba(236,72,153,0.25) 68%, transparent 80%)",
          filter: "blur(9px)",
          animationDuration: "2.6s",
        }}
      />

      {/* rotating violet → cyan → pink gradient ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: hovering ? RING_HOVER : RING_IDLE,
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 4.5px), #000 calc(100% - 3px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 4.5px), #000 calc(100% - 3px))",
          animation: "spin 4s linear infinite",
          filter: hovering
            ? "drop-shadow(0 0 10px rgba(34,211,238,0.9))"
            : "drop-shadow(0 0 8px rgba(167,139,250,0.8))",
          transition: "filter 200ms ease-out",
        }}
      />

      {/* bright core */}
      <div
        className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "#ffffff",
          boxShadow:
            "0 0 8px 2px rgba(255,255,255,0.95), 0 0 18px 6px rgba(34,211,238,0.55), 0 0 30px 12px rgba(167,139,250,0.4)",
        }}
      />
    </div>
  );
}
