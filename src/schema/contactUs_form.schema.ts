import { z } from "zod";

export const ContactUsSchema = z.object({
  firstName: z
    .string()
    .min(2, "At least 2 characters are required")
    .max(20, "At most 20 characters are allowed"),
  lastName: z
    .string()
    .min(2, "At least 2 characters are required")
    .max(20, "At most 20 characters are allowed"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Invalid phone number")
    .max(10, "Invalid phone number"),
  subject: z
    .string()
    .min(2, "Subject must be at least 2 characters")
    .max(20, "Subject must be at most 20 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(300, "Message must be at most 300 characters"),
});

export type ContactUsFormValues = z.infer<typeof ContactUsSchema>;
