"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect, useState } from "react";

import { env } from "~/env";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = () => {
      if (posthog.__loaded) return;

      posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
        // Route through our Next.js proxy so we can cache-bust PostHog's
        // own short TTLs (surveys.js: 5 min, recorder.js: 4 h) and avoid
        // ad-blockers that target the posthog.com domain directly.
        // In production, route through the /ingest proxy so we can set longer
        // cache TTLs and avoid ad-blockers. In local dev the proxy tries to
        // reach PostHog from the server side and times out (ETIMEDOUT), so we
        // fall back to the direct PostHog host instead.
        api_host:
          process.env.NODE_ENV === "production"
            ? "/ingest"
            : (env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com"),
        ui_host: "https://us.posthog.com",

        // Let the PageView plugin fire manually so we can track route
        // changes cleanly with the App Router.
        capture_pageview: false,

        // Only build full profiles for identified users — avoids inflating
        // anonymous person records and keeps the payload light.
        person_profiles: "identified_only",

        // Disable features we don't actively use so their JS chunks are
        // never requested (saves ~57 KiB of unused JS on every page load).
        disable_surveys: true,
        disable_session_recording: process.env.NODE_ENV !== "production",

        defaults: "2025-05-24",
        enable_heatmaps: true,

        loaded: () => setInitialized(true),
      });
    };

    // Wait until the browser is idle so PostHog never competes with LCP/TTI.
    // Falls back to a 3-second timeout for Safari which lacks rIC support.
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        (
          window as Window & {
            requestIdleCallback: (
              cb: () => void,
              opts?: { timeout: number },
            ) => void;
          }
        ).requestIdleCallback(init, { timeout: 3000 });
      } else {
        const timer = setTimeout(init, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  if (!initialized) return <>{children}</>;

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
