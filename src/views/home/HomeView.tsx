import { Link } from "react-router-dom";

export default function HomeView() {
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:mt-16 mt-5 gap-6">
        <img src="/home_image.svg" alt="Imagen DCompras" />

        <div className="flex flex-col max-w-[500px]">
          <h1 className=" font-poppins font-semibold text-2xl text-yellow mt-5 text-center px-6">
            ¡Únete a DCompras!
          </h1>
          <p className=" font-poppins text-base text-white text-center px-2 max-w-[700px] mt-5">
            El lugar donde puedes preparar tus listas de compras, y que todos
            los miembros de la casa las puedan ver y editar
          </p>

          <nav className="mt-5 flex flex-col gap-4 items-center">
            <Link
              className=" text-center max-w-[300px] font-semibold font-poppins bg-blue text-white cursor-pointer w-full p-3 rounded hover:bg-yellow hover:text-black duration-300"
              to={"/auth/login"}
            >
              Iniciar sesión
            </Link>

            <Link
              className="text-center font-poppins text-white"
              to={"/auth/register"}
            >
              ¿No tienes cuenta?{" "}
              <span className="font-semibold text-yellow">Crea una</span>
            </Link>

            <Link
              className="text-center font-poppins text-white"
              to={"/privacy"}
            >
              Políticas de privacidad
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
