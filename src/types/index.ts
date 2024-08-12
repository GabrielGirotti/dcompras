import { z } from "zod";

// SHOPS

export const shopsSchema = z.object({
  _id: z.string(),
  shopName: z.string(),
  localName: z.string(),
  description: z.string(),
});

export type Shop = z.infer<typeof shopsSchema>;
export type ShopFormData = Pick<Shop, 'shopName' | 'localName' | 'description'>