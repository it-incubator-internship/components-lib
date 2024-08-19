import type { Meta, StoryObj } from '@storybook/react'

import { useForm } from 'react-hook-form'

import { ControlledDatePicker } from './controlled-date-picker'
import { useState } from 'react'
import { Button } from '../../button/button'

const meta = {
  component: ControlledDatePicker,
  tags: ['autodocs'],
  title: 'Controlled/ControlledDatePicker',
} satisfies Meta<typeof ControlledDatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Pick date',
    name: 'date',
  },

  render: () => {
    type FormValues = {
      date: Date | null
    }
    const { control, handleSubmit } = useForm<FormValues>()
    const [startDate] = useState<Date | null>(new Date())

    const handleSubmitHandler = (data: FormValues) => {
      console.log(data)
    }

    return (
      <form onSubmit={handleSubmit(handleSubmitHandler)}>
        <ControlledDatePicker
          control={control}
          label={'Pick date'}
          name={'date'}
          rules={{ required: 'Date is required' }}
        />
        <Button>Submit</Button>
      </form>
    )
  },
}

export const WithRange: Story = {
  args: {
    label: 'Pick range date',
    name: 'dateRange',
  },

  render: () => {
    type FormValues = {
      dateRange: [Date, null]
    }
    const { control, handleSubmit } = useForm<FormValues>()
    const [startDate] = useState<Date | null>(new Date())
    const [endDate, setEndDate] = useState<Date | null>(
      startDate ? new Date(startDate.getTime() + 5 * 24 * 60 * 60 * 1000) : null
    )

    const handleSubmitHandler = (data: FormValues) => {
      console.log(data)
    }

    return (
      <form onSubmit={handleSubmit(handleSubmitHandler)}>
        <ControlledDatePicker
          label={'Pick range date'}
          control={control}
          name={'dateRange'}
          defaultValue={startDate}
          endDate={endDate}
          setEndDate={setEndDate}
          rules={{ required: 'Date is required' }}
        />
        <Button>Submit</Button>
      </form>
    )
  },
}
