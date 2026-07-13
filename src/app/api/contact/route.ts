import { NextResponse } from "next/server";
import { Resend } from "resend";
import { env } from "~/env";
import { contactFormSchema } from "~/schema/contact_form.schema";
import {
  appendToSheet,
  formatSheetDate,
  formatSheetTime,
} from "~/server/google-sheets";

const resend = new Resend(env.RESEND_API_KEY);

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form and try again." },
        { status: 400 },
      );
    }

    const { name, email, company, phone, message } = parsed.data;

    // ─── 1. Append to Google Sheet ("contacts" tab) ───────────────────────
    const now = new Date();

    try {
      await appendToSheet("contacts", [
        formatSheetDate(now),
        formatSheetTime(now),
        name,
        email,
        company ?? "",
        phone ?? "",
        message,
      ]);
    } catch (sheetErr) {
      console.error("Sheets API error (contacts):", sheetErr);
      return NextResponse.json(
        { error: "Failed to record your message. Please try again." },
        { status: 500 },
      );
    }

    // ─── 2. Notify the team (non-blocking) ────────────────────────────────
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = company ? escapeHtml(company) : "—";
    const safePhone = phone ? escapeHtml(phone) : "—";
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

    const { error: notifyError } = await resend.emails.send({
      from: "Nagana Media <info@naganamedia.com>",
      to: "contact@naganamedia.com",
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      html: `
        <h2>New contact enquiry</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Company:</strong> ${safeCompany}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    if (notifyError) {
      // Sheet already saved — don't fail the request on email issues.
      console.error("Resend contact notification error:", notifyError);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("contact route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
