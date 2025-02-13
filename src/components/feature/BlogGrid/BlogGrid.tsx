import React from "react";
import { blogData } from "./data";
import { BlogCard } from "~/components/common";

export const BlogGrid: React.FC = () => {
  return (
    <div data-container className="bg-white py-[60px]">
      <p className="text-center text-xs font-bold uppercase text-brand">
        Blog & News
      </p>
      <h1 className="text-center text-[30px] font-bold md:text-[36px]">
        Our Latest Blog Posts
      </h1>
      <div className="flex justify-center">
        <div className="mt-5 grid gap-x-4 gap-y-5 max-[700px]:grid-cols-1 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3">
          {blogData.map((data, index) => (
            <BlogCard key={index} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
};
