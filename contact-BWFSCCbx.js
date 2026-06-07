import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Mail, Phone, Linkedin, Github, Send } from "lucide-react";
import { S as Section, P as Panel } from "./router-DVzYtrYH.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
const CHANNELS = [{
  icon: Mail,
  label: "Email",
  value: "neerajmadan2006@gmail.com",
  href: "mailto:neerajmadan2006@gmail.com"
}, {
  icon: Phone,
  label: "Phone",
  value: "+91 88257 69448",
  href: "tel:+918825769448"
}, {
  icon: Linkedin,
  label: "LinkedIn",
  value: "linkedin.com/in/neeraj-k-301386328",
  href: "https://www.linkedin.com/in/neeraj-k-301386328"
}, {
  icon: Github,
  label: "GitHub",
  value: "github.com/Neeraj0410",
  href: "https://github.com/Neeraj0410"
}];
function Contact() {
  const [sent, setSent] = useState(false);
  return /* @__PURE__ */ jsx(Section, { eyebrow: "TRANSMISSION", title: "Open A Channel", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8", children: [
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: CHANNELS.map((c) => /* @__PURE__ */ jsxs("a", { href: c.href, target: c.href.startsWith("http") ? "_blank" : void 0, rel: "noreferrer", className: "corners relative flex items-center gap-4 border border-border bg-card/40 p-5 glow-border-hover group", children: [
      /* @__PURE__ */ jsx("div", { className: "size-12 grid place-items-center border border-neon/50 text-neon group-hover:bg-neon group-hover:text-primary-foreground transition-colors", children: /* @__PURE__ */ jsx(c.icon, { size: 18, strokeWidth: 1.5 }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-[10px] text-neon tracking-[0.3em]", children: c.label.toUpperCase() }),
        /* @__PURE__ */ jsx("div", { className: "text-sm", children: c.value })
      ] })
    ] }, c.label)) }),
    /* @__PURE__ */ jsxs(Panel, { children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs text-neon tracking-[0.3em] mb-6", children: "// SEND MESSAGE" }),
      sent ? /* @__PURE__ */ jsxs("div", { className: "py-10 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "font-display text-2xl text-neon uppercase", children: "Signal Sent" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "I'll reply within 1–2 days." })
      ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        setSent(true);
      }, className: "space-y-5", children: [
        [{
          id: "name",
          label: "Name",
          type: "text"
        }, {
          id: "email",
          label: "Email",
          type: "email"
        }].map((f) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: f.id, className: "block text-[10px] text-neon tracking-[0.3em] mb-2", children: f.label.toUpperCase() }),
          /* @__PURE__ */ jsx("input", { id: f.id, type: f.type, required: true, className: "w-full bg-background/60 border border-border focus:border-neon focus:outline-none px-3 py-2.5 text-sm transition-colors" })
        ] }, f.id)),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "message", className: "block text-[10px] text-neon tracking-[0.3em] mb-2", children: "MESSAGE" }),
          /* @__PURE__ */ jsx("textarea", { id: "message", required: true, rows: 5, className: "w-full bg-background/60 border border-border focus:border-neon focus:outline-none px-3 py-2.5 text-sm resize-none transition-colors" })
        ] }),
        /* @__PURE__ */ jsxs("button", { type: "submit", className: "inline-flex items-center gap-2 bg-neon text-primary-foreground px-5 py-3 text-xs uppercase tracking-[0.25em] font-medium hover:opacity-90 transition", children: [
          "Transmit ",
          /* @__PURE__ */ jsx(Send, { size: 14 })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  Contact as component
};
