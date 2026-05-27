import { NextResponse } from "next/server";
import { env } from "~/env";
import { aiSeoAuditFormSchema } from "~/schema/aiSeoAudit_form.schema";

// ─── helpers ────────────────────────────────────────────────────────────────

function formatDate(d: Date): string {
  // "20 June, 2026"
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(d: Date): string {
  // "10:03 AM"
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

async function getAccessToken(): Promise<string> {
  // Build a JWT and exchange for an OAuth2 access token using the
  // service-account credentials stored in env vars.
  const serviceAccountEmail = env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
  const rawKey = env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n");

  const now = Math.floor(Date.now() / 1000);

  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: serviceAccountEmail,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const encode = (obj: object) =>
    Buffer.from(JSON.stringify(obj))
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

  const unsignedToken = `${encode(header)}.${encode(payload)}`;

  // Import the RSA private key
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

  const signedToken = `${unsignedToken}.${Buffer.from(signature)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")}`;

  // Exchange JWT for access token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: signedToken,
    }),
  });

  const tokenData = (await tokenRes.json()) as { access_token: string };
  return tokenData.access_token;
}

// ─── route handler ───────────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    const parsed = aiSeoAuditFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { name, email, companyWebsite, companyDescription, seoGoals } =
      parsed.data;

    const now = new Date();
    const date = formatDate(now);
    const time = formatTime(now);

    const accessToken = await getAccessToken();

    const SPREADSHEET_ID = env.GOOGLE_SPREADSHEET_ID!;
    const RANGE = "Sheet1!A:G"; // date | time | name | email | website | description | goals

    const appendRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}:append?valueInputOption=USER_ENTERED`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [
            [
              date,
              time,
              name,
              email,
              companyWebsite,
              companyDescription,
              seoGoals,
            ],
          ],
        }),
      },
    );

    if (!appendRes.ok) {
      const errText = await appendRes.text();
      console.error("Sheets API error:", errText);
      return NextResponse.json(
        { error: "Failed to record submission" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("ai-seo-audit route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
