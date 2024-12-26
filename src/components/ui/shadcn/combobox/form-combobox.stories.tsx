import { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from './cn'
import { useState } from 'react'
import { FormCombobox } from './form-combobox'

const meta = {
  component: FormCombobox,
} satisfies Meta<typeof FormCombobox>

export default meta

type Story = StoryObj<typeof meta>

const FormSchema = z.object({
  country: z.string({ message: 'This field is required' }),
  city: z.string({ message: 'This field is required' }),
})

export type FormTypes = z.infer<typeof FormSchema>

export const Primary = {
  // @ts-ignore
  args: {
    options: ['Apricot', 'Apple', 'Grapes', 'Pineapple', 'Grapefruit'],
  },
  render: args => {
    const { setValue, handleSubmit, control } = useForm<FormTypes>({
      resolver: zodResolver(FormSchema),
    })

    const onSubmit = handleSubmit(data => {
      console.log('submit data: ', data)
    })
    const { options } = args
    return (
      <div className={`h-screen grid place-items-center `}>
        <div className={`text-center`}>
          <div className={`p-2`}>select element 1 and element 2</div>
          <form
            onSubmit={onSubmit}
            className={`flex flex-col text-center items-center`}
          >
            <FormCombobox
              options={options}
              parentClassName={`mb-3.5`}
              control={control}
              name={'country'}
              setValue={setValue}
            />
            <button
              className={cn(
                `cursor-pointer z-[1] p-1.5 rounded border-solid border-2`
              )}
            >
              submit
            </button>
          </form>
        </div>
      </div>
    )
  },
} satisfies Story