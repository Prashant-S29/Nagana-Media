import React from "react";

// components
import { Button } from "~/components/ui/button";

export const Hero: React.FC = () => {
  return (
    <div
      data-container
      className="flex h-[80vh] w-full items-center justify-between gap-[50px] bg-gradient-to-r from-[#0c1323] to-[#1e2f45]"
    >
      <div className="">
        <h1 className="text-[40px] font-bold leading-none text-white lg:text-[50px] xl:text-[60px]">
          Make
        </h1>
        <h1 className="text-[40px] font-bold leading-none text-[#b7faff] lg:text-[50px] xl:text-[60px]">
          Technology
        </h1>
        <h1 className="text-[40px] font-bold leading-none text-white lg:text-[50px] xl:text-[60px]">
          Resonate
        </h1>

        <p className="mt-5 text-sm font-extralight leading-tight text-white sm:text-base">
          {/* Driving growth for Technology Companies
          <br /> through Digital Marketing Excellence */}
          {/* B2B Technology and SaaS companies find it increasingly difficult to
          reach their customers. We help you plan, create, and execute a
          strategy that works to make your technology solution relatable for
          faster adoption. */}
          We are a B2B agency that helps you plan, create, and execute a
          strategy to make your technology solution relatable for faster
          adoption.
        </p>

        <Button variant="brand" className="mt-5">
          Let&apos;s Talk
        </Button>
      </div>
      <div className="block h-[350px] min-w-[300px] rounded-lg border max-[900px]:hidden lg:h-[450px] lg:min-w-[400px]" />
    </div>
  );
};
