import React, { ComponentPropsWithRef } from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import s from '@/components/ui/radioGroup/RadioGroup/radioGroup.module.scss'
import { ItemRadioGroup } from './itemRadioGroup/itemRadioGroup'
import clsx from 'clsx'

type Items = {
	id?: string
	titleRadioItem: string
}
type Props = {
	currentValue?: string
	itemsRadioGroup?: Items[]
	callback?: (value: string) => void
	defaultValue?: string
	className?: string
}& ComponentPropsWithRef <typeof RadioGroup.Root>
export const RadioGroupUiKit = ({itemsRadioGroup, callback, currentValue, defaultValue, ...rest}: Props) => {
const mapedItemsRadioGroup = itemsRadioGroup?.map((item) => {
	return (
		<ItemRadioGroup title={item.titleRadioItem} disabled={rest.disabled} key={item.id} />
	)
})
  return (
    <RadioGroup.Root
      className={clsx(s.RadioGroupRoot, rest.className)}
      defaultValue={defaultValue? defaultValue : currentValue}
      aria-label="View density"
      value={currentValue}
      onValueChange={callback}
		disabled={rest.disabled}
    >
      {mapedItemsRadioGroup}
    </RadioGroup.Root>
  )
}
