import { createFileRoute } from "@tanstack/react-router";
import { WheatstoneBridge } from "@/components/WheatstoneBridge";
import { CircuitBackdrop } from "@/components/CircuitBackdrop";


export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "What I Build — Neeraj K" },
      {
        name: "description",
        content:
          "An interactive Wheatstone bridge mapping embedded prototyping, hardware development, simulation, research and debugging capabilities.",
      },
      { property: "og:title", content: "What I Build — Neeraj K" },
      {
        property: "og:description",
        content:
          "Explore capabilities through an interactive Wheatstone bridge: Arduino development, hardware design, simulation, research, debugging and firmware prototyping.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: WhatIBuild,
});

const EXPLAINER = [
  {
    k: "WHAT",
    body: "A four-arm resistor network with a detector across the middle. Balancing the two legs nulls the detector, and that null point is the measurement.",
  },
  {
    k: "WHY",
    body: "It measures by comparison, so supply drift and meter error cancel out — giving precision a single resistance reading can't reach.",
  },
  {
    k: "WHERE",
    body: "Load cells and strain gauges, RTD temperature probes, pressure and force sensors — anywhere a tiny resistance change must be measured reliably.",
  },
];

function WhatIBuild() {
  return (
    <>
      <CircuitBackdrop />
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-16 md:py-24">

      <div className="flex items-center gap-3 mb-4">
        <span className="wb-led" aria-hidden />
        <span className="font-display text-xs text-neon tracking-[0.3em]">
          // CAPABILITY_MATRIX
        </span>
      </div>
      <h1 className="font-display text-4xl md:text-6xl uppercase wb-title">
        What I Build
      </h1>
      <p className="wb-body text-muted-foreground mt-4 max-w-2xl">
        Six components, one balanced bridge — probe any node to see what it does.
      </p>

      <div className="wb-chamfer relative border border-border bg-card/40 p-6 mt-10">
        <h2 className="font-display text-lg md:text-xl uppercase mb-6">
          Why a Wheatstone bridge?
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {EXPLAINER.map((e, i) => (
            <div
              key={e.k}
              className="spec-row wb-col"
              style={{ animationDelay: `${0.15 + i * 0.15}s` }}
            >
              <div className="font-display text-[11px] tracking-[0.3em] text-cyan mb-2">
                {e.k}
              </div>
              <p className="wb-body text-sm text-muted-foreground">{e.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 md:mt-20 flex justify-center">
        <WheatstoneBridge />
      </div>
      </section>
    </>
  );
}

