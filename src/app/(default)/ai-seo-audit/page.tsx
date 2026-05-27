import React from "react";
import Link from "next/link";
import Image from "next/image";

// fonts
import { fonts } from "~/fonts";

// utils
import { generateSeo } from "~/utils/generateSeo";

// static
export const dynamic = "force-static";

// components
import { AiSeoAuditForm } from "~/components/form";
import { Button } from "~/components/ui/button";
import { servicePageBannerImage } from "public/assets/static";

// ─── metadata ────────────────────────────────────────────────────────────────

export const generateMetadata = () =>
  generateSeo({
    title: "Free AI SEO Audit",
    description:
      "Request a free, AI-powered SEO audit for your business website. Get actionable insights to grow your organic traffic.",
    url: "/ai-seo-audit",
  });

// ─── static benefit cards ─────────────────────────────────────────────────────

const BENEFITS = [
  {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    title: "Technical SEO Analysis",
    description:
      "We crawl your site for speed issues, broken links, indexability problems, and Core Web Vitals gaps.",
  },
  {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    title: "Keyword & Content Gaps",
    description:
      "Discover high-intent keywords your competitors rank for—and where your content is missing the mark.",
  },
  {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "AI & LLM Visibility",
    description:
      "Find out if ChatGPT, Gemini, and AI Overviews are citing your brand—and how to improve your AEO/GEO presence.",
  },
  {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
    title: "Actionable Report",
    description:
      "You get a prioritised, plain-English report—no jargon—with clear next steps you can act on immediately.",
  },
];

// ─── page ─────────────────────────────────────────────────────────────────────

const AiSeoAuditPage: React.FC = () => {
  return (
    <>
      {/* ── Hero Banner ── */}
      <div
        data-container
        className="relative flex h-[80vh] w-full flex-col items-center justify-center bg-gradient-to-r from-[#0c1323] to-[#1e2f45]"
      >
        <Image
          src={servicePageBannerImage}
          alt="AI SEO Audit"
          fill
          className="w-full object-cover opacity-40"
        />
        <div className="z-10 flex flex-col items-center gap-3 px-4 text-center">
          <h1 className="text-[40px] font-bold leading-tight text-white lg:text-[54px] xl:text-[64px]">
            Get Your Free AI SEO Audit
          </h1>
          <p className="max-w-xl text-base font-light text-white/80 sm:text-lg">
            Find out exactly why your site isn&apos;t ranking and what to do
            about it. Powered by AI, delivered by experts.
          </p>
          <Button variant="brand" asChild className="z-10 mt-2">
            <Link href="#audit-form">Request My Free Audit</Link>
          </Button>
        </div>
      </div>

      {/* ── What's Included ── */}
      <div data-container className="w-full bg-[#f9f9f9] py-[60px]">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className={`${fonts.bebas_neue.className} text-[36px] font-bold leading-tight lg:text-[44px]`}
          >
            What&apos;s <span className="text-brand">Inside</span> Your Audit?
          </h2>
          <p className="mt-3 text-base text-body-muted">
            Our AI-powered audit covers the four pillars that actually move the
            needle on organic growth.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                {b.icon}
              </div>
              <h3 className="mb-1 font-semibold text-gray-900">{b.title}</h3>
              <p className="text-sm leading-relaxed text-body-muted">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Form Section ── */}
      <div
        data-container
        className="flex w-full flex-col gap-[50px] bg-white py-[60px] md:flex-row md:items-start"
      >
        {/* Left — copy */}
        <div className="w-full md:max-w-[420px]">
          <h2
            className={`${fonts.bebas_neue.className} text-[38px] font-bold leading-tight lg:text-[46px]`}
          >
            Ready to <span className="text-brand">Outrank</span> Your
            Competition?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-body-muted">
            Fill in the form and our team will prepare a personalised SEO audit
            report for your site—completely free. We&apos;ll email it to you
            within 2 business days.
          </p>

          {/* Trust signals */}
          <ul className="mt-6 space-y-3">
            {[
              "No sales call required",
              "Delivered within 2 business days",
              "Real insights, not generic advice",
              "Covers technical, content & AI visibility",
            ].map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <svg
                  className="h-4 w-4 flex-shrink-0 text-brand"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — form card */}
        <div
          id="audit-form"
          className="w-full rounded-xl border bg-white p-6 shadow-sm"
        >
          <h3 className="mb-1 text-lg font-semibold text-gray-900">
            Request Your Free SEO Audit
          </h3>
          <p className="mb-5 text-sm text-body-muted">
            Takes less than 2 minutes to fill in.
          </p>
          <AiSeoAuditForm />
        </div>
      </div>
    </>
  );
};

export default AiSeoAuditPage;
