import React from "react";
import Link from "next/link";

// data
import type { BlogProps } from "~/components/feature/BlogGrid/data";

// components
import { Button } from "~/components/ui/button";

interface BlogCardProps {
  data: BlogProps;
}

export const BlogCard: React.FC<BlogCardProps> = ({ data }) => {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-[#f9f9f9]">
      <div className="h-[180px] w-full rounded-t-xl border" />

      <div className="px-3 py-3">
        <p className="text-xs text-black/50">
          {data.date} | {data.tags}
        </p>
        <h1 className="mt-1 text-base font-semibold leading-tight sm:font-medium">
          {data.title}
        </h1>

        <Button asChild variant="brand" size="sm">
          <Link
            href={data.href}
            className="mt-3 text-xs font-medium text-brand"
          >
            Learn More
          </Link>
        </Button>
      </div>
    </div>
  );
};
