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
      <div className="absolute -top-[35px] left-1/2 h-[70px] w-[70px] -translate-x-1/2 rounded-full border bg-brand group-hover:bg-brand/90" />
      <div className="mt-8 flex flex-col items-center justify-between gap-5">
        <div className="w-full">
          <h2 className="text-center text-lg font-medium">{data.title}</h2>
          <p className="text-center text-sm text-black/50">
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
