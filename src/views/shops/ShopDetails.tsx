import { getShopById } from "@/api/shopsApi";
import AddListModal from "@/components/lists/AddListModal";
import AllLists from "@/components/lists/AllLists";
import EditDataList from "@/components/lists/EditDataList";
import ListModal from "@/components/lists/ListModal";
import Spinner from "@/components/Spinner";
import { userAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

export default function ShopDetails() {
  const { data: user, isLoading: authLoading } = userAuth();

  const navigate = useNavigate();
  const params = useParams();
  const shopId = params.shopId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["shopEdit", shopId],
    queryFn: () => getShopById(shopId),
    retry: false,
  });

  const canDelete = useMemo(() => data.manager === user?._id, [data, user]);

  if (isLoading && authLoading) return <Spinner />;
  if (isError) return <Navigate to="/404" />;

  if (data && user)
    return (
      <>
        <h1 className="text-blue font-poppins text-2xl font-semibold ">
          {data.shopName}
        </h1>
        <p className="py-5 text-center font-poppins text-black font-semibold">
          {data.localName}
        </p>
        <AllLists lists={data.lists} canDelete={canDelete}/>
        {isManager(data.manager, user._id) && (
          <Link
            to={"team"}
            className="mt-5 hover:scale-105 rounded cursor-pointer px-10 py-3 font-poppins font-semibold bg-yellow text-black duration-300"
          >
            Colaboradores
          </Link>
        )}

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
            to="/shops"
          >
            Volver
          </Link>
        </nav>

        <AddListModal />
        <EditDataList />
        <ListModal />
      </>
    );
}
