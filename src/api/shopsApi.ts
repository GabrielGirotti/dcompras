import api from "@/lib/axios";
import { ShopFormData } from "../types";
import { isAxiosError } from "axios";

export async function createShop(formData : ShopFormData) {
   try {
     const {data} = await api.post('/shops', formData)
     return data
   } catch (error) {
    if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
    }
   }
}