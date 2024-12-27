import {} from 'react'
import { Control, useController, UseFormSetValue } from 'react-hook-form'
import { FormTypes } from '@/components/ui/shadcn/combobox/form-combobox.stories'
import { ComboBox } from '@/components/ui/shadcn/combobox/combobox'

export type ComboboxFormFields = {
  options: string[]
  parentClassName?: string
  control: Control<FormTypes, any>
  name: 'country'
  setValue: UseFormSetValue<{ country: string }>
  handleListOpen: (value: boolean) => void
}

export const FormCombobox = ({
  control,
  name,
  options,
  parentClassName,
  setValue,
  handleListOpen,
}: ComboboxFormFields) => {
  const {
    field: { ref, name: fieldName, onChange, value },
    fieldState: { error },
  } = useController({
    control,
    name,
  })
  console.log(' value: ', value)
  return (
    <ComboBox
      options={options}
      parentClassName={parentClassName}
      name={fieldName}
      errorMsg={error?.message as string}
      ref={ref}
      value={value}
      onChange={onChange}
      setValue={setValue}
      handleListOpen={handleListOpen}
    />
  )
}
