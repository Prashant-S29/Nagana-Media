import React from "react";
import { Button } from "~/components/ui/button";
import { whatWeDoData } from "./data";
import Link from "next/link";

export const WhatWeDo: React.FC = () => {
  return (
    <>
      <div className="flex w-full items-center justify-between gap-[50px] bg-white px-[300px] py-[80px]">
        <div className="h-[400px] min-w-[400px] rounded-lg border" />

        <div>
          <h1 className="text-[50px] font-bold">What we do</h1>
          <p className="text-gray-600">
            We identify the right touchpoints for your technology solution to
            create an interlinked, end-to-end, marketing and sales operation.{" "}
          </p>
          <p className="mt-2 text-gray-600">
            This encapsulates covering all the tactics and creating integrated
            content and marketing strategy that goes beyond TOFU, MOFU, and BOFU
            content and educates your audience.
          </p>

          <Button variant="brand" className="mt-5">
            Learn More
          </Button>
        </div>
      </div>
      <div className="flex w-full justify-center gap-4 bg-[#f9f9f9] px-[300px] py-[50px]">
        {whatWeDoData.map((data, index) => (
          <div key={index} className="rounded-lg bg-white px-5 py-4">
            <div className="h-[70px] w-[60px] rounded-lg border" />
            <h2 className="mt-9 text-[18px] font-bold">{data.title}</h2>
            <p className="mt-2 text-sm leading-tight text-gray-600">
              {data.description}
            </p>
            <div className="mt-5">
              <Link
                href={data.href}
                className="text-xs font-semibold uppercase text-brand underline underline-offset-4"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[100px] flex justify-between px-[350px] py-[80px]">
        <div>
          <div>
            <div className="h-[400px] w-[70%] rounded-xl border" />
            <h1 className="mt-8 text-xl font-bold">360-degree Coverage</h1>
            <p className="mt-1 leading-tight text-gray-600">
              Cover all the areas of GTM projects, fill all gaps and address all
              concerns.
            </p>
          </div>

          <div className="mt-[50px]">
            <div className="h-[300px] w-full rounded-xl border" />
            <h1 className="mt-8 text-xl font-bold">Execute on Cue</h1>
            <p className="mt-1 leading-tight text-gray-600">
              Hire experts who executes marketing & content campaigns on your
              behalf.
            </p>
          </div>
        </div>
        <div className="-mt-[100px]">
          <div>
            <div className="h-[300px] w-full rounded-xl border" />
            <h1 className="mt-8 text-xl font-bold">Flexible Strategy</h1>
            <p className="mt-1 leading-tight text-gray-600">
              Shift posture swiftly with change in market trends and needs.
            </p>
          </div>

          <div className="mt-[50px] flex justify-end">
            <div className="min-w-[70%] max-w-[70%]">
              <div className="flex justify-end">
                <div className="h-[400px] w-full rounded-xl border" />
              </div>
              <h1 className="mt-8 text-xl font-bold">Scale Quickly</h1>
              <p className="mt-1 leading-tight text-gray-600">
                Scales highly integrated marketing and scales initiatives
                fractionally.
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <div className="flex w-[70%] justify-center">
              <div className="flex aspect-square w-[120px] items-center justify-center rounded-full bg-brand">
                <p className="text-lg font-semibold text-white">View All</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f9f9f9] px-[300px] py-[40px]">
        <div>
          <h1 className="text-center text-[40px] font-bold">
            Achieve Consistent Organic Growth
          </h1>
          <p className="text-center leading-tight text-gray-600">
            We take your technology innovation to the market with consistent
            content generation, sustained marketing campaigns, and ensuring
            uniform messaging across your digital footprint.
          </p>
        </div>
        <div className="mt-5 flex w-full justify-center gap-4">
          {whatWeDoData.map((data, index) => (
            <div key={index} className="rounded-lg bg-white px-5 py-4">
              <div className="h-[70px] w-[60px] rounded-lg border" />
              <h2 className="mt-9 text-[18px] font-bold">{data.title}</h2>
              <p className="mt-2 text-sm leading-tight text-gray-600">
                {data.description}
              </p>
              <div className="mt-5">
                <Link
                  href={data.href}
                  className="text-xs font-semibold uppercase text-brand underline underline-offset-4"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
