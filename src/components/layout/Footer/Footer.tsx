import React from "react";
import Link from "next/link";

// icons
import { SendArrowIcon } from "~/icons";

// data
import { footerLinksData, footerSocialGridData } from "./data";

// components
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#262626] px-[350px]">
      <div className="flex">
        <div className="w-fit max-w-[300px] border-r border-white/20 py-9 pr-8">
          <section className="">
            <h1 className="text-lg text-white">Nagana Media</h1>

            <p className="mt-3 text-xs font-light leading-tight text-white/70">
              A state of plants, usually at night, when their leaflets approach
              each other and the flowers close and droop, or are covered
            </p>

            <div className="mt-3 flex items-center gap-2">
              {footerSocialGridData.map((data, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="group h-7 w-7 rounded-sm bg-white hover:bg-brand"
                >
                  <Link href={data.href}>
                    <data.icon className="text-black transition-colors group-hover:text-white" />
                  </Link>
                </Button>
              ))}
            </div>
          </section>
        </div>
        <div className="flex w-full gap-8 pl-8">
          {footerLinksData.map((data, index) => (
            <div key={index} className="min-w-fit py-9">
              <h3 className="text-sm font-medium text-white">
                {data.category}
              </h3>
              <ul className="">
                {data.links.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-xs text-white/70">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="w-full py-9">
            <div className="w-full rounded-lg bg-[#3c3c3c] px-5 py-4">
              <h3 className="text-xs leading-tight text-white">
                Subscribe for latest updates and exclusive offers!
              </h3>
              <div className="relative">
                <Input
                  placeholder="Your Email"
                  className="mt-3 bg-white text-xs placeholder:text-black/70"
                />
                <div className="absolute right-0 top-0 p-1">
                  <Button
                    size="icon"
                    className="h-7 w-7 bg-brand hover:bg-brand"
                  >
                    <SendArrowIcon className="text-white" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between border-t border-white/20 py-4 text-xs text-white/70">
        <p className="">&copy; Copyright 2024. All rights reserved.</p>

        <section className="flex items-center gap-3">
          <Link href="/">About</Link>
          <Link href="/">Team</Link>
          <Link href="/">Support</Link>
        </section>
      </div>
    </footer>
  );
};
