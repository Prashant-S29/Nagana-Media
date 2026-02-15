import React from "react";

// utils
import { getAllPosts } from "~/utils/api";
import { generateSeo } from "~/utils/generateSeo";

// components
import { BlogCard } from "~/components/common";
import Image from "next/image";
import { servicePageBannerImage } from "public/assets/static";

// Force static generation - critical for SEO and LLM crawlers
export const dynamic = "force-static";

export const generateMetadata = () =>
  generateSeo({
    title: "Blogs",
    description:
      "Explore expert insights, trends, and strategies in digital marketing, technology, and business growth.",
    url: "/blogs",
  });

const Blogs: React.FC = () => {
  const allPosts = getAllPosts();
  return (
    <>
      <div
        data-container
        className="relative flex h-[80vh] w-full flex-col items-center justify-center bg-gradient-to-r from-[#0c1323] to-[#1e2f45]"
      >
        <Image
          src={servicePageBannerImage}
          alt="servicePageBannerImage"
          fill
          className="w-full object-cover"
        />
        <div className="relative z-10">
          <h1 className="text-[40px] font-bold leading-none text-white lg:text-center lg:text-[50px] xl:text-[60px]">
            Our Blogs
          </h1>
          <p className="mt-2 text-base font-light leading-tight text-white sm:mt-5 sm:text-base">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            minus, architecto cumque repudiandae esse
          </p>
        </div>
      </div>

      <div data-container className="flex justify-center py-[50px]">
        <div className="mt-3 grid gap-x-4 gap-y-5 max-[700px]:grid-cols-1 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3">
          {allPosts.length > 0 &&
            allPosts.map((blog, index) => <BlogCard key={index} data={blog} />)}
        </div>
      </div>
    </>
  );
};

export default Blogs;
