import { addMember } from "@/api/teamApi";
import { TeamMember } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type MemberFoundProps = {
  user: TeamMember;
  resetForm: () => void;
};

export default function MemberFound({ user, resetForm }: MemberFoundProps) {
  const params = useParams();
  const shopId = params.shopId!;

  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: addMember,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      resetForm();
      navigate(location.pathname, { replace: true });
    },
  });

  const handleAdd = () => {
    const data = {
      shopId,
      id: user._id,
    };

    mutate(data);
  };
  return (
    <div className="flex flex-col gap-2 items-center">
      <p className="font-poppins tet-base text-black mt-5">Resultado:</p>
      <p className="font-poppins text-xl text-blue font-semibold">
        {user.name}
      </p>
      <button
        type="submit"
        onClick={handleAdd}
        className="font-semibold font-poppins bg-blue text-white cursor-pointer w-full p-3 rounded hover:bg-yellow hover:text-black duration-300"
      >
        Agregar a la compra
      </button>
    </div>
  );
}
