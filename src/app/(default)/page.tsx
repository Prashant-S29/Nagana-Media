import React from "react";

// components
import { BlogGrid, Hero, WhatWeDo, WhyChooseUs } from "~/components/feature";

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
