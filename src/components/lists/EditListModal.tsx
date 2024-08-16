import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import ListForm from "./ListForm";
import { useForm } from "react-hook-form";
import { List, ListFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editList } from "@/api/listApi";
import { toast } from "react-toastify";

type EditListModalProps = {
  data: List;
  shopId: string;
  editListId: string;
};

export default function EditListModal({
  data,
  shopId,
  editListId,
}: EditListModalProps) {
  const initialValues: ListFormData = {
    name: data.name,
    description: data.description,
  };

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: initialValues });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: editList,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["shopEdit", shopId] });
      toast.success(data);
      navigate(location.pathname, { replace: true });
    },
  });

  const handleEditList = (formData: ListFormData) => {
    const data = {
      formData,
      shopId,
      editListId,
    };

    mutate(data);
  };

  return (
    <Transition appear show={true} as={Fragment}>
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
                  className="font-poppins text-black font-semibold text-2xl"
                >
                  Editar lista
                </Dialog.Title>

                <p className="font-poppins text-black text-center">
                  Realiza tus cambios
                </p>

                <form
                  onSubmit={handleSubmit(handleEditList)}
                  className="mt-10 p-2 rounded w-[80vw] md:w-[500px]"
                  noValidate
                >
                  <ListForm register={register} errors={errors} />
                  <input
                    type="submit"
                    className="font-semibold font-poppins bg-blue text-white cursor-pointer w-full p-3 rounded hover:bg-yellow hover:text-black duration-300"
                    value="Guardar lista"
                  />
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
