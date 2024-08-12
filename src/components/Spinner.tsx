import { tailspin } from "ldrs";

tailspin.register();

type SppinerPropTypes = {
  className?: string;
};

export default function Spinner({ className }: SppinerPropTypes) {
  return (
    <div
      className={`absolute top-0 h-screen w-screen flex justify-center items-center bg-black/70 ${className}`}
    >
      <l-tailspin size="40" stroke="5" speed="0.9" color="#C8EF53"></l-tailspin>
    </div>
  );
}
