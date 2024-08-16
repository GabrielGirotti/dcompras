import { z } from "zod";

// LISTS
export const listStatus = z.enum(["toShop", "toChangeSome", "bought", "ideas"]);
export type ListStat = z.infer<typeof listStatus>;

export const listSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  shop: z.string(),
  status: listStatus,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type List = z.infer<typeof listSchema>;
export type ListFormData = Pick<List, "name" | "description">;

// SHOPS

export const shopsSchema = z.object({
  _id: z.string(),
  shopName: z.string(),
  localName: z.string(),
  description: z.string(),
});

export const dashboardShopScema = z.array(
  shopsSchema.pick({
    _id: true,
    shopName: true,
    localName: true,
    description: true,
  })
);

export type Shop = z.infer<typeof shopsSchema>;
export type ShopFormData = Pick<Shop, "shopName" | "localName" | "description">;
