import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { Input, InputProps } from '@/components/ui/input/input'

export type FormInputProps<TFieldValues extends FieldValues> = Omit<
  InputProps,
  'id' | 'name' | 'onChange' | 'value'
> &
  UseControllerProps<TFieldValues>

export const FormInput = <TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  shouldUnregister,
  disabled,
  defaultValue,
  ...inputProps
}: FormInputProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
    shouldUnregister,
    disabled,
    defaultValue,
  })
  return (
    <Input
      {...inputProps}
      {...field}
      errorMsg={error?.message}
      id={name}
      value={field.value ?? ''}
    />
  )
}
