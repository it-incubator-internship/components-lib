import { ComboBox } from './combobox'
import { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from './cn'
import { useState } from 'react'

const meta = {
  component: ComboBox,
} satisfies Meta<typeof ComboBox>

export default meta

type Story = StoryObj<typeof meta>

const FormSchema = z.object({
  country: z.string({ message: 'This field is required' }).min(3, { message: 'min 3' }),
  city: z.string({ message: 'This field is required' }),
})

export type FormTypes = z.infer<typeof FormSchema>

export const Primary = {
  // @ts-ignore
  args: {
    options: ['Apricot', 'Apple', 'Grapes', 'Pineapple', 'Grapefruit'],
  },
  render: args => {
    const [btnclicked, setBtnclicked] = useState(false)
    const {
      handleSubmit,

      setValue,
      register,
      formState: { errors },
    } = useForm<FormTypes>({
      resolver: zodResolver(FormSchema),
      defaultValues: {},
    })
    const onSubmit = handleSubmit(data => {
      console.log('submit data: ', data)
    })
    const { options } = args
    return (
      <div className={`h-screen grid place-items-center `}>
        <div className={`text-center`}>
          <div className={`p-2`}>select element 1 and element 2</div>
          <form onSubmit={onSubmit} className={`flex flex-col text-center items-center`}>
            <ComboBox
              {...register('country')}
              errorMsg={errors.country?.message as string}
              options={options}
              parentClassName={`mb-3.5`}
            />
            <button
              onClick={() => setBtnclicked(true)}
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
