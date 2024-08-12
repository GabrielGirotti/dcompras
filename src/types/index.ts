import { z } from "zod";

// SHOPS

export const shopsSchema = z.object({
  _id: z.string(),
  shopName: z.string(),
  localName: z.string(),
  description: z.string(),
});

export const dashboardShopScema = z.array(shopsSchema.pick({
  _id: true,
  shopName: true,
  localName: true,
  description: true
}))

export type Shop = z.infer<typeof shopsSchema>;
export type ShopFormData = Pick<Shop, 'shopName' | 'localName' | 'description'>