import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  message: z
    .string()
    .min(10, "Please tell us a bit more (min 10 characters)")
    .max(2000, "Message is too long"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
