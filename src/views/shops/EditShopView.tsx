import { getShopById } from "@/api/shopsApi";
import EditShopForm from "@/components/shops/EditShopForm";
import Spinner from "@/components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

export default function EditShopView() {
  const params = useParams();
  const shopId = params.shopId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["shopEdit", shopId],
    queryFn: () => getShopById(shopId),
    retry: false,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <Navigate to="/404" />;

  return <EditShopForm data={data} shopId={shopId} />;
}
