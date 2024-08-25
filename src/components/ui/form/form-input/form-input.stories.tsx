import type { Meta, StoryObj } from '@storybook/react'

import { useForm } from 'react-hook-form'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormInput } from './form-input'
import { Button } from '../../button/button'

const meta = {
  component: FormInput,
  tags: ['autodocs'],
  title: 'Form/FormInput',
} satisfies Meta<typeof FormInput>

export default meta
type Story = StoryObj<typeof meta>

export const Email: Story = {
  args: {
    label: 'Email',
    name: 'email',
  },
  render: () => {
    const FormSchema = z.object({
      email: z.string({ message: 'This field is required' }).email({ message: 'Not valid email' }),
    })
    type FormValues = z.infer<typeof FormSchema>

    const { control, handleSubmit } = useForm<FormValues>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        email: '',
      },
    })

    const handleSubmitHandler = (data: FormValues) => {
      console.log(data)
    }

    return (
      <form onSubmit={handleSubmit(handleSubmitHandler)}>
        <FormInput control={control} label={'Email'} name={'email'} />
        <Button>Submit</Button>
      </form>
    )
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    name: 'password',
  },
  render: () => {
    const FormSchema = z.object({
      password: z.string({ message: 'This field is required' }).min(4, 'Password too short'),
    })
    type FormValues = z.infer<typeof FormSchema>

    const { control, handleSubmit } = useForm<FormValues>({
      resolver: zodResolver(FormSchema),
    })

    const handleSubmitHandler = (data: FormValues) => {
      console.log(data)
    }

    return (
      <form onSubmit={handleSubmit(handleSubmitHandler)}>
        <FormInput control={control} label={'Password'} name={'password'} type={'password'} />
        <Button>Submit</Button>
      </form>
    )
  },
}
