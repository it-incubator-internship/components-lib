import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormTextarea } from './form-textarea' // Импортируем компонент FormTextarea
import { Button } from '../../button/button'
import React from 'react'

const FakeForm = () => {
  // Определяем схему валидации с помощью zod
  const FormSchema = z.object({
    aboutMe: z.string().max(200, 'Maximum 200 characters allowed').optional(), // Поле необязательное
  })
  type FormValues = z.infer<typeof FormSchema>

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(FormSchema), // Привязываем схему валидации
    defaultValues: {
      aboutMe: '', // Значение по умолчанию
    },
  })

  const handleSubmitHandler = (data: FormValues) => {
    console.log(data) // Отправляем данные формы
  }

  return (
    <>
      <h2 style={{ margin: '10px 180px' }}>Form with Textarea</h2>
      <form onSubmit={handleSubmit(handleSubmitHandler)}>
        {/* Используем компонент FormTextarea */}
        <FormTextarea
          control={control}
          name="aboutMe"
          titleLabel="About Me"
          placeholder="Enter something about yourself"
        />
        <Button>Submit</Button> {/* Кнопка отправки формы */}
      </form>
    </>
  )
}

// Настраиваем метаинформацию для Storybook
const meta = {
  component: FakeForm,
  tags: ['autodocs'],
  title: 'Form/FormTextarea', // Устанавливаем заголовок для истории
} satisfies Meta<typeof FakeForm>

export default meta
type Story = StoryObj<typeof meta>

// История для Storybook
export const Form: Story = {
  args: {},
}
