import { isAxiosError } from "axios";
import api from "@/lib/axios";
import {
  ConfirmToken,
  ForgotPasswordForm,
  NewPasswordForm,
  RequestConfirmationCodeForm,
  UserRegistrationForm,
} from "../types";

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

export async function login(formData: RequestConfirmationCodeForm) {
  try {
    const { data } = await api.post(`/auth/login`, formData);
    localStorage.setItem("TokenDeAutenticacion", data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function changePassword(formData: ForgotPasswordForm) {
  try {
    const { data } = await api.post(`/auth/forgot-password`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function confirmTokenForPass(token: ConfirmToken) {
  try {
    const { data } = await api.post(`auth/validate-token`, token);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

type updatePasswordType = {
  formData: NewPasswordForm;
  token: ConfirmToken["token"];
};

export async function updatePassword({ formData, token }: updatePasswordType) {
  try {
    const { data } = await api.post(`/auth/update-password/${token}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
