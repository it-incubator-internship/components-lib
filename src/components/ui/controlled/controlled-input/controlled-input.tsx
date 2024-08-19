import { FieldValues, UseControllerProps, useController, Control } from 'react-hook-form'
import Input, { InputProps } from '@/components/ui/input/input'

export type ControlledInputProps<TFieldValues extends FieldValues> = Omit<
  InputProps,
  'id' | 'name' | 'onChange' | 'value'
> &
  Omit<UseControllerProps<TFieldValues>, 'control'> & {
    control: Control<TFieldValues>
  }

export const ControlledInput = <TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  shouldUnregister,
  ...inputProps
}: ControlledInputProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
    shouldUnregister,
  })
  return <Input {...inputProps} {...field} errorMsg={error?.message} id={name} />
}
