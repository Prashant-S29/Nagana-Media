import React from "react";
import Image from "next/image";

// assets
import { servicePageBannerImage } from "public/assets/static";

// data
import { ExperienceData } from "./data";

// fonts
import { fonts } from "~/fonts";

// utils
import { getAllServices } from "~/utils/api";

// components
import { ExperienceCard, ServiceCard } from "~/components/common";
import { generateSeo } from "~/utils/generateSeo";

// Force static generation - critical for SEO and LLM crawlers
export const dynamic = "force-static";

export const generateMetadata = () =>
  generateSeo({
    title: "Services",
    description:
      "Driving growth for Technology Companies through Digital Marketing Excellence",
    url: "/services",
  });

const Services: React.FC = () => {
  // get all the services
  const allServices = getAllServices();
  return (
    <>
      <div
        data-container
        className="relative flex h-[80vh] w-full items-center justify-center bg-gradient-to-r from-[#0c1323] to-[#1e2f45]"
      >
        <Image
          src={servicePageBannerImage}
          alt="Nagana Media B2B technology marketing services"
          fill
          className="w-full object-cover"
        />

        <div className="relative z-10">
          <h1 className="text-center text-[40px] font-bold leading-none text-white lg:text-[50px] xl:text-[60px]">
            Build Your Own Service Stack
          </h1>

          <p className="mt-2 text-center text-base font-light leading-tight text-white sm:mt-5 sm:text-base">
            Driving growth for Technology Companies through Digital Marketing
            Excellence
          </p>
        </div>
      </div>

      {/* services */}
      <div data-container className="w-full bg-[#fff] py-[50px]">
        <h2 className="text-[30px] font-bold leading-none sm:text-center sm:leading-tight">
          Flexible Services, Built for B2B Technology
        </h2>
        <p className="mt-3 leading-tight text-body-muted sm:mt-1 sm:text-center">
          Pick the services that fill the gaps in your GTM strategy.{" "}
          <br className="hidden sm:block" />
          From content and campaigns to sales support and program management.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-7 sm:mt-[50px] sm:grid-cols-2 md:gap-y-14 lg:grid-cols-3">
          {allServices.map((data, index) => (
            <ServiceCard key={index} data={data} />
          ))}
        </div>
      </div>

      {/* Experience */}
      <div data-container className="w-full bg-[#f9f9f9] py-[50px]">
        <p
          className={`text-xl font-semibold leading-none text-brand ${fonts.bebas_neue.className}`}
        >
          Experience
        </p>
        <h2 className="mt-4 text-[30px] font-bold leading-none text-black md:text-[36px]">
          Grow Your Online Presence.
        </h2>
        {/* <p className="mt-2 text-sm leading-tight text-body-muted">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
          <br />
          Lorem Ipsum has been the industry&apos;s standard dummy text ever.
        </p> */}

        <div className="mt-5 flex items-center gap-[100px]">
          <div className="flex w-full flex-col gap-3">
            {ExperienceData.map((data, index) => (
              <ExperienceCard key={index} data={data} />
            ))}
          </div>
        </div>
      </div>

      {/* Companies Logo */}
      {/* <div
        data-container
        className="grid w-full grid-cols-2 gap-3 bg-[#fff] py-[50px] sm:grid-cols-3 sm:gap-[30px] md:grid-cols-4"
      >
        {Array(4)
          .fill(" ")
          .map((_, index) => (
            <div
              key={index}
              className="h-[150px] w-full rounded-lg border bg-[#f4f4f4]"
            />
          ))}
      </div> */}
    </>
  );
};

export default Services;
