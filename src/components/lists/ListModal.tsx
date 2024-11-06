import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Spinner from "../Spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getListById, updateStatus } from "@/api/listApi";
import { formDate } from "@/utils/utils";
import { v4 as uuidv4 } from "uuid";
import { statusTranslation } from "@/translates/es";
import { toast } from "react-toastify";
import { ListStat } from "@/types/index";

export default function ListModal() {
  const navigate = useNavigate();
  const params = useParams();
  const shopId = params.shopId!;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const editListId = queryParams.get("showList")!;

  const show = editListId ? true : false;

  const { data, isError, isLoading } = useQuery({
    queryKey: ["list", editListId],
    queryFn: () => getListById({ shopId, editListId }),
    enabled: !!editListId,
    retry: false,
  });

  const descList = data?.description.split(/\r\n|\r|\n/, -1);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["shopEdit", shopId] });
      toast.success(data);
      navigate(location.pathname);
    },
  });

  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as ListStat;
    const data = {
      shopId,
      editListId,
      status,
    };

    mutate(data);
  };

  if (isLoading) return <Spinner />;
  if (isError) return <Navigate to={"/404"} />;

  if (data)
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
              <div className="flex min-h-full items-center justify-center p-4 ">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-6 md:p-16">
                    <Dialog.Title
                      as="h3"
                      className="pt-2 font-poppins text-blue font-semibold text-xl capitalize"
                    >
                      {data.name}
                    </Dialog.Title>

                    <div className="my-3 ">
                      <label className="font-poppins text-black ">
                        Estado Actual:
                      </label>
                      <select
                        onChange={handleStatus}
                        defaultValue={data.status}
                        className="w-full p-3 border bg-blue rounded font-poppins text-white"
                      >
                        {Object.entries(statusTranslation).map(
                          ([key, value]) => (
                            <option
                              key={key}
                              value={key}
                              className="bg-white text-black font-poppins"
                            >
                              {value}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    <ul>
                      {descList?.map((item) => (
                        <li
                          key={uuidv4()}
                          className="py-1 font-poppins text-black font-semibold"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>

                    <p className="pt-2 font-poppins text-blue font-semibold text-sm capitalize">
                      Historial de cambios:
                    </p>
                    <ul className=" list-decimal">
                    {data.completedBy.map((activityLog) => (
                      <li
                        key={activityLog._id}
                        className="font-poppins text-black text-sm mt-2"
                      >
                        Ubicado en {statusTranslation[activityLog.status]} por:{" "}
                        <span className="font-poppins text-blue ">
                          {activityLog.user.name}
                        </span>
                      </li>
                    ))}</ul>

                    <p className="mt-6 text-sm text-black font-poppins">
                      Agregada el: {formDate(data.createdAt)}
                    </p>
                    <p className="mt-2 text-sm text-black font-poppins">
                      Última actualización: {formDate(data.updatedAt)}
                    </p>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
}
