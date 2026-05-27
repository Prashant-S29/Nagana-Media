import { z } from "zod";

export const aiSeoAuditFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  companyWebsite: z
    .string()
    .url("Please enter a valid URL (e.g. https://example.com)"),
  companyDescription: z
    .string()
    .min(
      20,
      "Please tell us a bit more about your company (min 20 characters)",
    ),
  seoGoals: z
    .string()
    .min(
      20,
      "Please describe your SEO goals in more detail (min 20 characters)",
    ),
});

export type AiSeoAuditFormValues = z.infer<typeof aiSeoAuditFormSchema>;
