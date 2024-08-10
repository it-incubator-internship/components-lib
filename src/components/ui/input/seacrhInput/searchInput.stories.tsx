import React, { useState, useRef } from 'react'
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

export const InteractiveExample: Story = {
  args: {
    type: 'text',
    placeholder: 'Input search',
    state: 'default',
  },
  render: args => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [inputValue, setInputValue] = useState('')

    const handleButtonClick = () => {
      if (inputRef.current) {
        setInputValue(inputRef.current.value)
        inputRef.current.value = ''
      }
    }

    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <Input ref={inputRef} {...args} />
        <button
          onClick={handleButtonClick}
          style={{ marginTop: '10px', border: '2px solid #397DF6', borderRadius: '2px' }}
        >
          Save Input
        </button>
        <p>Saved Value: {inputValue}</p>
      </div>
    )
  },
}
