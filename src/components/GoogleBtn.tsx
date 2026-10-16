"use client";
import type { GoogleBtnProps } from "@/types/types";
import { FcGoogle } from "react-icons/fc";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

const GoogleBtn = ({ children }: GoogleBtnProps) => {
  const supabase = createClient();

  const handleGoogleAuth = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error("Google sign-in failed. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-1.5 bg-card p-2 rounded-lg text-sm 
    font-medium"
      onClick={handleGoogleAuth}
    >
      <FcGoogle className="size-5" aria-hidden="true" /> {children}
    </button>
  );
};

export default GoogleBtn;
