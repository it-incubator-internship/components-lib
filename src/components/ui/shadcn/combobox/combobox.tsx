import React, { useState, KeyboardEvent, useEffect } from 'react'
import { ComponentPropsWithoutRef } from 'react'

import * as Popover from '@radix-ui/react-popover'
import { cn } from '@/components/ui/shadcn/combobox/cn'

type ComboboxProps = ComponentPropsWithoutRef<typeof Popover.Root> & {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text'
  asChild?: boolean
  options: string[]
}

export default function ComboBox({ options }: ComboboxProps) {
  const [inputValue, setInputValue] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  const [selectedIndex, setSelectedIndex] = useState<number>(-1)
  const [currentOptions, setCurrentOptions] = useState<string[]>(options)

  useEffect(() => {
    if (selectedIndex >= 0) {
      const selectedOption = currentOptions[selectedIndex]
      if (selectedOption) {
        setInputValue(selectedOption)
      }
    } else {
      setInputValue('')
      setOpen(false)
    }
  }, [selectedIndex])

  useEffect(() => {
    if (!inputValue) {
      setCurrentOptions(options)
      setSelectedIndex(-1)
    }
  }, [inputValue])

  const filterOptions = () => {
    setCurrentOptions(options.filter(item => item.toLowerCase().includes(inputValue.toLowerCase())))
    if (!inputValue) {
      setSelectedIndex(-1)
    }
  }

  console.log(' selectedIndex: ', selectedIndex)
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()

      if (!open) {
        setOpen(true)
      }

      setSelectedIndex(prevIndex => {
        if (prevIndex + 1 === currentOptions.length) {
          return 0
        }
        return prevIndex + 1
      })
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prevIndex => {
        return Math.max(-1, prevIndex - 1)
      })
    }

    if (e.key === 'Enter' && selectedIndex >= -1) {
      e.preventDefault()
      const selectedOption = currentOptions[selectedIndex]
      if (selectedOption) {
        setInputValue(selectedOption)
      }
      setOpen(prevValue => !prevValue)
    }
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <input
          type="text"
          placeholder="Select an option..."
          value={inputValue}
          onChange={e => {
            setInputValue(e.currentTarget.value)
            setOpen(true)
            filterOptions()
          }}
          onKeyDown={handleKeyDown}
          className={cn(
            'w-[200px] p-2 rounded cursor-text border-[1px] border-solid border-[#ccc]'
          )}
        />
      </Popover.Trigger>
      <Popover.Portal forceMount>
        <Popover.Content
          className={cn(
            open
              ? `opacity-100 transition-all duration-500 visible`
              : `opacity-0 transition-all duration-500 invisible`,
            'bg-white border-[1px] border-solid border-[#ccc] rounded w-[200px] max-h-[150px] overflow-y-auto'
          )}
          onOpenAutoFocus={e => e.preventDefault()}
        >
          {currentOptions?.length > 0 ? (
            currentOptions.map((item, index) => (
              <div
                key={item}
                onSelect={() => {
                  setInputValue(item)
                  setOpen(false)
                }}
                onClick={() => {
                  setInputValue(item)
                  setOpen(false)
                  setSelectedIndex(index)
                }}
                style={{
                  padding: '8px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                {item}
              </div>
            ))
          ) : (
            <div style={{ padding: '8px', color: '#999' }}>No options found</div>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
