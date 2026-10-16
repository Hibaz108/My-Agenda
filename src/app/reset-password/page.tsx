"use client";
// react and next
import { useState, useEffect } from "react";
import Link from "next/link";
// components
import SuccessMessage from "@/components/SuccessMessage";
import FieldError from "@/components/FieldError";
// react hook form & zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/schemas/authSchema";

// supabase
import { createClient } from "@/lib/supabase/client";

const ResetPasswordForm = () => {
  const supabase = createClient();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setErrorMessage("");

    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) {
        setErrorMessage("Unable to update your password. Please try again.");
        return;
      }

      setIsSuccess(true);
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        setHasSession(!error && data.user !== null);
      } catch {
        setHasSession(false);
      } finally {
        setIsCheckingSession(false);
      }
    };
    checkSession();
  }, [supabase]);

  if (isCheckingSession) {
    return (
      <div className="min-h-svh flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Verifying reset session...
        </p>
      </div>
    );
  }

  if (!hasSession) {
    return (
      <div className="min-h-svh flex items-center justify-center">
        <div className="w-full max-w-md bg-background p-4 rounded-2xl shadow-sm">
          <h3 className="text-lg text-primary font-bold">
            Reset link unavailable
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Your reset link may have expired or is invalid. Please request a new
            one.
          </p>

          <Link
            href="/forgot-password"
            className="block bg-primary p-2 mt-4 text-sm text-center text-primary-foreground font-semibold rounded-lg
            hover:bg-primary-hover transition-colors"
          >
            Request a new reset link
          </Link>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <SuccessMessage
        title="Password updated"
        message="Your password has been changed successfully. You can now log in with your new password."
      />
    );
  }

  return (
    <div className="min-h-svh flex justify-center items-center">
      <div className="w-full max-w-md bg-background p-4 rounded-2xl shadow-sm">
        <h3 className="mb-1 text-lg font-bold text-primary">
          Set a new password
        </h3>

        <p className="text-sm text-muted-foreground">
          Choose a password you haven&apos;t used before.
        </p>

        <form className="my-3" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-3">
            <label htmlFor="password" className="font-semibold text-heading">
              New password
            </label>

            <input
              type="password"
              id="password"
              className="w-full bg-card p-2 mt-1 border border-border rounded-lg shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
              autoComplete="new-password"
              {...register("password")}
            />
            <FieldError message={errors.password?.message} />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="font-semibold text-heading"
            >
              Confirm password
            </label>

            <input
              type="password"
              id="confirmPassword"
              className="w-full bg-card p-2 mt-1 border border-border rounded-lg shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
              autoComplete="new-password"
              {...register("confirmPassword")}
            />

            <FieldError message={errors.confirmPassword?.message} />
          </div>

          {errorMessage && (
            <p role="alert" className="mt-3 text-xs text-red-500">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary p-2 mt-5 text-sm text-primary-foreground
             font-semibold rounded-lg hover:bg-primary-hover transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Updating password..." : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
