import { isAxiosError } from "axios";
import { ListFormData, Shop } from "../types";
import api from "@/lib/axios";


type createListType = {
    formData: ListFormData;
    shopId: Shop["_id"];
  };

export async function createList({formData, shopId} : createListType) {
  try {
    const { data } = await api.post(`/shops/${shopId}/lists`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
