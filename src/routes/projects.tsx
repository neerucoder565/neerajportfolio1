import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ExternalLink, Code2 } from "lucide-react";
import { useState } from "react";
import { Section } from "@/components/SiteShell";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import pidImg from "@/assets/project-pid.jpg";
import r2rImg from "@/assets/project-r2r.jpg";
import edgeVisionImg from "@/assets/project-edge-vision.png";
import bootloaderImg from "@/assets/project-bootloader.png.asset.json";
import { R2R_CODE, PID_CODE, EDGE_VISION_CODE, BOOTLOADER_CODE, type CodeFile } from "@/data/project-code";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Neeraj K" },
      { name: "description", content: "Featured embedded systems and hardware engineering projects." },
      { property: "og:title", content: "Projects — Neeraj K" },
      { property: "og:description", content: "Bluetooth mesh comms, R-2R DAC, sensor fusion and PID control prototypes." },
    ],
  }),
  component: Projects,
});

type Project = {
  id: string;
  date: string;
  title: string;
  sub: string;
  image?: string;
  overview: string;
  tech: string[];
  outcomes: string;
  code?: CodeFile[];
  repo?: string;
};


const PROJECTS: Project[] = [
  {
    id: "01",
    date: "2025-Q3",
    title: "Edge Vision Detection System",
    sub: "On-Device Vision on Resource-Constrained Hardware",
    image: edgeVisionImg,
    overview: "Real-time object detection and image preprocessing pipeline running on an FPGA-based preprocessing stage with the VEGA RISC-V processor. Designed for efficient feature extraction, noise reduction, and low-latency detection in hardware-constrained environments.",
    tech: ["FPGA", "VEGA RISC-V", "Image Processing", "Object Detection", "Edge AI"],
    outcomes: "Streamlined vision pipeline delivering low-latency detection on resource-constrained hardware.",
    code: EDGE_VISION_CODE,
  },
  {
    id: "02",
    date: "2025-Q2",
    title: "4-bit R-2R Ladder DAC",
    sub: "Arduino-driven Analog Output",
    image: r2rImg,
    overview: "Built and tested a 4-bit digital-to-analog converter using resistor ladder architecture and Arduino control logic. Verified voltage outputs across all 16 binary combinations.",
    tech: ["Arduino", "R-2R Ladder", "Breadboard", "Multimeter"],
    outcomes: "Stable linear voltage steps; demonstrated DAC fundamentals on bare hardware.",
    code: R2R_CODE,
    repo: "https://github.com/Neeraj0410/Digital-To-Analog-Converter-Using-R-2R-Resistor-Ladder",
  },

  {
    id: "03",
    date: "2025-Q1",
    title: "BARE-METAL BOOTLOADER",
    sub: "Embedded Firmware Architecture",
    image: bootloaderImg.url,
    overview: "Written a bare-metal bootloader from scratch on STM32F407VGT6. Partitioned flash memory manually, implemented vector table relocation and MSP configuration for clean firmware handoff to application.",
    tech: ["STM32", "BARE-METAL", "FLASH MEMORY", "FIRMWARE"],
    outcomes: "Dual firmware images coexisting in flash with stable bootloader-to-application jump via Reset Handler",
    code: BOOTLOADER_CODE,
  },
  {
    id: "04",
    date: "2024-Q4",
    title: "PID Control System",
    sub: "Stability & Overshoot Reduction",
    image: pidImg,
    overview: "Studied and implemented proportional, integral and derivative control. Tuned parameters for stability, overshoot reduction and faster system response.",
    tech: ["Control Theory", "Arduino", "Simulation", "Tuning"],
    outcomes: "Hands-on intuition for PID tuning trade-offs across plant dynamics.",
    code: PID_CODE,
    repo: "https://github.com/Neeraj0410/Encoder-Based-PID-Motor-Control",
  },

];

function CodeViewer({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  if (!project.code?.length) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.25em] uppercase border border-neon/40 text-neon px-2 py-1 hover:bg-neon/10 transition-colors"
          aria-label={`View source code for ${project.title}`}
        >
          <Code2 size={11} />
          // View Code
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl border-border bg-background/95 backdrop-blur">
        <DialogHeader>
          <DialogTitle className="font-display uppercase tracking-wider text-xl">
            <span className="text-neon">PRJ_{project.id}</span> {project.title} — Source
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue={project.code[0].name} className="mt-2">
          <TabsList className="flex flex-wrap h-auto bg-card/40 border border-border">
            {project.code.map((f) => (
              <TabsTrigger
                key={f.name}
                value={f.name}
                className="text-[10px] tracking-widest uppercase data-[state=active]:text-neon data-[state=active]:bg-background/60"
              >
                {f.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {project.code.map((f) => (
            <TabsContent key={f.name} value={f.name} className="mt-3">
              <pre className="text-[11px] leading-relaxed font-mono text-foreground/90 bg-background/70 border border-border p-4 overflow-auto max-h-[60vh]">
                <code>{f.code}</code>
              </pre>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function Projects() {
  return (
    <Section eyebrow="PROJECT INDEX" title="Featured Work">
      <div className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="corners relative border border-border bg-card/40 p-6 glow-border-hover group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-xs text-neon tracking-[0.3em]">PRJ_{p.id}</div>
              <div className="flex gap-2 items-center">
                {p.code?.length ? (
                  <CodeViewer project={p} />
                ) : (
                  <span className="text-[9px] tracking-[0.25em] uppercase border border-neon/40 text-neon/80 px-2 py-1">
                    // Code coming soon
                  </span>
                )}
                {p.repo ? (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open GitHub repository for ${p.title}`}
                    className="text-muted-foreground hover:text-neon transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                ) : (
                  <ExternalLink size={16} className="text-muted-foreground opacity-60" />
                )}
              </div>
            </div>

            <div className="relative mb-4 aspect-[16/9] border border-border bg-background/40 overflow-hidden grid place-items-center"
              style={!p.image ? {
                backgroundImage:
                  "linear-gradient(rgba(0,255,170,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,170,0.06) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              } : undefined}
            >
              {p.image ? (
                <>
                  <img src={p.image} alt={`${p.title} hardware build`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0px, rgba(0,0,0,0.25) 1px, transparent 1px, transparent 3px)"
                  }} />
                  <div className="absolute bottom-2 left-2 text-[9px] text-neon tracking-[0.3em] bg-background/70 px-2 py-1 border border-neon/30">// LIVE BUILD</div>
                </>
              ) : (
                <>
                  <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)"
                  }} />
                  <div className="text-[10px] text-neon tracking-[0.3em] relative">// PHOTO COMING SOON</div>
                </>
              )}
            </div>

            <h3 className="font-display text-2xl uppercase leading-tight">{p.title}</h3>
            <div className="text-xs text-neon mt-1 tracking-widest">{p.sub}</div>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{p.overview}</p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {p.tech.map((t) => (
                <span key={t} className="text-[10px] tracking-widest uppercase border border-border px-2 py-1 text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-border/60">
              <div className="text-[10px] text-neon tracking-[0.25em] mb-1">// OUTCOME</div>
              <div className="text-xs text-muted-foreground">{p.outcomes}</div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
