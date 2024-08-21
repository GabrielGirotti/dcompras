import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RequestConfirmationCodeForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { requestNewToken } from "@/api/authApi";
import { toast } from "react-toastify";

export default function RequestNewToken() {
  const initialValues: RequestConfirmationCodeForm = {
    email: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: requestNewToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
  });

  const handleRequestCode = (formData: RequestConfirmationCodeForm) => {
    mutate(formData);
  };

  return (
    <>
      <h1 className="mt-5 text-xl font-poppins font-bold text-white text-center">
        Solicitar un nuevo{" "}
        <span className=" text-yellow font-poppins font-semibold">
          código de confirmación
        </span>
      </h1>

      <form
        onSubmit={handleSubmit(handleRequestCode)}
        className="mt-5 p-2 rounded md:w-[500px] "
        noValidate
      >
        <div className="mb-5 space-y-1 flex flex-col">
          <label
            className="text-lg font-poppins font-semibold text-white"
            htmlFor="email"
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className={`w-full p-3 shadow-md rounded ${
              errors.email && "border-red border-2"
            }`}
            {...register("email", {
              required: "El Email de registro es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          value="Enviar código"
          className="font-semibold font-poppins bg-blue text-white cursor-pointer w-full p-3 rounded hover:bg-yellow hover:text-black duration-300"
        />
      </form>

      <nav className="mt-5 flex flex-col gap-4">
        <Link
          className="text-center font-poppins text-white"
          to={"/auth/login"}
        >
          ¿Ya tienes cuenta?{" "}
          <span className="font-semibold text-yellow">Iniciar sesión</span>
        </Link>
        <Link
          to="/auth/forgot-password"
          className="text-center font-poppins text-white"
        >
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </>
  );
}
