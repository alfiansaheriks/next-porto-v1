// FormInput.tsx
import React from 'react';
import { Control, FieldValues, useController, Path } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface FormInputProps<T extends FieldValues> {
  name: Path<T>; // Ensuring name is a valid path of T
  label: string;
  placeholder: string;
  description?: string;
  value?: string;
  control: Control<T>;
}

const FormInput = <T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  control,
  value,
}: FormInputProps<T>) => {
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
            <Input placeholder={placeholder} {...field} value={value ?? field.value}  />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;