import { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { FormRadioGroup } from './form-radio-group'
import { Button } from '../../button/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const meta = {
  component: FormRadioGroup,
  title: 'Controlled/FormRadioGroup',
} satisfies Meta<typeof FormRadioGroup>

export default meta

type Story = StoryObj<typeof meta>

const userGradeOptions = [
  { label: 'Pre-junior', value: 'pre-junior' },
  { label: 'Junior', value: 'junior' },
  { label: 'Junior +', value: 'junior-plus' },
]

const FormSchema = z.object({
  userGrade: z.string({ message: 'A variant must be selected' }),
})

export const ClearSelect: Story = {
  name: 'Without default value',
  args: {
    name: 'userGrade',
    options: userGradeOptions,
  },
  render: (args) => {
    const { control, handleSubmit } = useForm({ resolver: zodResolver(FormSchema) })
    const [data, setData] = useState<string>('')

    const submitForm = handleSubmit(data => {
      const option = userGradeOptions.find(option => option.label === data['userGrade'])
      setData(option ? option.value : '')
    })

    return (
      <>
        <h2 style={{ margin: '10px 180px' }}>Form</h2>
        <form onSubmit={submitForm} style={{ display: 'inline-flex', padding: '40px 80px', gap: '20px', border: '1px solid violet' }}>
          <FormRadioGroup {...args} control={control} />
          <Button variant={'outlined'}>Send selected</Button>
        </form>
        <h2 style={{ margin: '10px 10px' }}>{data && `Success! The value "${data}" has been sent.`}</h2>
      </>
    )
  },
}

export const PredSelect: Story = {
  name: 'With default value',
  args: {
    name: 'userGrade',
    options: userGradeOptions,
    defaultValue: 'Pre-junior',
  },
  render: (args) => {
    const { control, handleSubmit } = useForm({ resolver: zodResolver(FormSchema) })
    const [data, setData] = useState<string>('')

    const submitForm = handleSubmit(data => {
      const option = userGradeOptions.find(option => option.label === data['userGrade'])
      setData(option ? option.value : '')
    })

    return (
      <>
        <h2 style={{ margin: '10px 180px' }}>Form</h2>
        <form onSubmit={submitForm} style={{ display: 'inline-flex', padding: '40px 80px', gap: '20px', border: '1px solid violet' }}>
          <FormRadioGroup {...args} control={control} />
          <Button variant={'outlined'}>Send selected</Button>
        </form>
        <h2 style={{ margin: '10px 10px' }}>{data && `Success! The value "${data}" has been sent.`}</h2>
      </>
    )
  },
}