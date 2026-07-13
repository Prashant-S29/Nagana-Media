"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { CookieConsentBanner } from "~/components/common/CookieConsentBanner";
import { env } from "~/env";
import {
  COOKIE_CONSENT_CHANGED_EVENT,
  type CookieConsent,
  getStoredCookieConsent,
} from "~/utils/cookieConsent";
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
// PostHog is non-essential analytics, so it is not initialised until the visitor
// accepts analytics cookies/tracking in the consent banner.
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [analyticsConsent, setAnalyticsConsent] = useState<boolean | null>(
    null,
  );

  const enablePostHog = useCallback(() => {
    if (posthog.__loaded) {
      posthog.opt_in_capturing();
      return;
    }

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

  useEffect(() => {
    const storedConsent = getStoredCookieConsent();
    setAnalyticsConsent(storedConsent?.analytics ?? false);
  }, []);

  useEffect(() => {
    function onConsentChanged(event: Event) {
      const consent = (event as CustomEvent<CookieConsent>).detail;
      setAnalyticsConsent(consent.analytics);
    }

    window.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, onConsentChanged);
    return () =>
      window.removeEventListener(
        COOKIE_CONSENT_CHANGED_EVENT,
        onConsentChanged,
      );
  }, []);

  useEffect(() => {
    if (analyticsConsent === true) {
      enablePostHog();
      return;
    }

    if (analyticsConsent === false && posthog.__loaded) {
      posthog.opt_out_capturing();
      posthog.stopSessionRecording();
      posthog.reset();
    }
  }, [analyticsConsent, enablePostHog]);

  return (
    <PHProvider client={posthog}>
      {analyticsConsent === true ? (
        <>
          <PostHogPageView />
          <AnalyticsListeners />
        </>
      ) : null}
      {children}
      <CookieConsentBanner />
    </PHProvider>
  );
}
