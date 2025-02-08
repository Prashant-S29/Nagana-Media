import React from "react";

// data
import { ExperienceData, ServicesData } from "./data";

// components
import { ExperienceCard, ServiceCard } from "~/components/common";
import { fonts } from "~/fonts";

const Services: React.FC = () => {
  return (
    <>
      <div className="flex h-[60vh] w-full items-center justify-center bg-gradient-to-r from-[#0c1323] to-[#1e2f45] px-[350px]">
        <div className="">
          <h1 className="text-center text-[60px] font-bold leading-none text-white">
            We Do Everything
          </h1>

          <p className="mt-5 text-center text-white">
            Driving growth for Technology Companies through Digital Marketing
            Excellence
          </p>
        </div>
      </div>

      {/* services */}
      <div className="w-full bg-[#fff] px-[300px] py-[50px]">
        <h1 className="text-center text-[30px] font-bold">
          All-In-One Cloud Software
        </h1>
        <p className="text-center leading-tight text-black/50">
          TOTC is one powerful online software suite that combines all the tools
          needed
          <br /> to run a successful school or office.
        </p>

        <div className="mt-[50px] grid grid-cols-3 gap-x-4 gap-y-14">
          {ServicesData.map((data, index) => (
            <ServiceCard key={index} data={data} />
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="w-full bg-[#f9f9f9] px-[300px] py-[50px]">
        <p
          className={`text-xl font-semibold uppercase leading-none text-brand ${fonts.bebas_neue.className}`}
        >
          Experience
        </p>
        <h1 className="text-[30px] font-bold leading-tight text-black">
          Grow Your Online Presence.
        </h1>
        <p className="text-sm leading-tight text-black/50">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
          <br />
          Lorem Ipsum has been the industry&apos;s standard dummy text ever.
        </p>

        <div className="mt-9 flex items-center gap-[100px]">
          <div className="relative">
            <div className="relative z-10 aspect-square w-[300px] rounded-full bg-[#f4f4f4]" />
            <div className="absolute -right-8 top-0 h-full w-full rounded-full bg-brand/30" />
          </div>

          <div className="flex w-full flex-col gap-3">
            {ExperienceData.map((data, index) => (
              <ExperienceCard key={index} data={data} />
            ))}
          </div>
        </div>
      </div>

      {/* Companies Logo */}
      <div className="grid w-full grid-cols-4 gap-[30px] bg-[#fff] px-[300px] py-[50px]">
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
