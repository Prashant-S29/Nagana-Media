import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import { render } from "@react-email/components";
import { z } from "zod";
import { env } from "~/env";
import { aiSeoAuditFormSchema } from "~/schema/aiSeoAudit_form.schema";
import { AiSeoAuditEmail } from "~/components/emails/AiSeoAuditEmail";

const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

const resend = new Resend(env.RESEND_API_KEY);

const verifySchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

// ─── helpers (same as before) ────────────────────────────────────────────────

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(d: Date): string {
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

async function getAccessToken(): Promise<string> {
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
    const parsed = verifySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { email, otp } = parsed.data;

    // ─── 1. Retrieve & verify OTP from Redis ─────────────────────────────

    const stored = await redis.get<{ otp: string; formData: unknown }>(
      `otp:${email}`,
    );

    if (!stored) {
      return NextResponse.json(
        { error: "OTP expired or not found. Please request a new one." },
        { status: 400 },
      );
    }

    const { otp: storedOtp, formData } = stored;

    if (otp !== storedOtp) {
      return NextResponse.json(
        { error: "Incorrect OTP. Please try again." },
        { status: 400 },
      );
    }

    // Parse and validate the stored form data
    const formParsed = aiSeoAuditFormSchema.safeParse(formData);
    if (!formParsed.success) {
      return NextResponse.json(
        { error: "Stored form data is invalid." },
        { status: 400 },
      );
    }

    const { name, companyWebsite, companyDescription, seoGoals } =
      formParsed.data;

    // ─── 2. Delete OTP from Redis (one-time use) ──────────────────────────

    await redis.del(`otp:${email}`);

    // ─── 3. Append to Google Sheet ────────────────────────────────────────

    const now = new Date();
    const date = formatDate(now);
    const time = formatTime(now);

    const accessToken = await getAccessToken();
    const SPREADSHEET_ID = env.GOOGLE_SPREADSHEET_ID!;
    const RANGE = "Sheet1!A:G";

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

    const { error: resendError } = await resend.emails.send({
      from: "Nagana Media <info@naganamedia.com>",
      to: email,
      subject: "We've received your AI SEO Audit request - Nagana Media",
      react: AiSeoAuditEmail({ name, companyWebsite }),
    });

    if (resendError) {
      console.error("Resend confirmation error:", resendError);
      // Non-blocking - sheet already saved, don't fail the request
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("verify-otp route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
