import type { Service } from "~/types";

export const services = [
  {
    slug: "sales-enablement",
    icon: "/assets/static/calendar.webp",
    title: "Sales Enablement",
    description:
      "Select our sales support service that comes in to deliver specific sales assets during key business events or build internal repository of employee training material.",
  },
  {
    slug: "marketing-enablement",
    icon: "/assets/static/file.webp",
    title: "Marketing Enablement",
    description:
      "Fill in your marketing gaps with specialized technology content, marketing initiatives, or scale your digital footprint.",
  },
  {
    slug: "program-management",
    icon: "/assets/static/users.webp",
    title: "Program Management",
    description:
      "Manage your digital marketing, design, and content initiatives with ease.",
  },
] satisfies Service[];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug) ?? null;
}
