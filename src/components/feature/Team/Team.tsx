import React from "react";
import { teamData } from "./data";
import { TeamCard } from "~/components/common";

export const Team: React.FC = () => {
  return (
    <div className="bg-[#f9f9f9] px-[300px] py-[80px]">
      <p className="text-center text-xs font-bold uppercase text-brand">
        Our Team
      </p>
      <h1 className="text-center text-[40px] font-bold">Meet Our Best Team</h1>

      <div className="mt-5 flex justify-center gap-3">
        {teamData.map((data, index) => (
          <TeamCard key={index} data={data} />
        ))}
      </div>
    </div>
  );
};
