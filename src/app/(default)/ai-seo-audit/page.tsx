import React from "react";
import type { Metadata } from "next";
import type { Blog } from "~/types";
import Image from "next/image";
import Link from "next/link";
import {
  Bot,
  BrainCircuit,
  CheckCircle2,
  FileSearch,
  FileText,
  Globe2,
  Layers3,
  Network,
  Radar,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

// fonts
import { fonts } from "~/fonts";

// components
import { BlogCard } from "~/components/common";
import { AiSeoAuditForm } from "~/components/form";
import { Button } from "~/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { servicePageBannerImage } from "public/assets/static";
import { getAllPosts } from "~/utils/api";

// static
export const dynamic = "force-static";

// metadata

const baseUrl = "https://www.naganamedia.com";
const pageUrl = `${baseUrl}/ai-seo-audit`;

export const generateMetadata = (): Metadata => ({
  title: {
    absolute: "AI SEO Audit: AEO, GEO & AI Visibility Analysis | Nagana Media",
  },
  description:
    "Get a free AI SEO audit covering AEO, GEO, AI Overviews, and LLM visibility. Nagana Media audits your brand's presence across ChatGPT, Perplexity, Google AI Mode, and Claude - and tells you exactly how to fix it.",
  keywords: [
    "AI SEO audit",
    "AEO audit",
    "GEO audit",
    "answer engine optimization",
    "generative engine optimization",
    "AI Overviews SEO",
    "LLM visibility",
    "AI search optimization",
    "ChatGPT SEO",
    "Perplexity SEO",
    "B2B AI SEO",
    "entity SEO",
    "AI visibility audit",
  ],
  category: "AI SEO, Digital Marketing, B2B Marketing",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "AI SEO Audit: AEO, GEO & AI Visibility | Nagana Media",
    description:
      "Find out where your brand is invisible to AI. Nagana Media's free AI SEO audit covers AEO, GEO, AI Overviews, ChatGPT, Perplexity, Claude and Google AI Mode.",
    url: pageUrl,
    siteName: "Nagana Media",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/opengraph.webp`,
        width: 1200,
        height: 630,
        alt: "AI SEO Audit by Nagana Media",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@NaganaMedia",
    creator: "@NaganaMedia",
    title: "AI SEO Audit: AEO, GEO & AI Visibility | Nagana Media",
    description:
      "Find out where your brand is invisible to AI. Free AI SEO audit covering AEO, GEO, AI Overviews and LLM visibility - by Nagana Media.",
    images: [
      {
        url: `${baseUrl}/opengraph.webp`,
        width: 1200,
        height: 630,
        alt: "AI SEO Audit by Nagana Media",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
});

// page data

interface IconCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI SEO Audit",
  alternateName: ["AEO Audit", "GEO Audit", "AI Visibility Audit"],
  description:
    "A free AI SEO audit covering Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), AI Overviews visibility, LLM citation analysis, technical SEO, and entity optimization for B2B technology companies.",
  provider: {
    "@type": "Organization",
    name: "Nagana Media",
    url: baseUrl,
    logo: `${baseUrl}/assets/static/logo.webp`,
    sameAs: ["https://www.linkedin.com/company/nagana-media-tech/"],
  },
  serviceType: "AI SEO Audit",
  areaServed: "Worldwide",
  audience: {
    "@type": "BusinessAudience",
    audienceType: "B2B Technology Companies",
  },
  url: pageUrl,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free AI SEO Audit - delivered within 7 business days",
  },
};

const FAQS = [
  {
    question: "What is an AI SEO audit?",
    answer:
      "An AI SEO audit evaluates how visible your brand is across AI search platforms including ChatGPT, Perplexity, Google AI Mode, Claude, and Gemini. It covers Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), technical crawlability for AI bots, entity recognition, schema markup, E-E-A-T signals, and content structure - all factors that determine whether AI systems cite your brand in their responses.",
  },
  {
    question: "What is the difference between AEO and GEO?",
    answer:
      "AEO (Answer Engine Optimization) is the practice of structuring content so it gets selected as a direct answer by search engines and AI assistants - including Google AI Overviews and Bing Copilot. GEO (Generative Engine Optimization) is the practice of making your content authoritative enough to be cited inside generative AI responses from platforms like ChatGPT, Perplexity, and Claude. Both disciplines overlap significantly but target different surfaces.",
  },
  {
    question: "What is GEO - Generative Engine Optimization?",
    answer:
      "Generative Engine Optimization (GEO) is the process of optimizing your content and brand presence so that large language models (LLMs) and generative AI platforms - such as ChatGPT, Perplexity, Gemini, and Claude - cite your brand, quote your content, and recommend your business in their AI-generated responses.",
  },
  {
    question: "What is AEO - Answer Engine Optimization?",
    answer:
      "Answer Engine Optimization (AEO) is the practice of structuring content so it can be directly extracted and used as an answer by AI search tools and answer engines - including Google AI Overviews, Bing Copilot, and voice assistants. AEO techniques include question-format headings, concise answer blocks, FAQ schema, and structured data markup.",
  },
  {
    question:
      "How do I know if my brand is being cited in ChatGPT or Perplexity?",
    answer:
      "The most reliable method is manual prompt testing - entering buyer-intent queries relevant to your category into ChatGPT, Perplexity, Claude, Gemini, and Google AI Mode, and checking whether your brand appears. A professional AI visibility audit, like the one Nagana Media offers, tests 50+ buyer-intent prompts across all major AI platforms and maps your citation presence against competitors.",
  },
  {
    question: "What is an llms.txt file and do I need one?",
    answer:
      "llms.txt is an emerging web standard - a plain-text file placed at the root of your domain (yoursite.com/llms.txt) that tells AI crawlers and large language models what your site is about, which pages are most important, and how your content should be understood. It is the AI equivalent of robots.txt and sitemap.xml combined. B2B technology companies that want to improve their GEO and LLM visibility should have one.",
  },
  {
    question: "How long does an AI SEO audit take?",
    answer:
      "Nagana Media's AI SEO audit is delivered within 7 business days of form submission. The audit covers technical crawlability, entity and schema analysis, content structure review, and a full AI citation audit across ChatGPT, Perplexity, Google AI Mode, Claude, and Gemini.",
  },
  {
    question: "Does AI SEO affect traditional Google rankings?",
    answer:
      "Yes - positively. The content improvements required for AEO and GEO (clear structure, authoritative writing, schema markup, strong E-E-A-T signals, internal linking) are also best practices for traditional SEO. Optimizing for AI search does not hurt Google rankings. In most cases it improves them, because AI-optimized content is better structured, more authoritative, and more useful than content written purely for keyword density.",
  },
  {
    question: "What is entity SEO and why does it matter for AI visibility?",
    answer:
      "Entity SEO is the practice of establishing your brand, products, and key people as recognized named entities in the knowledge graphs that AI systems and search engines use to understand the world. When your brand is a well-defined entity - with consistent mentions, structured data, Wikipedia or Wikidata presence, and topical authority - AI systems are far more likely to surface and cite it in relevant queries.",
  },
  {
    question: "How often should I run an AI visibility audit?",
    answer:
      "For B2B technology companies actively investing in content marketing, an AI visibility audit every 60 to 90 days is recommended. AI search platforms update their models and training data regularly, which means citation patterns shift. Quarterly audits let you track progress, catch regressions, and identify new keyword clusters where competitors are gaining AI-generated visibility.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "AI SEO Audit",
      item: pageUrl,
    },
  ],
};

const AI_SEO_DISCIPLINES = [
  {
    title: "SEO (Search Engine Optimization)",
    description:
      "Optimizing for traditional Google and Bing rankings through technical health, content quality, and authority signals.",
  },
  {
    title: "AEO (Answer Engine Optimization)",
    description:
      "Structuring content so AI answer engines and Google AI Overviews extract and surface it as a direct response to user queries.",
  },
  {
    title: "GEO (Generative Engine Optimization)",
    description:
      "Building the brand authority and content depth that causes large language models to cite your brand in generated responses.",
  },
];

const AUDIT_PILLARS: IconCard[] = [
  {
    icon: Bot,
    title: "Technical Crawlability for AI Bots",
    description:
      "AI crawlers behave differently from Googlebot. They struggle with heavy client-side rendering, JavaScript-dependent content, and pages that load too slowly. Your audit checks server-side rendering status, page speed scores, robots.txt rules, sitemap completeness, llms.txt presence, and whether your most important content is accessible to AI crawlers at all.",
  },
  {
    icon: Network,
    title: "Entity and Schema Audit",
    description:
      "AI systems understand the web through entities - named people, companies, products, and concepts - not just keywords. Your audit maps how well your brand is established as a recognized entity, checks structured data, identifies missing schema types, and validates existing schema for errors.",
  },
  {
    icon: FileText,
    title: "Content Structure and AEO Readiness",
    description:
      "Answer engines extract content that is clearly structured, directly answers questions, and uses natural language that matches how people ask queries. Your audit reviews heading hierarchy, definition blocks, question-format headings, answer-first paragraphs, internal linking depth, and reading level.",
  },
  {
    icon: Search,
    title: "AI Citation Audit Across Five Platforms",
    description:
      "We test 50+ buyer-intent prompts across ChatGPT, Perplexity, Google AI Mode, Claude, and Gemini - the exact queries your target buyers are typing - and map which brands get cited, which get ignored, and where the gaps are.",
  },
  {
    icon: ShieldCheck,
    title: "E-E-A-T and Authority Signals",
    description:
      "Your audit evaluates named author attribution, author credential schema, external citation quality, domain authority, backlink relevance, topical depth, and whether your brand is mentioned on credible third-party sources that AI systems trust.",
  },
];

const GLOSSARY = [
  {
    term: "AEO - Answer Engine Optimization",
    definition:
      "The practice of structuring content so it gets selected as a direct answer by AI-powered search tools, Google AI Overviews, Bing Copilot, and voice assistants. AEO techniques include question-format headings, concise answer blocks, FAQPage schema, and structured data markup that makes content easy for AI to extract.",
  },
  {
    term: "GEO - Generative Engine Optimization",
    definition:
      "The practice of building content authority and brand depth so that large language models - ChatGPT, Perplexity, Claude, Gemini - cite your brand in their AI-generated responses. GEO focuses on original research, factual density, authoritative sourcing, and entity recognition.",
  },
  {
    term: "AI Overviews Optimization (AIO)",
    definition:
      "AI Overviews is Google's feature that generates a synthesized answer at the top of search results, above the organic blue links. Optimizing for AI Overviews means structuring content so Google's systems select it as a source for the generated answer.",
  },
  {
    term: "LLMO - Large Language Model Optimization",
    definition:
      "A broader term for any strategy aimed at improving how large language models perceive, understand, and reference your brand. LLMO encompasses both AEO and GEO tactics, plus entity optimization, training data visibility, and brand mention strategy.",
  },
  {
    term: "Entity SEO",
    definition:
      "The practice of establishing your brand, products, people, and content as recognized named entities in the knowledge graphs that Google and AI systems use to understand the world.",
  },
  {
    term: "E-E-A-T",
    definition:
      "Experience, Expertise, Authoritativeness, and Trustworthiness - Google's quality rater framework for evaluating content. AI systems use similar signals to determine which sources to cite.",
  },
  {
    term: "llms.txt",
    definition:
      "An emerging web standard - a plain-text file at yoursite.com/llms.txt - that tells AI crawlers and large language models what your site covers, which pages are most important, and how your content should be interpreted.",
  },
  {
    term: "AI Visibility",
    definition:
      "A brand's measurable presence across AI search platforms - the frequency and prominence with which a brand is cited, recommended, or referenced in AI-generated responses across ChatGPT, Perplexity, Google AI Mode, Claude, and Gemini.",
  },
];

const PLATFORMS: IconCard[] = [
  {
    icon: Bot,
    title: "ChatGPT (OpenAI)",
    description:
      "ChatGPT's knowledge comes from training data plus real-time web browsing. For brand citation, the highest-leverage actions are publishing on indexed sites, building strong external mentions, and using definite, factual language rather than hedged claims.",
  },
  {
    icon: FileSearch,
    title: "Perplexity",
    description:
      "Perplexity performs live web searches and cites sources directly. Ranking in Perplexity requires strong SEO fundamentals, fast server-side rendered pages, clear answer-first structure, and frequent publication.",
  },
  {
    icon: Globe2,
    title: "Google AI Mode & AI Overviews",
    description:
      "Google's AI surfaces synthesize answers from pages it already indexes and trusts. To be featured, your page needs strong rankings, clear question-matched headings, schema markup, and topical authority across related content.",
  },
  {
    icon: BrainCircuit,
    title: "Claude (Anthropic)",
    description:
      "Claude visibility depends on authoritative external sources, original research that other sites cite, and content clearly attributed to named human experts with verifiable credentials.",
  },
  {
    icon: Sparkles,
    title: "Gemini (Google DeepMind)",
    description:
      "Gemini combines Google's search index with language model training. Optimization is closely aligned with Google SEO best practices, with added emphasis on entity optimization through Google's Knowledge Graph.",
  },
  {
    icon: Radar,
    title: "Microsoft Copilot",
    description:
      "Microsoft Copilot blends Bing Search with OpenAI models to generate answers grounded in live web results. Visibility improves through strong Bing SEO, structured data, authoritative backlinks, fast-loading pages.",
  },
];

const LEAD_ACQUISITION_CARDS: IconCard[] = [
  {
    icon: ShieldCheck,
    title: "Buyers Trust AI Recommendations More Than Paid Ads",
    description:
      "When a buyer asks ChatGPT or Perplexity to recommend a vendor, the response carries a different quality of trust than a sponsored result. An AI SEO audit tells you exactly which queries should be returning your brand - and are not.",
  },
  {
    icon: Target,
    title: "AI Visibility Captures Buyers Before They Visit Your Website",
    description:
      "In AI search, the trust decision happens before your site is ever visited. An AI visibility audit maps every pre-click touchpoint where your brand should be present and currently is not.",
  },
  {
    icon: TrendingUp,
    title: "Closing the Gap Between Search Intent and Pipeline",
    description:
      "A buyer searching for an AI SEO agency for SaaS companies is evaluating. The audit identifies your highest-value, highest-intent prompt categories where a citation can translate directly to a qualified conversation.",
  },
  {
    icon: Layers3,
    title: "Compound Returns from a Single Audit",
    description:
      "Content restructured for AEO, schema markup, and entity signals keep compounding after implementation. A single audit creates a roadmap whose lead generation value accumulates over time.",
  },
];

const REPORT_SECTIONS = [
  {
    title: "AI Citation Map",
    description:
      "Your brand's current citation presence across ChatGPT, Perplexity, Google AI Mode, Claude, and Gemini. Delivered as a platform-by-platform table.",
  },
  {
    title: "Competitor Citation Analysis",
    description:
      "The three to five competitors most frequently cited in your category, including which assets, domains, and content formats are driving their visibility.",
  },
  {
    title: "Technical AI Readiness Score",
    description:
      "An assessment of server-side rendering, page speed, robots.txt, sitemap completeness, llms.txt presence, Core Web Vitals, and JavaScript rendering issues.",
  },
  {
    title: "Schema and Entity Audit",
    description:
      "A complete review of structured data implementation, missing schema types, schema errors, and how well-defined your brand is as an entity.",
  },
  {
    title: "Content Structure Review",
    description:
      "An AEO readiness review of your top pages: heading hierarchy, answer-first paragraphs, definition blocks, FAQ sections, internal linking, and topical gaps.",
  },
  {
    title: "E-E-A-T Assessment",
    description:
      "Author attribution, author schema, external citation sources, domain authority, backlink relevance, and topical authority signals across your content cluster.",
  },
  {
    title: "90-Day Action Roadmap",
    description:
      "A prioritized action plan tagged by effort, impact, and responsible party so the highest-impact, lowest-effort items come first.",
  },
];

const RELATED_AI_POST_SLUGS = [
  "aeo-saas-2026",
  "geo-2026",
  "aeo-guide-b2b",
  "geo-aeo-measurement-2026",
  "ai-invisible-content-2026",
  "ai-seo-aeo-geo-b2b-guide-2026",
];

const AI_RESOURCE_KEYWORDS = [
  "ai seo",
  "aeo",
  "geo",
  "generative engine optimization",
  "answer engine optimization",
  "ai search",
  "chatgpt",
  "perplexity",
  "ai overviews",
];

function SectionHeading({
  title,
  intro,
  align = "center",
}: {
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl text-left"
      }
    >
      <h2
        className={`${fonts.bebas_neue.className} text-[36px] font-bold leading-tight lg:text-[44px]`}
      >
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-base leading-relaxed text-body-muted">
          {intro}
        </p>
      )}
    </div>
  );
}

function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const AiSeoAuditPage: React.FC = () => {
  const allPosts = getAllPosts();
  const preferredPosts = RELATED_AI_POST_SLUGS.map((slug) =>
    allPosts.find((post) => post.slug === slug),
  ).filter((post): post is Blog => Boolean(post));

  const preferredSlugs = new Set(preferredPosts.map((post) => post.slug));
  const fallbackAiPosts = allPosts.filter((post) => {
    if (preferredSlugs.has(post.slug)) return false;

    const searchableContent = [
      post.title,
      post.excerpt,
      post.primaryKeyword,
      ...(post.secondaryKeywords ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return AI_RESOURCE_KEYWORDS.some((keyword) =>
      searchableContent.includes(keyword),
    );
  });

  const relatedAiPosts = [...preferredPosts, ...fallbackAiPosts].slice(0, 6);

  return (
    <>
      <JsonLdScript data={serviceJsonLd} />
      <JsonLdScript data={faqJsonLd} />
      <JsonLdScript data={breadcrumbJsonLd} />

      {/* Hero Banner */}
      <div
        data-container
        className="relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-r from-[#0c1323] to-[#1e2f45] py-[140px]"
      >
        <Image
          src={servicePageBannerImage}
          alt="AI SEO Audit"
          fill
          priority
          className="w-full object-cover opacity-40"
        />
        <div className="z-10 flex max-w-4xl flex-col items-center gap-4 px-4 text-center">
          <h1 className="text-[40px] font-bold leading-tight text-white lg:text-[54px] xl:text-[64px]">
            AI SEO Audit for B2B Technology Companies
          </h1>
          <p className="max-w-3xl text-base font-light leading-relaxed text-white/85 sm:text-lg">
            Find out exactly where your brand is invisible to AI search - and
            what to do about it. We audit your presence across ChatGPT,
            Perplexity, Google AI Mode, Claude, and Gemini.
          </p>
          <Button variant="brand" asChild className="z-10 mt-2">
            <Link href="#audit-form">Request My Free Audit</Link>
          </Button>
        </div>
      </div>

      {/* What Is AI SEO */}
      <section data-container className="w-full bg-[#f9f9f9] py-[70px]">
        <div className="mx-auto max-w-[760px]">
          <SectionHeading
            title="What Is AI SEO - And Why Does It Matter in 2026?"
            align="left"
          />
          <div className="mt-6 space-y-5 text-base leading-relaxed text-body-muted">
            <p>
              AI SEO is the practice of optimizing your website and content so
              your brand is visible across both traditional search engines and
              AI-powered answer platforms - including Google AI Overviews,
              ChatGPT, Perplexity, Claude, and Gemini.
            </p>
            <p>
              In 2026, a growing share of B2B buyer research happens inside AI
              systems, not on page one of Google. A buyer looking for a
              cybersecurity vendor does not search Google and click ten links.
              They open ChatGPT or Perplexity, describe their problem, and act
              on whatever the AI recommends. If your brand is not in those
              recommendations, you do not exist in that buyer's evaluation.
            </p>
            <p>AI SEO brings together three distinct disciplines:</p>
          </div>
          <div className="mt-6 grid gap-4">
            {AI_SEO_DISCIPLINES.map((item) => (
              <div key={item.title} className="border-l-4 border-brand pl-4">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-body-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-base leading-relaxed text-body-muted">
            An AI SEO audit tells you exactly where you stand across all three -
            and what to fix first.
          </p>
        </div>
      </section>

      {/* Five Pillars */}
      <section data-container className="w-full bg-white py-[70px]">
        <SectionHeading
          title="The Five Pillars of an AI SEO Audit"
          intro="Most SEO audits stop at technical issues and keyword gaps. An AI SEO audit goes five layers deeper - covering every signal that determines whether AI systems find, understand, trust, and cite your content."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {AUDIT_PILLARS.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-lg border bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <pillar.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed text-body-muted">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Glossary */}
      <section data-container className="w-full bg-[#f9f9f9] py-[70px]">
        <div className="mx-auto max-w-[860px]">
          <SectionHeading
            title="AI SEO Glossary: Key Terms Explained"
            intro="The terminology around AI search optimization is fragmented - different platforms and agencies use different acronyms for overlapping concepts. Here are the definitive definitions for the terms that matter."
          />
          <div className="mt-10 divide-y rounded-lg border bg-white">
            {GLOSSARY.map((item) => (
              <div key={item.term} className="p-5">
                <h3 className="text-base font-semibold text-gray-900">
                  {item.term}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body-muted">
                  {item.definition}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Breakdown */}
      <section data-container className="w-full bg-white py-[70px]">
        <SectionHeading
          title="How Each AI Search Platform Works - And How to Rank in Each"
          intro="Each major AI platform sources, weights, and presents information differently. Optimizing for one does not guarantee visibility on another. Here is what you need to know about each platform."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {PLATFORMS.map((platform) => (
            <article
              key={platform.title}
              className="rounded-lg border bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <platform.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">
                {platform.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body-muted">
                {platform.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* B2B Considerations */}
      <section data-container className="w-full bg-[#f9f9f9] py-[70px]">
        <div className="mx-auto max-w-[800px]">
          <SectionHeading
            title="Why AI SEO Is Different for B2B Technology Companies"
            align="left"
          />
          <div className="mt-6 space-y-5 text-base leading-relaxed text-body-muted">
            <p>
              Most AI SEO guidance is written for e-commerce, consumer apps, or
              media publications. B2B technology companies face a different set
              of challenges - and a different set of opportunities.
            </p>
            <p>
              <strong className="font-semibold text-gray-900">
                Lower search volume, higher buyer intent.
              </strong>{" "}
              B2B buyers search less frequently but with far more intent. A
              query like "best identity verification API for enterprise" has a
              fraction of the volume of "best running shoes" - but the person
              asking it is evaluating a six-figure purchase.
            </p>
            <p>
              <strong className="font-semibold text-gray-900">
                Longer evaluation cycles.
              </strong>{" "}
              B2B buyers research over weeks or months, asking AI assistants
              multiple questions at different stages of the funnel. An AI SEO
              audit maps your presence across early-stage, mid-funnel, and
              late-stage decision queries.
            </p>
            <p>
              <strong className="font-semibold text-gray-900">
                ICP-matched prompt testing.
              </strong>{" "}
              Generic AI visibility testing is not enough for B2B. Your audit
              needs to test the exact language your ideal customer profile uses,
              which varies by industry, company size, and buyer role.
            </p>
            <p>
              <strong className="font-semibold text-gray-900">
                Technical buying committees.
              </strong>{" "}
              Content optimized for AI search needs to address the technical
              buyer, the business buyer, and the executive sponsor - each
              searching with different queries, each deserving a citation of
              your brand.
            </p>
          </div>
        </div>
      </section>

      {/* Lead Acquisition */}
      <section data-container className="w-full bg-white py-[70px]">
        <SectionHeading
          title="How an AI SEO Visibility Audit Directly Improves Lead Acquisition"
          intro="An AI SEO audit is not a vanity exercise. Every gap it surfaces represents a buyer query where a competitor is being recommended and your brand is not. Fixing those gaps does not just improve rankings - it puts your brand into the consideration set of buyers who have already decided to act."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {LEAD_ACQUISITION_CARDS.map((card) => (
            <article
              key={card.title}
              className="rounded-lg border bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <card.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body-muted">
                {card.description}
              </p>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed text-body-muted">
          The businesses capturing the most AI-sourced pipeline in 2026 are not
          necessarily the biggest or best-funded. They are the ones whose
          content is best structured, most authoritative, and most visible to
          the AI systems their buyers use every day.
        </p>
      </section>

      {/* Report Includes */}
      <section data-container className="w-full bg-[#f9f9f9] py-[70px]">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
          <div>
            <SectionHeading
              title="What You Receive: Inside the Nagana Media AI SEO Audit"
              intro="This is not a generic automated report. Every audit is researched and written by the Nagana Media team. Here is exactly what it covers."
              align="left"
            />
            <div className="mt-8 space-y-4">
              {REPORT_SECTIONS.map((section, index) => (
                <article
                  key={section.title}
                  className="grid gap-4 rounded-lg border bg-white p-5 shadow-sm sm:grid-cols-[44px_1fr]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {section.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-body-muted">
                      {section.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <aside className="rounded-lg border bg-white p-6 shadow-sm lg:sticky lg:top-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-gray-900">
              Delivered within 7 business days
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-body-muted">
              Your report is built around platform-specific visibility,
              competitor citations, technical AI readiness, and a prioritized
              90-day roadmap.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-gray-700">
              {[
                "50+ buyer-intent prompts tested",
                "Five AI platforms reviewed",
                "Top pages evaluated for AEO readiness",
                "Action roadmap tagged by effort and impact",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section data-container className="w-full bg-white py-[70px]">
        <div className="mx-auto max-w-[860px]">
          <SectionHeading title="Frequently Asked Questions About AI SEO Audits" />
          <Accordion
            type="single"
            collapsible
            className="mt-8 rounded-lg border"
          >
            {FAQS.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="px-5"
              >
                <AccordionTrigger className="text-base font-semibold text-gray-900 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-body-muted">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Related Resources */}
      <section data-container className="w-full bg-[#f9f9f9] py-[70px]">
        <SectionHeading title="Go Deeper: AI SEO Resources from Nagana Media" />
        <div className="mt-10 flex justify-center">
          <div className="grid gap-x-4 gap-y-5 max-[700px]:grid-cols-1 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3">
            {relatedAiPosts.map((blog) => (
              <BlogCard key={blog.slug} data={blog} />
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section
        data-container
        className="flex w-full flex-col gap-[50px] bg-white py-[70px] md:flex-row md:items-start"
      >
        <div className="w-full md:max-w-[420px]">
          <h2
            className={`${fonts.bebas_neue.className} text-[38px] font-bold leading-tight lg:text-[46px]`}
          >
            Ready to <span className="text-brand">Outrank</span> Your
            Competition?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-body-muted">
            Fill in the form and our team will prepare a personalised AI SEO
            audit report for your site - completely free. We will email it to
            you within 7 business days.
          </p>

          <ul className="mt-6 space-y-3">
            {[
              "No sales call required",
              "Delivered within 7 business days",
              "Real insights, not generic advice",
              "Covers technical, content, AEO, GEO, and AI visibility",
            ].map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <CheckCircle2
                  className="h-4 w-4 flex-shrink-0 text-brand"
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div
          id="audit-form"
          className="w-full rounded-lg border bg-white p-6 shadow-sm"
        >
          <h3 className="mb-1 text-lg font-semibold text-gray-900">
            Request Your Free AI SEO Audit
          </h3>
          <p className="mb-5 text-sm text-body-muted">
            Takes less than 2 minutes to fill in.
          </p>
          <AiSeoAuditForm />
        </div>
      </section>
    </>
  );
};

export default AiSeoAuditPage;
