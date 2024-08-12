import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllShops } from "@/api/shopsApi";
import Spinner from "@/components/Spinner";

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
        <div className="py-5">
          {" "}
          <p className="font-poppins text-black-6">
            Administra tus listas de compras
          </p>
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
