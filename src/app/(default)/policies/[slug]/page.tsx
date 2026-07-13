import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { generateSeo } from "~/utils/generateSeo";
import { getPolicyBySlug, policies, type PolicyBlock } from "../data";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return policies.map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const policy = getPolicyBySlug(slug);

  if (!policy) {
    return notFound();
  }

  return generateSeo({
    title: `${policy.title} | Nagana Media`,
    description: policy.description,
    url: `/policies/${policy.slug}`,
    keywords: [policy.title, "Nagana Media policies", "legal policy"],
  });
}

const isHeading = (text: string) => /^\d+(?:\.\d+)?\.\s/.test(text);

const PolicyParagraph = ({ text }: { text: string }) => {
  if (isHeading(text)) {
    return (
      <h2 className="mt-9 text-2xl font-bold leading-tight text-[#111827]">
        {text}
      </h2>
    );
  }

  return <p className="mt-4 leading-7 text-body-muted">{text}</p>;
};

const PolicyTable = ({ rows }: { rows: string[][] }) => {
  const [head, ...body] = rows;

  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-black/10">
      <table className="min-w-full divide-y divide-black/10 text-left text-sm">
        {head ? (
          <thead className="bg-[#f7f7f7] text-[#111827]">
            <tr>
              {head.map((cell, index) => (
                <th key={index} className="px-4 py-3 font-semibold">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody className="divide-y divide-black/10 bg-white text-body-muted">
          {body.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 align-top leading-6">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PolicyBlockRenderer = ({ block }: { block: PolicyBlock }) => {
  if (block.type === "table") {
    return <PolicyTable rows={block.rows} />;
  }

  return <PolicyParagraph text={block.text} />;
};

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const policy = getPolicyBySlug(slug);

  if (!policy) {
    return notFound();
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.naganamedia.com";
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: policy.title,
        item: `${baseUrl}/policies/${policy.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section
        data-container
        className="flex min-h-[45vh] w-full flex-col justify-center bg-gradient-to-r from-[#0c1323] to-[#1e2f45] pb-16 pt-[120px] text-white sm:pt-[140px]"
      >
        <nav aria-label="Breadcrumb" className="mb-5 text-sm text-white/60">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span>{policy.title}</span>
        </nav>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
          Nagana Media
        </p>
        <h1 className="mt-3 max-w-4xl text-[40px] font-bold leading-none lg:text-[56px]">
          {policy.title}
        </h1>
      </section>

      <article data-container className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:p-8">
            {policy.blocks.map((block, index) => (
              <PolicyBlockRenderer key={index} block={block} />
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
