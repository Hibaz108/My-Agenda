import type { SuccessMessageProps } from "@/types/types";
import Link from "next/link";
import { FaRegCircleCheck } from "react-icons/fa6";

const SuccessMessage = ({ title, message }: SuccessMessageProps) => {
  return (
    <div className="min-h-svh flex justify-center items-center">
      <div className="w-full max-w-md flex flex-col items-center bg-background p-5 text-center rounded-2xl shadow-sm">
        <span className="text-primary mb-1">
          <FaRegCircleCheck className="size-10" />
        </span>
        <h3 className="text-lg text-primary font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{message} </p>

        <Link
          href="/login"
          className="bg-primary text-sm text-primary-foreground font-semibold py-2 px-4 mt-5 
          rounded-lg"
        >
          Back to log in
        </Link>
      </div>
    </div>
  );
};

export default SuccessMessage;
