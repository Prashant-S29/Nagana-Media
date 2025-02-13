import Link from "next/link";
import React from "react";
import { ContactUsForm } from "~/components/form";
import { fonts } from "~/fonts";

const Contact: React.FC = () => {
  return (
    <>
      <div
        data-container
        className="flex h-[60vh] w-full items-center justify-center bg-gradient-to-r from-[#0c1323] to-[#1e2f45]"
      >
        <div className="">
          <h1 className="text-[40px] font-bold leading-none text-white lg:text-center lg:text-[50px] xl:text-[60px]">
            We&apos;re Here To Help
          </h1>

          <p className="mt-2 text-base font-light leading-tight text-white sm:mt-5 sm:text-base">
            Feel free to reach out to us for any inquiries or support. We look
            forward to connecting with you!
          </p>
        </div>
      </div>

      {/* Intro */}
      <div
        data-container
        className="flex w-full flex-col gap-[50px] bg-[#f9f9f9] py-[50px] sm:flex-row"
      >
        <div className="w-full">
          <h1
            className={`${fonts.bebas_neue.className} text-[40px] font-bold leading-tight`}
          >
            Have <span className="text-brand">Questions?</span>
          </h1>
          <h1
            className={`${fonts.bebas_neue.className} text-[40px] font-bold leading-tight`}
          >
            We are here to help!
          </h1>
          <p className="mt-5 text-base leading-tight text-black/50">
            Our dedicated team is ready to provide the answers and support you
            need. Whether it&apos;s a quick question or a detailed concern,
            we&apos;re just a call, email, or chat away. Let us make your
            experience seamless and stress-free. We&apos;re here to help!
          </p>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm leading-tight text-black/50">Email</p>
              <p className="font-medium leading-tight text-black">
                <Link href="mailto:contact@naganamedia.com">
                  contact@naganamedia.com
                </Link>
              </p>
            </div>
            <div>
              <p className="text-sm leading-tight text-black/50">
                Call For Support
              </p>
              <p className="font-medium leading-tight text-black">
                <Link href="tel:+916377191007">(+91) 63771 91007</Link>
              </p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm leading-tight text-black/50">
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
        <div className="w-full max-w-[500px] rounded-xl border bg-white p-5">
          <ContactUsForm />
        </div>
      </div>
    </>
  );
};

export default Contact;
