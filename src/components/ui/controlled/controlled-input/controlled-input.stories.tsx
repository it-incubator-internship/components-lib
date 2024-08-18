import type { Meta, StoryObj } from '@storybook/react'

import { useForm } from 'react-hook-form'

import { ControlledInput } from './controlled-input'

const meta = {
  component: ControlledInput,
  tags: ['autodocs'],
  title: 'Controlled/ControlledInput',
} satisfies Meta<typeof ControlledInput>

export default meta
type Story = StoryObj<typeof meta>

const InputWithForm = () => {
  type FormValues = {
    email: string
  }
  const { control } = useForm<FormValues>()

  return <ControlledInput control={control} label={'Email'} name={'email'} />
}

export const Default: Story = {
  args: {
    label: 'Email',
    name: 'email',
  },
  render: () => <InputWithForm />,
}
