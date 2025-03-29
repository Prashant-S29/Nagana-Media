export type TeamProps = {
  name: string;
  designation: string;
  image: string;

  linkedIn: string;
};

import { mohit, abhijeet, ashish, harshita } from "public/assets/static";

export const teamData: TeamProps[] = [
  {
    name: "Abhijeet Singh",
    designation: "Founder",
    image: abhijeet.src,
    linkedIn: "/",
  },
  {
    name: "Ashish Choudhary",
    designation: "Lead Growth Marketer and Web Designer",
    image: ashish.src,
    linkedIn: "/",
  },

  {
    name: "Mohit Kumar",
    designation: "UI/UX Designer",
    image: mohit.src,
    linkedIn: "/",
  },
  {
    name: "Harshita Soni",
    designation: "Project Coordinator",
    image: harshita.src,
    linkedIn: "/",
  },
  // {
  //   name: "Prashant Singh",
  //   designation: "Web Developer",
  //   image: mohit.src,
  //   linkedIn: "/",
  // },
];
