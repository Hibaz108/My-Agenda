import type { InputHTMLAttributes, ReactNode } from "react";
import type { IconType } from "react-icons";
import type { User } from "@supabase/supabase-js";

export type FormInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "type"
> & {
  id: string;
  label: string;
  type: "text" | "password" | "email";
  placeholder: string;
  Icon: IconType;
};

export type GoogleBtnProps = {
  children: ReactNode;
};

export type TaskType = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  color: string;
  tags: string[];
  created_at: string;
  user_id: string;
};

export type TaskModalProps = {
  onClose: () => void;
};

export type SuccessMessageProps = {
  title: string;
  message: string;
};

export type FieldErrorProps = {
  message?: string;
};

export type DashboardClientProps = {
  user: User;
};
