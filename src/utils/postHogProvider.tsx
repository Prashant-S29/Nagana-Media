"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { env } from "~/env";

// ─── Page-view tracker ───────────────────────────────────────────────────────
// Separated so it can be wrapped in <Suspense> if needed (useSearchParams
// requirement in Next.js App Router).
function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    let url = window.location.origin + pathname;
    const search = searchParams.toString();
    if (search) url += `?${search}`;

    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}

// ─── Provider ────────────────────────────────────────────────────────────────
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Guard: don't re-init if already loaded (handles React strict-mode
    // double-invoke without breaking production).
    if (posthog.__loaded) return;

    const init = () => {
      // Double-check inside the callback - idle callback can fire late
      if (posthog.__loaded) return;

      posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host:
          process.env.NODE_ENV === "production"
            ? "/ingest"
            : (env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com"),
        ui_host: "https://us.posthog.com",
        // We fire pageviews manually in PostHogPageView above
        capture_pageview: false,
        person_profiles: "identified_only",
        disable_surveys: true,
        disable_session_recording: process.env.NODE_ENV !== "production",
        defaults: "2025-05-24",
        enable_heatmaps: true,
      });
    };

    if (typeof window === "undefined") return;

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
  }, []);

  // ✅ Always render PHProvider - never gate children behind `initialized`.
  // PHProvider is safe to render before posthog.init() completes; it holds
  // calls in a queue and flushes them once the SDK is ready.
  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  );
}
