import React from "react";
import Link from "next/link";

// utils
import { getAllPosts } from "~/utils/api";

// components
import { BlogCard } from "~/components/common";

export const BlogGrid: React.FC = () => {
  const allPosts = getAllPosts();

  return (
    <div data-container className="bg-white py-[60px]">
      <p className="text-center text-xs font-bold uppercase text-brand">
        Blog & News
      </p>
      <h1 className="text-center text-[30px] font-bold md:text-[36px]">
        Our Latest Blog Posts
      </h1>

      <div className="flex justify-end">
        <Link
          href="/blogs"
          className="text-sm font-medium text-brand underline underline-offset-4"
        >
          View all Blogs
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="mt-3 grid gap-x-4 gap-y-5 max-[700px]:grid-cols-1 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3">
          {allPosts.slice(0, 3).map((blog, index) => (
            <BlogCard key={index} data={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};
