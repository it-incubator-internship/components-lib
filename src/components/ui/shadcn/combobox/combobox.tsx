import React, {
  useState,
  KeyboardEvent,
  useEffect,
  useRef,
  ChangeEvent,
  useId,
  forwardRef,
} from 'react'
import { ComponentPropsWithoutRef } from 'react'

import * as Popover from '@radix-ui/react-popover'
import { cn } from '@/components/ui/shadcn/combobox/cn'
import { Button } from '@/components/ui'
import Close from '@/assets/components/Close'
import ArrowIosDownOutline from '@/assets/components/ArrowIosDownOutline'
import { LocalityType } from './form-combobox'

type InputPropsWithoutValue = Omit<ComponentPropsWithoutRef<'input'>, 'value'>
type ComboboxProps = InputPropsWithoutValue & {
  options: string[]
  parentClassName?: string
  error: string | undefined
  name: LocalityType
  value: string | null
  setValue: (value: string | null) => void
  onChange: (value: string | undefined | null) => void
  handleListOpen: (value: boolean) => void
}

/*
//
https://youtu.be/w8dj8VCojsc?list=PL68yfJ7Vdq8kpRMRtd4-Mz8Mhv7SnJ43W&t=10410
// переход к юзконтроллеру тк форвадРеф  дальше использовать не получится
https://youtu.be/w8dj8VCojsc?list=PL68yfJ7Vdq8kpRMRtd4-Mz8Mhv7SnJ43W&t=12571
*/

export const ComboBox = forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      options,
      parentClassName,
      name,
      error,
      onChange,
      value,
      setValue,
      id,
      handleListOpen,
      ...rest
    },
    ref
  ) => {
    // region close
    // const [inputValue, setInputValue] = useState<string | undefined>(undefined)
    const [open, setOpen] = useState<boolean>(false)

    const [selectedIndex, setSelectedIndex] = useState<number>(-1)
    const [currentOptions, setCurrentOptions] = useState<string[]>(options)
    const [filterRequired, setFilterRequired] = useState<boolean>(false)

    useEffect(() => {
      setValue(value)
    }, [name, value, setValue])

    useEffect(() => {
      if (selectedIndex >= 0) {
        const selectedOption = currentOptions[selectedIndex]
        if (selectedOption) {
          setValue(value)
        }
      } else {
        setValue(null)
      }
    }, [selectedIndex])

    useEffect(() => {
      if (!value) {
        setCurrentOptions(options)
        setSelectedIndex(-1)
      }
    }, [value])

    useEffect(() => {
      handleListOpen(open)
    }, [open])

    // взять из контроллера и убрать этот реф
    const inputRef = useRef<HTMLInputElement>(null)

    if (filterRequired) {
      filterOptions()
      setFilterRequired(false)
    }

    function filterOptions() {
      const filteredOptions = options.filter(item =>
        item.toLowerCase().includes(value?.toString().toLowerCase() ?? '')
      )
      setCurrentOptions(filteredOptions)

      if (!value) {
        setSelectedIndex(-1)
      }
    }
    // console.log(' inputValue: ', inputValue)
    // console.log(' currentOptions: ', currentOptions)
    // console.log(' selectedIndex: ', selectedIndex)

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
          setValue(selectedOption)
        } else if (
          currentOptions.length > 0 &&
          currentOptions[0]
            ?.toLowerCase()
            .includes(value?.toString().toLowerCase() as string)
        ) {
          setSelectedIndex(0)
        }
        setFilterRequired(true)
        setOpen(prevValue => !prevValue)
      }
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value
      setValue(value)

      if (value === '') {
        onChange(null)
      } else {
        onChange(value)
      }
      !open && setOpen(true)
      setFilterRequired(true)
    }

    // endregion close
    const generatedId = useId()
    const finalId = id ?? generatedId

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <div
            className={cn(
              `relative w-[210px] h-[82px] mb-[51px]`,
              parentClassName
            )}
          >
            <input
              {...rest}
              id={finalId}
              ref={ref}
              value={value || ''}
              placeholder="Select an option..."
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
              className={cn(
                `w-[210px] p-2 pr-[48px] rounded cursor-text border-[1px] border-solid border-[#ccc]`
              )}
            />
            {error && (
              // <div className={`absolute h-[42px] bottom-0 left-0`}>
              <p className={`text-red-500 text-sm`}>{error}</p>
              // </div>
            )}
            {
              <Button
                variant="ghost"
                className={cn(
                  `!top-[8px] !right-[25px] !absolute !p-[5px] group !text-danger-100 hover:!text-danger-500`
                )}
                onClick={() => {
                  setValue('')
                  setOpen(false)
                  inputRef.current?.focus()
                }}
              >
                <Close
                  className={cn(
                    `!m-0`,
                    value
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
                className={cn(
                  `!m-0`,
                  open ? `rotate-180 duration-300` : 'duration-300'
                )}
              />
            </Button>
          </div>
        </Popover.Trigger>
        <Popover.Portal forceMount>
          <Popover.Content
            className={cn(
              open
                ? `opacity-100 transition-all duration-500 visible `
                : `opacity-0 transition-all duration-500 invisible`,
              'bg-white border-[1px] border-solid border-[#ccc]',
              `rounded w-[210px] max-h-[150px] overflow-y-auto relative`,
              open ? `z-[1]` : `z-[0]`,
              `absolute left-[-105px] top-[-40px]`
            )}
            onOpenAutoFocus={e => e.preventDefault()}
          >
            {currentOptions?.length > 0 ? (
              currentOptions.map((item, index) => (
                <div
                  key={item}
                  onClick={() => {
                    // setValue(name, item)
                    onChange(item as string)
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
              <div style={{ padding: '8px', color: '#999' }}>
                No options found
              </div>
            )}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    )
  }
)
