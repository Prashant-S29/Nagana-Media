import React from "react";
import { whyChooseUsData } from "./data";

export const WhyChooseUs: React.FC = () => {
  return (
    <div className="flex h-[80vh] w-full items-center justify-between bg-[#262626] px-[350px]">
      <div className="">
        <p className="text-xs font-bold uppercase text-brand">Why Choose Us</p>
        <h1 className="mt-4 text-[36px] font-bold leading-none text-white">
          Great Solutions for your Business
        </h1>
        <p className="mt-3 text-xs text-white/70">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat
          suscipit nesciunt rem, repellendus, atque, iste incidunt expedita ex
          repellat expedita ex repellat expedita ex repellat quod libero
          molestias!
        </p>

        <div className="mt-5 flex flex-col gap-3">
          {whyChooseUsData.map((data, index) => (
            <div key={index} className="">
              <h3 className="text-xs font-medium uppercase text-white">
                {data.title}
              </h3>
              <div className="relative mt-1 h-2 w-[400px] bg-brand/40">
                <div
                  className="absolute left-0 top-0 h-full bg-brand"
                  style={{ width: `${data.percentage}%` }}
                />
                <p
                  className="absolute -top-5 text-xs font-medium uppercase text-white"
                  style={{ left: `${data.percentage - 6}%` }}
                >
                  {data.percentage}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[400px] min-w-[350px] rounded-lg border" />
    </div>
  );
};
