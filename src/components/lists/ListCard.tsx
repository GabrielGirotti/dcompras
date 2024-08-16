import { deleteList } from "@/api/listApi";
import DeleteSVG from "@/svg/DeleteSVG";
import EditSVG from "@/svg/EditSVG";
import EyeSVG from "@/svg/EyeSVG";
import { List } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

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

  const descList = list?.description.split(/\r\n|\r|\n/, -1);
  const listSlice = descList.slice(0, 5);

  return (
    <li className="flex flex-col items-start shadow-lg p-5 gap-4 rounded-lg lg:max-w-[25vw]">
      <div className="flex flex-col items-start">
        <button
          type="button"
          className="py-2 text-center font-poppins text-blue font-semibold text-xl capitalize"
        >
          {list.name}
        </button>
        <ul>
          {listSlice?.map((item) => (
            <li key={uuidv4()} className="pt-1 font-poppins text-black font-semibold">
              {item}
            </li>
          ))}
          <li
            onClick={() =>
              navigate(location.pathname + `?showList=${list._id}`)
            }
            className=" pt-1 font-poppins text-black font-semibold cursor-pointer"
          >
            Ver más...
          </li>
        </ul>
      </div>

      <div className=" flex items-center text-center gap-3 mx-auto">
        <button
          onClick={() => navigate(location.pathname + `?showList=${list._id}`)}
          className=" cursor-pointer flex justify-center items-center  bg-yellow rounded-lg px-4 py-2 text-black hover:bg-blue hover:text-white duration-300 "
        >
          <EyeSVG className="text-xs font-semibold font-poppins w-5" />
        </button>
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
