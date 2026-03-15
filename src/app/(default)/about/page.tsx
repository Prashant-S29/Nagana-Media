import React from "react";

// data
import { StatsData } from "./data";

// fonts
import { fonts } from "~/fonts";

// utils
import { generateSeo } from "~/utils/generateSeo";

// Force static generation - critical for SEO and LLM crawlers
export const dynamic = "force-static";

// components
import {
  aboutUsBannerImage,
  aboutUsImageOne,
  aboutUsImageTwo,
} from "public/assets/static";
import Image from "next/image";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.naganamedia.com";

export const generateMetadata = (): import("next").Metadata =>
  generateSeo({
    title: "About Us | Nagana Media – GTM & B2B Technology Marketing Agency",
    description:
      "Nagana Media is a B2B marketing and GTM strategy agency with 10+ years of experience helping technology companies plan, create, and execute strategies that accelerate adoption and growth.",
    url: "/about",
    keywords: [
      "About Nagana Media",
      "B2B marketing agency",
      "GTM strategy agency",
      "technology marketing",
      "B2B digital marketing",
      "go-to-market consultancy",
    ],
  });

// JSON-LD structured data for About page
const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Nagana Media",
  url: `${baseUrl}/about`,
  description:
    "Nagana Media is a B2B marketing and GTM strategy agency with 10+ years of experience helping technology companies plan, create, and execute strategies that accelerate adoption and growth.",
  mainEntity: {
    "@type": "Organization",
    name: "Nagana Media",
    url: baseUrl,
    logo: `${baseUrl}/assets/static/logo.webp`,
    foundingDate: "2020",
    description:
      "B2B agency specialising in Go-to-Market (GTM) strategy, sales enablement, and marketing for technology companies.",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 1,
      maxValue: 10,
    },
    areaServed: { "@type": "Place", name: "Worldwide" },
    address: {
      "@type": "PostalAddress",
      streetAddress: "6, Raghu Vihar, Maharani Farm, Durgapura",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "contact@naganamedia.com",
      telephone: "+91-63771-91007",
    },
    knowsAbout: [
      "Go-to-Market Strategy",
      "Sales Enablement",
      "Marketing Enablement",
      "B2B Technology Marketing",
      "Program Management",
      "AI Strategy",
    ],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    {
      "@type": "ListItem",
      position: 2,
      name: "About Us",
      item: `${baseUrl}/about`,
    },
  ],
};

const About: React.FC = () => {
  return (
    <>
      {/* AboutPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      {/* Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Main Intro */}
      <div
        data-container
        className="relative flex h-[80vh] w-full items-center justify-center bg-gradient-to-r from-[#0c1323] to-[#1e2f45]"
      >
        <Image
          src={aboutUsBannerImage}
          alt="aboutUsBannerImage"
          fill
          className="w-full object-cover"
        />

        <div className="relative z-10 w-full sm:text-center">
          <h1 className="text-[40px] font-bold leading-none text-white lg:text-[50px] xl:text-[60px]">
            About Us
          </h1>

          <p className="mt-2 text-base font-light leading-tight text-white sm:mt-5 sm:text-base">
            Creative digital solutions for modern brands.
          </p>
        </div>
      </div>

      {/* Intro */}
      <div
        data-container
        className="flex w-full flex-col-reverse gap-8 bg-[#fff] py-9 sm:flex-row sm:items-center sm:gap-[100px] sm:py-[50px]"
      >
        <div className="w-full">
          <h2 className="text-[30px] font-bold leading-none sm:leading-tight">
            The 21st century is the era of change, very fast change!
          </h2>
          <p className="mt-4 text-base leading-tight text-black/50">
            The way of running your business is changing and so is how people
            interact with your business. The old models of selling and marketing
            are out and customers behaviors are getting highly complex
          </p>
          <p className="mt-1 text-base leading-tight text-black/50">
            Gone are the times, when you relied on a sales executive to educate
            your customers about solutions. The B2B customers of today are
            fairly knowledgable and the majority of them are pretty clear on
            what solutions they are looking for
          </p>
        </div>
        <div className="relative w-[200px] sm:min-w-[300px]">
          <div className="relative z-10 aspect-square w-[300px] overflow-hidden rounded-full bg-[#f4f4f4]">
            <Image
              src={aboutUsImageOne}
              alt="aboutUsImageOne"
              fill
              className="w-full object-cover"
            />
          </div>
          <div className="absolute -right-3 top-0 h-full w-full rounded-full bg-brand/30" />
        </div>
      </div>

      {/* Stats */}
      <div
        data-container
        className="grid grid-cols-2 gap-[30px] bg-[#F9f9f9] py-[50px] sm:grid-cols-4"
      >
        {StatsData.map((data, index) => (
          <div key={index}>
            <p
              className={`${fonts.bebas_neue.className} text-center text-[40px] leading-none text-brand`}
            >
              {data.label}
            </p>
            <p className="text-center text-sm text-black/50">{data.title}</p>
          </div>
        ))}
      </div>

      {/* Growth with Nagana Media */}
      <div data-container className="w-full bg-[#fff] py-[50px]">
        <h2 className="text-[30px] font-bold leading-none sm:leading-tight">
          Empowering Growth With Nagana Media
        </h2>
        <p className="mt-3 leading-tight text-black/50">
          In such a time, you can&apos;t put all your money on one tactic. To
          win, you&apos;ll have to have a holistic view and a vantage point that
          allows you to quickly adjust your strategy and tactics.
        </p>
        <p className="mt-2 leading-tight text-black/50">
          We offer end-to-end digital marketing services like web development,
          SEO,technology content creation, lead generation, marketing campaigns,
          client reachouts, social media management, and conversion
          optimization.
        </p>
        <div className="mt-9 flex items-center justify-center gap-[100px]">
          <div className="relative hidden lg:block">
            <div className="relative z-10 aspect-square w-[300px] overflow-hidden rounded-full bg-[#f4f4f4]">
              <Image
                src={aboutUsImageTwo}
                alt="aboutUsImageTwo"
                fill
                className="w-full object-cover"
              />
            </div>
            <div className="absolute -right-3 top-0 h-full w-full rounded-full bg-brand/30" />
          </div>
          <div className="flex w-full flex-col gap-4">
            <p className="max-w-[500px] rounded-lg bg-brand/20 px-5 py-4 leading-tight">
              At Nagana Media, we understand this complexity and have the right
              resources and talent to execute. We are a creative digital
              marketing, branding, and sales agency that works as an extension
              of your digital operations. We have more than 10 years of digital
              marketing experience, especially in a B2B setting.
            </p>
            <p className="max-w-[500px] rounded-lg bg-brand/50 px-5 py-4 leading-tight">
              We work with a growth mindset and an aim to deliver customer
              outcomes. We deploy highly integrated digital marketing strategies
              once we understand your specific problems. Working on a sprint
              model, which helps you better track marketing and sales programs.
            </p>
          </div>
        </div>
      </div>

      {/* Meet Our Team */}
      {/* <Team /> */}
    </>
  );
};

export default About;
