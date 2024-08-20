import LogoVertical from "@/components/LogoVertical";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
  return (
    <>
      <div className="bg-black min-h-screen flex flex-col items-center">
        <div className="py-10 max-w-[90vw] flex flex-col items-center">
          <div className="w-52">
            <LogoVertical />
          </div>
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
