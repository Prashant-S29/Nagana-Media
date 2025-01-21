import Link from "next/link";
import React from "react";
import type { BlogProps } from "~/components/feature/BlogGrid/data";

interface BlogCardProps {
  data: BlogProps;
}

export const BlogCard: React.FC<BlogCardProps> = ({ data }) => {
  return (
    <div className="h-[300px] w-[250px] overflow-hidden rounded-xl bg-[#f9f9f9]">
      <div className="h-[180px] w-full rounded-t-xl border" />

      <div className="px-3 py-2">
        <p className="text-xs text-gray-600">
          {data.date} | {data.tags}
        </p>
        <h1 className="text-lg font-bold">{data.title}</h1>

        <Link
          href={data.href}
          className="mt-3 text-xs font-medium text-brand underline underline-offset-4"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};
