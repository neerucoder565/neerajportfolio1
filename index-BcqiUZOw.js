import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Download, Cpu, CircuitBoard, Zap } from "lucide-react";
import { S as Section, P as Panel } from "./router-DVzYtrYH.js";
import "@tanstack/react-query";
import "react";
function HudCircle({ label = "SYS", size = 420 }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "relative",
      style: { width: size, height: size },
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxs(
          "svg",
          {
            viewBox: "0 0 200 200",
            className: "absolute inset-0 anim-spin-slow",
            children: [
              /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "arcGrad", x1: "0", y1: "0", x2: "1", y2: "1", children: [
                /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "var(--neon)", stopOpacity: "1" }),
                /* @__PURE__ */ jsx("stop", { offset: "60%", stopColor: "var(--neon)", stopOpacity: "0.4" }),
                /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "var(--neon)", stopOpacity: "0" })
              ] }) }),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M 100 6 A 94 94 0 0 1 188 70",
                  fill: "none",
                  stroke: "url(#arcGrad)",
                  strokeWidth: "6",
                  strokeLinecap: "round"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M 12 130 A 94 94 0 0 0 80 192",
                  fill: "none",
                  stroke: "url(#arcGrad)",
                  strokeWidth: "3",
                  strokeLinecap: "round",
                  opacity: "0.5"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx("svg", { viewBox: "0 0 200 200", className: "absolute inset-0 anim-spin-reverse", children: /* @__PURE__ */ jsx(
          "circle",
          {
            cx: "100",
            cy: "100",
            r: "88",
            fill: "none",
            stroke: "var(--neon)",
            strokeWidth: "0.6",
            strokeDasharray: "2 4",
            opacity: "0.55"
          }
        ) }),
        /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 200 200", className: "absolute inset-0 anim-spin-slow", children: [
          /* @__PURE__ */ jsx(
            "circle",
            {
              cx: "100",
              cy: "100",
              r: "70",
              fill: "none",
              stroke: "var(--neon)",
              strokeWidth: "0.4",
              opacity: "0.45"
            }
          ),
          Array.from({ length: 36 }).map((_, i) => /* @__PURE__ */ jsx(
            "line",
            {
              x1: "100",
              y1: "28",
              x2: "100",
              y2: i % 3 === 0 ? "22" : "26",
              stroke: "var(--neon)",
              strokeWidth: "0.6",
              opacity: i % 3 === 0 ? "0.7" : "0.3",
              transform: `rotate(${i * 10} 100 100)`
            },
            i
          ))
        ] }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute inset-0",
            animate: { rotate: 360 },
            transition: { duration: 14, ease: "linear", repeat: Infinity },
            children: [0, 72, 144, 216, 288].map((deg, i) => /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon",
                style: {
                  transform: `rotate(${deg}deg) translateY(-${size * 0.38}px)`,
                  backgroundColor: "var(--neon)",
                  boxShadow: "0 0 10px var(--neon)"
                }
              },
              i
            ))
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "relative flex h-[42%] w-[42%] items-center justify-center", children: [
          /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 100 100", className: "absolute inset-0 anim-pulse-neon", children: [
            /* @__PURE__ */ jsx(
              "polygon",
              {
                points: "50,6 90,28 90,72 50,94 10,72 10,28",
                fill: "none",
                stroke: "var(--neon)",
                strokeWidth: "1",
                opacity: "0.5"
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                points: "50,16 80,33 80,67 50,84 20,67 20,33",
                fill: "var(--neon)",
                opacity: "0.06"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "z-10 text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "font-display text-neon text-2xl tracking-[0.2em]", children: "</>" }),
            /* @__PURE__ */ jsx("div", { className: "font-display text-neon text-xl tracking-[0.3em]", children: label }),
            /* @__PURE__ */ jsx("div", { className: "font-display text-neon text-2xl tracking-[0.2em]", children: "</>" })
          ] })
        ] }) })
      ]
    }
  );
}
function Home() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: "relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-6 pt-16 md:pt-24 pb-20 grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: 16
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.6
      }, children: [
        /* @__PURE__ */ jsxs("h1", { className: "font-display text-4xl md:text-6xl uppercase leading-[1.05]", children: [
          "Building ",
          /* @__PURE__ */ jsx("span", { className: "text-neon", children: "Intelligent" }),
          /* @__PURE__ */ jsx("br", {}),
          "Embedded Systems",
          /* @__PURE__ */ jsx("br", {}),
          "& Hardware ",
          /* @__PURE__ */ jsx("span", { className: "text-neon", children: "Solutions" }),
          "."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 text-muted-foreground max-w-lg leading-relaxed", children: "Embedded systems engineer focused on firmware, circuit design, sensor integration, and real-time control systems. Specialized in intelligent hardware development, clean signal processing, and reliable embedded performance." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/projects", className: "group inline-flex items-center gap-2 bg-neon text-primary-foreground px-5 py-3 text-xs uppercase tracking-[0.25em] font-medium hover:opacity-90 transition", children: [
            "View Projects ",
            /* @__PURE__ */ jsx(ArrowRight, { size: 14, className: "group-hover:translate-x-1 transition" })
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/contact", className: "inline-flex items-center gap-2 border border-neon text-neon px-5 py-3 text-xs uppercase tracking-[0.25em] hover:bg-neon hover:text-primary-foreground transition-colors", children: "Contact Me" }),
          /* @__PURE__ */ jsxs("a", { href: "/Neeraj_K_Resume.pdf", download: "Neeraj_K_Resume.pdf", className: "inline-flex items-center gap-2 border border-border px-5 py-3 text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground hover:border-foreground transition-colors", children: [
            /* @__PURE__ */ jsx(Download, { size: 14 }),
            " Resume"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-12 grid grid-cols-3 gap-4 max-w-md", children: [{
          k: "EMBEDDED",
          v: "Systems"
        }, {
          k: "CIRCUIT",
          v: "Design"
        }, {
          k: "SENSOR",
          v: "Fusion"
        }].map((s) => /* @__PURE__ */ jsxs("div", { className: "border-l border-neon/50 pl-3", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[10px] text-neon tracking-[0.2em]", children: s.k }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: s.v })
        ] }, s.k)) })
      ] }),
      /* @__PURE__ */ jsx(motion.div, { className: "flex justify-center lg:justify-end", initial: {
        opacity: 0,
        scale: 0.9
      }, animate: {
        opacity: 1,
        scale: 1
      }, transition: {
        duration: 0.8,
        delay: 0.1
      }, children: /* @__PURE__ */ jsx(HudCircle, { label: "NK", size: 460 }) })
    ] }) }),
    /* @__PURE__ */ jsx(Section, { eyebrow: "SKILLS", title: "Engineering Stack", children: /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6", children: [{
      icon: Cpu,
      title: "Embedded Firmware",
      desc: "Arduino, embedded C, real-time control loops and PID stability tuning."
    }, {
      icon: CircuitBoard,
      title: "Hardware Design",
      desc: "R-2R DACs, sensor fusion rigs, PCB and breadboard prototyping."
    }, {
      icon: Zap,
      title: "System Analysis",
      desc: "Digital system architecture, RISC-V fundamentals, real-time system behavior and low-level hardware optimization."
    }].map((c) => /* @__PURE__ */ jsxs(Panel, { children: [
      /* @__PURE__ */ jsx(c.icon, { className: "text-neon mb-4", size: 28, strokeWidth: 1.5 }),
      /* @__PURE__ */ jsx("h3", { className: "font-display text-xl uppercase mb-2", children: c.title }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: c.desc })
    ] }, c.title)) }) })
  ] });
}
export {
  Home as component
};
