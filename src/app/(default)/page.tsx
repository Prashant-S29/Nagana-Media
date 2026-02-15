import React from "react";

// components
import { BlogGrid, Hero, WhatWeDo, WhyChooseUs } from "~/components/feature";

// Force static generation - critical for SEO and LLM crawlers
export const dynamic = "force-static";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <WhyChooseUs />
      <BlogGrid />
    </>
  );
};

export default Home;
