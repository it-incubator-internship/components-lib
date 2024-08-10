import { Meta, StoryObj } from '@storybook/react'
import Input from './searchInput'

const meta = {
  component: Input,
  title: 'Components/Input/SearchInput',
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Input search',
    state: 'default',
  },
}

export const Error: Story = {
  args: {
    type: 'text',
    placeholder: 'Input search',
    state: 'error',
    errorMsg: 'Error text',
  },
}

export const Disabled: Story = {
  args: {
    type: 'text',
    placeholder: 'Input search',
    state: 'disabled',
  },
}
