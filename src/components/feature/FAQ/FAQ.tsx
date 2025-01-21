import React from "react";

// components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { faqData } from "./data";
import { Button } from "~/components/ui/button";

export const FAQ: React.FC = () => {
  return (
    <div className="flex gap-[50px] bg-[#f7f7f7] px-[350px] py-[60px]">
      <div className="min-w-fit">
        <p className="text-xs font-bold uppercase text-brand">
          Frequently Asked Questions
        </p>
        <h1 className="mt-2 text-[30px] font-bold leading-none">
          Have any questions?
        </h1>
        <h1 className="text-[30px] font-bold leading-none">
          Here are some answers
        </h1>
        <div className="mt-5 h-[250px] w-full rounded-lg border" />
      </div>
      <div className="w-full">
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((data, index) => (
            <AccordionItem key={index} value={index.toString()}>
              <AccordionTrigger className="text-base font-semibold hover:no-underline">
                Q{index + 1}. {data.question}
              </AccordionTrigger>
              <AccordionContent>{data.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Button variant="brand" className="mt-5">
          Learn More
        </Button>
      </div>
    </div>
  );
};
