"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import {
  COOKIE_CONSENT_OPEN_EVENT,
  getStoredCookieConsent,
  hasGlobalPrivacyControl,
  saveCookieConsent,
} from "~/utils/cookieConsent";

type View = "banner" | "preferences";

export function CookieConsentBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<View>("banner");
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const existingConsent = getStoredCookieConsent();

    if (existingConsent) {
      setAnalyticsEnabled(existingConsent.analytics);
      return;
    }

    if (hasGlobalPrivacyControl()) {
      saveCookieConsent(false);
      return;
    }

    setIsOpen(true);
  }, []);

  useEffect(() => {
    function openPreferences() {
      const existingConsent = getStoredCookieConsent();
      setAnalyticsEnabled(existingConsent?.analytics ?? false);
      setView("preferences");
      setIsOpen(true);
    }

    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, openPreferences);
    return () =>
      window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, openPreferences);
  }, []);

  function acceptAll() {
    saveCookieConsent(true);
    setAnalyticsEnabled(true);
    setIsOpen(false);
    setView("banner");
  }

  function rejectAnalytics() {
    saveCookieConsent(false);
    setAnalyticsEnabled(false);
    setIsOpen(false);
    setView("banner");
  }

  function savePreferences() {
    saveCookieConsent(analyticsEnabled);
    setIsOpen(false);
    setView("banner");
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[9999] border-t border-slate-200 bg-white p-4 text-slate-900 shadow-2xl md:p-6"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p
            id="cookie-consent-title"
            className="text-base font-semibold text-slate-950"
          >
            We use cookies and analytics
          </p>

          {view === "banner" ? (
            <p className="mt-2 text-sm leading-6 text-slate-700">
              We use necessary storage to run the site and optional analytics
              through PostHog to understand page views, clicks, form journeys,
              heatmaps, and session recordings. You can accept, reject, or
              manage analytics preferences. Read our{" "}
              <Link
                href="/policies/cookie-policy"
                className="font-medium underline underline-offset-2"
              >
                Cookie Policy
              </Link>{" "}
              for details.
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              <div className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold">Necessary cookies</p>
                    <p className="mt-1 text-sm leading-6 text-slate-700">
                      Required for basic site functionality and to remember your
                      cookie choice. These are always on.
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    Always on
                  </span>
                </div>
              </div>

              <label className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-slate-200 p-4">
                <span>
                  <span className="block text-sm font-semibold">
                    Analytics cookies
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-slate-700">
                    Allows PostHog analytics, heatmaps, and production session
                    recording so we can improve the website.
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(event) =>
                    setAnalyticsEnabled(event.currentTarget.checked)
                  }
                  className="mt-1 h-5 w-5 accent-[#0D7A9E]"
                />
              </label>
            </div>
          )}
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col lg:flex-row">
          {view === "banner" ? (
            <>
              <Button variant="outline" onClick={rejectAnalytics}>
                Only Necessary Cookies
              </Button>
              <Button variant="outline" onClick={() => setView("preferences")}>
                Manage choices
              </Button>
              <Button
                className="bg-[#0D7A9E] text-white hover:bg-[#0b6c8c]"
                onClick={acceptAll}
              >
                Accept all
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={rejectAnalytics}>
                Only Necessary Cookies
              </Button>
              <Button
                className="bg-[#0D7A9E] text-white hover:bg-[#0b6c8c]"
                onClick={savePreferences}
              >
                Save choices
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
