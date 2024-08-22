import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import s from '@/components/ui/radio-group/radioGroup.module.scss'
import { Root } from '@radix-ui/react-radio-group'
import { RadioGroupItem } from './radio-group-item/radioGroupItem'
import clsx from 'clsx'

export type Option = {
  value: string | number
  label: string
}

type RadixRadioGroupProps = ComponentPropsWithoutRef<typeof Root>

export type RadioGroupProps = {
  currentValue?: string
  options: Option[]
  callback?: (value: string) => void
  defaultValue?: string
  className?: string
} & RadixRadioGroupProps

export const RadioGroup = forwardRef<ElementRef<typeof Root>, RadioGroupProps>(({ options, callback, currentValue, defaultValue, ...rest }, ref) => {
    const renderRadioGroup = options.map((option: Option) => {
      return (
        <RadioGroupItem title={option.label} disabled={rest.disabled} key={option.value} />
      )
    })
    return (
      <Root
        ref={ref}
        className={clsx(s.RadioGroupRoot, rest.className)}
        defaultValue={defaultValue ? defaultValue : currentValue}
        aria-label="View density"
        value={currentValue}
        onValueChange={callback}
        disabled={rest.disabled}
      >
        {renderRadioGroup}
      </Root>
    )
  },
)