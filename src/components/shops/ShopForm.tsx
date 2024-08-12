import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { ShopFormData } from "types";

type ShopFormProps = {
  register: UseFormRegister<ShopFormData>;
  errors: FieldErrors<ShopFormData>;
};

export default function ShopForm({register, errors} : ShopFormProps) {
  return (
    <>
      <div className="mb-5 space-y-3">
        <label htmlFor="shopName" className="text-sm font-poppins font-bold text-black">
          Nombre de la compra
        </label>
        <input
          id="shopName"
          className={`w-full p-3 shadow-md rounded ${errors.shopName && 'border-red border-2'}`}
          type="text"
          placeholder="Nombre de la compra"
          {...register("shopName", {
            required: "El nombre de la compra es obligatorio",
          })}
        />

        {errors.shopName && (
          <ErrorMessage>{errors.shopName.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="localName" className="text-sm font-poppins font-bold text-black">
          Nombre del local
        </label>
        <input
          id="localName"
          className={`w-full p-3 shadow-md rounded ${errors.shopName && 'border-red border-2'}`}
          type="text"
          placeholder="Nombre del local"
          {...register("localName", {
            required: "El nombre del local es obligatorio",
          })}
        />

        {errors.localName && (
          <ErrorMessage>{errors.localName.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="description" className="text-sm font-poppins font-bold text-black">
          Descripción
        </label>
        <textarea
          id="description"
          className="w-full p-3 shadow-md rounded"
          placeholder="Descripción de la compra"
          {...register("description")}
        />
      </div>
    </>
  );
}
