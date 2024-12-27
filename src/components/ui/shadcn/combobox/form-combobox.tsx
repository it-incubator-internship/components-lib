import {} from 'react'
import { Control, useController, UseFormSetValue } from 'react-hook-form'
import { FormTypes } from '@/components/ui/shadcn/combobox/form-combobox.stories'
import { ComboBox } from '@/components/ui/shadcn/combobox/combobox'

export type LocalityType = 'country'
export type ComboboxFormFields = {
  options: string[]
  parentClassName?: string
  control: Control<FormTypes, any>
  name: LocalityType
  setValue: (value: string | null) => void
  handleListOpen: (value: boolean) => void
  clearErrors: (name: LocalityType) => void
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
