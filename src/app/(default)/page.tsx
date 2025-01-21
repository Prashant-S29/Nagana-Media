import React from "react";

// components
import {
  BlogGrid,
  FAQ,
  Hero,
  Team,
  Testimonial,
  WhatWeDo,
  WhyChooseUs,
} from "~/components/feature";
import { TagMarquee } from "~/components/Common";

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <WhatWeDo />
      <WhyChooseUs />
      <Team />
      <TagMarquee />
      <Testimonial />
      <FAQ />
      <BlogGrid />
    </main>
  );
};

export default Home;
