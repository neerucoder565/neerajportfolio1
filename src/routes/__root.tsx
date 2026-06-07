import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteShell } from "@/components/SiteShell";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-neon">404</h1>
        <p className="mt-4 text-sm text-muted-foreground tracking-widest">
          SIGNAL LOST // ROUTE NOT FOUND
        </p>
        <a
          href="/"
          className="mt-8 inline-flex items-center justify-center border border-neon px-5 py-2 text-xs uppercase tracking-[0.25em] text-neon hover:bg-neon hover:text-primary-foreground transition-colors"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-neon uppercase">System Fault</h1>
        <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 inline-flex items-center justify-center border border-neon px-5 py-2 text-xs uppercase tracking-[0.25em] text-neon hover:bg-neon hover:text-primary-foreground transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Neeraj K — Embedded Systems & Hardware Engineer" },
      { name: "description", content: "Portfolio of Neeraj K — building intelligent embedded systems, electronics, and hardware solutions." },
      { name: "author", content: "Neeraj K" },
      { property: "og:title", content: "Neeraj K — Embedded Systems Engineer" },
      { property: "og:description", content: "Embedded systems, electronics design, and engineering-focused development." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Share+Tech+Mono&display=swap" },
    ],
    scripts: [
      { src: "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SiteShell>
        <Outlet />
      </SiteShell>
    </QueryClientProvider>
  );
}
