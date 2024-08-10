import { Link } from "react-router-dom";

export default function DashboardView() {
  return (
    <>
      <h1 className=" font-poppins text-black font-semibold text-2xl">
        Mis compras
      </h1>
      <p className="font-poppins text-black ">
        Administra tus listas de compras
      </p>
      <nav className="my-5">
        <Link
          className=" bg-blue text-white rounded cursor-pointer px-10 py-3 font-poppins font-semibold hover:bg-yellow hover:text-black duration-300"
          to="/shops/create"
        >
          Nueva compra
        </Link>
      </nav>
    </>
  );
}
