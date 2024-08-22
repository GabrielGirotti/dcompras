import { Link, useNavigate } from "react-router-dom";
import ShopForm from "./ShopForm";
import { Shop, ShopFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editShop } from "@/api/shopsApi";
import { toast } from "react-toastify";

type EditShopFormProps = {
  data: ShopFormData;
  shopId: Shop["_id"];
};

export default function EditShopForm({ data, shopId }: EditShopFormProps) {
  const initialValues: ShopFormData = {
    shopName: data.shopName,
    localName: data.localName,
    description: data.description,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: editShop,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["shops"] });
      queryClient.invalidateQueries({ queryKey: ["shopEdit", shopId] });
      toast.success(data);
      navigate("/shops");
    },
  });

  const handleForm = (formData: ShopFormData) => {
    const data = {
      formData,
      shopId,
    };

    mutate(data);
  };

  return (
    <>
      <h1 className=" font-poppins text-black font-semibold text-2xl">
        Editar compra
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
          value="Editar compra"
          className="font-semibold font-poppins bg-blue text-white cursor-pointer w-full p-3 rounded hover:bg-yellow hover:text-black duration-300"
        />
      </form>
      <nav className="my-5">
        <Link
          className=" bg-blue text-white rounded cursor-pointer px-10 py-3 font-poppins font-semibold hover:bg-yellow hover:text-black duration-300"
          to="/shops"
        >
          Volver
        </Link>
      </nav>
    </>
  );
}
