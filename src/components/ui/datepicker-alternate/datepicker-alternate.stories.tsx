import type { Meta, StoryObj } from '@storybook/react'

import { DatepickerAlternate } from './datepicker-alternate'

const meta = {
  title: 'Components/DataPickerAlternate',
  component: DatepickerAlternate,
} satisfies Meta<typeof DatepickerAlternate>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {
  args: {},
  render: (args) => {
    return <DatepickerAlternate {...args} />
  },
}

export const Range: Story = {
  args: { isRange: true },
  render: (args) => {
    return <DatepickerAlternate {...args} />
  },
}

export const Multiply: Story = {
  args: { isMultiple: true },
  render: (args) => {
    return <DatepickerAlternate {...args} />
  },
}

export const WithError: Story = {
  args: { placeholder: 'Please pick the date', errorMessage: 'You should to pick any date' },
  render: (args) => {
    return <DatepickerAlternate {...args} />
  },
}

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => {
    return <DatepickerAlternate {...args} />
  },
}



