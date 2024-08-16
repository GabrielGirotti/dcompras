import { isAxiosError } from "axios";
import { List, ListFormData, Shop } from "../types";
import api from "@/lib/axios";

type ListType = {
  formData: ListFormData;
  shopId: Shop["_id"];
  editListId: List["_id"];
};

export async function createList({
  formData,
  shopId,
}: Pick<ListType, "formData" | "shopId">) {
  try {
    const { data } = await api.post(`/shops/${shopId}/lists`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getListById({
  shopId,
  editListId,
}: Pick<ListType, "shopId" | "editListId">) {
  try {
    const url = `/shops/${shopId}/lists/${editListId}`;
    const { data } = await api(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function editList({ shopId, editListId, formData }: ListType) {
  try {
    const { data } = await api.put<string>(
      `/shops/${shopId}/lists/${editListId}`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteList({
  shopId,
  editListId,
}: Pick<ListType, "shopId" | "editListId">) {
  try {
    const url = `/shops/${shopId}/lists/${editListId}`;

    const { data } = await api.delete<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
