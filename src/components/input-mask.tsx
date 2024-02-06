import * as React from "react";
import InputMask from "react-input-mask";

import { cn } from "@/lib/utils";

const MASK_TYPE = {
  cpf: "999.999.999-99",
  cep: "99999-999",
  telefone: "(99) 99999-9999",
  date: "99/99/9999",
} as const;

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: keyof typeof MASK_TYPE;
  label?: string;
  error?: string;
}

const CustonInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, mask, name, label, error, ...props }, ref) => {
    return (
      <div>
        <label className="text-primary font-bold ml-2" htmlFor={name}>
          {label}
        </label>
        <InputMask
          type={type}
          mask={MASK_TYPE[mask]}
          maskChar=" "
          className={cn(
            "px-4 flex w-full rounded-full focus:outline-primary focus:border-1 focus:outline-0 focus:shadow-none border border-primary h-10",
            className
          )}
          inputRef={ref}
          {...props}
        />
        <p className="text-red-500 text-xs ml-2">
          {error}
        </p>
      </div>
    );
  }
);
CustonInput.displayName = "CustonInput";

export { CustonInput as InputMask };
