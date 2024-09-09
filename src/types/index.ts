import { z } from "zod";

//AUTH USERS
const authSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  password_confirmation: z.string(),
  token: z.string(),
});

type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<
  Auth,
  "email" | "password" | "name" | "password_confirmation"
>;

export type ConfirmToken = Pick<Auth, "token">;
export type RequestConfirmationCodeForm = Pick<Auth, "email">;
export type ForgotPasswordForm = Pick<Auth, "email">;
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">;

//USERS

export const userSchema = authSchema
  .pick({
    name: true,
    email: true,
  })
  .extend({
    _id: z.string(),
  });

export type User = z.infer<typeof userSchema>;

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

// TEAM

export const teamMemberSchema = userSchema.pick({
  name: true,
  email: true,
  _id: true,
});
export const alltemMembersSchema = z.array(teamMemberSchema)
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, "email">;
