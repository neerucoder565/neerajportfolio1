import { useEffect, useRef, useState } from "react";

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
      display.current.x += (pos.current.x - display.current.x) * 0.22;
      display.current.y += (pos.current.y - display.current.y) * 0.22;
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
      className={`pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border-2 border-neon mix-blend-screen transition-[width,height,box-shadow,border-color] duration-200 ease-out ${
        hovering ? "size-12 border-cyan" : "size-8"
      } ${visible ? "opacity-100" : "opacity-0"}`}
      style={{
        boxShadow: hovering
          ? "0 0 18px 4px oklch(0.82 0.13 200 / 0.55), inset 0 0 12px oklch(0.82 0.13 200 / 0.25)"
          : "0 0 14px 2px oklch(0.62 0.26 300 / 0.45), inset 0 0 10px oklch(0.62 0.26 300 / 0.2)",
        willChange: "transform",
      }}
      aria-hidden="true"
    />
  );
}
