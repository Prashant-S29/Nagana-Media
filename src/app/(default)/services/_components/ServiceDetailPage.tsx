import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "~/components/ui/button";
import { fonts } from "~/fonts";
import { getServiceBySlug } from "~/data/services";

type Tile = {
  name: string;
  stage: string;
  sprint: string;
  signal: string;
};

type Cluster = {
  label: string;
  title: string;
  description: string;
  tiles: Tile[];
};

type SimpleCard = {
  title: string;
  description: string;
};

type Faq = {
  question: string;
  answer: string;
};

export type ServicePageContent = {
  slug: string;
  kicker: string;
  eyebrow: string;
  headline: ReactNode;
  intro: ReactNode;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  deliverablesLabel: string;
  deliverablesTitle: string;
  deliverablesDescription: string;
  clusters: Cluster[];
  extraSection?: {
    label: string;
    title: string;
    description: string;
    cards: SimpleCard[];
  };
  faqs: Faq[];
  faqDescription: string;
  cta: {
    title: string;
    description: string;
    label: string;
    href: string;
  };
};

const containerClass = "mx-auto w-full container px-5 sm:px-8 lg:px-12";
const sectionClass = "bg-white py-[60px] sm:py-[80px]";
const titleClass = `text-[30px] font-semibold text-[#111827] `;

function SectionHeading({
  label,
  title,
  description,
  headingClassName,
}: {
  label: string;
  title: string;
  description: string;
  headingClassName?: string;
}) {
  return (
    <div className="max-w-2xl">
      <h2 className={`${titleClass} ${headingClassName} mt-4`}>{title}</h2>
      <p className="text-sm leading-relaxed text-body-muted sm:text-base">
        {description}
      </p>
    </div>
  );
}

function TileCard({ tile }: { tile: Tile }) {
  return (
    <article className="flex flex-col justify-between rounded-xl border bg-white p-5 shadow-sm">
      <div>
        <h4 className="text-base font-semibold leading-snug text-[#111827]">
          {tile.name}
        </h4>
        <p className="text-sm leading-relaxed text-body-muted">{tile.signal}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-brand/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#0D7A9E]">
            {tile.stage}
          </span>
          <span className="rounded-full bg-[#F3F6F8] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-body-muted">
            {tile.sprint}
          </span>
        </div>
      </div>
    </article>
  );
}

export function ServiceDetailPage({
  content,
}: {
  content: ServicePageContent;
}) {
  const service = getServiceBySlug(content.slug);

  if (!service) {
    return notFound();
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.naganamedia.com";

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@type": "Organization", name: "Nagana Media", url: baseUrl },
    serviceType: service.title,
    areaServed: "Worldwide",
    url: `${baseUrl}/services/${content.slug}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="bg-[#062D3A] pb-[90px] pt-[160px] sm:pb-[120px] sm:pt-[190px]">
        <div className={containerClass}>
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 text-xs text-white/55"
          >
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white">
              Services
            </Link>
            <span>/</span>
            <span className="text-brand">{service.title}</span>
          </nav>

          <h1 className="mt-5 max-w-4xl text-[44px] font-bold leading-[0.95] tracking-tight text-white md:text-[68px]">
            {content.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/75">
            {content.intro}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild variant="brand" className="rounded-md">
              <Link href={content.primaryCta.href}>
                {content.primaryCta.label}
              </Link>
            </Button>
            <Link
              href={content.secondaryCta.href}
              className="text-sm font-medium text-brand underline-offset-4 hover:underline"
            >
              {content.secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={containerClass}>
          <SectionHeading
            label={content.deliverablesLabel}
            title={content.deliverablesTitle}
            description={content.deliverablesDescription}
          />

          <div className="mt-12 space-y-14">
            {content.clusters.map((cluster) => (
              <section
                key={cluster.title}
                className="border-t pt-10 first:border-t-0 first:pt-0"
              >
                <h3 className="mt-3 text-2xl font-semibold leading-tight text-[#111827]">
                  {cluster.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-body-muted">
                  {cluster.description}
                </p>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {cluster.tiles.map((tile) => (
                    <TileCard key={tile.name} tile={tile} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      {content.extraSection ? (
        <section className="bg-[#062D3A] py-[60px] sm:py-[80px]">
          <div className={containerClass}>
            <SectionHeading
              label={content.extraSection.label}
              title={content.extraSection.title}
              description={content.extraSection.description}
              headingClassName="text-white"
            />
            <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/20 md:grid-cols-2 lg:grid-cols-4">
              {content.extraSection.cards.map((card, index) => (
                <article key={card.title} className="bg-[#062D3A] p-5">
                  <p className={`text-4xl text-brand/60`}>0{index + 1}</p>

                  <h3 className="mt-7 text-lg font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {card.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className={sectionClass}>
        <div className={containerClass}>
          <SectionHeading
            label="Questions"
            title="Answered directly."
            description={content.faqDescription}
          />
          <div className="mt-8 divide-y rounded-xl border bg-white shadow-sm">
            {content.faqs.map((faq) => (
              <article key={faq.question} className="p-5 sm:p-6">
                <h3 className="text-base font-semibold text-[#111827]">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body-muted">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
