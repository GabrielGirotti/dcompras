import { Link } from "react-router-dom";

type NavMenuProps = {
  handleOpen: () => void;
};

export default function NavMenu({ handleOpen }: NavMenuProps) {
  return (
    <div className="md:pr-36  h-screen w-screen max-w-[500px] bg-black px-12 pt-24 font-semibold font-poppins text-white shadow-lg flex flex-col items-end ">
      <button
        className="text-yellow uppercase text-3xl mb-5"
        onClick={handleOpen}
      >
        X
      </button>
      <p className="font-bold p-2 text-yellow">Hola: Usuario</p>

      <Link to="/profile" className="block p-2 hover:text-yellow">
        Mi Perfil
      </Link>
      <Link to="/" className="block p-2 hover:text-yellow">
        Mis Proyectos
      </Link>
      <button
        className="block p-2 hover:text-yellow"
        type="button"
        onClick={() => {}}
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
