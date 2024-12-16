import ComboBox from './combobox'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: ComboBox,
} satisfies Meta<typeof ComboBox>

export default meta

type Story = StoryObj<typeof meta>

export const Primary = {
  args: {
    options: ['Apple', 'Grapes', 'Pineapple', 'Grapefruit'],
  },
  render: (args) => {
    return (
      <>
        <ComboBox {...args} />
        <h1>hello</h1>
      </>
    )
  },
} satisfies Story
