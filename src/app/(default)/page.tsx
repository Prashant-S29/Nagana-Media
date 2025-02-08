import React from "react";

// components
import { BlogGrid, Hero, WhatWeDo, WhyChooseUs } from "~/components/feature";

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <WhatWeDo />
      <WhyChooseUs />
      <BlogGrid />
    </main>
  );
};

export default Home;
