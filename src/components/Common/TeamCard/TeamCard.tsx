"use client";

import Link from "next/link";
import React, { useState } from "react";
import type { TeamProps } from "~/components/feature/Team/data";
import { Button } from "~/components/ui/button";
import { SocialIcons } from "~/icons";

interface TeamCardProps {
  data: TeamProps;
}

export const TeamCard: React.FC<TeamCardProps> = ({ data }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div className="group w-[250px]">
      <div
        className="relative h-[260px] w-full"
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
      >
        <div className="h-full w-full rounded-xl border" />
        {isHover && (
          <div className="absolute bottom-5 flex w-full items-center justify-center gap-3">
            <Button asChild variant="outline" size="icon">
              <Link href={data.twitter} target="_blank">
                <SocialIcons.TwitterIcon />
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon">
              <Link href={data.instagram} target="_blank">
                <SocialIcons.InstagramIcon />
              </Link>
            </Button>
          </div>
        )}
      </div>
      <h1 className="mt-3 text-center font-semibold uppercase">{data.name}</h1>
      <p className="text-center text-xs leading-none text-gray-600">
        {data.designation}
      </p>
    </div>
  );
};
