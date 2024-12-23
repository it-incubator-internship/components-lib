import ComboBox from './combobox'
import { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'

const meta = {
  component: ComboBox,
} satisfies Meta<typeof ComboBox>

export default meta

type Story = StoryObj<typeof meta>

export const Primary = {
  args: {
    options: ['Apple', 'Grapes', 'Pineapple', 'Grapefruit'],
  },
  render: args => {
    const { handleSubmit,
      register } = useForm()
    const onSubmit = handleSubmit(data => {
      console.log(' data: ', data)
    })
    return (
      <div className={`h-screen grid place-items-center `}>
        <div className={`text-center`}>
          <div className={`p-2`}>select element 1 and element 2</div>
          <form onSubmit={onSubmit} className={`flex flex-col text-center items-center`}>
            <ComboBox {...args} parentClassName={`mb-3.5`}/>
            {/*<label htmlFor="email">email</label>*/}
            {/*<input*/}
            {/*    id="email"*/}
            {/*    placeholder="Email"*/}
            {/*    className={`border-[2px] border-solid  border-orange-400 rounded`}*/}
            {/*    {...register(`email`)}*/}
            {/*/>*/}
            {/*{errors.email && (*/}
            {/*    <p className={`text-red-500 text-sm`}>{errors.email.message}</p>*/}
            {/*)}*/}
            <button>submit</button>
          </form>
        </div>
      </div>
    )
  },
} satisfies Story
