import { Meta, StoryObj } from '@storybook/react'
import { Modal } from './modal'
import React, { useState } from 'react'
import { Button } from './../button/button'

const meta = {
  component: Modal,
  title: 'Components/Modal',
  tags: ['autodocs'],
  args: {
    children: (<p>We have sent a link to confirm your email to epam@epam.com</p>),
    open: true,
  },
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Default button',
  render: args => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    function handleModalOpened() {
      setModalIsOpen(true)
    }

    function handleModalClosed() {
      setModalIsOpen(false)
    }

    return (
      <div>
        <Button variant={'secondary'} onClick={handleModalOpened}>Open modal</Button>
        <Modal {...args} title={'Email sent'} onClose={handleModalClosed} open={modalIsOpen}>
          {args.children}
        </Modal>
      </div>
    )
  },
}

export const FullWidthButton: Story = {
  name: 'Fullwidth button',
  render: args => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    function handleModalOpened() {
      setModalIsOpen(true)
    }

    function handleModalClosed() {
      setModalIsOpen(false)
    }

    return (
      <div>
        <Button variant={'secondary'} onClick={handleModalOpened}>Open modal</Button>
        <Modal {...args} title={'Email sent'} fullwidthButton onClose={handleModalClosed} open={modalIsOpen}>
          {args.children}
        </Modal>
      </div>
    )
  },
}

export const WithoutTitle: Story = {
  name: 'Without title and header',
  render: args => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    function handleModalOpened() {
      setModalIsOpen(true)
    }

    function handleModalClosed() {
      setModalIsOpen(false)
    }

    return (
      <div>
        <Button variant={'secondary'} onClick={handleModalOpened}>Open modal</Button>
        <Modal {...args} onClose={handleModalClosed} open={modalIsOpen}>
          {args.children}
        </Modal>
      </div>
    )
  },
}

export const AnotherButtonTitle: Story = {
  name: 'Another button title',
  render: args => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    function handleModalOpened() {
      setModalIsOpen(true)
    }

    function handleModalClosed() {
      setModalIsOpen(false)
    }

    return (
      <div>
        <Button variant={'secondary'} onClick={handleModalOpened}>Open modal</Button>
        <Modal {...args} title={'Email sent'} buttonTitle={'Confirm'} onClose={handleModalClosed} open={modalIsOpen}>
          {args.children}
        </Modal>
      </div>
    )
  },
}