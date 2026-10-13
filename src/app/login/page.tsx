// components
import FormInput from "@/components/FormInput";
// icons
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
// other
import Link from "next/link";
import GoogleBtn from "@/components/GoogleBtn";

const LoginForm = () => {
  return (
    <div className="min-h-svh flex justify-center items-center">
      <div className="w-full max-w-sm bg-background p-6 rounded-2xl shadow-md">
        <div className="text-center space-y-2 mb-6">
          <h3 className="text-3xl font-heading font-bold text-heading">
            Log In
          </h3>

          <p className="text-sm font-semibold text-muted-foreground">
            We&apos;re happy to see you again!
          </p>
        </div>

        <form className="space-y-4">
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

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-primary font-semibold hover:text-primary-hover transition-colors"
            >
              Forgot your password?
            </Link>
          </div>

          <button
            type="button"
            className="w-full bg-primary p-2 text-sm text-primary-foreground font-semibold rounded-lg
            hover:bg-primary-hover transition-colors"
          >
            Log in
          </button>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-[1.5px] bg-border" />
            <span className="text-muted-foreground font-semibold">or</span>
            <div className="flex-1 h-[1.5px] bg-border" />
          </div>

          <GoogleBtn>Continue with Google</GoogleBtn>

          <div className="flex justify-center gap-1 text-sm font-semibold">
            <span className="text-muted-foreground">
              Don&apos;t have an account?
            </span>
            <Link href="/signup" className="text-primary underline hover:text-primary-hover transition-colors">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
