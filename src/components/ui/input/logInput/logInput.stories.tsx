import React, { useState, useRef } from 'react'
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

export const InteractiveExample: Story = {
  args: {
    state: 'default',
  },
  render: args => {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    const handleButtonClick = () => {
      if (emailRef.current && passwordRef.current) {
        setEmailValue(emailRef.current.value)
        setPasswordValue(passwordRef.current.value)
        emailRef.current.value = ''
        passwordRef.current.value = ''
      }
    }

    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <Input emailRef={emailRef} passwordRef={passwordRef} {...args} />
        <button
          onClick={handleButtonClick}
          style={{ marginTop: '10px', border: '2px solid #397DF6', borderRadius: '2px' }}
        >
          Save Input
        </button>
        <p>Saved Email: {emailValue}</p>
        <p>Saved Password: {passwordValue}</p>
      </div>
    )
  },
}
