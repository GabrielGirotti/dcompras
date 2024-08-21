import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { ConfirmToken, RequestConfirmationCodeForm, UserRegistrationForm } from "../types";

export async function createUser(formData: UserRegistrationForm) {
  try {
    const { data } = await api.post(`/auth/create-account`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function confirmAccount(token: ConfirmToken) {
  try {
    const { data } = await api.post(`auth/confirm-account`, token);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}


export async function requestNewToken(formData: RequestConfirmationCodeForm) {
  try {
    const { data } = await api.post(`/auth/new-code`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}