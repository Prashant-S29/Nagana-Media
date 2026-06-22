import React from "react";
import Link from "next/link";

// fonts
import { fonts } from "~/fonts";

// utils
import { generateSeo } from "~/utils/generateSeo";

// Force static generation - critical for SEO and LLM crawlers
export const dynamic = "force-static";

// components
import { ContactUsForm } from "~/components/form";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import { contactUsImageBanner } from "public/assets/static";

export const generateMetadata = () =>
  generateSeo({
    title: "Contact Us",
    description:
      "Get in touch with Nagana Media for expert digital marketing solutions and strategic guidance to grow your brand.",
    url: "/contact",
  });

const Contact: React.FC = () => {
  return (
    <>
      <div
        data-container
        className="relative flex h-[80vh] w-full flex-col items-center justify-center bg-gradient-to-r from-[#0c1323] to-[#1e2f45]"
      >
        <Image
          src={contactUsImageBanner}
          alt="Contact Nagana Media for a B2B technology marketing consultation"
          fill
          className="w-full object-cover"
        />

        <h1 className="z-10 text-[40px] font-bold leading-none text-white lg:text-center lg:text-[50px] xl:text-[60px]">
          Let&apos;s talk
        </h1>

        <p className="z-10 mt-2 text-base font-light leading-tight text-white sm:mt-3 sm:text-base">
          Want to see how you can build a better story for your business?
        </p>

        <Button variant="brand" asChild className="z-10 mt-5">
          <Link href="#contact-form" data-cta="contact-hero|Send a Message">
            Send a Message
          </Link>
        </Button>
      </div>

      {/* Intro */}
      <div
        data-container
        className="flex w-full flex-col gap-[50px] bg-[#f9f9f9] py-[50px] md:flex-row"
      >
        <div className="w-full">
          <h2
            className={`${fonts.bebas_neue.className} text-[40px] font-bold leading-tight`}
          >
            Have <span className="text-brand">Questions?</span>
          </h2>
          <h2
            className={`${fonts.bebas_neue.className} text-[40px] font-bold leading-tight`}
          >
            We are here to help!
          </h2>
          <p className="mt-5 max-w-[500px] text-base leading-tight text-body-muted">
            Our dedicated team is ready to provide the answers and support you
            need. Whether it&apos;s a quick question or a detailed concern,
            we&apos;re just a call, email, or chat away. Let us make your
            experience seamless and stress-free. We&apos;re here to help!
          </p>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm leading-tight text-body-muted">Email</p>
              <p className="font-medium leading-tight text-black">
                <Link href="mailto:contact@naganamedia.com">
                  contact@naganamedia.com
                </Link>
              </p>
            </div>
            <div>
              <p className="text-sm leading-tight text-body-muted">
                Call For Support
              </p>
              <p className="font-medium leading-tight text-black">
                <Link href="tel:+916377191007">(+91) 63771 91007</Link>
              </p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm leading-tight text-body-muted">
                Office Address
              </p>
              <p className="font-medium leading-tight text-black">
                <Link href="/">
                  6, Raghu Vihar, Maharani Farm, Durgapura, Jaipur
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* contact form */}
        <div
          id="contact-form"
          className="w-full rounded-xl border bg-white p-5"
        >
          <ContactUsForm />
        </div>
      </div>
    </>
  );
};

export default Contact;
