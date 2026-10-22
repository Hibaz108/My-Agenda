"use client";
// react & next
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// components
import FormInput from "@/components/auth/FormInput";
import GoogleBtn from "@/components/auth/GoogleBtn";
import FieldError from "@/components/auth/FieldError";
// icons
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
// react hook form & zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/schemas/authSchema";
// supabase
import { createClient } from "@/lib/supabase/client";

const LoginForm = () => {
  const router = useRouter();
  const supabase = createClient();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setErrorMessage("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        setErrorMessage("Invalid email or password. Please try again.");
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

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

        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div>
            <FormInput
              id="email"
              label="Email address"
              type="email"
              placeholder="Enter your email"
              Icon={MdEmail}
              autoComplete="email"
              {...register("email")}
            />
            <FieldError message={errors.email?.message} />
          </div>

          <div>
            <FormInput
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              Icon={IoMdLock}
              autoComplete="current-password"
              {...register("password")}
            />
            <FieldError message={errors.password?.message} />
          </div>

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-primary font-semibold hover:text-primary-hover transition-colors"
            >
              Forgot your password?
            </Link>
          </div>

          {errorMessage && (
            <p role="alert" className="text-xs text-red-500">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary p-2 text-sm text-primary-foreground font-semibold rounded-lg
            hover:bg-primary-hover transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Logging in..." : "Log in"}
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
            <Link
              href="/signup"
              className="text-primary underline hover:text-primary-hover transition-colors"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
