import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/certificates", label: "Certificates" },
  { to: "/services", label: "Services" },
  { to: "/skills", label: "Skills" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-md bg-background/70">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-2">
            <span className="font-display text-neon text-lg tracking-[0.25em]">NEERAJ K</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative px-3 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
                    active
                      ? "text-neon"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-px bg-neon" />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link to="/contact" className="hidden md:flex items-center gap-3 group">
            <span className="size-2 rounded-full bg-neon anim-pulse-neon" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground group-hover:text-neon transition-colors">
              // OPEN TO WORK
            </span>
          </Link>

          <button
            className="md:hidden text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <nav className="md:hidden border-t border-border/50 px-6 py-4 flex flex-col gap-2 bg-background">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-neon"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/50 mt-24">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs text-muted-foreground tracking-widest">
            © {new Date().getFullYear()} NEERAJ K // ALL SYSTEMS NOMINAL
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Neeraj0410"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-neon transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/neeraj-k-301386328"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-neon transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:neerajmadan2006@gmail.com"
              className="text-muted-foreground hover:text-neon transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function Section({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-16 md:py-24 ${className}`}>
      {(eyebrow || title) && (
        <div className="mb-12">
          {eyebrow && (
            <div className="text-xs text-neon tracking-[0.3em] mb-3">
              // {eyebrow}
            </div>
          )}
          {title && (
            <h2 className="font-display text-3xl md:text-5xl uppercase">
              {title}
            </h2>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

export function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`corners relative bg-card/40 border border-border p-6 glow-border-hover ${className}`}
    >
      {children}
    </div>
  );
}
