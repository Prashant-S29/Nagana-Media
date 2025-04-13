import { calendar, file, users } from "public/assets/static";

export interface WhatWeDoProps {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export const engineData: WhatWeDoProps[] = [
  {
    icon: file.src,
    title: "Content Engine",
    description:
      "Create high-intent, well-researched content for your solutions and build an ecosystem of stories.",
    href: "#",
  },
  {
    icon: calendar.src,
    title: "Marketing Engine",
    description:
      "Carefully-selected marketing campaigns ensure that we only deploy what works for you.",
    href: "#",
  },
  {
    icon: users.src,
    title: "Sales Engine",
    description:
      "Fill the gaps in your sales process with specialized product and service description presentations.",
    href: "#",
  },
];
