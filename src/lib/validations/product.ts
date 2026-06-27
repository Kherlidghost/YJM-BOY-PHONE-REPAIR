import { z } from "zod";
import { productCategories } from "@/lib/admin-data";

export const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  category: z.enum(productCategories),
  price: z.coerce.number().min(0, "Price cannot be negative"),
  stock_quantity: z.coerce.number().int().min(0, "Stock quantity cannot be negative"),
  description: z.string().max(600, "Description is too long").optional().default(""),
  image_url: z.string().url("Enter a valid image URL").optional().or(z.literal("")).default(""),
  is_available: z.boolean().default(true),
});

export type ProductInput = z.infer<typeof productSchema>;
