import {} from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Control, useController } from 'react-hook-form'
import { FormTypes } from '@/components/ui/shadcn/combobox/form-combobox.stories'
import { ComboBox } from '@/components/ui/shadcn/combobox/combobox'

export type ComboboxFormFields = {
  options: string[]
  parentClassName?: string
  control: Control<FormTypes, any>
  name: 'country' | 'city'
}

export const FormCombobox = ({
  control,
  name,
  options,
  parentClassName,
}: ComboboxFormFields) => {
  const {} = useController({
    control,
    name,
  })

  return (
    <ComboBox
      options={options}
      control={control}
      name={name}
      parentClassName={parentClassName}
    />
  )
}
