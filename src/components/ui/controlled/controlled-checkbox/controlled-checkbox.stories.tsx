import { ControlledCheckbox } from './controlled-checkbox'
import { Meta, StoryObj } from '@storybook/react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../button/button'

const meta = {
  component: ControlledCheckbox,
  tags: ['autodocs'],
  title: 'Controlled/ControlledCheckbox',
} satisfies Meta<typeof ControlledCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Agree to terms',
    name: 'terms_agreement',
  },
  render: () => {
    const FormSchema = z.object({
      terms_agreement: z.literal(true, {
        errorMap: () => ({ message: 'Please, mark the checkbox, if you agree to our terms' }),
      }),
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
        <ControlledCheckbox
          control={control}
          labelText={'Agree to terms'}
          name={'terms_agreement'}
        />
        <Button>Submit</Button>
      </form>
    )
  },
}
