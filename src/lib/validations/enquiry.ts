import { z } from "zod";

export const enquiryStatuses = ["new", "contacted", "closed"] as const;

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  phone: z.string().trim().min(7, "Enter a valid phone number.").max(20, "Phone number is too long."),
  message: z.string().trim().min(5, "Tell us what you need.").max(1000, "Message is too long."),
});

export const enquiryStatusSchema = z.object({
  status: z.enum(enquiryStatuses),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type EnquiryStatus = (typeof enquiryStatuses)[number];
