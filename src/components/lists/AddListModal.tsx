import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ListForm from "./ListForm";
import { useForm } from "react-hook-form";
import { ListFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createList } from "@/api/listApi";
import { toast } from "react-toastify";

export default function AddListModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modalList = queryParams.get("newlist");
  const show = modalList ? true : false;

  const initialValues: ListFormData = {
    name: "",
    description: "",
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: initialValues });

  const params = useParams();
  const shopId = params.shopId!;

  const queryClient = useQueryClient();
  
  const { mutate } = useMutation({
    mutationFn: createList,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["shopEdit"] });
      toast.success(data);
      navigate(location.pathname, { replace: true });
    },
  });

  const handleCreateList = (formData: ListFormData) => {
    const data = {
      formData,
      shopId,
    };

    mutate(data);
  };

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => navigate(location.pathname, { replace: true })}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full flex flex-col items-center max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  <Dialog.Title
                    as="h3"
                    className=" font-poppins text-black font-semibold text-2xl"
                  >
                    Nueva lista
                  </Dialog.Title>

                  <p className="font-poppins text-black text-center ">
                    Llena el formulario y crea una lista
                  </p>

                  <form
                    className="mt-10 p-2 rounded w-[80vw] md:w-[500px]"
                    noValidate
                    onSubmit={handleSubmit(handleCreateList)}
                  >
                    <ListForm register={register} errors={errors} />
                    <input
                      type="submit"
                      value="Crear lista"
                      className="font-semibold font-poppins bg-blue text-white cursor-pointer w-full p-3 rounded hover:bg-yellow hover:text-black duration-300"
                    />
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
