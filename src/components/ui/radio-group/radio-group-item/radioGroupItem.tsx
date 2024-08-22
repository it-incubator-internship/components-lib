import React, { ComponentPropsWithoutRef } from 'react'
import { Item, Indicator } from '@radix-ui/react-radio-group'
import s from '@/components/ui/radio-group/radioGroup.module.scss'
import clsx from 'clsx'

type Props = {
  title: string
  id?: string
  className?: string
  disabled?: boolean
} & Omit<ComponentPropsWithoutRef<typeof Item>, 'value' | 'id'>
export const RadioGroupItem = ({ title, id, className, ...rest }: Props) => {
  const idItemRadioGroup = id ? id : `id-${Date.now()}`
  const classesLabelDisabled = rest.disabled ? s.LabelColorDisabled : ''
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <label className={clsx(s.Label, classesLabelDisabled)}>
        <Item
          className={clsx(s.RadioGroupItem, className)}
          value={title}
          id={idItemRadioGroup}
          {...rest}
        >
          <Indicator className={s.RadioGroupIndicator} />
        </Item>
        {title}
      </label>
    </div>
  )
}
