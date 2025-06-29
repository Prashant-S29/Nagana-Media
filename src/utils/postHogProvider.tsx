"use client";

import { useEffect } from "react";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { env } from "~/env";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      person_profiles: "identified_only",
      defaults: "2025-05-24",
      enable_heatmaps: true,
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
