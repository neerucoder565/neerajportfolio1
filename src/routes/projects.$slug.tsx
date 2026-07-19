import { createFileRoute, notFound } from "@tanstack/react-router";
import { CaseStudyPage } from "@/components/CaseStudy";
import { CASE_STUDIES, type CaseStudySlug } from "@/data/case-studies";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const study = CASE_STUDIES[params.slug as CaseStudySlug];
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Case Study — Neeraj K" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const s = loaderData.study;
    const title = `${s.title} — Technical Case Study · Neeraj K`;
    const desc = s.overview.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CaseStudyRoute,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <div className="text-xs tracking-[0.3em] text-neon">// SIGNAL LOST</div>
      <h1 className="font-display text-4xl uppercase mt-3">
        Case Study Not Found
      </h1>
    </div>
  ),
});

function CaseStudyRoute() {
  const { study } = Route.useLoaderData();
  return <CaseStudyPage slug={study.slug} />;
}
