import type { FormInputProps } from "@/types/types";

const FormInput = ({ id, label, type, placeholder, Icon }: FormInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm text-heading font-semibold">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={type}
          className="w-full bg-input py-2 pl-10 rounded-lg outline-none text-sm focus-visible:ring-2 focus-visible:ring-primary "
          placeholder={placeholder}
          required
        />
        <Icon
          className="absolute left-2 top-1/2 -translate-y-1/2 size-5 text-primary"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default FormInput;
