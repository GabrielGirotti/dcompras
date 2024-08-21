import type { ConfirmToken, NewPasswordForm } from "../../types";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "@/api/authApi";
import { toast } from "react-toastify";

type NewPasswordFormProps = {
  token: ConfirmToken["token"];
};

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
  const navigate = useNavigate();
  const initialValues: NewPasswordForm = {
    password: "",
    password_confirmation: "",
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: updatePassword,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      navigate("/auth/login");
    },
  });

  const handleNewPassword = (formData: NewPasswordForm) => {
    const data = {
      formData,
      token,
    };

    mutate(data);
  };

  const password = watch("password");

  return (
    <>
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className="mt-5 p-2 rounded md:w-[500px] "
        noValidate
      >
        <div className="mb-5 space-y-1 flex flex-col">
          <label className="text-lg font-poppins font-semibold text-white">
            Password
          </label>

          <input
            type="password"
            placeholder="Password de Registro"
            className={`w-full p-3 shadow-md rounded ${
              errors.password && "border-red border-2"
            }`}
            {...register("password", {
              required: "El Password es obligatorio",
              minLength: {
                value: 8,
                message: "El Password debe ser mínimo de 8 caracteres",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="mb-5 space-y-1 flex flex-col">
          <label className="text-lg font-poppins font-semibold text-white">
            Repetir password
          </label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className={`w-full p-3 shadow-md rounded ${
              errors.password_confirmation && "border-red border-2"
            }`}
            {...register("password_confirmation", {
              required: "Repetir Password es obligatorio",
              validate: (value) =>
                value === password || "Los Passwords no son iguales",
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Reestablecer password"
          className="font-semibold font-poppins bg-blue text-white cursor-pointer w-full p-3 rounded hover:bg-yellow hover:text-black duration-300"
        />
      </form>
    </>
  );
}
