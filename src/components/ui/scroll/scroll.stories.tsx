import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Scroll } from './scroll'

const meta = {
  component: Scroll,
  title: 'Components/Scroll',
  tags: ['autodocs'],
} satisfies Meta<typeof Scroll>

export default meta

type Story = StoryObj<typeof meta>

export const HorizontalScrollbar: Story = {
  args: {
    children: (
      <div style={{ maxWidth: '150px' }}>
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <p style={{ width: '350px' }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, autem, beatae
            debitis, earum maiores nam omnis perspiciatis quas quasi ratione tenetur voluptas
            voluptatem! Blanditiis ducimus, excepturi iste iure quos veritatis. Lorem ipsum dolor
            sit amet, consectetur adipisicing elit. Adipisci, autem, beatae debitis, earum maiores
            nam omnis perspiciatis quas quasi ratione tenetur voluptas voluptatem! Blanditiis
            ducimus, excepturi iste iure quos veritatis. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Adipisci, autem, beatae debitis, earum maiores nam omnis perspiciatis
            quas quasi ratione tenetur voluptas voluptatem! Blanditiis ducimus, excepturi iste iure
            quos veritatis.
          </p>
        </div>
      </div>
    ),
  },
}

export const VerticalScrollbar: Story = {
  args: {
    children: (
      <div style={{ maxWidth: '150px' }}>
        <p style={{ width: '100%', overflowX: 'auto', height: '200px' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, autem, beatae debitis,
          earum maiores nam omnis perspiciatis quas quasi ratione tenetur voluptas voluptatem!
          Blanditiis ducimus, excepturi iste iure quos veritatis. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Adipisci, autem, beatae debitis, earum maiores nam omnis
          perspiciatis quas quasi ratione tenetur voluptas voluptatem! Blanditiis ducimus, excepturi
          iste iure quos veritatis. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Adipisci, autem, beatae debitis, earum maiores nam omnis perspiciatis quas quasi ratione
          tenetur voluptas voluptatem! Blanditiis ducimus, excepturi iste iure quos veritatis.
        </p>
      </div>
    ),
  },
}
