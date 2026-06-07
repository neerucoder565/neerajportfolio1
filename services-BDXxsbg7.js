import { jsx, jsxs } from "react/jsx-runtime";
import { S as Section, P as Panel } from "./router-DVzYtrYH.js";
import { Cpu, Wrench, CircuitBoard, FlaskConical, Bug, BookOpen } from "lucide-react";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "react";
const SERVICES = [{
  icon: Cpu,
  title: "Embedded Systems Prototyping",
  desc: "From idea to working firmware on Arduino and embedded MCUs."
}, {
  icon: Wrench,
  title: "Arduino-Based Development",
  desc: "End-to-end Arduino projects with sensors, actuators and control loops."
}, {
  icon: CircuitBoard,
  title: "Electronics Hardware Development",
  desc: "Schematic design, breadboard layout and component selection."
}, {
  icon: FlaskConical,
  title: "Circuit Simulation & Testing",
  desc: "Validate behavior in simulation before committing to hardware."
}, {
  icon: Bug,
  title: "Hardware Debugging & Optimization",
  desc: "Diagnose noisy signals, timing issues and component-level faults."
}, {
  icon: BookOpen,
  title: "Engineering Research & Implementation",
  desc: "Translate concepts and papers into working hardware demos."
}];
function Services() {
  return /* @__PURE__ */ jsx(Section, { eyebrow: "SERVICE_MATRIX", title: "What I Build", children: /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: SERVICES.map((s, i) => /* @__PURE__ */ jsxs(Panel, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsx(s.icon, { className: "text-neon", size: 26, strokeWidth: 1.5 }),
      /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-neon tracking-[0.3em]", children: [
        "SVC_",
        String(i + 1).padStart(2, "0")
      ] })
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "font-display text-lg uppercase", children: s.title }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground leading-relaxed", children: s.desc })
  ] }, s.title)) }) });
}
export {
  Services as component
};
