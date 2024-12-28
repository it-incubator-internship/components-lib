import { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from './cn'
import { useState } from 'react'
import { LocalityType, FormCombobox } from './form-combobox'

const meta = {
  component: FormCombobox,
} satisfies Meta<typeof FormCombobox>

export default meta

type Story = StoryObj<typeof meta>
const options = ['Apricot', 'Apple', 'Grapes', 'Pineapple', 'Grapefruit']
const FormSchema = z.object({
  country: z
    .string()
    .nullable()
    .refine(val => val !== null, 'This field is required')
    .refine(val => options.includes(val as string) || val === '', {
      message: 'This value must be one of the available options',
    }),
})

export type FormTypes = z.infer<typeof FormSchema>

export const Primary = {
  // @ts-ignore
  args: {
    options: ['Apricot', 'Apple', 'Grapes', 'Pineapple', 'Grapefruit'],
  },
  render: args => {
    const [listOpen, setListOpen] = useState<boolean>(false)
    const { setValue, handleSubmit, clearErrors, control } = useForm<FormTypes>(
      {
        resolver: zodResolver(FormSchema),
      }
    )

    const onSubmit = handleSubmit(data => {
      console.log('submit data: ', data)
    })

    const handleListOpen = (isOpen: boolean) => {
      setListOpen(isOpen)
    }

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
              name={'country'}
              control={control}
              setValue={value => setValue('country', value)}
              // clearErrors={value => clearErrors(value as LocalityType)}
              handleListOpen={handleListOpen}
            />
            <button
              tabIndex={2 }
              className={cn(
                `cursor-pointer z-[1] p-1.5 rounded border-solid border-2 focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-50 `,
                !listOpen ? `z-[1]` : `z-[0]`
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
