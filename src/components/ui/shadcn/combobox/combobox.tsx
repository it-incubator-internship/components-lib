import React, {useState, KeyboardEvent, useEffect} from 'react'
import { ComponentPropsWithoutRef } from 'react'

import * as Popover from '@radix-ui/react-popover'
import { cn } from '@/components/ui/shadcn/combobox/cn'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from 'cmdk'

type ComboboxProps = ComponentPropsWithoutRef<typeof Popover.Root> & {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text'
  asChild?: boolean
  options: string[]
}

/*
e => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setOpen(true)
          }
          if (e.key === 'Enter') {
            e.preventDefault()
          }
        }
 */

export default function ComboBox({ options }: ComboboxProps) {
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)

  const [selectedIndex, setSelectedIndex] = useState(-1)

  useEffect(()=>{
    if (selectedIndex >= 0) {
      const selectedOption = options[selectedIndex]
      if (selectedOption) {
        setInputValue(selectedOption)
      }
    }
  },[selectedIndex])

  const filteredOptions = options.filter(item =>
    item.toLowerCase().includes(inputValue.toLowerCase())
  )

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      !open&& setOpen(true)
      setSelectedIndex(prevIndex => Math.min(options.length - 1, prevIndex + 1))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prevIndex => Math.max(0, prevIndex - 1))
    }
    if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      const selectedOption = options[selectedIndex]
      if (selectedOption) {
        setInputValue(selectedOption)
        setOpen(false)
      }
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
          //.filter(item => item.toLowerCase().includes(inputValue.toLowerCase()))
            setInputValue(e.target.value)
            setOpen(true)

            setSelectedIndex(-1)
          }}
          onKeyDown={handleKeyDown}
          autoFocus
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
          <Command
            loop
            onValueChange={value => {
              setInputValue(value)
              setOpen(false)
            }}
          >
            <CommandList>
              {options?.length > 0 ? (
                <CommandGroup>
                  {options
                    .map(item => (
                      <CommandItem
                        key={item}
                        value={item}
                        onSelect={() => {
                          setInputValue(item)
                          setOpen(false)
                        }}
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
                      </CommandItem>
                    ))}
                </CommandGroup>
              ) : (
                <CommandEmpty>
                  <div style={{ padding: '8px', color: '#999' }}>No options found</div>
                </CommandEmpty>
              )}
            </CommandList>
          </Command>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
