import React from "react";
import Link from "next/link";
import { Linkedin, MapPin } from "lucide-react";

import { fonts } from "~/fonts";
import { generateSeo } from "~/utils/generateSeo";
import { Button, buttonVariants } from "~/components/ui/button";
import { env } from "~/env";
import Image from "next/image";

// Force static generation - critical for SEO and LLM crawlers.
export const dynamic = "force-static";

export const generateMetadata = () =>
  generateSeo({
    title: "Meet the Experts",
    description:
      "Meet the Nagana Media team - writers and strategists working at the intersection of AI search, content strategy, and B2B go-to-market execution.",
    url: "/meet-the-experts",
  });

// ─── Data ──────────────────────────────────────────────────────────────────
type Expert = {
  name: string;
  initials: string;
  image: string;
  role: string;
  bio: string;
  tags: string[];
  location: string;
  linkedin: string;
};
const experts: Expert[] = [
  {
    name: "Abhijeet Singh",
    initials: "AS",
    image: "/assets/static/experts/abhijeet.webp",
    role: "Digital Solutions & GTM Strategy Lead",
    bio: "Leads digital solutions and GTM strategy at Nagana Media, specializing in AI search visibility, AEO, GEO, and B2B growth programs.",
    tags: ["AEO", "GEO", "AI SEO", "B2B GTM", "Content Strategy"],
    location: "Nagana Media · Jaipur, India",
    linkedin: "https://www.linkedin.com/in/abhijeet-singh-1303349a/",
  },
  {
    name: "Abhinav Rajawat",
    initials: "AR",
    image: "/assets/static/experts/abhinav.webp",
    role: "Creative Strategist",
    bio: "Transforms complex B2B technology topics into engaging content, campaigns, and messaging that connect with buyers and AI platforms.",
    tags: ["B2B Content", "Thought Leadership", "Research", "AI Visibility"],
    location: "Nagana Media · Jaipur, India",
    linkedin: "https://www.linkedin.com/in/abhinav-rajawat-7925631b2/",
  },
  {
    name: "Prashant Singh",
    initials: "PS",
    image: "/assets/static/experts/prashant.webp",
    role: "Web Solutions Developer",
    bio: "Builds scalable web solutions and writes about technical SEO, site architecture, AI visibility, and performance optimization.",
    tags: ["SEO", "AEO", "Technical SEO", "Entity SEO"],
    location: "Nagana Media · Jaipur, India",
    linkedin: "https://www.linkedin.com/in/prashantsingh29/",
  },
  {
    name: "Sai Archith",
    initials: "SA",
    image: "/assets/static/experts/sai_archith.webp",
    role: "Technology Marketing & Content Strategist",
    bio: "Bridges technology marketing and content strategy, helping B2B brands drive demand, pipeline growth, and buyer engagement.",
    tags: ["GTM Strategy", "Demand Gen", "Sales Enablement", "Messaging"],
    location: "Nagana Media · Jaipur, India",
    linkedin: "https://www.linkedin.com/in/sai-archith/",
  },
  {
    name: "Dakshita Sharma",
    initials: "DS",
    image: "/assets/static/experts/dakshita.webp",
    role: "UI/UX Designer, Graphic Designer and Procreate Artist",
    bio: "Designs the interfaces, visuals, and brand assets that make complex B2B technology feel approachable.",
    tags: ["GTM Strategy", "Demand Gen", "Sales Enablement", "Messaging"],
    location: "Nagana Media · Jaipur, India",
    linkedin: "https://www.linkedin.com/in/dakshita-sharma-8443a357",
  },
];

// Person + CollectionPage JSON-LD strengthens author entities (E-E-A-T) and
// links each writer to the organisation - useful for AI citation + indexing.
const expertsJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Meet the Experts - Nagana Media",
  url: `${env.NEXT_PUBLIC_BASE_URL}/meet-the-experts`,
  about: experts.map((e) => ({
    "@type": "Person",
    name: e.name,
    jobTitle: e.role,
    description: e.bio,
    sameAs: [e.linkedin],
    worksFor: {
      "@type": "Organization",
      name: "Nagana Media",
    },
  })),
};

const titleClass = `text-[28px] leading-[1.05] tracking-tight text-[#111827] md:text-[44px]`;
const containerClass = "mx-auto w-full container px-5 sm:px-8 lg:px-12";

// ─── Page ──────────────────────────────────────────────────────────────────
const MeetTheExperts: React.FC = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(expertsJsonLd) }}
      />

      <section className="bg-[#062D3A] pb-[150px] pt-[200px]">
        <div className={`${containerClass} pt-50 flex flex-col`}>
          <h1 className={`${titleClass} text-white`}>
            Experts&nbsp;
            <span className="text-brand">@NaganaMedia</span> <br />
          </h1>
          <p className="mt-6 max-w-xl text-[17px] text-white/70">
            B2B technology buyers now research using AI. They ask ChatGPT,
            Perplexity, and Google AI Mode - and act on what those systems
            recommend. If your brand isn't in those answers, you don't exist in
            their evaluation.
          </p>
        </div>
      </section>
      <section
        data-container
        aria-labelledby="experts-heading"
        className="w-full bg-white py-[60px] sm:py-[80px]"
      >
        <h2 id="experts-heading" className="sr-only">
          Our experts
        </h2>
        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {experts.map((expert) => (
            <li key={expert.name}>
              <article className="flex h-full flex-col gap-6 rounded-xl border bg-white p-6 shadow-sm transition-colors hover:border-brand sm:flex-row sm:p-8">
                {/* Info */}
                <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden rounded-lg bg-pink-200 sm:w-36 md:w-40">
                  <Image
                    src={expert.image}
                    alt={expert.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-semibold text-[#111827]">
                    {expert.name}
                  </h3>
                  <p className="mt-1 text-sm text-[#0D7A9E]">{expert.role}</p>
                  <p className="mt-3 text-sm text-body-muted">{expert.bio}</p>

                  <div className="mt-5">
                    <Link
                      href={expert.linkedin}
                      target="_blank"
                      className="text-sm font-medium underline underline-offset-2"
                    >
                      LinkedIn
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default MeetTheExperts;
