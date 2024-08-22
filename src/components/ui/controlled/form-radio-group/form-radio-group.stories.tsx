import { Button, FormRadioGroup } from '@/components/ui'
import { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

const meta = {
  component: FormRadioGroup,
  title: 'Controlled/FormRadioGroup',
} satisfies Meta<typeof FormRadioGroup>

export default meta

type Story = StoryObj<typeof meta>

const userGradeOptions = [
  { value: '1', label: 'Pre-junior' },
  { value: '2', label: 'Junior' },
  { value: '3', label: 'Junior +' },
]

export const Base: Story = {
  args: {
    name: 'userGrade',
    options: userGradeOptions,
  },
  render: (args) => {
    const { control, handleSubmit } = useForm()
    const [data, setData] = useState<string>('')

    const submitForm = handleSubmit(data => {
      console.log(data)
      setData(data['userGrade'])
    })

    return (
      <>
        <h2 style={{ margin: '10px 180px' }}>Form</h2>
        <form onSubmit={submitForm} style={{ display: 'inline-flex', padding: '40px 80px', gap: '20px', border: '1px solid violet' }}>
          <FormRadioGroup {...args} name={'userGrade'} options={userGradeOptions} control={control} />
          <Button variant={'outlined'}>Send selected</Button>
        </form>
        <h2 style={{ margin: '10px 10px' }}>{data && `Sent value: ${data}`}</h2>
      </>
    )
  },
}