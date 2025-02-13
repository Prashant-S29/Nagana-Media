import Link from "next/link";
import React from "react";

// types
import type { WhatWeDoProps } from "~/components/feature/WhatWeDo/data";
import { Button } from "~/components/ui/button";

interface ServiceCardProps {
  data: WhatWeDoProps;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ data }) => {
  return (
    <div className="group relative w-full rounded-xl border bg-white px-4 py-4 shadow-[0px_10px_10px_rgba(0,0,0,0.02)]">
      <div className="h-[70px] w-[70px] rounded-full border bg-brand group-hover:bg-brand/90 sm:absolute sm:-top-[35px] sm:left-1/2 sm:-translate-x-1/2" />
      <div className="mt-3 flex flex-col justify-between gap-5 sm:mt-8 sm:items-center">
        <div className="w-full">
          <h2 className="text-lg font-medium sm:text-center">{data.title}</h2>
          <p className="text-sm text-black/50 sm:text-center">
            {data.description}
          </p>
        </div>

        <Button
          asChild
          variant="brand"
          size="sm"
          className="w-fit group-hover:bg-brand/90"
        >
          <Link href={data.href}>Learn More</Link>
        </Button>
      </div>
    </div>
  );
};
