import React, { useState } from 'react'
import { ComponentPropsWithoutRef } from 'react'

import * as Popover from '@radix-ui/react-popover'
import {cn} from "@/components/ui/shadcn/combobox/cn";

type ComboboxProps = ComponentPropsWithoutRef<typeof Popover.Root> & {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text'
  asChild?: boolean
  options: string[]
}

export default function ComboBox({ options }: ComboboxProps) {
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <input
          type="text"
          placeholder="Select an option..."
          value={inputValue}
          onChange={e => {
            setInputValue(e.target.value)
            setOpen(true)
          }}
          className={cn('w-[200px] p-2 rounded cursor-text border-[1px] border-solid border-[#ccc]',
              )}
        />
      </Popover.Trigger>
      <Popover.Portal forceMount>
        <Popover.Content
            className={cn(
                open ? `opacity-100 transition-all duration-500 visible` : `opacity-0 transition-all duration-500 invisible`,

            )}
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
