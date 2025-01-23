import React from "react";
import { blogData } from "./data";
import { BlogCard } from "~/components/Common";

export const BlogGrid: React.FC = () => {
  return (
    <div className="bg-white px-[350px] py-[60px]">
      <p className="text-center text-xs font-bold uppercase text-brand">
        Blog & News
      </p>
      <h1 className="text-center text-[40px] font-bold">
        Our Latest Blog Posts
      </h1>
      <div className="mt-5 flex justify-center gap-5">
        {blogData.map((data, index) => (
          <BlogCard key={index} data={data} />
        ))}
      </div>
    </div>
  );
};
