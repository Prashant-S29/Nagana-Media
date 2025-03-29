import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { TeamProps } from "~/components/feature/Team/data";
import { Button } from "~/components/ui/button";
import { SocialIcons } from "~/icons";

interface TeamCardProps {
  data: TeamProps;
}

export const TeamCard: React.FC<TeamCardProps> = ({ data }) => {
  return (
    <div className="group w-[250px] rounded-lg border bg-white p-3 shadow-sm">
      <div className="relative h-[260px] w-full">
        <div className="relative h-full w-full overflow-hidden rounded-sm border bg-[#f9f9f9]">
          <Image
            src={data.image}
            alt={data.name}
            fill
            className="w-full object-cover"
          />
        </div>
        <div className="absolute right-3 top-3">
          <Button asChild variant="outline" size="icon">
            <Link href={data.linkedIn} target="_blank">
              <SocialIcons.LinkedInIcon />
            </Link>
          </Button>
        </div>
      </div>
      <h1 className="mt-1 font-semibold text-brand">{data.name}</h1>
      <p className="text-xs leading-none text-black/50">{data.designation}</p>
    </div>
  );
};
