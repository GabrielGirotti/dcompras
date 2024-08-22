import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

type NavMenuProps = {
  handleOpen: () => void;
  data: {
    email: string;
    name: string;
    _id: string;
  };
};

export default function NavMenu({ handleOpen, data }: NavMenuProps) {
  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.removeItem("TokenDeAutenticacion");
    toast.success("Sesión cerrada");
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  return (
    <div className="md:pr-36  h-screen w-screen max-w-[500px] bg-black px-12 pt-24 font-semibold font-poppins text-white shadow-lg flex flex-col items-end ">
      <button
        className="text-yellow uppercase text-3xl mb-5"
        onClick={handleOpen}
      >
        X
      </button>
      <p className="font-bold p-2 text-yellow">Hola: {data.name}</p>

      <Link to="/profile" className="block p-2 hover:text-yellow">
        Mi Perfil
      </Link>
      <Link to="/shops" className="block p-2 hover:text-yellow">
        Mis Proyectos
      </Link>
      <button
        className="block p-2 hover:text-yellow"
        type="button"
        onClick={logout}
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
