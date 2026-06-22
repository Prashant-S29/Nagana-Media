"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { env } from "~/env";
import { AnalyticsListeners } from "./AnalyticsListeners";

// ─── Page-view tracker ───────────────────────────────────────────────────────
// We capture pageviews manually because the App Router does client-side
// navigations that PostHog's default listener can miss. Wrapped in its own
// component so the `useSearchParams` Suspense requirement stays isolated.
function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || !posthog.__loaded) return;

    let url = window.location.origin + pathname;
    const search = searchParams.toString();
    if (search) url += `?${search}`;

    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}

// ─── Provider ────────────────────────────────────────────────────────────────
// Standard, direct initialisation. The previous version proxied through a
// `/ingest` rewrite and deferred init by 3s via requestIdleCallback, which
// prevented events from ever reaching the dashboard. We now init immediately
// against the configured PostHog host with autocapture + session replay on.
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (posthog.__loaded) return; // strict-mode double-invoke guard

    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
      ui_host: "https://us.posthog.com",
      // Autocapture clicks / inputs / form submits for journey analysis.
      autocapture: true,
      // We fire pageviews manually in PostHogPageView; capture leaves so we
      // can measure time-on-page and drop-off.
      capture_pageview: false,
      capture_pageleave: true,
      person_profiles: "identified_only",
      disable_surveys: true,
      // Record sessions in production only (avoids noise from local dev).
      disable_session_recording: process.env.NODE_ENV !== "production",
      enable_heatmaps: true,
      loaded: (ph) => {
        if (process.env.NODE_ENV === "development") ph.debug();
      },
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      <AnalyticsListeners />
      {children}
    </PHProvider>
  );
}
