import React from "react";
import type { ExperienceDataProps } from "~/app/(default)/services/data";

interface ExperienceCardProps {
  data: ExperienceDataProps;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center">
      <div className="flex aspect-square w-[60px] min-w-[60px] items-center justify-center rounded-full bg-brand">
        <p className={`text-xl font-semibold leading-none text-white`}>
          {data.percentage}%
        </p>
      </div>
      <div>
        <h1 className="text-lg font-medium leading-tight">{data.title}</h1>
        <p className="text-sm leading-tight text-black/50">
          {data.description}
        </p>
      </div>
    </div>
  );
};
