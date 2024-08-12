import { Meta, StoryObj } from '@storybook/react'
import { RadioGroupUiKit } from './radioGroup'


const meta = {
	component: RadioGroupUiKit,
	title: 'Components/RadioGroupUiKit',
	tags: ['autodocs'],
 } satisfies Meta<typeof RadioGroupUiKit>
 
 export default meta
 
 type Story = StoryObj<typeof meta>
 
 export const RadioGroupUiKitDefault: Story = {
	args: {

	},
 }