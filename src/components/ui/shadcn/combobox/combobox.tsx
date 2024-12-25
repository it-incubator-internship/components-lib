import React, {
  useState,
  KeyboardEvent,
  useEffect,
  useRef,
  ChangeEvent,
  ReactNode,
  useId,
  Fragment,
} from 'react'
import { ComponentPropsWithoutRef } from 'react'

import * as Popover from '@radix-ui/react-popover'
import { cn } from '@/components/ui/shadcn/combobox/cn'
import { Button } from '@/components/ui'
import Close from '@/assets/components/Close'
import ArrowIosDownOutline from '@/assets/components/ArrowIosDownOutline'

type ComboboxProps = ComponentPropsWithoutRef<typeof Popover.Root> & {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text'
  asChild?: boolean
  options: string[]
  errorMsg?: string
  label?: ReactNode
  parentClassName?: string
} & ComponentPropsWithoutRef<'input'>
/*
//
https://youtu.be/w8dj8VCojsc?list=PL68yfJ7Vdq8kpRMRtd4-Mz8Mhv7SnJ43W&t=10410
// переход к юзконтроллеру тк форвадРеф  дальше использовать не получится
https://youtu.be/w8dj8VCojsc?list=PL68yfJ7Vdq8kpRMRtd4-Mz8Mhv7SnJ43W&t=12571
*/
export default function ComboBox({
  options,
  parentClassName,
  onChange,
  errorMsg,
  name,
  ...rest
}: ComboboxProps) {
  const [inputValue, setInputValue] = useState<string | undefined>(undefined)
  const [open, setOpen] = useState<boolean>(false)

  const [selectedIndex, setSelectedIndex] = useState<number>(-1)
  const [currentOptions, setCurrentOptions] = useState<string[]>(options)
  const [filterRequired, setFilterRequired] = useState<boolean>(false)
  // region close
  useEffect(() => {
    if (selectedIndex >= 0) {
      const selectedOption = currentOptions[selectedIndex]
      if (selectedOption) {
        setInputValue(selectedOption)
      }
    } else {
      setInputValue(undefined)
    }
  }, [selectedIndex])

  useEffect(() => {
    if (!inputValue) {
      setCurrentOptions(options)
      setSelectedIndex(-1)
    }
  }, [inputValue])

  const inputRef = useRef<HTMLInputElement>(null)

  if (filterRequired) {
    filterOptions()
    setFilterRequired(false)
  }

  function filterOptions() {
    const filteredOptions = options.filter(item =>
      item.toLowerCase().includes(inputValue?.toLowerCase() ?? '')
    )
    setCurrentOptions(filteredOptions)

    if (!inputValue) {
      setSelectedIndex(-1)
    }
  }
  console.log(' inputValue: ', inputValue)
  console.log(' currentOptions: ', currentOptions)
  console.log(' selectedIndex: ', selectedIndex)

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()

      if (!open) {
        setOpen(true)
        return
      }

      setSelectedIndex(prevIndex => {
        if (prevIndex + 1 >= currentOptions.length) {
          return 0
        }
        return prevIndex + 1
      })
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()

      if (!open) {
        setOpen(true)
        return
      }

      setSelectedIndex(prevIndex => {
        if (prevIndex - 1 <= -1) {
          return currentOptions.length - 1
        }
        return prevIndex - 1
      })
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      const selectedOption = currentOptions[selectedIndex]
      if (selectedOption) {
        setInputValue(selectedOption)
      } else if (
        currentOptions.length > 0 &&
        currentOptions[0]?.toLowerCase().includes(inputValue?.toLowerCase() as string)
      ) {
        setSelectedIndex(0)
      }
      setFilterRequired(true)
      setOpen(prevValue => !prevValue)
    }
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
    onChange && onChange(e)
    !open && setOpen(true)
    setFilterRequired(true)
  }

  // endregion close
  const generatedId = useId()
  console.log(' name: ', name)
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <div className={cn(`relative w-[210px]`, parentClassName)}>
          <label htmlFor={generatedId}>
            {(name?.charAt(0).toUpperCase() as string) + (name?.slice(1) as string)}
          </label>
          <input
            {...rest}
            id={generatedId}
            type="text"
            placeholder="Select an option..."
            value={inputValue ?? ''}
            onChange={handleOnChange}
            onKeyDown={handleKeyDown}
            className={cn(
              `w-[210px] p-2 pr-[48px] rounded cursor-text border-[1px] border-solid border-[#ccc]`
            )}
          />
          {errorMsg && <p className={`text-red-500 text-sm`}>{errorMsg}</p>}
          {
            <Button
              variant="ghost"
              className={cn(
                `!top-[8px] !right-[25px] !absolute !p-[5px] group !text-danger-100 hover:!text-danger-500`
              )}
              onClick={() => {
                setInputValue(undefined)
                setOpen(false)
                inputRef.current?.focus()
              }}
            >
              <Close
                className={cn(
                  `!m-0`,
                  inputValue
                    ? `opacity-100 transition-all duration-1000 visible`
                    : `opacity-0 transition-all duration-500 invisible`
                )}
              />
            </Button>
          }
          <Button
            variant="ghost"
            className={cn(
              `!top-[8px] !right-[0] !absolute !p-[5px] group !text-danger-100 hover:!text-danger-500`
            )}
          >
            <ArrowIosDownOutline
              className={cn(`!m-0`, open ? `rotate-180 duration-300` : 'duration-300')}
            />
          </Button>
        </div>
      </Popover.Trigger>
      <Popover.Portal forceMount>
        <Popover.Content
          className={cn(
            open
              ? `opacity-100 transition-all duration-500 visible`
              : `opacity-0 transition-all duration-500 invisible`,
            'bg-white border-[1px] border-solid border-[#ccc]',
            `rounded w-[210px] max-h-[150px] overflow-y-auto`
          )}
          onOpenAutoFocus={e => e.preventDefault()}
        >
          {currentOptions?.length > 0 ? (
            currentOptions.map((item, index) => (
              <div
                key={item}
                onClick={() => {
                  setInputValue(item)
                  setOpen(false)
                  setSelectedIndex(0)
                  inputRef.current?.focus()
                  setFilterRequired(true)
                }}
                className={cn(
                  `hover:bg-theme-accent-900`,
                  selectedIndex === index ? 'bg-success-700' : ''
                )}
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
