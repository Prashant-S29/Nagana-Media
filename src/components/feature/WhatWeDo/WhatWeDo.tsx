import React from "react";

// data
import { engineData, whatWeDoData } from "./data";

// components
import { Button } from "~/components/ui/button";
import { ServiceCard } from "~/components/common";

export const WhatWeDo: React.FC = () => {
  return (
    <>
      <div
        data-container
        className="flex w-full flex-col items-center justify-between gap-5 bg-white py-[20px] max-[900px]:py-[40px] sm:flex-row sm:gap-[50px] sm:py-[80px]"
      >
        {/* <div className="h-[400px] min-w-[400px] rounded-lg border" /> */}
        <div className="block h-[350px] w-full rounded-lg border sm:min-w-[300px] lg:h-[450px] lg:min-w-[400px]" />

        <div>
          <h1 className="text-[30px] font-bold leading-none sm:text-center sm:leading-tight">
            What we do
          </h1>
          <p className="mt-2 text-black/50 sm:mt-0">
            We identify the right touchpoints for your technology solution to
            create an interlinked, end-to-end, marketing and sales operation.{" "}
          </p>
          <p className="mt-2 text-black/50">
            This encapsulates covering all the tactics and creating integrated
            content and marketing strategy that goes beyond TOFU, MOFU, and BOFU
            content and educates your audience.
          </p>

          <Button variant="brand" className="mt-5">
            Learn More
          </Button>
        </div>
      </div>
      <div data-container className="w-full bg-[#f9f9f9] py-[50px]">
        <h1 className="text-[28px] font-bold leading-none sm:text-center sm:leading-tight md:text-[30px]">
          {/* All-In-One Cloud Software */}
          Choose what you need, when you need it.
        </h1>
        <div className="mt-5 flex justify-center sm:mt-0">
          <p className="max-w-[700px] leading-tight text-black/50 sm:text-center">
            {/* TOTC is one powerful online software suite that combines all the tools
          needed
          <br /> to run a successful school or office. */}
            Our services allow you high degree of composability and help you
            only select the service that fills in the gaps in your product
            marketing, communication, and GTM strategy.
          </p>
        </div>

        <div className="mt-[50px] grid gap-x-4 gap-y-5 max-[700px]:grid-cols-1 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3">
          {whatWeDoData.map((data, index) => (
            <ServiceCard key={index} data={data} />
          ))}
        </div>
      </div>
      <div data-container className="py-10">
        <h2 className="leading text-[30px] font-bold leading-none sm:text-center sm:text-[28px] sm:leading-tight">
          Address change with Bespoke <br className="hidden sm:block" />
          Strategy
        </h2>
        <div className="mt-8 justify-between gap-9 sm:mt-[100px] sm:flex sm:py-[80px]">
          <div>
            <div className="">
              <div className="h-[200px] w-full rounded-xl border sm:h-[400px] sm:w-[70%]" />
              <h1 className="mt-3 px-2 text-base font-bold sm:mt-8 sm:px-0 sm:text-xl">
                360-degree Coverage
              </h1>
              <p className="px-2 text-sm leading-tight text-black/50 sm:mt-1 sm:px-0 sm:text-base">
                Cover all the areas of GTM projects, fill all gaps and address
                all concerns.
              </p>
            </div>

            <div className="mt-8 sm:mt-[50px]">
              <div className="h-[200px] w-full rounded-xl border sm:h-[300px]" />
              <h1 className="mt-3 px-2 text-base font-bold sm:mt-8 sm:px-0 sm:text-xl">
                Execute on Cue
              </h1>
              <p className="px-2 text-sm leading-tight text-black/50 sm:mt-1 sm:px-0 sm:text-base">
                Hire experts who executes marketing & content campaigns on your
                behalf.
              </p>
            </div>
          </div>
          <div className="mt-8 sm:-mt-[100px]">
            <div>
              <div className="h-[200px] w-full rounded-xl border sm:h-[300px]" />
              <h1 className="mt-3 px-2 text-base font-bold sm:mt-8 sm:px-0 sm:text-xl">
                Flexible Strategy
              </h1>
              <p className="px-2 text-sm leading-tight text-black/50 sm:mt-1 sm:px-0 sm:text-base">
                Shift posture swiftly with change in market trends and needs.
              </p>
            </div>

            <div className="mt-8 flex justify-end sm:mt-[50px]">
              <div className="w-full min-w-[70%] sm:max-w-full md:max-w-[70%]">
                <div className="flex justify-end">
                  <div className="h-[200px] w-full rounded-xl border sm:h-[400px]" />
                </div>
                <h1 className="mt-3 px-2 text-base font-bold sm:mt-8 sm:px-0 sm:text-xl">
                  Scale Quickly
                </h1>
                <p className="px-2 text-sm leading-tight text-black/50 sm:mt-1 sm:px-0 sm:text-base">
                  Scales highly integrated marketing and scales initiatives
                  fractionally.
                </p>
              </div>
            </div>

            <div className="mt-8 hidden justify-end sm:flex">
              <div className="flex w-[70%] justify-center">
                <div className="flex aspect-square w-[120px] items-center justify-center rounded-full bg-brand">
                  <p className="text-lg font-semibold text-white">View All</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-container className="bg-[#f9f9f9] py-[40px]">
        <div>
          <h1 className="text-[30px] font-bold leading-none sm:text-center sm:leading-tight">
            Achieve Consistent Organic Growth
          </h1>
          <div className="mt-3 flex justify-center sm:mt-0">
            <p className="max-w-[700px] leading-tight text-black/50 sm:text-center">
              We take your technology innovation to the market with design,
              consistent content generation, sustained marketing campaigns, and
              ensuring uniformity across your digital footprint.
            </p>
          </div>
        </div>
        <div className="mt-[50px] grid gap-x-4 gap-y-5 max-[700px]:grid-cols-1 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3">
          {engineData.map((data, index) => (
            <ServiceCard key={index} data={data} />
          ))}
        </div>
      </div>
    </>
  );
};
