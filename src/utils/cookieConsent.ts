export type CookieConsent = {
  necessary: true;
  analytics: boolean;
  updatedAt: string;
  version: 1;
};

export const COOKIE_CONSENT_STORAGE_KEY = "nagana_cookie_consent";
export const COOKIE_CONSENT_OPEN_EVENT = "nagana:open-cookie-preferences";
export const COOKIE_CONSENT_CHANGED_EVENT = "nagana:cookie-consent-changed";

export function getStoredCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<CookieConsent>;
    if (parsed.necessary !== true || typeof parsed.analytics !== "boolean") {
      return null;
    }

    return {
      necessary: true,
      analytics: parsed.analytics,
      updatedAt:
        typeof parsed.updatedAt === "string"
          ? parsed.updatedAt
          : new Date().toISOString(),
      version: 1,
    };
  } catch {
    return null;
  }
}

export function saveCookieConsent(analytics: boolean): CookieConsent {
  const consent: CookieConsent = {
    necessary: true,
    analytics,
    updatedAt: new Date().toISOString(),
    version: 1,
  };

  window.localStorage.setItem(
    COOKIE_CONSENT_STORAGE_KEY,
    JSON.stringify(consent),
  );
  window.dispatchEvent(
    new CustomEvent<CookieConsent>(COOKIE_CONSENT_CHANGED_EVENT, {
      detail: consent,
    }),
  );

  return consent;
}

export function openCookiePreferences(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(COOKIE_CONSENT_OPEN_EVENT));
}

export function hasGlobalPrivacyControl(): boolean {
  if (typeof navigator === "undefined") return false;
  return (
    "globalPrivacyControl" in navigator &&
    (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl === true
  );
}
