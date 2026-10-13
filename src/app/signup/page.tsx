// components
import FormInput from "@/components/FormInput";
import GoogleBtn from "@/components/GoogleBtn";
// icons
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
// other
import Link from "next/link";

const SignupForm = () => {
  return (
    <div className="min-h-svh flex items-center justify-center">
      <div className="w-full max-w-sm bg-background p-6 rounded-2xl shadow-md">
        <div className="mb-6 space-y-2 text-center">
          <h3 className="text-3xl text-heading font-heading font-bold">Get Started</h3>
          <p className="text-sm text-muted-foreground font-semibold">Create your account now.</p>
        </div>

        <form className="space-y-5">
          <FormInput
            id="name"
            label="Full name"
            type="text"
            placeholder="Enter your full name"
            Icon={FaUserCircle}
          />

          <FormInput
            id="email"
            label="Email address"
            type="email"
            placeholder="Enter your email"
            Icon={MdEmail}
          />

          <FormInput
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            Icon={IoMdLock}
          />

          <button
            type="button"
            className="w-full bg-primary p-2 rounded-lg text-primary-foreground text-sm font-semibold 
            hover:bg-primary-hover transition-colors"
          >
            Create a new account
          </button>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-[1.5px] bg-border" />
            <span className="text-muted-foreground font-semibold">or</span>
            <div className="flex-1 h-[1.5px] bg-border" />
          </div>

          <GoogleBtn>Sign up with Google</GoogleBtn>

          <div className="flex justify-center gap-1 text-sm font-semibold">
            <span className="text-muted-foreground">
              Already have an account?
            </span>
            <Link href="/login" className="text-primary underline hover:text-primary-hover transition-colors">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
