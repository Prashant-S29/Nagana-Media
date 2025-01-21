import React from "react";
import { teamData } from "./data";
import { TeamCard } from "~/components/Common";

export const Team: React.FC = () => {
  return (
    <div className="bg-[#f7f7f7] px-[300px] py-[80px]">
      <p className="text-center text-xs font-bold uppercase text-brand">
        Our Team Member
      </p>
      <h1 className="text-center text-[40px] font-bold">
        We Have Skilled People
      </h1>

      <div className="mt-5 flex justify-center gap-5">
        {teamData.map((data, index) => (
          <TeamCard key={index} data={data} />
        ))}
      </div>
    </div>
  );
};
