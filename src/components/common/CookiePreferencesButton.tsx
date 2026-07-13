"use client";

import { openCookiePreferences } from "~/utils/cookieConsent";

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      className="text-left text-xs text-white/70 hover:text-white hover:underline"
      onClick={openCookiePreferences}
    >
      Cookie preferences
    </button>
  );
}
