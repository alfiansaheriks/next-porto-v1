import React from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  description?: string;
  options: { value: string; label: string }[];
  control: Control<T>;
}

const FormSelect = <T extends FieldValues>({
  name,
  label,
  description,
  options,
  control,
}: FormSelectProps<T>) => {
  const { field } = useController({
    name,
    control,
  });

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={String(field.value)}>
              <SelectTrigger>
                <span>
                  {field.value
                    ? options.find((option) => option.value === field.value)
                        ?.label
                    : "Select an option"}
                </span>
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelect;