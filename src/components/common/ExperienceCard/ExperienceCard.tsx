import React from "react";
import type { ExperienceDataProps } from "~/app/(default)/services/data";

interface ExperienceCardProps {
  data: ExperienceDataProps;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center">
      <div>
        <h3 className="text-lg font-medium leading-tight">{data.title}</h3>
        <p className="text-sm leading-tight text-black/50">
          {data.description}
        </p>
      </div>
    </div>
  );
};
