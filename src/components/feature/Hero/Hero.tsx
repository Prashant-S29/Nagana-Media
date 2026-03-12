import Image from "next/image";
import Link from "next/link";
import { heroSectionImage } from "public/assets/static";
import React from "react";

// components
import { Button } from "~/components/ui/button";

export const Hero: React.FC = () => {
  return (
    <div
      data-container
      className="flex h-[80vh] w-full items-center justify-between gap-[50px] bg-gradient-to-r from-[#0c1323] to-[#1e2f45]"
    >
      <div className="">
        <h1 className="text-[40px] font-bold leading-none lg:text-[50px] xl:text-[60px]">
          <span className="block text-white">Make</span>
          <span className="block text-[#b7faff]">Technology</span>
          <span className="block text-white">Resonate</span>
        </h1>

        <p className="mt-5 text-sm font-extralight leading-tight text-white sm:text-base">
          Nagana Media is a B2B marketing agency based in Jaipur, India, helping
          technology and SaaS companies worldwide build go-to-market strategies,
          sales enablement programs, and content ecosystems that drive faster
          adoption.
        </p>

        <section className="flex items-center gap-5">
          <Button variant="brand" asChild className="mt-8">
            <Link href="/contact">Let&apos;s Talk</Link>
          </Button>
          <Button variant="link" asChild className="mt-8 text-white">
            <Link href="/llms.txt">Read llms.txt file</Link>
          </Button>
          
       </section>
      </div>
      <div className="min-w-[300px] rounded-lg max-[900px]:hidden lg:min-w-[400px]">
        <Image
          src={heroSectionImage}
          alt="heroImage"
          width={600}
          height={600}
          className="w-full object-cover"
        />
      </div>
    </div>
  );
};
