import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { RadioGroupUiKit } from './radioGroup'
import { useState } from 'react'

const meta = {
  component: RadioGroupUiKit,
  title: 'Components/RadioGroupUiKit',
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroupUiKit>

export default meta

type Story = StoryObj<typeof meta>
const itemsForstories = [
	{ id: '1', titleRadioItem: 'Pre-junior' },
	{ id: '2', titleRadioItem: 'Junior' },
	{ id: '3', titleRadioItem: 'Junior +' },
 ]
export const ControlledRadioGroupUiKit: Story = {
  args: {},
  render: (args) => {
    const items = itemsForstories
    const [valueOption, onChangeOption] = useState(items[0].titleRadioItem)
    const handleOptionChange = (value: string) => {
      onChangeOption(value)
    }
    return (
		<div>
			<RadioGroupUiKit
			{...args}
			currentValue={valueOption}
			callback={handleOptionChange}
			itemsRadioGroup={items}
			/>
			<span style={{marginTop: '15px', display: 'inline-block'}}>{`Selected option: ${valueOption}`}</span>
		</div>
    
    )
  },
}

export const DefaultValueRadioGroupUiKit: Story = {
	args:{
		defaultValue: 'Junior',
		itemsRadioGroup: itemsForstories,
	},
}
export const DisabledRadioGroupUiKit: Story = {
	args:{
		defaultValue: 'Junior',
		itemsRadioGroup: itemsForstories,
		disabled: true,
	},
}
