import { isAxiosError } from "axios";
import { Shop, TeamMember, TeamMemberForm } from "../types";
import api from "@/lib/axios";

type teamMemberProps = {
  shopId: Shop["_id"];
  formData: TeamMemberForm;
  id: TeamMember["_id"];
};

export async function findMember({
  shopId,
  formData,
}: Pick<teamMemberProps, "formData" | "shopId">) {
  try {
    const { data } = await api.post(`/shops/${shopId}/team/find`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function addMember({
  shopId,
  id,
}: Pick<teamMemberProps, "shopId" | "id">) {
  try {
    const { data } = await api.post(`/shops/${shopId}/team`, { id });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getAllMember(shopId: Shop['_id']) {
  try {
    const { data } = await api(`/shops/${shopId}/team`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
