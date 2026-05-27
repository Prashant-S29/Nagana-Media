"use client";

import React, { useState } from "react";
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

type Status = "idle" | "loading" | "success" | "error";

export const AiSeoAuditForm: React.FC = () => {
  const [status, setStatus] = useState<Status>("idle");

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

  const onSubmit = async (values: AiSeoAuditFormValues) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/ai-seo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Submission failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
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
          Thank you! We&apos;ve received your SEO audit request and will send
          your personalised report shortly.
        </p>
        <Button variant="brand" onClick={() => setStatus("idle")}>
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
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

        {/* Email */}
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

        {/* Company Website */}
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

        {/* Company Description */}
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

        {/* SEO Goals */}
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

        {status === "error" && (
          <p className="text-sm text-red-500">
            Something went wrong. Please try again or email us directly.
          </p>
        )}

        <Button
          variant="brand"
          type="submit"
          className="w-full"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Submitting..." : "Request My Free SEO Audit"}
        </Button>
      </form>
    </Form>
  );
};
