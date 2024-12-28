import React, {
  useState,
  KeyboardEvent,
  useEffect,
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
import { FixedSizeList as List } from 'react-window'

type InputPropsWithoutValue = Omit<ComponentPropsWithoutRef<'input'>, 'value'>
type ComboboxProps = InputPropsWithoutValue & {
  options: string[]
  parentClassName?: string
  error: string | undefined
  setValue: (value: string | null) => void
  name: LocalityType
  value: string | null
  onChange: (value: string | null) => void
  handleListOpen: (value: boolean) => void
}

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
    // region code
    const [open, setOpen] = useState<boolean>(false)
    const [selectedIndex, setSelectedIndex] = useState<number>(-1)
    const [currentOptions, setCurrentOptions] = useState<string[]>(options)
    const [filterRequired, setFilterRequired] = useState<boolean>(false)

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
          setValue(currentOptions[0])
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
        open && setOpen(false)
        onChange(null)
      } else {
        onChange(value)
      }
      !open && setOpen(true)
      setFilterRequired(true)
    }

    const generatedId = useId()
    const finalId = id ?? generatedId

    // endregion code
    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <div
            className={cn(
              `relative w-[210px] h-[82px] mb-[51px] text-start`,
              parentClassName
            )}
          >
            <label htmlFor={finalId}>
              {(name?.charAt(0).toUpperCase() as string) +
                (name?.slice(1) as string)}
            </label>
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
            {error && <p className={`text-red-500 text-sm`}>{error}</p>}
            {
              <Button
                variant="ghost"
                className={cn(
                  `!top-[31px] !right-[25px] !absolute !p-[5px] group !text-danger-100 hover:!text-danger-500`
                )}
                onClick={e => {
                  e.preventDefault()
                  setValue('')
                  setOpen(false)
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
              onClick={e => {
                e.preventDefault()
                setOpen(value => !value)
              }}
              variant="ghost"
              className={cn(
                `!top-[31px] !right-[0] !absolute !p-[5px] group !text-danger-100 hover:!text-danger-500`
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
              `absolute left-[-105px] top-[-16px]`
            )}
            onOpenAutoFocus={e => e.preventDefault()}
          >
            {currentOptions?.length > 0 ? (
              <List
                height={149}
                itemCount={currentOptions.length}
                itemSize={41}
                width={208}
              >
                {({ index, style }) => (
                  <div
                    onClick={() => {
                      setValue(currentOptions[index]!)
                      setOpen(false)
                      setSelectedIndex(0)
                      setFilterRequired(true)
                    }}
                    className={cn(
                      `hover:bg-theme-accent-900 p-[8px] cursor-pointer `,
                      selectedIndex === index ? 'bg-success-700' : '',
                    )}
                    style={{
                      borderBottom: '1px solid #f0f0f0',
                    }}
                  >
                    {currentOptions[index]}
                  </div>
                )}
              </List>
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
