import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ListFormData } from "@/types/index";
import ErrorMessage from "../ErrorMessage";

type ListFormProps = {
  errors: FieldErrors<ListFormData>;
  register: UseFormRegister<ListFormData>;
};

export default function ListForm({ errors, register }: ListFormProps) {
  return (
    <>
      <div className="mb-5 space-y-3 flex flex-col">
        <label
          className="text-sm font-poppins font-bold text-black"
          htmlFor="name"
        >
          Nombre de la lista
        </label>
        <input
          id="name"
          type="text"
          placeholder="Nombre de la lista"
          className={`w-full p-3 shadow-md rounded ${
            errors.name && "border-red border-2"
          }`}
          {...register("name", {
            required: "El nombre de la lista es obligatorio",
          })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>
      <div className="mb-5 space-y-3 flex flex-col">
        <label
          className="text-sm font-poppins font-bold text-black"
          htmlFor="description"
        >
          Descripción de la lista
        </label>
        <textarea
          id="description"
          placeholder="Descripción de la lista"
          className={`w-full p-3 shadow-md rounded ${
            errors.description && "border-red border-2"
          }`}
          {...register("description", {
            required: "La descripción de la lista es obligatoria",
          })}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
