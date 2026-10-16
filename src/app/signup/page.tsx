"use client";
// react & next
import { useState } from "react";
import Link from "next/link";
// components
import FormInput from "@/components/FormInput";
import GoogleBtn from "@/components/GoogleBtn";
import SuccessMessage from "@/components/SuccessMessage";
import FieldError from "@/components/FieldError";
// icons
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
// reacct hook form & zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormValues } from "@/schemas/authSchema";
// supabase
import { createClient } from "@/lib/supabase/client";

const SignupForm = () => {
  const supabase = createClient();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setErrorMessage("");

    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }
      setIsSuccess(true);
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  if (isSuccess) {
    return (
      <SuccessMessage
        title="Check your inbox"
        message={`We sent a confirmation link to ${getValues("email")}. Click it to activate your account, then sign in.`}
      />
    );
  }

  return (
    <div className="min-h-svh flex items-center justify-center ">
      <div className="w-full max-w-sm bg-background p-6 rounded-2xl shadow-md">
        <div className="mb-6 space-y-2 text-center">
          <h3 className="text-3xl text-heading font-heading font-bold">
            Get Started
          </h3>
          <p className="text-sm text-muted-foreground font-semibold">
            Create your account now.
          </p>
        </div>

        <form
          className="space-y-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div>
            <FormInput
              id="name"
              label="Full name"
              type="text"
              placeholder="Enter your full name"
              Icon={FaUserCircle}
              autoComplete="name"
              {...register("fullName")}
            />
            <FieldError message={errors.fullName?.message} />
          </div>

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
              autoComplete="new-password"
              {...register("password")}
            />
            <FieldError message={errors.password?.message} />
          </div>

          {errorMessage && (
            <p role="alert" className="text-xs text-red-500">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary p-2 rounded-lg text-primary-foreground text-sm font-semibold 
            hover:bg-primary-hover transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Create a new account"}
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
            <Link
              href="/login"
              className="text-primary underline hover:text-primary-hover transition-colors"
            >
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
