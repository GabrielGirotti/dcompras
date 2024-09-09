import { deleteUserFromShop, getAllMember } from "@/api/teamApi";
import Spinner from "@/components/Spinner";
import AddMemberModal from "@/components/team/AddMemberModal";
import DeleteSVG from "@/svg/DeleteSVG";
import { TeamMember } from "@/types/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ShopTeamView() {
  const navigate = useNavigate();
  const params = useParams();
  const shopId = params.shopId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["shopTeam", shopId],
    queryFn: () => getAllMember(shopId),
    retry: false,
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteUserFromShop,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["shopTeam", shopId] });
      toast.success(data);
      navigate(location.pathname);
    },
  });

  const handleDelete = (userId: TeamMember["_id"]) => {
    const data = {
      shopId,
      userId,
    };

    mutate(data);
  };

  if (isLoading) return <Spinner />;
  if (isError) return <Navigate to={"/404"} />;
  if (data)
    return (
      <>
        <h1 className="text-black font-poppins text-2xl font-semibold ">
          Administrar colaboradores
        </h1>

        {data.length ? (
          <ul role="list" className="flex flex-col mt-5 ">
            {data?.map((member) => (
              <li
                key={member._id}
                className=" flex justify-center gap-x-6 p-5 w-[500px] max-w-[80vw]"
              >
                <div className="flex  min-w-0 gap-x-4">
                  <div className="text-blue font-poppins text-2xl font-semibold">
                    {member.name}
                  </div>

                  <div className=" flex items-center text-center gap-3 ">
                    <div className=" flex justify-center items-center  bg-yellow rounded-lg px-4 py-2 text-black hover:bg-red hover:text-white duration-300">
                      <button
                        type="button"
                        className="text-xs font-semibold font-poppins cursor-pointer"
                        onClick={() => handleDelete(member._id)}
                      >
                        <DeleteSVG className=" w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center py-20">No hay miembros en este equipo</p>
        )}

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
