import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { Checkbox, CheckboxProps } from '@/components/ui'

export type FormCheckboxProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<CheckboxProps, 'checked' | 'onCheckedChange'>

export const FormCheckbox = <T extends FieldValues>({
  control,
  name,
  rules,
  shouldUnregister,
  defaultValue,
  disabled,
  ...restCheckboxProps
}: FormCheckboxProps<T>) => {
  const {
    field: { value, onChange, ...restField },
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
    <Checkbox
      checked={value}
      onCheckedChange={onChange}
      errorMsg={error?.message}
      {...restCheckboxProps}
      {...restField}
    />
  )
}
