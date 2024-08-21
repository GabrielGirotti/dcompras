import { confirmTokenForPass } from "@/api/authApi";
import { ConfirmToken } from "@/types/index";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

type NewPasswordTokenProps = {
  token: ConfirmToken["token"];
  setToken: React.Dispatch<React.SetStateAction<string>>
  setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>

};

export default function NewPasswordToken({ token, setToken, setIsValidToken }: NewPasswordTokenProps) {


  const { mutate } = useMutation({
    mutationFn: confirmTokenForPass,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      setIsValidToken(true)
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
      <form className="space-y-3 p-5 ">
        <label className="text-lg font-light text-white text-center">
          Ingresa el código{" "}
          <span className=" text-yellow font-bold">
            que recibiste por E-mail
          </span>
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
      <nav className=" flex flex-col space-y-4">
        <Link
          to="/auth/forgot-password"
          className="text-center text-yellow font-poppins font-normal"
        >
          Solicitar un nuevo código
        </Link>
      </nav>
    </>
  );
}
