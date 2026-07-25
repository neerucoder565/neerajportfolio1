import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Download } from "lucide-react";
import { InteractivePCB } from "@/components/InteractivePCB";
import { LaptopFrame } from "@/components/LaptopFrame";
import { EngineeringWorkflow } from "@/components/EngineeringWorkflow";
import { Section } from "@/components/SiteShell";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Neeraj K — Embedded Systems Engineer" },
      { name: "description", content: "Building intelligent embedded systems and hardware solutions." },
      { property: "og:title", content: "Neeraj K — Embedded Systems Engineer" },
      { property: "og:description", content: "Embedded systems, electronics design, and engineering-focused development." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pt-16 md:pt-24 pb-20 grid lg:grid-cols-[0.85fr_1.25fr] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-6xl uppercase leading-[1.05]">
              Building <span className="text-neon">Intelligent</span><br />
              Embedded Systems<br />
              & Hardware <span className="text-neon">Solutions</span>.
            </h1>
            <p className="mt-6 text-muted-foreground max-w-lg leading-relaxed">
              Passionate about Embedded Systems, VLSI Design, and Intelligent Hardware Development. Experienced in developing embedded projects involving firmware programming, circuit design, sensor interfacing, motor control, and real-time systems. Continuously expanding my expertise in embedded software, digital hardware design, semiconductor technologies, and next-generation chip development while building practical engineering solutions through hands-on projects.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 bg-neon text-primary-foreground px-5 py-3 text-xs uppercase tracking-[0.25em] font-medium hover:opacity-90 transition"
              >
                View Projects <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-neon text-neon px-5 py-3 text-xs uppercase tracking-[0.25em] hover:bg-neon hover:text-primary-foreground transition-colors"
              >
                Contact Me
              </Link>
              <a
                href="/Neeraj_K_Resume.pdf"
                download="Neeraj_K_Resume.pdf"
                className="inline-flex items-center gap-2 border border-border px-5 py-3 text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                <Download size={14} /> Resume
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 max-w-md">
              {[
                { k: "EMBEDDED", v: "Systems" },
                { k: "CIRCUIT", v: "Design" },
                { k: "SENSOR", v: "Fusion" },
              ].map((s) => (
                <div key={s.k} className="border-l border-neon/50 pl-3">
                  <div className="text-[10px] text-neon tracking-[0.2em]">{s.k}</div>
                  <div className="text-xs text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center lg:justify-end lg:-mt-[50px]"

            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <LaptopFrame>
              <InteractivePCB size={400} />
            </LaptopFrame>
          </motion.div>

        </div>
      </section>

      {/* CAPABILITIES */}
      <Section eyebrow="PROCESS" title="Engineering Workflow">
        <EngineeringWorkflow />
      </Section>

    </>
  );
}
