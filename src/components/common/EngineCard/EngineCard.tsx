import Image from "next/image";
import React from "react";

// types
import type { WhatWeDoProps } from "~/components/feature/WhatWeDo/data";

interface ServiceCardProps {
  data: WhatWeDoProps;
}

export const EngineCard: React.FC<ServiceCardProps> = ({ data }) => {
  return (
    <div className="group relative w-full rounded-xl border bg-white px-4 py-4 shadow-[0px_10px_10px_rgba(0,0,0,0.02)]">
      <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full border bg-brand group-hover:bg-brand/90 sm:absolute sm:-top-[35px] sm:left-1/2 sm:-translate-x-1/2">
        <Image
          src={data.icon}
          alt={data.title}
          width={30}
          height={30}
          className="h-[30px] object-contain"
        />
      </div>
      <div className="flex h-full flex-col justify-between gap-5 pt-3 sm:items-center sm:pt-8">
        <div className="w-full">
          <h2 className="text-lg font-medium sm:text-center">{data.title}</h2>
          <p className="text-body-muted text-sm sm:text-center">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};
