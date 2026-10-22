import type { InputHTMLAttributes, ReactNode } from "react";
import type { IconType } from "react-icons";
import type { User } from "@supabase/supabase-js";
import type { TaskFormValues } from "@/schemas/taskSchema";

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
  color: TaskFormValues["color"];
  tags: string[];
  created_at: string;
  user_id: string;
};

export type TaskModalProps = {
  onClose: () => void;
  task?: TaskType;
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

export type TaskControlsProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  selectedPriority: string;
  onPriorityChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
};

export type TaskBoardContentProps = {
  tasks: TaskType[];
  sortedTasks: TaskType[];
  isPending: boolean;
  hasError: boolean;
  onRetry: () => void;
  onAddTask: () => void;
  onClearAll: () => void;
};
