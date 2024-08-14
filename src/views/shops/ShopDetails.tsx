import { getShopById } from "@/api/shopsApi";
import AddListModal from "@/components/lists/AddListModal";
import AllLists from "@/components/lists/AllLists";
import Spinner from "@/components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

export default function ShopDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const shopId = params.shopId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["shopEdit", shopId],
    queryFn: () => getShopById(shopId),
    retry: false,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <Navigate to="/404" />;

  return (
    <>
      <h1 className="text-blue font-poppins text-2xl font-semibold ">
        {data.shopName}
      </h1>
      <p className="py-5 text-center font-poppins text-black font-semibold">
        {data.localName}
      </p>
      <AllLists lists={data.lists} />
      <nav>
        <button
          type="button"
          onClick={() => navigate(location.pathname + "?newlist=true")}
          className="mt-5 bg-blue text-white rounded cursor-pointer px-10 py-3 font-poppins font-semibold hover:bg-yellow hover:text-black duration-300"
        >
          Agregar lista
        </button>
      </nav>
      <nav className="my-5">
        <Link
          className=" bg-blue text-white rounded cursor-pointer px-10 py-3 font-poppins font-semibold hover:bg-yellow hover:text-black duration-300"
          to="/"
        >
          Volver
        </Link>
      </nav>

      <AddListModal />
    </>
  );
}
