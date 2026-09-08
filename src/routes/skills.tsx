import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/SiteShell";
import { SkillBreadboard } from "@/components/SkillBreadboard";

const TOOLS_VIDEO_URL =
  "/__l5e/assets-v1/1d85acac-4115-4f41-bc9c-8b412be5bc27/tools-360.mp4";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Neeraj K" },
      { name: "description", content: "Programming, electronics hardware and embedded systems skills." },
      { property: "og:title", content: "Skills — Neeraj K" },
      { property: "og:description", content: "Embedded firmware, circuit design and embedded systems competencies." },
    ],
  }),
  component: Skills,
});

function Skills() {
  return (
    <>
      <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-violet-500/20 shadow-[0_0_80px_-20px_rgba(124,58,237,0.5)]">
        <video
          src={TOOLS_VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="block h-auto w-full"
        />
      </div>
      <Section eyebrow="CAPABILITY_LEVELS" title="Skill Telemetry">
        <SkillBreadboard />
      </Section>
    </>
  );
}

