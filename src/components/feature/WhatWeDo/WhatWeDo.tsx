import React from "react";
import Image from "next/image";

// data
import { engineData } from "./data";

// utils
import { getAllServices } from "~/utils/api";

// assets
import {
  whatWeDoImage,
  imageOne,
  imageTwo,
  imageThree,
  imageFour,
} from "public/assets/static";

// components
import { Button } from "~/components/ui/button";
import { EngineCard, ServiceCard } from "~/components/common";

export const WhatWeDo: React.FC = () => {
  // get all the services
  const services = getAllServices();

  return (
    <>
      <div
        data-container
        className="flex w-full flex-col items-center justify-between gap-5 bg-white py-[20px] max-[900px]:py-[40px] sm:flex-row sm:gap-[50px] sm:py-[80px]"
      >
        <div className="block h-full w-full rounded-lg sm:min-w-[300px] lg:min-w-[400px]">
          <Image
            src={whatWeDoImage}
            alt="whatWeDoImage"
            width={600}
            height={600}
            priority
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            className="w-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-[30px] font-bold leading-none sm:leading-tight">
            What we do
          </h2>
          <p className="text-body-muted mt-2 sm:mt-0">
            We identify the right touchpoints for your technology solution to
            create an interlinked, end-to-end, marketing and sales
            operation.{" "}
          </p>
          <p className="text-body-muted mt-2">
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
        <h2 className="text-[28px] font-bold leading-none sm:text-center sm:leading-tight md:text-[30px]">
          Choose what you need, when you need it.
        </h2>
        <div className="mt-5 flex justify-center sm:mt-0">
          <p className="text-body-muted max-w-[700px] leading-tight sm:text-center">
            Our services allow you high degree of composability and help you
            only select the service that fills in the gaps in your product
            marketing, communication, and GTM strategy.
          </p>
        </div>

        <div className="mt-[50px] grid gap-x-4 gap-y-5 max-[700px]:grid-cols-1 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3">
          {services.slice(0, 3).map((data, index) => (
            <ServiceCard key={index} data={data} />
          ))}
        </div>
      </div>
      <div data-container className="py-10">
        <h2 className="text-[30px] font-bold leading-none sm:text-center sm:text-[28px] sm:leading-tight">
          Address change with Bespoke <br className="hidden sm:block" />
          Strategy
        </h2>
        <div className="mt-8 justify-between gap-9 sm:mt-[100px] sm:flex sm:py-[80px]">
          <div>
            <div className="">
              <div className="max-h-[200px] w-full overflow-hidden rounded-xl sm:max-h-[400px] sm:w-[70%]">
                <Image
                  src={imageOne}
                  alt="imageOne"
                  width={400}
                  height={400}
                  placeholder="blur"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  className="w-full object-cover"
                />
              </div>
              <h3 className="mt-3 px-2 text-base font-bold sm:mt-8 sm:px-0 sm:text-xl">
                360-degree Coverage
              </h3>
              <p className="text-body-muted px-2 text-sm leading-tight sm:mt-1 sm:px-0 sm:text-base">
                Cover all the areas of GTM projects, fill all gaps and address
                all concerns.
              </p>
            </div>

            <div className="mt-8 sm:mt-[50px]">
              <div className="max-h-[200px] w-full overflow-hidden rounded-xl sm:max-h-[300px]">
                <Image
                  src={imageThree}
                  alt="imageThree"
                  width={400}
                  height={400}
                  placeholder="blur"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  className="w-full object-cover"
                />
              </div>
              <h3 className="mt-3 px-2 text-base font-bold sm:mt-8 sm:px-0 sm:text-xl">
                Execute on Cue
              </h3>
              <p className="text-body-muted px-2 text-sm leading-tight sm:mt-1 sm:px-0 sm:text-base">
                Hire experts who executes marketing & content campaigns on your
                behalf.
              </p>
            </div>
          </div>
          <div className="mt-8 sm:-mt-[100px]">
            <div>
              <div className="max-h-[200px] w-full overflow-hidden rounded-xl sm:max-h-[300px]">
                <Image
                  src={imageTwo}
                  alt="imageTwo"
                  width={400}
                  height={400}
                  placeholder="blur"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  className="w-full object-cover"
                />
              </div>
              <h3 className="mt-3 px-2 text-base font-bold sm:mt-8 sm:px-0 sm:text-xl">
                Flexible Strategy
              </h3>
              <p className="text-body-muted px-2 text-sm leading-tight sm:mt-1 sm:px-0 sm:text-base">
                Shift posture swiftly with change in market trends and needs.
              </p>
            </div>

            <div className="mt-8 flex justify-end sm:mt-[50px]">
              <div className="w-full min-w-[70%] sm:max-w-full md:max-w-[70%]">
                <div className="flex justify-end">
                  <div className="max-h-[200px] w-full overflow-hidden rounded-xl sm:max-h-[400px]">
                    <Image
                      src={imageFour}
                      alt="imageFour"
                      width={400}
                      height={400}
                      placeholder="blur"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      className="w-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="px-2 text-base font-bold sm:mt-8 sm:px-0 sm:text-xl">
                  Scale Quickly
                </h3>
                <p className="text-body-muted px-2 text-sm leading-tight sm:mt-1 sm:px-0 sm:text-base">
                  Scales highly integrated marketing and scales initiatives
                  fractionally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-container className="bg-[#f9f9f9] py-[40px]">
        <div>
          <h2 className="text-[30px] font-bold leading-none sm:text-center sm:leading-tight">
            Achieve Consistent Organic Growth
          </h2>
          <div className="mt-3 flex justify-center sm:mt-0">
            <p className="text-body-muted max-w-[700px] leading-tight sm:text-center">
              We take your technology innovation to the market with design,
              consistent content generation, sustained marketing campaigns, and
              ensuring uniformity across your digital footprint.
            </p>
          </div>
        </div>
        <div className="mt-[50px] grid gap-x-4 gap-y-5 max-[700px]:grid-cols-1 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3">
          {engineData.map((data, index) => (
            <EngineCard key={index} data={data} />
          ))}
        </div>
      </div>
    </>
  );
};
