import React from 'react'

import { Control, FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { RadioGroup, RadioGroupProps } from '@/components/ui'

export type FormCheckbox<T extends FieldValues> = Omit<UseControllerProps<T>, 'control' | 'rules' | 'defaultValue'>
  & Omit<RadioGroupProps, 'value' | 'onValueChange' | 'onBlur' | 'onChange'>
  & { control: Control<T> }

export const FormRadioGroup = <T extends FieldValues>({
  control,
  name,
  shouldUnregister,
  disabled,
  ...rest
}: FormCheckbox<T>) => {
  const { field: { value, onChange, ...otherFields } } = useController({ control, name, shouldUnregister, disabled })
  return (
    <RadioGroup currentValue={value} callback={onChange} {...otherFields} {...rest} />
  )
}
