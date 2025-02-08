import React from "react";
import { StatsData } from "./data";
import { fonts } from "~/fonts";
import { Team } from "~/components/feature";

const About: React.FC = () => {
  return (
    <>
      {/* Main Intro */}
      <div className="flex h-[60vh] w-full items-center justify-center bg-gradient-to-r from-[#0c1323] to-[#1e2f45] px-[350px]">
        <div className="">
          <h1 className="text-center text-[60px] font-bold leading-none text-white">
            About Us
          </h1>

          <p className="mt-5 text-center text-white">
            Creative digital solutions for modern brands.
          </p>
        </div>
      </div>

      {/* Intro */}
      <div className="mt-9 flex w-full items-center gap-[100px] bg-[#fff] px-[300px] py-[50px]">
        <div className="w-full">
          <h1 className="text-[30px] font-bold leading-tight">
            The 21st century is the era of change, very fast change!
          </h1>
          <p className="mt-4 text-base leading-tight text-black/50">
            The way of running your business is changing and so is how people
            interact with your business. The old models of selling and marketing
            are out and customers behaviors are getting highly complex
          </p>
          <p className="mt-1 text-base leading-tight text-black/50">
            Gone are the times, when you relied on a sales executive to educate
            your customers about solutions. The B2B customers of today are
            fairly knowledgable and the majority of them are pretty clear on
            what solutions they are looking for
          </p>
        </div>
        <div className="relative">
          <div className="relative z-10 aspect-square w-[300px] rounded-full bg-[#f4f4f4]" />
          <div className="absolute -right-8 top-0 h-full w-full rounded-full bg-brand/30" />
        </div>
      </div>

      {/* Stats */}
      <div className="flex w-full justify-evenly gap-[30px] bg-[#F9f9f9] px-[300px] py-[50px]">
        {StatsData.map((data, index) => (
          <div key={index}>
            <h1
              className={`${fonts.bebas_neue.className} text-center text-[40px] leading-none text-brand`}
            >
              {data.label}
            </h1>
            <p className="text-center text-sm text-black/50">{data.title}</p>
          </div>
        ))}
      </div>

      {/* Growth with Nagana Media */}
      <div className="w-full bg-[#fff] px-[300px] py-[50px]">
        <h1 className="text-[30px] font-bold">
          Empowering Growth With Nanga Media
        </h1>
        <p className="mt-1 leading-tight text-black/50">
          In such a time, you can&apos;t put all your money on one tactic. To
          win, you&apos;ll have to have a holistic view and a vantage point that
          allows you to quickly adjust your strategy and tactics.
        </p>
        <p className="mt-2 leading-tight text-black/50">
          We offer end-to-end digital marketing services like web development,
          SEO, content creation, lead generation, marketing campaigns, client
          reachouts, social media management, and conversion optimization.
        </p>
        <div className="mt-9 flex items-center gap-[100px]">
          <div className="relative">
            <div className="relative z-10 aspect-square w-[300px] rounded-full bg-[#f4f4f4]" />
            <div className="absolute -right-8 top-0 h-full w-full rounded-full bg-brand/30" />
          </div>
          <div className="flex w-full flex-col gap-4">
            <p className="rounded-lg bg-brand/20 px-5 py-4 leading-tight">
              At Nagana Media, we understand this complexity and have the right
              resources and talent to execute. We are a creative digital
              marketing, branding, and sales agency that works as an extension
              of your digital operations. We have more than 10 years of digital
              marketing experience, especially in a B2B setting.
            </p>
            <p className="rounded-lg bg-brand/50 px-5 py-4 leading-tight">
              We work with a growth mindset and an aim to deliver customer
              outcomes. We deploy highly integrated digital marketing strategies
              once we understand your specific problems. Working on a sprint
              model, which helps you better track marketing and sales programs.
            </p>
          </div>
        </div>
      </div>

      {/* Meet Our Team */}
      <Team />
    </>
  );
};

export default About;
