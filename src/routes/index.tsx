import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Download, Cpu, Radio, Layers } from "lucide-react";
import { InteractivePCB } from "@/components/InteractivePCB";
import { Panel, Section } from "@/components/SiteShell";

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
        <div className="mx-auto max-w-7xl px-6 pt-16 md:pt-24 pb-20 grid lg:grid-cols-2 gap-12 items-center">
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
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <InteractivePCB size={500} />
          </motion.div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <Section eyebrow="STACK" title="Engineering Stack">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Cpu, title: "MCU & Firmware", desc: "STM32 (Cortex-M4) bare-metal, bootloader design, vector table relocation, interrupt-driven control loops in embedded C." },
            { icon: Radio, title: "Peripherals & Buses", desc: "UART, SPI, I²C bring-up, sensor interfacing, DMA, and mixed-signal work — including R-2R DACs and PID actuation." },
            { icon: Layers, title: "Systems & Edge AI", desc: "RTOS scheduling patterns, RISC-V (VEGA) fundamentals, and FPGA-fronted on-device vision pipelines." },
          ].map((c) => (
            <Panel key={c.title}>
              <c.icon className="text-neon mb-4" size={28} strokeWidth={1.5} />
              <h3 className="font-display text-xl uppercase mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </Panel>
          ))}
        </div>
      </Section>
    </>
  );
}
