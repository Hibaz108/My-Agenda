import type { IconType } from "react-icons";

export type FormInputProps = {
  id: string;
  label: string;
  type: "text" | "password" | "email";
  placeholder: string;
  Icon: IconType;
};

export type GoogleBtnProps = {
  children: React.ReactNode;
};

export type TaskType = {
  id: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  tag: string;
};

export type TaskModalProps = {
  onClose: () => void;
};
