"use client";

import posthog from "posthog-js";
import { getStoredCookieConsent } from "./cookieConsent";

/**
 * Thin, typed wrapper over posthog-js for semantic journey events.
 *
 * Autocapture already records raw clicks/inputs, but these named events give
 * the SEO/marketing team a clean funnel: which CTAs are clicked, which forms
 * are started vs. submitted, and where users drop off.
 *
 * Safe to call before PostHog finishes loading — calls queue and flush on init.
 */

export type AnalyticsEvent =
  // Navigation / engagement
  | "cta_click"
  | "outbound_link_click"
  | "scroll_depth"
  // AI SEO audit funnel
  | "audit_form_started"
  | "audit_otp_requested"
  | "audit_otp_verified"
  | "audit_submitted"
  | "audit_failed"
  // Contact funnel
  | "contact_form_started"
  | "contact_submitted"
  | "contact_failed";

function canUseAnalytics(): boolean {
  return getStoredCookieConsent()?.analytics === true && posthog.__loaded;
}

export function track(
  event: AnalyticsEvent,
  properties?: Record<string, unknown>,
): void {
  if (typeof window === "undefined" || !canUseAnalytics()) return;
  posthog.capture(event, properties);
}

/** Associate the current session with a known person (e.g. after a form submit). */
export function identify(
  email: string,
  properties?: Record<string, unknown>,
): void {
  if (typeof window === "undefined" || !email || !canUseAnalytics()) return;
  posthog.identify(email, properties);
}

/** Reset identity (e.g. on logout). Rarely needed on a marketing site. */
export function resetAnalytics(): void {
  if (typeof window === "undefined" || !posthog.__loaded) return;
  posthog.reset();
}
