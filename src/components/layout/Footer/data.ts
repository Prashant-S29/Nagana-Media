import type { IconType } from "react-icons/lib";
import { SocialIcons } from "~/icons";

interface FooterSocialGridProps {
  icon: IconType;
  href: string;
}

export const footerSocialGridData: FooterSocialGridProps[] = [
  // {
  //   icon: SocialIcons.TwitterIcon,
  //   href: "/",
  // },
  // {
  //   icon: SocialIcons.InstagramIcon,
  //   href: "/",
  // },
  {
    icon: SocialIcons.LinkedInIcon,
    href: "https://www.linkedin.com/company/nagana-media-tech/posts/?feedView=all",
  },
  // {
  //   icon: SocialIcons.FacebookIcon,
  //   href: "/",
  // },
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
        label: "About Us",
        href: "/about",
      },
      {
        label: "Meet the Experts",
        href: "/meet-the-experts",
      },
      {
        label: "News and Blogs",
        href: "/blogs",
      },
    ],
  },
  {
    category: "Our Services",
    links: [
      {
        label: "AI SEO Audit",
        href: "/ai-seo-audit",
      },
      {
        label: "AEO & GEO Services",
        href: "/services",
      },
      {
        label: "Marketing Enablement",
        href: "/services/marketing-enablement",
      },
      {
        label: "Program Management",
        href: "/services/program-management",
      },
      {
        label: "Sales Enablement",
        href: "/services/sales-enablement",
      },
    ],
  },
];
