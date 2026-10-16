"use client";
// react & next
import { useState } from "react";
import Link from "next/link";
// components
import SuccessMessage from "@/components/SuccessMessage";
import FieldError from "@/components/FieldError";
// react hook form & zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/schemas/authSchema";
// supabase
import { createClient } from "@/lib/supabase/client";

const ForgotPasswordForm = () => {
  const supabase = createClient();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setErrorMessage("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });

      if (error) {
        setErrorMessage("Unable to send the reset link. Please try again.");
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
        title="Check your email"
        message="If an account exists for this email, you'll receive a password reset link."
      />
    );
  }

  return (
    <div className="min-h-svh flex items-center justify-center">
      <div className="w-full max-w-md bg-background p-4 rounded-2xl shadow-sm">
        <h1 className="text-xl text-primary font-bold mb-1">
          Reset your password
        </h1>

        <p className="text-sm text-muted-foreground">
          Enter your email and we&apos;ll send you a reset link.
        </p>

        <form className="my-3" onSubmit={handleSubmit(onSubmit)} noValidate>
          <label htmlFor="email" className="text-heading font-semibold">
            Email
          </label>

          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            className="w-full bg-card p-2 mt-1 border border-border rounded-lg outline-none placeholder:text-sm focus-visible:ring-2 focus-visible:ring-primary "
            autoComplete="email"
            {...register("email")}
          />

          <FieldError message={errors.email?.message} />

          {errorMessage && (
            <p role="alert" className="mt-1 text-xs text-red-500">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary p-2 mt-6 text-sm text-primary-foreground font-semibold rounded-lg
            hover:bg-primary-hover transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send reset link"}
          </button>
        </form>

        <Link
          href="/login"
          className="block text-center text-primary/80 hover:text-primary-hover transition-colors"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
