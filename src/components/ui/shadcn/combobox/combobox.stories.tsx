import ComboBox from './combobox'
import { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/components/ui/shadcn/combobox/cn'

const meta = {
  component: ComboBox,
} satisfies Meta<typeof ComboBox>

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
    const { handleSubmit, register } = useForm<FormTypes>({
      resolver: zodResolver(FormSchema),
      defaultValues: {},
    })
    const onSubmit = handleSubmit(data => {
      console.log(' data: ', data)
    })
    console.log(' register: ', register('country'))
    const { onChange, ref, name } = register('country')
    const { options } = args
    const argsToPass = { onChange, ref, name, options }
    return (
      <div className={`h-screen grid place-items-center `}>
        <div className={`text-center`}>
          <div className={`p-2`}>select element 1 and element 2</div>
          <form onSubmit={onSubmit} className={`flex flex-col text-center items-center`}>
            <ComboBox {...argsToPass} parentClassName={`mb-3.5`} />
            <button className={cn(`cursor-pointer z-[1] p-1.5 rounded border-solid border-2`)}>submitt</button>
          </form>
        </div>
      </div>
    )
  },
} satisfies Story
