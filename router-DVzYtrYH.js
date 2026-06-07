import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useRouterState, Link, createRootRouteWithContext, useRouter, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { X, Menu, Github, Linkedin, Mail } from "lucide-react";
const appCss = "/assets/styles-BK2Mzl0Z.css";
const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/services", label: "Services" },
  { to: "/skills", label: "Skills" },
  { to: "/contact", label: "Contact" }
];
function SiteShell({ children }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-50 border-b border-border/50 backdrop-blur-md bg-background/70", children: [
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-6 h-16 flex items-center justify-between", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", className: "group flex items-center gap-2", children: /* @__PURE__ */ jsx("span", { className: "font-display text-neon text-lg tracking-[0.25em]", children: "NEERAJ K" }) }),
        /* @__PURE__ */ jsx("nav", { className: "hidden md:flex items-center gap-1", children: NAV.map((item) => {
          const active = pathname === item.to;
          return /* @__PURE__ */ jsxs(
            Link,
            {
              to: item.to,
              className: `relative px-3 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${active ? "text-neon" : "text-muted-foreground hover:text-foreground"}`,
              children: [
                active && /* @__PURE__ */ jsx("span", { className: "absolute inset-x-3 -bottom-0.5 h-px bg-neon" }),
                item.label
              ]
            },
            item.to
          );
        }) }),
        /* @__PURE__ */ jsxs(Link, { to: "/contact", className: "hidden md:flex items-center gap-3 group", children: [
          /* @__PURE__ */ jsx("span", { className: "size-2 rounded-full bg-neon anim-pulse-neon" }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground group-hover:text-neon transition-colors", children: "// OPEN TO WORK" })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "md:hidden text-foreground",
            onClick: () => setOpen(!open),
            "aria-label": "Menu",
            children: open ? /* @__PURE__ */ jsx(X, { size: 20 }) : /* @__PURE__ */ jsx(Menu, { size: 20 })
          }
        )
      ] }),
      open && /* @__PURE__ */ jsx("nav", { className: "md:hidden border-t border-border/50 px-6 py-4 flex flex-col gap-2 bg-background", children: NAV.map((item) => /* @__PURE__ */ jsx(
        Link,
        {
          to: item.to,
          onClick: () => setOpen(false),
          className: "py-2 text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-neon",
          children: item.label
        },
        item.to
      )) })
    ] }),
    /* @__PURE__ */ jsx("main", { className: "flex-1", children }),
    /* @__PURE__ */ jsx("footer", { className: "border-t border-border/50 mt-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground tracking-widest", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " NEERAJ K // ALL SYSTEMS NOMINAL"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://github.com/Neeraj0410",
            target: "_blank",
            rel: "noreferrer",
            className: "text-muted-foreground hover:text-neon transition-colors",
            "aria-label": "GitHub",
            children: /* @__PURE__ */ jsx(Github, { size: 18 })
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://www.linkedin.com/in/neeraj-k-301386328",
            target: "_blank",
            rel: "noreferrer",
            className: "text-muted-foreground hover:text-neon transition-colors",
            "aria-label": "LinkedIn",
            children: /* @__PURE__ */ jsx(Linkedin, { size: 18 })
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "mailto:neerajmadan2006@gmail.com",
            className: "text-muted-foreground hover:text-neon transition-colors",
            "aria-label": "Email",
            children: /* @__PURE__ */ jsx(Mail, { size: 18 })
          }
        )
      ] })
    ] }) })
  ] });
}
function Section({
  eyebrow,
  title,
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsxs("section", { className: `mx-auto max-w-7xl px-6 py-16 md:py-24 ${className}`, children: [
    (eyebrow || title) && /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
      eyebrow && /* @__PURE__ */ jsxs("div", { className: "text-xs text-neon tracking-[0.3em] mb-3", children: [
        "// ",
        eyebrow
      ] }),
      title && /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl md:text-5xl uppercase", children: title })
    ] }),
    children
  ] });
}
function Panel({
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `corners relative bg-card/40 border border-border p-6 glow-border-hover ${className}`,
      children
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-7xl text-neon", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-muted-foreground tracking-widest", children: "SIGNAL LOST // ROUTE NOT FOUND" }),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "/",
        className: "mt-8 inline-flex items-center justify-center border border-neon px-5 py-2 text-xs uppercase tracking-[0.25em] text-neon hover:bg-neon hover:text-primary-foreground transition-colors",
        children: "Return Home"
      }
    )
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl text-neon uppercase", children: "System Fault" }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: error.message }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          router2.invalidate();
          reset();
        },
        className: "mt-6 inline-flex items-center justify-center border border-neon px-5 py-2 text-xs uppercase tracking-[0.25em] text-neon hover:bg-neon hover:text-primary-foreground transition-colors",
        children: "Retry"
      }
    )
  ] }) });
}
const Route$7 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Neeraj K — Embedded Systems & Hardware Engineer" },
      { name: "description", content: "Portfolio of Neeraj K — building intelligent embedded systems, electronics, and hardware solutions." },
      { name: "author", content: "Neeraj K" },
      { property: "og:title", content: "Neeraj K — Embedded Systems Engineer" },
      { property: "og:description", content: "Embedded systems, electronics design, and engineering-focused development." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Share+Tech+Mono&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$7.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(SiteShell, { children: /* @__PURE__ */ jsx(Outlet, {}) }) });
}
const $$splitComponentImporter$5 = () => import("./skills-CWFu7Nr3.js");
const Route$6 = createFileRoute("/skills")({
  head: () => ({
    meta: [{
      title: "Skills — Neeraj K"
    }, {
      name: "description",
      content: "Programming, electronics hardware and embedded systems skills."
    }, {
      property: "og:title",
      content: "Skills — Neeraj K"
    }, {
      property: "og:description",
      content: "Embedded firmware, circuit design and embedded systems competencies."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const BASE_URL = "";
const Route$5 = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = ["/", "/about", "/projects", "/services", "/skills", "/contact"];
        const urls = paths.map((p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      }
    }
  }
});
const $$splitComponentImporter$4 = () => import("./services-BDXxsbg7.js");
const Route$4 = createFileRoute("/services")({
  head: () => ({
    meta: [{
      title: "Services — Neeraj K"
    }, {
      name: "description",
      content: "Hardware engineering services: embedded prototyping, circuit design, testing, debugging."
    }, {
      property: "og:title",
      content: "Services — Neeraj K"
    }, {
      property: "og:description",
      content: "Embedded systems prototyping, electronics development, simulation and debugging."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./projects-Dl3DcGR_.js");
const Route$3 = createFileRoute("/projects")({
  head: () => ({
    meta: [{
      title: "Projects — Neeraj K"
    }, {
      name: "description",
      content: "Featured embedded systems and hardware engineering projects."
    }, {
      property: "og:title",
      content: "Projects — Neeraj K"
    }, {
      property: "og:description",
      content: "Bluetooth mesh comms, R-2R DAC, sensor fusion and PID control prototypes."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./contact-BWFSCCbx.js");
const Route$2 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact — Neeraj K"
    }, {
      name: "description",
      content: "Get in touch with Neeraj K for hardware and embedded systems collaboration."
    }, {
      property: "og:title",
      content: "Contact — Neeraj K"
    }, {
      property: "og:description",
      content: "Email, LinkedIn, GitHub and direct message form."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./about-DvhYspJh.js");
const Route$1 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About — Neeraj K"
    }, {
      name: "description",
      content: "Engineer with deep interest in embedded systems, automotive tech and electronics design."
    }, {
      property: "og:title",
      content: "About — Neeraj K"
    }, {
      property: "og:description",
      content: "Structural & weight analysis engineer building hardware-focused projects."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-BcqiUZOw.js");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Neeraj K — Embedded Systems Engineer"
    }, {
      name: "description",
      content: "Building intelligent embedded systems and hardware solutions."
    }, {
      property: "og:title",
      content: "Neeraj K — Embedded Systems Engineer"
    }, {
      property: "og:description",
      content: "Embedded systems, electronics design, and engineering-focused development."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SkillsRoute = Route$6.update({
  id: "/skills",
  path: "/skills",
  getParentRoute: () => Route$7
});
const SitemapDotxmlRoute = Route$5.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$7
});
const ServicesRoute = Route$4.update({
  id: "/services",
  path: "/services",
  getParentRoute: () => Route$7
});
const ProjectsRoute = Route$3.update({
  id: "/projects",
  path: "/projects",
  getParentRoute: () => Route$7
});
const ContactRoute = Route$2.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$7
});
const AboutRoute = Route$1.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$7
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  ContactRoute,
  ProjectsRoute,
  ServicesRoute,
  SitemapDotxmlRoute,
  SkillsRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Panel as P,
  Section as S,
  router as r
};
