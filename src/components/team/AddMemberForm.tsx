import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import { TeamMemberForm } from "@/types/index";
import { findMember } from "@/api/teamApi";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import MemberFound from "./MemberFound";

export default function AddMemberForm() {
  const initialValues: TeamMemberForm = {
    email: "",
  };
  const params = useParams();
  const shopId = params.shopId!;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const mutation = useMutation({
    mutationFn: findMember,
    onError: (error) => {
      toast.error(error.message);
      reset();
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
  });

  const handleSearchUser = async (formData: TeamMemberForm) => {
    const data = {
      formData,
      shopId,
    };
    mutation.mutate(data);
  };

  const resetForm = () => {
    reset();
    mutation.reset();
  };

  return (
    <>
      <form
        className="mt-10 space-y-5"
        onSubmit={handleSubmit(handleSearchUser)}
        noValidate
      >
        <div className="mb-5 space-y-3">
          <label
            className="text-sm font-poppins font-bold text-black"
            htmlFor="name"
          >
            E-mail de Usuario
          </label>
          <input
            id="name"
            type="text"
            placeholder="E-mail del usuario a agregar"
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

        <input
          type="submit"
          className="font-semibold font-poppins bg-blue text-white cursor-pointer w-full p-3 rounded hover:bg-yellow hover:text-black duration-300"
          value="Buscar usuario"
        />
      </form>

      {mutation.isPending && <Spinner />}
      {mutation.data && <MemberFound user={mutation.data} resetForm={resetForm}/>}
    </>
  );
}
