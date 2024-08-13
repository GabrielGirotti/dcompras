import api from "@/lib/axios";
import { dashboardShopScema, Shop, ShopFormData } from "../types";
import { isAxiosError } from "axios";

export async function createShop(formData: ShopFormData) {
  try {
    const { data } = await api.post("/shops", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function getAllShops() {
  try {
    const { data } = await api("/shops");
    const response = dashboardShopScema.safeParse(data);

    if (response.success) {
      return response.data;
    } else {
      throw new Error("Hubo un error en la peticion");
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getShopById(id: Shop["_id"]) {
  try {
    const { data } = await api(`/shops/${id}`);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
