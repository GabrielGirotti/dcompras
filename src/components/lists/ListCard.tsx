import { deleteList } from "@/api/listApi";
import DeleteSVG from "@/svg/DeleteSVG";
import EditSVG from "@/svg/EditSVG";
import EyeSVG from "@/svg/EyeSVG";
import { List } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type ListCardProps = {
  list: {
    _id: string;
    name: string;
    description: string;
    shop: string;
    status: "toShop" | "toChangeSome" | "bought" | "ideas";
  };
};

export default function ListCard({ list }: ListCardProps) {
  const params = useParams();
  const shopId = params.shopId!;

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteList,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["shopEdit", shopId] });
      toast.success(data);
      navigate(location.pathname);
    },
  });

  const handleDelete = (editListId: List["_id"]) => {
    const data = {
      shopId,
      editListId,
    };

    mutate(data);
  };

  return (
    <li className="flex flex-col items-center shadow-lg p-5 gap-4 rounded-lg">
      <div className="flex flex-col items-center">
        <button
          type="button"
          className="py-2 text-center font-poppins text-blue font-semibold text-xl capitalize"
        >
          {list.name}
        </button>
        <p className="py-2 text-center font-poppins text-black font-semibold">
          {list.description}
        </p>
      </div>

      <div className=" flex items-center text-center gap-3 ">
        <Link
          to={``}
          className=" cursor-pointer flex justify-center items-center  bg-yellow rounded-lg px-4 py-2 text-black hover:bg-blue hover:text-white duration-300 "
        >
          <EyeSVG className="text-xs font-semibold font-poppins w-5" />
        </Link>
        <button
          type="button"
          onClick={() =>
            navigate(location.pathname + `?editListId=${list._id}`)
          }
          className=" cursor-pointer flex justify-center items-center  bg-yellow rounded-lg px-4 py-2 text-black hover:bg-blue hover:text-white duration-300 "
        >
          <EditSVG className="text-xs font-semibold font-poppins w-5" />
        </button>

        <div className=" flex justify-center items-center  bg-yellow rounded-lg px-4 py-2 text-black hover:bg-red hover:text-white duration-300">
          <button
            type="button"
            className="text-xs font-semibold font-poppins cursor-pointer"
            onClick={() => handleDelete(list._id)}
          >
            <DeleteSVG className=" w-5" />
          </button>
        </div>
      </div>
    </li>
  );
}
