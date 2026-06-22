import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import { z } from "zod";
import { env } from "~/env";
import { aiSeoAuditFormSchema } from "~/schema/aiSeoAudit_form.schema";
import { AiSeoAuditEmail } from "~/components/emails/AiSeoAuditEmail";
import {
  appendToSheet,
  formatSheetDate,
  formatSheetTime,
} from "~/server/google-sheets";

const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

const resend = new Resend(env.RESEND_API_KEY);

const verifySchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

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

    // ─── 3. Append to Google Sheet ("ai-seo-audit" tab) ───────────────────

    const now = new Date();

    try {
      await appendToSheet("ai-seo-audit", [
        formatSheetDate(now),
        formatSheetTime(now),
        name,
        email,
        companyWebsite,
        companyDescription,
        seoGoals,
      ]);
    } catch (sheetErr) {
      console.error("Sheets API error:", sheetErr);
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
