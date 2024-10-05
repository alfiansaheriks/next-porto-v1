import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import DatePicker from "./date-picker";
import { Control, FieldValues, Path, useController } from "react-hook-form";

interface FormDateProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  description?: string;
  control: Control<T>;
}

const FormDate = <T extends FieldValues>({
  name,
  label,
  description,
  control,
}: FormDateProps<T>) => {
  const { field } = useController({
    name,
    control,
  });
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={() => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <DatePicker field={field} />
            </FormControl>
            <FormDescription>
              {/* {description} */}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormDate;
