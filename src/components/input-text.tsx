import * as React from "react";
import { Input } from "./ui/input";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputText = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, name, label, error, ...props }, ref) => {
    return (
      <div>
        <div>
          <label className="text-primary font-bold ml-2" htmlFor={name}>
            {label}
          </label>
          <Input
            type={type}
            className="rounded-full border-primary "
            ref={ref}
            {...props}
          />
        </div>

        <p className="text-red-500 text-xs ml-2">{error}</p>
      </div>
    );
  }
);
InputText.displayName = "InputText";

export { InputText };
