import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllShops } from "@/api/shopsApi";
import Spinner from "@/components/Spinner";
import EyeSVG from "@/svg/EyeSVG";
import EditSVG from "@/svg/EditSVG";
import DeleteSVG from "@/svg/DeleteSVG";

export default function DashboardView() {
  const { data, isLoading } = useQuery({
    queryKey: ["shops"],
    queryFn: getAllShops,
  });

  if (isLoading) return <Spinner />;

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
                className=" flex justify-center gap-x-6 px-5 py-10 shadow-lg bg-white rounded-2xl hover:bg-yellow/20 duration-300 w-[500px] max-w-[80vw]"
              >
                <div className="flex flex-col items-center justify-center min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2 flex flex-col items-center">
                    <Link
                      to={``}
                      className="text-blue font-poppins cursor-pointer text-2xl font-semibold hover:scale-105 hover:underline duration-300"
                    >
                      {shop.shopName}
                    </Link>
                    <p className="text-sm font-semibold text-black font-poppins">
                      Local: {shop.localName}
                    </p>
                    <p className="text-sm text-black pb-3">
                      {shop.description}
                    </p>
                  </div>

                  <div className=" flex items-center text-center gap-3 ">
                    <div className=" flex justify-center items-center cursor-pointer bg-yellow rounded-lg px-4 py-2 text-black hover:bg-blue hover:text-white duration-300 ">
                      <Link
                        to={``}
                        className=" text-xs font-semibold font-poppins"
                      >
                        <EyeSVG className=" w-5" />
                      </Link>
                    </div>
                    <div className="flex justify-center items-center cursor-pointer bg-yellow rounded-lg px-4 py-2 text-black hover:bg-blue hover:text-white duration-300">
                      <Link
                        to={``}
                        className="text-xs font-semibold font-poppins"
                      >
                        <EditSVG className=" w-5" />
                      </Link>
                    </div>
                    <div className=" flex justify-center items-center cursor-pointer bg-yellow rounded-lg px-4 py-2 text-black hover:bg-red hover:text-white duration-300">
                      <button
                        type="button"
                        className="text-xs font-semibold font-poppins"
                        onClick={() => {}}
                      >
                        <DeleteSVG className=" w-5" />
                      </button>
                    </div>
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
