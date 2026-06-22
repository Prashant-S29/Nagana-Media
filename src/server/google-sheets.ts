import "server-only";
import { env } from "~/env";

/**
 * Shared Google Sheets helper.
 *
 * Auth uses a service-account JWT signed with the Web Crypto API (no googleapis
 * dependency) so it runs on the Edge/Node runtime alike. Both the AI SEO audit
 * flow and the contact form append rows through `appendToSheet`.
 */

let cachedToken: { token: string; expiresAt: number } | null = null;

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

/**
 * Obtain (and briefly cache) a Google OAuth access token scoped to Sheets.
 */
export async function getAccessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  // Reuse a still-valid token (60s safety margin) to avoid re-signing per call.
  if (cachedToken && cachedToken.expiresAt > now + 60) {
    return cachedToken.token;
  }

  const serviceAccountEmail = env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");

  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: serviceAccountEmail,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const unsignedToken = `${base64url(JSON.stringify(header))}.${base64url(
    JSON.stringify(payload),
  )}`;

  const pemContents = rawKey
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s/g, "");

  const binaryKey = Buffer.from(pemContents, "base64");

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    Buffer.from(unsignedToken),
  );

  const signedToken = `${unsignedToken}.${base64url(Buffer.from(signature))}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: signedToken,
    }),
  });

  if (!tokenRes.ok) {
    const errText = await tokenRes.text();
    throw new Error(`Google token exchange failed: ${errText}`);
  }

  const tokenData = (await tokenRes.json()) as {
    access_token: string;
    expires_in: number;
  };

  cachedToken = {
    token: tokenData.access_token,
    expiresAt: now + (tokenData.expires_in ?? 3600),
  };

  return tokenData.access_token;
}

/**
 * Append a single row to a tab of the configured spreadsheet.
 *
 * @param tab  The sheet/tab name, e.g. "ai-seo-audit" or "contacts".
 * @param row  Cell values for the row, left-to-right.
 */
export async function appendToSheet(
  tab: string,
  row: (string | number)[],
): Promise<void> {
  const accessToken = await getAccessToken();
  const spreadsheetId = env.GOOGLE_SPREADSHEET_ID;
  // Quote the tab name so names containing spaces/dashes are handled correctly.
  const range = `${encodeURIComponent(`'${tab}'!A:Z`)}`;

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    },
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Sheets append failed (${tab}): ${errText}`);
  }
}

/** Format a Date as "1 January 2026" (en-GB). */
export function formatSheetDate(d: Date): string {
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Format a Date as "02:05 PM" (en-US). */
export function formatSheetTime(d: Date): string {
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
