import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  Layers3,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";

import { fonts } from "~/fonts";
import { getAllPosts } from "~/utils/api";

export const dynamic = "force-static";

const baseUrl = "https://www.naganamedia.com";

export const metadata: Metadata = {
  title: {
    absolute:
      "Nagana Media - AI-Powered GTM Intelligence for B2B Technology Companies",
  },
  description:
    "Nagana Media helps B2B technology companies win visibility across AI search, answer engines, and LLMs - with GTM strategy, AEO, GEO, and content systems built for how buyers research in 2026.",
  keywords: [
    "B2B AI marketing agency",
    "AI SEO",
    "AEO",
    "GEO",
    "GTM strategy",
    "generative engine optimization",
    "answer engine optimization",
    "B2B content strategy",
    "AI search visibility",
    "LLM optimization",
  ],
  alternates: { canonical: baseUrl },
  openGraph: {
    title: "Nagana Media - AI-Powered GTM Intelligence for B2B Technology",
    description:
      "Nagana Media helps B2B technology companies win visibility across AI search, answer engines, and LLMs.",
    type: "website",
    url: baseUrl,
    siteName: "Nagana Media",
    images: [{ url: `${baseUrl}/opengraph.webp`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nagana Media - AI-Powered GTM Intelligence",
    description:
      "Win visibility across AI search, answer engines, and LLMs with Nagana Media.",
    images: [`${baseUrl}/opengraph.webp`],
  },
};

const tickerItems = [
  "AEO - Answer Engine Optimization",
  "GEO - Generative Engine Optimization",
  "AI Search Visibility",
  "B2B GTM Strategy",
  "Sales Enablement",
  "Content Systems",
  "LLM Optimization",
  "AI Overviews",
];

const industries = [
  "SaaS",
  "Fintech",
  "iPaaS",
  "ERP",
  "CRM",
  "Supply Chain",
  "Identity Tech",
];

const problemCards = [
  {
    icon: Clock3,
    title: "AI Shortlisting Is Already Happening",
    body: "B2B buyers use ChatGPT and Perplexity to build vendor shortlists before visiting any website. If your brand doesn't appear in those responses, you're not in the evaluation.",
  },
  {
    icon: Target,
    title: "Complex Products Get Misunderstood",
    body: "When your value proposition is unclear, AI systems can't accurately represent your brand. Buyers don't get the right answer - and neither does the AI.",
  },
  {
    icon: Layers3,
    title: "Fragmented Marketing Loses Deals",
    body: "Disconnected content, inconsistent messaging, and gaps in the buyer journey mean qualified leads drop off before they ever reach sales.",
  },
  {
    icon: Workflow,
    title: "Long Sales Cycles Drain Resources",
    body: "Without strong AI visibility and clear buyer enablement content, every sales cycle starts from scratch. Education that should happen before the first call happens on it instead.",
  },
];

const costItems = [
  {
    number: "01",
    label: "Lost Shortlist Positions",
    body: "Every buyer prompt that returns a competitor and not you is a shortlist position handed over. These accumulate silently across hundreds of buyer queries per month.",
  },
  {
    number: "02",
    label: "Reduced Organic Reach",
    body: "Google's AI Overviews now sit above organic results. Being invisible in AI Overviews means your page-one ranking delivers fewer clicks than it did twelve months ago.",
  },
  {
    number: "03",
    label: "Longer Buyer Education",
    body: "Without AI-cited content, buyers arrive under-informed. Sales teams spend the first two calls doing education that structured content should have handled.",
  },
  {
    number: "04",
    label: "Competitor Compounding",
    body: "Every month your competitors are cited and you aren't, their AI authority deepens. The gap closes slowly and expensively.",
  },
];

const capabilities = [
  {
    title: "AI Search Visibility",
    body: "AEO, GEO, entity SEO, schema markup, llms.txt, and AI citation auditing across all six major AI platforms.",
  },
  {
    title: "GTM Intelligence",
    body: "Positioning strategy, ICP messaging, competitive analysis, and go-to-market frameworks that align sales and marketing.",
  },
  {
    title: "Content Systems",
    body: "High-intent blog content, pillar pages, case studies, and thought leadership structured for AI citation and buyer questions.",
  },
  {
    title: "Sales Enablement",
    body: "Pitch decks, one-pagers, battle cards, product narratives, and proposal frameworks that help your sales team close faster.",
  },
];

const framework = [
  {
    stage: "Stage 01",
    title: "Discover",
    body: "AI visibility audit across six platforms. ICP prompt testing. Competitor citation mapping. Entity and schema analysis. Technical crawlability review.",
    tags: ["AI Citation Audit", "ICP Mapping", "Competitor Analysis"],
  },
  {
    stage: "Stage 02",
    title: "Clarify",
    body: "Positioning sprint. Messaging architecture. Value proposition refinement. ICP narrative definition. We establish exactly how AI systems should represent your brand.",
    tags: ["Positioning", "Messaging", "GTM Strategy"],
  },
  {
    stage: "Stage 03",
    title: "Activate",
    body: "Content production. Schema implementation. llms.txt deployment. Sales asset creation. Campaign execution - built to be found, cited, and acted on.",
    tags: ["AEO Content", "Sales Assets", "Schema & Tech"],
  },
  {
    stage: "Stage 04",
    title: "Scale",
    body: "Quarterly AI visibility re-audits. Content cluster expansion. Pipeline attribution tracking. Ongoing GTM refinement that compounds authority.",
    tags: ["Quarterly Audits", "Content Clusters", "Pipeline Tracking"],
  },
];

const services = [
  {
    icon: Sparkles,
    title: "AI Visibility & SEO",
    body: "Full-spectrum AI citation audits, AEO optimization, GEO strategy, schema markup, entity SEO, and llms.txt implementation.",
    href: "/ai-seo-audit",
    link: "Get a Free Audit →",
    tags: ["AEO", "GEO", "Entity SEO", "llms.txt"],
  },
  {
    icon: FileText,
    title: "Marketing Enablement",
    body: "High-intent B2B content, thought leadership, campaign assets, and digital marketing initiatives designed for AI citation and buyer journey coverage.",
    href: "/services/marketing-enablement",
    link: "Learn More →",
    tags: ["Content", "Campaigns", "Thought Leadership"],
  },
  {
    icon: Target,
    title: "Sales Enablement",
    body: "Pitch decks, one-pagers, battle cards, proposal frameworks, and product narratives that give your sales team everything they need to close faster.",
    href: "/services/sales-enablement",
    link: "Learn More →",
    tags: ["Pitch Decks", "Battle Cards", "Proposals"],
  },
  {
    icon: BarChart3,
    title: "GTM Strategy",
    body: "Go-to-market positioning, ICP definition, messaging architecture, and launch strategy for technology companies entering new markets.",
    href: "/services",
    link: "Learn More →",
    tags: ["Positioning", "ICP", "Launch Strategy"],
  },
  {
    icon: ShieldCheck,
    title: "Program Management",
    body: "End-to-end management of your digital marketing, content, and design programs so your initiatives ship on time.",
    href: "/services/program-management",
    link: "Learn More →",
    tags: ["Coordination", "Delivery", "Oversight"],
  },
];

const platforms = [
  ["ChatGPT", "Cited in vendor comparisons and category queries"],
  ["Perplexity", "Ranked in live deep-research answers"],
  ["Google AI Mode", "Featured in AI Overview blocks"],
  ["Claude", "Surfaced in technical and strategic queries"],
  ["Gemini", "Integrated across Google Search and Workspace"],
  ["Microsoft Copilot", "Present in enterprise buying research"],
];

const faqs = [
  {
    q: "What is Nagana Media?",
    a: "Nagana Media is a B2B technology marketing agency based in Jaipur, India. We specialize in AI-powered GTM intelligence - combining AEO, GEO, content strategy, and sales enablement to help technology companies win visibility across AI search platforms.",
  },
  {
    q: "What is AEO - Answer Engine Optimization?",
    a: "AEO structures content so it can be directly extracted and used as an answer by AI search tools and answer engines, including Google AI Overviews, Bing Copilot, and voice assistants.",
  },
  {
    q: "What is GEO - Generative Engine Optimization?",
    a: "GEO optimizes your content and brand presence so large language models including ChatGPT, Perplexity, Claude, and Gemini cite your brand and recommend your business in generated responses.",
  },
  {
    q: "What is the difference between AEO and GEO?",
    a: "AEO targets direct answer extraction. GEO targets brand citation in generative AI responses. Both are part of AI SEO and require overlapping but distinct optimization strategies.",
  },
  {
    q: "What does a Nagana Media AI visibility audit include?",
    a: "The free audit covers AI citation mapping across six platforms, competitor citation analysis, technical crawlability, schema and entity audit, content structure review, and a 90-day roadmap.",
  },
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nagana Media",
  alternateName: "Naganarai Media Tech Private Limited",
  url: baseUrl,
  description:
    "Nagana Media is a B2B technology marketing agency specializing in AI SEO, Answer Engine Optimization, Generative Engine Optimization, GTM strategy, and sales enablement.",
  foundingLocation: { "@type": "Place", name: "Jaipur, Rajasthan, India" },
  areaServed: "Worldwide",
  knowsAbout: [
    "AEO",
    "GEO",
    "AI SEO",
    "GTM Strategy",
    "B2B Content Marketing",
    "Sales Enablement",
    "LLM Optimization",
    "AI Search Visibility",
  ],
  sameAs: ["https://www.linkedin.com/company/nagana-media-tech/"],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={`${fonts.bebas_neue.className} mb-3 block text-sm tracking-[0.14em] text-[#0D7A9E]`}
    >
      {children}
    </span>
  );
}

function Tag({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex rounded px-2.5 py-1 text-xs tracking-[0.08em] ${dark ? "bg-white/10 text-[#B3E8F9]" : "bg-[#EAF8FD] text-[#0D7A9E]"}`}
    >
      {children}
    </span>
  );
}

const titleClass = `text-[34px] leading-[1.05] tracking-tight text-[#111827] md:text-[44px]`;
const containerClass = "mx-auto w-full container px-5 sm:px-8 lg:px-12";

const Home: React.FC = () => {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <JsonLdScript data={organizationJsonLd} />
      <JsonLdScript data={faqJsonLd} />

      <main id="main-content">
        <section className="bg-[#062D3A] pb-[150px] pt-[200px]">
          <div
            className={`${containerClass} pt-50 grid gap-12 lg:grid-cols-2 lg:gap-16`}
          >
            <div>
              <h1 className={`${titleClass} text-white`}>
                Complex technology
                <br />
                doesn't win&nbsp;
                <span className="text-brand">markets.</span> <br />
                Understanding does.
              </h1>
              <p className="mt-6 max-w-xl text-[17px] text-white/70">
                B2B technology buyers now research using AI. They ask ChatGPT,
                Perplexity, and Google AI Mode - and act on what those systems
                recommend. If your brand isn't in those answers, you don't exist
                in their evaluation.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  className="rounded-md bg-brand px-7 py-3 font-medium text-[#062D3A] hover:bg-brand"
                  href="/ai-seo-audit"
                >
                  Get a Free AI Visibility Audit
                </Link>
                <Link
                  className="rounded-md border border-white/50 px-7 py-3 font-medium text-white"
                  href="/services"
                >
                  Explore Services
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-brand/20 bg-brand/10 p-7 text-white">
                <p className="text-2xl font-semibold leading-snug">
                  Find out exactly where your brand is invisible to AI - across
                  every platform your buyers use.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    "ChatGPT",
                    "Perplexity",
                    "Claude",
                    "Google AI Mode",
                    "Gemini",
                    "Copilot",
                  ].map((platform) => (
                    <Tag key={platform} dark>
                      {platform}
                    </Tag>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  [
                    "Years of B2B Tech Experience",
                    "9+",
                    "SaaS, fintech, enterprise technology, and more",
                  ],
                  [
                    "AI Platforms Audited",
                    "6",
                    "ChatGPT, Perplexity, Claude, Gemini, AI Mode, Copilot",
                  ],
                  [
                    "Prompts Tested Per Audit",
                    "50+",
                    "Mapped to your ICP's real buyer queries",
                  ],
                  [
                    "Delivery",
                    "7",
                    "Business days. Full report. No boilerplate.",
                  ],
                ].map(([label, value, desc]) => (
                  <div
                    key={label}
                    className="rounded-lg border border-brand/20 p-5"
                  >
                    <p className={`text-4xl text-[#111827]`}>
                      <span className="text-brand">{value}</span>
                    </p>
                    <p className="mt-2 text-xs text-white/70">{label}</p>
                    <p className="text-xs text-white/70">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <div className={containerClass}>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className={titleClass}>The Resonance Framework</h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-body-muted">
                A four-stage system that takes B2B technology companies from
                unclear and invisible to authoritative and AI-cited.
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {framework.map((item, index) => (
                <article
                  key={item.title}
                  className="relative overflow-hidden rounded-xl border bg-white p-6 shadow-sm"
                >
                  <p
                    className={`${fonts.bebas_neue.className} text-7xl leading-none text-gray-200`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="relative text-xl font-semibold text-[#111827]">
                    {item.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-6 text-body-muted">
                    {item.body}
                  </p>
                  <div className="relative mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <div
            className={`${containerClass} grid gap-12 lg:grid-cols-2 lg:gap-16`}
          >
            <div>
              <h2 className={titleClass}>
                We make B2B technology companies{" "}
                <span className="text-brand">
                  visible, understood, and chosen
                </span>
              </h2>
              <div className="mt-6 space-y-5 text-base text-[#374151]">
                <p>
                  Nagana Media is not a traditional content agency. We are a B2B
                  GTM intelligence partner - combining AI search visibility,
                  strategic content systems, and sales enablement to help
                  technology companies build pipeline faster.
                </p>
                <p>
                  We work with companies that have complex products, long sales
                  cycles, and buyers who research deeply before making contact.
                </p>
              </div>
              <div className="mt-8 space-y-5">
                {[
                  "AI-Native, Not AI-Assisted",
                  "B2B Technology Only",
                  "Strategy and Execution",
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EAF8FD] text-brand">
                      <Check className="h-3 w-3" />
                    </span>
                    <p className="text-sm leading-6 text-body-muted">
                      <strong className="block text-[#111827]">{item}</strong>
                      Senior-level thinking plus hands-on delivery for complex
                      B2B technology teams.
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              {capabilities.map((capability, index) => (
                <article
                  key={capability.title}
                  className="rounded-lg border bg-[#F9FAFB] p-6"
                >
                  <h3 className="mt-2 text-xl font-semibold text-[#111827]">
                    {capability.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-body-muted">
                    {capability.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#062D3A] py-20 text-white lg:py-24">
          <div className={containerClass}>
            <h2 className={`${titleClass} max-w-2xl text-white`}>
              Every day your brand is{" "}
              <span className="text-brand">invisible to AI</span>, a buyer
              chooses someone else.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75">
              AI search invisibility isn't a future problem. It is a current
              pipeline problem. These are the four compounding consequences of
              doing nothing.
            </p>
            <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
              {costItems.map((item) => (
                <div key={item.number} className="bg-[#062D3A] p-6">
                  <p className={`text-4xl text-brand/60`}>{item.number}</p>
                  <h3 className="mt-4 font-semibold text-white">
                    {item.label}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/70">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F9FAFB] py-20 lg:py-24">
          <div className={containerClass}>
            <h2 className={titleClass}>
              Choose what you need,
              <br />
              when you need it.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-body-muted">
              Our services are composable. You select the specific capability
              that fills your actual gap - and scale from there.
            </p>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.title}
                  className="flex flex-col justify-between rounded-xl border bg-white p-6 shadow-sm"
                >
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#EAF8FD] text-brand">
                      <service.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-[#111827]">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-body-muted">
                      {service.body}
                    </p>
                  </div>
                  <div>
                    <Link
                      href={service.href}
                      className="mt-5 inline-block text-sm font-semibold text-[#0D7A9E]"
                    >
                      {service.link}
                    </Link>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
              <article className="flex flex-col justify-between rounded-xl border border-transparent bg-[#062D3A] p-6 shadow-sm">
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-brand">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">
                    Not Sure Where to Start?
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#B3E8F9]">
                    Start with a free AI visibility audit. In 7 business days
                    you'll know exactly where your brand is invisible to AI.
                  </p>
                </div>
                <div>
                  <Link
                    href="/ai-seo-audit"
                    className="mt-5 inline-block text-sm font-semibold text-brand"
                  >
                    Get a Free AI SEO Audit →
                  </Link>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Tag dark>Free</Tag>
                    <Tag dark>7 Business Days</Tag>
                    <Tag dark>6 Platforms</Tag>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-[#062D3A] py-20 text-white lg:py-24">
          <div
            className={`${containerClass} grid gap-10 lg:grid-cols-2 lg:items-center`}
          >
            <div>
              <h2 className={`${titleClass} text-white`}>
                Your buyers aren't
                <br />
                <span className="text-brand">Googling.</span>
                <br />
                They're asking AI.
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/75">
                In 2026, B2B buyers use AI assistants to shortlist vendors
                before they ever visit your website. An audit maps every prompt
                where that should be happening - and isn't.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/ai-seo-audit"
                  className="rounded-md bg-brand px-7 py-3 text-sm font-bold tracking-wide text-white"
                >
                  Get a Free Audit
                </Link>
                <Link
                  href="/blogs/ai-seo-aeo-geo-b2b-guide-2026"
                  className="rounded-md border border-white/30 px-7 py-3 text-sm font-bold tracking-wide text-white"
                >
                  Read the AI SEO Guide →
                </Link>
              </div>
            </div>
            <div className="grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {platforms.map(([name, body]) => (
                <div key={name} className="bg-[#062D3A] p-5">
                  <p className={`text-sm text-brand`}>{name}</p>
                  <p className="mt-2 text-sm leading-6 text-white/75">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <div
            className={`${containerClass} grid gap-10 lg:grid-cols-[1fr_0.7fr]`}
          >
            <div>
              <SectionLabel>Questions & Answers</SectionLabel>
              <h2 className={titleClass}>
                Everything you're already
                <br />
                asking about AI search.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-body-muted">
                These are the questions B2B technology leaders ask before
                working with us. Answered directly - no boilerplate.
              </p>
              <div className="mt-8 divide-y rounded-xl border bg-white">
                {faqs.map((faq) => (
                  <details key={faq.q} className="group p-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-[#111827] marker:hidden">
                      <span>{faq.q}</span>
                      <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                    </summary>

                    <p className="mt-3 text-sm leading-6 text-body-muted">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
            <div className="h-fit rounded-xl bg-[#062D3A] p-7 text-white lg:sticky lg:top-24">
              <p
                className={`${fonts.bebas_neue.className} text-sm tracking-[0.14em] text-brand`}
              >
                Start Here
              </p>
              <h3 className="mt-3 text-2xl font-semibold leading-snug">
                Find out where your brand is invisible to AI - in 7 business
                days.
              </h3>
              <p className="mt-4 text-sm leading-6 text-white/75">
                Our free AI visibility audit covers all six major AI platforms,
                tests 50+ buyer-intent prompts, and delivers a prioritized
                action roadmap.
              </p>
              <div className="mt-5 space-y-3 text-sm text-white/85">
                {[
                  "AI citation map across 6 platforms",
                  "Competitor visibility analysis",
                  "Schema and entity audit",
                  "90-day prioritized action roadmap",
                ].map((item) => (
                  <p key={item} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-brand" />
                    {item}
                  </p>
                ))}
              </div>
              <Link
                href="/ai-seo-audit"
                className="mt-7 block rounded-md bg-brand px-7 py-3 text-center font-semibold tracking-wide text-[#062D3A]"
              >
                Get a Free AI SEO Audit →
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#F9FAFB] py-20 lg:py-24">
          <div className={containerClass}>
            <h2 className={titleClass}>Latest from Nagana Media.</h2>
            <p className="mt-4 max-w-xl text-base text-body-muted">
              Original research and guides on AI search, AEO, GEO, and B2B
              marketing strategy.
            </p>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {latestPosts.map((post) => (
                <article
                  key={post.slug}
                  className="overflow-hidden rounded-xl border bg-white shadow-sm"
                >
                  <div className="relative h-[250px] bg-gray-100">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="p-5">
                    <p className={`text-sm text-body-muted`}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}{" "}
                      · {post.primaryKeyword ?? "AI SEO"}
                    </p>
                    <h3 className="mt-2 line-clamp-2 text-lg font-medium leading-snug text-[#111827]">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-body-muted">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="mt-5 inline-block text-sm font-semibold text-[#0D7A9E]"
                    >
                      Read Article →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/blogs"
                className="rounded-md border px-7 py-3 text-sm font-bold tracking-wide text-[#111827] hover:border-brand hover:text-[#0D7A9E]"
              >
                View All Articles
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
