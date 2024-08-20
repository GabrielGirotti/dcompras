import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/api/authApi";
import { toast } from "react-toastify";

export default function RegisterView() {
  const initialValues: UserRegistrationForm = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const password = watch("password");
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: createUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      navigate("/auth/login");
    },
  });

  const handleRegister = (formData: UserRegistrationForm) => {
    mutate(formData);
  };

  return (
    <>
      <p className="text-lg font-light text-white mt-5 text-center">
        Llena el formulario para {""}
        <span className=" text-yellow font-bold"> crear tu cuenta</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="mt-5 p-2 rounded md:w-[500px] "
        noValidate
      >
        <div className="mb-5 space-y-1 flex flex-col">
          <label className="text-lg font-poppins font-semibold text-white">
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

        <div className="mb-5 space-y-1 flex flex-col">
          <label className="text-lg font-poppins font-semibold text-white">
            Nombre
          </label>
          <input
            type="name"
            placeholder="Nombre de Registro"
            className={`w-full p-3 shadow-md rounded ${
              errors.name && "border-red border-2"
            }`}
            {...register("name", {
              required: "El Nombre de usuario es obligatorio",
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

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
            Repetir Password
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
          value="Registrarme"
          className="font-semibold font-poppins bg-blue text-white cursor-pointer w-full p-3 rounded hover:bg-yellow hover:text-black duration-300"
        />
      </form>
      <nav className="mt-5 flex flex-col">
        <Link
          className="text-center font-poppins text-white"
          to={"/auth/login"}
        >
          ¿Ya tienes cuenta?{" "}
          <span className="font-semibold text-yellow">Iniciar sesión</span>
        </Link>
      </nav>
    </>
  );
}
