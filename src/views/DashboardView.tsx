import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteShop, getAllShops } from "@/api/shopsApi";
import Spinner from "@/components/Spinner";
import EyeSVG from "@/svg/EyeSVG";
import EditSVG from "@/svg/EditSVG";
import DeleteSVG from "@/svg/DeleteSVG";
import { toast } from "react-toastify";
import { Shop } from "../types";
import { userAuth } from "@/hooks/useAuth";

export default function DashboardView() {
  const { data: user, isLoading: authLoading } = userAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["shops"],
    queryFn: getAllShops,
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteShop,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["shops"] });
      toast.success(data);
      navigate("/shops");
    },
  });

  const handleDelete = (shopId: Shop["_id"]) => {
    mutate(shopId);
  };

  if (isLoading && authLoading) return <Spinner />;

  return (
    <>
      <h1 className=" font-poppins text-black font-semibold text-2xl">
        Mis compras
      </h1>

      {data?.length ? (
        <div className="py-5 flex flex-col items-center">
          {" "}
          <p className="font-poppins text-black-6">
            Administra tus listas de compras
          </p>
          <ul role="list" className="flex flex-col gap-6 mt-5 ">
            {data.map((shop) => (
              <li
                key={shop._id}
                className=" relative flex justify-center gap-x-6 px-5 py-10 shadow-lg bg-white rounded-2xl hover:bg-yellow/20 duration-300 w-[500px] max-w-[80vw]"
              >
                {user?._id === shop.manager ? (
                  <div className="px-2 py-1 bg-blue absolute top-0 w-full">
                    <p className="font-poppins text-xs text-white text-center">
                      Compra propia
                    </p>
                  </div>
                ) : (
                  <div className="px-2 py-1 bg-yellow absolute top-0 w-full">
                    <p className="font-poppins text-xs text-black text-center">
                      Invitado a compra
                    </p>
                  </div>
                )}
                <div className="flex flex-col items-center justify-center min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2 flex flex-col items-center">
                    <Link
                      to={`/shops/${shop._id}`}
                      className="text-blue font-poppins cursor-pointer text-2xl font-semibold hover:scale-105 hover:underline duration-300"
                    >
                      {shop.shopName}
                    </Link>
                    <p className="text-sm font-semibold text-black font-poppins">
                      {shop.localName}
                    </p>
                    <p className="text-sm text-black pb-3">
                      {shop.description}
                    </p>
                  </div>

                  <div className=" flex items-center text-center gap-3 ">
                    <Link
                      to={`/shops/${shop._id}`}
                      className=" cursor-pointer flex justify-center items-center  bg-yellow rounded-lg px-4 py-2 text-black hover:bg-blue hover:text-white duration-300 "
                    >
                      <EyeSVG className="text-xs font-semibold font-poppins w-5" />
                    </Link>

                    {user?._id === shop.manager && (
                      <>
                        <Link
                          to={`/shops/${shop._id}/edit`}
                          className=" cursor-pointer flex justify-center items-center  bg-yellow rounded-lg px-4 py-2 text-black hover:bg-blue hover:text-white duration-300 "
                        >
                          <EditSVG className="text-xs font-semibold font-poppins w-5" />
                        </Link>

                        <div className=" flex justify-center items-center  bg-yellow rounded-lg px-4 py-2 text-black hover:bg-red hover:text-white duration-300">
                          <button
                            type="button"
                            className="text-xs font-semibold font-poppins cursor-pointer"
                            onClick={() => handleDelete(shop._id)}
                          >
                            <DeleteSVG className=" w-5" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="font-poppins text-black text-center my-5 px-6">
          Aún no hay datos, {""}
          <Link
            to="/shops/create"
            className=" cursor-pointer text-blue font-bold"
          >
            crea tu primer compra haciendo click aquí
          </Link>
        </p>
      )}
      <nav className="my-5">
        <Link
          className=" bg-blue text-white rounded cursor-pointer px-10 py-3 font-poppins font-semibold hover:bg-yellow hover:text-black duration-300"
          to="/shops/create"
        >
          Nueva compra
        </Link>
      </nav>
    </>
  );
}
