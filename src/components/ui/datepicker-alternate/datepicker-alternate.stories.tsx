import type { Meta, StoryObj } from '@storybook/react'

import { DatepickerAlternate } from './datepicker-alternate'
import { useState } from 'react'
import { addDays } from 'date-fns'


const meta = {
  title: 'Components/DataPickerAlternate',
  component: DatepickerAlternate,
} satisfies Meta<typeof DatepickerAlternate>

export default meta
type Story = StoryObj<typeof meta>


export const Single: Story = {
  args: {
    startDate: undefined,
    setStartDate: () => {
    },
  },
  render: () => {
    const [startDate, setStartDate] = useState<Date | undefined>(new Date())
    return <DatepickerAlternate startDate={startDate} setStartDate={setStartDate} />
  },
}

export const Range: Story = {
  args: {
    isRange: true,
    startDate: undefined,
    endDate: undefined,
    setStartDate: () => {
    },
    setEndDate: () => {
    },
  },
  render: () => {
    const [startDate, setStartDate] = useState<Date | undefined>(new Date())
    const [endDate, setEndDate] = useState<Date | undefined>(startDate ? addDays(startDate, 5) : undefined)
    return <DatepickerAlternate isRange={true} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
  },
}

export const Multiply: Story = {
  args: {
    isMultiple: true,
    startDate: undefined,
    setStartDate: () => {
    },
    selectedDates: [new Date()],
    setSelectedDate: () => {
    },
  },
  render: () => {
    const [startDate, setStartDate] = useState<Date | undefined>(new Date())
    const [selectedDates, setSelectedDate] = useState<Date[]>([new Date()])
    return <DatepickerAlternate isMultiple={true} startDate={startDate} setStartDate={setStartDate} selectedDates={selectedDates} setSelectedDate={setSelectedDate} />
  },
}


export const WithError: Story = {
  args: {
    startDate: undefined,
    setStartDate: () => {
    },
  },
  render: () => {
    const [startDate, setStartDate] = useState<Date | undefined>(undefined)
    return <DatepickerAlternate startDate={startDate} setStartDate={setStartDate} placeholder={'Please, pick the date'} errorMessage={'You should to pick any date'} />
  },
}

export const Disabled: Story = {
  args: {
    startDate: undefined,
    setStartDate: () => {
    },
  },
  render: () => {
    const [startDate, setStartDate] = useState<Date | undefined>(new Date())
    return <DatepickerAlternate startDate={startDate} setStartDate={setStartDate} disabled={true} />
  },
}




