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
