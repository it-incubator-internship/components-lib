import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { RadioGroup } from './radioGroup'

const meta = {
  component: RadioGroup,
  title: 'Components/RadioGroup',
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>
const userGradeOptions = [
  { label: 'Pre-junior', value: 'pre-junior' },
  { label: 'Junior', value: 'junior' },
  { label: 'Junior +', value: 'junior-plus' },
]
export const ControlledRadioGroup: Story = {
  args: {
    options: userGradeOptions,
  },
  render: args => {
    const [valueOption, onChangeOption] = useState(userGradeOptions[0]?.value)
    const handleOptionChange = (value: string) => {
      onChangeOption(value)
    }
    return (
      <div>
        <RadioGroup
          {...args}
          value={valueOption}
          onValueChange={handleOptionChange}
        />
        <span
          style={{ marginTop: '15px', display: 'inline-block' }}
        >{`Selected option: ${valueOption}`}</span>
      </div>
    )
  },
}

export const DefaultValueRadioGroup: Story = {
  args: {
    defaultValue: 'Junior',
    options: userGradeOptions,
  },
}
export const DisabledRadioGroup: Story = {
  args: {
    defaultValue: 'Junior',
    options: userGradeOptions,
    disabled: true,
  },
}