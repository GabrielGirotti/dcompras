import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/authApi";
import { toast } from "react-toastify";

export default function LoginView() {
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: login,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate("/");
    },
  });

  const handleLogin = (formData: UserLoginForm) => {
    mutate(formData);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
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
              required: "El Email es obligatorio",
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
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="font-semibold font-poppins bg-blue text-white cursor-pointer w-full p-3 rounded hover:bg-yellow hover:text-black duration-300"
        />
      </form>
      <nav className="mt-5 flex flex-col">
        <Link
          className="text-center font-poppins text-white"
          to={"/auth/register"}
        >
          ¿No tienes cuenta?{" "}
          <span className="font-semibold text-yellow">Crea una</span>
        </Link>
      </nav>
    </>
  );
}
