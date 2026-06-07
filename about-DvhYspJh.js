import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { S as Section, P as Panel } from "./router-DVzYtrYH.js";
import { GraduationCap, Briefcase } from "lucide-react";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "react";
const SKILLS = ["Embedded Systems", "Arduino Programming", "Electronics Circuit Design", "Sensor Fusion", "PID Control Systems", "DAC Design (R-2R Ladder)", "Circuit Simulation & Testing", "Hardware Debugging", "PCB / Breadboard Prototyping", "Structural Analysis", "Weight Analysis", "Basic AI + Hardware Integration"];
function About() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Section, { eyebrow: "IDENTITY.LOG", title: "About Neeraj K", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs(Panel, { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Embedded systems engineer specializing in firmware, embedded hardware, and real-time electronic systems. Experienced in circuit design, sensor integration, DAC architectures, embedded control applications, and programming with C, C++, and Python." }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground leading-relaxed", children: "Focused on efficient system behavior, hardware-software interaction, and reliable electronic design for intelligent embedded applications. Strong technical interest in RISC-V computing, edge intelligence, and next-generation embedded technologies." })
      ] }),
      /* @__PURE__ */ jsxs(Panel, { children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs text-neon tracking-[0.3em] mb-4", children: "// QUICK SPECS" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Role" }),
            /* @__PURE__ */ jsx("span", { children: "Hardware Engineer" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Focus" }),
            /* @__PURE__ */ jsx("span", { children: "Embedded / VLSI" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Location" }),
            /* @__PURE__ */ jsx("span", { children: "India" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Status" }),
            /* @__PURE__ */ jsx("span", { className: "text-neon", children: "Open to work" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Section, { eyebrow: "EDUCATION & EXPERIENCE", title: "Trajectory", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs(Panel, { children: [
        /* @__PURE__ */ jsx(GraduationCap, { className: "text-neon mb-3", size: 24, strokeWidth: 1.5 }),
        /* @__PURE__ */ jsx("h3", { className: "font-display text-xl uppercase", children: "Education" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm", children: "B.E. — Electronics & Communication Engineering" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "Easwari Engineering College" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Panel, { children: [
        /* @__PURE__ */ jsx(Briefcase, { className: "text-neon mb-3", size: 24, strokeWidth: 1.5 }),
        /* @__PURE__ */ jsx("h3", { className: "font-display text-xl uppercase", children: "Experience" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { children: "Structural & Weight Analysis Engineer" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Applied precision, tolerances, and system-constraint thinking from automotive analysis to inform embedded hardware design decisions." })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { children: "Hardware-Focused Project Development" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Embedded experimentation & electronics prototyping" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Section, { eyebrow: "TECHNICAL STACK", title: "Skills Matrix", children: /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 md:grid-cols-3 gap-3", children: SKILLS.map((s, i) => /* @__PURE__ */ jsxs("div", { className: "corners relative border border-border bg-card/30 px-4 py-3 text-sm glow-border-hover", children: [
      /* @__PURE__ */ jsx("span", { className: "text-neon mr-2 text-xs", children: String(i + 1).padStart(2, "0") }),
      s
    ] }, s)) }) })
  ] });
}
export {
  About as component
};
