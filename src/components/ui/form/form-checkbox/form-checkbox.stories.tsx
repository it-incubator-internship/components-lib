import { Meta, StoryObj } from '@storybook/react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui'
import { FormCheckbox } from './form-checkbox'

const meta = {
  component: FormCheckbox,
  tags: ['autodocs'],
  title: 'Form/FormCheckbox',
} satisfies Meta<typeof FormCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    labelText: 'Agree to terms',
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
        <FormCheckbox control={control} labelText={'Agree to terms'} name={'terms_agreement'} />
        <Button>Submit</Button>
      </form>
    )
  },
}
