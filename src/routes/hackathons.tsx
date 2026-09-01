import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Panel, Section } from "@/components/SiteShell";
import { FileText, ArrowLeft, Download } from "lucide-react";

export const Route = createFileRoute("/hackathons")({
  head: () => ({
    meta: [
      { title: "Hackathons — Neeraj K" },
      { name: "description", content: "Hackathons and competitions — embedded, AI and hardware innovation entries by Neeraj K." },
      { property: "og:title", content: "Hackathons — Neeraj K" },
      { property: "og:description", content: "Hackathons and competitions — embedded, AI and hardware innovation entries by Neeraj K." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Hackathons,
});

const HACKATHONS = [
  {
    project: "MediFind",
    event: "Genesis 2026",
    outcome: "Smart emergency hospital finder.",
    cert: "/certificates/genesis-2026-certificate.pdf",
  },
  {
    project: "Arch Nova",
    event: "DVCon India 2026 Design Contest (Stage 1 & 2A)",
    outcome: "YOLO-based adaptive task-aware object detection with FPGA preprocessing context.",
    cert: null,
  },
  {
    project: "AutoManuscript AI",
    event: 'Team "The Big Four"',
    outcome: "Six-stage AI manuscript formatting pipeline with citation engine and dual validation.",
    cert: null,
  },
  {
    project: "UrjaNet",
    event: "MSME Idea Hackathon 6.0",
    outcome: "AI-powered NILM and carbon compliance platform.",
    cert: null,
  },
  {
    project: "Hackathon 360°",
    event: "National Level ECLearnix Innovation Challenge — Round 2",
    outcome: "Selected through to Round 2 of the national innovation challenge.",
    cert: "/certificates/eclearnix-360-round2-certificate.pdf",
  },
  {
    project: "Hackathon 360° 4.0",
    event: "International Level — NSIT-IFSCS & ECLearnix",
    outcome: "Round 1 participant in the international innovation and problem-solving track.",
    cert: "/certificates/hackathon-360-4-0-certificate.pdf",
  },
  {
    project: "Hackathon 360° 3.0",
    event: "International Level — KPR Institute of Engineering & Technology",
    outcome: "International hackathon focused on rapid innovation and prototyping.",
    cert: "/certificates/hackathon-360-3-0-kpriet-certificate.pdf",
  },
  {
    project: "Quintessence 2026",
    event: "SECE Student Society, Easwari Engineering College",
    outcome: "Technical quiz on core electronics and communication fundamentals.",
    cert: "/certificates/quintessence-2026-certificate.pdf",
  },
];

function Hackathons() {
  const [viewing, setViewing] = useState<{ project: string; cert: string } | null>(null);

  if (viewing) {
    return (
      <Section eyebrow="CERTIFICATE" title={viewing.project}>
        <div className="flex items-center justify-between gap-4 mb-4">
          <button
            type="button"
            onClick={() => setViewing(null)}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neon hover:text-neon-bright transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Hackathons
          </button>
          <a
            href={viewing.cert}
            download
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neon hover:text-neon-bright transition-colors"
          >
            <Download size={14} />
            Download
          </a>
        </div>
        <Panel className="p-2">
          <img
            src={viewing.cert.replace(/\.pdf$/, ".png")}
            alt={`${viewing.project} certificate`}
            className="w-full h-auto rounded-md"
          />
        </Panel>
      </Section>
    );
  }

  return (
    <Section eyebrow="ACHIEVEMENTS" title="Hackathons">
      <div className="grid md:grid-cols-2 gap-6">
        {HACKATHONS.map((h, i) => (
          <Panel key={h.project} className="flex flex-col justify-between gap-4">
            <div>
              <div className="text-xs text-neon tracking-[0.25em] mb-2">
                // ENTRY_{String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display text-xl uppercase text-glow-soft">{h.project}</h3>
              <div className="text-sm text-muted-foreground mt-1">{h.event}</div>
              <p className="text-sm text-muted-foreground/80 mt-3 leading-relaxed">
                {h.outcome}
              </p>
            </div>
            {h.cert && (
              <button
                type="button"
                onClick={() => setViewing({ project: h.project, cert: h.cert! })}
                className="inline-flex items-center gap-2 self-start text-xs uppercase tracking-[0.2em] text-neon hover:text-neon-bright transition-colors"
              >
                <FileText size={14} />
                View Certificate
              </button>
            )}
          </Panel>
        ))}
      </div>
    </Section>
  );
}
