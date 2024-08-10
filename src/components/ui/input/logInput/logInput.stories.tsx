import { Meta, StoryObj } from '@storybook/react'
import Input from './logInput'

const meta = {
  component: Input,
  title: 'Components/Input/LogInput',
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    state: 'default',
  },
}

export const Error: Story = {
  args: {
    state: 'error',
    errorMsg: 'Error text',
  },
}

export const Disabled: Story = {
  args: {
    state: 'disabled',
  },
}
