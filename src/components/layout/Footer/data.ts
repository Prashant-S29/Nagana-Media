import type { IconType } from "react-icons/lib";
import { SocialIcons } from "~/icons";

interface FooterSocialGridProps {
  icon: IconType;
  href: string;
}

export const footerSocialGridData: FooterSocialGridProps[] = [
  {
    icon: SocialIcons.TwitterIcon,
    href: "/",
  },
  {
    icon: SocialIcons.InstagramIcon,
    href: "/",
  },
  {
    icon: SocialIcons.LinkedInIcon,
    href: "/",
  },
  {
    icon: SocialIcons.FacebookIcon,
    href: "/",
  },
];

interface FooterLinksProps {
  category: string;
  links: {
    label: string;
    href: string;
  }[];
}

export const footerLinksData: FooterLinksProps[] = [
  {
    category: "Quick Links",
    links: [
      {
        label: "Company Profile",
        href: "/",
      },
      {
        label: "Help Center",
        href: "/",
      },
      {
        label: "Projects",
        href: "/",
      },
      {
        label: "News and Blogs",
        href: "/",
      },
    ],
  },
  {
    category: "Our Services",
    links: [
      {
        label: "Ui/Ux Design",
        href: "/",
      },
      {
        label: "Web Design",
        href: "/",
      },
      {
        label: "Digital Marketing",
        href: "/",
      },
    ],
  },
];
