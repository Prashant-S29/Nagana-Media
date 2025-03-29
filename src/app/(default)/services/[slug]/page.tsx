import React from "react";
import { notFound } from "next/navigation";

// types
import type { Metadata } from "next";

// styles
import markdownStyles from "~/styles/markdown-styles.module.css";

// utils
import { getAllServices, getServiceBySlug } from "~/utils/api";
import markdownToHtml from "~/utils/markdownToHtml";
import { generateSeo } from "~/utils/generateSeo";

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return notFound();
  }

  return generateSeo({
    title: `${service.title} | Services`,
    description: `${service.description}`,
    url: `/services/${service.slug}`,
  });
}

export async function generateStaticParams() {
  const services = getAllServices();

  return services.map((service) => ({
    slug: service.slug,
  }));
}

interface Params {
  params: Promise<{
    slug: string;
  }>;
}

const Service: React.FC<Params> = async ({ params }) => {
  const slug = (await params).slug;
  const service = getServiceBySlug(slug);

  if (!service) {
    return notFound();
  }

  const content = await markdownToHtml(service.content || "");

  return (
    <>
      <div
        data-container
        className="flex h-[60vh] w-full items-center justify-center bg-gradient-to-r from-[#0c1323] to-[#1e2f45]"
      >
        <div className="w-full sm:text-center">
          <h1 className="text-[40px] font-bold leading-none text-white lg:text-[50px] xl:text-[60px]">
            {service.title}
          </h1>

          <p className="mt-2 text-base font-light leading-tight text-white sm:mt-5 sm:text-base">
            {service.description}
          </p>
        </div>
      </div>
      <article data-container className="mt-10">
        <div
          className={markdownStyles.markdown}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </>
  );
};

export default Service;
