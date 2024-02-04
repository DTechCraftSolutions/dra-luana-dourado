import * as React from "react";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Select } from "@radix-ui/react-select";

export interface SelectInputProps {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
  field: any;
}

const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ label, error, options, field, ...props }, ref) => {
    return (
      <div>
        <div>
          <label className="text-primary font-bold ml-2">{label}</label>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}     
            value={field.value}       
          >
            <SelectTrigger className="w-full bg-primary rounded-full text-white">
              <SelectValue placeholder="Escolha uma opção" />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="text-red-500 text-xs ml-2">{error}</p>
      </div>
    );
  }
);
SelectInput.displayName = "SelectInput";

export { SelectInput };
