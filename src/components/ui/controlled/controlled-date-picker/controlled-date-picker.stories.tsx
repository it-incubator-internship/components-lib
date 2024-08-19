import type { Meta, StoryObj } from '@storybook/react'

import { useForm } from 'react-hook-form'

import { ControlledDatePicker } from './controlled-date-picker'
import { useState } from 'react'

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
    const { control } = useForm<FormValues>()
    const [startDate] = useState<Date | null>(new Date())

    return (
      <ControlledDatePicker
        control={control}
        label={'Pick date'}
        name={'date'}
        defaultValue={startDate}
      />
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
    const { control } = useForm<FormValues>()
    const [startDate] = useState<Date | null>(new Date())
    const [endDate, setEndDate] = useState<Date | null>(
      startDate ? new Date(startDate.getTime() + 5 * 24 * 60 * 60 * 1000) : null
    )

    return (
      <ControlledDatePicker
        label={'Pick range date'}
        control={control}
        name={'dateRange'}
        defaultValue={startDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
    )
  },
}
