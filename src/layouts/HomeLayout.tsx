import LogoVertical from "@/components/LogoVertical";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function HomeLayout() {

  
  return (
    <>
      <div className="bg-black min-h-screen flex flex-col items-center">
        <div className="py-10 max-w-[90vw] flex flex-col items-center">
          <Link to={'/'} className="w-52">
            <LogoVertical />
          </Link>
          <div >
            <Outlet />
          </div>
        </div>
      </div>
      <ToastContainer
        theme="dark"
        position="bottom-center"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
 
    </>
  );
}