"use client";

import React, { useState } from "react";
import { testimonialData } from "./data";

export const Testimonial: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="bg-white px-[350px] py-[60px]">
      <p className="text-xs font-bold uppercase text-brand">Testimonial</p>
      <h2 className="text-[40px] font-bold">What our clients say</h2>

      <div className="mt-5 flex gap-5">
        {testimonialData.map((data, index) => (
          <div
            key={index}
            className="flex h-[180px] flex-col justify-between rounded-xl border-2 border-brand px-5 py-4"
            style={{ display: activeTab === index ? "flex" : "none" }}
          >
            <div>
              <p className="font-medium leading-snug">
                &ldquo;{data.message}&rdquo;
              </p>
            </div>
            <div>
              <p className="font-bold uppercase leading-tight">{data.name}</p>
              <p className="text-xs text-gray-600">{data.designation}</p>
            </div>
          </div>
        ))}
        <div className="flex flex-col justify-between gap-3">
          {testimonialData.map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-[50px]">
                {activeTab === index && (
                  <div className="h-[1px] w-full bg-black" />
                )}
              </div>
              <div
                className="aspect-square min-w-[50px] cursor-pointer rounded-full border"
                style={{
                  borderColor: activeTab === index ? "#000000" : "#D9D9D9",
                }}
                onClick={() => setActiveTab(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
