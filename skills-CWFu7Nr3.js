import { jsx, jsxs } from "react/jsx-runtime";
import { S as Section } from "./router-DVzYtrYH.js";
import { Code2, CircuitBoard, Cpu } from "lucide-react";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "react";
const GROUPS = [{
  icon: Code2,
  title: "Programming & Firmware",
  items: [{
    name: "Embedded C",
    level: "Intermediate"
  }, {
    name: "Arduino Prototyping",
    level: "Advanced"
  }, {
    name: "Python",
    level: "Intermediate"
  }, {
    name: "PID Control Systems",
    level: "Intermediate"
  }, {
    name: "Edge AI Integration",
    level: "Beginner / Intermediate"
  }]
}, {
  icon: CircuitBoard,
  title: "Electronics & Hardware",
  items: [{
    name: "Circuit Design",
    level: "Intermediate"
  }, {
    name: "R-2R DAC Systems",
    level: "Intermediate"
  }, {
    name: "Sensor Fusion",
    level: "Intermediate"
  }, {
    name: "Hardware Debugging",
    level: "Intermediate"
  }, {
    name: "Breadboard Prototyping",
    level: "Intermediate"
  }]
}, {
  icon: Cpu,
  title: "Embedded Systems",
  items: [{
    name: "RISC-V",
    level: "Beginner"
  }, {
    name: "Real-Time Systems",
    level: "Intermediate"
  }, {
    name: "System Testing & Validation",
    level: "Intermediate"
  }, {
    name: "Signal Processing Basics",
    level: "Intermediate"
  }]
}];
function Skills() {
  return /* @__PURE__ */ jsx(Section, { eyebrow: "CAPABILITY_LEVELS", title: "Skill Telemetry", children: /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6", children: GROUPS.map((g) => /* @__PURE__ */ jsxs("div", { className: "corners relative border border-border bg-card/40 p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsx(g.icon, { className: "text-neon", size: 22, strokeWidth: 1.5 }),
      /* @__PURE__ */ jsx("h3", { className: "font-display uppercase text-sm tracking-widest", children: g.title })
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: g.items.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex justify-between items-baseline gap-3 border-b border-border/40 pb-2", children: [
      /* @__PURE__ */ jsx("span", { className: "text-sm", children: item.name }),
      /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.2em] text-neon whitespace-nowrap", children: item.level })
    ] }, item.name)) })
  ] }, g.title)) }) });
}
export {
  Skills as component
};
