import type { GoogleBtnProps } from "@/types/types";
import { FcGoogle } from "react-icons/fc";

const GoogleBtn = ({ children }: GoogleBtnProps) => {
  return (
    <button
    type="button"
      className="w-full flex items-center justify-center gap-1.5 bg-card p-2 rounded-lg text-sm 
    font-semibold "
    >
      <FcGoogle className="size-5" aria-hidden="true" /> {children}
    </button>
  );
};

export default GoogleBtn;
