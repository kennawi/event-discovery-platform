import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "./ui/field";
import DatePicker from "./DatePicker";

interface FormDateFieldProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  description?: string;
  className?: string;
  placeholder?: string;
}
export default function FormDateField<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  description,
  className,
  placeholder,
}: FormDateFieldProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
          <DatePicker
            value={field.value}
            onChange={(date) => field.onChange(date)}
            placeholder={placeholder}
            label=""
            className="w-full"
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
