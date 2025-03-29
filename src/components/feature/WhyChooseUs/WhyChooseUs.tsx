import React from "react";
import Image from "next/image";

// data
import { whyChooseUsData } from "./data";

// fonts
import { fonts } from "~/fonts";
import { whyChooseUsImage } from "public/assets/static";

export const WhyChooseUs: React.FC = () => {
  return (
    <div
      data-container
      className="flex h-full w-full flex-col-reverse items-center justify-between gap-5 bg-[#262626] py-[50px] sm:flex-row sm:gap-[50px]"
    >
      <div>
        <p className="text-xs font-bold uppercase text-brand">Why Choose Us</p>
        <h1 className="mt-4 text-[30px] font-bold leading-none text-white md:text-[36px]">
          We understand the key pillars for your business success.
        </h1>
        <p className="mt-3 text-sm leading-tight text-white/70">
          Address your product marketing, brand awareness, and GTM strategy
          needs with constant expert support across critical verticals.
        </p>

        <div className="mt-5 flex flex-col gap-3">
          {whyChooseUsData.map((data, index) => (
            <div key={index} className="">
              <h3
                className={`font-medium uppercase leading-none text-white ${fonts.bebas_neue.className}`}
              >
                {data.title}
              </h3>
              <div className="relative mt-1 h-2 w-full bg-brand/40 sm:w-[400px]">
                <div
                  className="absolute left-0 top-0 h-full bg-brand"
                  style={{ width: `${data.percentage}%` }}
                />
                <p
                  className={`absolute -top-5 font-medium uppercase leading-none text-white ${fonts.bebas_neue.className}`}
                  style={{ left: `${data.percentage - 6}%` }}
                >
                  {data.percentage}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full min-w-full overflow-hidden rounded-lg sm:min-w-[350px]">
        <Image
          src={whyChooseUsImage}
          alt="whyChooseUsImage"
          width={600}
          height={600}
          className="w-full object-cover"
        />
      </div>
    </div>
  );
};
