import { getAllMember } from "@/api/teamApi";
import Spinner from "@/components/Spinner";
import AddMemberModal from "@/components/team/AddMemberModal";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

export default function ShopTeamView() {
  const navigate = useNavigate();
  const params = useParams();
  const shopId = params.shopId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["shopTeam", shopId],
    queryFn: ()=>getAllMember(shopId),
    retry:false
  });

  if (isLoading) return <Spinner />;
  if (isError) return <Navigate to={"/404"} />;
  if(data)
  return (
    <>
      <h1 className="text-black font-poppins text-2xl font-semibold ">
        Administrar colaboradores
      </h1>

      <nav>
        <button
          type="button"
          onClick={() => navigate(location.pathname + "?addmember=true")}
          className="mt-5 bg-blue text-white rounded cursor-pointer px-10 py-3 font-poppins font-semibold hover:bg-yellow hover:text-black duration-300"
        >
          Agregar colaborador
        </button>
      </nav>
      <nav className="my-5">
        <Link
          className=" bg-blue text-white rounded cursor-pointer px-10 py-3 font-poppins font-semibold hover:bg-yellow hover:text-black duration-300"
          to={`/shops/${shopId}`}
        >
          Volver
        </Link>
      </nav>
      <AddMemberModal />
    </>
  );
}
