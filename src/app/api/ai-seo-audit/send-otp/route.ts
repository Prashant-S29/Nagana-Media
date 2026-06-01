import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import { render } from "@react-email/components";
import { env } from "~/env";
import { aiSeoAuditFormSchema } from "~/schema/aiSeoAudit_form.schema";
import { OtpEmail } from "~/components/emails/OtpEmail";

const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

const resend = new Resend(env.RESEND_API_KEY);

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

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

    const { name, email } = parsed.data;

    const otp = generateOtp();

    // Store OTP + full form payload in Redis with 5 min TTL
    // Key: otp:<email>
    await redis.set(
      `otp:${email}`,
      JSON.stringify({ otp, formData: parsed.data }),
      { ex: 300 }, // 300 seconds = 5 minutes
    );

    // Send OTP email
    const { error: resendError } = await resend.emails.send({
      from: "Nagana Media <info@naganamedia.com>",
      to: email,
      subject: "Your verification code | Nagana Media",
      react: OtpEmail({ name, otp }),
    });

    if (resendError) {
      console.error("Resend OTP error:", resendError);
      return NextResponse.json(
        { error: "Failed to send OTP email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("send-otp route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
