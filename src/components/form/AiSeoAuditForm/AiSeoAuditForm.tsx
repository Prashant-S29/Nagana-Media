"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  aiSeoAuditFormSchema,
  type AiSeoAuditFormValues,
} from "~/schema/aiSeoAudit_form.schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { track, identify } from "~/utils/analytics";

type Step = "form" | "otp" | "success";

export const AiSeoAuditForm: React.FC = () => {
  const [step, setStep] = useState<Step>("form");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const form = useForm<AiSeoAuditFormValues>({
    resolver: zodResolver(aiSeoAuditFormSchema),
    defaultValues: {
      name: "",
      email: "",
      companyWebsite: "",
      companyDescription: "",
      seoGoals: "",
    },
  });

  // Countdown timer for resend cooldown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  // Fire once when the user first reaches the form (funnel entry point).
  useEffect(() => {
    track("audit_form_started");
  }, []);

  // ─── Step 1: Submit form → send OTP ──────────────────────────────────────

  const onSubmit = async (values: AiSeoAuditFormValues) => {
    setFormLoading(true);
    setFormError("");
    try {
      const res = await fetch("/api/ai-seo-audit/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Something went wrong");
      }

      setSubmittedEmail(values.email);
      setSubmittedName(values.name);
      setResendCooldown(30);
      setStep("otp");
      track("audit_otp_requested", { email: values.email });
    } catch (err) {
      track("audit_failed", { stage: "send-otp" });
      setFormError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setFormLoading(false);
    }
  };

  // ─── OTP input handlers ───────────────────────────────────────────────────

  const handleOtpChange = (index: number, value: string) => {
    // Allow only digits
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    setOtpError("");

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;
    const next = [...otp];
    pasted.split("").forEach((char, i) => {
      if (i < 6) next[i] = char;
    });
    setOtp(next);
    // Focus last filled or last box
    const focusIndex = Math.min(pasted.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  // ─── Step 2: Verify OTP ───────────────────────────────────────────────────

  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      setOtpError("Please enter the full 6-digit code.");
      return;
    }

    setOtpLoading(true);
    setOtpError("");

    try {
      const res = await fetch("/api/ai-seo-audit/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: submittedEmail, otp: otpValue }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Verification failed");
      }

      identify(submittedEmail, { name: submittedName });
      track("audit_otp_verified", { email: submittedEmail });
      track("audit_submitted", { email: submittedEmail });
      setStep("success");
    } catch (err) {
      track("audit_failed", { stage: "verify-otp" });
      setOtpError(
        err instanceof Error
          ? err.message
          : "Verification failed. Please try again.",
      );
      // Clear OTP boxes on wrong code
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setOtpLoading(false);
    }
  };

  // ─── Resend OTP ───────────────────────────────────────────────────────────

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setOtpError("");
    setOtp(["", "", "", "", "", ""]);

    try {
      const res = await fetch("/api/ai-seo-audit/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form.getValues()),
      });
      if (!res.ok) throw new Error();
      setResendCooldown(30);
      inputRefs.current[0]?.focus();
    } catch {
      setOtpError("Failed to resend code. Please try again.");
    }
  };

  // ─── Success ──────────────────────────────────────────────────────────────

  if (step === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">
          Request Submitted!
        </h3>
        <p className="max-w-sm text-sm text-gray-500">
          Thank you, {submittedName}! We&apos;ve received your AI SEO Audit
          request and will send your personalised report to{" "}
          <span className="font-medium text-gray-700">{submittedEmail}</span>{" "}
          within 7 business days.
        </p>
        <Button
          variant="brand"
          onClick={() => {
            setStep("form");
            setOtp(["", "", "", "", "", ""]);
            form.reset();
          }}
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  // ─── OTP Step ─────────────────────────────────────────────────────────────

  if (step === "otp") {
    return (
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Check your email
          </h3>
          <p className="mt-1 text-sm text-body-muted">
            We sent a 6-digit code to{" "}
            <span className="font-medium text-gray-700">{submittedEmail}</span>.
            Enter it below to confirm your request. The code expires in 5
            minutes.
          </p>
        </div>

        {/* OTP boxes */}
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(index, e)}
              onPaste={index === 0 ? handleOtpPaste : undefined}
              className={`h-12 w-12 rounded-lg border-2 text-center text-lg font-bold text-gray-900 outline-none transition-colors focus:border-brand ${
                otpError ? "border-red-400" : "border-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Error */}
        {otpError && (
          <p className="text-center text-sm text-red-500">{otpError}</p>
        )}

        {/* Verify button */}
        <Button
          variant="brand"
          className="w-full"
          onClick={handleVerifyOtp}
          disabled={otpLoading || otp.join("").length < 6}
        >
          {otpLoading ? "Verifying..." : "Verify & Submit Request"}
        </Button>

        {/* Resend + back */}
        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={() => setStep("form")}
            className="text-gray-400 hover:text-gray-600"
          >
            ← Edit details
          </button>
          <button
            type="button"
            onClick={handleResend}
            disabled={resendCooldown > 0}
            className="text-brand hover:underline disabled:cursor-not-allowed disabled:opacity-50"
          >
            {resendCooldown > 0
              ? `Resend code in ${resendCooldown}s`
              : "Resend code"}
          </button>
        </div>
      </div>
    );
  }

  // ─── Form Step ────────────────────────────────────────────────────────────

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@company.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyWebsite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Website</FormLabel>
              <FormControl>
                <Input placeholder="https://yourcompany.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your company about?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your business, industry, target audience..."
                  className="min-h-[100px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="seoGoals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What are your goals with this SEO audit?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g. Improve organic traffic, rank for specific keywords, fix technical issues..."
                  className="min-h-[100px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {formError && <p className="text-sm text-red-500">{formError}</p>}

        <p className="text-xs leading-5 text-gray-500">
          By continuing, you agree that Nagana Media may use your details and
          website information to prepare and send your AI SEO audit. See our{" "}
          <Link
            href="/policies/privacy-policy"
            className="font-medium text-gray-700 underline underline-offset-2"
          >
            Privacy Policy
          </Link>
          .
        </p>

        <Button
          variant="brand"
          type="submit"
          className="w-full"
          disabled={formLoading}
        >
          {formLoading ? "Sending code..." : "Continue →"}
        </Button>
      </form>
    </Form>
  );
};
