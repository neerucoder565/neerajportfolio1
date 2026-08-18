import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/SiteShell";
import { ServiceBootDashboard } from "@/components/ServiceBootDashboard";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Neeraj K" },
      { name: "description", content: "Hardware engineering services: embedded prototyping, circuit design, testing, debugging." },
      { property: "og:title", content: "Services — Neeraj K" },
      { property: "og:description", content: "Embedded systems prototyping, electronics development, simulation and debugging." },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <Section eyebrow="SERVICE_MATRIX" title="What I Build">
      <ServiceBootDashboard />
    </Section>
  );
}
