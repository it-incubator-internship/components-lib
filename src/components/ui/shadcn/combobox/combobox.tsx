import React, { useState } from 'react'
import { ComponentPropsWithoutRef } from 'react'

import * as Popover from '@radix-ui/react-popover'

type ComboboxProps = ComponentPropsWithoutRef<typeof Popover.Root> & {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text'
  asChild?: boolean
  options: string[]
}

export default function ComboBox({ options }: ComboboxProps) {
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)
  const [modal, setModal] = useState(false)

  return (
    <Popover.Root open={open} onOpenChange={setOpen} modal={modal}>
      <Popover.Trigger asChild>
        <input
          type="text"
          placeholder="Select an option..."
          value={inputValue}
          onChange={e => {
            setInputValue(e.target.value)
            setOpen(true)
          }}
          style={{
            width: '200px',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box',
            cursor: 'text',
          }}
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          onOpenAutoFocus={e => e.preventDefault()}
          side="bottom"
          align="start"
          style={{
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            width: '200px',
            maxHeight: '150px',
            overflowY: 'auto',
          }}
        >
          {options
            .filter(item => item.toLowerCase().includes(inputValue.toLowerCase()))
            .map(item => (
              <div
                key={item}
                onClick={() => {
                  setInputValue(item)
                  setOpen(false)
                }}
                style={{
                  padding: '8px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                {item}
              </div>
            ))}

          {options.filter(item => item.toLowerCase().includes(inputValue.toLowerCase())).length ===
            0 && <div style={{ padding: '8px', color: '#999' }}>No options found</div>}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
