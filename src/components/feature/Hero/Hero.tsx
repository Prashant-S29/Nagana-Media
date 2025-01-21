import React from "react";

// components
import { Button } from "~/components/ui/button";

export const Hero: React.FC = () => {
  return (
    <div className="flex h-[80vh] w-full items-center justify-between bg-gradient-to-r from-[#0c1323] to-[#1e2f45] px-[350px]">
      <div className="">
        <h1 className="text-[60px] font-bold leading-none text-white">Make</h1>
        <h1 className="text-[60px] font-bold leading-none text-[#b7faff]">
          Technology
        </h1>
        <h1 className="text-[60px] font-bold leading-none text-white">
          Resonate
        </h1>

        <p className="mt-5 text-white">
          Driving growth for Technology Companies
          <br /> through Digital Marketing Excellence
        </p>

        <Button variant="brand" className="mt-5">
          Let&apos;s Talk
        </Button>
      </div>
      <div className="h-[400px] min-w-[450px] rounded-lg border" />
    </div>
  );
};
