import { getListById } from "@/api/listApi";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom";
import EditListModal from "./EditListModal";
import Spinner from "../Spinner";

export default function EditDataList() {
  const params = useParams();
  const shopId = params.shopId!;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const editListId = queryParams.get("editListId")!;

  const { data, isError, isLoading } = useQuery({
    queryKey: ["list", editListId],
    queryFn: () => getListById({ shopId, editListId }),
    enabled: !!editListId,
    retry: false
  });

  if (isLoading) return <Spinner />;
  if (isError) return <Navigate to={"/404"} />;
  if (data)
    return (
      <EditListModal data={data} shopId={shopId} editListId={editListId} />
    );
}
