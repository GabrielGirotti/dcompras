import { Link, useNavigate } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { ConfirmToken } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "@/api/authApi";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
  const [token, setToken] = useState<ConfirmToken["token"]>("");

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate("/auth/login");
    },
  });

  const handleChange = (token: ConfirmToken["token"]) => {
    setToken(token);
  };

  const handleComplete = (token: ConfirmToken["token"]) => {
    mutate({token});
  };

  return (
    <>
      <h1 className="text-xl font-bold font-poppins text-yellow mt-5 text-center">
        Confirma tu Cuenta
      </h1>
      <p className="text-lg font-poppins font-light text-white mt-5 text-center px-8">
        Ingresa el código que recibiste por e-mail
      </p>
      <form className="space-y-3 p-5 mt-5 rounded-lg">
        <label className="font-normal text-white text-lg font-poppins text-center block">
          Código de 6 dígitos
        </label>
        <div className="bg-white flex justify-center gap-2 p-5 rounded-lg">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            <PinInputField className="w-10 h-10 rounded-lg border-blue border-2 placeholder-white text-center" />
            <PinInputField className="w-10 h-10 rounded-lg border-blue border-2 placeholder-white text-center" />
            <PinInputField className="w-10 h-10 rounded-lg border-blue border-2 placeholder-white text-center" />
            <PinInputField className="w-10 h-10 rounded-lg border-blue border-2 placeholder-white text-center" />
            <PinInputField className="w-10 h-10 rounded-lg border-blue border-2 placeholder-white text-center" />
            <PinInputField className="w-10 h-10 rounded-lg border-blue border-2 placeholder-white text-center" />
          </PinInput>
        </div>
      </form>

      <nav className="mt-5 flex flex-col space-y-4">
        <Link
          to="/auth/new-code"
          className="text-center text-yellow font-poppins font-normal"
        >
          Solicitar un nuevo código
        </Link>
      </nav>
    </>
  );
}
