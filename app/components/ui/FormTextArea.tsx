import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

interface FormTextAreaProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder: string;
  description?: string;
  control: Control<T>;
}

const FormTextArea = <T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  control,
}: FormTextAreaProps<T>) => {
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
              <Textarea placeholder={placeholder} {...field} />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormTextArea;
