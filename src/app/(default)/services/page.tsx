import React from "react";

// data
import { ExperienceData, ServicesData } from "./data";

// components
import { ExperienceCard, ServiceCard } from "~/components/common";
import { fonts } from "~/fonts";

const Services: React.FC = () => {
  return (
    <>
      <div
        data-container
        className="flex h-[60vh] w-full items-center justify-center bg-gradient-to-r from-[#0c1323] to-[#1e2f45]"
      >
        <div className="">
          <h1 className="text-[40px] font-bold leading-none text-white lg:text-[50px] xl:text-[60px]">
            We Do Everything
          </h1>

          <p className="mt-2 text-base font-light leading-tight text-white sm:mt-5 sm:text-base">
            Driving growth for Technology Companies through Digital Marketing
            Excellence
          </p>
        </div>
      </div>

      {/* services */}
      <div data-container className="w-full bg-[#fff] py-[50px]">
        <h1 className="text-[30px] font-bold leading-none sm:text-center sm:leading-tight">
          All-In-One Cloud Software
        </h1>
        <p className="mt-3 leading-tight text-black/50 sm:mt-1 sm:text-center">
          TOTC is one powerful online software suite that combines all the tools{" "}
          <br className="hidden sm:block" />
          needed to run a successful school or office.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-7 sm:mt-[50px] sm:grid-cols-2 md:gap-y-14 lg:grid-cols-3">
          {ServicesData.map((data, index) => (
            <ServiceCard key={index} data={data} />
          ))}
        </div>
      </div>

      {/* Experience */}
      <div data-container className="w-full bg-[#f9f9f9] py-[50px]">
        <p
          className={`text-xl font-semibold uppercase leading-none text-brand ${fonts.bebas_neue.className}`}
        >
          Experience
        </p>
        <h1 className="mt-4 text-[30px] font-bold leading-none text-black md:text-[36px]">
          Grow Your Online Presence.
        </h1>
        <p className="mt-2 text-sm leading-tight text-black/50">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
          <br />
          Lorem Ipsum has been the industry&apos;s standard dummy text ever.
        </p>

        <div className="mt-5 flex items-center gap-[100px]">
          <div className="flex w-full flex-col gap-3">
            {ExperienceData.map((data, index) => (
              <ExperienceCard key={index} data={data} />
            ))}
          </div>
        </div>
      </div>

      {/* Companies Logo */}
      <div
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
      </div>
    </>
  );
};

export default Services;
