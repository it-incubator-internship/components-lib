import { Meta, StoryObj } from '@storybook/react'
import { Cards } from './cards'

const meta = {
  component: Cards,
  title: 'Components/Cards',
} satisfies Meta<typeof Cards>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Cards',
  },
}
