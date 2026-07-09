import React from "react";
import Link from "next/link";

// data
import { footerLinksData, footerSocialGridData } from "./data";

// components
import { Button } from "~/components/ui/button";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-container className="bg-[#262626]">
      <section className="border-b border-white/20 bg-[#262626] py-16 text-white lg:py-20">
        <div className={`grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center`}>
          <div>
            <h2
              className={`text-[34px] leading-[1.05] tracking-tight text-white md:text-[44px]`}
            >
              Measure your AI visibility.
              <br />
              Then fix what's missing.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
              Start with a free AI SEO audit. Know exactly where your brand is
              invisible across ChatGPT, Perplexity, Google AI Mode, Claude,
              Gemini, and Microsoft Copilot - and what to do about it.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href="/ai-seo-audit"
              data-cta="footer|Get a Free AI Audit"
              className="rounded-md bg-white px-7 py-3 text-center text-sm font-bold tracking-wide text-[#111827]"
            >
              Get a Free AI Audit →
            </Link>
            <Link
              href="/contact"
              data-cta="footer|Talk to the Team"
              className="rounded-md border border-white/40 px-7 py-3 text-center text-sm font-bold tracking-wide text-white"
            >
              Talk to the Team
            </Link>
          </div>


        </div>
      </section>
      <div className="flex flex-col md:flex-row">
        <div className="mt-9 w-full border-white/20 pr-8 md:mt-0  md:max-w-[300px] md:border-r md:py-9">
          <div className="">
            <p className="text-lg font-semibold text-white">Nagana Media</p>

            <p className="text-sm font-light leading-tight text-white/70">
              Make technology resonate.
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
                  <Link
                    href={data.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Nagana Media on LinkedIn (opens in new tab)"
                  >
                    <data.icon
                      className="text-black transition-colors group-hover:text-white"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
              ))}
            </div>

          </div>
        </div>
        <div className="flex w-full flex-col gap-8 md:flex-row md:pl-8">
          <div className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-8 md:pl-8 py-9">
            {footerLinksData.map((data, index) => (
              <div key={index} >
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
          </div>
          <div className="w-full pb-5 2xl:block max-[500px]:block hidden sm:max-w-[250px] sm:py-9">
            <div className="w-full rounded-lg bg-[#3c3c3c] px-5 py-4">
              <h3 className="leading-tight text-white sm:text-xs">
                Ready to improve your AI visibility?
              </h3>
              <p className="mt-2 text-xs leading-5 text-white/70">
                Start with a free AI SEO audit and get a clear roadmap for what
                to fix next.
              </p>
              <Button asChild variant="default" size="sm" className="mt-4">
                <Link
                  href="/ai-seo-audit"
                  data-cta="footer-card|Get a Free Audit"
                >
                  Get a Free Audit
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center border-t border-white/20 py-4 text-xs text-white/70">
        <p className="">&copy; Copyright {currentYear}. All rights reserved.</p>
      </div>
    </footer>
  );
};
