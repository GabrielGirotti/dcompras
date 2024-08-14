import { createShop } from "@/api/shopsApi";
import ShopForm from "@/components/shops/ShopForm";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ShopFormData } from "types";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export default function CreateShopView() {
  const initialValues: ShopFormData = {
    shopName: "",
    localName: "",
    description: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createShop,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate("/");
    },
  });

  const handleForm = (formData: ShopFormData) => {
    mutation.mutate(formData);
  };

  return (
    <>
      <h1 className=" font-poppins text-black font-semibold text-2xl">
        Crear compra
      </h1>
      <p className="font-poppins text-black ">
        Completa el siguiente formulario
      </p>

      <form
        className="mt-10 p-2 rounded md:w-[500px]"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        <ShopForm register={register} errors={errors} />
        <input
          type="submit"
          value="Crear compra"
          className="font-semibold font-poppins bg-blue text-white cursor-pointer w-full p-3 rounded hover:bg-yellow hover:text-black duration-300"
        />
      </form>
      <nav className="my-5">
        <Link
          className=" bg-blue text-white rounded cursor-pointer px-10 py-3 font-poppins font-semibold hover:bg-yellow hover:text-black duration-300"
          to="/"
        >
          Volver
        </Link>
      </nav>
    </>
  );
}
