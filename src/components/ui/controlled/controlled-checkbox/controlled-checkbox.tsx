import { Control, FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { Checkbox, CheckboxProps } from '@/components/ui'

export type ControlledCheckboxProps<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'control'
> &
  Omit<CheckboxProps, 'checked' | 'onCheckedChange'> & {
    control: Control<T>
  }

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  name,
  rules,
  shouldUnregister,
  defaultValue,
  disabled,
  ...restCheckboxProps
}: ControlledCheckboxProps<T>) => {
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
