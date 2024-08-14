import React, { useState, useRef } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import Input from './input'

const meta = {
  component: Input,
  title: 'Components/Input',
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Search: Story = {
  args: {
    type: 'search',
    state: 'default',
    placeholder: 'Input search',
  },
}

export const SearchError: Story = {
  args: {
    type: 'search',
    state: 'error',
    placeholder: 'Input search',
    errorMsg: 'Error text',
  },
}

export const SearchDisabled: Story = {
  args: {
    type: 'search',
    state: 'disabled',
    placeholder: 'Input search',
  },
}

export const ControlSearchInput: Story = {
  args: {
    type: 'search',
    state: 'default',
    placeholder: 'Input search',
  },
  render: args => {
    const [inputValue, setInputValue] = useState('')
    const refValue = useRef<HTMLInputElement>(null)

    const handleSaveMessage = () => {
      if (refValue.current) {
        setInputValue(refValue.current.value)
        refValue.current.value = ''
      }
    }

    return (
      <div>
        <Input {...args} ref={refValue} />
        <button
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
          }}
          onClick={handleSaveMessage}
        >
          Save message
        </button>
        <p>Input Value: {inputValue}</p>
      </div>
    )
  },
}

export const Email: Story = {
  args: {
    type: 'email',
    state: 'default',
    placeholder: 'Email',
    label: 'Email',
  },
}

export const EmailError: Story = {
  args: {
    type: 'email',
    state: 'error',
    placeholder: 'Email',
    label: 'Email',
    errorMsg: 'Error text',
  },
}

export const EmailDisabled: Story = {
  args: {
    type: 'email',
    state: 'disabled',
    placeholder: 'Email',
    label: 'Email',
  },
}

export const ControlEmailInput: Story = {
  args: {
    type: 'email',
    state: 'default',
    placeholder: 'Email',
    label: 'Email',
  },
  render: args => {
    const [inputValue, setInputValue] = useState('')
    const refValue = useRef<HTMLInputElement>(null)

    const handleSaveMessage = () => {
      if (refValue.current) {
        setInputValue(refValue.current.value)
        refValue.current.value = ''
      }
    }

    return (
      <div>
        <Input {...args} ref={refValue} />
        <button
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
          }}
          onClick={handleSaveMessage}
        >
          Save message
        </button>
        <p>Input Value: {inputValue}</p>
      </div>
    )
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    state: 'default',
    placeholder: 'Password',
    label: 'Password',
  },
}

export const PasswordError: Story = {
  args: {
    type: 'password',
    state: 'error',
    placeholder: 'Password',
    label: 'Password',
    errorMsg: 'Error text',
  },
}

export const PasswordDisabled: Story = {
  args: {
    type: 'password',
    state: 'disabled',
    placeholder: 'Password',
    label: 'Password',
  },
}

export const ControlPasswordInput: Story = {
  args: {
    type: 'password',
    state: 'default',
    placeholder: 'Password',
    label: 'Password',
  },
  render: args => {
    const [inputValue, setInputValue] = useState('')
    const refValue = useRef<HTMLInputElement>(null)

    const handleSaveMessage = () => {
      if (refValue.current) {
        setInputValue(refValue.current.value)
        refValue.current.value = ''
      }
    }

    return (
      <div>
        <Input {...args} ref={refValue} type={'password'} />
        <button
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
          }}
          onClick={handleSaveMessage}
        >
          Save message
        </button>
        <p>Input Value: {inputValue}</p>
      </div>
    )
  },
}
