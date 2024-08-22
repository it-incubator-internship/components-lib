import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { DatePicker, DatePickerProps } from '@/components/ui'

export type FormDatePickerProps<TFieldValues extends FieldValues> = Omit<
  DatePickerProps,
  'setStartDate' | 'startDate'
> &
  UseControllerProps<TFieldValues>
export const FormDatePicker = <TFieldValues extends FieldValues>({
  control,
  name,
  shouldUnregister,
  disabled,
  rules,
  defaultValue,
  ...rest
}: FormDatePickerProps<TFieldValues>) => {
  const {
    field: { onChange, value, ...restField },
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
    <DatePicker
      setStartDate={onChange}
      startDate={value}
      errorMessage={error?.message}
      {...restField}
      {...rest}
    />
  )
}
