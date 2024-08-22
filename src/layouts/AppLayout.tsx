import { Link, Navigate, Outlet } from "react-router-dom";
import LogoVertical from "@/components/LogoVertical";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Popover } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { useState } from "react";
import NavMenu from "@/components/NavMenu";
import { userAuth } from "@/hooks/useAuth";
import Spinner from "@/components/Spinner";

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const { data, isError, isLoading } = userAuth();

  if (isLoading) return <Spinner />;
  if (isError) return <Navigate to={"/auth/login"} />;
  if (data)
    return (
      <>
        <header className=" bg-black py-5 flex flex-col justify-center items-center relative">
          <div className="w-40">
            <Link to="/shops">
              <LogoVertical />
            </Link>
          </div>
          <div className=" absolute right-8 bottom-4 md:right-32">
            <Popover>
              <Popover.Button
                onClick={handleOpen}
                className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-purple-400"
              >
                <Bars3Icon className="w-8 h-8 text-yellow " />
              </Popover.Button>
            </Popover>
          </div>
        </header>
        <section className=" flex flex-col items-center justify-center mt-10 px-4">
          <Outlet />
        </section>
        <footer className="py-5 text-center font-poppins text-black">
          <p>Todos los derechos reservados </p>
        </footer>
        <nav
          className={` fixed top-0 z-10 ${
            open ? "right-0" : " -right-[500px]"
          } duration-500 `}
        >
          <NavMenu handleOpen={handleOpen} data={data} />
        </nav>
        <ToastContainer
          theme="dark"
          position="bottom-center"
          pauseOnFocusLoss={false}
          pauseOnHover={false}
        />
      </>
    );
}
