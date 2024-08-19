import { Meta, StoryObj } from '@storybook/react'
import { Modal } from './modal'
import React, { useState } from 'react'
import { Button } from './../button/button'

const meta = {
  component: Modal,
  title: 'Components/Modal',
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'With default button',
  args: {
    title: 'Email sent',
    children: (<p>We have sent a link to confirm your email to epam@epam.com</p>),
    open: true,
  },
  render: args => {
    const [open, setOpen] = useState(true)

    function handleModalOpened() {
      setOpen(true)
    }

    function handleModalClosed() {
      setOpen(false)
    }

    return (
      <div>
        <Button variant={'secondary'} onClick={handleModalOpened}>Open modal</Button>
        <Modal {...args} onClose={handleModalClosed} open={open}>
          {args.children}
        </Modal>
      </div>
    )
  },
}

export const FullWidthButton: Story = {
  name: 'With fullwidth button',
  args: {
    title: 'Email sent',
    children: (<p>We have sent a link to confirm your email to epam@epam.com</p>),
    open: true,
    fullwidthButton: true,
  },
  render: args => {
    const [open, setOpen] = useState(true)

    function handleModalOpened() {
      setOpen(true)
    }

    function handleModalClosed() {
      setOpen(false)
    }

    return (
      <div>
        <Button variant={'secondary'} onClick={handleModalOpened}>Open modal</Button>
        <Modal {...args} onClose={handleModalClosed} open={open} fullwidthButton>
          {args.children}
        </Modal>
      </div>
    )
  },
}