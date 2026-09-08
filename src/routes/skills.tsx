import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/SiteShell";
import { SkillBreadboard } from "@/components/SkillBreadboard";
import { ToolSphere } from "@/components/ToolSphere";


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
      <Section eyebrow="TOOLCHAIN" title="Hardware & Tools">
        <ToolSphere height={440} />
      </Section>
      <Section eyebrow="CAPABILITY_LEVELS" title="Skill Telemetry">
        <SkillBreadboard />
      </Section>
    </>
  );
}

