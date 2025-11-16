import React from "react";
import { FieldDescription, FieldError, FieldLabel } from "./ui/field";
import { Control, Controller, FieldPath } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { Field } from "./ui/field";
import { Input } from "./ui/input";

interface FormTextFieldProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  description?: string;
  className?: string;
  type?: "text" | "email" | "tel" | "password";
  placeholder?: string;
  autoComplete?: string;
}

export default function FormTextField<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  description,
  type = "text",
  placeholder,
  autoComplete,
  className,
}: FormTextFieldProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
          <Input
            {...field}
            id={field.name}
            type={type}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete={autoComplete}
            defaultValue=""
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
